import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class Testimonial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responsive: {
                0: {
                    items: 1,
                },
                580: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                1000: {
                    items: 1,
                },
            }
        };
    }
    render() {
        let Testimonial = this.props.feedData
            .map(function (feedData, index) {

                return (
                    <div className="item">
                        <ul className="list-product-hotdeal text-center">

                            <li>
                                <div className="home-testimo">
                                    <div className="home-test-link">
                                        <a href="#">
                                            <img src={`upload/comments/${feedData.image_name}`} alt="" />
                                        </a>
                                        <div className="home-test-info">
                                            <h4>{feedData.title}</h4>
                                            <span className="title-name">{feedData.name}</span>
                                        </div>
                                    </div>

                                </div>
                                <p className="desc" dangerouslySetInnerHTML={{ __html: feedData.comment }} />
                            </li>
                        </ul>
                    </div>

                )
            }, this);
        return (
            <div className="main-content-home5 testimonial-section">
                <div className="container">
                    <div className="popcat-list-box popcat-list-box1">
                        <h2 className="h2-white"><span>Testimonial</span></h2>
                    </div>
                    <div className="testi col-md-12 col-sm-12">
                        <div className="hot-deals">
                            <div className="hotdeals-slider slider-home4 simple-owl-slider">
                                <div className="row">
                                    {/* <div className="col-md-2"></div> */}
                                    <div className="col-md-8 col-md-offset-2 col-sm-12">
                                        <div className="wrap-item" data-navigation="true" data-pagination="false" data-itemscustom="[[0,1]]">
                                            <OwlCarousel items={1} margin={0} autoplay={true} loop nav dots={false} responsive={this.state.responsive}>
                                                {Testimonial}
                                            </OwlCarousel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default Testimonial;
