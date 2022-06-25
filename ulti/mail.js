import nodemailer from 'nodemailer';

const option = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'nmchi1990@gmail.com',
        pass: 'gvsbcfmutpobyhhi'
    }
}


const transporter = nodemailer.createTransport(option)

export const verifyConnectEmail  = () => transporter.verify((err, result) => {
    if(err) {
        console.log(err);
    } else {
        console.log('success connect email')
    }
})

export const sendEmail = (userEmail, password) => transporter.sendMail({
    from: 'nmchi1990@gmail.com', // Địa chỉ email của người gửi
    to: userEmail, // Địa chỉ email của người gửi
    subject: 'Thông tin đăng nhập người dùng', // Tiêu đề mail
    text: `Chào mừng đến với trang vé số. Thông tin đăng nhập: emai: ${userEmail} - password: ${password}`, // Nội dung mail dạng text
}, function(error, info) {
    if (error) { // nếu có lỗi
        console.log(error);
        return error;
    } else { //nếu thành công
        console.log('Email sent: ' + info.response);
        return info;
    }
});