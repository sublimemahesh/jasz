import React, { Component } from 'react';
import {PostData} from '../../services/PostData';
import Top_Bar from './Top_Bar/Top_Bar';
import Navigation from './Navigation/Navigation';
import 'font-awesome/css/font-awesome.min.css';
import './css/application.min.css';
import './css/elephant.min.css';
import './css/custom.css';
import member from '../../images/member.jpg';
import $ from 'jquery';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';

const SweetAlert = withSwalInstance(swal);

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
                id:sessionStorage.getItem("member_id"),
                authToken:sessionStorage.getItem("member_auth")
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
            console.log(`result: `, result );
            let responseJson = result;

            if (responseJson.feedData) {
                this.setState({memberDetails: responseJson.feedData});
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
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="Enter Full Name"
                        type= "error"
                      />
                   );
               this.setState({
                    alert: getAlert()
                });
                 return false;
            } else if (data.email == '' || !data.email) {
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="Enter Email"
                        type= "error"
                      />

                   );
               this.setState({
                    alert: getAlert()
                });
                 return false;
            } else if (!reg.test(data.email)) {
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="Enter Valid Email"
                        type= "error"
                      />

                   );
               this.setState({
                    alert: getAlert()
                });
                 return false;
            } else if (data.contactno == '' || !data.contactno) {
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="Enter Contact Number"
                        type= "error"
                      />

                   );
               this.setState({
                    alert: getAlert()
                });
                 return false;
            } else if (data.address == '' || !data.address) {
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="Enter Address"
                        type= "error"
                      />

                   );
               this.setState({
                    alert: getAlert()
                });
                 return false;
            } else if (data.city == '' || !data.city) {
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="Enter City"
                        type= "error"
                      />

                   );
               this.setState({
                    alert: getAlert()
                });
                 return false;
            } else if (data.country == '' || !data.country) {
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="Enter Country"
                        type= "error"
                      />

                   );
               this.setState({
                    alert: getAlert()
                });
                return false;
            } else {
                PostData('update-member-details', data).then((result1) => {
                    console.log(`1: `,result1);
                    let responseJson1 = result1;

                    if (responseJson1.feedData) {
                        const getAlert = () => (
                            <SweetAlert
                                show="true"
                                title="Success"
                                text="Successfully Updated"
                                type= "sucess"
                              />

                        );
                        this.setState({
                             alert: getAlert()
                         });
                     } else {
                         const getAlert = () => (
                            <SweetAlert
                                show="true"
                                title="Error"
                                text="There was an error. Try Again"
                                type= "error"
                              >
                              Text
                              </SweetAlert>
                           );
                           this.setState({
                                alert: getAlert()
                            });
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
                        <div class="row col-md-12">
                        <div class="col-md-8 col-sm-12 col-md-offset-2">
                            <div class="demo-form-wrapper card " id="form-data">
                                <div class="form form-horizontal">
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label" for="full_name">Full Name: </label>
                                        <div class="col-sm-9">
                                            <input id="txtFullName" name="full_name" class="form-control" type="text" value={this.state.full_name} onChange={e => this.setState({ full_name: e.target.value })}/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label" for="email">Email: </label>
                                        <div class="col-sm-9">
                                            <input id="txtEmail" name="email" class="form-control" type="text" value={this.state.email} onChange={e => this.setState({ email: e.target.value })}/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label" for="contact_no">Contact Number: </label>
                                        <div class="col-sm-9">
                                            <input id="txtContactNo" name="contact_no" class="form-control" type="text" value={this.state.contact_no} onChange={e => this.setState({ contact_no: e.target.value })}/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label" for="address">Address: </label>
                                        <div class="col-sm-9">
                                            <input id="txtAddress" name="address" class="form-control" type="text" value={this.state.address} onChange={e => this.setState({ address: e.target.value })} />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label" for="city">City: </label>
                                        <div class="col-sm-9">
                                            <input id="txtCity" name="city" class="form-control" type="text" value={this.state.city} onChange={e => this.setState({ city: e.target.value })} />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label" for="country">Country: </label>
                                        <div class="col-sm-9">
                                            <input id="txtCountry" name="country" class="form-control" type="text"  value={this.state.country} onChange={e => this.setState({ country: e.target.value })}/>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="col-md-3 col-md-offset-9">
                                            <input type="hidden" name="id" value="value={this.state.member}" />
                                            <button class="btn btn-primary btn-block" onClick={this.updateMemberDetails}>Update</button>{this.state.alert}
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
                    <small className="copyright">2020 &copy; DIGIZONE.LK   </small>
                </div>
            </div>
        </div>

            </div>
                );
    }
}
export default Edit_Profile;