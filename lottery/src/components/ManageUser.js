import React from "react";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";

import SearchBar from "./SearchBar";
//styles
import "./staff.css";
import { useState } from "react";
// transition animation
import { FadeTransform } from "react-animation-components";
import DeleteModal from "./DeleteModal";
import DeleteModalMany from "./DeleteModalMany";
import Switch from "react-switch";

export default function ManageUsers(props) {
  const [pageSize, setSize] = useState("20");
  const [pageNumber, setPageNumber] = useState("1");
  const [deleteList, setDeleteList] = useState([]);

  const onSelectDelete = (e) => {
    if (e.target.checked) {
      return setDeleteList([...deleteList, e.target.value]);
    } else {
      return setDeleteList((pre) =>
        pre.filter((item) => item !== e.target.value)
      );
    }
  };

  const paginate = (array, pageSize, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  const numberOfPage =
    Math.floor(props.staffs.length / (pageSize * 1)) +
    (props.staffs.length % (pageSize * 1) > 0 ? 1 : 0);

  const numberArr = (n) => {
    let arr = [];
    while (n > 0) {
      arr.push(n);
      n = n - 1;
    }
    return arr.reverse();
  };

  const pages = numberArr(numberOfPage);

  const paginateStaffs = paginate(props.staffs, pageSize, pageNumber);

  const staffDetail = paginateStaffs.map((staff) => (
    <div key={staff._id} className="outer justify-content-center">
      <div className="item row">
        <FadeTransform
          in
          transformProps={{
            exitTransform: "scale(0.5) translateY(-50%)",
          }}
        >
          <div
            onClick={() => props.onClick(staff.id)}
            style={{
              backgroundColor: "#EBEBEB",
              borderRadius: "25px",
              textAlign: "left",
              padding: "10px",
            }}
            className='row'
          >
            <div className="col-2 btn-group mx-3">
            <div>
              <input
                onClick={onSelectDelete}
                disabled={staff.role === "admin" && true}
                type="checkbox"
                className="btn-check"
                id={staff._id}
                value={staff._id}
              />
              <label className="btn btn-outline-danger py-2 px-1 my-2" htmlFor={staff._id}>
                chọn
              </label>
              </div>

              <Switch
                checked={staff.active}
                onChange={() =>
                  props.deactivateUser(staff._id, { active: !staff.active })
                }
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={15}
                uncheckedIcon={false}
                checkedIcon={false}                
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={30}
                className="me-2 my-3"
              />
            
              <DeleteModal
                staff={staff}
                deleteEmployee={props.deleteEmployee}
                signal="user"
                role={staff.role}
              />
            </div>
            <Link className='col-8' exact="true" to={`/admin/user/${staff._id}`}>
            <span className='row my-2' >
              <span className="col-3 ">
                {" "}
                <strong>username: </strong> {staff.username}{" "}
              </span>
              <span className="col-4 ">
                {" "}
                <strong>Email: </strong> {staff.email}{" "}
              </span>
              <span className="col-3 ">
                {" "}
                <strong>Phone: </strong> {staff.phone}{" "}
              </span>
              <span className="col-2 ">
                {" "}
                <strong>Role: </strong> {staff.role}{" "}
              </span>
              </span>
            </Link>
          </div>
        </FadeTransform>
        <div className="row">
          <div
            className=""
            role="group"
            aria-label="Basic checkbox toggle button group"
          ></div>
        </div>
      </div>
    </div>
  ));

  if (props.isLoading) {
    return <Loading />;
  } else if (props.errMess) {
    return <h4>{props.errMess}</h4>;
  } else {
    return (
      <div className="row cod-flex p-2 mx-5">
        <SearchBar
          getSortEntry={(entry) => props.getSortEntry(entry)}
          signal="user"
          term={props.term}
          option={props.option}
          postStaff={props.postStaff}
          userStatus={props.userStatus}
        />
        <div>
          <section className="pagination d-flex justify-content-center">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setPageNumber(page)}
                className="mx-2"
              >
                {page}
              </button>
            ))}

            <form action="#">
              <div className="input-group">
                <select onChange={(e) => setSize(e.target.value)}>
                  <option>20</option>
                  <option>10</option>
                  <option>5</option>
                </select>
                <button type="submit">select</button>
              </div>
            </form>
            {deleteList.length > 0 && (
              <DeleteModalMany
                setDeleteList={setDeleteList}
                deleteList={deleteList}
                deleteSelectedItem={props.deleteSelectedItem}
              />
            )}
          </section>
        </div>
        {staffDetail}
      </div>
    );
  }
}
