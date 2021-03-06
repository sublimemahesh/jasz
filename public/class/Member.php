<?php

/**
 * Description of Member
 *
 * @author  W j K n ¨
 * @web www.synotec.lk
 */
class Member {

    public $id;
    public $createdAt;
    public $fullName;
    public $email;
    public $contactNumber;
    public $address;
    public $city;
    public $country;
    public $username;
    public $password;
    public $isActive;
    public $lastLogin;
    public $authToken;
    public $resetCode;

    public function __construct($id) {
        if ($id) {
            $query = "SELECT `id`,`created_at`,`full_name`,`email`,`contact_number`,`address`,`city`,`country`,`username`,`is_active`,`last_login`,`auth_token`,`reset_code` FROM `member` WHERE `id`=" . $id;
            $db = new Database();
            $result = mysqli_fetch_array($db->readQuery1($query));
            $this->id = $result['id'];
            $this->createdAt = $result['created_at'];
            $this->fullName = $result['full_name'];
            $this->email = $result['email'];
            $this->contactNumber = $result['contact_number'];
            $this->address = $result['address'];
            $this->city = $result['city'];
            $this->country = $result['country'];
            $this->username = $result['username'];
            $this->isActive = $result['is_active'];
            $this->lastLogin = $result['last_login'];
            $this->authToken = $result['auth_token'];
            $this->resetCode = $result['reset_code'];
            return $result;
        }
    }

    public function create() {
        $enPass = md5($this->password);
        date_default_timezone_set('Asia/Colombo');
        $createdAt = date('Y-m-d H:i:s');
        $query = "INSERT INTO `member` (`created_at`,`full_name`,`email`,`username`,`password`,`is_active`) VALUES  ('"
                . $createdAt . "','"
                . $this->fullName . "','"
                . strtolower($this->email) . "', '"
                . $this->username . "', '"
                . $enPass . "', '"
                . 1 . "')";
        $db = new Database();
        $result = $db->readQuery2($query);
        if ($result) {
            return $result;
        } else {
            return FALSE;
        }
    }

    public function login() {
        $enPass = md5($this->password);
        $query = "SELECT `id`,`created_at`,`full_name`,`email`,`contact_number`,`address`,`city`,`country`,`username`,`is_active`,`last_login`,`auth_token` FROM `member` WHERE `email`= '" . $this->email . "' AND `password`= '" . $enPass . "'";
        
        $db = new Database();
        $result = mysqli_fetch_array($db->readQuery1($query));
        
        if (!$result) {
            return FALSE;
        } else {
            
            $this->id = $result['id'];
            $this->setAuthToken($result['id']);
            $this->setLastLogin($this->id);
            $member = $this->__construct($this->id);
            $this->setUserSession($member);
            return $member;
        }
    }

    public function checkOldPass($id, $password) {
        $enPass = md5($password);
        $query = "SELECT `id` FROM `member` WHERE `id`= '" . $id . "' AND `password`= '" . $enPass . "'";
        $db = new Database();
        $result = mysqli_fetch_array($db->readQuery1($query));
        if (!$result) {
            return FALSE;
        } else {
            return TRUE;
        }
    }

    public function changePassword($id, $password) {
        $enPass = md5($password);
        $query = "UPDATE  `member` SET "
                . "`password` ='" . $enPass . "' "
                . "WHERE `id` = '" . $id . "'";
        $db = new Database();
        $result = $db->readQuery1($query);
        if ($result) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function authenticate($id, $authToken) {
        if (!isset($_SESSION)) {
            session_start();
        }
//        $id = NULL;
//        $authToken = NULL;
//        if (isset($_SESSION["id"])) {
//            $id = $_SESSION["id"];
//        }
//        if (isset($_SESSION["authToken"])) {
//            $authToken = $_SESSION["authToken"];
//        }
        $query = "SELECT `id` FROM `member` WHERE `id`= '" . $id . "' AND `auth_token`= '" . $authToken . "'";
        
        $db = new Database();
        $result = mysqli_fetch_array($db->readQuery1($query));
        if (!$result) {
            return TRUE;
        } else {
            return False;
        }
    }
    public function authenticateTrue($id, $authToken) {
        if (!isset($_SESSION)) {
            session_start();
        }
        $query = "SELECT `id` FROM `member` WHERE `id`= '" . $id . "' AND `auth_token`= '" . $authToken . "'";
        
        $db = new Database();
        $result = mysqli_fetch_array($db->readQuery1($query));
        if (!$result) {
            return FALSE;
        } else {
            return TRUE;
        }
    }

    public function logOut() {
        if (!isset($_SESSION)) {
            session_start();
        }
        unset($_SESSION["id"]);
        unset($_SESSION["created_at"]);
        unset($_SESSION["full_name"]);
        unset($_SESSION["email"]);
        unset($_SESSION["contact_number"]);
        unset($_SESSION["address"]);
        unset($_SESSION["city"]);
        unset($_SESSION["country"]);
        unset($_SESSION["username"]);
        unset($_SESSION["is_active"]);
        unset($_SESSION["auth_token"]);
        unset($_SESSION["last_login"]);
        unset($_SESSION["login"]);
        return TRUE;
    }

    public function update() {
        $query = "UPDATE  `member` SET "
                . "`full_name` ='" . $this->fullName . "', "
                . "`email` ='" . $this->email . "', "
                . "`contact_number` ='" . $this->contactNumber . "', "
                . "`address` ='" . $this->address . "', "
                . "`city` ='" . $this->city . "', "
                . "`country` ='" . $this->country . "', "
                . "`is_active` ='" . $this->isActive . "' "
                . "WHERE `id` = '" . $this->id . "'";
        $db = new Database();
        $result = $db->readQuery1($query);
        
        if ($result) {
            return $this->id;
        } else {
            return FALSE;
        }
    }

    private function setUserSession($member) {
        if (!isset($_SESSION)) {
            session_start();
        }
        
        $_SESSION['id'] = $member['id'];
        $_SESSION['created_at'] = $member['created_at'];
        $_SESSION["full_name"] = $member['full_name'];
        $_SESSION["email"] = $member['email'];
        $_SESSION["contact_number"] = $member['contact_number'];
        $_SESSION["address"] = $member['address'];
        $_SESSION["city"] = $member['city'];
        $_SESSION["country"] = $member['country'];
        $_SESSION["username"] = $member['username'];
        $_SESSION["is_active"] = $member['is_active'];
        $_SESSION["auth_token"] = $member['auth_token'];
        $_SESSION["last_login"] = $member['last_login'];
        $_SESSION["login"] = true;
        
    }

    private function setAuthToken($id) {
        $authToken = md5(uniqid(rand(), true));
        $query = "UPDATE `member` SET `auth_token` ='" . $authToken . "' WHERE `id`='" . $id . "'";
        
        $db = new Database();
        if ($db->readQuery1($query)) {
            return $authToken;
        } else {
            return FALSE;
        }
    }

    private function setLastLogin($id) {
        date_default_timezone_set('Asia/Colombo');
        $now = date('Y-m-d H:i:s');
        $query = "UPDATE `member` SET `last_login` ='" . $now . "' WHERE `id`='" . $id . "'";
        $db = new Database();
        if ($db->readQuery1($query)) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function checkEmail($email) {
        $query = "SELECT `email`,`username` FROM `member` WHERE `email`= '" . $email . "'";
        
        $db = new Database();
        $result = mysqli_fetch_array($db->readQuery1($query));
        if (!$result) {
            return FALSE;
        } else {
            return $result;
        }
    }

    public function GenarateCode($email) {
        $rand = rand(10000, 99999);
        $query = "UPDATE  `member` SET "
                . "`reset_code` ='" . $rand . "' "
                . "WHERE `email` = '" . $email . "'";
        $db = new Database();
        $result = $db->readQuery1($query);
        if ($result) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function SelectForgetUser($email) {
        if ($email) {
            $query = "SELECT `email`,`username`,`reset_code` FROM `member` WHERE `email`= '" . $email . "'";
            $db = new Database();
            $result = mysqli_fetch_array($db->readQuery1($query));
            $this->username = $result['username'];
            $this->email = $result['email'];
            $this->restCode = $result['reset_code'];
            return $result;
        }
    }

    public function SelectResetCode($code) {
        $query = "SELECT `id` FROM `member` WHERE `reset_code`= '" . $code . "'";
        $db = new Database();
        $result = mysqli_fetch_array($db->readQuery1($query));
        if (!$result) {
            return FALSE;
        } else {
            return TRUE;
        }
    }

    public function updatePassword($password, $code) {
        $enPass = md5($password);
        $query = "UPDATE  `member` SET "
                . "`password` ='" . $enPass . "' "
                . "WHERE `reset_code` = '" . $code . "'";
        $db = new Database();
        $result = $db->readQuery1($query);
        if ($result) {
            return TRUE;
        } else {
            return FALSE;
        }
    }
    
    public function getDetailsByID($id) {
        $query = "SELECT * FROM `member` WHERE `id` = $id";
        $db = new Database();
        $result = $db->readQuery1($query);
        $result = mysqli_fetch_assoc($result);
        return $result;
    }

}
