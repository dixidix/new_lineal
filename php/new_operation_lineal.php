	<?php	require 'db.php';
	// $_POST = json_decode(file_get_contents('php://input'), true);
	$errors = array();
	if (empty($_POST['ref_client'])){
		$errors['refClienteError'] = "ref Cliente inválida.";
	}
	if (empty($_POST['owner'])){
		$errors['ownerError'] = "Owner Inválido.";
	}
	if(!empty($_FILES['file_imp_pdf'])){
		if($_FILES['file_imp_pdf']['type'] != "application/pdf"){
			$errors['typePdfError'] = "El archivo no es PDF";
		}
	}
	if(!empty($_FILES['file_imp_fcl'])){
		if($_FILES['file_imp_fcl']['type'] != "application/pdf"){
			$errors['typePdfError'] = "El archivo no es PDF";
		}
	}
	if(!empty($_FILES['file_imp_simi'])){
		if($_FILES['file_imp_simi']['type'] != "application/pdf"){
			$errors['typePdfError'] = "El archivo no es PDF";
		}
	}
	if (empty($errors)){

		$shipment_origin = date("Y-m-d", strtotime($_POST['shipment_origin']));
		$estimated_arrival = date("Y-m-d", strtotime($_POST['estimated_arrival']));
		$arrival_date = date("Y-m-d", strtotime($_POST['arrival_date']));
		$release_date = date("Y-m-d", strtotime($_POST['release_date']));
		$expired_simi = date("Y-m-d", strtotime($_POST['expired_simi']));
		$forced_date = date("Y-m-d", strtotime($_POST['forced_date']));

		$client_id = 1;
		$op_type = 27;
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


		if(!empty($_FILES['file_imp_pdf'])){
			$file_name_pdf = $_FILES['file_imp_pdf']['name'];
			$file_name_pdf = str_replace(' ', '_', $file_name_pdf);
			$file_size_pdf =$_FILES['file_imp_pdf']['size'];
			$file_tmp_pdf = $_FILES['file_imp_pdf']['tmp_name'];
			$file_type_pdf =$_FILES['file_imp_pdf']['type'];
			$file_ext_pdf = strtolower(pathinfo($file_name_pdf, PATHINFO_EXTENSION));
			$timestamp = $_POST['timeStamp'];
			$fileSystemname_pdf = $file_name_pdf . $timestamp;
			$fileSystemname_pdf = hash('sha256', $fileSystemname_pdf);
			$fileSystemname_pdf = "$fileSystemname_pdf.$file_ext_pdf";
			$tmp_path_pdf = "../files/".$fileSystemname_pdf;
			$path_pdf = "/mylsl/files/".$fileSystemname_pdf;
		}
		if(!empty($_FILES['file_imp_fcl'])){
			$file_name_fcl = $_FILES['file_imp_fcl']['name'];
			$file_name_fcl = str_replace(' ', '_', $file_name_fcl);
			$file_size_fcl =$_FILES['file_imp_fcl']['size'];
			$file_tmp_fcl = $_FILES['file_imp_fcl']['tmp_name'];
			$file_type_fcl =$_FILES['file_imp_fcl']['type'];
			$file_ext_fcl = strtolower(pathinfo($file_name_fcl, PATHINFO_EXTENSION));
			$timestamp = $_POST['timeStamp'];
			$fileSystemname_fcl = $file_name_fcl . $timestamp;
			$fileSystemname_fcl = hash('sha256', $fileSystemname_fcl);
			$fileSystemname_fcl = "$fileSystemname_fcl.$file_ext_fcl";
			$tmp_path_fcl = "../files/".$fileSystemname_fcl;
			$path_fcl = "/mylsl/files/".$fileSystemname_fcl;
		}
		if(!empty($_FILES['file_imp_simi'])){
			$file_name_simi = $_FILES['file_imp_simi']['name'];
			$file_name_simi = str_replace(' ', '_', $file_name_simi);
			$file_size_simi =$_FILES['file_imp_simi']['size'];
			$file_tmp_simi = $_FILES['file_imp_simi']['tmp_name'];
			$file_type_simi =$_FILES['file_imp_simi']['type'];
			$file_ext_simi = strtolower(pathinfo($file_name_simi, PATHINFO_EXTENSION));
			$timestamp = $_POST['timeStamp'];
			$fileSystemname_simi = $file_name_simi . $timestamp;
			$fileSystemname_simi = hash('sha256', $fileSystemname_simi);
			$fileSystemname_simi = "$fileSystemname_simi.$file_ext_simi";
			$tmp_path_simi = "../files/".$fileSystemname_simi;
			$path_simi = "/mylsl/files/".$fileSystemname_simi;
		}
		if(!file_exists("../files/")){
			mkdir("../files/");
			if(!empty($_FILES['file_imp_pdf'])){
				move_uploaded_file($file_tmp_pdf, "$tmp_path_pdf");
			}
			if(!empty($_FILES['file_imp_fcl'])){
				move_uploaded_file($file_tmp_fcl, "$tmp_path_fcl");
			}
			if(!empty($_FILES['file_imp_simi'])){
				move_uploaded_file($file_tmp_simi, "$tmp_path_simi");
			}
		}
		else{
			if(!empty($_FILES['file_imp_pdf'])){
				move_uploaded_file($file_tmp_pdf, "$tmp_path_pdf");
			}
			if(!empty($_FILES['file_imp_fcl'])){
				move_uploaded_file($file_tmp_fcl, "$tmp_path_fcl");
			}
			if(!empty($_FILES['file_imp_simi'])){
				move_uploaded_file($file_tmp_simi, "$tmp_path_simi");
			}
		}


		echo
		MysqliDB::getInstance()->query("INSERT INTO `operation` (`ref_lsl`,`ref_client`,`operation_number`,`clientId`,  `operationTypeId`,  `owner`, `merchandise`, `custom_document_djai`, `fob_simi_currency`, `fob_simi`, `expired_simi`, `shipment_origin`, `estimated_arrival`, `arrival_date`, `agency_amount`, `custom_document`, `fob_despacho_currency`,`fob_despacho`,`transport`, `condition`, `forced_date` , `release_date`) VALUES (null,'".$ref_client."','".$operation_number."', 1, 27,'".$owner."','".$merchandise."','".$custom_document_djai."','".$fob_simi_currency."','".$fob_simi."','".$expired_simi."','".$shipment_origin."','".$estimated_arrival."','".$arrival_date."','".$agency_amount."','".$custom_document."','".$fob_despacho_currency."','".$fob_despacho."','".$transport."','".$condition."','".$forced_date."','".$release_date."')");
		echo
		MysqliDB::getInstance()->error();
		$res = MysqliDB::getInstance()->query("SELECT ref_lsl FROM operation WHERE ref_client='". $ref_client . "'");
		$rss = $res->fetch_array(MYSQLI_ASSOC);
		$ref_lsl = $rss['ref_lsl'];
		if(!empty($_FILES['file_imp_pdf'])){
			MysqliDB::getInstance()->query("INSERT INTO `document`(`clientId`, `operationTypeId`, `ref_lsl`, `document_path`,`document_name`, `document_ext`, `doc_type`) VALUES ('" . $client_id . "','" . $op_type . "','" . $ref_lsl . "','" . $path_pdf . "','" . $file_name_pdf . "','" . $file_ext_pdf . "','pdf')");
			echo
			MysqliDB::getInstance()->error();
		}
		else{
			MysqliDB::getInstance()->query("INSERT INTO `document`(`clientId`, `operationTypeId`, `ref_lsl`, `doc_type`) VALUES ('" . $client_id . "','" . $op_type . "','" . $ref_lsl . "','pdf')");
			echo
			MysqliDB::getInstance()->error();
		}
		if(!empty($_FILES['file_imp_fcl'])){
			MysqliDB::getInstance()->query("INSERT INTO `document`(`clientId`,`operationTypeId`, `ref_lsl`, `document_path`,`document_name`,  `document_ext`, `doc_type`) VALUES ('" . $client_id . "','" . $op_type . "','" . $ref_lsl . "','" . $path_fcl . "','" . $file_name_fcl . "','" . $file_ext_fcl . "','fcl')");
			echo
			MysqliDB::getInstance()->error();
		}
		else{
			MysqliDB::getInstance()->query("INSERT INTO `document`(`clientId`,`operationTypeId`, `ref_lsl`, `doc_type`) VALUES ('" . $client_id . "','" . $op_type . "','" . $ref_lsl . "','fcl')");
			echo
			MysqliDB::getInstance()->error();
		}
		if(!empty($_FILES['file_imp_simi'])){
			MysqliDB::getInstance()->query("INSERT INTO `document`(`clientId`,`operationTypeId`, `ref_lsl`, `document_path`,`document_name`, `document_ext`, `doc_type`) VALUES ('" . $client_id . "','" . $op_type . "','" . $ref_lsl . "','" . $path_simi . "','" . $file_name_simi . "','" . $file_ext_simi . "','simi')");
			echo
			MysqliDB::getInstance()->error();
		}
		else{
			MysqliDB::getInstance()->query("INSERT INTO `document`(`clientId`,`operationTypeId`, `ref_lsl`, `doc_type`) VALUES ('" . $client_id . "','" . $op_type . "','" . $ref_lsl . "','simi')");
			echo
			MysqliDB::getInstance()->error();
		}
	}else{
		print_r($errors);
	}
	?>
