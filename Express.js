// Express を使用する場合
const express = require('express');
const app = express();
app.use(cors({ origin: true })); // CORS ミドルウェアを app に設定

// ルートなどを定義
app.post('/send-email', async (req, res) => {
    // ... (現在の関数ロジック)
});

exports.sendEmailTemporary = functions.https.onRequest(app);

// Express を使用しない場合
exports.sendEmailTemporary = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => { // cors をこの中で使う
        try {
            // ... (現在の関数ロジック)
        } catch (error) {
            // ...
        }
    });
});