<?php
$category = $_GET['category'];
    
switch($category){
    case "1級":
        $subCategory = [
            ["value" => "商業簿記", "label" => "商業簿記"],
            ["value" => "会計学", "label" => "会計学"],
            ["value" => "工業簿記", "label" => "工業簿記"],
            ["value" => "原価計算", "label" => "原価計算"],
        ];
        break;
    case '2級':
        $subCategory = [
            ['value' => '商業簿記', 'label' => '商業簿記'],
            ['value' => '工業簿記', 'label' => '工業簿記'],
        ];
        break;
    case '3級':
        $subCategory = [
            ['value' => '商業簿記', 'label' => '商業簿記']
        ];
        break;
}

echo json_encode($subCategory, JSON_UNESCAPED_UNICODE);