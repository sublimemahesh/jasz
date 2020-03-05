<?php

include_once(dirname(__FILE__) . '/../../class/include.php');

if (isset($_POST['create'])) {

    $CATEGORY = new Category(NULL);
    $VALID = new Validator();

    $CATEGORY->name = $_POST['name'];
    $CATEGORY->haveSub = $_POST['subCategory'];
    $CATEGORY->isActive = 1;

    $dir_dest = '../../upload/category/';

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

    $CATEGORY->imageName = $imgName;
    
 //Banner Image
    $dir_dest_banner = '../../upload/category/banner/';

    $handle_banner = new Upload($_FILES['banner']);

    $imgNameBanner = null;

    if ($handle_banner->uploaded) {
        $handle_banner->image_resize = true;
        $handle_banner->file_new_name_ext = 'jpg';
        $handle_banner->image_ratio_crop = 'C';
        $handle_banner->file_new_name_body = Helper::randamId();
        $handle_banner->image_x = 1140;
        $handle_banner->image_y = 110;

        $handle_banner->Process($dir_dest_banner);

        if ($handle_banner->processed) {
            $info = getimagesize($handle_banner->file_dst_pathname);
            $imgNameBanner = $handle_banner->file_dst_name;
        }
    }

    $CATEGORY->banner = $imgNameBanner;

    $VALID->check($CATEGORY, [
        'name' => ['required' => TRUE],
        'imageName' => ['required' => TRUE]
    ]);

    if ($VALID->passed()) {
        $CATEGORY->create();

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
    $dir_dest = '../../upload/category/';
    $dir_dest_banner = '../../upload/category/banner/';

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
    
    $handle_banner = new Upload($_FILES['banner']);

    $imgName = null;

    if ($handle_banner->uploaded) {
        $handle_banner->image_resize = true;
        $handle_banner->file_new_name_body = TRUE;
        $handle_banner->file_overwrite = TRUE;
        $handle_banner->file_new_name_ext = FALSE;
        $handle_banner->image_ratio_crop = 'C';
        $handle_banner->file_new_name_body = $_POST ["oldImageNameBanner"];
        $handle_banner->image_x = 1140;
        $handle_banner->image_y = 110;

        $handle_banner->Process($dir_dest_banner);

        if ($handle_banner->processed) {
            $info = getimagesize($handle_banner->file_dst_pathname);
            $imgName = $handle_banner->file_dst_name;
        }
    }

    $CATEGORY = new Category($_POST['id']);
    $CATEGORY->imageName = $_POST['oldImageName'];
    $CATEGORY->banner = $_POST['oldImageNameBanner'];
    $CATEGORY->name = $_POST['name'];
    $CATEGORY->isActive = $_POST['is_active'];


    $VALID = new Validator();
    $VALID->check($CATEGORY, [
        'name' => ['required' => TRUE],
        'imageName' => ['required' => TRUE]
    ]);

    if ($VALID->passed()) {
        $CATEGORY->update();

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
        
        $CATEGORY = Category::arrange($key, $img);

        header('Location: ' . $_SERVER['HTTP_REFERER']);
    }
}