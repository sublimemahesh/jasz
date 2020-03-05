import React, { Component } from 'react';
import {PostData} from '../../services/PostData';
import Moment from 'moment';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

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
    getOffers()  {
        PostData('offer').then((result) => {
            console.log(result);
            let responseJson = result;

            if (responseJson.feedData) {
                this.setState({offer: responseJson.feedData});
            }
        });
    }
    render() {
        Moment.locale('en');
        let Offer_List = this.state.offer
                .map(function (offer, index) {
                    var date = offer.created_at;
                    return (
                            <div class="item-post-blog">
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 col-ms-12">
                                        <div class="blog-post-thumb">
                                            <div class="post-info-extra">
                                                    <div class="post-date"><strong>{Moment(date).format('D')}</strong><span>{Moment(date).format('MMM, Y')}</span></div>
                                            </div>
                                            <div class="zoom-image-thumb">
                                                    <a href={`/offer-view/${offer.id}`}><img src={`upload/offer/${offer.image_name}`} alt="" /></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6 col-ms-12">
                                        <div class="blog-post-info">
                                            <h3 class="post-title"><a href="#">{offer.title}{offer.created_at}</a></h3>
                                            <ul class="post-date-author">
                                                    <li>Rs. <a href="#">{offer.price}</a></li>
                                                    <li><a href="#comment">Discount: {offer.discount}%</a></li>
                                            </ul>
                                            <p class="desc">{offer.short_description.substring(0, 250)}...</p>
                                            <a href={`/offer-view/${offer.id}`} class="post-readmore">Read More</a>
                                        </div>
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
                                            Offers
                                        </h1>
                                    </div>
                                    <div class="col-md-6 div-p">
                                        <p><a href="./">Home</a> | Offers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                <div id="content">
                    <div class="content-page">
			<div class="container">
				<div class="row">

					<div class="col-md-9 col-sm-8 col-sm-12">
						<div class="blog-list-post order-post">
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