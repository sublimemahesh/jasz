<?php
include_once(dirname(__FILE__) . '/../class/include.php');
include_once(dirname(__FILE__) . '/auth.php');

$id = '';
if (isset($_GET['id'])) {
    $id = $_GET['id'];
}
if (isset($_GET['product_id'])) {
    $product_id = $_GET['product_id'];
}
$ORDER = new Order($id);
$PRODUCT = new Product($product_id);
$status = "";
if ($ORDER->paymentStatusCode == 2 && $ORDER->status == 1) {
    $status = "Successfull";
} else if ($ORDER->paymentStatusCode == 0 && $ORDER->status == 0) {
    $status = "Unpaid";
} else {
    $status = "Unsuccessfull";
}
?> 
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <title>View Orders</title>
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
                <!-- Manage Brand -->
                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="card">
                            <div class="header">
                                <h2>
                                    View Order
                                </h2>
                                <ul class="header-dropdown">

                                </ul>
                            </div>
                            <div class="body">


                              

                                <div>
                                    <table class="table table-striped table-hover">
                                        <tr>
                                            <th>Order ID</th>
                                            <td><?php echo '#' . $ORDER->id; ?></td>
                                        </tr>
                                        <tr>
                                            <th>Ordered At</th>
                                            <td><?php echo $ORDER->orderedAt; ?></td>
                                        </tr>
                                        <?php
                                        if ($ORDER->deliveryStatus == 1) {
                                            ?>
                                            <tr>
                                                <th>Delivered At</th>
                                                <td><?php echo $ORDER->deliveredAt; ?></td>
                                            </tr>
                                            <?php
                                        }
                                        if ($ORDER->deliveryStatus == 2) {
                                            ?>
                                            <tr>
                                                <th>Delivered At</th>
                                                <td><?php echo $ORDER->deliveredAt; ?></td>
                                            </tr>
                                            <tr>
                                                <th>Completed At</th>
                                                <td><?php echo $ORDER->completedAt; ?></td>
                                            </tr>
                                            <?php
                                        }
                                        ?>
                                        <tr>
                                            <th>First Name</th>
                                            <td><?php echo $ORDER->firstName; ?></td>
                                        </tr>
                                        <tr>
                                            <th>Last Name</th>
                                            <td><?php echo $ORDER->lastName; ?></td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td><?php echo $ORDER->email; ?></td>
                                        </tr>
                                        <tr>
                                            <th>Phone Number</th>
                                            <td><?php echo $ORDER->phoneNumber; ?></td>
                                        </tr>
                                        <tr>
                                            <th>Address</th>
                                            <td><?php echo $ORDER->address; ?></td>
                                        </tr>
                                        <tr>
                                            <th>City</th>
                                            <td><?php echo $ORDER->city; ?></td>
                                        </tr>
                                        <tr>
                                            <th>Product</th>
                                            <td><?php echo $PRODUCT->name; ?></td>
                                        </tr>
                                        <tr>
                                            <th>Quantity</th>
                                            <td><?php echo $ORDER->qty; ?></td>
                                        </tr>
                                        <tr>
                                            <th>Total Amount</th>
                                            <td>Rs. <?php echo $ORDER->amount; ?></td>
                                        </tr>
                                        <tr>
                                            <th>Payment Status</th>
                                            <td><?php echo $status; ?></td>
                                        </tr>
                                        <?php
                                        if ($ORDER->paymentStatusCode == 2 && $ORDER->status == 1 && $ORDER->deliveryStatus == 0) {
                                            ?>
                                            <tr>
                                                <th>Delivery Status</th>
                                                <td>Pending</td>
                                            </tr>
                                            <tr>
                                                <th>Order Status</th>
                                                <td>Not Completed</td>
                                            </tr>
                                            <?php
                                        } else if ($ORDER->paymentStatusCode == 2 && $ORDER->status == 1 && $ORDER->deliveryStatus == 1) {
                                            ?>
                                            <tr>
                                                <th>Delivery Status</th>
                                                <td>Delivered</td>
                                            </tr>
                                            <tr>
                                                <th>Order Status</th>
                                                <td>Not Completed</td>
                                            </tr>
                                            <?php
                                        } else if ($ORDER->paymentStatusCode == 2 && $ORDER->status == 1 && $ORDER->deliveryStatus == 2) {
                                            ?>
                                            <tr>
                                                <th>Delivery Status</th>
                                                <td>Delivered</td>
                                            </tr>
                                            <tr>
                                                <th>Order Status</th>
                                                <td>Completed</td>
                                            </tr>
                                            <?php
                                        }
                                        ?>
                                    </table>
                                </div>

                                <div>
                                    <?php
                                    if ($ORDER->status == 0 && $ORDER->paymentStatusCode == 0) {
                                        ?>
                                        <a href="manage-canceled-orders.php" class="op-link btn btn-sm btn-info">Back</a>
                                        <?php
                                    } else if ($ORDER->status == 1 && $ORDER->paymentStatusCode == 2) {
                                        ?>
                                        <a href="manage-orders.php?status=<?php echo $ORDER->deliveryStatus; ?>" class="op-link btn btn-sm btn-info">Back</a>
                                        <?php
                                    }
                                    ?>

                                    <?php
                                    if ($ORDER->paymentStatusCode == 2 && $ORDER->status == 1 && $ORDER->deliveryStatus == 0) {
                                        ?>
                                        <a href="#" class="mark-as-delivered btn btn-sm btn-danger" data-id="<?php echo $ORDER->id; ?>">Mark as delivered</a>
                                        <?php
                                    } else if ($ORDER->paymentStatusCode == 2 && $ORDER->status == 1 && $ORDER->deliveryStatus == 1) {
                                        ?>
                                        <a href="#" class="mark-as-completed btn btn-sm btn-danger" data-id="<?php echo $ORDER->id; ?>">Mark as Completed</a>
                                        <?php
                                    } else if ($ORDER->status == 0) {
                                        ?>
                                        <a href="#" class="do-payment btn btn-sm btn-primary" data-id="<?php echo $ORDER->id; ?>">Pay</a>
                                        <?php
                                    }
                                    ?>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <!-- #END# Manage brand -->

            </div>
        </section>

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
        <script src="js/demo.js"></script>
        <script src="js/order.js" type="text/javascript"></script>
    </body>

</html>