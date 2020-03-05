<?php
include_once(dirname(__FILE__) . '/../class/include.php');
include_once(dirname(__FILE__) . '/auth.php');
$id = '';
if (isset($_GET['id'])) {
    $id = $_GET['id'];
}
$OFFER = new Offer($id);
?>
<!DOCTYPE html>
<html> 
    <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <title>Edit Offer</title>
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
                                <h2>Edit Offer</h2>
                                <ul class="header-dropdown">
                                    <li>
                                        <a href="manage-offers.php">
                                            <i class="material-icons">list</i> 
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="body">
                                <form class="form-horizontal"  method="post" action="post-and-get/offer.php" enctype="multipart/form-data"> 
                                    <div class="col-md-12">
                                        <div class="form-group form-float">
                                            <div class="form-line">
                                                <input type="text" id="title" class="form-control"  autocomplete="off" name="title" required="true" value="<?php echo $OFFER->title; ?>">
                                                <label class="form-label">Title</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">                                       
                                        <div class="form-group form-float">
                                            <div class="form-line">
                                                <input type="file" id="image" class="form-control" name="image">
                                                <img src="../upload/offer/thumb/<?php echo $OFFER->imageName; ?>" id="image" class="view-edit-img-comments img img-responsive img-thumbnail" name="image" alt="old image">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group form-float">
                                            <div class="form-line">
                                                <input type="text" id="short_description" class="form-control"  autocomplete="off" name="short_description" required="true"  value="<?php echo $OFFER->shortDescription; ?>">
                                                <label class="form-label">Short Description</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group form-float">
                                            <div class="form-line">
                                                <textarea id="description" class="form-control" name="description"><?php echo $OFFER->description; ?></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group form-float">
                                            <div class="form-line">
                                                <input type="text" id="price" class="form-control"  autocomplete="off" name="price" required="true" value="<?php echo number_format($OFFER->price, 2); ?>">
                                                <label class="form-label">Price (Rs)</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group form-float">
                                            <div class="form-line">
                                                <input type="text" id="discount" class="form-control"  autocomplete="off" name="discount" required="true" value="<?php echo $OFFER->discount; ?>">
                                                <label class="form-label">Discount (%)</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">                                       
                                        <div class="form-group">
                                            <input class="filled-in chk-col-pink" type="checkbox" <?php
                                            if ($OFFER->isActive == 1) {
                                                echo 'checked';
                                            }
                                            ?> name="is_active" value="1" id="rememberme" />
                                            <label for="rememberme">Activate</label>
                                        </div>
                                    </div>
                                    <div class="col-md-12"> 
                                        <input type="hidden" id="oldImageName" value="<?php echo $OFFER->imageName; ?>" name="oldImageName"/>
                                        <input type="hidden" id="id" value="<?php echo $OFFER->id; ?>" name="id"/>
                                        <button type="submit" class="btn btn-primary m-t-15 waves-effect" name="update" value="update">Save Changes</button>
                                    </div>
                                    <div class="row clearfix"></div>
                                    <hr/>
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