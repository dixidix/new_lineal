<?php
require 'db.php';
session_start();
$compare_date = date("d-m-Y", strtotime('1970-01-01'));
$res = MysqliDB::getInstance()->query("SELECT * from operation where operationTypeId='27' and deleted=0 ORDER BY operation_number DESC");
$outp="";
while($rs = $res->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $shipment_origin = date("d-m-Y", strtotime($rs["shipment_origin"]));
    $shipment = date("d-m-Y", strtotime($rs["shipment"]));
    $estimated_arrival = date("d-m-Y", strtotime($rs["estimated_arrival"]));
    $arrival_date = date("d-m-Y", strtotime($rs["arrival_date"]));
    $release_date = date("d-m-Y", strtotime($rs["release_date"]));
    
    $outp .= '{"ref_lsl":"'  . $rs["ref_lsl"].'",';
    $outp .= '"ref_client":"'   . $rs["ref_client"] .'",';
    $outp .= '"operation_number":'   . (int)$rs["operation_number"] .',';
    $outp .= '"merchandise":"'   . $rs["merchandise"].'",';
    $outp .= '"transport":"'   . $rs["transport"].'",';

    if($shipment_origin != $compare_date){
       $outp .= '"shipment_origin":"'   . $shipment_origin .'",';
   }else{
    $shipment_origin = "";
    $outp .= '"shipment_origin":"'   . $shipment_origin .'",';
}
if($estimated_arrival != $compare_date){
    $outp .= '"estimated_arrival":"'   . $estimated_arrival .'",';
}else{
    $estimated_arrival = "";
    $outp .= '"estimated_arrival":"'   . $estimated_arrival .'",';
}
$outp .= '"custom_document":"'   . $rs["custom_document"].'",';
$outp .= '"custom_document_djai":"'   . $rs["custom_document_djai"].'",';
if($arrival_date != $compare_date){
   $outp .= '"arrival_date":"'   . $arrival_date .'",';
}else{
    $arrival_date = "";
    $outp .= '"arrival_date":"'   . $arrival_date .'",';
}
if($release_date != $compare_date){
   $outp .= '"release_date":"'   . $release_date .'",';
}else{
    $release_date = "";
    $outp .= '"release_date":"'   . $release_date .'",';
}    
if(!empty($rs["funding_request_date"])){
    $request_funding_date = date("d-m-Y", strtotime($rs["funding_request_date"]));
    if($request_funding_date != $compare_date){
        $outp .= '"request_funding_date":"'   . $request_funding_date .'",';
    }else{
        $request_funding_date = "";
        $outp .= '"request_funding_date":"'   . $request_funding_date .'",';
    }
}else{
    $request_funding_date = "";
    $outp .= '"request_funding_date":"'   . $request_funding_date .'",';
}
if(!empty($rs["expired_simi"])){
    $expired_simi = date("d-m-Y", strtotime($rs["expired_simi"]));
    if($expired_simi != $compare_date){
        $outp .= '"expired_simi":"'   . $expired_simi .'",';
    }else{
        $expired_simi = "";
        $outp .= '"expired_simi":"'   . $expired_simi .'",';
    }
}else{
    $expired_simi = "";
    $outp .= '"expired_simi":"'   . $expired_simi .'",';
}
if(!empty($rs["recived_funds_date"])){
    $recived_funds_date = date("d-m-Y", strtotime($rs["recived_funds_date"]));
    if($recived_funds_date != $compare_date){
        $outp .= '"recived_funds_date":"'   . $recived_funds_date .'",';
    }else{
        $recived_funds_date = "";
        $outp .= '"recived_funds_date":"'   . $recived_funds_date .'",';
    }
}else{
    $recived_funds_date = "";
    $outp .= '"recived_funds_date":"'   . $recived_funds_date .'",';
}
$outp .= '"opTypeId":"'   . $rs["operationTypeId"] .'",';
$outp .= '"operation_state":"'   . $rs["operation_state"] .'",';
if(!empty($rs["owner"])){
    $uname = MysqliDB::getInstance()->query("SELECT name FROM users WHERE userId=" . $rs["owner"]);
    $rss = $uname->fetch_array(MYSQLI_ASSOC);
    $outp .= '"ownerId":"'   . $rs["owner"] .'",';
    $outp .= '"owner":"'   . $rss["name"] .'",';
}
$ress = MysqliDB::getInstance()->query("SELECT * from document where clientId='1'and operationTypeId='27'and ref_lsl='". $rs["ref_lsl"] ."' and doc_type='pdf' and deleted=0");
while($rss = $ress->fetch_array(MYSQLI_ASSOC)) {
    
    $outp .= '"file_name_pdf":"'   . $rss["document_name"].'",';
    $outp .= '"file_pdf":"'   . $rss["document_path"].'",';
    if(!empty($rss["document_path"])){
       $outp .= '"file_id_pdf":"'   . $rss["documentId"].'",';
    }
}
$ress = MysqliDB::getInstance()->query("SELECT * from document where clientId='1'and operationTypeId='27' and ref_lsl='". $rs["ref_lsl"] ."' and doc_type='fcl' and deleted=0");
while($rss = $ress->fetch_array(MYSQLI_ASSOC)) {

   $outp .= '"file_name_fcl":"'   . $rss["document_name"].'",';
   $outp .= '"file_fcl":"'   . $rss["document_path"].'",';
   if(!empty($rss["document_path"])){
    $outp .= '"file_id_fcl":"'   . $rss["documentId"].'",';
}
}
$ress = MysqliDB::getInstance()->query("SELECT * from document where clientId='1'and operationTypeId='27'and ref_lsl='". $rs["ref_lsl"] ."' and doc_type='simi' and deleted=0");
while($rss = $ress->fetch_array(MYSQLI_ASSOC)) {

    $outp .= '"file_name_simi":"'   . $rss["document_name"].'",';
    $outp .= '"file_simi":"'   . $rss["document_path"].'",';
    if(!empty($rss["document_path"])){
        $outp .= '"file_id_simi":"'   . $rss["documentId"].'",';
    }
}
if(!empty($rs["forced_date"])){
    $forced_date = date("d-m-Y", strtotime($rs["forced_date"]));
    if($forced_date != $compare_date){
        $outp .= '"forced_date":"'   . $forced_date .'",';
    }else{
        $forced_date = "";
        $outp .= '"forced_date":"'   . $forced_date .'",';
    }
}else{
    $forced_date = "";
    $outp .= '"forced_date":"'   . $forced_date .'",';
}

if(!empty($rs["deposit_enter"])){
    $deposit_enter = date("d-m-Y", strtotime($rs["deposit_enter"]));
    if($deposit_enter != $compare_date){
        $outp .= '"deposit_enter":"'   . $deposit_enter .'",';
    }else{
        $deposit_enter = "";
        $outp .= '"deposit_enter":"'   . $deposit_enter .'",';
    }
}else{
    $deposit_enter = "";
    $outp .= '"deposit_enter":"'   . $deposit_enter .'",';
}

$outp .= '"fob_simi":"'   . $rs["fob_simi"].'",';
$outp .= '"fob_simi_currency":"'   . $rs["fob_simi_currency"].'",';
$outp .= '"fob_despacho":"'   . $rs["fob_despacho"].'",';
$outp .= '"fob_despacho_currency":"'   . $rs["fob_despacho_currency"].'",';
$outp .= '"condition":"'   . $rs["condition"].'",';
$outp .= '"agency_amount":"'   . $rs["agency_amount"].'",';

$outp .= '"transport_expo":"'   . $rs["transport_expo"].'",';
$outp .= '"agency":"'   . $rs["agency"].'",';
$outp .= '"channel":"'   . $rs["channel"].'",';
$outp .= '"fob_rights":"'   . $rs["fob_rights"].'",';
if(!empty($rs["cut_off"])){
    $cut_off = date("d-m-Y", strtotime($rs["cut_off"]));
    if($cut_off != $compare_date){
        $outp .= '"cut_off":"'   . $cut_off .'",';
    }else{
        $cut_off = "";
        $outp .= '"cut_off":"'   . $cut_off .'",';
    }
}else{
    $cut_off = "";
    $outp .= '"cut_off":"'   . $cut_off .'",';
}
$outp .= '"lsl_bill":"'. $rs["lsl_bill"].'"}';
}
$outp ='{"op_lineal":['.$outp.']}';
echo($outp);
?>
