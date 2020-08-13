import React, { Component } from 'react';
import { PostData } from '../../services/PostData';
import Top_Bar from './Top_Bar/Top_Bar';
import Navigation from './Navigation/Navigation';
import 'font-awesome/css/font-awesome.min.css';
import './css/application.min.css';
import './css/elephant.min.css';
import './css/custom.css';
import $ from 'jquery';
import Swal from 'sweetalert2';

class Edit_Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            member: sessionStorage.getItem("member_id"),
            memberDetails: [],
            full_name: '',
            email: '',
            contact_no: '',
            city: '',
            address: '',
            country: '',
            memberAuthDetails: {
                id: sessionStorage.getItem("member_id"),
                authToken: sessionStorage.getItem("member_auth")
            },
            alert: null
        };
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.getMemberDetails = this.getMemberDetails.bind(this);
        this.updateMemberDetails = this.updateMemberDetails.bind(this);

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
            let responseJson = result;

            if (responseJson.feedData) {
                this.setState({ memberDetails: responseJson.feedData });
                this.setState({
                    full_name: responseJson.feedData.full_name,
                    email: responseJson.feedData.email,
                    contact_no: responseJson.feedData.contact_number,
                    city: responseJson.feedData.city,
                    address: responseJson.feedData.address,
                    country: responseJson.feedData.country
                });
            }
        });
    }
    updateMemberDetails() {


        const data = {
            member: this.state.member,
            fullname: $('#txtFullName').val(),
            email: $('#txtEmail').val(),
            contactno: $('#txtContactNo').val(),
            address: $('#txtAddress').val(),
            city: $('#txtCity').val(),
            country: $('#txtCountry').val()

        }

        let reg = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (data.fullname == '' || !data.fullname) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                text: 'Enter Full Name.',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        } else if (data.email == '' || !data.email) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                text: 'Enter Email.',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        } else if (!reg.test(data.email)) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                text: 'Enter Valid Email.',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        } else if (data.contactno == '' || !data.contactno) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                text: 'Enter Contact Number.',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        } else if (data.address == '' || !data.address) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                text: 'Enter Address.',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        } else if (data.city == '' || !data.city) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                text: 'Enter City.',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        } else if (data.country == '' || !data.country) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                text: 'Enter Country.',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        } else {
            PostData('update-member-details', data).then((result1) => {
                let responseJson1 = result1;

                if (responseJson1.feedData) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        text: 'Successfully updated.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        text: 'There was an error. Try again.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            });
        }
    }

    render() {

        return (
            <div className="My-Account">
                <Top_Bar />
                <Navigation />
                <div className="layout-main">
                    <div className="layout-content">
                        <div className="layout-content-body">
                            <div className="row gutter-xs">
                                <div className="row col-md-12">
                                    <div className="col-md-8 col-sm-12 col-md-offset-2">
                                        <div className="demo-form-wrapper card " id="form-data">
                                            <h2 className="order-card-title m-l-20">Edit Profile</h2>
                                            <hr />
                                            <div className="form form-horizontal">
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label" for="full_name">Full Name: </label>
                                                    <div className="col-sm-9">
                                                        <input id="txtFullName" name="full_name" className="form-control" type="text" value={this.state.full_name} onChange={e => this.setState({ full_name: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label" for="email">Email: </label>
                                                    <div className="col-sm-9">
                                                        <input id="txtEmail" name="email" className="form-control" type="text" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label" for="contact_no">Contact Number: </label>
                                                    <div className="col-sm-9">
                                                        <input id="txtContactNo" name="contact_no" className="form-control" type="text" value={this.state.contact_no} onChange={e => this.setState({ contact_no: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label" for="address">Address: </label>
                                                    <div className="col-sm-9">
                                                        <input id="txtAddress" name="address" className="form-control" type="text" value={this.state.address} onChange={e => this.setState({ address: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label" for="city">City: </label>
                                                    <div className="col-sm-9">
                                                        <input id="txtCity" name="city" className="form-control" type="text" value={this.state.city} onChange={e => this.setState({ city: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label" for="country">Country: </label>
                                                    <div className="col-sm-9">
                                                        <input id="txtCountry" name="country" className="form-control" type="text" value={this.state.country} onChange={e => this.setState({ country: e.target.value })} />
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <div className="col-md-3 col-md-offset-9">
                                                        <input type="hidden" name="id" value="value={this.state.member}" />
                                                        <button className="btn btn-primary btn-block" onClick={this.updateMemberDetails}>Update</button>{this.state.alert}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="layout-footer">
                        <div className="layout-footer-body">
                            <small className="version">Version 1.1.0</small>
                            <small className="copyright">2020 &copy; DEWENDRA.LK   </small>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default Edit_Profile;