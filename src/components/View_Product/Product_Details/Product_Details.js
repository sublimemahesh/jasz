import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import $ from 'jquery';
import Swal from 'sweetalert2';
import NumericInput from 'react-numeric-input';
// import ReactImageMagnify from 'react-image-magnify';
import SliderImage from 'react-zoom-slider';

class Product_Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productID: '',
            discount: '',
            qty: 1
        };
        this.addToCart = this.addToCart.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            productID: nextProps.feedData.id,
            discount: nextProps.feedData.discount
        });
        console.log(`123 `, this.state);
    }
    addToCart() {

        let items = sessionStorage.getItem("cart");
        let arr = [];

        if (items === '' || items === null) {

            let arr = [{ id: this.state.productID, qty: this.state.qty }];
            sessionStorage.setItem("cart", JSON.stringify(arr));

            let count = $('#header-cart').attr('items');
            let new_item_count = parseInt(count) + 1;
            sessionStorage.setItem("cart_count", new_item_count);
            $('#header-cart').attr('items', new_item_count);
            $('#header-cart').text(new_item_count);

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: 'Product is successfully added to the cart.',
                showConfirmButton: false,
                timer: 1500
            })

        } else {
            let cart = [];
            cart = JSON.parse(sessionStorage.getItem("cart"));

            let products = cart.some(item => item.id === this.state.productID);
            if (products) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    text: 'Product is already exsit in the cart',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                let arr = { id: this.state.productID, qty: this.state.qty };
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
    updateState = (new_qty) => {
        this.setState({ qty: new_qty });
    }
    render() {

        const data = this.props.photos && this.props.photos
            .map((photo, index) => ({
                image: "../upload/product/gallery/" + photo.image_name
            }));
        return (

            <div className="view-product col-md-9 col-sm-12 col-xs-12">
                <div className="main-content-shop">
                    <div className="main-detail">
                        <div className="row">
                            <div className="col-md-8 col-xs-12">
                                <div className="detail-gallery">
                                    {
                                        data.length &&
                                        <SliderImage
                                            data={data}
                                            width="100%"
                                            showDescription={true}
                                            direction="right"
                                        />
                                    }

                                </div>
                            </div>
                            <div className="col-md-4 col-xs-12">
                                <div className="detail-info">
                                    <div className="product-code">
                                        Category: <label>{this.props.category}</label>
                                    </div>
                                    <div className="product-code">
                                        Sub Category: <label>{this.props.subcategory}</label>
                                    </div>
                                    <div className="product-code">
                                        Brand: <label>{this.props.brand}</label>
                                    </div>
                                    <div className="info-price info-price-detail">
                                        <label>Price:</label> <span>{this.state.discount != 0 && this.state.discount != '' ? "Rs. " + (new Intl.NumberFormat().format(this.props.feedData.price - (this.props.feedData.price * this.state.discount / 100))) : "Rs. " + new Intl.NumberFormat().format((this.props.feedData.price))}</span>
                                        <del>
                                            {this.state.discount != 0 && this.state.discount != '' && "Rs. " + (new Intl.NumberFormat().format(this.props.feedData.price))}
                                        </del>
                                    </div>
                                    <div className="attr-info">
                                        <div className="attr-product">
                                            {/* <label>Qty</label> */}
                                            <div className="info-qty">
                                                <NumericInput min={1} max={10} value={this.state.qty} onChange={value => this.updateState(value)} mobile />
                                            </div>
                                        </div>
                                        <div className="addcart-link add_to_cart" onClick={this.addToCart}><i className="fa fa-shopping-cart"></i> Add to Cart</div>{this.state.alert}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="tab-detail">
                                <div className="title-tab-detail">
                                    <Tab><a className="active">Overview </a></Tab>
                                </div>
                                <div className="content-tab-detail">
                                    <div role="tabpanel" className="tab-pane active" id="details">
                                        <div className="table-content-tab-detail">
                                            <div className="info-table-detail">
                                                <p dangerouslySetInnerHTML={{ __html: this.props.feedData.description }} />
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
export default Product_Details;