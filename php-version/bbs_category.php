<?php
$category = $_GET['category'];
    
switch($category){
    case "初級":
        $subCategory = [
            ["value" => "HTML・CSS", "label" => "HTML・CSS"],
            ["value" => "JavaScript", "label" => "JavaScript"],
            ["value" => "環境構築", "label" => "環境構築"]
        ];
        break;
    case '中級':
        $subCategory = [
            ['value' => 'JavaScript', 'label' => 'JavaScript'],
            ['value' => 'PHP・DB', 'label' => 'PHP・DB']
        ];
        break;
    case '上級':
        $subCategory = [
            ['value' => 'PHP・DB', 'label' => 'PHP・DB'],
            ['value' => '環境構築', 'label' => '環境構築']
        ];
        break;
}

echo json_encode($subCategory, JSON_UNESCAPED_UNICODE);