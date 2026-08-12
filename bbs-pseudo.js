// 投稿データ(command.sqlのダミーデータ相当。localStorageになければこれを初期値にする)
const initialPosts = [
    { id: 1, date: "2026-06-18 11:20:25", name: "tomiヨシ", category: "初級", subCategory: "HTML・CSS", message: "floatとflexboxの違いがまだよく分かってない" },
    { id: 2, date: "2026-06-20 16:20:25", name: "ヤマヨシ", category: "中級", subCategory: "JavaScript", message: "fetchとajaxの使い分けで詰まってる" },
];
// 現在の投稿データ(これを配列として操作していく)
let posts = [...initialPosts];

// posts配列の中身をテーブルに描画する関数
function renderPosts(list){
    const $tbody = $('.submissions tbody');
    $tbody.empty(); //一旦空にする

    list.forEach(function(post){
        const row = `
            <tr>
                <td>${post.id}</td>
                <td>${post.date}</td>
                <td>${post.name}</td>
                <td>${post.category}</td>
                <td>${post.subCategory}</td>
                <td>${post.message}</td>
            </tr>
        `;
        $tbody.append(row);
    });
};



// ページ読み込み時、全ての .accordion-body を非表示にする
$(function(){
    $('.accordion-body').hide();

        // 「.accordion-title をクリックしたら何かする」というjQueryのイベント処理
        $('.accordion-title').click(function(){
            $(this).next().slideToggle(500);
            $(this).toggleClass('is-open');
        });

        $('#showPassword').change(function(){
            // console.log('変化した');
            if($(this).prop('checked')){
                $('input[name="password"]').attr('type', 'text');
            }else{
                $('input[name="password"]').attr('type', 'password');
            }
        });

        const subCategoryMap = {
            '初級': [{value:'HTML・CSS', label:'HTML・CSS'}, {value:'JavaScript', label:'JavaScript'}, {value:'環境構築', label:'環境構築'}],
            '中級': [{value:'JavaScript', label:'JavaScript'}, {value:'PHP・DB', label:'PHP・DB'}],
            '上級': [{value:'PHP・DB', label:'PHP・DB'}, {value:'環境構築', label:'環境構築'}]
        };
        $('#category').change(function(){
            const category = $(this).val();
            const options = subCategoryMap[category] || [];
            $('#subCategory').empty();
            options.forEach(function(item){
                $('#subCategory').append('<option value="' + item.value + '">' + item.label + '</option>');
            });
        });
        $('#category').trigger('change');



        // 「新規書き込み」フォームの送信を検知する
        $('.write-open form').on('submit', function(e){
            e.preventDefault(); // ページ遷移を止める(これがないとどこかに飛ぼうとしてエラーになる)
            
            const $form = $(this);

            // フォームの入力値を取得
            const name = $(this).find('input[name="username"]').val();
            const category = $(this).find('select[name="category"]').val();
            const subCategory = $(this).find('select[name="subCategory"]').val();
            const message = $(this).find('input[name="message"]').val();
            
            // 新しいIDを決める(今ある投稿の最大ID+1。投稿が0件のときは1)
            const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
            
            // 現在日時を "YYYY-MM-DD HH:MM:SS" 形式で作る
            const now = new Date();
            const pad = (n) => String(n).padStart(2, '0');
            const dateStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
        
            // 新しい投稿オブジェクトを作って配列の先頭に追加
            const newPost = {id:newId, date:dateStr, name:name, category:category, subCategory:subCategory, message:message};
            posts.unshift(newPost); // unshift = 配列の先頭に追加(新しい投稿を上に表示するため)
        
            renderPosts(posts); // 再描画

            $form.trigger('reset'); // フォームの入力欄を空に
            $('#category').trigger('change'); // カテゴリのリセットに合わせてサブカテゴリの選択肢も作り直す
        });
        renderPosts(posts);

        // 「投稿の削除」フォームの送信を検知する
        $('.delete-open form').on('submit', function(e){
            e.preventDefault();

            const $form = $(this);

            const targetId = Number($form.find('input[name="article-ID"]').val()); // 文字列で来るので数値に変換
            const password = $form.find('input[name="password"]').val();

            // パスワードチェック(PHP版と合わせて "password" 固定にしています)
            if(password !== 'password'){
                alert('管理パスワードが正しくありません。');
                return; // ここで処理を止める(フォームはリセットしない)
            }
            // 該当するIDが存在するかチェック
            const exists = posts.some(p => p.id === targetId);
            if(!exists){
                alert('指定されたIDの記事が見つかりませんでした。');
                return;
            }

            // 該当ID以外を残す形で配列を作り直す(= 削除)
            posts = posts.filter(p => p.id !== targetId);

            renderPosts(posts);

            $form.trigger('reset');
        });

        // 「投稿の検索」フォームの送信を検知する
        $('.search-open form').on('submit', function(e){
            e.preventDefault();

            const $form = $(this);
            const keyword = $form.find('input[name="keyword"]').val();

            if(keyword === ''){
                // キーワードが空なら全件表示に戻す
                renderPosts(posts);
                $('.term').text('検索条件:なし');
            }else{
                // messageに部分一致するものだけに絞り込む
                const filtered = posts.filter(p => p.message.includes(keyword));
                renderPosts(filtered);
                $('.term').text('検索条件: ' + keyword);
            }
        })

});

