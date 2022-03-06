import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { Link } from "react-router-dom";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AddCustomerMilkModal from "./AddCustomerMilkModal";
import { Button } from "reactstrap";
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  FormGroup,
  Input
} from "reactstrap";
import Header from "components/Headers/Header";
import { connect } from "react-redux";
import {
  _getMilkByCustomerId,
  _deleteMilkDataOfCustomer
} from "../../Redux/Actions/user.action";
const CustomerProfile = props => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [addCustomerMilkModal, setAddCustomerMilkModal] = useState(false);
  const [userData, setuserData] = useState({});

  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [sum, setSum] = useState("");
  const [price, setPrice] = useState("");
  const [entries, setEntries] = useState({
    data: [
      {
        id: "",
        name: "",
        email: "",
        quantity: "",
        date: "",
        index: ""
      }
    ]
  });

  const _addMilkModal = data => {
    setAddCustomerMilkModal(true);
    setuserData(data);
  };

  const _addMilkToggleModal = () => {
    addCustomerMilkModal
      ? setAddCustomerMilkModal(false)
      : setAddCustomerMilkModal(true);
  };
  const snackbarClose = e => {
    setSnackbarOpen(false);
    getMilkDataByUser();
  };

  const getMilkDataByUser = async () => {
    let id = props.match.params.id;

    let data = { customer: id };

    // await props
    //   ._getMilkByCustomerId(data)
    await axios
      .post("http://localhost:8080/customerMilk/myUser", data)
      .then(response => {
        let data = [];
        response.data.user.forEach((el, index) => {
          data.push({
            index: ++index,
            id: el._id ? el._id : "",
            // name: el && el.customer.name ? el && el.customer.name : "",
            // email: el && el.customer.email ? el && el.customer.email : "",
            quantity: el.quantity ? el.quantity : "",
            date: el.regDate ? el.regDate : ""
          });
        });
        setEntries({ data: data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const _getSum = () => {
    var totalQuantity =
      entries &&
      entries.data.length > 0 &&
      entries.data.map(function (elem) {
        return elem.quantity;
      });
    const sumOfQuantity = totalQuantity.reduce(
      (partial_sum, a) => partial_sum + a,
      0
    );

    setSum(sumOfQuantity);
  };
  const totalPrice = () => {
    setPrice(sum * price);
  };
  useEffect(async () => {
    await getMilkDataByUser();
  }, []);



  return (
    <>
      <Header />

      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <Col md="2">
                    <FormGroup>
                      <Input
                        className="form-control-alternative"
                        placeholder="Enter price"
                        type="text"
                        onChange={e => setPrice(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <Button
                      className="active ml-5"
                      color="primary"
                      type="button"
                      onClick={() => _getSum()}
                    >
                      Total Quantity
                    </Button>
                  </Col>
                  <Col lg="3">
                    <Button
                      className="active "
                      color="primary"
                      type="button"
                      onClick={() => totalPrice()}
                    >
                      Total Price
                    </Button>
                  </Col>
                  <Col lg="2">
                    {entries.data < [1] && (
                      <div>
                        <Button
                          className="active ml-5"
                          color="primary"
                          type="button"
                          onClick={() => _addMilkModal()}
                        >
                          Add Milk
                        </Button>
                      </div>
                    )}
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <MaterialTable
                  title={
                    sum
                      ? `Quantity:${sum} Ltr  Price:${price} Rs.`
                      : "Customer Milk Management"
                  }
                  columns={[
                    { title: "Index", field: "index" },
                    // { title: "Name", field: "name" },
                    // { title: "Email", field: "email" },
                    { title: "Quantity", field: "quantity" },
                    { title: "Date", field: "date" }
                  ]}
                  options={{
                    exportButton: true
                  }}
                  actions={[
                    rowData => ({
                      icon: "add",
                      tooltip: "Add milk",
                      onClick: Data => {
                        _addMilkModal(rowData);
                      }
                    })
                  ]}
                  data={entries.data}
                  editable={{
                    onRowDelete: oldData =>
                      new Promise(resolve => {
                        setTimeout(() => {
                          resolve();
                          const data = [...entries.data];
                          data.splice(data.indexOf(oldData), 1);
                          props
                            ._deleteMilkDataOfCustomer(oldData)
                            .then(res => {
                              setSnackbarOpen(true);
                              setSnackbarMsg("Entry Deleted");
                              getMilkDataByUser();
                            })
                            .catch(err => {
                              setSnackbarOpen(true);
                              setSnackbarMsg("Someting went wrong");
                            });
                          setEntries({ ...entries, data });
                        }, 600);
                      })
                  }}
                />
                <Snackbar
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                  }}
                  open={snackbarOpen}
                  autoHideDuration={1500}
                  onClose={snackbarClose}
                  message={snackbarMsg}
                  action={
                    <React.Fragment>
                      <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={snackbarClose}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </React.Fragment>
                  }
                />
                {addCustomerMilkModal && (
                  <AddCustomerMilkModal
                    addCustomerMilkModal={addCustomerMilkModal}
                    _addMilkToggleModal={_addMilkToggleModal}
                    ID={props.match.params.id}
                    userData={userData}
                    getMilkDataByUser={getMilkDataByUser}
                  />
                )}
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

//  const mapStateToProps = state => {
//     console.log(state, "state");

//     return {
//       userData: state.userData.customers
//     };
//   };
export default connect(null, {
  _getMilkByCustomerId,
  _deleteMilkDataOfCustomer
})(CustomerProfile);
// https://material-table.com/#/docs/features/actions
// https://mui.com/components/material-icons/
