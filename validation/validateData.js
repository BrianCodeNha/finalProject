export const verifyAdmin = (req, res, next) => {
  console.log("🚀 ~ file: validateData.js ~ line 3 ~ verifyAdmin ~ req.session", req.session)
    if(req.session.user.role !== 'admin'){
      console.log('not admin')
      return res.status(401).send('Chức năng này chỉ dành cho admin')
    }
    next();
}
