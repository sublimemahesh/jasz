import React, { Component } from 'react';
import { PostData } from '../../services/PostData';
import Main_Banner from './Main_Banner/Main_Banner';
import Testimonial from './Testimonial/Testimonial';
import Brands_Carousel from './Brands_Carousel/Brands_Carousel';
import Best_Deal from './Best_Deal/Best_Deal';
import Popular_Categories from './Popular_Categories/Popular_Categories';
import Category_Side_Bar from './Category_Side_Bar/Category_Side_Bar';
import Category_Side_Bar_sm from './Category_Side_Bar/Category_Side_Bar_sm';
import Privacy_Shipping from './Privacy_Shipping/Privacy_Shipping';
import Order_Details from './Order_Details/Order_Details';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Featured_Product from './Featured_Product/Featured_Product';


class Home_Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            feedback: [],
            brands: [],
            bestDealProducts: [],
            productsByCategories: [],
            mainBanner: [],
            featuredProducts: [],
        };

        this.getCategories = this.getCategories.bind(this);
        this.getFeaturedProducts = this.getFeaturedProducts.bind(this);
        this.getFeedBacks = this.getFeedBacks.bind(this);
        this.getBrands = this.getBrands.bind(this);
        this.getBestDealProducts = this.getBestDealProducts.bind(this);
        this.getBanners = this.getBanners.bind(this);
    }
    componentWillMount() {
        this.getCategories();
        this.getFeaturedProducts();
        this.getFeedBacks();
        this.getBrands();
        this.getBestDealProducts();
        this.getProductsByCategories();
        this.getBanners();
    }
    getCategories() {
        PostData('category-and-subcategory').then((result) => {
            let responseJson = result;

            if (responseJson.feedData) {
                this.setState({ category: responseJson.feedData });
            }
        });
    }
    getFeaturedProducts() {
        PostData('featured-products').then((result5) => {
            let responseJson = result5;

            if (responseJson.feedData) {
                this.setState({ featuredProducts: responseJson.feedData });
            }
        });
    }
    getFeedBacks() {
        PostData('feedback').then((result1) => {
            let responseJson1 = result1;

            if (responseJson1.feedData) {
                this.setState({ feedback: responseJson1.feedData });
            }
        });
    }
    getBrands() {
        PostData('brand').then((result2) => {
            let responseJson2 = result2;

            if (responseJson2.feedData) {
                this.setState({ brands: responseJson2.feedData });
            }
        });
    }
    getBestDealProducts() {
        PostData('best-deal-product').then((result3) => {
            let responseJson3 = result3;
            if (responseJson3.feedData) {
                this.setState({ bestDealProducts: responseJson3.feedData });
            }
        });
    }
    getProductsByCategories() {
        PostData('products-by-categories').then((result4) => {
            let responseJson4 = result4;
            if (responseJson4.feedData) {
                this.setState({ productsByCategories: responseJson4.feedData });
            }
        });
    }
    getBanners() {
        PostData('main-banners').then((result) => {
            let responseJson = result;

            if (responseJson.feedData) {
                this.setState({ mainBanner: responseJson.feedData });
            }
        });
    }

    render() {
        return (<
            div className="" >
            <
                Header />
            <
            div id="content" >
                <
            div className="container" >
                    <
            div className="row" >
                        <
                            Category_Side_Bar feedData={this.state.category}
                        /> <
                            Main_Banner feedData={this.state.mainBanner}
                        /> <
                            Category_Side_Bar_sm feedData={this.state.category}
                        /> <
                            Featured_Product feedData={this.state.featuredProducts}
                        />

                        <
            /div> <
                            Privacy_Shipping />
                        <
            /div> <
                            Brands_Carousel feedData={this.state.brands}
                        /> <
                            Best_Deal feedData={this.state.bestDealProducts}
                        /> <
                            Popular_Categories feedData={this.state.productsByCategories}
                        /> <
                            Testimonial feedData={this.state.feedback}
                        /> <
                            Order_Details />
                        <
            /div> <
                            Footer />
                        <
            /div>
        );
    }
}
export default Home_Content;