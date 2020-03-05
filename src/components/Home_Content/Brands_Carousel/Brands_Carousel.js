import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';

class Brands_Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responsive:{
                0: {
                    items: 2,
                },
                580: {
                    items: 2,
                },
                600: {
                    items: 5,
                },
                1000: {
                    items: 9,
                },
            },
            alert: null
        };
    }
render() {
    let Brands = this.props.feedData
                .map(function (feedData, index) {
                    const location = {
                      pathname: '/products',
                      state: { brand: feedData.id }
                    }
return (
                <div className="item-pop-cat">
                    <div className="zoom-image-thumb">
                        <Link class="addcart-link" to={location} ><img src={`upload/brand/${feedData.image_name}`} alt="" /></Link>
                    </div>
                    <h2 className="pop-cat-title">{feedData.name}</h2>
                </div>
)
         }, this);
        return (
                <div className="container">
    <div className="pop-cat-slider slider-home4 pop-cat13">
        <div className="popcat-list-box popcat-list-box1">
            <h2 className="h2-white"><span>brands</span></h2>
        </div>
        <div className="wrap-item" data-pagination="false" data-navigation="true" data-itemscustom="[[0,3],[480,4],[768,7],[992,8],[1200,9]]">
        <OwlCarousel items={9} margin={0} autoplay ={false} nav dots={false} responsive={this.state.responsive}>
        {Brands}
        </OwlCarousel>
        </div>
    </div>
</div>
                );
        }
}
export default Brands_Carousel;