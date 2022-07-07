import React, { useEffect, useState } from "react";
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

    const [isSubmit, SetIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const data = window.sessionStorage.getItem('vedoData')
    const [vedoData, setVedoData] = useState(props.staff ? props.staff : JSON.parse(data));

    useEffect(() => {
      props.staff !== undefined &&  window.sessionStorage.setItem('vedoData', JSON.stringify(props.staff)); 
      console.log('create localStorage')
      setVedoData(JSON.parse(data));                      
    },[])
    
 
    const [updateVeDo, setUpdateVedo] = useState({
      id: vedoData._id,
      date: vedoData.date,
      producer: vedoData.producer,
      producerId: vedoData.producerId,
      giaiBa1: vedoData.prize.rewardNumbers.giaiBa.giaiBa1,
      giaiBa2: vedoData.prize.rewardNumbers.giaiBa.giaiBa2,
      giaiBay: vedoData.prize.rewardNumbers.giaiBay,
      giaiDB: vedoData.prize.rewardNumbers.giaiDB,
      giaiNam: vedoData.prize.rewardNumbers.giaiNam,
      giaiNhat: vedoData.prize.rewardNumbers.giaiNhat,
      giaiNhi: vedoData.prize.rewardNumbers.giaiNhi,
      giaiSau1: vedoData.prize.rewardNumbers.giaiSau.giaiSau1,
      giaiSau2: vedoData.prize.rewardNumbers.giaiSau.giaiSau2,
      giaiSau3: vedoData.prize.rewardNumbers.giaiSau.giaiSau3,
      giaiTam: vedoData.prize.rewardNumbers.giaiTam,
      giaiTu1: vedoData.prize.rewardNumbers.giaiTu.giaiTu1,
      giaiTu2: vedoData.prize.rewardNumbers.giaiTu.giaiTu2,
      giaiTu3: vedoData.prize.rewardNumbers.giaiTu.giaiTu3,
      giaiTu4: vedoData.prize.rewardNumbers.giaiTu.giaiTu4,
      giaiTu5: vedoData.prize.rewardNumbers.giaiTu.giaiTu5,
      giaiTu6: vedoData.prize.rewardNumbers.giaiTu.giaiTu6,
      giaiTu7: vedoData.prize.rewardNumbers.giaiTu.giaiTu7,
    });
    console.log("🚀 ~ file: VeDoEdit.js ~ line 19 ~ EmployeeDetail ~ updateVedo", updateVeDo)
    

    const validate = (values) => {
      const errors = {};
  
      if (!values.producer) {
        errors.producer = "Yêu cầu nhập";
      } else if (values.producer.length < 3) {
        errors.producer = "Yêu cầu tối thiểu 2 ký tự";
      }
  
      if (!values.date) {
        errors.date = "Yêu cầu nhập";
      }
  
      if (!values.giaiDB) {
        errors.giaiDB = "Yêu cầu nhập";
      } else if (!values.giaiDB.match(/^-?\d+\.?\d*$/)) {
        errors.giaiDB = "số vé số không hợp lệ";
      }
  
      if (!values.giaiNhat) {
        errors.giaiNhat = "Yêu cầu nhập";
      } else if (!values.giaiNhat.match(/^-?\d+\.?\d*$/)) {
        errors.giaiNhat = "số vé số không hợp lệ";
      }
  
      if (!values.giaiNhi) {
        errors.giaiNhi = "Yêu cầu nhập";
      } else if (!values.giaiNhi.match(/^-?\d+\.?\d*$/)) {
        errors.giaiNhi = "số vé số không hợp lệ";
      }
  
      if (!values.giaiBa1 || !values.giaiBa2) {
        errors.giaiBa = "Yêu cầu nhập";
      } else if (!values.giaiBa1.match(/^-?\d+\.?\d*$/) || !values.giaiBa2.match(/^-?\d+\.?\d*$/)) {
        errors.giaiBa = "số vé số không hợp lệ";
      }
  
      if (!values.giaiTu1 || !values.giaiTu2 || !values.giaiTu3 || !values.giaiTu4 || !values.giaiTu5 || !values.giaiTu6 || !values.giaiTu7) {
        errors.giaiTu = "Yêu cầu nhập";
      } else if (!values.giaiTu1.match(/^-?\d+\.?\d*$/) || !values.giaiTu2.match(/^-?\d+\.?\d*$/) || !values.giaiTu3.match(/^-?\d+\.?\d*$/) || !values.giaiTu4.match(/^-?\d+\.?\d*$/) || !values.giaiTu5.match(/^-?\d+\.?\d*$/) || !values.giaiTu6.match(/^-?\d+\.?\d*$/) || !values.giaiTu7.match(/^-?\d+\.?\d*$/)) {
        errors.giaiTu = "số vé số không hợp lệ";
      }
  
      if (!values.giaiNam) {
        errors.giaiNam = "Yêu cầu nhập";
      } else if (!values.giaiNam.match(/^-?\d+\.?\d*$/)) {
        errors.giaiNam = "số vé số không hợp lệ";
      }
      
      if (!values.giaiSau1 || !values.giaiSau2 || !values.giaiSau3) {
        errors.giaiSau = "Yêu cầu nhập";
      } else if (!values.giaiSau1.match(/^-?\d+\.?\d*$/) || !values.giaiSau2.match(/^-?\d+\.?\d*$/) || !values.giaiSau3.match(/^-?\d+\.?\d*$/)) {
        errors.giaiSau = "số vé số không hợp lệ";
      }
      
      if (!values.giaiBay) {
        errors.giaiBay = "Yêu cầu nhập";
      } else if (!values.giaiBay.match(/^-?\d+\.?\d*$/)) {
        errors.giaiBay = "số vé số không hợp lệ";
      }
      
      if (!values.giaiTam) {
        errors.giaiTam = "Yêu cầu nhập";
      } else if (!values.giaiTam.match(/^-?\d+\.?\d*$/)) {
        errors.giaiTam = "số vé số không hợp lệ";
      }
  
  
      SetIsSubmit(true);  
      return errors;
    };

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
        setFormErrors(validate(updateVeDo));
    console.log("🚀 ~ file: QuanLyVeDo.js ~ line 64 ~ handleSubmit ~ isSubmit", isSubmit)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      props.updateVeDo(updateVeDo.id, updateVeDo);
    }

       
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
           {formErrors.producer && <div style={{ color: "#dc3545" }}>{formErrors.producer}</div>}
           </label>                     
           <label htmlFor="date" className="row container">Ngày xổ số: {updateVeDo.date.split('-').reverse().join('-')}
           <input className="form-control" type='date' name='date' value={updateVeDo.date}  onChange={(e) => handleChange(e)} />
           {formErrors.date && <div style={{ color: "#dc3545" }}>{formErrors.date}</div>}
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
           {formErrors.giaiDB && <div style={{ color: "#dc3545" }}>{formErrors.giaiDB}</div>}
                  
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
           {formErrors.giaiNhat && <div style={{ color: "#dc3545" }}>{formErrors.giaiNhat}</div>}

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
           {formErrors.giaiNhi && <div style={{ color: "#dc3545" }}>{formErrors.giaiNhi}</div>}
                  
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
           {formErrors.giaiBa1 && <div style={{ color: "#dc3545" }}>{formErrors.giaiBa1}</div>}

                    <input
                    value={updateVeDo.giaiBa2}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiBa2"
                      id="giaiBa2"
                      maxLength={5}
                      className="form-control"
                    />
           {formErrors.giaiBa2 && <div style={{ color: "#dc3545" }}>{formErrors.giaiBa2}</div>}

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
           {formErrors.giaiTu1 && <div style={{ color: "#dc3545" }}>{formErrors.giaiTu1}</div>}

                    <input
                    value={updateVeDo.giaiTu2}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiTu2"
                      id="giaiTu2"
                      maxLength={5}
                      className="form-control"
                    />
           {formErrors.giaiTu2 && <div style={{ color: "#dc3545" }}>{formErrors.giaiTu2}</div>}

                    <input
                    value={updateVeDo.giaiTu3}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiTu3"
                      id="giaiTu3"
                      maxLength={5}
                      className="form-control"
                    />
           {formErrors.giaiTu3 && <div style={{ color: "#dc3545" }}>{formErrors.giaiTu3}</div>}

                    <input
                    value={updateVeDo.giaiTu4}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiTu4"
                      id="giaiTu4"
                      maxLength={5}
                      className="form-control"
                    />
           {formErrors.giaiTu4 && <div style={{ color: "#dc3545" }}>{formErrors.giaiTu4}</div>}

                    <input
                    value={updateVeDo.giaiTu5}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiTu5"
                      id="giaiTu5"
                      maxLength={5}
                      className="form-control"
                    />
           {formErrors.giaiTu5 && <div style={{ color: "#dc3545" }}>{formErrors.giaiTu5}</div>}

                    <input
                    value={updateVeDo.giaiTu6}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiTu6"
                      id="giaiTu6"
                      maxLength={5}
                      className="form-control"
                    />
           {formErrors.giaiTu6 && <div style={{ color: "#dc3545" }}>{formErrors.giaiTu6}</div>}

                    <input
                    value={updateVeDo.giaiTu7}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiTu7"
                      id="giaiTu7"
                      maxLength={5}
                      className="form-control"
                    />
           {formErrors.giaiTu7 && <div style={{ color: "#dc3545" }}>{formErrors.giaiTu7}</div>}
                    
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
           {formErrors.giaiNam && <div style={{ color: "#dc3545" }}>{formErrors.giaiNam}</div>}
                  
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
           {formErrors.giaiSau1 && <div style={{ color: "#dc3545" }}>{formErrors.giaiSau1}</div>}

                    <input
                    value={updateVeDo.giaiSau2}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiSau2"
                      id="giaiSau2"
                      maxLength={4}
                      className="form-control"
                    />
           {formErrors.giaiSau2 && <div style={{ color: "#dc3545" }}>{formErrors.giaiSau2}</div>}

                    <input
                    value={updateVeDo.giaiSau3}
                    onChange={(e) => handleChange(e)}
                      type="text"
                      name="giaiSau3"
                      id="giaiSau3"
                      maxLength={4}
                      className="form-control"
                    />
           {formErrors.giaiSau3 && <div style={{ color: "#dc3545" }}>{formErrors.giaiSau3}</div>}

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
           {formErrors.giaiBay && <div style={{ color: "#dc3545" }}>{formErrors.giaiBay}</div>}

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
           {formErrors.giaiTam && <div style={{ color: "#dc3545" }}>{formErrors.giaiTam}</div>}

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
