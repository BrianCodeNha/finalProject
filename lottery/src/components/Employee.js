import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import { Loading } from "./Loading";
import "./Employee.css";
import { updateEmployee } from "../Redux/ActionCreator";
import { connect } from "react-redux";
import { backEndURL } from "../shared/baseUrl";

const mapDispatchToProps = (dispatch) => ({
  // updateEmployee: (editId, Editedemployee) =>
  //   dispatch(updateEmployee(editId, Editedemployee)),
});

export function Employee(props) {
  //truyền data fetch từ server truyền vào props
  

  const EmployeeDetail = () => {

    const [isSubmit, SetIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({ name: "" });
    const data = window.sessionStorage.getItem('vesoData')
    const [vesoData, setVesoData] = useState(props.staff ? props.staff : JSON.parse(data));

    useEffect(() => {
      props.staff !== undefined &&  window.sessionStorage.setItem('vesoData', JSON.stringify(props.staff)); 
      console.log('create sessionStorage')
      setVesoData(JSON.parse(data));       
      
      
    },[])

    const [updatedTicket, setUpdatedTicket] = useState({
      date: vesoData.date,
      number: vesoData.number,
      producer: vesoData.producer,
      userId: vesoData.userId,
      id: vesoData._id,
    });
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
  
      if (!values.number) {
        errors.number = "Yêu cầu nhập";
      } else if (!values.number.match(/^-?\d+\.?\d*$/)) {
        errors.number = "số vé số không hợp lệ";
      }
  
      return errors;
    };

    if (props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (props.errorMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{props.errorMess}</h4>
          </div>
        </div>
      );
    } else if (props.staff != null) {     
            
      const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(updatedTicket));
    SetIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {

      props.updateEmployee(updatedTicket.id, updatedTicket);
    }

      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        return setUpdatedTicket({ ...updatedTicket, [name]: value });
      };

      return (
        <div className="staff row container">
          <MDBBreadcrumb>
            <MDBBreadcrumbItem>
              <Link to="/veso">Quản Lý Vé Số</Link>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem active>{props.staff.number}</MDBBreadcrumbItem>
          </MDBBreadcrumb>
          <div className="col-12 col-md-4 col-lg-3"></div>
          <div className="col-12 col-md-8 col-lg-9">
            <h3>Số vé số: {props.staff.number}</h3>
            <p>
              Đài xổ số: {props.staff.producer}
              <br />
              Ngày xổ Số: {props.staff.date}
              <br />
            </p>
            <h3>KẾT QUẢ XỔ SỐ: {props.staff.result}</h3>
            <hr />
            <h3>Cập nhật thông tin vé số</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="number" className="row container">
                Đài xổ số:
                <input
                  type="text"
                  name="number"
                  value={updatedTicket.number}
                  onChange={(e) => handleChange(e)}
                />
                {formErrors.number && <div style={{ color: "#dc3545" }}>{formErrors.number}</div>}
              </label>
              <label htmlFor="producer" className="row container">
                Đài xổ số:
                <input
                  type="text"
                  name="producer"
                  value={props.staff.producer}
                  onChange={(e) => handleChange(e)}
                />
                {formErrors.producer && <div style={{ color: "#dc3545" }}>{formErrors.producer}</div>}
              </label>
              <label htmlFor="date" className="row container">
                Ngày xổ số:
                <input
                  type="date"
                  name="date"
                  value={props.staff.date}
                  onChange={(e) => handleChange(e)}
                />
                {formErrors.date && <div style={{ color: "#dc3545" }}>{formErrors.date}</div>}
              </label>
              <button type="submit">update</button>
            </form>
          </div>
        </div>
      );
    } else return <div></div>;
  };
  return <EmployeeDetail />;
}

export default connect(null, mapDispatchToProps)(Employee);
