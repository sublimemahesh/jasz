import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import $ from 'jquery';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

class Popular_Categories extends Component {
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
        let Categories = this.props.feedData
            .map(function (feedData, index) {

                const location = {
                    pathname: '/products',
                    state: { category: feedData.cat_id }
                }

                let Products = feedData.cat_products
                    .map(function (product, index) {
                        return (
                            <div className="item">
                                <div className="item-hot-deal-product">
                                    <div className="hot-deal-product-thumb">
                                        <div className="product-thumb">
                                            <NavLink className="product-thumb-link" to={`/product-view/${product.id}`}>
                                                <img alt="" src={`upload/product/${product.image_name}`} className="first-thumb" />
                                                <img alt="" src={`upload/product/${product.image_name2}`} className="second-thumb" />
                                            </NavLink>
                                            <div className="product-info-cart">
                                                <a className="addcart-link" onClick={() => this.addToCart(product.id)}><i className="fa fa-shopping-basket"></i> Add to Cart</a>
                                                {this.state.alert}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hot-deal-product-info">
                                        <h3 className="title-product"><NavLink to={`/product-view/${product.id}`}>{product.name}</NavLink></h3>
                                        <div className="info-price">
                                            <span>{product.discount != 0 && product.discount != '' ? "Rs. " + (new Intl.NumberFormat().format(product.price - (product.price * product.discount / 100))) : "Rs. " + new Intl.NumberFormat().format((product.price))}</span>
                                            <del>{product.discount != 0 && product.discount != '' && "Rs. " + (new Intl.NumberFormat().format(product.price))}</del>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        );
                    }, this);
                return (
                    <div className="product-box18">

                        <div className="row">

                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="hot-deal-tab-slider">
                                    <div className="hot-deal-tab-title">
                                        <label>{feedData.cat_name}</label>
                                    </div>
                                    <div className="tab-content">
                                        <div className="">
                                            <div className="hot-deal-slider slider-home2">
                                                <div className="wrap-item" data-navigation="true" data-pagination="false" data-itemscustom="[[0,1],[480,2],[768,3],[980,4],[1200,4]]">
                                                    <OwlCarousel items={4} margin={0} autoplay={false} nav dots={false} responsive={this.state.responsive}>
                                                        {Products}

                                                    </OwlCarousel>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item-adv-simple">
                                    <NavLink className="addcart-link" to={location} ><img alt="" src={`upload/category/banner/${feedData.cat_banner}`} /></NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }, this);


        return (
            <div className="hot-deal-box content-product18">
                <div className="container">
                    <div className="popcat-list-box">
                        <h2 className="h2-gray"><span>popular categories</span></h2>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {Categories}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Popular_Categories;