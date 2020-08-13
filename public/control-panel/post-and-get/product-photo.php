<?php


include_once(dirname(__FILE__) . '/../../class/include.php');

if (isset($_POST['create'])) {

    $PRODUCT_PHOTO = new ProductPhoto(NULL);
    $VALID = new Validator();

    $PRODUCT_PHOTO->product = $_POST['id'];
    $PRODUCT_PHOTO->caption = $_POST['caption'];
    $PRODUCT_PHOTO->queue = 0;

    $dir_dest = '../../upload/product/gallery/';
    $dir_dest_thumb = '../../upload/product/gallery/thumb/';

    $handle = new Upload($_FILES['image']);
    $imgName = null;
    $img = Helper::randamId();


    if ($handle->uploaded) {
        $handle->image_resize = true;
        $handle->file_new_name_body = TRUE;
        $handle->file_overwrite = TRUE;
        $handle->file_new_name_ext = 'jpg';
        $handle->image_ratio_crop = 'C';
        $handle->image_watermark = '../../img/logo/logo-watermark.png';
        $handle->file_new_name_body = $img;
        // $handle->image_x = 1500;
        // $handle->image_y = 900;
        $image_dst_x = $handle->image_dst_x;
        $image_dst_y = $handle->image_dst_y;
        if ($image_dst_y > 900) {
            $newSize = Helper::calImgResize(900, $image_dst_x, $image_dst_y);

            $image_x = (int) $newSize[0];
            $image_y = (int) $newSize[1];

            $handle->image_x = $image_x;
            $handle->image_y = $image_y;
        } else {
            $handle->image_x = $image_dst_x;
            $handle->image_y = $image_dst_y;
        }

        $handle->Process($dir_dest);

        if ($handle->processed) {

            $info = getimagesize($handle->file_dst_pathname);

            $imgName = $handle->file_dst_name;
        }

        $handle->image_resize = true;
        $handle->file_new_name_body = TRUE;
        $handle->file_overwrite = TRUE;
        $handle->file_new_name_ext = 'jpg';
        $handle->image_ratio_crop = 'C';
        $handle->file_new_name_body = $img;
        $handle->image_x = 200;
        $handle->image_y = 200;

        $handle->Process($dir_dest_thumb);

        if ($handle->processed) {
            $info = getimagesize($handle->file_dst_pathname);
            $imgName = $handle->file_dst_name;
        }
    }

    $PRODUCT_PHOTO->image_name = $imgName;

    $VALID->check($PRODUCT_PHOTO, [
        'caption' => ['required' => TRUE],
        'image_name' => ['required' => TRUE]
    ]);

    if ($VALID->passed()) {
        $PRODUCT_PHOTO->create();

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

    $dir_dest = '../../upload/product/gallery/';
    $dir_dest_thumb = '../../upload/product/gallery/thumb/';

    $handle = new Upload($_FILES['image']);

    $img = $_POST ["oldImageName"];

    if ($handle->uploaded) {
        $handle->image_resize = true;
        $handle->file_new_name_body = TRUE;
        $handle->file_overwrite = TRUE;
        $handle->file_new_name_ext = FALSE;
        $handle->image_ratio_crop = 'C';
        $handle->image_watermark = '../../img/logo/logo-watermark.png';
        $handle->file_new_name_body = $img;
        // $handle->image_x = 1500;
        // $handle->image_y = 900;
        $image_dst_x = $handle->image_dst_x;
        $image_dst_y = $handle->image_dst_y;
        if ($image_dst_y > 900) {
            $newSize = Helper::calImgResize(900, $image_dst_x, $image_dst_y);

            $image_x = (int) $newSize[0];
            $image_y = (int) $newSize[1];

            $handle->image_x = $image_x;
            $handle->image_y = $image_y;
        } else {
            $handle->image_x = $image_dst_x;
            $handle->image_y = $image_dst_y;
        }

        $handle->Process($dir_dest);

        if ($handle->processed) {
            $info = getimagesize($handle->file_dst_pathname);
            $img = $handle->file_dst_name;
        }

        $handle->image_resize = true;
        $handle->file_new_name_body = TRUE;
        $handle->file_overwrite = TRUE;
        $handle->file_new_name_ext = FALSE;
        $handle->image_ratio_crop = 'C';
       $handle->file_new_name_body = $img;
        $handle->image_x = 200;
        $handle->image_y = 200;

        $handle->Process($dir_dest_thumb);

        if ($handle->processed) {
            $info = getimagesize($handle->file_dst_pathname);
            $img = $handle->file_dst_name;
        }
    }


    $PRODUCT_PHOTO = new ProductPhoto($_POST['id']);
    $PRODUCT_PHOTO->image_name = $_POST['oldImageName'];
    $PRODUCT_PHOTO->caption = $_POST['caption'];

    $VALID = new Validator();

    $VALID->check($PRODUCT_PHOTO, [
        'caption' => ['required' => TRUE],
        'image_name' => ['required' => TRUE]
    ]);

    if ($VALID->passed()) {
        $PRODUCT_PHOTO->update();

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
        $PRODUCT_PHOTO = ProductPhoto::arrange($key, $img);

        header('Location: ' . $_SERVER['HTTP_REFERER']);
    }
}