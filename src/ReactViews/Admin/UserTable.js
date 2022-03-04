import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { Card, CardHeader, Table, Container, Row } from "reactstrap";
import Header from "components/Headers/Header";
import { connect } from "react-redux";

import {
  _getAllUsers,
  _postUser,
  _updateUser,
  _deleteUser
} from "../../Redux/Actions/user.action";
const UserTable = props => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [entries, setEntries] = useState({
    data: [
      {
        id: "",
        name: "",
        email: "",
        mobile: "",
        role: "",
        password: ""
      }
    ]
  });
  const snackbarClose = e => {
    setSnackbarOpen(false);
    getUsers();
  };
  const getUsers = async () => {
    await props
      ._getAllUsers()

      .then(response => {
        let data = [];
        response.data.forEach(el => {
          data.push({
            id: el._id,
            name: el.name,
            email: el.email,
            mobile: el.mobile,
            password: el.password,
            role: el.role
          });
        });
        setEntries({ data: data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getUsers();
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
                  title="User Management"
                  columns={[
                    { title: "Name", field: "name" },
                    { title: "Email", field: "email" },
                    { title: "Mobile", field: "mobile" },

                    { title: "Role", field: "role" },
                    { title: "Password", field: "password" }
                  ]}
                  options={{
                    exportButton: true
                  }}
                  data={entries.data}
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise(resolve => {
                        setTimeout(() => {
                          resolve();
                          const data = [...entries.data];
                          data[data.indexOf(oldData)] = newData;
                          props
                            ._updateUser(oldData, newData)
                            .then(res => {
                              setSnackbarOpen(true);
                              setSnackbarMsg("User Updated");
                              getUsers();
                            })
                            .catch(err => {
                              setSnackbarOpen(true);
                              setSnackbarMsg("Someting went wrong");
                            });
                          setEntries({ ...entries, data });
                        }, 600);
                      }),
                    onRowAdd: newData =>
                      new Promise(resolve => {
                        setTimeout(() => {
                          resolve();
                          const data = [...entries.data];

                          props
                            ._postUser(newData)
                            .then(res => {
                              setSnackbarOpen(true);
                              setSnackbarMsg("User Added");
                              getUsers();
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
                            ._deleteUser(oldData)
                            .then(res => {
                              setSnackbarOpen(true);
                              setSnackbarMsg("User Deleted");
                              getUsers();
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
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
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
    </>
  );
};
// const mapStateToProps = state => {
//   console.log(state.userData.users, "state");

//   return {
//     userData: state.userData.users
//   };
// };
export default connect(null, {
  _getAllUsers,
  _postUser,
  _updateUser,
  _deleteUser
})(UserTable);
