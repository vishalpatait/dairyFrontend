import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Card, CardHeader, Table, Container, Row } from "reactstrap";
import Header from "components/Headers/Header";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  getAllMilkTypes,
  postMilkTypes,
  updateMilkTypes,
  deleteMilkTypes,
  singleMilkType
} from "../../Redux/Actions/milktype.action";
const MilkTypeManagment = props => {
  const dispatch = useDispatch();

  const milkTypeData = useSelector(state => state.milkTypeReducer.milkTypeData);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [entries, setEntries] = useState({
    data: [
      {
        id: "",
        Milktype: "",
        Price: ""
      }
    ]
  });
  const snackbarClose = e => {
    setSnackbarOpen(false);
    getMilkType();
  };
  const getMilkType = async () => {
    let data = [];
    milkTypeData.forEach(el => {
      data.push({
        id: el._id,
        Milktype: el.Milktype,
        Price: el.Price
      });
    });
    setEntries({ data: data });
  };
  useEffect(() => {
    dispatch(getAllMilkTypes());
    getMilkType();
  }, [milkTypeData]);
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
                  title="Milktype Management"
                  columns={[
                    { title: "Milktype", field: "Milktype" },
                    { title: "Price", field: "Price" }
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
                          dispatch(updateMilkTypes(oldData, newData))
                            .then(res => {
                              setSnackbarOpen(true);
                              setSnackbarMsg("Milk type Updated");
                              getMilkType();
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
                          dispatch(postMilkTypes(newData))
                            .then(res => {
                              setSnackbarOpen(true);
                              setSnackbarMsg("Milk type Added");
                              getMilkType();
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
                          dispatch(deleteMilkTypes(oldData));

                          setSnackbarOpen(true);
                          setSnackbarMsg("Milk type Deleted");
                          getMilkType();

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

export default connect(state => {})(MilkTypeManagment);
