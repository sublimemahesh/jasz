import React, { Component } from 'react';
import { PostData } from '../../services/PostData';
import Product_List from './Product_List/Product_List';
import Select from 'react-select/creatable';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import '../../styles/search-box.css';

class Products extends Component {

    constructor(props) {

        // console.log(`pr: `, props);
        super(props);
        let brand = '';
        let category = '';
        let subcategory = '';
        if (props.location.state != undefined) {
            if (this.props.location.state.brand) {
                brand = this.props.location.state.brand;
            }
            if (this.props.location.state.category) {
                category = this.props.location.state.category;
            }
            if (this.props.location.state.subcategory) {
                subcategory = this.props.location.state.subcategory;
            }
        }
        this.state = {
            products: [],
            productsByCategories: [],
            category: [],
            brands: [],
            brand: brand,
            category1: category,
            subcategory: subcategory,
            selectedOption: { value: "0", label: "Select Category" },
            selectedOption1: { value: "0", label: "Select Brand" },
            filter: {
                categoryID: '',
                brandID: '',
                keyword: ''
            },
            brandDetails: [],
            categoryDetails: [],
            subCategoryDetails: []


        };
        // console.log(`1234: `, this.state.brand);
        this.getAllProducts = this.getAllProducts.bind(this);
        this.getProductsByCategories = this.getProductsByCategories.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.getBrands = this.getBrands.bind(this);
        this.getProductsByBrand = this.getProductsByBrand.bind(this);
        this.getProductsByCategory = this.getProductsByCategory.bind(this);
        this.getProductsBySubCategory = this.getProductsBySubCategory.bind(this);
        this.getBrandDetails = this.getBrandDetails.bind(this);
        this.getCategoryDetails = this.getCategoryDetails.bind(this);
        this.getSubCategoryDetails = this.getSubCategoryDetails.bind(this);
    }

    componentWillMount() {

        this.getAllProducts();
        this.getCategories();
        this.getBrands();
    }
    componentDidMount() {

        if (this.props.location.state != undefined) {


            if (this.props.location.state.brand) {
                this.setState({ brand: this.props.location.state.brand });
                this.getProductsByBrand();
                this.getBrandDetails();
            }
            if (this.props.location.state.category) {
                this.setState({ category1: this.props.location.state.category });
                this.getProductsByCategory();
                this.getCategoryDetails();
            }
            if (this.props.location.state.subcategory) {
                this.setState({ subcategory: this.props.location.state.subcategory });
                this.getProductsBySubCategory();
                this.getSubCategoryDetails();
            }
        }
    }

    getAllProducts() {
        PostData('products').then((result) => {
            let responseJson = result;
            if (responseJson.feedData) {
                this.setState({ products: responseJson.feedData });
            }
        });
    }
    getProductsByCategories() {
        // console.log(this.state.filter);
        PostData('products-by-category', this.state.filter).then((result2) => {
            let responseJson2 = result2;
            if (responseJson2.feedData) {
                this.setState({ products: responseJson2.feedData });
                this.setState({ category1: this.state.filter.categoryID });
                this.setState({ brand: this.state.filter.brandID });
                this.getCategoryDetails();
                this.getBrandDetails();
            }
        });
    }
    getProductsByBrand() {
        // console.log(`this.state.brand: `, this.state.brand);
        PostData('products-by-brand', this.state.brand).then((result5) => {
            console.log(result5);
            let responseJson5 = result5;
            if (responseJson5.feedData) {
                // console.log(`responseJson5.feedData : `, responseJson5.feedData);

                this.setState({ products: responseJson5.feedData });
            }
        });
    }
    getProductsByCategory() {
        PostData('products-by-one-category', this.state.category1).then((result6) => {
            // console.log(result6);
            let responseJson6 = result6;
            if (responseJson6.feedData) {
                // console.log(`responseJson6.feedData : `, responseJson6.feedData);

                this.setState({ products: responseJson6.feedData });
            }
        });
    }
    getProductsBySubCategory() {
        PostData('products-by-sub-category', this.state.subcategory).then((result7) => {
            // console.log(result7);
            let responseJson7 = result7;
            if (responseJson7.feedData) {
                // console.log(`responseJson7.feedData : `, responseJson7.feedData);

                this.setState({ products: responseJson7.feedData });
            }
        });
    }
    getCategories() {
        PostData('category').then((result3) => {
            // console.log(result3);
            let responseJson3 = result3;
            if (responseJson3.feedData) {
                this.setState({ category: responseJson3.feedData });
            }
        });
    }
    getBrands() {
        PostData('brand').then((result4) => {
            // console.log(result4);
            let responseJson4 = result4;
            if (responseJson4.feedData) {
                this.setState({ brands: responseJson4.feedData });
            }
        });
    }

    getBrandDetails() {
        PostData('brand-details-by-id', this.state.brand).then((result4) => {
            let responseJson4 = result4;
            if (responseJson4.feedData) {
                this.setState({ brandDetails: responseJson4.feedData });
            }
        });
    }
    getCategoryDetails() {
        PostData('category-details-by-id', this.state.category1).then((result4) => {
            // console.log(result4);
            let responseJson4 = result4;
            if (responseJson4.feedData) {
                this.setState({ categoryDetails: responseJson4.feedData });
            }
        });
    }
    getSubCategoryDetails() {
        PostData('sub-category-details-by-id', this.state.subcategory).then((result4) => {
            // console.log(result4);
            let responseJson4 = result4;
            if (responseJson4.feedData) {
                this.setState({
                    subCategoryDetails: responseJson4.feedData
                });
            }
        });
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });

        this.setState(prevState => {
            let filter = { ...prevState.filter };
            filter.categoryID = selectedOption.value;
            return { filter };
        });


    }
    handleChange1 = selectedOption1 => {
        this.setState({ selectedOption1 });
        this.setState(prevState => {
            let filter = { ...prevState.filter };
            filter.brandID = selectedOption1.value;
            return { filter };
        })


    }
    handleKeyUp = keyword => {
        let newSearchText = keyword.target.value;
        this.setState(prevState => {
            let filter = { ...prevState.filter };
            filter.keyword = newSearchText;
            return { filter };
        });
    }
    render() {
        // console.log(`123: `, this.state.categoryDetails);
        let options = this.state.category

            .map(function (category, index) {
                // category.id === this.state.category && this.setState({...this.state, selectedOption: {value: category.id}});

                return (
                    { value: category.id, label: category.name }
                )
            }, this);
        let options1 = this.state.brands
            .map(function (brand, index) {
                // brand.id === this.state.brand && this.setState({...this.state, selectedOption1: {value: brand.id}});
                return (
                    { value: brand.id, label: brand.name }
                )
            }, this);
            console.log("selectedOption1: ", selectedOption1);
        const { selectedOption } = this.state;
        const { selectedOption1 } = this.state;
        return (
            <div className="">
                <Header />
                <section id="subheader">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 ">
                                <div className="col-md-6 div-big-heading">
                                    <h1 className="big-heading">
                                        Products
                                        </h1>
                                </div>
                                <div className="col-md-6 div-p">
                                    {(() => {

                                        if (this.state.category1 != '' && this.state.brand != '') {
                                            return (
                                                <p><a href="/home">Home</a> | <a href="/products">Products</a> | {this.state.categoryDetails.name} | {this.state.brandDetails.name}</p>
                                            )
                                        } else if (this.state.category1 != '') {
                                            return (
                                                <p><a href="/home">Home</a> | <a href="/products">Products</a> | {this.state.categoryDetails.name}</p>
                                            )
                                        } else if (this.state.subcategory != '') {
                                            return (
                                                <p><a href="/home">Home</a> | <a href="/products">Products</a> | {this.state.subCategoryDetails.name}</p>
                                            )
                                        } else if (this.state.brand != '') {
                                            return (
                                                <p><a href="/home">Home</a> | <a href="/products">Products</a> | {this.state.brandDetails.name}</p>
                                            )
                                        } else {
                                            return (
                                                <p><a href="/home">Home</a> | All Products</p>
                                            )
                                        }
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div id="content">
                    <div className="">
                        <div className="product-search col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
                            <div className="s002">
                                <form action="/products">
                                <div className="outer-form">
                                    <div className="inner-form">
                                        
                                            <div className="input-field fouth-wrap">
                                                <div className="">

                                                    <Select
                                                        value={selectedOption}
                                                        onChange={this.handleChange}
                                                        options={options}
                                                        defaultValue={{ label: "Select Category", value: 0 }}
                                                    />

                                                </div>
                                            </div>
                                            <div className="input-field second-wrap">
                                                <div className="">

                                                    <Select

                                                        value={selectedOption1}
                                                        onChange={this.handleChange1}
                                                        options={options1}
                                                        defaultValue={{ label: "Select Brand", value: 0 }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="input-field first-wrap">
                                                <div className="icon-wrap iw-2">
                                                    <svg className="svg-inline--fa fa-search fa-w-16" aria-hidden="true" data-prefix="fa" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                                                </div>
                                                <input type="hidden" name="category" value={selectedOption.value} />
                                                <input type="hidden" name="brand" value={selectedOption1.value} />
                                                <input id="search" type="text" name="search" placeholder="What are you looking for?" onKeyUp={this.handleKeyUp} />
                                            </div>
                                            <div className="input-field fifth-wrap">
                                                <button className="btn-search" type="button" onClick={this.getProductsByCategories}>SEARCH</button>

                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                    <div className="content-shop products-page">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="main-content-shop">
                                        <div className="upsell-detail">
                                            <div className="upsell-detail-slider">
                                                <Product_List feedData={this.state.products} />
                                            </div>
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
export default Products;