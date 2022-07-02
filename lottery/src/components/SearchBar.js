import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SearchBar.css";
import AddEmployee from "./Modal";
import { connect } from "react-redux";
import { postStaff, postUser, postStaffAdmin} from '../Redux/ActionCreator'
import AddUser from "./AddUser";

const mapDispatchToProp = (dispatch) => ({
    postStaff: (newVeSo) => {
      dispatch(postStaff(newVeSo));
    },
    postStaffAdmin: (newVeSo) => {
      dispatch(postStaffAdmin(newVeSo));
    },
    postUser: (newVeSo) => {
      dispatch(postUser(newVeSo));
    },
})

const mapStateToProps = (state) => ({
    staffList: state.staffList
})


export function SearchBar(props) {
  const [term, setTerm] = useState(props.term);
  const [option, setOption] = useState(""); 

  const history = useHistory();
  console.log('signal', props.signal);
  console.log('term', props.term);

  const handleSubmit = (e) => {
    e.preventDefault();

    history.push(`/search?term=${term}&option=${option}&signal=${props.signal}`);
  };
  return (
    <div className="d-flex justify-content-start">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Tìm kiếm </label>
        <div className="select">
          <select onChange={(e) => setOption(e.target.value)}>
            <option >Chọn</option>
            <option value={(props.signal === 'veso' || props.signal === 'vedo') ? "producer" :  'username'}>{(props.signal === 'veso' || props.signal === 'vedo') ? "Đài" : 'username'}</option>
            <option value={(props.signal === 'veso' || props.signal === 'vedo') ? "number" : 'email'}>{(props.signal === 'veso' || props.signal === 'vedo') ? "Số Vé Số" : 'email'}</option>
            <option value={(props.signal === 'veso' || props.signal === 'vedo') ? "date" : 'phone'}>{(props.signal === 'veso' || props.signal === 'vedo') ? "Ngày Xổ số" : 'phone'}</option>
          </select>
        </div>
        <span>
        
        <input
          onChange={(e) => setTerm(e.target.value.toLowerCase())}
          type={(option === 'date' ) ? 'date' : 'text'}
          id="search"
          value={term}
          className="ps-3"
        />
        {(option === 'date' ) && <button className="btn-primary" type="submit">Lọc</button>}
        </span>
        
        <div className="sort">
          <label>Sort by </label>
          <select onChange={(e) => props.getSortEntry(e.target.value)}>
            <option>Chọn</option>
            <option value={(props.signal === 'veso' || props.signal === 'vedo') ? "producer" : 'username'}>{(props.signal === 'veso' || props.signal === 'vedo') ? 'Tên nhà đài' : 'username'}</option>
            <option value={props.signal === 'veso' ? "number" : props.signal === 'vedo' ? 'producerId': 'email'}>{props.signal === 'veso' ? "number" : props.signal === 'vedo' ? 'producerId': 'email'}</option>
            <option value={(props.signal === 'veso' || props.signal === 'vedo') ? "date" : 'phone'}>{(props.signal === 'veso' || props.signal === 'vedo') ? 'Ngày xổ số' : 'phone'}</option>
          </select>
        </div>
      </form>

      
      {(props.signal === 'vedo') && <div className="my-3 mx-5">
        <AddEmployee 
        postStaff = {props.postStaff}
        postStaffAdmin = {props.postStaffAdmin}
        staffList = {props.staffList}
        userStatus = {props.userStatus}
        signal= 'vedo'
        veDoList= {props.veDoList}
         />
      </div>}
      {(props.signal === 'veso') && <div className="my-3 mx-5">
        <AddEmployee 
        postStaff = {props.postStaff}
        postStaffAdmin = {props.postStaffAdmin}
        staffList = {props.staffList}
        userStatus = {props.userStatus}
        veDoList= {props.veDoList}
         />
      </div>}
      {(props.signal === 'user') && <div className="my-3 mx-5">
        <AddUser 
        postUser={props.postUser}
        userStatus = {props.userStatus}
         />
      </div>}
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProp)(SearchBar);
