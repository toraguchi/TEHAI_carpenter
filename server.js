const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const fs = require("fs");

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));
const upload = multer({ dest: "/tmp" });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// メール送信処理
async function sendEmail(req, res) {
  try {
    console.log("リクエストボディ:", req.body);
    console.log("アップロードファイル:", req.files);

    const attachments = [];
    if (req.files) {
      Object.keys(req.files).forEach((key) => {
        req.files[key].forEach((file) => {
          attachments.push({
            filename: file.originalname,
            path: file.path,
          });
        });
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: "show2019.11.12@gmail.com", // 送信先メールアドレス
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

    await transporter.sendMail(mailOptions);

    // 一時ファイルを削除
    if (req.files) {
      Object.keys(req.files).forEach((key) => {
        req.files[key].forEach((file) => {
          fs.unlinkSync(file.path);
        });
      });
    }

    res.status(200).send("メールが送信されました");
  } catch (error) {
    console.error("メール送信エラー:", error);
    res.status(500).send("メール送信に失敗しました");
  }
}

app.post("/send-email", upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
]), sendEmail);

exports.api = functions.https.onRequest(app);