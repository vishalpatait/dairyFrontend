import React, { Component, createRef } from "react";

// reactstrap components
import {
 Button,
 Card,
 CardHeader,
 CardBody,
 FormGroup,
 Form,
 Input,
 InputGroupAddon,
 InputGroupText,
 InputGroup,
 Row,
 Col,
 Container
} from "reactstrap";

import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { _resetPassword } from "../../Redux/Actions/user.action";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
class ResetPassword extends Component {
 constructor(props) {
  super(props);
  this.state = {
   cpassword: "",
   resetPasswordLink: this.props.match.params.token,
   password: "",
   passwordError: ""
  };
  this.mainContent = createRef();
 }
 componentDidMount = () => {
  setTimeout(async () => {
   await this.getLocattion();
   await this.setLocattion();
  }, 2000);
 };
 getLocattion() {
  document.body.classList.add("bg-default");
  return () => {
   document.body.classList.remove("bg-default");
  };
 }
 setLocattion() {
  document.documentElement.scrollTop = 0;
  document.scrollingElement.scrollTop = 0;
  this.mainContent.current.scrollTop = 0;
 }

 _handleChange = event => {
  this.setState({ [event.target.name]: event.target.value });
 };

 submitData = e => {
  e.preventDefault();
  if (this.state.password !== this.state.cpassword) {
   this.setState({ passwordError: "Password did not match" })
  } else {
   var data = {
    newPassword: this.state.password,
    resetPasswordLink: this.state.resetPasswordLink,
   };

   this.props
    ._resetPassword(data)
    .then(response => {
     console.log(response);

     if (response && response.status == 200) {

      toast.success("Login successful", {
       onClose: () => {
        // this.props.history.push("/admin");
        window.location.href = "/login";
       }
      });


     } else {
      toast.error("Invalid credentials");
     }

    })
    .catch(function (error) {
     toast.error("Invalid credentials");
     throw error;
    });
  }
 };
 render() {
  return (
   <>
    <div className="main-content" ref={this.mainContent}>
     <AuthNavbar />
     <div className="header bg-gradient-info py-7 py-lg-8">
      <Container>
       <div className="header-body text-center mb-7">
        <Row className="justify-content-center">
         <Col lg="5" md="6">
          <h1 className="text-white">
           Welcome!
                    </h1>
          <p className="text-lead text-light">
           Use these awesome forms to login or create new account in
           your project for free.
                    </p>
         </Col>
        </Row>
       </div>
      </Container>
      <div className="separator separator-bottom separator-skew zindex-100">
       <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        version="1.1"
        viewBox="0 0 2560 100"
        x="0"
        y="0"
       >
        <polygon
         className="fill-default"
         points="2560 0 2560 100 0 100"
        />
       </svg>
      </div>
     </div>
     {/* Page content */}
     <Container className="mt--8 pb-5">
      <Row className="justify-content-center">
       {/* ........................................................................................... */}
       <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
         <CardHeader className="bg-transparent pb-5"></CardHeader>
         <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
           <h3> Sign in with credentials home</h3>
          </div>
          <Form role="form">
           <FormGroup className="mb-3">
            <InputGroup className="input-group-alternative">
             <InputGroupAddon addonType="prepend">
              <InputGroupText>
               <i className="ni ni-email-83" />
              </InputGroupText>
             </InputGroupAddon>
             <Input
              placeholder="Password"
              type="text"
              autoComplete="new-password"
              name="password"
              required
              value={this.state.password}
              onChange={evt => this._handleChange(evt)}
             />
            </InputGroup>
           </FormGroup>
           <FormGroup>
            <InputGroup className="input-group-alternative">
             <InputGroupAddon addonType="prepend">
              <InputGroupText>
               <i className="ni ni-lock-circle-open" />
              </InputGroupText>
             </InputGroupAddon>
             <Input
              placeholder="Confirm Password"
              type="password"
              autoComplete="new-password"
              required
              onChange={evt => this._handleChange(evt)}
              name="cpassword"
              value={this.state.cpassword}
             />
            </InputGroup>
            {this.state.passwordError && (
             <p style={{ color: "red" }}>{this.state.passwordError}</p>
            )}
           </FormGroup>
           <div className="custom-control custom-control-alternative custom-checkbox">
            <input
             className="custom-control-input"
             id=" customCheckLogin"
             type="checkbox"
            />
            <label
             className="custom-control-label"
             htmlFor=" customCheckLogin"
            >
             <span className="text-muted">Remember me</span>
            </label>
           </div>
           <div className="text-center">
            <Button
             className="my-4"
             color="primary"
             type="button"
             onClick={e => this.submitData(e)}
            >
             Reset Password
                        </Button>
           </div>
          </Form>
         </CardBody>
        </Card>
        <Row className="mt-3">
         <Col xs="6">
          <Link
           className="text-light"
           to="/login"
          >
           <small>SignIn</small>
          </Link>
         </Col>
        </Row>
       </Col>
       {/* .......................................................... */}
      </Row>
     </Container>
    </div>
    <AuthFooter />
    <ToastContainer autoClose={2000} />
   </>
  );
 }
}


export default withRouter(connect(null, { _resetPassword })(ResetPassword));
