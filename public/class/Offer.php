<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Offer
 *
 * @author W j K n ¨
 */
class Offer {

    public $id;
    public $createdAt;
    public $title;
    public $imageName;
    public $shortDescription;
    public $description;
    public $price;
    public $discount;
    public $isActive;
    public $queue;

    public function __construct($id) {
        if ($id) {
            $query = "SELECT `id`,`created_at`,`title`,`image_name`,`short_description`,`description`,`price`,`discount`,`is_active`,`queue` FROM `offer` WHERE `id`=" . $id;
            $db = new Database();
            $result = mysql_fetch_array($db->readQuery($query));
            $this->id = $result['id'];
            $this->createdAt = $result['created_at'];
            $this->title = $result['title'];
            $this->imageName = $result['image_name'];
            $this->shortDescription = $result['short_description'];
            $this->description = $result['description'];
            $this->price = $result['price'];
            $this->discount = $result['discount'];
            $this->isActive = $result['is_active'];
            $this->queue = $result['queue'];
            return $this;
        }
    }

    public function create() {

        date_default_timezone_set('Asia/Colombo');
        $createdAt = date('Y-m-d H:i:s');

        $query = "INSERT INTO `offer` (`created_at`,`title`,`image_name`,`short_description`,`description`,`price`,`discount`,`is_active`,`queue`) VALUES  ('"
                . $createdAt . "','"
                . $this->title . "','"
                . $this->imageName . "', '"
                . $this->shortDescription . "', '"
                . $this->description . "', '"
                . $this->price . "', '"
                . $this->discount . "', '"
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
        $query = "SELECT * FROM `offer` ORDER BY queue ASC";
        $db = new Database();
        $result = $db->readQuery($query);
        $array_res = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($array_res, $row);
        }
        return $array_res;
    }
    public function getAllWithOutThisID($id) {
        $query = "SELECT * FROM `offer` WHERE `id` <> $id ORDER BY `id` DESC";
        $db = new Database();
        $result = $db->readQuery($query);
        $array_res = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($array_res, $row);
        }
        return $array_res;
    }

    public function update() {
        $query = "UPDATE  `offer` SET "
                . "`title` ='" . $this->title . "', "
                . "`image_name` ='" . $this->imageName . "', "
                . "`short_description` ='" . $this->shortDescription . "', "
                . "`description` ='" . $this->description . "', "
                . "`price` ='" . $this->price . "', "
                . "`discount` ='" . $this->discount . "', "
                . "`is_active` ='" . $this->isActive . "', "
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
        unlink(Helper::getSitePath() . "upload/offer/" . $this->imageName);
        unlink(Helper::getSitePath() . "upload/offer/thumb/" . $this->imageName);
        $query = 'DELETE FROM `offer` WHERE id="' . $this->id . '"';
        $db = new Database();
        return $db->readQuery($query);
    }

    public function arrange($key, $img) {
        $query = "UPDATE `offer` SET `queue` = '" . $key . "'  WHERE id = '" . $img . "'";
        $db = new Database();
        $result = $db->readQuery($query);
        return $result;
    }

    public function getAll() {
        $query = "SELECT * FROM `offer` ORDER BY queue ASC";
        $db = new Database();
        $result = $db->readQuery1($query);
        $array_res = array();
        while ($row = mysqli_fetch_array($result)) {
            array_push($array_res, $row);
        }
        return $array_res;
    }
    public function getDetailsByID($id) {
        $query = "SELECT * FROM `offer` WHERE `id` = $id";
        
        $db = new Database();
        $result = $db->readQuery1($query);
        $result = mysqli_fetch_assoc($result);
        return $result;
    }

}
