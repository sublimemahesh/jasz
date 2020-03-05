import React, { Component } from 'react';
import {PostData} from '../../services/PostData';
import Main_Banner from './Main_Banner/Main_Banner';
import Testimonial from './Testimonial/Testimonial';
import Brands_Carousel from './Brands_Carousel/Brands_Carousel';
import Best_Deal from './Best_Deal/Best_Deal';
import Popular_Categories from './Popular_Categories/Popular_Categories';
import Category_Side_Bar from './Category_Side_Bar/Category_Side_Bar';
import Privacy_Shipping from './Privacy_Shipping/Privacy_Shipping';
import Order_Details from './Order_Details/Order_Details';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


class Home_Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            feedback: [],
            brands: [],
            bestDealProducts: [],
            productsByCategories: [],
        };

        this.getCategories = this.getCategories.bind(this);
        this.getFeedBacks = this.getFeedBacks.bind(this);
        this.getBrands = this.getBrands.bind(this);
        this.getBestDealProducts = this.getBestDealProducts.bind(this);
    }
    componentWillMount() {
        this.getCategories();
        this.getFeedBacks();
        this.getBrands();
        this.getBestDealProducts();
        this.getProductsByCategories();
    }
    getCategories() {
        PostData('category-and-subcategory').then((result) => {
            console.log(result);
            let responseJson = result;

            if (responseJson.feedData) {
                this.setState({category: responseJson.feedData});
            }
        });
    }
    getFeedBacks() {
        PostData('feedback').then((result1) => {
            console.log(result1);
            let responseJson1 = result1;

            if (responseJson1.feedData) {
                this.setState({feedback: responseJson1.feedData});
            }
        });
    }
    getBrands() {
        PostData('brand').then((result2) => {
            console.log(result2);
            let responseJson2 = result2;

            if (responseJson2.feedData) {
                this.setState({brands: responseJson2.feedData});
            }
        });
    }
    getBestDealProducts() {
        PostData('best-deal-product').then((result3) => {
            console.log(result3);
            let responseJson3 = result3;
            if (responseJson3.feedData) {
                this.setState({bestDealProducts: responseJson3.feedData});
            }
        });
    }
    getProductsByCategories() {
        PostData('products-by-categories').then((result4) => {
            console.log(result4);
            let responseJson4 = result4;
            if (responseJson4.feedData) {
                this.setState({productsByCategories: responseJson4.feedData});
            }
        });
    }

    render() {
        return (
                <div className="">
                    <Header />
                    <div id="content">
                        <div className="container">
                            <div className="row">
                                <Category_Side_Bar feedData = {this.state.category}/>
                                <Main_Banner />
                                <Testimonial feedData = {this.state.feedback}/>
                            </div>
                            <Privacy_Shipping />
                        </div>
                        <Brands_Carousel feedData = {this.state.brands} />
                        <Best_Deal feedData = {this.state.bestDealProducts} />
                        <Popular_Categories feedData = {this.state.productsByCategories} />
                        <Order_Details />
                    </div>
                    <Footer />
            </div>
                );
    }
}
export default Home_Content;