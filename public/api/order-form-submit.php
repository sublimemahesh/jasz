<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);

$ORDER = new Order(NULL);
if ($json) {
    $ORDER->member = $json['member'];
    $ORDER->country = $json['country'];
    $ORDER->address = $json['address'];
    $ORDER->postalCode = $json['postcode'];
    $ORDER->city = $json['city'];
    $ORDER->orderNote = $json['orderNotes'];
    $ORDER->amount = $json['totalAmount'];
    $ORDER->shipping_amount = $json['shippingAmount'];

    $result = $ORDER->createOrder();

    if ($result) {
        foreach ($json['productDetails'] as $product) {
            $ORDERPRODUCT = new OrderProduct(NULL);
            $ORDERPRODUCT->order = $result;
            $ORDERPRODUCT->product = $product['id'];
            $ORDERPRODUCT->qty = $product['qty'];
            $ORDERPRODUCT->amount = $product['amount'];

            $result1 = $ORDERPRODUCT->createOrderProduct();
        }
    }
    $feedData = json_encode($result1);
    echo '{"feedData":' . $result1 . '}';
}
