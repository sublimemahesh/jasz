import React, { Component } from 'react';
import Moment from 'moment';

class Offer_Details extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        Moment.locale('en');

        return (
                <div className="col-md-9 col-sm-8 col-sm-12">
                    <div className="main-single-post">
                        <div className="single-post-leading">
                                <div className="zoom-image-thumb">
                                        <a href="#"><img src={`../upload/offer/${this.props.feedData.image_name}`} alt="" /></a>
                                </div>
                                <h2>{this.props.feedData.title}</h2>
                                <ul className="post-date-author">
                                        <li>{Moment(this.props.feedData.created_at).format('MMMM D, Y')}</li>
                                        <li>Rs: <a href="#">{this.props.feedData.price}</a></li>
                                        <li>Discount: <a href="#comment">{this.props.feedData.discount}%</a></li>
                                </ul>
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: this.props.feedData.description }} />
                    </div>
                </div>

                );
    }
}
export default Offer_Details;