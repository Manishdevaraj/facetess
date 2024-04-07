const express=require('express');
const cors=require('cors');
const app=express();
const middleware=require('./middleware')

const nodemailer = require('nodemailer');
// // const bodyParser = require('body-parser');

app.use(cors());

port=process.env.PORT||5000

app.use(middleware.decodeToken)     


app.listen(port,()=>
{
   console.log("the port is start listening :"+port)   
})

app.get("/",(req,res)=>
{
    res.send("Hello this the check console access");
})


app.post('/scheduleCodeDeletion', async (req, res) => {
  
  const { dept, batch } = req.headers;
  console.log("Department and Batch:", dept, batch);

  if (!dept || !batch) {
      return res.status(400).json({ error: 'Department and batch headers are required' });
  }

  try {
      setTimeout(async () => {
          middleware.deleteCodes(dept, batch);
          console.log("Codes deleted successfully!");
          res.status(200)
      }, 2* 60 * 1000); // 2 minutes delay

    
  } catch (error) {
      console.error('Error scheduling code deletion:', error);
      res.status(500);
  }
});


  app.post('/sendemail', async (req, res) => {

    console.log("api call for mail");

    const {email}=req.headers;
    console.log(email);
    try
    {
        
// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'manishdevaraj01@gmail.com', // Your Gmail address
      pass: 'kukz xrev ucab diqm' // Your Gmail password (or App Password if using 2FA)
    }
  });
  
  // Define email content
  const mailOptions = {
    from: 'manishdevaraj01@gmail.com', // Sender address (must be same as auth user)
    to: email+"@skct.edu.in", // List of recipient s
    subject: 'Attendance', // Subject line
    text: 'Your attendance have been marked!' // Plain text body
  };
  
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
      res.status(200)
    }
  });
    }
    catch(err)
    {
      console.log(err);
        res.json({error:err});
    }

  })