import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import { Label, Input } from "reactstrap";

export default function AddEmployee(props) {
  // on off modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };

  // employee object
  const initialState = {
    producer: "",
    date: "",
    number: "",
    userId: props.userStatus ? props.userStatus.userId : "",
    result: "chưa có kết quả",
  };

  const veDoList = props.veDoList;

  const [newVeSo, setNewVeSo] = useState(initialState);
  const [crVeDo, setCrVeDo] = useState(null);

  const [isSubmit, SetIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({ name: "" });

  // tim ket qua xo so

  const findResult = () => {
    console.log(
      "🚀 ~ file: Modal.js ~ line 39 ~ findResult ~ newVeSo",
      newVeSo
    );
    const correctVeDo = veDoList.filter(
      (vedo) => vedo.producer === newVeSo.producer && vedo.date === newVeSo.date
    )[0];
    const number6 = newVeSo.number;
    const number5 = number6.substring(1);
    const number4 = number6.substring(2);
    const number3 = number6.substring(3);
    const number2 = number6.substring(4);

    console.log(number2, number3, number4, number5, number6);

    setFormErrors(validate(newVeSo));
    SetIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if (correctVeDo === undefined) {
        setNewVeSo({ ...newVeSo, result: `chưa tìm thấy vé dò` });
      }

      if (correctVeDo && number6 === correctVeDo.prize.rewardNumbers.giaiDB) {
        console.log("trung giai dac biet");
        return setNewVeSo({
          ...newVeSo,
          result: `Trúng giải Đặc Biệt 2.000.000.000đ: ${correctVeDo.prize.rewardNumbers.giaiDB} Đài: ${correctVeDo.producer} xổ ngày: ${correctVeDo.date}`,
        });
      }

      if (
        correctVeDo &&
        number5 === correctVeDo.prize.rewardNumbers.giaiDB.substring(1)
      ) {
        console.log("trung giai PHỤ dac biet");
        return setNewVeSo({
          ...newVeSo,
          result: `Trúng giải Phụ Đặc Biệt 50.000.000đ: ${correctVeDo.prize.rewardNumbers.giaiDB}\nĐài: ${correctVeDo.producer}\nxổ ngày: ${correctVeDo.date}`,
        });
      }

      if (correctVeDo && number5 === correctVeDo.prize.rewardNumbers.giaiNhat) {
        console.log("trung giai nhat");
        return setNewVeSo({
          ...newVeSo,
          result: `Trúng giải Nhất 30.000.000đ: ${correctVeDo.prize.rewardNumbers.giaiNhat} Đài: ${correctVeDo.producer} xổ ngày: ${correctVeDo.date}`,
        });
      }

      if (correctVeDo && number5 === correctVeDo.prize.rewardNumbers.giaiNhi) {
        console.log("trung giai nhi");
        return setNewVeSo({
          ...newVeSo,
          result: `Trúng giải Nhì 15.000.000đ: ${correctVeDo.prize.rewardNumbers.giaiNhi} Đài: ${correctVeDo.producer} xổ ngày: ${correctVeDo.date}`,
        });
      }

      if (
        correctVeDo &&
        Object.values(correctVeDo.prize.rewardNumbers.giaiBa).includes(number5)
      ) {
        console.log("trung giai ba");
        return setNewVeSo({
          ...newVeSo,
          result: `Trúng giải Ba 10.000.000đ: ${Object.values(
            correctVeDo.prize.rewardNumbers.giaiBa
          ).find((e) => e === number5)} Đài: ${correctVeDo.producer} xổ ngày: ${
            correctVeDo.date
          }`,
        });
      }

      if (
        correctVeDo &&
        Object.values(correctVeDo.prize.rewardNumbers.giaiTu).includes(number5)
      ) {
        console.log("trung giai tu");
        return setNewVeSo({
          ...newVeSo,
          result: `Trúng giải Tư 3.000.000đ: ${Object.values(
            correctVeDo.prize.rewardNumbers.giaiTu
          ).find((e) => e === number5)} Đài: ${correctVeDo.producer} xổ ngày: ${
            correctVeDo.date
          }`,
        });
      }

      if (correctVeDo && number4 === correctVeDo.prize.rewardNumbers.giaiNam) {
        console.log("trung giai nam");
        return setNewVeSo({
          ...newVeSo,
          result: `Trúng giải Năm 1.000.000đ: ${correctVeDo.prize.rewardNumbers.giaiNam} Đài: ${correctVeDo.producer} xổ ngày: ${correctVeDo.date}`,
        });
      }

      if (
        correctVeDo &&
        Object.values(correctVeDo.prize.rewardNumbers.giaiSau).includes(number4)
      ) {
        console.log("trung giai sau");
        return setNewVeSo({
          ...newVeSo,
          result: `Trúng giải Sáu 400.000đ: ${Object.values(
            correctVeDo.prize.rewardNumbers.giaiSau
          ).find((e) => e === number4)} Đài: ${correctVeDo.producer} xổ ngày: ${
            correctVeDo.date
          }`,
        });
      }

      if (correctVeDo && number3 === correctVeDo.prize.rewardNumbers.giaiBay) {
        console.log("trung giai bay");
        return setNewVeSo({
          ...newVeSo,
          result: `Trúng giải bảy 200.000đ: ${correctVeDo.prize.rewardNumbers.giaiBay} Đài: ${correctVeDo.producer} xổ ngày: ${correctVeDo.date}`,
        });
      }

      if (correctVeDo && number2 === correctVeDo.prize.rewardNumbers.giaiTam) {
        console.log("trung giai tam");
        return setNewVeSo({
          ...newVeSo,
          result: `Trúng giải tám 100.000đ: ${correctVeDo.prize.rewardNumbers.giaiTam}
          Đài: ${correctVeDo.producer}
          xổ ngày: ${correctVeDo.date}`,
        });
      }

      return setNewVeSo({ ...newVeSo, result: "Vé không trúng thưởng" });
    }
  };

  //add form data to state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVeSo({ ...newVeSo, [name]: value });
  };

  // validate form

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

  // submit new Employee function

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(newVeSo));
    SetIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleClose();
      console.log(
        "🚀 ~ file: Modal.js ~ line 70 ~ handleSubmit ~ newVeSo",
        newVeSo
      );
      props.postStaff(newVeSo);
      setNewVeSo(initialState);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="fa fa-plus" /> Dò Vé Số
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.signal === "vedo" ? "Dò vé số tự động" : "Thêm vé số mới"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="row">
              <Label htmlFor="name" md={4}>
                Nhà Đài
              </Label>
              <Col md={7}>
                <select
                  onChange={handleChange}
                  name="producer"
                  value={newVeSo.producer}
                >
                  <option>Chọn</option>
                  <option>Bình Thuận</option>
                  <option>Tây Ninh</option>
                  <option>A Thơ</option>
                </select>
                <div style={{ color: "#dc3545" }}>{formErrors.producer}</div>
              </Col>
            </div>

            <div className="row">
              <Label htmlFor="date" md={4}>
                Ngày xổ số
              </Label>
              <Col md={7}>
                <Input
                  onChange={(e) =>
                    setNewVeSo({ ...newVeSo, date: e.target.value })
                  }
                  value={newVeSo.date}
                  type="date"
                  id="doB"
                  name="date"
                  placeholder=""
                />
                <div style={{ color: "#dc3545" }}>{formErrors.date}</div>
              </Col>
            </div>

            <div className="row">
              <Label htmlFor="number" md={4}>
                Số
              </Label>
              <Col md={7}>
                <Input
                  onChange={handleChange}
                  type="text"
                  id="number"
                  name="number"
                  value={newVeSo.number}
                  maxLength="6"
                  placeholder="số dùng để dò"
                />
                <div style={{ color: "#dc3545" }}>{formErrors.number}</div>
              </Col>
            </div>

            <div className="row">
              <Label htmlFor="result" md={4}>
                Kết quả:
              </Label>
              <Col md={7}>
                <div>
                  <h5 className="text-success my-2">{newVeSo.result}</h5>
                </div>
              </Col>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setNewVeSo(initialState);
                setFormErrors({});
              }}
            >
              Reset
            </Button>
            <Button variant="primary" onClick={findResult}>
                Dò vé số
              </Button>

            {props.userStatus.isLoggedIn && (
              <Button variant="primary" type="submit">
                Thêm
              </Button>
            )}
           
              
           
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
