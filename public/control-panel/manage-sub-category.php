<?php
include_once(dirname(__FILE__) . '/../class/include.php');
include_once(dirname(__FILE__) . '/auth.php');

$id = '';
if (isset($_GET['id'])) {
    $id = $_GET['id'];
}
$CATEGORY = new Category($id);
?>
<!DOCTYPE html>
<html> 
    <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <title>Create Category</title>
        <!-- Favicon-->
        <link rel="icon" href="favicon.ico" type="image/x-icon">
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">
        <link href="plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
              <link href="plugins/node-waves/waves.css" rel="stylesheet" />
        <link href="plugins/animate-css/animate.css" rel="stylesheet" />
        <link href="plugins/sweetalert/sweetalert.css" rel="stylesheet" />
        <link href="plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet">
        <link href="css/themes/all-themes.css" rel="stylesheet" />
    </head>
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
                                <h2>Create Sub Category for <?php echo $CATEGORY->name ?></h2>

                            </div>
                            <div class="body">
                                <form class="form-horizontal"  method="post" action="post-and-get/sub-category.php" enctype="multipart/form-data"> 
                                    <div class="col-md-12">
                                        <div class="form-group form-float">
                                            <div class="form-line">
                                                <input type="text" id="name" class="form-control"  autocomplete="off" name="name" required="true">
                                                <label class="form-label">Name</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">                                       
                                        <div class="form-group form-float">
                                            <div class="form-line">
                                                <input type="file" id="image" class="form-control" name="image"  required="true">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12"> 
                                        <input type="hidden" id="category" value="<?php echo $CATEGORY->id; ?>" name="category">
                                        <input type="submit" name="create" class="btn btn-primary m-t-15 waves-effect" value="Create"/>
                                    </div>
                                    <div class="row clearfix"></div>
                                    <hr/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="card">

                            <div class="body">
                                <div>
                                    <div class="row clearfix">
                                        <?php
                                        $SUB_CATEGORYS = new SubCategory(NULL);
                                        $SUB_CATEGORY = $SUB_CATEGORYS->getAllSubCategoryByCategory($CATEGORY->id) ;
                                        if (count($SUB_CATEGORY) > 0) {
                                            foreach ($SUB_CATEGORY as $key => $sub_category) {
                                                ?>
                                                <div class="col-md-3"  id="div<?php echo $sub_category['id']; ?>">
                                                    <div class="photo-img-container">
                                                        <img src="../upload/category/sub/<?php echo $sub_category['image_name']; ?>" class="img-responsive" style="width: 70%;">
                                                    </div>
                                                    <div class="img-caption">
                                                        <p class="maxlinetitle"><?php echo $sub_category['name']; ?></p>
                                                        <div class="d">
                                                            <a href="#"  class="delete-sub-category" data-id="<?php echo $sub_category['id']; ?>"> <button class="glyphicon glyphicon-trash delete-btn"></button></a>
                                                            <a href="edit-sub-category.php?id=<?php echo $sub_category['id']; ?>"> <button class="glyphicon glyphicon-pencil edit-btn"></button></a>
                                                            <a href="arrange-sub-categories.php?id=<?php echo $sub_category['id']; ?>">  <button class="glyphicon glyphicon-random arrange-btn"></button></a>

                                                            <a href="manage-products-by-sub-category.php?id=<?php echo $sub_category['id']; ?>">  <button class="glyphicon glyphicon-shopping-cart edit-btn"></button></a>


                                                            <?php
                                                            if ($sub_category['is_active'] == 1) {
                                                                echo 'Active';
                                                            }
                                                            ?>
                                                        </div>
                                                    </div>
                                                </div>
                                                <?php
                                            }
                                        } else {
                                            ?> 
                                            <b style="padding-left: 15px;">No sub category in the database.</b> 
                                        <?php } ?> 
                                    </div>
                                </div>
                                <!--                                </div>-->
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
        <script src="plugins/bootstrap-select/js/bootstrap-select.js"></script>
        <script src="plugins/jquery-slimscroll/jquery.slimscroll.js"></script>
        <script src="plugins/node-waves/waves.js"></script>
        <script src="plugins/jquery-datatable/jquery.dataTables.js"></script>
        <script src="plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js"></script>
        <script src="plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js"></script>
        <script src="plugins/jquery-datatable/extensions/export/buttons.flash.min.js"></script>
        <script src="plugins/jquery-datatable/extensions/export/jszip.min.js"></script>
        <script src="plugins/jquery-datatable/extensions/export/pdfmake.min.js"></script>
        <script src="plugins/jquery-datatable/extensions/export/vfs_fonts.js"></script>
        <script src="plugins/jquery-datatable/extensions/export/buttons.html5.min.js"></script>
        <script src="plugins/jquery-datatable/extensions/export/buttons.print.min.js"></script>
        <script src="js/admin.js"></script>
        <script src="js/pages/tables/jquery-datatable.js"></script>
        <script src="js/demo.js"></script>
        <script src="plugins/sweetalert/sweetalert.min.js"></script>
        <script src="plugins/bootstrap-notify/bootstrap-notify.js"></script>
        <script src="js/pages/ui/dialogs.js"></script>
        <script src="delete/js/sub-category.js" type="text/javascript"></script>
    </body>
</html>