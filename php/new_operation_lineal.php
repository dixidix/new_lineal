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

		echo
		MysqliDB::getInstance()->query("INSERT INTO `operation` (`ref_lsl`,`ref_client`,`operation_number`,  `operationTypeId`,  `owner`, `merchandise`, `custom_document_djai`, `fob_simi_currency`, `fob_simi`, `expired_simi`, `shipment_origin`, `estimated_arrival`, `arrival_date`, `agency_amount`, `custom_document`, `fob_despacho_currency`,`fob_despacho`,`transport`, `condition`, `forced_date` , `release_date`) VALUES (null,'".$ref_client."','".$operation_number."', 27,'".$owner."','".$merchandise."','".$custom_document_djai."','".$fob_simi_currency."','".$fob_simi."','".$expired_simi."','".$shipment_origin."','".$estimated_arrival."','".$arrival_date."','".$agency_amount."','".$custom_document."','".$fob_despacho_currency."','".$fob_despacho."','".$transport."','".$condition."','".$forced_date."','".$release_date."')");
		echo
		MysqliDB::getInstance()->error();
		
	}else{
		print_r($errors);
	}
	?>
