import React, { Component } from 'react';
import {PostData} from '../../../services/PostData';
import Top_Bar from '../Top_Bar/Top_Bar';
import Navigation from '../Navigation/Navigation';
import 'font-awesome/css/font-awesome.min.css';
import '../css/application.min.css';
import '../css/elephant.min.css';
import '../css/custom.css';

class Pending_Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            member: sessionStorage.getItem("member_id"),
            memberDetails: [],
            memberAuthDetails: {
                id:sessionStorage.getItem("member_id"),
                authToken:sessionStorage.getItem("member_auth")
            }
        };
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.getMemberDetails = this.getMemberDetails.bind(this);

    }
    componentWillMount() {
        this.checkAuthentication();
        this.getMemberDetails();
    }
    checkAuthentication() {
        PostData('auth', this.state.memberAuthDetails).then((result) => {
            this.props.history.push("/login");
        });
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

    render() {

        return (
                <div className="My-Account">
                    <Top_Bar />
                    <Navigation />
                    <div className="layout-main">

            <div className="layout-footer">
                <div className="layout-footer-body">
                    <small className="version">Version 1.1.0</small>
                    <small className="copyright">2020 &copy; DIGIZONE.LK   </small>
                </div>
            </div>
        </div>

            </div>
                );
    }
}
export default Pending_Orders;