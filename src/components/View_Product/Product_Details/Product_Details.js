import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import $ from 'jquery';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';

const SweetAlert = withSwalInstance(swal);

class Product_Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productID: '',
            alert: null
        };
        this.addToCart = this.addToCart.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({ productID: nextProps.feedData.id });
        console.log(`123 `,this.state);
    }
    addToCart()  {

        let items = sessionStorage.getItem("cart");
        let arr = [];

        if(items === '' || items === null) {

            arr =  this.state.productID;
            sessionStorage.setItem("cart", arr);
            let count = $('#header-cart').attr('items');
            let new_item_count = parseInt(count) + 1;
            sessionStorage.setItem("cart_count", new_item_count);
            $('#header-cart').attr('items', new_item_count);
            $('#header-cart').text(new_item_count);

            const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Success"
                        text="product is successfully added to the cart"
                        type= "success"
                      />
                );
                this.setState({
                     alert: getAlert()
                 });

        } else {
            let cart_array = items.split(',');
            if(cart_array.includes(this.state.productID)) {
               const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="product is already exsit in the cart"
                        type= "error"
                      />
               );
               this.setState({
                    alert: getAlert()
                });

            } else {
                arr =  items.concat(',', this.state.productID);
                sessionStorage.setItem("cart", arr);
                let count = $('#header-cart').attr('items');
                let new_item_count = parseInt(count) + 1;
                sessionStorage.setItem("cart_count", new_item_count);
                $('#header-cart').attr('items', new_item_count);
                $('#header-cart').text(new_item_count);
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Success"
                        text="product is successfully added to the cart"
                        type= "success"
                      />
                );
                this.setState({
                     alert: getAlert()
                 });
            }
        }


    }

    render() {
                let Photos = this.props.photos
                .map(function (photo, index) {
                    return (
                            {original: "../upload/product/gallery/" + photo.image_name, thumbnail: "../upload/product/gallery/thumb/" + photo.image_name}
                    )
                }, this);

        return (
                <div className="view-product col-md-9 col-sm-12 col-xs-12">
                                <div className="main-content-shop">
                                    <div className="main-detail">
                                        <div className="row">
                                            <div className="col-md-5 col-xs-12">
                                                <div className="detail-gallery">
                                                    <ImageGallery items={Photos} showNav={false} showFullscreenButton={false} showPlayButton={false}/>
                                                </div>
                                            </div>
                                            <div className="col-md-7 col-xs-12">
                                                <div className="detail-info">
                                                    <h2 className="title-detail">{this.props.feedData.name}</h2>

                                                    <div className="info-price info-price-detail">
                                                        <label>Price:</label> <span>Rs. {this.props.feedData.price}</span><del>Rs. {this.props.feedData.price}</del>
                                                    </div>
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
                                                    <div className="attr-info">
                                                        <a className="addcart-link" onClick={this.addToCart}><i className="fa fa-shopping-cart"></i> Add to Cart</a>{this.state.alert}
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