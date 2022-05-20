// express
const express = require("express");

// nodemailer
const nodemailer = require("nodemailer");

// cors
const cors = require('cors')

// init app
const app = express();

// middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init smtp transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "amibaby411@gmail.com",
    pass: "amakabless2Z",
  },
});

// endpoint
app.post("/send/order/purchase/email", async (req, res) => {
  try {
    // // get user order
    const {
      firstName,
      lastName,
      email,
      carMake,
      carModel,
      carPrice,
      carCondition,
      orderNumber,
    } = req.body;

    // init options
    const options = {
      from: "dotCar <amibaby411@gmail.com>",
      to: email,
      subject: "Thank you for your purchase",
      html: `
        
      <h1>Thank you for your purchase</h1>
      <p>Hello ${firstName} </p>
      <br/>
      <p>We have recieved your purchase for a ${carCondition} ${carMake} ${carModel} and currently Processing your order.</p>
      <br/>
      <h4>Order Details </h4>
      <p><b>Name:</b>${firstName} ${lastName}</p>
      <p><b>Email:</b>${email}</p>
      <p><b>Car Make:</b>${carMake}</p>
      <p><b>Car Model:</b>${carModel}</p>
      <p><b>Car Price:</b>&#8358;${carPrice}</p>
      <p><b>Car Condition:</b>${carCondition}</p>
      <p><b>Order Number:</b>${orderNumber}</p>
      <br/>
      <h2>Order Status: <b>Processing</b></h2>
      `,
    };

    // send email
    await transporter.sendMail(options);

    return res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});


//update email
app.post("/send/status/update/email", async (req, res) => {
  try {
    // get data
    const { email, firstName, status, orderNumber } = req.body;

    // init options
    const options = {
      from: "dotCar <amibaby411@gmail.com>",
      to: email,
      subject: `Your order is ${status}`,
      html: `
        
        <p>Hello ${firstName} </p>

        <h6>Your order with order number ${orderNumber} is ${status}</h6>
        `,
    };

    // send email
    await transporter.sendMail(options);

    return res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// init port
const port = 4005;
app.listen(port, () => {
  console.log(`Email server is listening at port ${port}`);
});
