import * as ActionTypes from "./ActionTypes";
import { frontEndURL, backEndURL } from "../shared/baseUrl";
import axios from "axios";

export const addNewEmployee = (newEmployee) => ({
  type: ActionTypes.ADD_NEW_EMPLOYEE,
  payload: newEmployee,
});

// add staff to server

export const postStaff = (newVeSo) => (dispatch) => {
  console.log("🚀 ~ file: ActionCreator.js ~ line 13 ~ newVeSo", newVeSo);

  return axios
    .post(backEndURL + "user/ticket", newVeSo)
    .then(
      (response) => {
        console.log(
          "🚀 ~ file: ActionCreator.js ~ line 19 ~ response",
          response.data
        );
        if (response.statusText === "OK") {
          return response;
        } else {
          var err = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          err.response = response;
          throw err;
        }
      },
      (err) => {
        throw err;
      }
    )
    .then((response) => {
      dispatch(addStaff(response.data));
    })
    .catch((err) => {
      console.log("add ve so", err.message);
      alert("loi them ve số Error: " + err.message);
    });
};

export const postUser = (newVeSo) => (dispatch) => {
  console.log("🚀 ~ file: ActionCreator.js ~ line 13 ~ newVeSo", newVeSo);

  return axios
    .post(backEndURL + "user/ticket", newVeSo)
    .then(
      (response) => {
        console.log(
          "🚀 ~ file: ActionCreator.js ~ line 19 ~ response",
          response.data
        );
        if (response.statusText === "OK") {
          return response;
        } else {
          var err = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          err.response = response;
          throw err;
        }
      },
      (err) => {
        throw err;
      }
    )
    .then((response) => {
      dispatch(addStaff(response.data));
    })
    .catch((err) => {
      console.log("add ve so", err.message);
      alert("loi them ve số Error: " + err.message);
    });
};

// DELETE employee

export const deleteEmployee = (id, number, producer) => (dispatch) => {
  return axios
    .delete(`http://localhost:5000/user/ticket/${id}`)
    .then(
      (response) => {
        console.log(response);
        if (response.statusText === "OK") {
          return response;
        } else {
          var err = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          err.response = response;
          throw err;
        }
      },
      (err) => {
        throw err;
      }
    )
    .then((response) => {
      alert(`Đã xoá thành công vé số: ${number} - đài: ${producer}`);
      dispatch(addStaff(response.data));
    })
    .catch((err) => {
      console.log("delete", err.message);
      alert("delete error: " + err.message);
    });
};

export const deleteUser = (id, name , email) => (dispatch) => {
  return axios
    .delete(`http://localhost:5000/admin/user/${id}`)
    .then(
      (response) => {
        console.log(response);
        if (response.statusText === "OK") {
          return response;
        } else {
          var err = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          err.response = response;
          throw err;
        }
      },
      (err) => {
        throw err;
      }
    )
    .then((response) => {
      alert(`Đã xoá thành công user: ${name} - email: ${email}`);
      dispatch(addUser(response.data));
    })
    .catch((err) => {
      console.log("delete user", err.message);
      alert("delete user error: " + err.message);
    });
};

export const deleteSelectedItem = (idList) => (dispatch) => {
  return axios
    .post(`http://localhost:5000/user/ticket/deletemany`, {
      idList: idList,
    })
    .then(
      (response) => {
        console.log(response);
        if (response.statusText === "OK") {
          return response;
        } else {
          var err = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          err.response = response;
          throw err;
        }
      },
      (err) => {
        throw err;
      }
    )
    .then((response) => {
      alert(`Đã xoá thành công những vé số được chọn`);
      dispatch(addStaff(response.data));
    })
    .catch((err) => {
      console.log("delete", err.message);
      alert("delete error: " + err.message);
    });
};

export const deleteSelectedUser = (idList) => (dispatch) => {
  return axios
    .post(`http://localhost:5000/admin/user/deletemany`, {
      idList: idList,
    })
    .then(
      (response) => {
        console.log(response);
        if (response.statusText === "OK") {
          return response;
        } else {
          var err = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          err.response = response;
          throw err;
        }
      },
      (err) => {
        throw err;
      }
    )
    .then((response) => {
      alert(`Đã xoá thành công những users được chọn`);
      dispatch(addUser(response.data));
    })
    .catch((err) => {
      console.log("delete", err.message);
      alert("delete error: " + err.message);
    });
};

// EDIT EMPLOYEE

export const updateEmployee = (id, updatedTicket) => (dispatch) => {
  axios
    .put(backEndURL + `user/ticket`, updatedTicket)
    .then(
      (response) => {
        console.log(response);
        if (response.statusText === "OK") {
          return response;
        } else {
          var err = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          err.response = response;
          throw err;
        }
      },
      (err) => {
        throw err;
      }
    )
    .then((data) => {
      alert(`Đã cập nhật thành công thông tin vé số`);
      dispatch(addStaff(data.data));
    })
    .catch((err) => {
      console.log("updatedEmployee", err.message);
      alert("updatedEmployee error: " + err.message);
    });
};
export const updateUser = (id, updatedUser) => (dispatch) => {
  console.log('updating user')
  axios
    .put(backEndURL + `admin/user/${id}`, updatedUser)
    .then(
      (response) => {
        console.log(response);
        if (response.statusText === "OK") {
          return response;
        } else {
          var err = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          err.response = response;
          throw err;
        }
      },
      (err) => {
        throw err;
      }
    )
    .then((data) => {
      alert(`Đã cập nhật thành công thông tin user ${updatedUser.username}`);
      dispatch(addUser(data.data));
    })
    .catch((err) => {
      console.log("updatedEmployee", err.message);
      alert("updatedEmployee error: " + err.message);
    });
};

// fetch staff from server

export const fetchStaffs = () => (dispatch) => {
  dispatch(staffLoading(true));

  return fetch("http://localhost:5000/user/ticket")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((staff) => dispatch(addStaff(staff)))
    .catch((error) => dispatch(staffLoadingFailed(error.message)));
};

export const fetchUsers = () => (dispatch) => {
  dispatch(staffLoading(true));

  return fetch("http://localhost:5000/admin/user")
    .then(
      (response) => {
      console.log("🚀 ~ file: ActionCreator.js ~ line 176 ~ fetchUsers ~ response", response)
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((users) => dispatch(addUser(users)))
    .catch((error) => dispatch(staffLoadingFailed(error.message)));
};

// fetch vedo from server

export const fetchVeDo = (veDoList) => (dispatch) => {
  dispatch(staffLoading(true));
  return dispatch(addVeDo(veDoList));
};

export const addVeDo = (veDoList) => ({
  type: ActionTypes.LOAD_VEDO,
  payload: veDoList,
});

export const addStaff = (staff) => ({
  type: ActionTypes.LOAD_STAFFS,
  payload: staff,
});

export const addUser = (users) => ({
  type: ActionTypes.LOAD_USERS,
  payload: users,
});

export const staffLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const staffLoadingFailed = (errMess) => ({
  type: ActionTypes.STAFFS_LOADING_FAILED,
  payload: errMess,
});

// fetch departments from the server

export const fetchDepartments = () => (dispatch) => {
  return fetch(backEndURL + "departments")
    .then((Response) => Response.json())
    .then((deparments) => dispatch(loadDepartments(deparments)));
};

export const loadDepartments = (departments) => ({
  type: ActionTypes.LOAD_DEPARTMENTS,
  payload: departments,
});

// fetch staff salary

export const fetchSalary = () => (dispatch) => {
  return fetch(backEndURL + "staffsSalary")
    .then((response) => response.json())
    .then((staffSalary) => dispatch(loadStaffSalary(staffSalary)));
};

export const loadStaffSalary = (staffSalary) => ({
  type: ActionTypes.LOAD_STAFF_SALARY,
  payload: staffSalary,
});
