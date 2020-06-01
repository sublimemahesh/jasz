<?php

include_once(dirname(__FILE__) . '/../../class/include.php');

if (isset($_POST['create'])) {

    $OFFER = new Offer(NULL);
    $VALID = new Validator();

    $OFFER->title = $_POST['title'];
    $OFFER->shortDescription = $_POST['short_description'];
    $OFFER->description = $_POST['description'];
    $OFFER->price = $_POST['price'];
    $OFFER->discount = $_POST['discount'];
    $OFFER->isActive = 1;

    $dir_dest = '../../upload/offer/';
    $dir_dest_thumb = '../../upload/offer/thumb/';

    $handle = new Upload($_FILES['image']);

    $imgName = null;
    $img = Helper::randamId();

    if ($handle->uploaded) {
        $handle->image_resize = true;
        $handle->file_new_name_ext = 'jpg';
        $handle->image_ratio_crop = 'C';
        $handle->file_new_name_body = $img;
        $handle->image_x = 900;
        $handle->image_y = 500;

        $handle->Process($dir_dest);

        if ($handle->processed) {
            $info = getimagesize($handle->file_dst_pathname);
            $imgName = $handle->file_dst_name;
        }
        $handle->image_resize = true;
        $handle->file_new_name_ext = 'jpg';
        $handle->image_ratio_crop = 'C';
        $handle->file_new_name_body = $img;
        $handle->image_x = 300;
        $handle->image_y = 170;

        $handle->Process($dir_dest_thumb);

        if ($handle->processed) {
            $info = getimagesize($handle->file_dst_pathname);
            $imgName = $handle->file_dst_name;
        }
    }

    $OFFER->imageName = $imgName;

    $VALID->check($OFFER, [
        'title' => ['required' => TRUE],
        'shortDescription' => ['required' => TRUE],
        'description' => ['required' => TRUE],
        'price' => ['required' => TRUE],
        'imageName' => ['required' => TRUE]
    ]);

    if ($VALID->passed()) {
        $OFFER->create();

        if (!isset($_SESSION)) {
            session_start();
        }
        $VALID->addError("Your data was saved successfully", 'success');
        $_SESSION['ERRORS'] = $VALID->errors();

        header('Location: ' . $_SERVER['HTTP_REFERER']);
    } else {

        if (!isset($_SESSION)) {
            session_start();
        }

        $_SESSION['ERRORS'] = $VALID->errors();

        header('Location: ' . $_SERVER['HTTP_REFERER']);
    }
}

if (isset($_POST['update'])) {
    $dir_dest = '../../upload/offer/';
    $dir_dest_thumb = '../../upload/offer/thumb/';

    $handle = new Upload($_FILES['image']);

    $imgName = null;

    if ($handle->uploaded) {
        $handle->image_resize = true;
        $handle->file_new_name_body = TRUE;
        $handle->file_overwrite = TRUE;
        $handle->file_new_name_ext = FALSE;
        $handle->image_ratio_crop = 'C';
        $handle->file_new_name_body = $_POST ["oldImageName"];
        $handle->image_x = 900;
        $handle->image_y = 500;

        $handle->Process($dir_dest);

        if ($handle->processed) {
            $info = getimagesize($handle->file_dst_pathname);
            $imgName = $handle->file_dst_name;
        }
        $handle->image_resize = true;
        $handle->file_new_name_body = TRUE;
        $handle->file_overwrite = TRUE;
        $handle->file_new_name_ext = FALSE;
        $handle->image_ratio_crop = 'C';
        $handle->file_new_name_body = $_POST ["oldImageName"];
        $handle->image_x = 300;
        $handle->image_y = 170;

        $handle->Process($dir_dest_thumb);

        if ($handle->processed) {
            $info = getimagesize($handle->file_dst_pathname);
            $imgName = $handle->file_dst_name;
        }
    }

    $OFFER = new Offer($_POST['id']);
    $OFFER->imageName = $_POST['oldImageName'];
    $OFFER->title = $_POST['title'];
    $OFFER->shortDescription = $_POST['short_description'];
    $OFFER->description = $_POST['description'];
    $OFFER->price = $_POST['price'];
    $OFFER->discount = $_POST['discount'];
    $OFFER->isActive = $_POST['is_active'];


    $VALID = new Validator();
    $VALID->check($OFFER, [
        'title' => ['required' => TRUE],
        'shortDescription' => ['required' => TRUE],
        'description' => ['required' => TRUE],
        'price' => ['required' => TRUE],
        'imageName' => ['required' => TRUE]
    ]);

    if ($VALID->passed()) {
        $OFFER->update();

        if (!isset($_SESSION)) {
            session_start();
        }
        $VALID->addError("Your changes saved successfully", 'success');
        $_SESSION['ERRORS'] = $VALID->errors();

        header('Location: ' . $_SERVER['HTTP_REFERER']);
    } else {

        if (!isset($_SESSION)) {
            session_start();
        }

        $_SESSION['ERRORS'] = $VALID->errors();

        header('Location: ' . $_SERVER['HTTP_REFERER']);
    }
}


if (isset($_POST['save-data'])) {

    foreach ($_POST['sort'] as $key => $img) {
        $key = $key + 1;

        $OFFER = Offer::arrange($key, $img);

        header('Location: ' . $_SERVER['HTTP_REFERER']);
    }
}