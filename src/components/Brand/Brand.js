import React, { Component } from 'react';
import {PostData} from '../../services/PostData';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class Brand extends Component {

    constructor(props) {

        console.log(props);
        super(props);
        this.state = {
            brands: []
        };
        this.getBrands = this.getBrands.bind(this);
    }

    componentWillMount() {
        this.getBrands();
    }
    getBrands() {
        PostData('brand').then((result4) => {
            console.log(result4);
            let responseJson4 = result4;
            if (responseJson4.feedData) {
                this.setState({brands: responseJson4.feedData});
            }
        });
    }

    render() {
        let Brand_List = this.state.brands
                .map(function (brand, index) {
                    console.log(brand);
                    const location = {
                      pathname: '/products',
                      state: { brand: brand.id }
                    }
                    return (
                            <div class="col-md-3 col-sm-4 col-xs-12">
						<div class="item-product">
							<div class="product-thumb">
								<Link class="product-thumb-link" to={location} >
									<img src={`upload/brand/${brand.image_name}`} alt="" class="first-thumb" />
									<img src={`upload/brand/${brand.image_name}`} alt="" class="second-thumb" />
								</Link>
								<div class="product-info-cart">
									<Link class="addcart-link" to={location} >View Products</Link>

                        </div>
							</div>
							<div class="product-info">
								<h3 class="title-product"><Link to={location} >{brand.name} </Link></h3>
							</div>
						</div>
					</div>

                            )
                }, this);
        return (
                <div className="">
                    <Header />
                    <section id="subheader">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12 ">
                                    <div class="col-md-6 div-big-heading">
                                        <h1 class="big-heading">
                                            Brands
                                        </h1>
                                    </div>
                                    <div class="col-md-6 div-p">
                                        <p><a href="./">Home</a> | Brands</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                <div id="content">
                    <div className="content-shop">
                        <div className="container">

                            <div className="row">
                                <div class="list-product-new list-brand">
				<div class="row">
                                {Brand_List}
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
        export default Brand;