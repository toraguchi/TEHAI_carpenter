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
app.post("/send-email", upload.array("image1","image2","image3"), async (req, res) => {
    try {
        // フォームデータを取得
        const { company, postalcode, address, datetime } = req.body;

        // メール本文の作成
        const emailBody = `
【依頼フォーム内容】
■ 企業名: ${company || "未入力"}
■ 郵便番号: ${postalcode || "未入力"}
■ 住所: ${address || "未入力"}
■ 希望日時: ${datetime || "未入力"}

ご対応可否／お見積もり金額を
1週間前までに、ご返信よろしくお願いいたします。
        `.trim();

        // 添付ファイルの処理
        const attachments = [];
        if (req.files) {
            req.files.forEach((file) => {
                attachments.push({
                    filename: file.originalname,
                    path: file.path,
                });
            });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "info@2019showtime.com",
                pass: "sjrhfdxlxshsyizi",
            },
        });

        // メールオプションの設定
        const mailOptions = {
            from: process.env.GMAIL_USER, // 送信元
            to: "show2019.11.12@gmail.com", // 送信先
            subject: "【依頼フォーム】新しい依頼が届きました", // 件名
            text: emailBody, // 本文
            attachments, // 添付ファイル
        };

        // メール送信
        await transporter.sendMail(mailOptions);

        // アップロードされたファイルを削除
        if (req.files) {
            req.files.forEach((file) => {
                fs.unlinkSync(file.path);
            });
        }

        res.status(200).send("メールが送信されました");
    } catch (error) {
        console.error("メール送信エラー:", error);
        res.status(500).send("メール送信中にエラーが発生しました");
    }
});

// サーバー起動
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`サーバーがポート ${PORT} で起動しました`);
});