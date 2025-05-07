require("dotenv").config(); // 環境変数を読み込む
const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const fs = require("fs");
const cors = require("cors");

const app = express(); // Express アプリケーションを作成
const upload = multer({ dest: "uploads/" }); // アップロードされたファイルを一時保存

// CORS を有効化
app.use(cors());

// POST データを解析するためのミドルウェア
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// メール送信エンドポイント
app.post("/send-email", upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
]), async (req, res) => {
    try {
        console.log("リクエストボディ:", req.body);
        console.log("アップロードファイル:", req.files);

        // 添付ファイルの処理
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

        console.log("添付ファイル:", attachments);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
            user: "info@2019showtime.com",
            pass: "sjrhfdxlxshsyizi",
            },
            });

        // メールオプションの設定
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: "show2019.11.12@gmail.com",
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

        // メール送信
        await transporter.sendMail(mailOptions);

        // アップロードされたファイルを削除
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
        res.status(500).send("メール送信中にエラーが発生しました");
    }
});
const cors = require("cors");
app.use(cors({
    origin: "https://your-frontend.netlify.app", // Netlify の公開 URL
}));