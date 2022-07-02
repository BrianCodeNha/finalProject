import React, { useState } from "react";
import dateFormat from 'dateformat'
import {Link} from 'react-router-dom'
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import {Loading} from './Loading'
import './Employee.css'
import { updateEmployee } from "../Redux/ActionCreator";
import { connect } from "react-redux";
import { InputGroup } from "react-bootstrap";

const mapDispatchToProps = (dispatch) => ({
  updateEmployee: (editId, Editedemployee) => dispatch(updateEmployee(editId, Editedemployee))
})

export function VeDoEdit(props) { //truyền data fetch từ server truyền vào props     

  const EmployeeDetail = () => {
    const [updateVeDo, setUpdateVedo] = useState({
      id: props.staff._id,
      date: props.staff.date,
      producer: props.staff.producer,
      producerId: props.staff.producerId,
      giaiBa1: props.staff.prize.rewardNumbers.giaiBa.giaiBa1,
      giaiBa2: props.staff.prize.rewardNumbers.giaiBa.giaiBa2,
      giaiBay: props.staff.prize.rewardNumbers.giaiBay,
      giaiDB: props.staff.prize.rewardNumbers.giaiDB,
      giaiNam: props.staff.prize.rewardNumbers.giaiNam,
      giaiNhat: props.staff.prize.rewardNumbers.giaiNhat,
      giaiNhi: props.staff.prize.rewardNumbers.giaiNhi,
      giaiSau1: props.staff.prize.rewardNumbers.giaiSau.giaiSau1,
      giaiSau2: props.staff.prize.rewardNumbers.giaiSau.giaiSau2,
      giaiSau3: props.staff.prize.rewardNumbers.giaiSau.giaiSau3,
      giaiTam: props.staff.prize.rewardNumbers.giaiTam,
      giaiTu1: props.staff.prize.rewardNumbers.giaiTu.giaiTu1,
      giaiTu2: props.staff.prize.rewardNumbers.giaiTu.giaiTu2,
      giaiTu3: props.staff.prize.rewardNumbers.giaiTu.giaiTu3,
      giaiTu4: props.staff.prize.rewardNumbers.giaiTu.giaiTu4,
      giaiTu5: props.staff.prize.rewardNumbers.giaiTu.giaiTu5,
      giaiTu6: props.staff.prize.rewardNumbers.giaiTu.giaiTu6,
      giaiTu7: props.staff.prize.rewardNumbers.giaiTu.giaiTu7,
    });
    console.log("🚀 ~ file: VeDoEdit.js ~ line 19 ~ EmployeeDetail ~ updateVedo", updateVeDo)

    if (props.isLoading){
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      )
    } else if ( props.errorMess){
      return (
        <div className="container">
        <div className="row">
        <h4>{props.errorMess}</h4>
        </div>
        </div>
      )
    }else if (props.staff != null){     
    console.log("🚀 ~ file: VeDoEdit.js ~ line 35 ~ EmployeeDetail ~ props.staff", props.staff)    

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(updateVeDo)
       props.updateVeDo(updateVeDo.id, updateVeDo);
      }
      
      const handleChange = (e) => {
        const {name, value} = e.target;
       return setUpdateVedo({...updateVeDo,[name]: value}) 
      }
 
      return (
        <div className="staff row container">
        <MDBBreadcrumb>
            <MDBBreadcrumbItem>
              <Link to='/veso'>Quản Lý Vé Dò</Link>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem active>{props.staff.producer}</MDBBreadcrumbItem>
          </MDBBreadcrumb>
          <div className="col-12 col-md-4 col-lg-3">
            
          </div>
          <div className="col-12 col-md-8 col-lg-9">         
          <p>          
          Đài xổ số: {props.staff.producer}<br />             
          Ngày xổ Số: {props.staff.date.split('-').reverse().join('-')}<br />             
          </p>
          <h3>KẾT QUẢ XỔ SỐ: {props.staff.result}</h3>
          <hr/>
           <h3>Cập nhật thông tin vé số</h3>
           <form className='p-2' onSubmit={handleSubmit}>           
           <label htmlFor="producer" className="row container">Đài xổ số: 
           <input className="form-control" type='text' name='producer' value={updateVeDo.producer}  onChange={(e) => handleChange(e)} />
           </label>                     
           <label htmlFor="date" className="row container">Ngày xổ số: {updateVeDo.date.split('-').reverse().join('-')}
           <input className="form-control" type='date' name='date' value={updateVeDo.date}  onChange={(e) => handleChange(e)} />
           </label>     
           <br />
           <h4>Cơ Cấu Giải Thưởng</h4>   
           <label htmlFor="giaiDB" className="my-3" >
                  Giải Đặc Biệt: 
                  </label>
                  <input
                    value={updateVeDo.giaiDB}
                    onChange={(e) => handleChange(e)}
                    type="text"                    
                    name="giaiDB"
                    id="giaiDB"
                    maxLength={6}
                    margin="2px"
                    className="form-control"
                  />
                  
                  <label htmlFor="giaiNhat" className="my-3">
                  Giải Nhất: 
                  </label>
                  <input
                  value={updateVeDo.giaiNhat}
                  onChange={(e) => handleChange(e)}
                    type="text"
                    name="giaiNhat"
                    id="giaiNhat"
                    maxLength={5}
                    margin="2px"
                    className="form-control"
                  />
                  <label htmlFor="giaiNhi" className="my-3">
                  Giải nhì: 
                  </label>
                  <input
                  value={updateVeDo.giaiNhi}
                  onChange={(e) => handleChange(e)}
                    type="text"
                    name="giaiNhi"
                    id="giaiNhi"
                    maxLength={5}
                    margin="2px"
                    className="form-control"
                  />
                  
                  <InputGroup className="my-3">
                  <label >
                  Giải Ba: 
                  </label>
                    <input
                    value={updateVeDo.giaiBa1}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiBa1"
                      id="giaiBa1"
                      maxLength={5}
                      className="form-control"
                    />
                    <input
                    value={updateVeDo.giaiBa2}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiBa2"
                      id="giaiBa2"
                      maxLength={5}
                      className="form-control"
                    />
                  </InputGroup>
                  <label >
                  Giải Tư: 
                  </label>
                  <InputGroup className="my-3 ms-3">                
                    <input
                    value={updateVeDo.giaiTu1}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiTu1"
                      id="giaiTu1"
                      maxLength={5}
                      className="form-control"
                    />
                    <input
                    value={updateVeDo.giaiTu2}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiTu2"
                      id="giaiTu2"
                      maxLength={5}
                      className="form-control"
                    />
                    <input
                    value={updateVeDo.giaiTu3}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiTu3"
                      id="giaiTu3"
                      maxLength={5}
                      className="form-control"
                    />
                    <input
                    value={updateVeDo.giaiTu4}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiTu4"
                      id="giaiTu4"
                      maxLength={5}
                      className="form-control"
                    />
                    <input
                    value={updateVeDo.giaiTu5}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiTu5"
                      id="giaiTu5"
                      maxLength={5}
                      className="form-control"
                    />
                    <input
                    value={updateVeDo.giaiTu6}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiTu6"
                      id="giaiTu6"
                      maxLength={5}
                      className="form-control"
                    />
                    <input
                    value={updateVeDo.giaiTu7}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiTu7"
                      id="giaiTu7"
                      maxLength={5}
                      className="form-control"
                    />
                  </InputGroup>
                  <label >
                  Giải Năm: 
                  </label>                 
                  <input
                  value={updateVeDo.giaiNam}
                  onChange={(e) => handleChange(e)}
                    type="text"
                    name="giaiNam"
                    id="giaiNam"
                    maxLength={4}
                    className="form-control"
                  />
                  <br />
                  <label >
                  Giải Sáu: 
                  </label>
                  <InputGroup className="my-3 ms-3">                  
                    <input
                    value={updateVeDo.giaiSau1}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiSau1"
                      id="giaiSau1"
                      maxLength={4}
                      className="form-control"
                    />
                    <input
                    value={updateVeDo.giaiSau2}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiSau2"
                      id="giaiSau2"
                      maxLength={4}
                      className="form-control"
                    />
                    <input
                    value={updateVeDo.giaiSau3}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiSau3"
                      id="giaiSau3"
                      maxLength={4}
                      className="form-control"
                    />
                  </InputGroup>
                  
                  <label htmlFor="giaiDB" className="my-3" >
                  Giải Bảy: 
                  </label>
                    <input
                    value={updateVeDo.giaiBay}
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiBay"
                      id="giaiBay"
                      maxLength={3}
                      className="form-control"
                    />
                   <label htmlFor="giaiDB" className="my-3" >
                  Giải Tám: 
                  </label>
                    <input
                    value={updateVeDo.giaiTam}
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiTam"
                      id="giaiTam"
                      maxLength={2}
                      className="form-control"
                    />
                  <br />
                
           <button className="btn btn-warning"type="submit">update</button>
           </form>
          </div>
        </div>
      );}
      else return <div></div>;
  
    }
    return <EmployeeDetail />;
  }


export default connect(null,mapDispatchToProps)(VeDoEdit);
