import React, { Component } from 'react';
import {PostData} from '../../services/PostData';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class Brand extends Component {

    constructor(props) {
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
            let responseJson4 = result4;
            if (responseJson4.feedData) {
                this.setState({brands: responseJson4.feedData});
            }
        });
    }

    render() {
        let Brand_List = this.state.brands
                .map(function (brand, index) {
                    const location = {
                      pathname: '/products',
                      state: { brand: brand.id }
                    }
                    return (
                            <div className="col-md-3 col-sm-4 col-xs-12">
						<div className="item-product">
							<div className="product-thumb">
								<Link className="product-thumb-link" to={location} >
									<img src={`upload/brand/${brand.image_name}`} alt="" className="first-thumb" />
									<img src={`upload/brand/${brand.image_name}`} alt="" className="second-thumb" />
								</Link>
								<div className="product-info-cart">
									<Link className="addcart-link" to={location} >View Products</Link>

                        </div>
							</div>
							<div className="product-info">
								<h3 className="title-product"><Link to={location} >{brand.name} </Link></h3>
							</div>
						</div>
					</div>

                            )
                }, this);
        return (
                <div className="">
                    <Header />
                    <section id="subheader">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 ">
                                    <div className="col-md-6 div-big-heading">
                                        <h1 className="big-heading">
                                            Brands
                                        </h1>
                                    </div>
                                    <div className="col-md-6 div-p">
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
                                <div className="list-product-new list-brand">
				<div className="row">
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