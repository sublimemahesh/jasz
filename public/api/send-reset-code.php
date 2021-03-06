<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);

$MEMBER = new Member(NULL);
if ($MEMBER->checkEmail($json)) {

    if ($MEMBER->GenarateCode($json)) {
        $res = $MEMBER->SelectForgetUser($json);

        $username = $MEMBER->username;
        $email = $MEMBER->email;
        $resetcode = $MEMBER->restCode;
        
        date_default_timezone_set('Asia/Colombo');
        $todayis = date("l, F j, Y, g:i a");

        //------------
        //server webmail login

        $host = "sg1-ls7.a2hosting.com";
        $username = "sales@dewendra.com";
        $password = "$6)~W{voGKY6";

        $webmail = "sales@dewendra.com";
        $comEmail = "sales@dewendra.com";
        $visitorSubject = "Dashboard Password Reset - DEWENDRA BRAND STORE";

        $html = "<table style='border:solid 1px #F0F0F0; font-size: 15px; font-family: sans-serif; padding: 0;'>";

        $html .= "<tr><th colspan='3' style='font-size: 18px; padding: 30px 25px 0 25px; color: #fff; text-align: center; background-color: #4184F3;'><h2>Sublime Holdings</h2> </th> </tr>";

        $html .= "<tr><td colspan='3' style='font-size: 16px; padding: 20px 25px 10px 25px; color: #333; text-align: left; background-color: #fff;'><h3>" . $subject . "</h3> </td> </tr>";

        $html .= "<tr><td colspan='3' style='font-size: 14px; padding: 5px 25px 10px 25px; color: #666; background-color: #fff; line-height: 25px;'><b>Password Reset Code: </b> " . $resetcode . "</td></tr>";

        $html .= "<tr><td colspan='3' style='font-size: 14px; padding: 0 25px 10px 25px; color: #666; background-color: #fff; '><b>Username: </b> " . $username . "</td></tr>";

        $html .= "<tr><td colspan='3' style='font-size: 14px; background-color: #FAFAFA; padding: 25px; color: #333; font-weight: 300; text-align: justify; '>Thank you</td></tr>";

        $html .= "</table>";


        $visitorHeaders = array('MIME-Version' => '1.0', 'Content-Type' => "text/html; charset=ISO-8859-1", 'From' => $webmail,
            'To' => $email,
            'Reply-To' => $comEmail,
            'Subject' => $visitorSubject);


        $smtp = Mail::factory('smtp', array('host' => $host,
                    'auth' => true,
                    'username' => $username,
                    'password' => $password));

        $visitorMail = $smtp->send($email, $visitorHeaders, $html);



        if (PEAR::isError($visitorMail)) {
            $result = 'There was an error.';
        } else {
            $result = 'success';
        }
    }
} else {
    $result = 'Please enter a correct email address.';
}

$feedData = json_encode($result);

echo '{"feedData":' . $feedData . '}';
