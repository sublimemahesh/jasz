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
import history from '../../history'

const SweetAlert = withSwalInstance(swal);

class Change_Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            member: sessionStorage.getItem("member_id"),
            memberDetails: [],
            full_name: '',
            memberAuthDetails: {
                id:sessionStorage.getItem("member_id"),
                authToken:sessionStorage.getItem("member_auth")
            },
            alert: null
        };
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.changePassword = this.changePassword.bind(this);

    }
    componentWillMount() {

        this.checkAuthentication();
    }
    checkAuthentication() {
        PostData('auth', this.state.memberAuthDetails).then((result) => {
            this.props.history.push("/login");
        });
    }

    changePassword() {


            const data = {
                member: this.state.member,
                currentpw: $('#txtCurrentPw').val(),
                newpw: $('#txtNewPw').val(),
                confirmpw: $('#txtConfirmPw').val()

            }
            if (data.currentpw == '' || !data.currentpw) {
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="Enter Current Password"
                        type= "error"
                      />
                   );
               this.setState({
                    alert: getAlert()
                });
                 return false;
            } else if (data.newpw == '' || !data.newpw) {
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="Enter New Password"
                        type= "error"
                      />

                   );
               this.setState({
                    alert: getAlert()
                });
                 return false;
            } else if (data.confirmpw == '' || !data.confirmpw) {

                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="Enter Confirm Password"
                        type= "error"
                      />

                   );
               this.setState({
                    alert: getAlert()
                });
                 return false;
            } else if (data.newpw != data.confirmpw) {
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="New Password and Confirm Password was not matched"
                        type= "error"
                      />

                   );
               this.setState({
                    alert: getAlert()
                });
                 return false;
            } else {
                PostData('change-password', data).then((result1) => {
                    let responseJson1 = result1;
                    if (responseJson1.feedData === 'not_matched') {
                        const getAlert = () => (
                            <SweetAlert
                                show="true"
                                title="Error"
                                text="Current Password was not matched."
                                type= "error"
                              />
                        );
                        this.setState({
                             alert: getAlert()
                         });
                     }  else if (responseJson1.feedData === true) {
                        const getAlert = () => (
                            <SweetAlert
                                show="true"
                                title="Success"
                                text="Successfully Changed Password"
                                type= "sucess"
                              />

                        );
                        this.setState({
                             alert: getAlert()
                         });
                         sessionStorage.setItem("member_id", '');
                        window.location.reload(false)
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
                        <div class="col-md-8 col-md-offset-2">
                            <div class="demo-form-wrapper card " id="form-data">
                                <div class="form form-horizontal">
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label" for="full_name">Current Password: </label>
                                        <div class="col-sm-9">
                                            <input id="txtCurrentPw" name="full_name" class="form-control" type="password" value={this.state.full_name} onChange={e => this.setState({ full_name: e.target.value })}/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label" for="email">New Password: </label>
                                        <div class="col-sm-9">
                                            <input id="txtNewPw" name="email" class="form-control" type="password" value={this.state.email} onChange={e => this.setState({ email: e.target.value })}/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label" for="contact_no">Confirm Password: </label>
                                        <div class="col-sm-9">
                                            <input id="txtConfirmPw" name="contact_no" class="form-control" type="password" value={this.state.contact_no} onChange={e => this.setState({ contact_no: e.target.value })}/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-md-3 col-md-offset-9">
                                            <input type="hidden" name="id" value="value={this.state.member}" />
                                            <button class="btn btn-primary btn-block" onClick={this.changePassword}>Change Password</button>{this.state.alert}
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
export default Change_Password;