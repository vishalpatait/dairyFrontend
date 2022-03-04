var configData = require("../config");
var Api = configData.Api;

class DataService {
  login(data) {
    return Api.post("/user/login", data);
  }
  forgotPassword(data) {
    return Api.put("/user/forgot-password", data);
  }
  resetPassword(data) {
    return Api.put("/user/reset-password", data);
  }
  getAllUsers() {
    return Api.get("/user");
  }

  updateUser(oldData, newData) {
    console.log(oldData, newData, "oldData,newData");
    return Api.put(`/user/${oldData.id}`, newData);
  }
  postUser(data) {
    return Api.post("/user", data);
  }
  deleteUser(data) {
    return Api.delete(`/user/${data.id}`);
  }
  // ...........................................for Customer...................
  getAllCustomers() {
    return Api.get("/customer");
  }

  updateCustomer(oldData, newData) {
    console.log(oldData, newData, "oldData,newData");
    return Api.put(`/customer/${oldData.id}`, newData);
  }
  postCustomer(data) {
    return Api.post("/customer", data);
  }
  deleteCustomer(data) {
    return Api.delete(`/customer/${data.id}`);
  }
  // ...........................................for Customers Milk...................

  getAllMilkDataOfCustomer() {
    return Api.get("/customerMilk");
  }
  getMilkDataByCustomerId(data) {
    return Api.post("/customerMilk/myUser", data);
  }

  updateMilkDataOfCustomer(oldData, newData) {
    return Api.put(`/customerMilk/${oldData.id}`, newData);
  }
  postMilkDataOfCust(data) {
    return Api.post("/customerMilk", data);
  }
  deleteMilkDataOfCustomer(data) {
    return Api.delete(`/customerMilk/${data.id}`);
  }
}
export default new DataService();
