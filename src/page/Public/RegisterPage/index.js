import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  notification,
  Row,
  Col,
  DatePicker,
  Space,
  Radio,
} from "antd";
import background from "../../../assets/image/13.jpg";
import BackButton from "../../../component/BackButton";
import moment from "moment";
import { registerAccountByCustomer } from "../../../reducers/Register";
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;

  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  .overlay {
    width: 100%;
    height: 100%;
    padding: 80px;
    overflow: auto;
    .login_container {
      max-width: 1000px;
      width: 100%;
      height: 100%;
      display: grid;
      margin-left: auto;
      margin-right: 130px;
      justify-content: space-between;
      align-items: center;
      grid-template-columns: auto 1fr;
      .bl-content {
        flex: 1 1 0%;
        width: 100%;
        max-width: 700px;
        max-height: calc(100vh - 160px);
        border-radius: 5px;
        background-color: rgb(255, 255, 255);
        margin-left: auto;
        // overflow: auto;
        padding: 35px 50px;

        .login_header {
          display: block;
          margin: 15px auto 30px;
          font-size: 25px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.52;
          letter-spacing: normal;
          color: rgb(0, 0, 0);
          text-transform: capitalize;
          text-align: center;
          color: #286ba6;
        }
        .form_login {
          padding: 0px;
          .ant-input-affix-wrapper {
            border-radius: 5px !important;
            .ant-input {
              padding: 0 !important;
              border: none !important;
            }
          }
          .ant-form-item-children-icon {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .ant-picker {
            width: 100%;
            border-radius: 5px;
          }
          .btn_login {
            margin-top: 16px;
            margin-bottom: 16px;
            .loading_button {
              position: relative;
              overflow: hidden;
              width: 100%;
              color: #ffffff;
              padding: 12px 40px;
              background: #0f76c4;
              height: 50px;
              border-radius: 5px;
              &:hover {
                background: #ffffff;
                color: #0f76c4;
              }
            }
          }
          .sign_up > a {
            color: rgb(33, 37, 41);
            font-size: 16px;
            font-weight: 600;

            &:hover {
              text-decoration: underline;
            }
          }
          .sign_up {
            text-align: center;
            color: #286ba6;
          }
        }
      }
    }
  }
  .back_button {
    position: absolute;
    top: 40px;
    left: 62px;
  }
  @media only screen and (max-width: 920px) {
    .login_container .bl-content {
      margin: auto auto 70px;
      max-height: initial !important;
      position: relative;
      z-index: 10;
      overflow: auto;
    }
    .overlay {
      padding: 90px 20px;
    }
    .back_button {
      top: 30px;
      left: 20px;
    }
  }
  @media only screen and (max-width: 1366px) {
    .login_container .bl-content {
      margin: auto auto 70px;
      max-height: initial !important;
      position: relative;
      z-index: 10;
      overflow: auto;
    }
    .overlay {
      padding: 90px 20px;
    }
    .back_button {
      top: 30px;
      left: 20px;
    }
  }
  @media only screen and (max-width: 520px) {
    .login_container .bl-content {
      padding: 35px 20px !important;
    }
  }
  @media only screen and (min-width: 1366px) and (max-width: 1900px) {
    .login_container .bl-content {
      margin: auto auto 70px;
      max-height: initial !important;
      position: relative;
      z-index: 10;
      overflow: auto;
    }
    .overlay {
      padding: 90px 20px;
    }
    .back_button {
      top: 30px;
      left: 20px;
    }
  }
`;

const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputValues, setInputValues] = useState({
    medicalHistory: "",
    blood: "",
    address: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleDateChange = (date) => {
    setInputValues({
      ...inputValues,
      birth_day: moment(date).format("DD/MM/YYYY"),
    });
  };

  const handleSubmit = async () => {
    try {
      setConfirmLoading(true);
      const response = await dispatch(registerAccountByCustomer(inputValues));
      setConfirmLoading(false);
      if (response.status === 200) {
        await notification.success({
          message: "????ng k?? th??nh c??ng!",
          description:
            "B???n s??? ???????c ??i???u h?????ng v??? trang ????ng nh???p. Vui l??ng ki???m tra email c???a b???n ????? x??c nh???n t??i kho???n!",
          duration: 2.5,
          onClose: () => history.replace(`/login`),
        });
      } else {
        await notification.error({
          message: "????ng k?? kh??ng th??nh c??ng!",
          description: `${response.message}`,
          duration: 2.5,
        });
      }
    } catch (error) {}
  };

  return (
    <Wrapper>
      <BackButton />
      <div className="overlay">
        <div className="login_container">
          <div className="w_left" />
          <div className="w_right">
            <div className="bl-content">
              <div className="login_header">
                <h1>????ng k??</h1>
              </div>
              <Form
                layout="vertical"
                className="form_login"
                method="post"
                onFinish={handleSubmit}
              >
                <Row gutter={16}>
                  <Col lg={12} md={12} sm={12} xs={24}>
                    <Form.Item
                      label="H??? v?? t??n"
                      name="full_name"
                      rules={[
                        { required: true, message: "Vui l??ng ??i???n h??? v?? t??n!" },
                      ]}
                    >
                      <Input name="full_name" onChange={handleOnChange} />
                    </Form.Item>
                    <Form.Item
                      label="T??i kho???n"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Vui l??ng ??i???n t??i kho???n!",
                        },
                      ]}
                      tooltip="T??i kho???n ph???i c?? ????? d??i t??? 8-32 k?? t???,kh??ng vi???t hoa, c?? th??? c?? d???u '_'"
                    >
                      <Input name="username" onChange={handleOnChange} />
                    </Form.Item>
                    <Form.Item
                      label="M???t kh???u"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Vui l??ng ??i???n m???t kh???u!",
                        },
                      ]}
                      tooltip="M???t kh???u ph???i ch???a ??t nh???t 1 k?? t??? vi???t hoa, 1 k?? t??? ?????c bi???t v?? 1 s??? v?? c?? ????? d??i 8-32 k?? t???"
                      hasFeedback
                    >
                      <Input.Password
                        name="password"
                        onChange={handleOnChange}
                      />
                    </Form.Item>
                    <Form.Item
                      label="X??c nh???n m???t kh???u"
                      name="comfirm_password"
                      rules={[
                        {
                          required: true,
                          message: "Vui l??ng x??c nh???n m???t kh???u!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "M???t kh???u x??c nh???n ph???i gi???ng v???i m???t kh???u m???i!"
                              )
                            );
                          },
                        }),
                      ]}
                      hasFeedback
                    >
                      <Input.Password
                        name="comfirm_password"
                        onChange={handleOnChange}
                      />
                    </Form.Item>
                    <Form.Item
                      label="?????a ch??? email"
                      name="email"
                      rules={[
                        {
                          type: "email",
                          message: "Vui l??ng ??i???n ????ng ?????nh d???ng Email!",
                        },
                        {
                          required: true,
                          message: "Vui l??ng ??i???n ?????a ch??? Email!",
                        },
                      ]}
                    >
                      <Input
                        name="email"
                        placeholder="V?? d???: example@abc.def"
                        onChange={handleOnChange}
                      />
                    </Form.Item>
                    <Form.Item
                      label="S??? ??i???n tho???i"
                      name="phone"
                      tooltip="S??? ??i???n tho???i b???t ?????u b???ng 03, 05, 07, 08, 09 v?? ph???i c?? 8 s??? sau n??"
                      rules={[
                        {
                          required: true,
                          message: "Vui l??ng ??i???n S??? ??i???n tho???i!",
                        },
                      ]}
                    >
                      <Input name="phone" onChange={handleOnChange} />
                    </Form.Item>
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={24}>
                    <Form.Item
                      label="Ng??y sinh"
                      name="birth_day"
                      rules={[
                        {
                          required: true,
                          message: " Vui l??ng ??i???n ho???c ch???n ng??y sinh!",
                        },
                      ]}
                    >
                      <DatePicker
                        format="DD/MM/YYYY"
                        name="birth_day"
                        disabledDate={(current) => {
                          return current && current > moment().endOf("day");
                        }}
                        placeholder="DD/MM/YYYY"
                        onChange={handleDateChange}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Gi???i t??nh "
                      name="sex"
                      rules={[
                        {
                          required: true,
                          message: " Vui l??ng ch???n gi???i t??nh!",
                        },
                      ]}
                    >
                      <Radio.Group
                        name="sex"
                        placeholder="Gi???i t??nh"
                        onChange={handleOnChange}
                      >
                        <Space>
                          <Radio value={true}>Nam</Radio>
                          <Radio value={false}>N???</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      label="S??? c??n c?????c c??ng d??n"
                      name="cccd"
                      rules={[
                        {
                          required: true,
                          message: " Vui l??ng ??i???n s??? c??n c?????c c??ng d??n!",
                        },
                      ]}
                      tooltip="S??? c??n c?????c c??ng d??n kh??ng ch???a c??c k?? t??? ch??? v?? s???, k?? t??? ?????c bi???t ho???c kh??c 12 k?? t??? s???"
                    >
                      <Input name="cccd" onChange={handleOnChange} />
                    </Form.Item>
                    <Form.Item label="?????a ch???" name="address">
                      <Input name="address" onChange={handleOnChange} />
                    </Form.Item>
                    <Form.Item label="Nh??m m??u" name="blood">
                      <Input name="blood" onChange={handleOnChange} />
                    </Form.Item>
                    <Form.Item label="Ti???n s??? b???nh ??n" name="medicalHistory">
                      <Input name="medicalHistory" onChange={handleOnChange} />
                    </Form.Item>
                  </Col>
                </Row>

                <div className="btn_login">
                  <Button
                    htmlType="submit"
                    className="loading_button"
                    loading={confirmLoading}
                  >
                    ????ng K??
                  </Button>
                </div>
                <div className="sign_up">
                  ???? c?? t??i kho???n?
                  <NavLink to="/login"> ????ng nh???p </NavLink>
                </div>
                <div className="sign_up">
                  <NavLink to="/"> Tr??? v??? trang ch??? </NavLink>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default RegisterPage;
