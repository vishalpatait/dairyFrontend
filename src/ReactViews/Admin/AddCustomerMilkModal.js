import React from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
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
      quantity: 0.5,
      milkType: ""
    };
  }
  toggleModal = () => {
    this.props._addMilkToggleModal();
    this.props.getMilkDataByUser();
  };
  increamentHandler = e => {
    this.setState({ quantity: this.state.quantity + 0.5 });
  };
  decreamentHandler = e => {
    this.setState({ quantity: this.state.quantity - 0.5 });
  };
  handleData = () => {
    if (this.state.milkType !== "") {
      this._handleSubmit();
    } else {
      this.setState({ quantityError: "Please select milk type" });
    }
  };

  _handleSubmit() {
    const data = {
      quantity: this.state.quantity,
      customer: this.props.ID,
      milkType: this.state.milkType
    };

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
  // _onlyNumberrr = e => {
  //   const re = /^[0-9]*\.?[0-9]*$/;
  //   const { value } = e.target;
  //   const checkQuntity = re.test(value);
  //   checkQuntity
  //     ? this.setState({ quantityError: "" })
  //     : this.setState({ quantityError: "Please enter numbers only" });
  // };
  milkHandler = e => {
    this.setState({ milkType: e.target.value });
    this.setState({ quantityError: "" });
  };
  render() {
    let { userData, addCustomerMilkModal, milkTypeData } = this.props;

    const enabled = !this.state.quantityError;
    const user =
      userData && userData.user && userData.user.map(data => data.customer);
    const userName = user && user.map(data => data.name);

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
                        {/* <InputGroup className="input-group-alternative">
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
                        </InputGroup> */}
                        <div className="align-items-center ml-5 d-md-flex">
                          <Button
                            color="danger"
                            type="button"
                            onClick={this.decreamentHandler}
                          >
                            <i className="ni ni-fat-delete" />
                          </Button>
                          <Button color="secondary" type="button">
                            {this.state.quantity}
                          </Button>
                          <Button
                            color="info"
                            type="button"
                            onClick={this.increamentHandler}
                          >
                            <i className="ni ni-zoom-split-in" />
                          </Button>
                        </div>
                        <Nav
                          className="align-items-center  d-md-flex mt-3"
                          navbar
                        >
                          <UncontrolledDropdown nav>
                            <DropdownToggle className="pr-0" nav>
                              <Media className="align-items-center">
                                <span className="avatar avatar-sm rounded-circle">
                                  <i className="ni ni-cart" />
                                </span>
                                <Media className="ml-2  d-lg-block">
                                  <span className="mb-0 text-sm font-weight-bold">
                                    {this.state.milkType
                                      ? this.state.milkType
                                      : "Select Milk type"}
                                  </span>
                                </Media>
                              </Media>{" "}
                              {this.state.quantityError && (
                                <p className="text-danger">
                                  {" "}
                                  {this.state.quantityError}{" "}
                                </p>
                              )}
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
