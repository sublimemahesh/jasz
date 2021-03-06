<?php
//
include_once(dirname(__FILE__) . '/../class/include.php');
include_once(dirname(__FILE__) . '/auth.php');
$id = '';
if (isset($_GET['id'])) {
    $id = $_GET['id'];
}
$PRODUCT = new Product($id);
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Products</title>
    <!-- Favicon-->
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">
    <link href="plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="plugins/node-waves/waves.css" rel="stylesheet" />
    <link href="plugins/animate-css/animate.css" rel="stylesheet" />
    <link href="plugins/sweetalert/sweetalert.css" rel="stylesheet" />
    <link href="css/style.css" rel="stylesheet">
    <link href="css/themes/all-themes.css" rel="stylesheet" />
</head>
<style>
    .view-edit-img {
        width: 100%
    }
</style>

<body class="theme-red">
    <?php
    include './navigation-and-header.php';
    ?>
    <section class="content">
        <div class="container-fluid">
            <?php
            $vali = new Validator();
            $vali->show_message();
            ?>
            <!-- Vertical Layout -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>
                                Edit Products
                            </h2>
                            <ul class="header-dropdown">
                                <li class="">
                                    <a href="manage-products.php">
                                        <i class="material-icons">list</i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="body">
                            <form class="form-horizontal" method="post" action="post-and-get/product.php" enctype="multipart/form-data">
                                <div class="col-md-12">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <select class="form-control place-select1 show-tick" id="category" name="category" required="TRUE">
                                                <option> --Please Select Category-- </option>
                                                <?php
                                                foreach (Category::all() as $category) {
                                                ?>
                                                    <option value="<?php echo $category['id']; ?>" <?php
                                                                                                    if ($PRODUCT->category == $category['id']) {
                                                                                                        echo 'selected';
                                                                                                    }
                                                                                                    ?>><?php echo $category['name']; ?></option>
                                                <?php
                                                }
                                                ?>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <?php if ($PRODUCT->sub_category) { ?>
                                    <div class="col-md-12">
                                        <div class="form-group form-float">
                                            <div class="form-line">
                                                <select class="form-control place-select1 show-tick" id="sub_category" name="sub_category" required="TRUE">
                                                    <option> --Please Select Category-- </option>
                                                    <?php
                                                    $SUB_CATEGORY = new SubCategory();
                                                    foreach ($SUB_CATEGORY->getAllSubCategoryByCategory($PRODUCT->category) as $sub_category) {
                                                    ?>

                                                        <?php
                                                        if ($PRODUCT->sub_category == $sub_category['id']) {
                                                        ?>
                                                            <option value="<?php echo $sub_category['id']; ?>" selected=""><?php echo $sub_category['name']; ?></option>
                                                        <?php } else { ?>
                                                            <option value="<?php echo $sub_category['id']; ?>"><?php echo $sub_category['name']; ?></option>
                                                    <?Php
                                                        }
                                                    }
                                                    ?>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                <?php } ?>


                                <div class="col-md-12">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <select class="form-control place-select1 show-tick" id="brand" name="brand" required="TRUE">
                                                <option> --Please Select Brand-- </option>
                                                <?php
                                                foreach (Brand::all() as $brand) {
                                                ?>
                                                    <option value="<?php echo $brand['id']; ?>" <?php
                                                                                                if ($PRODUCT->brand == $brand['id']) {
                                                                                                    echo 'selected';
                                                                                                }
                                                                                                ?>><?php echo $brand['name']; ?></option>
                                                <?php
                                                }
                                                ?>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="name" class="form-control" value="<?php echo $PRODUCT->name; ?>" name="name" required="TRUE">
                                            <label class="form-label">Title</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group form-float">

                                        <input type="file" id="image" class="form-control" value="<?php echo $PRODUCT->image_name; ?>" name="image">
                                        <img src="../upload/product/<?php echo $PRODUCT->image_name; ?>" id="image" class="view-edit-img img img-responsive img-thumbnail" name="image" alt="old image">

                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group form-float">

                                        <input type="file" id="image" class="form-control" value="<?php echo $PRODUCT->image_name2; ?>" name="image2">
                                        <img src="../upload/product/<?php echo $PRODUCT->image_name2; ?>" id="image2" class="view-edit-img img img-responsive img-thumbnail" name="image2" alt="old image">

                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="short_description" class="form-control" value="<?php echo $PRODUCT->short_description; ?>" name="short_description">
                                            <label class="form-label">Short Description</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <label for="description">Description</label>
                                    <div class="form-line">
                                        <textarea id="description" name="description" class="form-control" rows="5"><?php echo $PRODUCT->description; ?></textarea>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="price" class="form-control" value="<?php echo $PRODUCT->price; ?>" name="price" required="TRUE">
                                            <label class="form-label">Price (Rs)</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="discount" class="form-control" value="<?php echo $PRODUCT->discount; ?>" name="discount" required="TRUE">
                                            <label class="form-label">Discount (%)</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="shipping_fee" class="form-control" autocomplete="off" value="<?php echo $PRODUCT->shipping_fee; ?>" name="shipping_fee" required="true">
                                            <label class="form-label">Shipping Fee (Rs)</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input class="filled-in chk-col-pink" type="checkbox" <?php
                                                                                                if ($PRODUCT->isActive == 1) {
                                                                                                    echo 'checked';
                                                                                                }
                                                                                                ?> name="is_active" value="1" id="rememberme" />
                                        <label for="rememberme">Activate</label>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input class="filled-in chk-col-pink" type="checkbox" <?php
                                                                                                if ($PRODUCT->isFeaturedProduct == 1) {
                                                                                                    echo 'checked';
                                                                                                }
                                                                                                ?> name="featured_product" value="1" id="featured_product" />
                                        <label for="featured_product">Is Featured Product</label>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <input type="hidden" id="oldImageName" value="<?php echo $PRODUCT->image_name; ?>" name="oldImageName" />
                                    <input type="hidden" id="oldImageName2" value="<?php echo $PRODUCT->image_name2; ?>" name="oldImageName2" />
                                    <input type="hidden" id="id" value="<?php echo $PRODUCT->id; ?>" name="id" />
                                    <button type="submit" class="btn btn-primary m-t-15 waves-effect" name="update" value="update">Save Changes</button>
                                </div>
                                <div class="row clearfix"> </div>
                                <hr />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- #END# Vertical Layout -->
        </div>
    </section>
    <!-- Jquery Core Js -->
    <script src="plugins/jquery/jquery.min.js"></script>
    <script src="plugins/bootstrap/js/bootstrap.js"></script>
    <script src="plugins/jquery-slimscroll/jquery.slimscroll.js"></script>
    <script src="plugins/node-waves/waves.js"></script>
    <script src="js/admin.js"></script>
    <script src="js/demo.js"></script>
    <script src="js/add-new-ad.js" type="text/javascript"></script>

    <script src="tinymce/js/tinymce/tinymce.min.js"></script>
    <script>
        tinymce.init({
            selector: "#description",
            // ===========================================
            // INCLUDE THE PLUGIN
            // ===========================================
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table contextmenu paste"
            ],
            // ===========================================
            // PUT PLUGIN'S BUTTON on the toolbar
            // ===========================================
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image jbimages",
            // ===========================================
            // SET RELATIVE_URLS to FALSE (This is required for images to display properly)
            // ===========================================
            relative_urls: false
        });
    </script>
</body>

</html>