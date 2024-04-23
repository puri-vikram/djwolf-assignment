const express = require("express");
const { check, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../model/User");
const Invoice = require("../model/Invoice");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const nodemailer = require('nodemailer');

router.post(
    "/login",
    [
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 6
      })
    ],
    async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
  
      const { email, password } = req.body;
      try {
        let user = await User.findOne({
          email
        });
        console.log(email, password, user);
        if (!user)
          return res.status(400).json({
            message: "User Not Exist"
          });
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Password !"
          });
  
        const payload = {
          user: {
            id: user.id
          }
        };
  
        jwt.sign(
          payload,
          "randomString",
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token
            });
          }
        );
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
    }
);

router.get("/get-user-pdf", auth, async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.example.com',
        port: 587,
        secure: false,
        auth: {
            user: 'djwolf@gmail.com',
            pass: '123456'
        }
    });

    try {

        const
            user = await User.findById(req.user.id),
            userId = user?._id;

        let invoices;
        if(userId) {  
            invoices = await Invoice.find({ user: userId });
        }
        
        const invoicesWithUsers = invoices.map(invoice => { return {...user.toObject(), ...invoice.toObject()}});

        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream('output.pdf'));

        invoicesWithUsers.forEach(item => {

            // write the data to pdf file
            doc.text(JSON.stringify(item));

            // getting ready the email object
            // const mailOptions = {
            //     from: 'djwolf@gmail.com',
            //     to: item.email,
            //     subject: 'Subject of your email',
            //     text: 'Message content of your email'
            // };

            // transporter.sendMail(mailOptions);

        });
        doc.end();

        res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
        res.setHeader('Content-Type', 'application/pdf');
    
        fs.createReadStream('output.pdf').pipe(res);
      
    } catch (e) {
        res.send({ message: e });
    }
});

module.exports = router;