<?php

include_once(dirname(__FILE__) . '/../../class/include.php');

if ($_POST['option'] == 'GETSTARTANDENDDATE') {

    $start_date = date("Y-m-d", strtotime(date("Y-m-d", strtotime(date("Y-m-d"))) . "-1 month"));

    $arr = array();
    $arr['start_date'] = $start_date;
    $arr['end_date'] = date("Y-m-d");
    header('Content-Type: application/json');

    echo json_encode($arr);
    exit();
}
if ($_POST['option'] == 'GETCOMPLETEDORDERSBYSTARTANDENDDATE') {

    $orders = Order::getOrdersByDateRange($_POST['from'], $_POST['to'], $_POST['status']);

    $arr = array();
    $orderarr = array();

    foreach ($orders as $order) {

        $PRODUCT = new Product($order['product']);

        $arr['orderId'] = $order['id'];
        $arr['orderedAt'] = $order['ordered_at'];
        $arr['completedAt'] = $order['completed_at'];
        $arr['fullName'] = $order['first_name'] . ' ' . $order['last_name'];
        $arr['address'] = $order['address'];
        $arr['product'] = $PRODUCT->name;
        $arr['qty'] = $order['qty'];
        $arr['amount'] = $order['amount'];

        array_push($orderarr, $arr);
    }

    header('Content-Type: application/json');

    echo json_encode($orderarr);
    exit();
}

if ($_POST['option'] == 'GETDELIVEREDORDERSBYSTARTANDENDDATE') {

    $orders = Order::getOrdersByDateRange($_POST['from'], $_POST['to'], $_POST['status']);

    $arr = array();
    $orderarr = array();

    foreach ($orders as $order) {

        $PRODUCT = new Product($order['product']);

        $arr['orderId'] = $order['id'];
        $arr['orderedAt'] = $order['ordered_at'];
        $arr['deliveredAt'] = $order['delivered_at'];
        $arr['fullName'] = $order['first_name'] . ' ' . $order['last_name'];
        $arr['address'] = $order['address'];
        $arr['product'] = $PRODUCT->name;
        $arr['qty'] = $order['qty'];
        $arr['amount'] = $order['amount'];

        array_push($orderarr, $arr);
    }

    header('Content-Type: application/json');

    echo json_encode($orderarr);
    exit();
}

if ($_POST['option'] == 'GETPENDINGORDERSBYSTARTANDENDDATE') {

    $orders = Order::getOrdersByDateRange($_POST['from'], $_POST['to'], $_POST['status']);

    $arr = array();
    $orderarr = array();

    foreach ($orders as $order) {

        $PRODUCT = new Product($order['product']);

        $arr['orderId'] = $order['id'];
        $arr['orderedAt'] = $order['ordered_at'];
        $arr['fullName'] = $order['first_name'] . ' ' . $order['last_name'];
        $arr['address'] = $order['address'];
        $arr['product'] = $PRODUCT->name;
        $arr['qty'] = $order['qty'];
        $arr['amount'] = $order['amount'];

        array_push($orderarr, $arr);
    }

    header('Content-Type: application/json');

    echo json_encode($orderarr);
    exit();
}

if ($_POST['option'] == 'GETUNPAIDORDERSBYSTARTANDENDDATE') {

    $orders = Order::getUnpaidOrdersByDateRange($_POST['from'], $_POST['to']);

    $arr = array();
    $orderarr = array();

    foreach ($orders as $order) {

        $PRODUCT = new Product($order['product']);

        $arr['orderId'] = $order['id'];
        $arr['orderedAt'] = $order['ordered_at'];
        $arr['fullName'] = $order['first_name'] . ' ' . $order['last_name'];
        $arr['address'] = $order['address'];
        $arr['product'] = $PRODUCT->name;
        $arr['qty'] = $order['qty'];
        $arr['amount'] = $order['amount'];

        array_push($orderarr, $arr);
    }

    header('Content-Type: application/json');

    echo json_encode($orderarr);
    exit();
}