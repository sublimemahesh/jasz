import React, { Component } from 'react';
import {PostData} from '../../../services/PostData';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import logo from '../../../images/logo/logo.png';
import $ from 'jquery';

class Top_Bar extends Component {
     constructor(props) {
        super(props);
        this.state = {
            member: sessionStorage.getItem("member_id"),
            memberDetails: []
        };
        this.getMemberDetails = this.getMemberDetails.bind(this);
        this.clickMobileNav = this.clickMobileNav.bind(this);

    }
    componentWillMount() {
        this.getMemberDetails();
    }

    getMemberDetails() {
        PostData('member', this.state.member).then((result) => {
            console.log(`result: `, result );
            let responseJson = result;

            if (responseJson.feedData) {
                this.setState({memberDetails: responseJson.feedData});
            }
        });
    }
    clickMobileNav() {
         $('#sidenav.collapse').toggleClass('show');
    }
    render() {

        return (
            <div className="layout-header">
                <div className="navbar navbar-default">
                    <div className="navbar-header">
                        <a className="navbar-brand navbar-brand-center" href="/home">
                            <img className="navbar-brand-logo" src={logo} alt="Digizone.lk" />
                        </a>
                    </div>
                    <a href="/home" ><img className="navbar-brand-logo visible-xs" src={logo} alt="Digizone.lk" /></a>
                    <div className="navbar-toggleable">
                    <a href="#" class="toggle-mobile-menu" onClick={this.clickMobileNav}><span> </span></a>
                        <nav id="navbar" className="navbar-collapse collapse">


                            <ul className="nav navbar-nav navbar-right">
                                <li className="visible-xs-block">
                                    <h4 className="navbar-text text-center">Hi, {this.state.memberDetails.full_name} </h4>
                                </li>
                                <li className="dropdown hidden-xs">
                                    <button className="navbar-account-btn" data-toggle="dropdown" aria-haspopup="true">
                                        Hi, {this.state.memberDetails.full_name}
                                    </button>
                                </li>
                            </ul>
                            <div className="title-bar">
                                <h1 className="title-bar-title">
                                    <span className="d-ib">Dashboard</span>
                                </h1>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

                );
    }
}
export default Top_Bar;