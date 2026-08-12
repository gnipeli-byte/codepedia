<?php
require_once 'DBInfo.php';

$name = $_POST['username'];
$category = $_POST['category'];
$subCategory = $_POST['subCategory'];
$message = $_POST['message'];

try{
    $pdo = new PDO(DBInfo::DSN, DBInfo::USER, DBInfo::PASSWORD);
    $pdo->beginTransaction();
    $stmt = $pdo->prepare('INSERT INTO bbs (date, name, category, subCategory, message) VALUES (now(), ?, ?, ?, ?)');
    $stmt->execute([$name, $category, $subCategory, $message]);
    $pdo->commit();
}catch(PDOException $e){
    $pdo->rollBack();
    echo 'エラー: ' . htmlspecialchars($e->getMessage());
    exit;
}

header('Location: bbs.php');
exit;