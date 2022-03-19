import React from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col,
  Button
} from "reactstrap";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Nav,
  Media
} from "reactstrap";
import { connect } from "react-redux";
import { _postMilk } from "../../Redux/Actions/user.action";
class AddCustomerMilkModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: "",
      milkType: ""
    };
  }
  toggleModal = () => {
    this.props._addMilkToggleModal();
    this.props.getMilkDataByUser();
  };
  changeHandler = e => {
    console.log(e, "itm.Milktype");

    this.setState({ [e.target.name]: e.target.value });
  };
  handleData = () => {
    if (this.state.quantity !== "") {
      this._handleSubmit();
    }
  };
  _handleSubmit() {
    const data = {
      quantity: parseInt(this.state.quantity),
      customer: this.props.ID
    };
    console.log(data, "data");
    // axios
    //   .post("http://localhost:8888/customerMilk", data)
    this.props
      ._postMilk(data)
      .then(response => {
        if (response.status === 200) {
          alert("success");
        } else {
          alert("failed");
        }
      })
      .catch(err => {
        alert("failed");
      });
    this.toggleModal();
  }
  _onlyNumberrr = e => {
    const re = /^[0-9]*\.?[0-9]*$/;
    const { value } = e.target;
    const checkQuntity = re.test(value);
    checkQuntity
      ? this.setState({ quantityError: "" })
      : this.setState({ quantityError: "Please enter numbers only" });
  };
  milkHandler = e => {
    console.log(e.target.value, "itm.Milktype");
  };
  render() {
    let { userData, addCustomerMilkModal, milkTypeData } = this.props;

    const enabled = !this.state.quantityError;
    const user =
      userData && userData.user && userData.user.map(data => data.customer);
    const userName = user && user.map(data => data.name);
    console.log(this.state.milkType, "milkTypeData");

    return (
      <>
        <Row>
          <Col md="4">
            <Modal
              className="modal-dialog-centered"
              size="sm"
              isOpen={addCustomerMilkModal}
              toggle={() => this.toggleModal()}
            >
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-transparent pb-5">
                    <div className="text-muted text-center mt-5 mb-3 primary ">
                      <h3> Customer :{userName ? userName : ""}</h3>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form role="form">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-album-2" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="quantity "
                            type="text"
                            name="quantity"
                            value={this.state.quantity}
                            onChange={this.changeHandler}
                            onKeyPress={evt => this._onlyNumberrr(evt)}
                          />
                        </InputGroup>
                        <Nav
                          className="align-items-center d-none d-md-flex"
                          navbar
                        >
                          <UncontrolledDropdown nav>
                            <DropdownToggle className="pr-0" nav>
                              <Media className="align-items-center">
                                <span className="avatar avatar-sm rounded-circle">
                                  <img
                                    alt="..."
                                    src={
                                      require("../../assets/img/theme/team-4-800x800.jpg")
                                        .default
                                    }
                                  />
                                </span>
                                <Media className="ml-2 d-none d-lg-block">
                                  <span className="mb-0 text-sm font-weight-bold">
                                    Select Milk type
                                  </span>
                                </Media>
                              </Media>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              {milkTypeData &&
                                milkTypeData.map(itm => (
                                  <DropdownItem
                                    name="milkType"
                                    value={itm.Milktype}
                                    onClick={e => this.milkHandler(e)}
                                  >
                                    <i className="ni ni-user-run" />
                                    {itm.Milktype}
                                  </DropdownItem>
                                ))}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </Nav>
                      </FormGroup>

                      {this.state.quantityError && (
                        <p className="text-danger">
                          {" "}
                          {this.state.quantityError}{" "}
                        </p>
                      )}

                      <div className="modal-footer">
                        <div className="mr-6">
                          <Button
                            className="ml-auto"
                            data-dismiss="modal"
                            type="button"
                            color="danger"
                            onClick={() => this.toggleModal("defaultModal")}
                          >
                            Close
                          </Button>
                        </div>
                        <Button
                          color="success"
                          type="button"
                          onClick={() => this.handleData()}
                          disabled={!enabled}
                        >
                          Save
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </div>
            </Modal>
          </Col>
        </Row>
      </>
    );
  }
}

export default connect(null, {
  _postMilk
})(AddCustomerMilkModal);
