// Import nodemailer
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as cron from 'node-cron';
import * as nodemailer from "nodemailer";
import * as path from "path";

// Load environment variables from .env file
dotenv.config();

console.log(`Running from ${process.cwd()}`);
const templatesDirectory = path.resolve(process.cwd(), "./templates");
console.log(`Templates from ${templatesDirectory}`);

console.log(`Sending Mail with ${process.env.CRON_SCHEDULE}`);

cron.schedule(process.env.CRON_SCHEDULE, () => {
    console.log("Sending Mail");
    const htmlContent = createContent();
    sendMail(htmlContent);
  });


function createContent() {
  console.log("Create Content");
  const { timestamp, id } = getDynamicInfo();
  let htmlContent = readTemplate();
  htmlContent = htmlContent.replace(/{{timestamp}}/g, timestamp);
  htmlContent = htmlContent.replace(/{{id}}/g, id);

  console.log("Content Done");
  return htmlContent;
}

function getDynamicInfo() {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");

  const timestamp = `${day}.${month}.${year} 18:00:00`;
  const id = `${year.slice(-2)}${month}${day}${minutes}${seconds}`;
  return { timestamp, id };
}

function readTemplate() {
  console.log("Read from templates");
  try {
    const files = fs.readdirSync(templatesDirectory);
    const htmlFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".html"
    );

    if (htmlFiles.length === 0) {
      throw new Error("No HTML files found in the directory.");
    }

    const randomIndex = Math.floor(Math.random() * htmlFiles.length);
    const randomFileName = htmlFiles[randomIndex];
    console.log(`Selected ${randomFileName}`);

    const content = fs.readFileSync(
      path.join(templatesDirectory, randomFileName),
      "utf8"
    );
    return content;
  } catch (error) {
    throw error;
  }
}

function sendMail(htmlContent) {
  console.log("Sending Mail");
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Email message configuration
  /**
   * @type {nodemailer.SendMailOptions}
   */
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: process.env.EMAIL_SUBJECT,
    html: htmlContent,
    textEncoding: "base64",
    alternatives: [
      {
        contentType: "text/plain",
        content: "This is an Html Mail please talk to you admin",
      },
    ],
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }

    // Close the transporter when done
    transporter.close();
  });
}
