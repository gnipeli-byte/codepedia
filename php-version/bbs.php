<?php
require_once 'DBInfo.php';
$keyword = $_GET['keyword'] ?? '';

try{
    $pdo = new PDO(DBInfo::DSN, DBInfo::USER, DBInfo::PASSWORD);

    if($keyword === ''){
        $stmt = $pdo->query('SELECT * FROM bbs order by id desc');
    }else{
        $escapedKeyword = str_replace(['%', '_'], ['\\%', '\\_'], $keyword);
        $stmt = $pdo->prepare('SELECT * FROM bbs WHERE message LIKE ? order by id desc');
        $stmt->execute(['%' . $escapedKeyword . '%']);
    }

    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
}catch(PDOException $e){
    echo 'エラー: ' . htmlspecialchars($e->getMessage());
    exit;
}
?>


<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>簿記なんでも掲示板｜簿記ペディア</title>
    <link rel="stylesheet" href="./bbs.css">
</head>
<body>
    <header>
        <h1>簿記なんでも掲示板</h1>
    </header>

    <noscript>
        <p class="noscript-message">JavaScriptを有効にしてください。</p>
    </noscript>

    <main>
        <div class="menu">
            <h2>掲示板のメニュー</h2>

            <div class="accordion">
                <div class="accordion-title search">
                    <h3>記事の検索</h3><img src="./image/button-plus.png" alt="">
                </div>
                    <div class="accordion-body search-open">
                        <form action="bbs.php" method="GET">
                            <p>次の項目を入力し、「検索」ボタンをクリックしてください。</p>
                            <input type="text" name="keyword">をメッセージに含む記事<br>
                            <button type="submit">検索</button>
                        </form>
                    </div>
            </div>

            <div class="accordion">
                <div class="accordion-title write">
                    <h3>新規記事の書き込み</h3><img src="./image/button-plus.png" alt="">
                </div>
                    <div class="accordion-body write-open">
                        <form action="bbs_insert.php" method="POST">
                            <p>次の項目を入力し、「書き込む」ボタンをクリックしてください。</p>
                                <span class="form-label-write">お名前</span>
                                    <input type="text" name="username" required><br>
                                <span class="form-label-write">カテゴリ</span>
                                    <select name="category" id="category" autocomplete="off">
                                        <option value="1級">1級</option>
                                        <option value="2級">2級</option>
                                        <option value="3級">3級</option>
                                    </select><br>
                                <span class="form-label-write">サブカテゴリ</span>
                                    <select name="subCategory" id="subCategory">
                                        <option value="商業簿記">商業簿記</option>
                                        <option value="会計学">会計学</option>
                                        <option value="工業簿記">工業簿記</option>
                                        <option value="原価計算">原価計算</option>
                                    </select><br>
                                <span class="form-label-write">メッセージ</span>
                                    <input type="text" name="message" required><br>
                                <button type="submit">書き込む</button>
                        </form>
                    </div>
            </div>

            <div class="accordion">
                <div class="accordion-title delete">
                    <h3>記事の削除（管理者専用）</h3><img src="./image/button-plus.png" alt="">
                </div>
                    <div class="accordion-body delete-open">
                        <form action="bbs_delete.php" method="POST">
                            <p>次の項目を入力し、「削除」ボタンをクリックしてください。</p>
                            <span class="form-label-delete">記事のID</span>
                                <input type="text" name="article-ID" pattern="[0-9]+" title="半角数字で入力してください" required><br>
                            <span class="form-label-delete">管理パスワード</span>
                                <input type="password" name="password" pattern="[a-zA-Z0-9]{4,8}" title="半角英数字4文字以上8文字以下で入力してください" maxlength="8" required><br>
                            <input type="checkbox" id="showPassword"><label for="showPassword">パスワードの表示</label><br>
                            <button type="submit">削除</button>
                        </form>
                    </div>
            </div>
        </div>

        <div class="article-list">
            <h2>記事一覧</h2>
                <p class="term">検索条件:<?= $keyword === '' ? 'なし' : '' ?></p>
                <?php if($keyword !== ''): ?>
                <p>メッセージに<b><u><?= htmlspecialchars($keyword) ?></u></b>を含む記事</p>
                <?php endif; ?>
            
                <?php if(empty($posts)): ?>
                <p style="color: red; font-weight: bold; font-size: 24px; text-align: center; margin-top: 22px;">検索条件に一致する書き込みはありません。</p>
                <?php else: ?>

            <table class="submissions">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>投稿日時</th>
                        <th>お名前</th>
                        <th>カテゴリ</th>
                        <th>サブカテゴリ</th>
                        <th>メッセージ</th>
                    </tr>
                </thead>
                <tbody>
                <?php foreach ($posts as $post): ?>
                    <tr>
                        <td><?= htmlspecialchars($post['id']) ?></td>
                        <td><?= htmlspecialchars($post['date']) ?></td>
                        <td><?= htmlspecialchars($post['name']) ?></td>
                        <td><?= htmlspecialchars($post['category']) ?></td>
                        <td><?= htmlspecialchars($post['subCategory']) ?></td>
                        <td><?= htmlspecialchars($post['message']) ?></td>
                    </tr>
                <?php endforeach; ?>
                    <!-- <tr>
                        <td>xx</td>
                        <td>2021-06-20 16:20:25</td>
                        <td>鳥畑建實</td>
                        <td>1級</td>
                        <td>日商簿記</td>
                        <td>文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。</td>
                    </tr> -->
                </tbody>
            </table>

                <?php endif; ?>
        </div>
    </main>

    <footer>
         <div class="footer-inner">
            <div class="footer-left">
                <a href="index.html"><img src="./image/f-logo.png" alt="東京CPA会計学院ロゴ"></a>

                <img src="./image/arrow-green.png" alt="">
                <a href="#">学校の紹介はこちら</a>
                <img src="./image/arrow-green.png" alt="">
                <a href="#">利用規約</a>
                <img src="./image/arrow-green.png" alt="">
                <a href="#">個人情報保護方針</a>
            </div>
            <div class="footer-right">
                <a href="#">お問い合わせ</a>
                <p>©CPA All Rights Reserved</p>
            </div>
        </div>
    </footer>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="bbs.js"></script>
</body>
</html>