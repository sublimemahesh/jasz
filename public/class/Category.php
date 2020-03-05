<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Category
 *
 * @author W j K n``
 */
class Category {

    public $id;
    public $name;
    public $imageName;
    public $banner;
    public $haveSub;
    public $isActive;
    public $queue;

    public function __construct($id) {
        if ($id) {

            $query = "SELECT `id`,`name`,`image_name`,`banner`,`have_sub`,`is_active`,`queue` FROM `category` WHERE `id`=" . $id;

            $db = new Database();

            $result = mysql_fetch_array($db->readQuery($query));

            $this->id = $result['id'];
            $this->name = $result['name'];
            $this->imageName = $result['image_name'];
            $this->banner = $result['banner'];
            $this->haveSub = $result['have_sub'];
            $this->isActive = $result['is_active'];
            $this->queue = $result['queue'];

            return $this;
        }
    }

    public function create() {

        $query = "INSERT INTO `category` (`name`,`image_name`,`banner`,`have_sub`,`is_active`,`queue`) VALUES  ('"
                . $this->name . "','"
                . $this->imageName . "', '"
                . $this->banner . "', '"
                . $this->haveSub . "', '"
                . $this->isActive . "', '"
                . $this->queue . "')";

        $db = new Database();

        $result = $db->readQuery($query);

        if ($result) {
            $last_id = mysql_insert_id();

            return $this->__construct($last_id);
        } else {
            return FALSE;
        }
    }

    public function all() {

        $query = "SELECT * FROM `category` ORDER BY queue ASC";
        $db = new Database();
        $result = $db->readQuery($query);
        $array_res = array();

        while ($row = mysql_fetch_array($result)) {
            array_push($array_res, $row);
        }

        return $array_res;
    }

    public function getAll() {

        $query = "SELECT * FROM `category` ORDER BY queue ASC";
        $db = new Database();
        $result = $db->readQuery1($query);
        $array_res = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($array_res, $row);
        }
        return $array_res;
    }

    public function update() {

        $query = "UPDATE  `category` SET "
                . "`name` ='" . $this->name . "', "
                . "`image_name` ='" . $this->imageName . "', "
                . "`banner` ='" . $this->banner . "', "
                . "`is_active` ='" . $this->isActive . "', "
                . "`have_sub` ='" . $this->haveSub . "', "
                . "`queue` ='" . $this->queue . "' "
                . "WHERE `id` = '" . $this->id . "'";

        $db = new Database();

        $result = $db->readQuery($query);

        if ($result) {
            return $this->__construct($this->id);
        } else {
            return FALSE;
        }
    }

    public function delete() {

        $query = 'DELETE FROM `category` WHERE id="' . $this->id . '"';
        unlink(Helper::getSitePath() . "upload/category/" . $this->imageName);

        $db = new Database();

        return $db->readQuery($query);
    }

    public function arrange($key, $img) {
        $query = "UPDATE `category` SET `queue` = '" . $key . "'  WHERE id = '" . $img . "'";
        $db = new Database();
        $result = $db->readQuery($query);
        return $result;
    }
    public function getDetailsByID($id) {
        $query = "SELECT * FROM `category` WHERE `id` = $id";
        $db = new Database();
        $result = $db->readQuery1($query);
        $result = mysqli_fetch_assoc($result);
        return $result;
    }

}
