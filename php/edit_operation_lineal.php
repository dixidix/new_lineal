	<?php	require 'db.php';
	// $_POST = json_decode(file_get_contents('php://input'), true);
	$errors = array();
	if (empty($_POST['ref_client'])){
		$errors['refClienteError'] = "ref Cliente inválida.";
	}
	if (empty($_POST['owner'])){
		$errors['ownerError'] = "Owner Inválido.";
	}
	if (empty($errors)){

		$shipment_origin = date("Y-m-d", strtotime($_POST['shipment_origin']));
		$estimated_arrival = date("Y-m-d", strtotime($_POST['estimated_arrival']));
		$arrival_date = date("Y-m-d", strtotime($_POST['arrival_date']));
		$release_date = date("Y-m-d", strtotime($_POST['release_date']));
		$expired_simi = date("Y-m-d", strtotime($_POST['expired_simi']));
		$forced_date = date("Y-m-d", strtotime($_POST['forced_date']));


		$owner = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['owner']));
		$ref_lsl = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['ref_lsl']));
		$ref_client = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['ref_client']));
		$operation_number = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['operation_number']));
		$merchandise = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['merchandise']));
		$custom_document_djai = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['custom_document_djai']));
		$fob_simi = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['fob_simi'])) ? MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['fob_simi'])) : NULL;
		$fob_simi_currency = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['fob_simi_currency'])) ? MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['fob_simi_currency'])) : NULL;
		$agency_amount = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['agency_amount'])) ? MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['agency_amount'])) : NULL;
		$custom_document = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['custom_document']));
		$fob_despacho = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['fob_despacho'])) ? MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['fob_despacho'])) : NULL;
		$fob_despacho_currency = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['fob_despacho_currency'])) ? MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['fob_despacho_currency'])) : '';
		$transport = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['transport_lineal']));
		$condition = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['condition'])) ? MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['condition'])) : NULL;
		$operation_state = MysqliDB::double_scape(MysqliDB::getInstance()->mysql_real_escape_string($_POST['op_state']));


		MysqliDB::getInstance()->query("UPDATE `operation` SET `ref_client`='".$ref_client."',`operation_number`='".$operation_number."',`operation_state`='".$operation_state."',`owner`='".$owner."',`merchandise`='".$merchandise."',`custom_document_djai`='".$custom_document_djai."',`fob_simi_currency`='".$fob_simi_currency."',`fob_simi`='".$fob_simi."',`expired_simi`='".$expired_simi."',`shipment_origin`='".$shipment_origin."',`estimated_arrival`='".$estimated_arrival."',`arrival_date`='".$arrival_date."',`agency_amount`='".$agency_amount."',`custom_document`='".$custom_document."',`fob_despacho_currency`='".$fob_despacho_currency."',`fob_despacho`='".$fob_despacho."',`transport`='".$transport."',`condition`='".$condition."',`forced_date`='".$forced_date."',`release_date`='".$release_date."' WHERE `ref_lsl` = '".$ref_lsl."'");
	}else{
		print_r($errors);
	}
	?>
