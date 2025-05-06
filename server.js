app.post("/send-email", (req, res) => {
    upload.array("images", 3)(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.error("Multer エラー:", err);
            return res.status(400).send(`Multer エラー: ${err.message}`);
        } else if (err) {
            console.error("その他のエラー:", err);
            return res.status(500).send("サーバーエラーが発生しました");
        }

        // メール送信処理
        try {
            const { company, postalcode, address, datetime } = req.body;

            const emailBody = `
【依頼フォーム内容】
■ 企業名: ${company || "未入力"}
■ 郵便番号: ${postalcode || "未入力"}
■ 住所: ${address || "未入力"}
■ 希望日時: ${datetime || "未入力"}

ご対応可否／お見積もり金額を
1週間前までに、ご返信よろしくお願いいたします。
            `.trim();

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

            const mailOptions = {
                from: process.env.GMAIL_USER,
                to: "show2019.11.12@gmail.com",
                subject: "【依頼フォーム】新しい依頼が届きました",
                text: emailBody,
                attachments,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("メール送信エラー:", error);
                    return res.status(500).send("メール送信中にエラーが発生しました");
                }

                // アップロードされたファイルを削除
                if (req.files) {
                    req.files.forEach((file) => {
                        fs.unlinkSync(file.path);
                    });
                }

                res.status(200).send("メールが送信されました");
            });
        } catch (error) {
            console.error("エラー詳細:", error);
            res.status(500).send("サーバーエラーが発生しました");
        }
    });
});