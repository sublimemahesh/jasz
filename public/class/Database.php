<?php

/**

 * Description of User

 *

 * @author sublime holdings

 * @web www.sublime.lk

 * */
class Database {

//    private $host = 'localhost';
//    private $name = 'synoteca_galleit';
//    private $user = 'synoteca_galleit';
//    private $password = 'uf*;Y1WN4=g]';


    private $host = 'localhost';
    private $name = 'galleit';
    private $user = 'root';
    private $password = '';

    public function __construct() {
//        mysql_connect($this->host, $this->user, $this->password) or die("Invalid host  or user details");
//
//        mysql_select_db($this->name) or die("Unable to select database");
    }

    public function readQuery1($query) {


//        $result = mysql_query($query) or die(mysql_error());
//
//        return $result;

        $link = mysqli_connect($this->host, $this->user, $this->password, $this->name);

        $result = mysqli_query($link, $query);
        return $result;
    }

    public function readQuery($query) {
        mysql_connect($this->host, $this->user, $this->password) or die("Invalid host  or user details");

        mysql_select_db($this->name) or die("Unable to select database");

        $result = mysql_query($query) or die(mysql_error());

        return $result;
    }

    public function getConnection() {

        $link = new mysqli('localhost', 'root', '', 'galleit');
        dd($link);
        return $link;
    }

    public function readQuery2($query) {


//        $result = mysql_query($query) or die(mysql_error());
//
//        return $result;

        $link = mysqli_connect($this->host, $this->user, $this->password, $this->name);

        $result = mysqli_query($link, $query);
        $last_id = mysqli_insert_id($link);
        return $last_id;
    }

}
