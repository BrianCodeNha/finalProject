import express from "express";
import { User } from "../model/User.js";
import bcrypt from "bcrypt";

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
            console.log("🚀 ~ file: authen.js ~ line 55 ~ .then ~ req.session.user", req.session.user)            

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
  if(req.session.user) {
  const userStatus = {
    isLoggedIn: req.session.authenticated,
    active: req.session.user.active,
    role: req.session.user.role,
    errorMess: null,
    infoMess: "Đăng nhập thành công",
  };

  res
    .status(200)
    .send(userStatus)
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

router.get("/logout",  (req, res) => {
  console.log('logout')
  const userStatus = {
    isLoggedIn: false,
    active: false,
    role: null,
    errorMess: null,
    infoMess: null
  };
   req.session.destroy(() => res.status(200).send(userStatus));
   
});

export default router;
