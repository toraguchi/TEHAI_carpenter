const functions = require("firebase-functions");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true }); // 正しい CORS 初期化

// Multer の設定：メモリにファイルを保存
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
]);

/**
 * メール送信を処理する Firebase Function。
 * HTTP リクエストに応答し、ファイルアップロードを含むフォームデータを処理します。
 */
exports.sendEmailTemporary = functions.https.onRequest(async (req, res) => {
    // CORS ヘッダーを送信するためのミドルウェアを *最初に* 使用
    cors(req, res, async () => {
        try {
            // ファイルアップロード処理を Promise でラップ
            await new Promise((resolve, reject) => {
                upload(req, res, (err) => {
                    if (err) {
                        console.error("Multer エラー:", err);
                        return reject(res.status(500).send("ファイルアップロードエラー"));
                    } else {
                        resolve();
                    }
                });
            });

            console.log("リクエストボディ:", req.body);
            console.log("アップロードされたファイル:", req.files);

            const attachments = [];
            if (req.files) {
                for (const key in req.files) {
                    if (req.files.hasOwnProperty(key)) {
                        const file = req.files[key][0];
                        attachments.push({
                            filename: file.originalname,
                            content: file.buffer,
                        });
                    }
                }
            }

            console.log("添付ファイル:", attachments);

            // Nodemailer トランスポーターの設定
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: functions.config().gmail.user,
                    pass: functions.config().gmail.pass,
                },
            });

            // メールオプションの設定
            const mailOptions = {
                from: functions.config().gmail.user,
                to: "show2019.11.12@gmail.com", // あなたのメールアドレスに置き換えてください
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

            // メールを送信
            await transporter.sendMail(mailOptions);

            res.status(200).send("メールを送信しました");
        } catch (error) {
            console.error("メール送信エラー:", error);
             // エラー応答が常に送信されるようにする
            if (!res.headersSent) {
                res.status(500).send(`メール送信エラー: ${error.message}`);
            }
        }
    });
});
