import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { requestChangepassword } from "../../../reducers/ChangePassword";
import { checkObjectSearch } from "../../../common";
import { Form, Input, Button, notification } from "antd";
import background from "../../../assets/image/13.jpg";
import BackButton from "../../../component/BackButton";

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
      margin: auto;
      justify-content: space-between;
      align-items: center;
      grid-template-columns: auto 1fr;
      .bl-content {
        flex: 1 1 0%;
        width: 100%;
        max-width: 450px;
        max-height: calc(100vh - 160px);
        border-radius: 5px;
        background-color: rgb(255, 255, 255);
        margin-left: auto;
        overflow: auto;
        padding: 35px 50px;
        text-align: center;
        color: #286ba6;

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
          text-align: center;
          color: #286ba6;
          text-transform: capitalize;
        }
        .form_login {
          max-width: 400px;
          margin: auto;
          padding: 0px;
          .input_padding {
            padding: 10px 25px !important;
            line-height: 33px;
            width: 100%;
            box-sizing: border-box;
            color: rgb(23, 28, 34);
            font-weight: 500;
            font-size: 14px;
            transition: background-color 0.5s ease 0s;
            border: 1px solid rgb(187, 187, 187);
            height: 50px;
            background-color: rgb(255, 255, 255);
            .ant-input {
              border: none !important;
              padding: 0 !important;
            }
          }
          .forgot_password > a {
            color: rgb(33, 37, 41);
            font-size: 16px;
            font-weight: 600;

            &:hover {
              text-decoration: underline;
            }
          }
          .forgot_password {
            margin-bottom: 30px;
          }
          .btn_login {
            margin-bottom: 30px;
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
`;

const ForgetPasswordPage = () => {
  // const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputValues, setInputValues] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (!checkObjectSearch(inputValues)) {
        setConfirmLoading(true);
        const res = await dispatch(requestChangepassword(inputValues));
        if (res.message === "success") {
          setConfirmLoading(false);
          await notification.success({
            message: "Vui l??ng ki???m tra email c???a b???n!",
            description: "B???n s??? ???????c ??i???u h?????ng v??? trang ????ng nh???p!",
            duration: 2.5,
            onClose: () => history.replace(`/login`),
          });
        } else {
          setConfirmLoading(false);
          await notification.error({
            message: "???? x???y ra l???i!",
            description: `${res.message}`,
            duration: 4.5,
          });
        }
      } else {
        setConfirmLoading(false);
        await notification.error({
          message: "???? x???y ra l???i!",
          description: `Vui l??ng ??i???n ?????y th??ng tin!`,
          duration: 4.5,
        });
      }
    } catch (error) {}
  };

  return (
    <Wrapper>
      <BackButton />
      <div className="overlay">
        <div className="login_container">
          <div className="w_left"></div>
          <div className="w_right">
            <div className="bl-content">
              <div className="login_header">
                <h1>Qu??n m???t kh???u</h1>
              </div>
              <Form
                className="form_login"
                method="post"
                onFinish={handleSubmit}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng ??i???n t??i kho???n ????ng nh???p!",
                      labelAlign: "left",
                    },
                  ]}
                >
                  <Input
                    name="username"
                    onChange={handleOnChange}
                    placeholder={"T??i kho???n ????ng nh???p"}
                    className="input_padding"
                    autoComplete="false"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng ??i???n email!",
                    },
                  ]}
                >
                  <Input
                    name="email"
                    placeholder="Nh???p email"
                    onChange={handleOnChange}
                    className="input_padding"
                    autoComplete="false"
                  />
                </Form.Item>
                <div className="btn_login">
                  <Button
                    htmlType="submit"
                    className="loading_button"
                    loading={confirmLoading}
                  >
                    L???y l???i m???t kh???u
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ForgetPasswordPage;
