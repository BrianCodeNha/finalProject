import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Employee from "./Employee";
import SearchPage from "./SearchPage";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Staff from "./Staff";
import { connect } from "react-redux";
import {  
  fetchStaffs,
  fetchStaffsAdmin,
  postStaff,
  postStaffAdmin,
  deleteEmployee,
  deleteSelectedItem,
  updateEmployee,
  fetchUsers,
  deleteSelectedUser,
  deleteUser,
  updateUser,
  deactivateUser,
  loadUserStatus,
  fetchVeDo,
  deleteVeDo,
  deleteSelectedVedo,
  postVedo,
  updateVeDo,
} from "../Redux/ActionCreator";

import QuanLyVeDo from "./QuanLyVeDo";
import ManageUser from "./ManageUser";
import { VeDoEdit } from "./VeDoEdit";
import axios from "axios";
import { EditUser } from "./EditUser";
import Login from "./Login";
import SignUp from "./SignUp";
import { backEndURL } from "../shared/baseUrl";
import { UserProfile } from "./UserProfile";

// get state, and dispatch from store

const mapStateToProps = (state) => ({
  ticketListFromServer: state.staffList,
  usersFromBackEnd: state.users,
  userStatus: state.userStatus,
  veDoList: state.veDoList,
  isLoading: state.isLoading,
  errMess: state.errMess,
  departmentFromServer: state.departments,
  staffSalaryFromServer: state.staffSalary,
});

const mapDispatchToProp = (dispatch) => ({
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },  
  fetchStaffsAdmin: () => {
    dispatch(fetchStaffsAdmin());
  },  
  fetchUsers: () => {
    dispatch(fetchUsers());
  },  
  fetchVeDo: () => {
    dispatch(fetchVeDo());
  },  
  postStaff: (veso) => {
    dispatch(
      postStaff(veso));
  },
  postStaffAdmin: (veso) => {
    dispatch(
      postStaffAdmin(veso));
  },
  postVedo: (vedo) => {
    dispatch(
      postVedo(vedo));
  },
  deleteEmployee: (id, number, producer) => {
    dispatch(deleteEmployee(id, number, producer));
  },
  deleteVeDo: (id, date, producer) => {
    dispatch(deleteVeDo(id, date, producer));
  },
  deleteUser: (id, userName, email) => {
    dispatch(deleteUser(id, userName, email));
  },
  deleteSelectedItem: (idList) => {
    dispatch(deleteSelectedItem(idList));
  },
  deleteSelectedUser: (idList) => {
    dispatch(deleteSelectedUser(idList));
  },
  deleteSelectedVedo: (idList) => {
    dispatch(deleteSelectedVedo(idList));
  },
  updateEmployee: (id, updatedTicket) => {
    dispatch(updateEmployee(id, updatedTicket));
  },
  updateVeDo: (id, updatedTicket) => {
    dispatch(updateVeDo(id, updatedTicket));
  },
  updateUser: (id, updatedTicket) => {
    dispatch(updateUser(id, updatedTicket));
  },
  deactivateUser: (id, activeProps) => {
    dispatch(deactivateUser(id, activeProps));
  },
  loadUserStatus: (userStatus) => {
    dispatch(loadUserStatus(userStatus));
  },
});

export function MainComponent({
  ticketListFromServer,
  usersFromBackEnd,
  userStatus,
  loadUserStatus,
  isLoading,
  errMess,
  fetchStaffs,  
  fetchStaffsAdmin,
  fetchVeDo,
  veDoList,
  postStaff,
  postStaffAdmin,
  postVedo,
  fetchUsers,  
  updateEmployee,
  updateVeDo,
  updateUser,
  deleteEmployee,
  deleteVeDo,
  deleteUser,
  deactivateUser,
  deleteSelectedItem,
  deleteSelectedUser,
  deleteSelectedVedo
}) {

  axios.defaults.withcredentials = true;
  //store stafflist here
  // const [veDoList, setVeDoList] = useState([]);


  useEffect(() => {
    // insert mapDispatchToProp

    const fetchLoginInfo = async () => {     
      console.log('getdata Ve Do')
      // const response1 = await axios.get(
      //   "http://localhost:5000/admin/checkticket"
      // );
      // setVeDoList(response1.data);    

      console.log('getUserStatus')
      const response2 = await axios.get(backEndURL + 'authen/login', {withCredentials: true})
      loadUserStatus(response2.data)     
      
    };
    fetchLoginInfo();
    fetchVeDo();
    userStatus.role === 'user' && fetchStaffs();
    userStatus.role === 'admin' && fetchStaffsAdmin();
    userStatus.role === 'admin' && fetchUsers();
  },[userStatus.role] ); // component Did mount

  

  //staffId for idividiual view

  const [staffId, setStaffId] = useState(null);

  const selectedEmployee = (selectedID) => {
    setStaffId(selectedID);
  };

  // this is for sort entry

  const [property, setProperty] = useState(""); //store sortEntry here
  console.log("🚀 ~ file: MainComponent.js ~ line 132 ~ property", property)

  const sortDataEntry = (entry) => {
  console.log("🚀 ~ file: MainComponent.js ~ line 135 ~ sortDataEntry ~ entry", entry)
    setProperty(entry);
    ticketListFromServer.sort(function (a, b) {
      if (entry === "number") {
        return b.number - a.number;
      } else if (entry === "producer") {        
        if (a.producer.toLowerCase() > b.producer.toLowerCase()) return 1;
        else if (a.producer.toLowerCase() < b.producer.toLowerCase()) return -1;
      } else if (entry === "date") {
        if (a.date.toLowerCase() > b.date.toLowerCase()) return 1;
        if (a.date.toLowerCase() < b.date.toLowerCase()) return -1;
      }      
      return null
    });

    veDoList.sort(function (a, b) {
      if (entry === "producerId") {
        if (a.producerId.toLowerCase() > b.producerId.toLowerCase()) return 1;
        else if (a.producerId.toLowerCase() < b.producerId.toLowerCase()) return -1;
      } else if (entry === "producer") {        
        if (a.producer.toLowerCase() > b.producer.toLowerCase()) return 1;
        else if (a.producer.toLowerCase() < b.producer.toLowerCase()) return -1;
      } else if (entry === "date") {
        if (a.date.toLowerCase() > b.date.toLowerCase()) return 1;
        if (a.date.toLowerCase() < b.date.toLowerCase()) return -1;
      }      
      return null
    });

    usersFromBackEnd.sort(function (a, b) {
      if (entry === "username") {
        if (a.username.toLowerCase() > b.username.toLowerCase()) return 1;
        if (a.username.toLowerCase() < b.username.toLowerCase()) return -1;
      } else if (entry === "email") {
        if (a.email.toLowerCase() > b.email.toLowerCase()) return 1;
        if (a.email.toLowerCase() < b.email.toLowerCase()) return -1;
      } else if (entry === "phone") {
        if (a.phone.toLowerCase() > b.phone.toLowerCase()) return 1;
        if (a.phone.toLowerCase() < b.phone.toLowerCase()) return -1;
      }      
      return null
    });

    return null
  };

  const staffWithId = ({ match }) => (
    <Employee
      staff={
        ticketListFromServer.filter(
          (staff) => staff._id === match.params.staffId.toString()
        )[0]
      }
      updateEmployee={updateEmployee}
      isLoading={isLoading}
      errMess={errMess}
    />
  );

  

  const veDoWithId = ({ match }) => (
    <VeDoEdit
      staff={
        veDoList.filter(
          (staff) => staff._id === match.params.veDoId.toString()
        )[0]
      }
      isLoading={isLoading}
      errMess={errMess}
      updateVeDo={updateVeDo}
    />
  );
  
  const userWithId = ({ match }) => (
    <EditUser
      staff={
        usersFromBackEnd.filter(
          (staff) => staff._id === match.params.userId.toString()
        )[0]
      }
      isLoading={isLoading}
      updateUser={updateUser}
      errMess={errMess}
    />
  );
 

  return (
    <div>
      <BrowserRouter>
        <Header userStatus={userStatus} loadUserStatus={loadUserStatus} />

        <Switch>          

          <Route exact='true' path="/">
          <QuanLyVeDo 
          veDoList={veDoList} 
          postVedo={postVedo}
          userStatus={userStatus}
          getSortEntry={(entry) => sortDataEntry(entry)}
          deleteEmployee={deleteVeDo}
          deleteSelectedItem={deleteSelectedVedo}
          />
          </Route>
          <Route exact='true' path="/login">
          <Login
          userStatus={userStatus}
          loadUserStatus={loadUserStatus}
          />
          </Route>
          <Route exact='true' path="/signup">
          <SignUp
          userStatus={userStatus}
          loadUserStatus={loadUserStatus}
          />
          </Route>
          <Route exact='true' path="/vedo/:veDoId">{veDoWithId}</Route>
          <Route exact='true' path="/veso">
            <Staff
              staffs={ticketListFromServer}
              veDoList={veDoList}
              onClick={(selectedID) => selectedEmployee(selectedID)}
              getSortEntry={(entry) => sortDataEntry(entry)}
              deleteEmployee={deleteEmployee}
              deleteSelectedItem={deleteSelectedItem}
              isLoading={isLoading}
              errorMess={errMess}
              userStatus={userStatus}
            />
            </Route>
            <Route exact='true' path="/userprofile">
              <UserProfile
                staffs={ticketListFromServer}
                onClick={(selectedID) => selectedEmployee(selectedID)}
                getSortEntry={(entry) => sortDataEntry(entry)}
                deleteEmployee={deleteEmployee}
                deleteSelectedItem={deleteSelectedItem}
                isLoading={isLoading}
                errorMess={errMess}
                userStatus={userStatus}
              />
              </Route>
          <Route exact='true' path="/admin/user">
            <ManageUser
              staffs={usersFromBackEnd}
              onClick={(selectedID) => selectedEmployee(selectedID)}
              getSortEntry={(entry) => sortDataEntry(entry)}
              deleteEmployee={deleteUser}
              deactivateUser={deactivateUser}
              deleteSelectedItem={deleteSelectedUser}
              isLoading={isLoading}
              errorMess={errMess}
            />
          </Route>
          <Route exact='true' path="/admin/user/:userId">{userWithId}</Route>
          <Route exact='true' path="/veso/:staffId">{staffWithId}</Route>
          <Route path="/search">
            <SearchPage staffs={ticketListFromServer} users={usersFromBackEnd} veDoList={veDoList} userStatus={userStatus} />
          </Route>          
          <Redirect to="/" />          
         
        </Switch>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProp)(MainComponent);
