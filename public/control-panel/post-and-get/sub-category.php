<?php

include_once(dirname(__FILE__) . '/../../class/include.php');

if (isset($_POST['create'])) {

    $SUB_CATEGORY = new SubCategory(NULL);
    $VALID = new Validator();

    $SUB_CATEGORY->name = $_POST['name'];
    $SUB_CATEGORY->category = $_POST['category'];
    $SUB_CATEGORY->isActive = 1;

    $dir_dest = '../../upload/category/sub/';

    $handle = new Upload($_FILES['image']);

    $imgName = null;

    if ($handle->uploaded) {
        $handle->image_resize = true;
        $handle->file_new_name_ext = 'jpg';
        $handle->image_ratio_crop = 'C';
        $handle->file_new_name_body = Helper::randamId();
        $handle->image_x = 300;
        $handle->image_y = 300;

        $handle->Process($dir_dest);

        if ($handle->processed) {
            $info = getimagesize($handle->file_dst_pathname);
            $imgName = $handle->file_dst_name;
        }
    }

    $SUB_CATEGORY->imageName = $imgName;

    $VALID->check($SUB_CATEGORY, [
        'name' => ['required' => TRUE],
        'imageName' => ['required' => TRUE]
    ]);

    if ($VALID->passed()) {
        $SUB_CATEGORY->create();

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
    $dir_dest = '../../upload/category/sub/';

    $handle = new Upload($_FILES['image']);

    $imgName = null;

    if ($handle->uploaded) {
        $handle->image_resize = true;
        $handle->file_new_name_body = TRUE;
        $handle->file_overwrite = TRUE;
        $handle->file_new_name_ext = FALSE;
        $handle->image_ratio_crop = 'C';
        $handle->file_new_name_body = $_POST ["oldImageName"];
        $handle->image_x = 300;
        $handle->image_y = 300;

        $handle->Process($dir_dest);

        if ($handle->processed) {
            $info = getimagesize($handle->file_dst_pathname);
            $imgName = $handle->file_dst_name;
        }
    }

    $SUB_CATEGORY = new SubCategory($_POST['id']);
    $SUB_CATEGORY->imageName = $_POST['oldImageName'];
    $SUB_CATEGORY->name = $_POST['name'];
    $SUB_CATEGORY->isActive = $_POST['is_active'];


    $VALID = new Validator();
    $VALID->check($SUB_CATEGORY, [
        'name' => ['required' => TRUE],
        'imageName' => ['required' => TRUE]
    ]);

    if ($VALID->passed()) {
        $SUB_CATEGORY->update();

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

        $SUB_CATEGORY = SubCategory::arrange($key, $img);

        header('Location: ' . $_SERVER['HTTP_REFERER']);
    }
}