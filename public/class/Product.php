<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Product
 *
 * @author W j K n ﾃつｨ
 */
class Product {

    public $id;
    public $category;
    public $sub_category;
    public $brand;
    public $name;
    public $image_name;
    public $image_name2;
    public $short_description;
    public $description;
    public $price;
    public $discount;
    public $shipping_fee;
    public $isActive;
    public $isFeaturedProduct;
    public $queue;

    public function __construct($id) {
        if ($id) {
            $query = "SELECT `id`, `category`,`sub_category`, `brand`, `name`,`image_name`,`image_name2`,`short_description`,`description`,`price`,`discount`,`shipping_fee`,`is_active`,`is_featured_product`,`queue` FROM `product` WHERE `id`=" . $id;
            $db = new Database();
            $result = mysql_fetch_array($db->readQuery($query));
            $this->id = $result['id'];
            $this->category = $result['category'];
            $this->sub_category = $result['sub_category'];
            $this->brand = $result['brand'];
            $this->name = $result['name'];
            $this->image_name = $result['image_name'];
            $this->image_name2 = $result['image_name2'];
            $this->short_description = $result['short_description'];
            $this->description = $result['description'];
            $this->price = $result['price'];
            $this->discount = $result['discount'];
            $this->shipping_fee = $result['shipping_fee'];
            $this->isActive = $result['is_active'];
            $this->isFeaturedProduct = $result['is_featured_product'];
            $this->queue = $result['queue'];
            return $this;
        }
    }

    public function create() {
        $query = "INSERT INTO `product` (`category`,`sub_category`,`brand`,`name`,`image_name`,`image_name2`,`short_description`,`description`,`price`,`discount`,`shipping_fee`,`is_active`,`is_featured_product`,`queue`) VALUES  ('"
                . $this->category . "', '"
                . $this->sub_category . "', '"
                . $this->brand . "', '"
                . $this->name . "', '"
                . $this->image_name . "', '"
                . $this->image_name2 . "', '"
                . $this->short_description . "', '"
                . $this->description . "', '"
                . $this->price . "', '"
                . $this->discount . "', '"
                . $this->shipping_fee . "', '"
                . $this->isActive . "', '"
                . $this->isFeaturedProduct . "', '"
                . $this->queue . "')";
// dd($query);
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
        $query = "SELECT * FROM `product` ORDER BY `queue` ASC";
        $db = new Database();
        $result = $db->readQuery($query);
        $array_res = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($array_res, $row);
        }
        return $array_res;
    }

    public function update() {
        $query = "UPDATE  `product` SET "
                . "`category` ='" . $this->category . "', "
                . "`sub_category` ='" . $this->sub_category . "', "
                . "`brand` ='" . $this->brand . "', "
                . "`name` ='" . $this->name . "', "
                . "`image_name` ='" . $this->image_name . "', "
                . "`image_name2` ='" . $this->image_name2 . "', "
                . "`short_description` ='" . $this->short_description . "', "
                . "`description` ='" . $this->description . "', "
                . "`price` ='" . $this->price . "', "
                . "`discount` ='" . $this->discount . "', "
                . "`shipping_fee` ='" . $this->shipping_fee . "', "
                . "`is_active` ='" . $this->isActive . "', "
                . "`is_featured_product` ='" . $this->isFeaturedProduct . "', "
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

        $this->deletePhotos();

        $query = 'DELETE FROM `product` WHERE id="' . $this->id . '"';
        $db = new Database();
        return $db->readQuery($query);
    }

    public function deletePhotos() {

        $PHOTO = new ProductPhoto(NULL);

        $allPhotos = $PHOTO->getProductPhotosById($this->id);

        foreach ($allPhotos as $photo) {

            $IMG = $photo["image_name"];
            unlink(Helper::getSitePath() . "upload/product/gallery/" . $IMG);
            unlink(Helper::getSitePath() . "upload/product/gallery/thumb/" . $IMG);

            $PHOTO->id = $photo["id"];
            $PHOTO->delete();
        }
    }

    public function getProductsById($product) {
        $query = 'SELECT * FROM `product` WHERE type="' . $product . '" AND `is_active` = 1 ORDER BY queue ASC';
        $db = new Database();
        $result = $db->readQuery($query);
        $array_res = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($array_res, $row);
        }
        return $array_res;
    }

    public function getProductsBySubCategoryID($sub_category) {
        
        $query = 'SELECT * FROM `product` WHERE `sub_category` ="' . $sub_category . '" AND  `is_active` = 1 ORDER BY queue';

        $db = new Database();
        $result = $db->readQuery($query);
        $array_res = array();
        while ($row = mysql_fetch_assoc($result)) {
            array_push($array_res, $row);
        }
        return $array_res;
    }
    
    public function getProductsByCategoryID($category) {
        
        $query = 'SELECT * FROM `product` WHERE `category` ="' . $category . '" AND  `is_active` = 1 ORDER BY queue';

        $db = new Database();
        $result = $db->readQuery($query);
        $array_res = array();
        while ($row = mysql_fetch_assoc($result)) {
            array_push($array_res, $row);
        }
        return $array_res;
    }
    
    public function getProductsByBrandID($brand) {
        $query = 'SELECT * FROM `product` WHERE `brand` ="' . $brand . '" AND `is_active` = 1   ORDER BY queue';

        $db = new Database();
        $result = $db->readQuery($query);
        $array_res = array();
        while ($row = mysql_fetch_assoc($result)) {
            array_push($array_res, $row);
        }
        return $array_res;
    }

    public function arrange($key, $img) {
        $query = "UPDATE `product` SET `queue` = '" . $key . "'  WHERE id = '" . $img . "'";
        $db = new Database();
        $result = $db->readQuery($query);
        return $result;
    }

    public function getDetailsByID($id) {
        $query = "SELECT * FROM `product` WHERE `id` = $id";
        
        $db = new Database();
        $result = $db->readQuery1($query);
        $result = mysqli_fetch_assoc($result);
        return $result;
    }

    public function getAll() {
        $query = "SELECT * FROM `product` WHERE `is_active` = 1 ORDER BY `queue`";
        $db = new Database();
        $result = $db->readQuery1($query);
        $array_res = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($array_res, $row);
        }
        return $array_res;
    }

    public function getFeaturedProducts() {
        $query = "SELECT * FROM `product` WHERE `is_active` = 1 AND `is_featured_product` = 1 ORDER BY `id` ASC LIMIT 5";
        $db = new Database();
        $result = $db->readQuery1($query);
        $array_res = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($array_res, $row);
        }
        return $array_res;
    }

    public function getProductsByCategory($category) {
        $query = 'SELECT * FROM `product` WHERE `category` ="' . $category . '" AND `is_active` = 1  ORDER BY queue ASC';
        $db = new Database();
        $result = $db->readQuery1($query);
        $array_res = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($array_res, $row);
        }
   
        return $array_res;
    }
     public function getProductsByCategoryWithRandom($product, $category) {
        $query = 'SELECT * FROM `product` WHERE `category` ="' . $category . '" AND `id` <> "' . $product . '" AND  `is_active` = 1 ORDER BY rand() LIMIT 5';
        $db = new Database();
        $result = $db->readQuery1($query);
        $array_res = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($array_res, $row);
        }
   
        return $array_res;
    }
    
    public function getProductsByBrand($brand) {
        $query = 'SELECT * FROM `product` WHERE `brand` ="' . $brand . '"  `is_active` = 1 ORDER BY queue ASC';

        $db = new Database();
        $result = $db->readQuery1($query);
        $array_res = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($array_res, $row);
        }
        return $array_res;
    }
    public function getProductsBySubCategory($subcat) {
        $query = 'SELECT * FROM `product` WHERE `sub_category` ="' . $subcat . '"  `is_active` = 1  ORDER BY queue ASC';
        
        $db = new Database();
        $result = $db->readQuery1($query);
        $array_res = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($array_res, $row);
        }
        return $array_res;
    }

    public function getProductsByCategoryAndBrand($category, $brand, $keyword) {

        $w = array();
        $where = '';

        if (!empty($category)) {
            $w[] = "`category` = '" . $category . "'";
        }
        if (!empty($brand)) {
            $w[] = "`brand` = '" . $brand . "'";
        }
        if (!empty($keyword)) {
            $w[] = "`name` LIKE '%" . $keyword . "%'";
        }

        if (count($w)) {
            $where = 'WHERE ' . implode(' AND ', $w);
        }

        $query = "SELECT * FROM `product` " . $where . " AND `is_active` = 1 ORDER BY queue ASC";
        $db = new Database();
        $result = $db->readQuery1($query);
        $array_res = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($array_res, $row);
        }
        return $array_res;
    }

}
