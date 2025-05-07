# プロジェクトのディレクトリに移動
cd /Users/t-daichi/Documents/Webapp/TEHAI_carpenter

# Git リポジトリを初期化
git init

# すべてのファイルをステージング
git add .

# コミットを作成
git commit -m "Initial commit"

# リモートリポジトリを追加
git remote add origin https://github.com/toraguchi/TEHAI_carpenter.git

# メインブランチにプッシュ
git branch -M main
git push -u origin main
