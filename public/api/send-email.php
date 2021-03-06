<?php

//----------------------Company Information---------------------
$json = json_decode(file_get_contents('php://input'), true);
require_once "Mail.php";

date_default_timezone_set('Asia/Colombo');
$todayis = date("l, F j, Y, g:i a");
$site_link = "https://" . $_SERVER['HTTP_HOST'];

//Display Strings 
$comany_name = "DEWENDRA BRAND STORE";
$website_name = "www.dewendra.com";
$comConNumber = "(+94) 71 869 5499";
$comEmail = "sales@dewendra.com";
$comOwner = "DEWENDRA BRAND STORE";

// Post Variables
$visitor_name = $json['fullName'];
$visitor_email = $json['email'];
$visitor_phone = $json['phoneNumber'];
$message = $json['message'];


//server webmail login

$host = "sg1-ls7.a2hosting.com";
$username = "sales@dewendra.com";
$password = "$6)~W{voGKY6";

//------------------------

$webmail = "sales@dewendra.com";
$visitorSubject = "Thank You " . $visitor_name . " - DEWENDRA BRAND STORE";
$companySubject = "Contact Inquiry - " . $visitor_name;

//----------------------CAPTCHACODE---------------------
//----------------------- LOGO ---------------------------------

$logo = $site_link . '/assets/images/logo/logo.png';
//$logo = 'https://ci4.googleusercontent.com/proxy/lz0tSijRTHwJ3I7PQ1iXA67lYFfULG0evRbR_St785VeiABNukQPJl-JGBcLKTkZz1q4pG6g25P1uxTW4dYkOznHHNV3f-zB=s0-d-e1-ft#http://romaya.galle.website/booking-form/img/logo.png';



session_start();

$response = array();

//if ($_SESSION['CAPTCHACODE'] != $_POST['captchacode']) {
//
//    $response['status'] = 'incorrect';
//
//    $response['msg'] = 'Security Code is invalid';
//
//    echo json_encode($response);
//
//    exit();
//}

include("mail-template.php");


$visitorHeaders = array('MIME-Version' => '1.0', 'Content-Type' => "text/html; charset=ISO-8859-1", 'From' => $webmail,
    'To' => $visitor_email,
    'Reply-To' => $comEmail,
    'Subject' => $visitorSubject);

$companyHeaders = array('MIME-Version' => '1.0', 'Content-Type' => "text/html; charset=ISO-8859-1", 'From' => $webmail,
    'To' => $webmail,
    'Reply-To' => $visitor_email,
    'Subject' => $companySubject);


$smtp = Mail::factory('smtp', array('host' => $host,
            'auth' => true,
            'username' => $username,
            'password' => $password));

$visitorMail = $smtp->send($visitor_email, $visitorHeaders, $visitor_message);
$companyMail = $smtp->send($webmail, $companyHeaders, $company_message);

if (PEAR::isError($visitorMail && $companyMail)) {

    $response = $mail->getMessage();

//"Your message has not been sent"

    $feedData = json_encode($response);

    echo '{"feedData":' . $feedData . '}';

    exit();
} else {

    $response = "Your message has been sent successfully";
    $feedData = json_encode($response);

    echo '{"feedData":' . $feedData . '}';

//"Your message has been sent successfully"

    exit();
}
