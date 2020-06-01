import React, { Component } from 'react';
import {PostData} from '../../services/PostData';
import $ from 'jquery';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';

const SweetAlert = withSwalInstance(swal);

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            alert: null,
            memberAuthDetails: {
                id:sessionStorage.getItem("member_id"),
                authToken:sessionStorage.getItem("member_auth")
            }
        };
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.submitRegisterForm = this.submitRegisterForm.bind(this);
        this.submitLoginForm = this.submitLoginForm.bind(this);
    }
    componentWillMount() {

        this.checkAuthentication();
    }
    checkAuthentication() {
        PostData('auth1', this.state.memberAuthDetails).then((result) => {
            this.props.history.push("/my-account/profile");
        });
    }
    submitRegisterForm() {
            const data = {
                fullname: $('#txtFullName').val(),
                email: $('#txtEmail').val(),
                username: $('#txtUserName').val(),
                password: $('#txtPassword').val(),
                cpassword: $('#txtCPassword').val()

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
                        text="Enter Valid email"
                        type= "error"
                      />

                   );
               this.setState({
                    alert: getAlert()
                });
                 return false;
            } else if (data.username == '' || !data.username) {
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="Enter User Name"
                        type= "error"
                      />

                   );
               this.setState({
                    alert: getAlert()
                });
                 return false;
            } else if (data.password == '' || !data.password) {
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="Enter Password"
                        type= "error"
                      />

                   );
               this.setState({
                    alert: getAlert()
                });
                 return false;
            } else if (data.cpassword == '' || !data.cpassword) {
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
            } else if (data.password != data.cpassword) {
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="Password and Confirm Password is not matched"
                        type= "error"
                      />

                   );
               this.setState({
                    alert: getAlert()
                });
                return false;
            } else {
                PostData('register', data).then((result1) => {
                    console.log(`1: `,result1);
                    let responseJson1 = result1;

                    if (responseJson1.feedData) {
                        const getAlert = () => (
                            <SweetAlert
                                show="true"
                                title="Success"
                                text="Successfully registered. Please login in first"
                                type= "sucess"
                              />

                        );
                        this.setState({
                             alert: getAlert()
                         });
                        $('#txtFullName').val("");
                        $('#txtEmail').val("");
                        $('#txtUserName').val("");
                        $('#txtPassword').val("");
                        $('#txtCPassword').val("");
                     } else {
                         const getAlert = () => (
                            <SweetAlert
                                show="true"
                                title="Error"
                                text="There was an error. Try Again"
                                type= "error"
                              />
                           );
                           this.setState({
                                alert: getAlert()
                            });
                     }
                });
            }
        }

    submitLoginForm() {
            const data = {
                username: $('#username').val(),
                password: $('#password').val()

            }

            if (data.username == '' || !data.username) {
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="Enter User Name"
                        type= "error"
                      >
                      Text
                      </SweetAlert>
                );
                this.setState({
                     alert: getAlert()
                 });
                 return false;
            } else if (data.password == '' || !data.password) {
                 const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="Enter Password"
                        type= "error"
                      >
                      Text
                      </SweetAlert>
                );
                this.setState({
                     alert: getAlert()
                 });
                 return false;
            }  else {
                PostData('login', data).then((result1) => {
                    let responseJson1 = result1;
                    if (responseJson1.feedData) {
                        const getAlert = () => (
                            <SweetAlert
                                show="true"
                                title="Success"
                                text="Successfully Loged In"
                                type= "success"
                              >
                              Text
                              </SweetAlert>
                           );
                           this.setState({
                                alert: getAlert()
                            });

                         sessionStorage.setItem("member_id",responseJson1.feedData.id);
                         sessionStorage.setItem("member_auth", responseJson1.feedData.auth_token);
                            $('#username').val("");
                            $('#password').val("");
                            this.props.history.push("/my-account/profile");
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
                <div className="">
                    <Header />
                <div id="content">
                    <div className="content-page">
			<div className="container">
				<div className="row">
					<div className="col-md-10 col-sm-12 col-xs-12 col-md-offset-1">
						<h2 className="title-shop-page">My Account</h2>
						<div className="row">
							<div className="col-md-6 col-sm-6 col-ms-12">
								<div className="account-login">
									<div className="form-my-account">
										<h2 className="title">Login</h2>
										<p><input type="text" placeholder="Username *" id="username"/></p>
										<p><input type="password" placeholder="Password *" id="password"/></p>
										<p>
											<input type="checkbox"  id="remember" /> <label for="remember">Remember me</label>
											<a href="/forget-password">Lost Password?</a>
										</p>
										<p><button  onClick={this.submitLoginForm}>Login</button>{this.state.alert}</p>
									</div>
								</div>
							</div>
							<div className="col-md-6 col-sm-6 col-ms-12">
								<div className="account-register">
									<div className="form-my-account">
										<h2 className="title">Register</h2>
										<p><input type="text" placeholder="Full Name *" id="txtFullName"/></p>
										<p><input type="text" placeholder="E-mail *" id="txtEmail"/></p>
										<p><input type="text" placeholder="Username *" id="txtUserName"/></p>
										<p><input type="password" placeholder="Password *" id="txtPassword" /></p>
										<p><input type="password" placeholder="Confirm Password *" id="txtCPassword" /></p>
                                                                                <p><button  onClick={this.submitRegisterForm}>Register</button>{this.state.alert}</p>
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
export default Login;