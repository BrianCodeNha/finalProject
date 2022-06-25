export const verifyAdmin = (req, res, next) => {
  console.log("🚀 ~ file: validateData.js ~ line 3 ~ verifyAdmin ~ req.session", req.session)
    if(req.session.user === undefined || req.session.user.role !== 'admin'){
      console.log('not admin')
      return res.status(401).send('chức năng này chỉ dành cho admin')
    }
    next();
}

export const verifyAuthentication = (req, res, next) => {
console.log("🚀 ~ file: validateData.js ~ line 11 ~ verifyAuthentication ~ req", req.session)
    if(!req.session.authenticated){
      console.log('not authenticated')
      return res.status(401).send('user chưa đăng nhập!!')
    }
    next();
}
