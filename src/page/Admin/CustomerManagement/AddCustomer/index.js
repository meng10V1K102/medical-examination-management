import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { Form, Input, Button, Radio, Space, Col, Row, DatePicker } from "antd";
import BackButton from "../../../../component/BackButton";
import { addNewCustomerForAdmin } from "../../../../reducers/adminManagement/CustomerManagement";
//
// import _ from "lodash";
const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  /* color: #3483eb; */
  padding: 20px 50px 100px;
  background-color: #f1f9ff;
  .ant-picker {
    width: 100%;
    border-radius: 5px;
  }
  textarea {
    resize: none;
  }
  .add_cancel {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    .add_button {
      background: #1890ff;
      color: #ffffff;
      border-radius: 5px;
    }
    .cancel_button {
      border-radius: 5px;
      width: 140px;
      /* background: #ff0000;
      color: #fff; */
    }
  }
  h1 {
    font-size: 30px;
    font-weight: 700;
    text-align: left;
    padding-bottom: 20px;
    color: #286ba6;
    margin-bottom: 0;
  }
  label {
    font-weight: 600;
  }
  .back_button {
    background: #1890ff;
    color: #ffffff;
    position: relative;
    top: 0;
  }
  .ant-input {
    border-radius: 5px;
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-radius: 5px;
  }
  .ant-form-item {
    margin-bottom: 14px;
  }
`;

const AddCustomer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [inputValues, setInputValues] = useState({
    password: "A123@123a",
    comfirm_password: "A123@123a",
    medicalHistory: "",
    blood: "",
    address: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleSubmit = async () => {
    const response = await dispatch(addNewCustomerForAdmin(inputValues));
    if (response.status === 200) history.replace("/admin/customer");
  };
  const handleDateChange = (date) => {
    setInputValues({
      ...inputValues,
      birth_day: moment(date).format("DD/MM/YYYY"),
    });
  };

  const goBack = () => {
    history.goBack();
  };
  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      {/* <Row gutter={16}>
        <Col span={8}>
          <img
            className="img_container"
            src={ customerDetail.avatar}
            alt=""
            width="100px"
            height="100px"
          />
        </Col>
        <Col span={16}> */}
      <div className="header">
        <BackButton />
        <h1>Th??m kh??ch h??ng</h1>
      </div>
      {/* </Col>
      </Row> */}
      <Form layout="vertical" method="post" onFinish={handleSubmit}>
        <Row gutter={32}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="H??? v?? t??n"
              name="full_name"
              rules={[{ required: true, message: "Vui l??ng ??i???n h??? v?? t??n!" }]}
            >
              <Input name="full_name" onChange={handleOnChange} />
            </Form.Item>
            <Form.Item
              label="T??i kho???n"
              name="username"
              rules={[
                { required: true, message: "Vui l??ng ??i???n t??n t??i kho???n!" },
              ]}
            >
              <Input name="username" onChange={handleOnChange} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Vui l??ng ??i???n ????ng ?????nh d???ng Email!",
                },
                { required: true, message: "Vui l??ng ??i???n Email!" },
              ]}
            >
              <Input name="email" onChange={handleOnChange} />
            </Form.Item>
            <Form.Item
              label="S??? ??i???n tho???i"
              name="phone"
              rules={[
                { required: true, message: "Vui l??ng ??i???n S??? ??i???n tho???i!" },
              ]}
            >
              <Input name="phone" onChange={handleOnChange} />
            </Form.Item>
            <Form.Item
              label="Ng??y sinh"
              name="birth_day"
              rules={[{ required: true, message: "Vui l??ng ??i???n ng??y sinh!" }]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                name="birth_day"
                disabledDate={(current) => {
                  return current && current > moment().endOf("day");
                }}
                onChange={handleDateChange}
              />
            </Form.Item>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="Gi???i t??nh "
              name="sex"
              rules={[{ required: true, message: "Vui l??ng ch???n gi???i t??nh!" }]}
            >
              <Radio.Group name="sex" onChange={handleOnChange}>
                <Space>
                  <Radio value={true}>Nam</Radio>
                  <Radio value={false}>N???</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="?????a ch???" name="address">
              <Input name="address" onChange={handleOnChange} />
            </Form.Item>
            <Form.Item
              label="S??? c??n c?????c c??ng d??n"
              name="cccd"
              rules={[
                { required: true, message: "Vui l??ng ??i???n c??n c?????c c??ng d??n!" },
              ]}
            >
              <Input name="cccd" onChange={handleOnChange} />
            </Form.Item>
            <Form.Item label="Nh??m m??u" name="blood">
              <Input name="blood" onChange={handleOnChange} />
            </Form.Item>
            <Form.Item label="Ti???n s??? b???nh ??n" name="medicalHistory">
              <Input.TextArea
                name="medicalHistory"
                rows={4}
                onChange={handleOnChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="add_cancel">
          <Space>
            <Button className="cancel_button" onClick={goBack}>
              H???y
            </Button>
            <Button className="add_button" htmlType="submit">
              Th??m kh??ch h??ng
            </Button>
          </Space>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddCustomer;
