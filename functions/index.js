const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({origin:true}));
app.post("/", (req, res) => {
    const { body } = req;
    const isValidMessage = body.message && body.to && body.subject;

    if (!isValidMessage) {
        return res.status(400).send({ message: "invalid request" });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'henryapp2021@gmail.com',
            pass: "vgiwbomfyvxugdpo"
        }
    });

    const mailOptions = {
        from: 'henryapp2021@gmail.com',
        to: body.to,
        subject: body.subject,
        text: body.message, 
        html: "<a href='http://localhost:19006'>Donwload Henry-app here</a>"
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return res.status(500).send({ message: "error " + err.message });
        }

        return res.send({ message: "email sent" });
    });
});

module.exports.mailer = functions.https.onRequest(app);

