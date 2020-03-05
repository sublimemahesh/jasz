import React, { Component } from 'react';
import {PostData} from '../../services/PostData';
import Other_Offers from './Other_Offers/Other_Offers';
import Offer_Details from './Offer_Details/Offer_Details';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


class View_Offer extends Component {

     constructor(props) {
        super(props);
        this.state = {
            offer: props.match.params.offer,
            offerDetails: [],
            otherOffers: []
        };


        this.getOfferDetails = this.getOfferDetails.bind(this);
        this.getAllOffers = this.getAllOffers.bind(this);
    }

    componentWillMount() {
        this.getOfferDetails();
        this.getAllOffers();
    }
    getAllOffers() {
        PostData('offer').then((result) => {
            let responseJson = result;

            if (responseJson.feedData) {
                this.setState({otherOffers: responseJson.feedData});
            }
        });
    }
    getOfferDetails() {
        PostData('offer-details', this.state.offer).then((result1) => {
            let responseJson1 = result1;
            if (responseJson1.feedData) {
                this.setState({offerDetails: responseJson1.feedData});
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
                <div className="content-shop">
                    <div className="container">
                        <div className="row">
                            <Offer_Details  feedData = {this.state.offerDetails} />
                            <Other_Offers  feedData = {this.state.otherOffers}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            </div>
                );
    }
}
export default View_Offer;