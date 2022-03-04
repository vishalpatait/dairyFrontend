import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { Link } from "react-router-dom";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { connect } from "react-redux";
import { Card, CardHeader, Table, Container, Row } from "reactstrap";
import Header from "components/Headers/Header";
import {
  _getAllCustomers,
  _postCustomer,
  _updateCustomer,
  _deleteCustomer
} from "../../Redux/Actions/user.action";
const CustomerTable = props => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [entries, setEntries] = useState({
    data: [
      {
        id: "",
        name: "",
        email: "",
        mobile: ""
      }
    ]
  });
  const snackbarClose = async e => {
    setSnackbarOpen(false);
    await getCustomers();
  };
  const getCustomers = async () => {
    await props
      ._getAllCustomers()

      .then(response => {
        let data = [];
        response.data.forEach(el => {
          data.push({
            id: el._id,
            name: el.name,
            email: el.email,
            mobile: el.mobile
          });
        });
        setEntries({ data: data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(async () => {
    await getCustomers();
  }, []);
  return (
    <>
      <Header />

      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0"></CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <MaterialTable
                  title="Customer Management"
                  columns={[
                    // { title: "Id", field: "id" },
                    { title: "Name", field: "name" },
                    { title: "Email", field: "email" },
                    { title: "Mobile", field: "mobile" }
                  ]}
                  options={{
                    exportButton: true
                  }}
                  actions={[
                    rowData => ({
                      icon: () => (
                        <Link to={`/customer-profile/${rowData.id}`}>
                          <AccountBoxIcon />
                        </Link>
                      ),
                      tooltip: "Details",
                      onClick: rowData
                    })
                  ]}
                  data={entries.data}
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise(resolve => {
                        setTimeout(() => {
                          resolve();
                          const data = [...entries.data];
                          data[data.indexOf(oldData)] = newData;
                          props
                            ._updateCustomer(oldData, newData)
                            .then(res => {
                              setSnackbarOpen(true);
                              setSnackbarMsg("Customer Updated");
                              getCustomers();
                            })
                            .catch(err => {
                              setSnackbarOpen(true);
                              setSnackbarMsg("Someting went wrong");
                            });
                          setEntries({ ...entries, data });
                        }, 1000);
                      }),
                    onRowAdd: newData =>
                      new Promise(resolve => {
                        setTimeout(() => {
                          resolve();
                          const data = [...entries.data];

                          props
                            ._postCustomer(newData)
                            .then(res => {
                              setSnackbarOpen(true);
                              setSnackbarMsg("Customer Added");
                              getCustomers();
                            })
                            .catch(err => {
                              setSnackbarOpen(true);
                              setSnackbarMsg("Someting went wrong");
                            });
                          setEntries({ ...entries, data });
                        }, 600);
                      }),
                    onRowDelete: oldData =>
                      new Promise(resolve => {
                        setTimeout(() => {
                          resolve();
                          const data = [...entries.data];
                          data.splice(data.indexOf(oldData), 1);
                          props
                            ._deleteCustomer(oldData)
                            .then(res => {
                              setSnackbarOpen(true);
                              setSnackbarMsg("Customer Deleted");
                              getCustomers();
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
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

// https://material-table.com/#/docs/features/actions
// https://mui.com/components/material-icons/
//  const mapStateToProps = state => {
//     console.log(state, "state");

//     return {
//       userData: state.userData.customers
//     };
//   };
export default connect(null, {
  _getAllCustomers,
  _postCustomer,
  _updateCustomer,
  _deleteCustomer
})(CustomerTable);
