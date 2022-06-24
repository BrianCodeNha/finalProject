export const validateTicket = (req, res, next) => {
    
    const ticket = req.body
    console.log("🚀 ~ file: validateData.js ~ line 4 ~ validateTicket ~ ticket", ticket)
    if (!ticket.producer) {
        res.status(503).send("Yêu cầu nhập tên nhà đài");
      } else if (ticket.producer.length < 3) {
        req.session.errors = "Yêu cầu tên đài tối thiểu 2 ký tự";
      }
  
      if (!ticket.date) {
        req.session.errors = "Yêu cầu nhập ngày";
      }   
  
      if (!ticket.number) {
        req.session.errors = "Yêu cầu nhập số vé số";
      } else if (!ticket.number.match(/^-?\d+\.?\d*$/)) {
        res.status(503).send('vé số không hợp lệ')
      }
      next();
}
