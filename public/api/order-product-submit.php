<?php

include_once(dirname(__FILE__) . '../../class/include.php');
if (!isset($_SESSION)) {
    session_start();
} 

$json = json_decode(file_get_contents('php://input'), true);
dd($json);
dd(json_decode($json, true));