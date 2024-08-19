const nodemailer = require("nodemailer");
const exportpdfmake = require("./pdfmake");

const sentMail = async (registeremail) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "dhavalvadher0001@gmail.com",
            pass: "acdjmwqosrnwagux",
        },
    });
    exportpdfmake()

    const recevier = {
        from: 'dhavalvadher0001@gmail.com', 
        to: registeremail, 
        subject: "Node Js Mail Testing", 
        text: "Your registation is Sucessfully",
        attachments:[
            {
                filename: 'image.pdf',
                path: '../../backend/ecommerce/document.pdf',
            },
            {
                filename: 'image.jpeg',
                path: './src/images/images.jpeg',
            },
            {
                filename: 'image.jpeg',
                path: './src/images/imagess.jpeg',
            },
            {
                filename: 'image.webp',
                path: './src/images/Mona.webp',
            },
            {
                filename: 'image.jpg',
                path: './src/images/tree.jpg',
            }
        ] 
    };

    transporter.sendMail(recevier, (error, emailResponse) => {
        if (error)
            throw error;
        console.log("Sucesss...!");
        res.end();
    })
}


module.exports = sentMail
