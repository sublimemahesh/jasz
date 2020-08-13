import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import $ from 'jquery';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';

class Best_Deal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responsive: {
                0: {
                    items: 1,
                },
                580: {
                    items: 2,
                },
                600: {
                    items: 3,
                },
                1000: {
                    items: 4,
                },
            },
            alert: null
        };
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart(id) {
        let items = sessionStorage.getItem("cart");
        
        if (items === '' || items === null) {

            let arr = [{ id: id, qty: 1 }];
            sessionStorage.setItem("cart", JSON.stringify(arr));
            let count = $('#header-cart').attr('items');
            let new_item_count = parseInt(count) + 1;
            sessionStorage.setItem("cart_count", new_item_count);
            $('#header-cart').attr('items', new_item_count);
            $('#header-cart').text(new_item_count);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: 'Product is successfully added to the cart',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            let cart = [];
            cart = JSON.parse(sessionStorage.getItem("cart"));

            let products = cart.some(item => item.id === id);
            if (products) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    text: 'Product is already exsit in the cart',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                let arr = { id: id, qty: 1 };
                cart.push(arr);
                sessionStorage.setItem("cart", JSON.stringify(cart));
                let count = $('#header-cart').attr('items');
                let new_item_count = parseInt(count) + 1;
                sessionStorage.setItem("cart_count", new_item_count);
                $('#header-cart').attr('items', new_item_count);
                $('#header-cart').text(new_item_count);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    text: 'Product is successfully added to the cart',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }
    render() {
        let BestDeal = this.props.feedData
            .map(function (feedData, index) {
                return (
                    <div className="item">
                        <div className="item-product5">
                            <div className="product-thumb product-thumb5">
                                <NavLink to={`/product-view/${feedData.id}`} className="product-thumb-link">
                                    <img className="first-thumb" src={`upload/product/${feedData.image_name}`} alt="" />
                                    <img className="second-thumb" src={`upload/product/${feedData.image_name2}`} alt="" />
                                </NavLink>
                                <div className="product-info-cart">
                                    <a className="addcart-link" onClick={() => this.addToCart(feedData.id)}><i className="fa fa-shopping-basket"></i>  Add to Cart</a>
                                    {this.state.alert}
                                </div>
                            </div>
                            <div className="product-info5">
                                <h3 className="title-product"><NavLink to={`/product-view/${feedData.id}`}>{feedData.name} </NavLink></h3>
                                <div className="info-price">
                                    <span>{feedData.discount != 0 && feedData.discount != '' ? "Rs. " + (new Intl.NumberFormat().format(feedData.price - (feedData.price * feedData.discount / 100))) : "Rs. " + new Intl.NumberFormat().format((feedData.price))}</span>
                                    <del>{feedData.discount != 0 && feedData.discount != '' && "Rs. " + (new Intl.NumberFormat().format(feedData.price))}</del>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }, this);

        return (

            <div className="main-content-home5 best-deal">
                <div className="container">
                    <div className="popcat-list-box popcat-list-box1">
                        <h2 className="h2-white"><span>best deals</span></h2>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="content-popular5">
                                <div className="tab-content">
                                    <div role="tabpanel" className="tab-pane fade in active" id="best1">
                                        <div className="popular-cat-slider slider-home5">
                                            <div className="wrap-item" data-pagination="false" data-navigation="true" data-itemscustom="[[0, 1],[768, 2],[992, 3],[1200, 4]]">
                                                <OwlCarousel items={4} margin={0} autoplay={false} nav dots={false} responsive={this.state.responsive}>
                                                    {BestDeal}
                                                </OwlCarousel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Best_Deal;