import React, { Component } from 'react';
import { PostData } from '../../services/PostData';
import Other_Products from './Other_Products/Other_Products';
import Product_Details from './Product_Details/Product_Details';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


class View_Product extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            product: props.match.params.product,
            category: '',
            productDetails: [],
            productPhotos: [],
            otherProducts: [],
            categoryDetails: [],
            subCategoryDetails: [],
            brandDetails: []
        };

        this.getProductDetails = this.getProductDetails.bind(this);
        this.getProductPhotos = this.getProductPhotos.bind(this);
        this.getProductsByCategoryForOthers = this.getProductsByCategoryForOthers.bind(this);
        this.getCategoryDetails = this.getCategoryDetails.bind(this);
        this.getSubCategoryDetails = this.getSubCategoryDetails.bind(this);
        this.getBrandDetails = this.getBrandDetails.bind(this);
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
                this.getCategoryDetails(responseJson1.feedData.category);
                this.getSubCategoryDetails(responseJson1.feedData.sub_category);
                this.getBrandDetails(responseJson1.feedData.brand);
                // this.props.history.push('/product-view/' + responseJson1.feedData.id + '/'+ responseJson1.feedData.name);
            }
        });

    }
    getProductPhotos() {

        PostData('product-photos', this.state.product).then((result1) => {
            let responseJson1 = result1;
            if (responseJson1.feedData) {
                this.setState({ productPhotos: responseJson1.feedData });
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
                this.setState({ otherProducts: responseJson2.feedData });
            }
        });
    }
    getCategoryDetails(id) {
        PostData('category-details-by-id', id).then((result3) => {
            console.log(result3);
            let responseJson3 = result3;
            if (responseJson3.feedData) {
                this.setState({ categoryDetails: responseJson3.feedData });
            }
        });
    }
    getSubCategoryDetails(id) {
        PostData('sub-category-details-by-id', id).then((result4) => {
            console.log(result4);
            let responseJson4 = result4;
            if (responseJson4.feedData) {
                this.setState({ subCategoryDetails: responseJson4.feedData });
            }
        });
    }
    getBrandDetails(id) {
        PostData('brand-details-by-id', id).then((result5) => {
            console.log(result5);
            let responseJson5 = result5;
            if (responseJson5.feedData) {
                this.setState({ brandDetails: responseJson5.feedData });
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
                                        {this.state.productDetails.name}
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
                                {
                                    this.state.productPhotos &&
                                    <Product_Details feedData={this.state.productDetails} photos={this.state.productPhotos} category={this.state.categoryDetails.name} subcategory={this.state.subCategoryDetails.name} brand={this.state.brandDetails.name} />
                                }
                                
                                <Other_Products feedData={this.state.otherProducts} />
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