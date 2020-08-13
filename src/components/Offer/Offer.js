import React, { Component } from 'react';
import { PostData } from '../../services/PostData';
import Moment from 'moment';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { NavLink } from 'react-router-dom';

class Offer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offer: [],
        };
        this.getOffers = this.getOffers.bind(this);
    }

    componentWillMount() {
        this.getOffers();
    }
    getOffers() {
        PostData('offer').then((result) => {
            let responseJson = result;

            if (responseJson.feedData) {
                this.setState({ offer: responseJson.feedData });
            }
        });
    }
    render() {
        Moment.locale('en');
        let Offer_List = '';
        if (this.state.offer.length) {
            Offer_List = this.state.offer
                .map(function (offer, index) {
                    var date = offer.created_at;
                    return (
                        <div className="item-post-blog">
                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-ms-12">
                                    <div className="blog-post-thumb">
                                        <div className="post-info-extra">
                                            <div className="post-date"><strong>{Moment(date).format('D')}</strong><span>{Moment(date).format('MMM, Y')}</span></div>
                                        </div>
                                        <div className="zoom-image-thumb">
                                            <NavLink to={`/offer-view/${offer.id}`}><img src={`upload/offer/${offer.image_name}`} alt="" /></NavLink>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-ms-12">
                                    <div className="blog-post-info">
                                        <h3 className="post-title"><NavLink to={`/offer-view/${offer.id}`}>{offer.title}</NavLink></h3>
                                        <ul className="post-date-author">
                                            <li>Rs: <a href="#">{offer.discount != 0 && offer.discount != '' ? (new Intl.NumberFormat().format(offer.price - (offer.price * offer.discount / 100))) : new Intl.NumberFormat().format((offer.price))}</a></li>
                                            <li> <del>Rs: <a href="#">{offer.discount != 0 && offer.discount != '' && (new Intl.NumberFormat().format(offer.price))}</a></del></li>
                                            <li><a href="#comment">Discount: {offer.discount}%</a></li>
                                            {/* <li><a href="#comment">{offer.created_at}</a></li> */}
                                        </ul>
                                        <p className="desc hidden-sm">{offer.short_description.substring(0, 250)}...</p>
                                        <p className="desc visible-sm">{offer.short_description.substring(0, 150)}...</p>
                                        <NavLink to={`/offer-view/${offer.id}`} className="post-readmore">Read More</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                }, this);
        } else {
            Offer_List = "Search result is empty.";
        }
        return (
            <div className="">
                <Header />
                <section id="subheader">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 ">
                                <div className="col-md-6 div-big-heading">
                                    <h1 className="big-heading">
                                        Offers
                                        </h1>
                                </div>
                                <div className="col-md-6 div-p">
                                    <p><a href="./">Home</a> | Offers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div id="content" className="offer-page">
                    <div className="content-page">
                        <div className="container">
                            <div className="row">

                                <div className="col-md-9 col-sm-12 col-sm-12">
                                    <div className="blog-list-post order-post">
                                        {Offer_List}
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
export default Offer;