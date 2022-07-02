import React, { useEffect, useState } from "react";
import { Button, InputGroup, Modal } from "react-bootstrap";
import { FadeTransform } from "react-animation-components";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import DeleteModal from "./DeleteModal";
import DeleteModalMany from "./DeleteModalMany";

function QuanLyVeDo(props) {
  console.log("🚀 ~ file: QuanLyVeDo.js ~ line 8 ~ QuanLyVeDo ~ props", props)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [producer, setProducer] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [isSubmit, SetIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  console.log("🚀 ~ file: QuanLyVeDo.js ~ line 21 ~ QuanLyVeDo ~ formErrors", formErrors)

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


  const [pageSize, setSize] = useState("20");
  const [pageNumber, setPageNumber] = useState("1");


  const [deleteList, setDeleteList] = useState([]);
  const [newVeDo, setNewVeDo] = useState({});
  console.log("🚀 ~ file: QuanLyVeDo.js ~ line 52 ~ QuanLyVeDo ~ newVeDo", newVeDo)


  const handleChange = (e) => {
    const { name, value} = e.target;
    setNewVeDo({...newVeDo, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(newVeDo));
    console.log("🚀 ~ file: QuanLyVeDo.js ~ line 64 ~ handleSubmit ~ isSubmit", isSubmit)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleClose();
      props.postVedo(newVeDo)     
      setNewVeDo({});
      setFormErrors({})
    SetIsSubmit(false);  

    }

  }

  const onSelectDelete = (e) => {
    if (e.target.checked) {
      return setDeleteList([...deleteList, e.target.value]);
    } else {
      return setDeleteList((pre) =>
        pre.filter((item) => item !== e.target.value)
      );
    }
  };  

  const [veDoList, setVeDoList] = useState([]);  
  console.log("🚀 ~ file: QuanLyVeDo.js ~ line 18 ~ QuanLyVeDo ~ veDoList", veDoList)  

  // chi tiet ve do
  useEffect(() =>{
    setLoading(true);
    if (props.veDoList != null){
      setVeDoList(props.veDoList);
      setLoading(false);
    }
  },[props.veDoList])

  const paginate = (array, pageSize, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  const paginateVeDoList = paginate(veDoList, pageSize, pageNumber);


  const numberOfPage =
    Math.floor(veDoList.length / (pageSize * 1)) +
    (veDoList.length % (pageSize * 1) > 0 ? 1 : 0);

  const numberArr = (n) => {
      let arr = [];
      while (n > 0) {
        arr.push(n);
        n = n - 1;
      }
      return arr.reverse();
    };

  const pages = numberArr(numberOfPage);

  const veDoDetails = paginateVeDoList.map((staff) => (
    <div
      key={staff._id}
      className="outer col-12 col-md-12 col-lg-6 justify-content-center"
      style={{ padding: "20px" }}
    >
      <div className="item">
        <FadeTransform
          in
          transformProps={{
            exitTransform: "scale(0.5) translateY(-50%)",
          }}
        >
          <Link exact='true' to={`/${props.userStatus.role === 'admin' ? ('vedo/' + staff._id) : '#' }`}>
            <div
              style={{
                backgroundColor: "#EBEBEB",
                borderRadius: "25px",
                height: "auto",
                width: "100%",
                textAlign: "left",
                padding: "25px",
              }}
            >
              <strong>Đài: </strong> {staff.producer + " "}
              <strong>- Mã Đài: </strong> {staff.producerId + " "}
              <strong> Ngày xổ số: </strong> {staff.date.split('-').reverse().join('-')}
              <br />
              <h4>Cơ Cấu Giải Thưởng </h4>
              <div className="row" style={{border: '1px solid'}}>
                <div className="col-4">
                  <strong>Giải Đặc Biệt: </strong>
                </div>
                <div className="col-8">{staff.prize.rewardNumbers.giaiDB}</div>
              </div>
              <div className="row" style={{border: '1px solid'}}>
                <div className="col-4">
                  <strong>Giải Nhất: </strong>
                </div>
                <div className="col-8">{staff.prize.rewardNumbers.giaiNhat}</div>
              </div>
              <div className="row" style={{border: '1px solid'}}>
                <div className="col-4">
                  <strong>Giải Nhì: </strong>
                </div>
                <div className="col-8">{staff.prize.rewardNumbers.giaiNhi}</div>
              </div>
              <div className="row" style={{border: '1px solid'}}>
                <div className="col-4">
                  <strong>Giải Ba: </strong>
                </div>
                <div className="col-8">{staff.prize.rewardNumbers.giaiBa.giaiBa1 + " - " + staff.prize.rewardNumbers.giaiBa.giaiBa2}</div>
              </div>
              <div className="row" style={{border: '1px solid'}}>
                <div className="col-4">
                  <strong>Giải Tư: </strong>
                </div>
                <div className="col-8">{staff.prize.rewardNumbers.giaiTu.giaiTu1 + " - " + staff.prize.rewardNumbers.giaiTu.giaiTu2 + " - " + staff.prize.rewardNumbers.giaiTu.giaiTu3 + " - " + staff.prize.rewardNumbers.giaiTu.giaiTu4 + " - " + staff.prize.rewardNumbers.giaiTu.giaiTu5 + " - " + staff.prize.rewardNumbers.giaiTu.giaiTu6 + " - " + staff.prize.rewardNumbers.giaiTu.giaiTu7}</div>
              </div>
              <div className="row" style={{border: '1px solid'}}>
                <div className="col-4">
                  <strong>Giải Năm: </strong>
                </div>
                <div className="col-8">{staff.prize.rewardNumbers.giaiNam}</div>
              </div>
              <div className="row" style={{border: '1px solid'}}>
                <div className="col-4">
                  <strong>Giải Sáu: </strong>
                </div>
                <div className="col-8">{staff.prize.rewardNumbers.giaiSau.giaiSau1 + " - " + staff.prize.rewardNumbers.giaiSau.giaiSau2  + " - " + staff.prize.rewardNumbers.giaiSau.giaiSau3}</div>
              </div>
              <div className="row" style={{border: '1px solid'}}>
                <div className="col-4">
                  <strong>Giải Bảy: </strong>
                </div>
                <div className="col-8">{staff.prize.rewardNumbers.giaiBay}</div>
              </div>
              <div className="row" style={{border: '1px solid'}}>
                <div className="col-4">
                  <strong>Giải Tám: </strong>
                </div>
                <div className="col-8">{staff.prize.rewardNumbers.giaiTam}</div>
              </div>
            </div>
          </Link>
        </FadeTransform>
        {props.userStatus.role === 'admin' && <div className="row"> 
          <div
            className="btn-group w-50 mx-auto"
            role="group"
            aria-label="Basic checkbox toggle button group"
          >
            <input
              onClick={onSelectDelete}
              type="checkbox"
              className="btn-check col"
              id={staff._id}
              value={staff._id}
            />
            <label className="btn btn-outline-danger my-2 w-25 px-1" htmlFor={staff._id}>
              Select
            </label>
            <DeleteModal staff={staff} deleteEmployee={props.deleteEmployee} signal='vedo' />
          </div>
        </div>}
        {/*<div className="row">
          {props.userStatus.role === 'admin' && <button
            onClick={() => props.deleteEmployee(staff._id, staff.date, staff.producer)}
            className="col info"
          >
            Delete
          </button>}
            </div>*/}
      </div>
    </div>
  ));

  // render ra giao dien
  return (
    <div>
      <div
        className="headerBar"
        style={{
          backgroundColor: "#F0F0F0",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div className="header" style={{ padding: "20px" }}>
          <span style={{ fontSize: "30px", textAlign: "center" }}>
            Quản Lý Thông Tin Vé Dò
          </span>{" "}
          <br />

      {props.userStatus.role === "admin" && <>
            <Button variant="primary" onClick={handleShow}>
            Thêm Thông tin vé dò
          </Button>
          <Modal show={show} onHide={handleClose}>
          <form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Thêm Vé Dò Mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="producer" className="row container form-label">
                  Đài xổ số:
                  <select
                    name="producer"
                    onChange={(e) => {
                      handleChange(e);
                      setProducer(e.target.value)
                    }}
                    className="form-select"
                  >
                    <option>Chọn nhà đài xổ số</option>
                    <option>An Giang</option>
                    <option>Vĩnh Long</option>
                    <option>Bình Dương</option>
                    <option>Bình Thuận</option>
                    <option>Tây Ninh</option>
                  </select>
                  {formErrors.producer && <div style={{ color: "#dc3545" }}>{formErrors.producer}</div>}
                </label>                
                <label htmlFor="date" className="row container form-label">
                  Ngày xổ số:
                  <input type="date" name="date" onChange={handleChange} className='form-control' />
                  {formErrors.date && <div style={{ color: "#dc3545" }}>{formErrors.date}</div>}
                </label>
                <label htmlFor="giaiDB" className="row container form-label">
                  Các Số trúng giải thưởng:
                  <InputGroup style={{ padding: "10px" }}>
                  <input
                    placeholder="giải đặc biệt"
                    type="text"
                    name="giaiDB"
                    id="giaiDB"
                    maxlength={6}
                    margin="2px"
                    onChange={handleChange}
                    className='form-control'
                  />                                 
                  </InputGroup>
                  {formErrors.giaiDB && <div style={{ color: "#dc3545" }}>{formErrors.giaiDB}</div>}
                  <InputGroup style={{ padding: "10px" }}>
                  <input
                    placeholder="giải nhất"
                    type="text"
                    name="giaiNhat"
                    id="giaiNhat"
                    maxlength={5}
                    margin="2px"
                    onChange={handleChange}
                    className='form-control'
                  />
                  </InputGroup>
                  {formErrors.giaiNhat && <div style={{ color: "#dc3545" }}>{formErrors.giaiNhat}</div>}

                  <InputGroup style={{ padding: "10px" }}>
                  <input
                    placeholder="giải nhì"
                    type="text"
                    name="giaiNhi"
                    id="giaiNhi"
                    maxlength={5}
                    margin="2px"
                    onChange={handleChange}
                    className='form-control'
                  />
                  </InputGroup>                 
                  {formErrors.giaiNhi && <div style={{ color: "#dc3545" }}>{formErrors.giaiNhi}</div>}                  
                                    
                  <InputGroup style={{ padding: "10px" }}>
                    <input
                      placeholder="giải ba 1"
                      type="text"
                      name="giaiBa1"
                      id="giaiBa1"
                      maxlength={5}
                      onChange={handleChange}
                      className='form-control'
                    />
                    <input
                      placeholder="giải ba 2"
                      type="text"
                      name="giaiBa2"
                      id="giaiBa2"
                      maxlength={5}
                      onChange={handleChange}
                      className='form-control'
                    />
                  </InputGroup>
                  {formErrors.giaiBa && <div style={{ color: "#dc3545" }}>{formErrors.giaiBa}</div>}                  

                  <InputGroup style={{ padding: "10px" }}>
                    <input
                      placeholder="giải tư 1"
                      type="text"
                      name="giaiTu1"
                      id="giaiTu1"
                      maxlength={5}
                      onChange={handleChange}
                      className='form-control'
                    />
                    <input
                      placeholder="giải tư 2"
                      type="text"
                      name="giaiTu2"
                      id="giaiTu2"
                      maxlength={5}
                      onChange={handleChange}
                      className='form-control'
                    />
                    <input
                      placeholder="giải tư 3"
                      type="text"
                      name="giaiTu3"
                      id="giaiTu3"
                      maxlength={5}
                      onChange={handleChange}
                      className='form-control'
                    />
                  </InputGroup>
                  <InputGroup style={{ padding: "10px" }}>
                    
                    <input
                      placeholder="giải tư 4"
                      type="text"
                      name="giaiTu4"
                      id="giaiTu4"
                      maxlength={5}
                      onChange={handleChange}
                      className='form-control'
                    />                   

                    <input
                      placeholder="giải tư 5"
                      type="text"
                      name="giaiTu5"
                      id="giaiTu5"
                      maxlength={5}
                      onChange={handleChange}
                      className='form-control'
                    />
                    <input
                      placeholder="giải tư 6"
                      type="text"
                      name="giaiTu6"
                      id="giaiTu6"
                      maxlength={5}
                      onChange={handleChange}
                      className='form-control'
                    />
                    <input
                      placeholder="giải tư 7"
                      type="text"
                      name="giaiTu7"
                      id="giaiTu7"
                      maxlength={5}
                      onChange={handleChange}
                      className='form-control'
                    />
                  </InputGroup>
                  {formErrors.giaiTu && <div style={{ color: "#dc3545" }}>{formErrors.giaiTu}</div>}                  

                  <InputGroup style={{ padding: "10px" }}>
                  
                  <input
                    placeholder="giải năm"
                    type="text"
                    name="giaiNam"
                    id="giaiNam"
                    maxlength={4}
                    onChange={handleChange}
                    className='form-control'
                  />
                  </InputGroup>
                  {formErrors.giaiNam && <div style={{ color: "#dc3545" }}>{formErrors.giaiNam}</div>}                  
                  
                  <InputGroup style={{ padding: "10px" }}>
                    <input
                      placeholder="giải sáu 1"
                      type="text"
                      name="giaiSau1"
                      id="giaiSau1"
                      maxlength={4}
                      onChange={handleChange}
                      className='form-control'
                    />
                    <input
                      placeholder="giải sáu 2"
                      type="text"
                      name="giaiSau2"
                      id="giaiSau2"
                      maxlength={4}
                      onChange={handleChange}
                      className='form-control'
                    />
                    <input
                      placeholder="giải sáu 3"
                      type="text"
                      name="giaiSau3"
                      id="giaiSau3"
                      maxlength={4}
                      onChange={handleChange}
                      className='form-control'
                    />
                  </InputGroup>
                  {formErrors.giaiSau && <div style={{ color: "#dc3545" }}>{formErrors.giaiSau}</div>}
                  <InputGroup style={{ padding: "10px" }}>
                    <input
                      placeholder="giải bảy"
                      type="text"
                      name="giaiBay"
                      id="giaiBay"
                      maxlength={3}
                      onChange={handleChange}
                      className='form-control'
                    />
                    </InputGroup>
                    {formErrors.giaiBay && <div style={{ color: "#dc3545" }}>{formErrors.giaiBay}</div>}
                    <InputGroup style={{ padding: "10px" }}>
                    <input
                      placeholder="giải tám"
                      type="text"
                      name="giaiTam"
                      id="giaiTam"
                      maxlength={2}
                      onChange={handleChange}
                      className='form-control'
                    />
                  </InputGroup>
                  {formErrors.giaiTam && <div style={{ color: "#dc3545" }}>{formErrors.giaiTam}</div>}
                </label>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button type='submit' variant="primary">
                Save Changes
                </Button>
                </Modal.Footer>
                </form>
                </Modal>
          </>
          }
        </div>
      </div>
      <SearchBar
      getSortEntry={(entry) => props.getSortEntry(entry)}
      term={props.term}
      option={props.option}
      postStaff={props.postStaff}
      signal='vedo'
      userStatus={props.userStatus}
      veDoList = {veDoList}
    />
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
      <div className="row cod-flex p-2">{veDoDetails}</div>
    </div>
  );
}

export default QuanLyVeDo;
