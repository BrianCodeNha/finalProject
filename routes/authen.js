import express from "express";
import { User } from "../model/User.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../ulti/mail.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  console.log("login", req.body);

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        console.log("Tài khoản email không tồn tại");
        res.status(200).send({
          isLoggedIn: false,
          active: false,
          role: null,
          errorMess: "Email đăng nhập không tồn tại",
          infoMess: null,
        });
      } else if (user && user.active === false) {
        console.log("Tài khoản bị vô hiệu hoá");
        res.status(200).send({
          isLoggedIn: false,
          active: false,
          role: null,
          errorMess: "Tài khoản bị vô hiệu hoá",
          infoMess: null,
        });
      } else if (user) {
        bcrypt
          .compare(req.body.password, user.password)
          .then((authenticated) => {
            if (!authenticated) {
              console.log("Sai mật khẩu");
              return res.status(200).send({
                isLoggedIn: false,
                active: false,
                role: null,
                errorMess: "Sai mật khẩu",
                infoMess: null,
              });
            }
            console.log("🚀 ~ file: authen.js ~ line 36 ~ .then ~ authenticated", authenticated)
            console.log("valid user");
            req.session.authenticated = true;
            const userStatus = {
              isLoggedIn: req.session.authenticated,
              active: true,
              role: user.role,
              errorMess: null,
              infoMess: "Đăng nhập thành công",
            };
            req.session.userStatus = userStatus;
            req.session.user = user;
            console.log(
              "🚀 ~ file: authen.js ~ line 55 ~ .then ~ req.session.user",
              req.session.user
            );

            res.status(200).send(userStatus);
            return req.session.save();
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: error });
    });
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    const userStatus = {
      isLoggedIn: req.session.authenticated,
      active: req.session.user.active,
      role: req.session.user.role,
      errorMess: null,
      infoMess: "Đăng nhập thành công",
      userId: req.session.user._id,
    };

    res.status(200).send(userStatus);
  } else {
    const userStatus = {
      isLoggedIn: false,
      active: false,
      role: null,
      errorMess: null,
      infoMess: "user đã đăng xuất",
    };
  }
});

router.get("/logout", (req, res) => {
  console.log("logout");
  const userStatus = {
    isLoggedIn: false,
    active: false,
    role: null,
    errorMess: null,
    infoMess: null,
  };
  req.session.destroy(() => res.status(200).send(userStatus));
});

router.post("/signup",(req, res) => {
  function generatePassword() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  const randomPassword = generatePassword();
  const user = new User({
    ...req.body,
    password: randomPassword,
    role: "user",
    active: true,
  });
  console.log("🚀 ~ file: authen.js ~ line 124 ~ router.post ~ user", user)

  User.findOne({ email: user.email }).then(async (Datauser) => {
    if (Datauser) {
      console.log("🚀 ~ file: authen.js ~ line 128 ~ User.find ~ user", Datauser)
      console.log("Tài khoản email đã tồn tại");
      res.status(200).send({
        isLoggedIn: false,
        active: false,
        role: null,
        errorMess: "Email đăng nhập đã tồn tại",
        infoMess: null,
      });
    } else {
      try {
        console.log("Thêm user vào database");
      res
        .status(200)
        .send({
          isLoggedIn: false,
          active: false,
          role: null,
          errorMess: null,
          infoMess:
            "Đăng ký thành công. Hãy kiểm tra email để có thông tin đăng nhập",
        })       
        
        const sendEmailResponse = sendEmail(user.email, user.password);
        const hashpassword = await bcrypt.hash(user.password, 10)
        user.password = hashpassword;
        user.save()
        console.log("🚀 ~ file: authen.js ~ line 156 ~ router.post ~ user", user)
        
        console.log(
          "🚀 ~ file: authen.js ~ line 123 ~ router.post ~ sendEmailResponse",
          sendEmailResponse
        );
        
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
        
      }
      
    }
  });

});

export default router;
