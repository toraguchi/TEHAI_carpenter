const functions = require("firebase-functions");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true }); // Initialize cors *correctly*

// Multer setup for handling file uploads to memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
]);

/**
 * Firebase Function to handle sending emails with attachments.
 * Responds to HTTP requests and processes form data including file uploads.
 */
exports.sendEmailTemporary = functions.https.onRequest(async (req, res) => {
    // Wrap the entire function logic, *including* upload, in the cors handler
    cors(req, res, async () => { 
        try {
            // Wrap the entire file upload and email sending logic in a promise
            await new Promise((resolve, reject) => {
                upload(req, res, (err) => {
                    if (err) {
                        console.error("Multer error:", err);
                        return reject(res.status(500).send("File upload error"));
                    } else {
                        resolve();
                    }
                });
            });

            console.log("Request body:", req.body);
            console.log("Uploaded files:", req.files);

            const attachments = [];
            if (req.files) {
                for (const key in req.files) {
                    if (req.files.hasOwnProperty(key)) {
                        for (const file of req.files[key]) {
                            attachments.push({
                                filename: file.originalname,
                                content: file.buffer,
                            });
                        }
                    }
                }
            }

            console.log("Attachments:", attachments);

            // Nodemailer transporter setup
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: functions.config().gmail.user,
                    pass: functions.config().gmail.pass,
                },
            });

            // Mail options setup
            const mailOptions = {
                from: functions.config().gmail.user,
                to: "show2019.11.12@gmail.com", // Replace with your email
                subject: "【依頼フォーム】新しい依頼が届きました",
                text: `
          【依頼フォーム内容】
          ■ 企業名: ${req.body.company || "未入力"}
          ■ 郵便番号: ${req.body.postalcode || "未入力"}
          ■ 住所: ${req.body.address || "未入力"}
          ■ 希望日時: ${req.body.datetime || "未入力"}
        `.trim(),
                attachments,
            };

            // Send the email
            await transporter.sendMail(mailOptions);

            res.status(200).send("Email sent successfully");
        } catch (error) {
            console.error("Error sending email:", error);
            // Ensure that you are sending an error response in all cases
            if (!res.headersSent) {
                res.status(500).send(`Email sending error: ${error.message}`);
            }
        }
    });
});