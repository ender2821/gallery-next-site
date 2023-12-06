import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
  const { email, fullName, shippingAddress, specialInstructions, productName, productPrice } = await request.json();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    /* 
      setting service as 'gmail' is same as providing these setings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: process.env.FORMS_EMAIL,
      pass: process.env.FORMS_EMAIL_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.FORMS_EMAIL,
    to: process.env.FORMS_EMAIL,
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `Purchase Request from ${fullName} (${email})`,
    text: `Fullname: ${fullName} | Email: ${email} | Shipping Address: ${shippingAddress} | Special Instructions: ${specialInstructions} | Product Name: ${productName} | Product Price: $${productPrice}`,
    html:`
    <p>Product Name: ${productName}</p>
    <p>Product Price: $${productPrice}</p>
    <hr/>
    <p>Email: ${email}</p>
    <p>Fullname: ${fullName}</p>
    <p>Shipping Address: ${shippingAddress}</p>
    <p>Special Instructions: ${specialInstructions}</p>
    `,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(`Failure to send | ${err.message}`);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: 'Email sent' });
  } catch (err) {
    return NextResponse.json({ error: `Failure to send | ${err}` }, { status: 500 });
  }
}