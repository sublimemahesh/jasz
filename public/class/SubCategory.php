<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 *
 * @author DsWâ„¢
 */

class SubCategory {

    public $id;
    public $name;
    public $imageName;
    public $isActive;
    public $category;
    public $queue;

    public function __construct($id) {
        if ($id) {

            $query = "SELECT `id`,`name`,`image_name`,`is_active`,`category`,`queue` FROM `sub_category` WHERE `id`=" . $id;

            $db = new Database();

            $result = mysql_fetch_array($db->readQuery($query));

            $this->id = $result['id'];
            $this->name = $result['name'];
            $this->imageName = $result['image_name'];
            $this->category = $result['category'];
            $this->isActive = $result['is_active'];
            $this->queue = $result['queue'];

            return $this;
        }
    }

    public function create() {

        $query = "INSERT INTO `sub_category` (`name`,`image_name`,`is_active`,`category`,`queue`) VALUES  ('"
                . $this->name . "','"
                . $this->imageName . "', '"
                . $this->isActive . "', '"
                . $this->category . "', '"
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

    public function getAllSubCategoryByCategory($category) {

        $query = "SELECT * FROM `sub_category` WHERE `category`= $category ORDER BY queue ASC";
        $db = new Database();
        $result = $db->readQuery($query);
        $array_res = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($array_res, $row);
        }
        return $array_res;
    }

    public function all() {

        $query = "SELECT * FROM `sub_category` ORDER BY queue ASC";
        $db = new Database();
        $result = $db->readQuery($query);
        $array_res = array();

        while ($row = mysql_fetch_array($result)) {
            array_push($array_res, $row);
        }

        return $array_res;
    }

    public function getAll() {

        $query = "SELECT * FROM `sub_category` ORDER BY queue ASC";
        $db = new Database();
        $result = $db->readQuery1($query);
        $array_res = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($array_res, $row);
        }
        return $array_res;
    }

    public function update() {

        $query = "UPDATE  `sub_category` SET "
                . "`name` ='" . $this->name . "', "
                . "`image_name` ='" . $this->imageName . "', "
                . "`is_active` ='" . $this->isActive . "' "
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

        $query = 'DELETE FROM `sub_category` WHERE id="' . $this->id . '"';
        unlink(Helper::getSitePath() . "upload/category/sub/" . $this->imageName);

        $db = new Database();

        return $db->readQuery($query);
    }

    public function arrange($key, $img) {

        $query = "UPDATE `sub_category` SET `queue` = '" . $key . "'  WHERE id = '" . $img . "'";
        $db = new Database();
        $result = $db->readQuery($query);
        return $result;
    }

    public function getSubCategoriesyByCategory($category) {

        $query = "SELECT * FROM `sub_category` WHERE `category`= $category ORDER BY queue ASC";
        $db = new Database();
        $result = $db->readQuery1($query);
        $array_res = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($array_res, $row);
        }
        return $array_res;
    }
    public function getDetailsByID($id) {
        $query = "SELECT * FROM `sub_category` WHERE `id` = $id";
        $db = new Database();
        $result = $db->readQuery1($query);
        $result = mysqli_fetch_assoc($result);
        return $result;
    }

}
