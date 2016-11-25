<?php
require 'db.php';
session_start();
// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);
$fileId = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['fileId']));
MysqliDB::getInstance()->query("UPDATE `document`  SET `document_path`= null,`document_name`= null WHERE documentId=" . $fileId);
?>
