import { User } from "../model/User.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../ulti/mail.js";

export const getUser = (req, res, next) => {
  try {
    User.find().then((users) => {
      res.status(200).json(users);
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getCurrentUser = (req, res, next) => {
  const currentUser = req.session.user;
  try {
    res.status(200).send(currentUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const changePassword = async (req, res, next) => { 
  console.log("change password");
  const oldPass = req.body.oldPassword;
  const newPass = req.body.newPassword;
  const user = req.session.user;
 
  try {
    const isCorrectPass = await bcrypt.compare(oldPass, user.password);
    console.log("🚀 ~ file: authenticatedUser.js ~ line 32 ~ changePassword ~ oldPass", oldPass)
    console.log("🚀 ~ file: authenticatedUser.js ~ line 32 ~ changePassword ~ user.password", user.password)
    console.log("🚀 ~ file: authenticatedUser.js ~ line 39 ~ changePassword ~ isCorrectPass", isCorrectPass)
    if (isCorrectPass === true) {
        console.log('mật khẩu trùng khớp')
       const newhashPassword = await bcrypt.hash(newPass, 10);
        user.password = newhashPassword;
        User.findByIdAndUpdate(user._id, user).then(user => sendEmail(user.email, newPass)).then(() => {
        res
        .status(200)
        .send({ isCorrectPass, infoMess: "Thay đổi mật khẩu thành công" });
        } )
      
      
    } else {
      res
        .status(200)
        .send({
          isCorrectPass,
          infoMess: "Nhập mật khẩu hiện tại không chính xác",
        });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const addUser = async (req, res, next) => {
  console.log(
    "🚀 ~ file: authenticatedUser.js ~ line 16 ~ addUser ~ req",
    req.body
  );

  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    console.log(
      "🚀 ~ file: authenticatedUser.js ~ line 18 ~ addUser ~ hashPassword",
      hashPassword
    );
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      phone: req.body.phone,
      role: req.body.role,
      password: hashPassword,
      active: req.body.active,
    });
    await newUser.save();
    await User.find().then((users) => {
      res.status(200).json(users);
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createFakeUser = (req, res, next) => {
  const randoom = Math.floor(Math.random() * 10);
  const randoom1 = Math.floor(Math.random() * 1000000);
  const fakeuser = new User({
    email: `test${randoom}@admin.com`,
    phone: `0985${randoom1}`,
    password: `test${randoom}@admin.com`,
    username: `test${randoom}`,
    role: `admin`,
  });
  fakeuser.save().then(() => {
    console.log(`fakeUser${randoom} created`);
    res.send(`fakeUser${randoom} created`);
  });
};

export const checkAuthentication = (req, res, next) => {
  const userStatus = req.session.userStatus;
  console.log("🚀 ~ file: app.js ~ line 59 ~ app.use ~ userStatus", userStatus);
  if (userStatus.isLoggedIn) {
    return next();
  }
};
