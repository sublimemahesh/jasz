import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {PostData} from '../../services/PostData';
import NumericInput from 'react-numeric-input';
import $ from 'jquery';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';

const SweetAlert = withSwalInstance(swal);

class Cart extends Component {
    constructor(props) {

        console.log(props);
        super(props);
        this.state = {
            cartItems: [],
            productDetails: [],
            cartDetails: [],
            alert: null
        };
        this.getCartItems = this.getCartItems.bind(this);
        this.getProductDetails = this.getProductDetails.bind(this);
        this.calculatePrice = this.calculatePrice.bind(this);
        this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
        this.removeItemFromCart = this.removeItemFromCart.bind(this);
        this.onClickUpdateCartButton = this.onClickUpdateCartButton.bind(this);
        this.addQtyDetailsToSession = this.addQtyDetailsToSession.bind(this);

    }
    componentWillMount() {
        this.getCartItems();
        this.addQtyDetailsToSession();
    }

    getCartItems() {
        let items = sessionStorage.getItem("cart");
        if(items != '' || items != null) {
            let cart_array = items.split(',');
            this.setState({cartItems: cart_array});
            this.getProductDetails(cart_array);
        }
    }
    getProductDetails(item) {
        PostData('product-details-for-cart', item).then((result1) => {
            let responseJson1 = result1;
            if (responseJson1.feedData) {
                console.log(`responseJson1.feedData: `, responseJson1.feedData);

                this.setState({productDetails: responseJson1.feedData});

                let cartDetailsArr = [];
                responseJson1.feedData.map(function (item, index) {

                    let arr = {};

                    arr['id'] = item.id;
                    arr['name'] = item.name;
                    arr['qty'] = 1;
                    arr['amount'] = item.price;

                    cartDetailsArr.push(arr);
                }, this);

                this.setState({cartDetails: cartDetailsArr});
            }
        });
    }
    calculatePrice = (new_qty, price, id) => {
        let new_price = price*new_qty;
        $('#amount-' + id).html('Rs. ' + new_price);
        $('#amount-' + id).attr('price', new_price);
    }
    onClickUpdateCartButton(event) {
      this.calculateTotalPrice();
      this.addQtyDetailsToSession();
   }
    calculateTotalPrice() {

        let tot = 0;
        $('.item-amount').each(function(){
            tot += parseFloat($(this).attr('price'));
        });
        $('#subtotal-amount').html('Rs. ' + tot);
        $('#total-amount').html('Rs. ' + tot);

        const getAlert = () => (
            <SweetAlert
                show="true"
                title="Success"
                text="Cart was updated successfully."
                type= "success"
              />
        );
        this.setState({
             alert: getAlert()
         });

    }
    addQtyDetailsToSession() {

        let cartDetailsArr = [];
        $('.tr_cart_item').each(function(){
            let arr = {};

            let id = $(this).attr('item-id');
            let name = $(this).attr('item-name');
            let qty = $('.tr_cart_item #qty-' + id).val();
            let amount = $('.tr_cart_item #amount-' + id).attr('price');

            arr['id'] = id;
            arr['name'] = name;
            arr['qty'] = qty;
            arr['amount'] = amount;
            cartDetailsArr.push(arr);

        });
        this.setState({cartDetails: cartDetailsArr});

    }
    removeItemFromCart = (id) => {

        let items = sessionStorage.getItem("cart");
        let cart_array = items.split(',');
        cart_array = cart_array.filter(item => item !== id);
        sessionStorage.setItem("cart", cart_array);
        let count = $('#header-cart').attr('items');
        let new_item_count = parseInt(count) - 1;
        sessionStorage.setItem("cart_count", new_item_count);
        $('#header-cart').attr('items', new_item_count);
        $('#header-cart').text(new_item_count);
        $('#remove-item-' + id).remove();

        const getAlert = () => (
            <SweetAlert
                show="true"
                title="Success"
                text="product was successfully removed from the cart."
                type= "success"
              />
        );
        this.setState({
             alert: getAlert()
         });


    }

    render() {
        let tot = 0;
        let cartItems = this.state.productDetails
                        .map(function (item, index) {
                            tot += parseFloat(item.price);

        return (
            <tr className="cart_item tr_cart_item" id={`remove-item-${item.id}`} item-id={item.id} item-name={item.name} each-price={item.price}>
                <td className="product-remove">
                    <a className="remove" id={`remove-item-${item.id}`}  onClick={() => this.removeItemFromCart(item.id)}><i className="fa fa-times"></i></a>
                    {this.state.alert}
                </td>
                <td className="product-thumbnail">
                    <a href="#"><img  src={`upload/product/thumb/${item.image_name}`} alt=""/></a>
                </td>
                <td className="product-name">
                    <a href="#">{item.name}</a>
                </td>
                <td className="product-price">
                    <span className="amount">Rs. {item.price}</span>
                </td>
                <td className="product-quantity">
                    <div className="info-qty">
                    <NumericInput id={`qty-${item.id}`} min={1} max={10} value={1} data-price={item.price} onChange={value => this.calculatePrice(value, item.price, item.id)} mobile />

                    </div>
                </td>
                <td className="product-subtotal">
                        <span className="item-amount" id={`amount-${item.id}`} price={item.price}>Rs. {item.price}</span>
                </td>
            </tr>
                );
}, this);
    const location = {
        pathname: '/checkout',
        state: { details: this.state.cartDetails }
      }
        return (
<div className="">
                    <Header />
                    <section id="subheader">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12 ">
                                    <div class="col-md-6 div-big-heading">
                                        <h1 class="big-heading">
                                            Cart
                                        </h1>
                                    </div>
                                    <div class="col-md-6 div-p">
                                        <p><a href="./">Home</a> | Cart</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
               <div id="content">
		<div className="content-page woocommerce">
			<div className="container">
				<div className="cart-content-page">
					<h2 className="title-shop-page">my cart</h2>
						<div className="table-responsive">
							<table cellspacing="0" className="shop_table cart table">
								<thead>
									<tr>
										<th className="product-remove">&nbsp;</th>
										<th className="product-thumbnail">&nbsp;</th>
										<th className="product-name">Product</th>
										<th className="product-price">Price</th>
										<th className="product-quantity">Quantity</th>
										<th className="product-subtotal">Total</th>
									</tr>
								</thead>
								<tbody>
									{cartItems}
									<tr>
										<td className="actions" colspan="6">

                                                                                        <button className="update-cart" onClick={this.onClickUpdateCartButton}>Update Cart</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>

					<div className="cart-collaterals">
						<div className="cart_totals ">
							<h2>Cart Totals</h2>
							<div className="table-responsive">
								<table cellspacing="0" className="table">
									<tbody>
										<tr className="cart-subtotal">
											<th>Subtotal</th>
											<td><strong className="amount" id="subtotal-amount">Rs. {tot}</strong></td>
										</tr>
										<tr className="shipping">
											<th>Delivery</th>
											<td>
												<ul id="shipping_method">
													<li>
														<input type="radio" className="shipping_method" value="local_delivery" id="shipping_method_0_local_delivery" data-index="0" name="shipping_method[0]" />
														<label for="shipping_method_0_local_delivery">Local Delivery (Free)</label>
													</li>
													<li>
														<input type="radio" className="shipping_method" value="local_pickup" id="shipping_method_0_local_pickup" data-index="0" name="shipping_method[0]" />
														<label for="shipping_method_0_local_pickup">Local Pickup (Free)</label>
													</li>
												</ul>
											</td>
										</tr>
										<tr className="order-total">
											<th>Total</th>
											<td><strong><span className="amount"id="total-amount">Rs. {tot}</span></strong> </td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className="wc-proceed-to-checkout">
                                                        <Link className="checkout-button button alt wc-forward" to={location}>Proceed to Checkout</Link>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
        <Footer />
            </div>
                );
    }
}
export default Cart;

