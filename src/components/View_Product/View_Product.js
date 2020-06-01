import React, { Component } from 'react';
import {PostData} from '../../services/PostData';
import Other_Products from './Other_Products/Other_Products';
import Product_Details from './Product_Details/Product_Details';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


class View_Product extends Component {

     constructor(props) {
        super(props);
        this.state = {
            product: props.match.params.product,
            category: '',
            productDetails: [],
            productPhotos: [],
            otherProducts: []
        };

        this.getProductDetails = this.getProductDetails.bind(this);
        this.getProductPhotos = this.getProductPhotos.bind(this);
        this.getProductsByCategoryForOthers = this.getProductsByCategoryForOthers.bind(this);
    }

    componentWillMount() {
        this.getProductDetails();
        this.getProductPhotos();

    }
    getProductDetails() {
        PostData('product-details', this.state.product).then((result1) => {
            let responseJson1 = result1;
            if (responseJson1.feedData) {
                this.setState({
                    productDetails: responseJson1.feedData,
                    category: responseJson1.feedData.category
                });
                this.getProductsByCategoryForOthers(responseJson1.feedData.category);
            }
        });

    }
    getProductPhotos() {

        PostData('product-photos', this.state.product).then((result1) => {
            let responseJson1 = result1;
            if (responseJson1.feedData) {
                this.setState({productPhotos: responseJson1.feedData});
            }
        });
    }
    getProductsByCategoryForOthers(id) {
        const data = {
            product: this.state.product,
            category: this.state.category
        }
        PostData('random-products-by-one-category', data).then((result2) => {
            let responseJson2 = result2;
            if (responseJson2.feedData) {
                this.setState({otherProducts: responseJson2.feedData});
            }
        });
    }

    render() {
        return (
                <div className="">
                    <Header />
                    <section id="subheader">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12 ">
                                    <div class="col-md-6 div-big-heading">
                                        <h1 class="big-heading">
                                            Products
                                        </h1>
                                    </div>
                                    <div class="col-md-6 div-p">
                                        <p><a href="./">Home</a> | Products</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                <div id="content">
                <div class="content-shop">
                    <div class="container">
                        <div class="row">
                            <Product_Details  feedData = {this.state.productDetails} photos = {this.state.productPhotos} />
                            <Other_Products  feedData = {this.state.otherProducts}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            </div>
                );
    }
}
export default View_Product;