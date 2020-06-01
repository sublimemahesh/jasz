
Audience Overview
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>  Galle IT </title>
        <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
        <meta property="og:url" content="http://demo.madebytilde.com/elephant">
        <meta property="og:type" content="website">
        <meta property="og:image" content="../../elephant.html">
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
        <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16">
        <link rel="manifest" href="manifest.json">
        <link rel="mask-icon" href="safari-pinned-tab.svg" color="#f7a033">
        <meta name="theme-color" content="#ffffff">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,400italic,500,700">
        <link rel="stylesheet" href="css/vendor.min.css">
        <link rel="stylesheet" href="css/elephant.min.css">
        <link rel="stylesheet" href="css/application.min.css">
    </head>
    <style>
        .img-span{
            margin-top: 11px;
        }
    </style>
    <body class="layout layout-header-fixed">
        <?php include './top-bar.php'; ?>
        <div class="layout-main">
            <?php include './navigation.php'; ?>
            <div class="layout-content">
                <div class="layout-content-body">
                    <div class="row gutter-xs">
                        <div class="col-md-6 col-lg-3 col-lg-push-0">
                            <div class="card bg-primary">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="media-middle media-left">
                                            <span class="bg-primary-inverse circle sq-48">
                                                <span class="icon icon-hourglass-2 img-span"></span>
                                            </span>
                                        </div>
                                        <div class="media-middle media-body">
                                            <h6 class="media-heading">Pending Orders</h6>
                                            <h3 class="media-heading">
                                                <span class="fw-l">1 </span>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3 col-lg-push-3">
                            <div class="card bg-info">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="media-middle media-left">
                                            <span class="bg-info-inverse circle sq-48">
                                                <span class="icon icon-truck img-span"></span>
                                            </span>
                                        </div>
                                        <div class="media-middle media-body">
                                            <h6 class="media-heading ">Delivered Orders</h6>
                                            <h3 class="media-heading">
                                                <span class="fw-l">1 </span>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3 col-lg-pull-3">
                            <div class="card bg-info">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="media-middle media-left">
                                            <span class="bg-info-inverse circle sq-48">
                                                <span class="icon icon-shopping-basket img-span"></span>
                                            </span>
                                        </div>
                                        <div class="media-middle media-body">
                                            <h6 class="media-heading">Completed Orders</h6>
                                            <h3 class="media-heading">
                                                <span class="fw-l">1</span>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3 col-lg-pull-0">
                            <div class="card bg-warning">
                                <div class="card-body">
                                    <div class="media">
                                        <div class="media-middle media-left">
                                            <span class="bg-warning-inverse circle sq-48">
                                                <span class="icon icon-hourglass-o img-span"></span>
                                            </span>
                                        </div>
                                        <div class="media-middle media-body">
                                            <h6 class="media-heading">Unpaid Orders</h6>
                                            <h3 class="media-heading">
                                                <span class="fw-l">1</span>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row gutter-xs" style="margin-top: 12%;">
                        <div class="col-md-5 text-center">
                            <div class="card" data-toggle="match-height" >
                                <div class="card-image">
                                    <div class="overlay">
                                        <div class="overlay-content">
                                            <a href="profile.php" >  
                                                <button class="btn btn-primary btn-sm pull-right" type="button">Change Profile</button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="card-avatar">
                                    <a class="card-thumbnail rounded sq-150" href="#" style="margin-top:  0px!important; padding: 20px;">
                                        <center>
                                            <img class="img-responsive" src="img/member.jpg" alt="Teddy Wilson" style="border-radius: 6px;">

                                        </center>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-7 text-center">
                            <div class="card" data-toggle="match-height">

                                <div class="card-body">
                                    <div class="table-responsive">
                                        <div   data-toggle="match-height">
                                            <table class="table table-borderless table-middle" style="margin-top: 40px;">
                                                <tbody>
                                                    <tr> 
                                                        <td class="col-xs-3">
                                                            <a class="link-muted" href="#">Full Name : </a>
                                                        </td>
                                                        <td class="col-xs-6">
                                                            <div class="text-right">Chalana Dulaj </div>
                                                        </td>

                                                    </tr>
                                                    <tr> 
                                                        <td class="col-xs-3">
                                                            <a class="link-muted" href="#">Email Address: </a>
                                                        </td>
                                                        <td class="col-xs-6">
                                                            <div class="text-right">chalanadulaj99@gmail.com </div>
                                                        </td> 
                                                    </tr>
                                                    <tr> 
                                                        <td class="col-xs-3">
                                                            <a class="link-muted" href="#">User Name: </a>
                                                        </td>
                                                        <td class="col-xs-6">
                                                            <div class="text-right">chalanadula </div>
                                                        </td> 
                                                    </tr>
                                                    <tr> 
                                                        <td class="col-xs-3">
                                                            <a class="link-muted" href="#">Address: </a>
                                                        </td>
                                                        <td class="col-xs-6">
                                                            <div class="text-right">No 245 , Galle Road 2 , Galle. </div>
                                                        </td> 
                                                    </tr>

                                                </tbody>

                                            </table>                    
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div> 
                    </div> 
                </div>
            </div>
            <div class="layout-footer">
                <div class="layout-footer-body">
                    <small class="version">Version 1.4.0</small>
                    <small class="copyright">2020 &copy; Galle It Solution   </small>
                </div>
            </div>
        </div>

        <script src="js/vendor.min.js"></script>
        <script src="js/elephant.min.js"></script>
        <script src="js/application.min.js"></script>

    </body>

</html>