import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { STAFFS } from "../shared/staffs";
import ManageUsers from "./ManageUser";
import QuanLyVeDo from "./QuanLyVeDo";
import Staff from "./Staff";

export default function SearchPage({staffs, users, veDoList, userStatus}) {
  //url = /search?q=van
  const queryString = useLocation().search; //object contain property search: ?q=van
  const queryParams = new URLSearchParams(queryString); // chuyển thành object urlsearchparams
  const term = queryParams.get("term"); //get value đầu tiên từ property 'term'/nếu getAll thì sẽ thành 1 array => van
  const signal = queryParams.get("signal"); //get value đầu tiên từ property 'term'/nếu getAll thì sẽ thành 1 array => van
  const option = queryParams.get("option"); // get option value from searchbar
  console.log(term, option, signal);

  const [staffId, setStaffId] = useState(null);

  const selectedEmployee = (selectedID) => {
    setStaffId(selectedID);
  };

  if (signal === 'veso') {return (    
    <Staff
      staffs={staffs.filter(
        (staff) =>
          (option === "producer"
            ? staff.producer + ""
            : option === "number"
            ? staff.number + ""
            : staff.date
          ).toLowerCase().indexOf(term) !== -1
      )}      
      term={term}
      option={option}
      userStatus={userStatus}
      onClick={(selectedID) => selectedEmployee(selectedID)}
    />
  );}
  
  if (signal === 'vedo') {return (    
    <QuanLyVeDo
    veDoList={veDoList.filter(
        (vedo) =>
          (option === "producer"
            ? vedo.producer + ""
            : option === "number"
            ? vedo.number + ""
            : vedo.date
          ).toLowerCase().indexOf(term) !== -1
      )}      
      term={term}
      option={option}
      userStatus={userStatus}
      onClick={(selectedID) => selectedEmployee(selectedID)}
    />
  );}

  if (signal === 'user') {return (    
    <ManageUsers
      staffs={users.filter(
        (staff) =>
          (option === "username"
            ? staff.username + ""
            : option === "phone"
            ? staff.phone + ""
            : staff.email
          ).toLowerCase().indexOf(term) !== -1
      )}      
      term={term}
      option={option}
      userStatus={userStatus}
      onClick={(selectedID) => selectedEmployee(selectedID)}
    />
  );}


}
