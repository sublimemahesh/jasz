import React, { Component }
from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class About extends Component {
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
                                            About Us
                                        </h1>
                                    </div>
                                    <div class="col-md-6 div-p">
                                        <p><a href="./">Home</a> | About Us</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div id="content">
                        <div className="content-page">
                            <div className="container">
                                <div className="protect-video">
                                    <div class="row">
                                        <div class="col-md-5 about-main-description">
                                            <h2 className="title-default">DIGIZONE.LK</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.Aenean commodo ligula eget dolor. Aenean massa.Aenean commodo ligula eget dolor. Aenean massa.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.</p>
                                        </div>
                                        <div class="col-md-7  about-main-img">
                                            <img src={`assets/img/banner/about.png`} alt="" />
                                        </div>
                                    </div>
                                </div>

                                <div class="list-company-importance">
                                    <h2 class="title-shop-page">The importance of the company</h2>
                                    <div class="list-feature-boxes">
                                        <div class="row">
                                            <div class="col-md-4 col-sm-4 col-xs-12">
                                                <div class="item-feature-box text-center feature-box-style-12">
                                                    <div class="feature-box-icon">
                                                        <a href="#" class="feature-box-link">
                                                            <span class="lnr fa fa-eye"></span>
                                                        </a>
                                                    </div>
                                                    <div class="feature-box-info">
                                                        <h3><a href="#">Vision</a></h3>
                                                        <p>Freegan lomo master cleanse, bitters hoodie gastropub cardigan synth sus tainable PBR next level semiotics.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-sm-4 col-xs-12">
                                                <div class="item-feature-box text-center feature-box-style-12">
                                                    <div class="feature-box-icon">
                                                        <a href="#" class="feature-box-link">
                                                            <span class="lnr fa fa-rocket"></span>
                                                        </a>
                                                    </div>
                                                    <div class="feature-box-info">
                                                        <h3><a href="#">Mission</a></h3>
                                                        <p>Freegan lomo master cleanse, bitters hoodie gastropub cardigan synth sus tainable PBR next level semiotics.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-sm-4 col-xs-12">
                                                <div class="item-feature-box text-center feature-box-style-12">
                                                    <div class="feature-box-icon">
                                                        <a href="#" class="feature-box-link">
                                                            <span class="lnr fa fa-heart"></span>
                                                        </a>
                                                    </div>
                                                    <div class="feature-box-info">
                                                        <h3><a href="#">Values</a></h3>
                                                        <p>Freegan lomo master cleanse, bitters hoodie gastropub cardigan synth sus tainable PBR next level semiotics.</p>
                                                    </div>
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
export default About;