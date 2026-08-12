<?php
require_once 'DBInfo.php';

$ID = $_POST['article-ID'];
$password = $_POST['password'];

try{
    if($password === 'password'){
        $pdo = new PDO(DBInfo::DSN, DBInfo::USER, DBInfo::PASSWORD);
        $pdo->beginTransaction();
        $stmt = $pdo->prepare('DELETE FROM bbs WHERE id = ?');
        $stmt->execute([$ID]);
        $pdo->commit();
    }else{
        header('Location: bbs.php');
        exit;
    }
}catch(PDOException $e){
    $pdo->rollBack();
    echo 'エラー: ' . htmlspecialchars($e->getMessage());
    exit;
}

header('Location: bbs.php');
exit;