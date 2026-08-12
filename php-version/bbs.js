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

});

