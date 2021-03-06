<?php

/**
 * Description of Order
 *
 * @author U s E r ¨
 */
class Order
{

    public $id;
    public $orderedAt;
    public $member;
    public $address;
    public $city;
    public $country;
    public $postalCode;
    public $amount;
    public $shipping_amount;
    public $orderNote;
    public $status;
    public $deliveryStatus;
    public $deliveredAt;
    public $completedAt;
    public $canceledAt;

    public function __construct($id)
    {
        if ($id) {

            $query = "SELECT *  FROM `orders` WHERE `id`='" . $id . "'";

            $db = new Database();

            $result = mysql_fetch_assoc($db->readQuery($query));

            $this->id = $result['id'];
            $this->orderedAt = $result['ordered_at'];
            $this->member = $result['member'];
            $this->address = $result['address'];
            $this->city = $result['city'];
            $this->country = $result['country'];
            $this->postalCode = $result['postal_code'];
            $this->amount = $result['amount'];
            $this->shipping_amount = $result['shipping_amount'];
            $this->orderNote = $result['order_note'];
            $this->status = $result['status'];
            $this->deliveryStatus = $result['delivery_status'];
            $this->deliveredAt = $result['delivered_at'];
            $this->completedAt = $result['completed_at'];
            $this->canceledAt = $result['canceled_at'];

            return $result;
        }
    }

    public function create()
    {

        $query = "INSERT INTO `orders` ("
            . "`ordered_at`,"
            . "`member`,"
            . "`address`,"
            . "`city`,"
            . "`country`,"
            . "`postal_code`,"
            . "`amount`,"
            . "`shipping_amount`,"
            . "`order_note`,"
            . "`status`,"
            . "`delivery_status`,"
            . "`delivered_at`,"
            . "`completed_at`,"
            . "`canceled_at`) VALUES  ("
            . "'" . $this->orderedAt . "', "
            . "'" . $this->member . "', "
            . "'" . $this->address . "', "
            . "'" . $this->city . "', "
            . "'" . $this->country . "', "
            . "'" . $this->postalCode . "', "
            . "'" . $this->amount . "', "
            . "'" . $this->shipping_amount . "', "
            . "'" . $this->order_note . "', "
            . "'" . $this->status . "', "
            . "'" . $this->deliveryStatus . "', "
            . "'" . $this->deliveredAt . "', "
            . "'" . $this->completedAt . "', "
            . "'" . $this->canceledAt . "')";

        $db = new Database();

        $result = $db->readQuery($query);

        if ($result) {
            $last_id = mysql_insert_id();

            return $last_id;
        } else {
            return FALSE;
        }
    }

    public function all()
    {

        $query = "SELECT * FROM `orders`";
        $db = new Database();
        $result = $db->readQuery($query);
        $array_res = array();

        while ($row = mysql_fetch_array($result)) {
            array_push($array_res, $row);
        }

        return $array_res;
    }

    public function getOrdersByDateRange($from, $to, $status)
    {

        $query = "SELECT * FROM `orders` WHERE `delivery_status`='" . $status . "' AND `status`='1' AND (`ordered_at` BETWEEN '" . $from . "' AND '" . $to . "' OR `ordered_at` LIKE '%" . $to . "%')";
        $db = new Database();
        $result = $db->readQuery($query);
        $array_res = array();

        while ($row = mysql_fetch_array($result)) {
            array_push($array_res, $row);
        }

        return $array_res;
    }

    public function getUnpaidOrdersByDateRange($from, $to)
    {

        $query = "SELECT * FROM `orders` WHERE `status`='0' AND (`ordered_at` BETWEEN '" . $from . "' AND '" . $to . "' OR `ordered_at` LIKE '%" . $to . "%') ";
        $db = new Database();
        $result = $db->readQuery($query);
        $array_res = array();

        while ($row = mysql_fetch_array($result)) {
            array_push($array_res, $row);
        }

        return $array_res;
    }

    public function getPaidOrders()
    {

        $query = "SELECT * FROM `orders` WHERE `status`='1' ";
        $db = new Database();
        $result = $db->readQuery($query);
        $array_res = array();

        while ($row = mysql_fetch_array($result)) {
            array_push($array_res, $row);
        }

        return $array_res;
    }

    public function updateResponse($id, $status)
    {

        $query = "UPDATE `orders` SET "
            . "`status` ='" . $status . "' "
            . " WHERE `id` = '" . $id . "'";
        $db = new Database();
        $result = $db->readQuery($query);

        if ($result) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function delete()
    {

        $query = 'DELETE FROM `orders` WHERE id="' . $this->id . '"';

        $db = new Database();
        return $db->readQuery($query);
    }

    public function getLastID()
    {

        $query = "SELECT `id` FROM `orders` ORDER BY `id` DESC LIMIT 1";
        $db = new Database();
        $result = mysql_fetch_assoc($db->readQuery($query));

        return $result['id'];
    }

    function updatePaymentStatusCodeAndStatus()
    {

        $query = "UPDATE  `orders` SET "
            . "`status` ='" . $this->status . "' "
            . " WHERE `id` = '" . $this->id . "'  ";
        $db = new Database();
        $result = $db->readQuery($query);

        if ($result) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    function markAsDelivered()
    {
        date_default_timezone_set('Asia/Colombo');
        $deliveredAt = date('Y-m-d H:i:s');
        $query = "UPDATE  `orders` SET "
            . "`delivery_status` ='1', "
            . "`delivered_at` ='" . $deliveredAt . "' "
            . " WHERE `id` = '" . $this->id . "'  ";
        $db = new Database();
        $result = $db->readQuery($query);

        if ($result) {
            $ORDER = new Order($this->id);
            $MEMBER = new Member($ORDER->member);
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
            $visitor_name = $MEMBER->fullName;
            $visitor_email = $MEMBER->email;


            //server webmail login

            $host = "sg1-ls7.a2hosting.com";
            $username = "sales@dewendra.com";
            $password = "$6)~W{voGKY6";

            //------------------------

            $webmail = "sales@dewendra.com";
            $visitorSubject = "Order Confirmation (#" . $ORDER->id . ") - DEWENDRA BRAND STORE";

            //----------------------CAPTCHACODE---------------------
            //----------------------- LOGO ---------------------------------

            $logo = $site_link . '/assets/images/logo/logo.png';

            session_start();

            $response = array();

            $visitor_message = '<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Synotec Email</title>
    </head>
    <body>
        <table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f6f8fb"> 
            <tbody>
                <tr> 
                    <td style="padding-top:10px;padding-bottom:30px;padding-left:16px;padding-right:16px" align="center"> 
                        <table style="width:602px" width="602" cellspacing="0" cellpadding="0" border="0" align="center"> 
                            <tbody>
                                <tr> 
                                    <td bgcolor=""> 
                                        <table width="642" cellspacing="0" cellpadding="0" border="0"> 
                                            <tbody> 
                                                <tr> 
                                                    <td style="border:1px solid #dcdee3;padding:20px;background-color:#fff;width:600px" width="600px" bgcolor="#ffffff" align="center"> 
                                                        <table width="100%" cellspacing="0" cellpadding="0" border="0"> 
                                                            <tbody>
                                                                <tr><td>
                                                                        <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                                                            <tbody><tr>
                                                                                    <td width="182">
                                                                                        <a href="' . $site_link . '" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://www.gallecabsandtours.com&amp;source=gmail&amp;ust=1574393192616000&amp;usg=AFQjCNGNM8_Z7ZMe7ndwFlJuHEP29nDd3Q"> <img src="' . $logo . '" style="height: 70px" alt="" class="CToWUd" border="0">
                                                                                        </a>
                                                                                    </td>
                                                                                    <td width="393">
                                                                                        <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 25px;">
                                                                                            <tbody><tr>
                                                                                                    <td valign="middle" height="46" align="right">
                                                                                                        <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                                            <tbody><tr>
                                                                                                                    <td width="67%" align="right">
                                                                                                                        <font style="font-family:Verdana,Geneva,sans-serif;color:#68696a;font-size:18px">
                                                                                                                            <a href="' . $site_link . '" style="color:#68696a;text-decoration:none;" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://www.gallecabsandtours.com&amp;source=gmail&amp;ust=1574393192616000&amp;usg=AFQjCNGNM8_Z7ZMe7ndwFlJuHEP29nDd3Q">
                                                                                                                                <h4>' . $website_name . '</h4>
                                                                                                                            </a>
                                                                                                                        </font>
                                                                                                                    </td>
                                                                                                                    <td width="4%">&nbsp;</td>
                                                                                                                </tr>
                                                                                                            </tbody></table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td height="30"><img src="https://ci5.googleusercontent.com/proxy/001H5mSu1fncLi3tyj1jU4gX9KCxSLcUnJ7AmYN4RpDzoUVESyrJul8bbhrKqFk1dMb7KZDhI1ck4errm-FRKGEBbeJHewGU4Aw_8ekbQyW8nF0J8U1G=s0-d-e1-ft#' . $site_link . '/distance/img/PROMO-GREEN2_01_04.jpg" alt="" class="CToWUd" width="393" height="30" border="0"></td>
                                                                                                </tr>
                                                                                            </tbody></table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody></table>
                                                                    </td>
                                                                </tr><tr> 
                                                                    <td style="font-size:20px;color:#33468f;line-height:28px;font-family:Arial,Helvetica,sans-serif;padding-bottom:20px;padding-top: 0px;font-weight: 600;" align="left"> Thank You ! </td> 
                                                                </tr>
                                                            </tbody> 
                                                        </table> 
                                                        <table style="background-color:#f5f7fa" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#F5F7FA"> 
                                                            <tbody> 
                                                                <tr> 
                                                                    <td style="font-size:14px;color:#333;line-height:18px;font-family:Arial,Helvetica,sans-serif;padding:15px 20px 10px;font-weight: 600;" align="left"> Dear valued customer, <br />Mr/Mrs/Miss/Dr/Rev. ' . $visitor_name . ' </td> 
                                                                </tr> 
                                                            </tbody> 
                                                        </table> 
                                                        <table style="background-color:#f5f7fa" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#F5F7FA"> 
                                                            <tbody> 
                                                                <tr> 
                                                                    <td style="word-wrap:break-word;font-size:14px;color:#333;line-height:18px;font-family:Arial,Helvetica,sans-serif;padding:10px 20px" align="left"> <p>Your order (#' . $ORDER->id . ') has been confirmed successfully. </p>
                                                                    <p>Please <a href="https://www.dewendra.com/my-account/profile">click here</a> to see order details.</p>
                                                                    </td> 
                                                                </tr> 
                                                                <tr> 
                                                                    <td style="word-wrap:break-word;font-size:14px;color:#333;line-height:10px;font-family:Arial,Helvetica,sans-serif;padding:10px 20px 10px" align="left"> <p> Best regards, </p>
                                                                        <p> ' . $comOwner . '</p>
                                                                    </td> 
                                                                </tr>
                                                            </tbody> 
                                                        </table> 
                                                        <table style="background-color:#fff" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#fff"> 
                                                            <tbody> 
                                                                <tr> 
                                                                    <td style="padding:4px 20px;width:600px;line-height:12px">&nbsp;</td> 
                                                                </tr> 
                                                            </tbody> 
                                                            <tbody><tr> 
                                                                    <td style="padding:10px 0 7px;color:#9a9a9a;text-align:left;font-family:Arial,Helvetica,sans-serif;font-size:12px" align="left"> <p style="line-height:18px;margin:0;padding:0"> 
                                                                        </p><p style="line-height:24px;margin:0;padding:0">' . $comany_name . '</p>
                                                                        <p style="line-height:24px;margin:0;padding:0">Email : ' . $comEmail . ' </p> 
                                                                        <p style="line-height:24px;margin:0;padding:0">Tel: ' . $comConNumber . '</p> </td> 
                                                                </tr> 
                                                            </tbody></table> 
                                             
                                                    </td> 
                                                </tr> 
                                                <tr> 
                                                    <td style="padding:4px 20px;width:600px;line-height:12px">&nbsp;</td> 
                                                </tr> 
                                                <tr> 
                                                
                                                                            </tr> 
                                            </tbody> 
                                        </table> </td> 
                                </tr> 
                                <tr> 
                                    <td id="m_-1040695829873221998footer_content"> 
                                        <table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f6f8fb"> 
                                            <tbody>
                                                <tr> 
                                                    <td> 
                                                        <table style="padding:0" width="100%" cellspacing="0" cellpadding="0" border="0" align="center"> 
                                                            <tbody> 
                                                                <tr> 
                                                                    <td style="padding:0px 0 7px;color:#9a9a9a;text-align:left;font-family:Arial,Helvetica,sans-serif;font-size:12px" align="left"> <p style="line-height:18px;margin:0;padding:0">Website By : <a href="https://synotec.lk/">Synotec Holdings</a></p> </td> 
                                                                </tr> 
                                                                <tr></tr> 
                                                            </tbody> 
                                                        </table> </td> 
                                                </tr> 
                                            </tbody>
                                        </table> </td> 
                                </tr> 
                            </tbody>
                        </table> </td> 
                </tr> 
            </tbody>
        </table>
    </body>
</html>';

            $visitorHeaders = array(
                'MIME-Version' => '1.0', 'Content-Type' => "text/html; charset=ISO-8859-1", 'From' => $webmail,
                'To' => $visitor_email,
                'Reply-To' => $comEmail,
                'Subject' => $visitorSubject
            );


            $smtp = Mail::factory('smtp', array(
                'host' => $host,
                'auth' => true,
                'username' => $username,
                'password' => $password
            ));

            $visitorMail = $smtp->send($visitor_email, $visitorHeaders, $visitor_message);

            return TRUE;
        } else {
            return FALSE;
        }
    }

    function markAsCompleted()
    {
        date_default_timezone_set('Asia/Colombo');
        $completedAt = date('Y-m-d H:i:s');
        $query = "UPDATE  `orders` SET "
            . "`delivery_status` ='2', "
            . "`completed_at` ='" . $completedAt . "' "
            . " WHERE `id` = '" . $this->id . "'  ";
        $db = new Database();
        $result = $db->readQuery($query);

        if ($result) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    function cancelOrder()
    {
        date_default_timezone_set('Asia/Colombo');
        $canceledAt = date('Y-m-d H:i:s');
        $query = "UPDATE  `orders` SET "
            . "`status` ='0', "
            . "`canceled_at` ='" . $canceledAt . "' "
            . " WHERE `id` = '" . $this->id . "'  ";
        $db = new Database();
        $result = $db->readQuery($query);

        if ($result) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function deleteOrder()
    {

        $query = 'DELETE FROM `orders` WHERE id="' . $this->id . '"';

        $db = new Database();
        return $db->readQuery($query);
    }

    //    public function getPaymentStatusCode($order) {
    //
    //        $query = "SELECT `payment_status_code` FROM `orders` WHERE `id` = $order";
    //        $db = new Database();
    //        $result = mysql_fetch_array($db->readQuery($query));
    //        return $result["payment_status_code"];
    //    }

    //    function sendOrderMail() {
    //
    //        $PRODUCT = new Product($this->product);
    //        $status = "";
    //        if ($this->paymentStatusCode == 2 && $this->status == 1) {
    //            $status = "Successfull.";
    //        } else {
    //            $status = "Unsuccessfull. Please resume your order.";
    //        }
    //
    //        $comany_name = "MSR Marketing";
    //        $website_name = "www.msrbeauty.com";
    //        $comConNumber = "+94 77 462 6588";
    //        $comEmail = "info@msrbeauty.com";
    //        $site_link = "http://" . $_SERVER['HTTP_HOST'];
    //
    //
    //        $subject = 'Website Order Enquiry  - #' . $this->id;
    //        $from = 'info@msrbeauty.com'; // give from email address
    //        $replay = 'info@msrbeauty.com';
    //
    //        $headers = "From: " . $from . "\r\n";
    //        $headers .= "Reply-To: " . $comEmail . "\r\n";
    //        $headers .= "MIME-Version: 1.0\r\n";
    //        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
    //
    //        $html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    //<html xmlns="http://www.w3.org/1999/xhtml">
    //    <head>
    //        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    //        <title>Promotional email template</title>
    //    </head>
    //
    //    <body bgcolor="#8d8e90">
    //        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#8d8e90">
    //            <tr>
    //                <td><table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" align="center">
    //                        <tr>
    //                            <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
    //                                    <tr>
    //                                        <td width="40"></td>
    //                                        <td width="144">
    //                                            <a href= "' . $site_link . '" target="_blank"> '
    //                . '<img src=""' . $site_link . '/contact-form/img/llogo.png" border="0" alt=""/>
    //                                            </a>
    //                                        </td>
    //                                        <td width="393">
    //                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
    //                                                <tr>
    //                                                    <td height="46" align="right" valign="middle">
    //                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
    //                                                            <tr>
    //                                                                <td width="67%" align="right">
    //                                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:18px; " >
    //                                                                        <a href= "' . $site_link . '" style="color:#68696a; text-decoration:none; text-transform: uppercase;">
    //                                                                            <h4>' . $website_name . '</h4>
    //                                                                        </a>
    //                                                                    </font>
    //                                                                </td>
    //                                                                <td width="4%">&nbsp;</td>
    //                                                            </tr>
    //                                                        </table>
    //                                                    </td>
    //                                                </tr>
    //                                              
    //                                            </table>
    //                                        </td>
    //                                    </tr>
    //                                </table></td>
    //                        </tr>
    //                        <tr>
    //                            <td align="center">
    //                                <img src="' . $site_link . '/contact-form/img/PROMO.jpg" alt="" width="598" height="323" border="0"/>
    //                            </td>
    //                        </tr>
    //                        <tr>
    //                            <td align="center" valign="middle">
    //                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
    //                                    <tr>
    //                                        <td width="2%">&nbsp;</td>
    //                                        <td width="96%" align="center" style="border-bottom:1px solid #000000" height="50">
    //                                            <font style="font-family: Verdana, Geneva, sans-serif; color:#1400FF; font-size:18px; " >
    //                                                   <h4>Product Order Enquiry - #' . $this->id . '</h4>
    //                                            </font>
    //                                        </td>
    //                                        <td width="2%">&nbsp;</td>
    //                                    </tr>
    //                                </table>
    //                            </td>
    //                        </tr>
    //                        <tr>
    //                            <td>&nbsp;</td>
    //                        </tr>
    //                        <tr>
    //                            <td>
    //                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
    //                                    <tr>
    //                                        <td width="5%">&nbsp;</td>
    //                                        <td width="90%" valign="middle">
    //                                            <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; ">
    //                                                 Hi ' . $this->firstName . ',
    //                                                <br /><br />
    //                                            </font>
    //                                        </td>
    //                                        <td width="5%">&nbsp;</td>
    //                                    </tr>
    //                                    <tr>
    //                                        <td width="5%">&nbsp;</td>
    //                                        <td width="90%" valign="middle">
    //                                            <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                               Thank you for visiting ' . $website_name . ' web site and order a product. Your order enquiry has been sent to ' . $comany_name . ' and one of representative will be contact you shortly.
    //                                            </font>
    //                                        </td>
    //                                        <td width="5%">&nbsp;</td>
    //                                    </tr>
    //                                     <tr>
    //                                        <td width="5%">&nbsp;<br /><br /></td>
    //                                        <td width="90%" valign="middle">
    //                                            <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                               The details of your Order are shown below.
    //                                            </font>
    //                                        </td>
    //                                        <td width="5%">&nbsp;</td>
    //                                    </tr>
    //                                </table>
    //                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
    //                                    <tr>
    //                                        <td width="2%">&nbsp;</td>
    //                                        <td width="96%" style="border-top:1px solid #000000" >
    //                                           
    //                                            <font style="font-family: Verdana, Geneva, sans-serif; color:#1400FF; font-size:14px; " >
    //                                                   <h4>&nbsp;&nbsp;&nbsp;Enquiry Details</h4>
    //                                            </font>
    //                                            <ul>
    //                                             <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                         First Name : ' . $this->firstName . '
    //                                                    </font>
    //                                                </li>
    //                                             <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                         Last Name : ' . $this->lastName . '
    //                                                    </font>
    //                                                </li>
    //                                                <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                         Email : ' . $this->email . '
    //                                                    </font>
    //                                                </li>
    //                                                <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                         Contact No : ' . $this->phoneNumber . '
    //                                                    </font>
    //                                                </li>
    //                                                <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                         Address : ' . $this->address . '
    //                                                    </font>
    //                                                </li>
    //                                                <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                         City : ' . $this->city . '
    //                                                    </font>
    //                                                </li>
    //                                                <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                         Country : ' . $this->country . '
    //                                                    </font>
    //                                                </li>
    //                                                  <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                         Product : ' . $PRODUCT->name . '
    //                                                    </font>
    //                                                </li>
    //                                                <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                         Quantity : ' . $this->qty . '
    //                                                    </font>
    //                                                </li>
    //                                                <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                        Total Amount: ' . $this->amount . ' LKR
    //                                                    </font>
    //                                                </li>
    //                                                <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                         Ordered At : ' . $this->orderedAt . '
    //                                                    </font>
    //                                                </li>
    //                                                <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                         Payment Status : ' . $status . '
    //                                                    </font>
    //                                                </li>
    //                                               
    //                                            </ul>
    //                                        </td>
    //                                        <td width="2%">&nbsp;</td>
    //                                    </tr>
    //                                </table>
    //                            </td>
    //                        </tr>
    //                        <tr>
    //                            <td>&nbsp;</td>
    //                        </tr>
    //                       
    //                        <tr>
    //                            <td>&nbsp;</td>
    //                        </tr>
    //                        <tr>
    //                            <td><img src="' . $site_link . '/PROMO-GREEN2_02/img/PROMO-GREEN2_07.jpg" width="598" height="7" style="display:block" border="0" alt=""/></td>
    //                        </tr>
    //                        <tr>
    //                            <td>&nbsp;</td>
    //                        </tr>
    //                        <tr>
    //                            <td>
    //                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
    //                                    <tr>
    //                                        <td width="2%" align="center">&nbsp;</td>
    //                                        <td width="29%" align="center">
    //                                            <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:8px; " >
    //                                                <strong>Phone No : <br/> ' . $comConNumber . ' </strong>
    //                                            </font>
    //                                        </td>
    //                                        <td width="2%" align="center">
    //                                            <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:8px; " >
    //                                              <strong>|</strong>
    //                                            </font>
    //                                        </td>
    //                                        <td width="30%" align="center">
    //                                            <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:8px; " >
    //                                                <strong>Website : <br/> ' . $website_name . '  </strong>
    //                                            </font>
    //                                        </td>
    //                                        <td width="2%" align="center">
    //                                            <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:8px; " >
    //                                                <strong>|</strong>
    //                                            </font>
    //                                        </td>
    //                                        <td width="25%" align="center">
    //                                            <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:8px; " >
    //                         <strong>E-mail :  <br/> ' . $comEmail . '</strong>
    //                                            </font>
    //                                        </td>
    //                                    </tr>
    //                                </table>
    //                                <table width="100%" border="0" cellspacing="1" cellpadding="1">
    //                                    <tr>
    //                            <td>&nbsp;</td>
    //                        </tr>
    //                                    <tr>
    //                                        <td width="3%" align="center">&nbsp;</td>
    //                                        <td width="28%" align="center"><font style="font-family: Verdana, Geneva, sans-serif; color:#1400FF; font-size:9px; " > © ' . date('Y') . ' Copyright ' . $comany_name . '</font> </td>
    //                                        <td width="10%" align="center"></td>
    //                                        <td width="3%" align="center"></td>
    //                                        <td width="30%" align="right">
    //                                        <font style="font-family: Verdana, Geneva, sans-serif; color:#1400FF; font-size:9px; " >
    //                                        <a href="http://sublime.lk/">
    //                                        web solution by: Synotec Holdings (Pvt) Ltd.</a>
    //                                        </font>
    //                                        </td>
    //                                        <td width="5%">&nbsp;</td>
    //                                    </tr>
    //                                </table>
    //                            </td>
    //                        </tr>
    //                    </table></td>
    //            </tr>
    //        </table>
    //    </body>
    //</html>';
    //        $arr = array();
    //
    //        if (mail($this->email, $subject, $html, $headers)) {
    //            $arr['status'] = "Your message has been sent successfully";
    //        } else {
    //            $arr['status'] = "Could not be sent your message";
    //        }
    //
    //        return $arr;
    //    }

    //    function sendOrderMailToAdmin() {
    //
    //        $PRODUCT = new Product($this->product);
    //        $status = "";
    //        if ($this->paymentStatusCode == 2 && $this->status == 1) {
    //            $status = "Successfull.";
    //        } else {
    //            $status = "Unsuccessfull.";
    //        }
    //
    //        $comany_name = "MSR Marketinglas";
    //        $comEmail = "info@msrbeauty.com";
    //        $site_link = "http://" . $_SERVER['HTTP_HOST'];
    //
    //
    //        $subject = 'Website Order Enquiry  - #' . $this->id;
    //        $from = 'info@msrbeauty.com';
    //
    //        date_default_timezone_set('Asia/Colombo');
    //        $todayis = date("l, F j, Y, g:i a");
    //
    //        $headers = "From: " . $from . "\r\n";
    //        $headers .= "Reply-To: " . $this->email . "\r\n";
    //        $headers .= "MIME-Version: 1.0\r\n";
    //        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
    //
    //        $html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    //<html xmlns="http://www.w3.org/1999/xhtml">
    //    <head>
    //        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    //        <title>Promotional email template</title>
    //    </head>
    //
    //    <body bgcolor="#8d8e90">
    //        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#8d8e90">
    //            <tr>
    //                <td><table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" align="center">
    //                        <tr>
    //                            <td align="center" valign="middle">
    //                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
    //                                    <tr>
    //                                        <td width="2%">&nbsp;</td>
    //                                        <td width="96%" align="center" style="border-bottom:1px solid #000000" height="50">
    //                                            <font style="font-family: Verdana, Geneva, sans-serif; color:#1400FF; font-size:18px; " >
    //                                                   <h4>Product Order Enquiry - #' . $this->id . '</h4>
    //                                            </font>
    //                                        </td>
    //                                        <td width="2%">&nbsp;</td>
    //                                    </tr>
    //                                </table>
    //                            </td>
    //                        </tr>
    //                        <tr>
    //                            <td>&nbsp;</td>
    //                        </tr>
    //                        <tr>
    //                            <td>
    //                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
    //                                    <tr>
    //                                        <td width="5%">&nbsp;</td>
    //                                        <td width="90%" valign="middle">
    //                                            <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; ">
    //                                                 Hi ' . $comany_name . ',
    //                                                <br /><br />
    //                                            </font>
    //                                        </td>
    //                                        <td width="5%">&nbsp;</td>
    //                                    </tr>
    //                                    <tr>
    //                                        <td width="5%">&nbsp;</td>
    //                                        <td width="90%" valign="middle">
    //                                            <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                               You have a new order enquiry from your website on ' . $todayis . ' as follows. Please pay your attention as soon as possible.
    //                                            </font>
    //                                        </td>
    //                                        <td width="5%">&nbsp;</td>
    //                                    </tr>
    //                                     <tr>
    //                                        <td width="5%">&nbsp;<br /><br /></td>
    //                                        <td width="90%" valign="middle">
    //                                            <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                               The details of order are shown below.
    //                                            </font>
    //                                        </td>
    //                                        <td width="5%">&nbsp;</td>
    //                                    </tr>
    //                                </table>
    //                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
    //                                    <tr>
    //                                        <td width="2%">&nbsp;</td>
    //                                        <td width="96%" style="border-top:1px solid #000000" >
    //                                           
    //                                            <font style="font-family: Verdana, Geneva, sans-serif; color:#1400FF; font-size:14px; " >
    //                                                   <h4>&nbsp;&nbsp;&nbsp;Enquiry Details</h4>
    //                                            </font>
    //                                            <ul>
    //                                             <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                        Full Name : ' . $this->firstName . ' ' . $this->lastName . '
    //                                                    </font>
    //                                                </li>
    //                                                <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                        Email : ' . $this->email . '
    //                                                    </font>
    //                                                </li>
    //                                                <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                        Contact No : ' . $this->phoneNumber . '
    //                                                    </font>
    //                                                </li>
    //                                                <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                        Address : ' . $this->address . '
    //                                                    </font>
    //                                                </li>
    //                                                <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                        City : ' . $this->city . '
    //                                                    </font>
    //                                                </li>
    //                                                <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                         Country : ' . $this->country . '
    //                                                    </font>
    //                                                </li>
    //                                                  <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                         Product : ' . $PRODUCT->name . '
    //                                                    </font>
    //                                                </li>
    //                                                <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                         Quantity : ' . $this->qty . '
    //                                                    </font>
    //                                                </li>
    //                                                <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                        Total Amount : ' . $this->amount . ' LKR
    //                                                    </font>
    //                                                </li>
    //                                                <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                         Ordered At : ' . $this->orderedAt . '
    //                                                    </font>
    //                                                </li>
    //                                                <li>
    //                                                    <font style="font-family: Verdana, Geneva, sans-serif; color:#68696a; font-size:14px; " >
    //                                                         Payment Status : ' . $status . '
    //                                                    </font>
    //                                                </li>
    //                                               
    //                                            </ul>
    //                                        </td>
    //                                        <td width="2%">&nbsp;</td>
    //                                    </tr>
    //                                </table>
    //                            </td>
    //                        </tr>
    //                        <tr>
    //                            <td>&nbsp;</td>
    //                        </tr>
    //                       
    //                        <tr>
    //                            <td>&nbsp;</td>
    //                        </tr>
    //                        
    //                        <tr>
    //                            <td>&nbsp;</td>
    //                        </tr>
    //                    </table>
    //                    </td>
    //            </tr>
    //        </table>
    //    </body>
    //</html>';
    //
    //        $arr = array();
    //
    //        if (mail($comEmail, $subject, $html, $headers)) {
    //            $arr['status'] = "Your message has been sent successfully";
    //        } else {
    //            $arr['status'] = "Could not be sent your message";
    //        }
    //
    //        return $arr;
    //    }

    public function getOrdersByDeliveryStatus($status)
    {

        $query = "SELECT * FROM `orders` WHERE `delivery_status`='" . $status . "' AND `status`='1'";
        $db = new Database();
        $result = $db->readQuery($query);
        $array_res = array();

        while ($row = mysql_fetch_array($result)) {
            array_push($array_res, $row);
        }

        return $array_res;
    }

    public function getCanceledOrders()
    {

        $query = "SELECT * FROM `orders` WHERE `status`='0'";
        $db = new Database();
        $result = $db->readQuery($query);
        $array_res = array();

        while ($row = mysql_fetch_array($result)) {
            array_push($array_res, $row);
        }

        return $array_res;
    }


    public function createOrder()
    {

        date_default_timezone_set('Asia/Colombo');
        $orderedAt = date('Y-m-d H:i:s');

        $query = "INSERT INTO `orders` ("
            . "`ordered_at`,"
            . "`member`,"
            . "`address`,"
            . "`city`,"
            . "`country`,"
            . "`postal_code`,"
            . "`amount`,"
            . "`shipping_amount`,"
            . "`order_note`,"
            . "`status`) VALUES  ("
            . "'" . $orderedAt . "', "
            . "'" . $this->member . "', "
            . "'" . $this->address . "', "
            . "'" . $this->city . "', "
            . "'" . $this->country . "', "
            . "'" . $this->postalCode . "', "
            . "'" . $this->amount . "', "
            . "'" . $this->shipping_amount . "', "
            . "'" . $this->orderNote . "', "
            . "'" . 1 . "')";

        $db = new Database();
        $result = $db->readQuery2($query);

        if ($result) {
            return $result;
        } else {
            return FALSE;
        }
    }

    public function getOrdersByDeliveryStatusAndMember($member, $status)
    {

        $query = "SELECT * FROM `orders` WHERE `delivery_status`='" . $status . "' AND `status`='1' AND `member`='" . $member . "'";

        $db = new Database();
        $result = $db->readQuery1($query);
        $array_res = array();

        while ($row = mysqli_fetch_array($result)) {
            array_push($array_res, $row);
        }

        return $array_res;
    }
    public function getCanceledOrdersByMember($member)
    {

        $query = "SELECT * FROM `orders` WHERE `status`='0' AND `member`='" . $member . "'";

        $db = new Database();
        $result = $db->readQuery1($query);
        $array_res = array();

        while ($row = mysqli_fetch_array($result)) {
            array_push($array_res, $row);
        }

        return $array_res;
    }
    public function getDetailsByID($id)
    {
        $query = "SELECT * FROM `orders` WHERE `id` = $id";
        $db = new Database();
        $result = $db->readQuery1($query);
        $result = mysqli_fetch_assoc($result);
        return $result;
    }
}
