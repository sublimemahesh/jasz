 
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Galle It - Profile  </title>
        <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
        <meta property="og:url" content="http://demo.madebytilde.com/elephant">
        <meta property="og:type" content="website"> >

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
        <link rel="stylesheet" href="css/profile.min.css">
        <link href="css/sweetalert.css" rel="stylesheet" type="text/css"/>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
        <style>
            .profile-pic {
                position: relative;
                display: inline-block;
            }


            .fa-color{ 

                margin-top: -43px;
            }

        </style>
    </head>
    <body class="layout layout-header-fixed">
        <!--Top header -->
        <?php include './top-bar.php'; ?>
        <!--End Top header -->
        <div class="layout-main">
            <?php include './navigation.php'; ?>
            <div class="layout-content">
                <div class="profile">
                    <div class="profile-header">
                        <div class="profile-cover">
                            <div class="profile-container">
                                <form id="form-data-profile">
                                    <div class="profile-card">
                                        <div class="profile-avetar ">
                                            <input type="image" src="img/member.jpg" width="128" height="128"  class="append_img profile-avetar-img " /> 
                                        </div>
                                        <div class="profile-overview">  
                                            <label class="btn btn-primary file-upload-btn uploard_btn">
                                                Change Profile
                                                <input class="file-upload-input" type="file" id="change_profile" name="image_name" multiple="multiple">
                                            </label>
                                            <br>    
                                            <p style="margin: 0px 0 1px;">Customer Name : chalana</p>
                                            <p style="margin: 0px 0 1px;">NIC Number :  213215531555 </p>
                                            <p style="margin: 0px 0 1px;">Email : c@gmail.com</p>
                                        </div>
                                    </div> 
                                    <input type="hidden"  name="id" value="<?php echo $STUDENT->id ?>">
                                    <input type="hidden"  name="action" value="CHANGEPROFILE">   
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="row"> 
                        <div class="col-md-2"></div>
                        <div class="col-md-8"> 
                            <form class="demo-form-wrapper card " style="padding: 50px" id="form-data">
                                <div class="form form-horizontal">
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label" for="full_name">Full Name: </label>
                                        <div class="col-sm-9">
                                            <input id="full_name" name="full_name" class="form-control" type="text"  >
                                        </div>
                                    </div>


                                    <div class="form-group">
                                        <label class="col-sm-3 control-label" for="email">Email: </label>
                                        <div class="col-sm-9">
                                            <input id="email" name="email" class="form-control" type="text" >
                                        </div>
                                    </div>

                                    <div class="form-group" style="margin-top: 10px;">
                                        <div class="col-md-3"> </div> 
                                        <div class="col-md-3">  </div> 
                                        <div class="col-md-3">  </div> 
                                        <div class="col-md-3"> 
                                            <input type="hidden"  name="action" value="UPDATE">                                     
                                            <input type="submit" class="btn btn-primary btn-block" type="submit" id="update"   value="update" >

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                </div>
            </div>
        </div>



        <script src="js/jquery.min.js" type="text/javascript"></script> 
        <script src="js/vendor.min.js"></script>
        <script src="js/elephant.min.js"></script>
        <script src="js/application.min.js"></script>
        <script src="js/profile.min.js"></script>
        <script src="js/sweetalert.min.js" type="text/javascript"></script>



    </body>

</html>