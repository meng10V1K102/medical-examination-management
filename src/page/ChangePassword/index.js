import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, notification, Row, Col } from "antd";
import { requestChangePassword } from "../../reducers/ChangePassword";

const Wrapper = styled.div`
  width: 100%;
  background-color: #f1f9ff;
  padding: 30px 300px 50px;
  min-height: 100vh;
  h1 {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 20px;
    margin-bottom: 0;
    color: #286ba6;
  }
  .ant-descriptions-item-label {
    font-weight: bold;
  }
  .ant-input {
    border: none !important;
  }
  .ant-input-affix-wrapper {
    border-radius: 5px;
  }
  .info_container {
    border: 1px solid hsla(0, 0%, 100%, 0);
    clear: both;
    padding: 20px;
    position: relative;
    transition: box-shadow 0.2s, border 0.1s;
    border: 1px solid rgba(0, 0, 0, 0.14);
    border-radius: 10px;
    box-shadow: 4px 8px 20px rgb(0 0 0 / 5%);
    background: #ffffff;
  }
  .ant-form-item-label {
    font-weight: 500;
  }
  @media (max-width: 1440px) {
    padding: 30px 150px 50px;
  }
  @media (max-width: 1200px) {
    padding: 30px 70px 50px;
  }
  @media (max-width: 992px) {
    padding: 30px 50px 50px;
  }
  @media (max-width: 767px) {
    padding: 30px 40px 50px;
    .hidden_responsive {
      display: none !important;
    }
  }
  @media (max-width: 576px) {
    padding: 30px 25px 50px;
  }
`;

const ChangePassword = () => {
  const dispatch = useDispatch();
  // const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      // const response = await dispatch(getProfile());
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user_id = useSelector((state) =>
    state.login.user.user_id ? state.login.user.user_id : {}
  );

  const [inputValues, setInputValues] = useState({ user_id: user_id });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async () => {
    const response = await dispatch(requestChangePassword(inputValues));
    if (response.message === "success") {
      // await notification.success("C???p nh???t m???t kh???u th??nh c??ng", 3);
      await notification.success({
        message: "C???p nh???t m???t kh???u th??nh c??ng!",
        duration: 2.5,
      });
      // goBack();
      // history.replace("/admin/news/" + id + "/view_public");
    } else if (response.status === 400) {
      await notification.error({
        message: "???? x???y ra l???i!",
        description: response.message,
        duration: 2.5,
      });
    } else {
      await notification.error({
        message: "???? x???y ra l???i! Xin vui l??ng th??? l???i sau!",
        duration: 2.5,
      });
    }
  };

  return (
    <Wrapper>
      <div className="header">
        <h1>Thay ?????i m???t kh???u</h1>
      </div>
      <Form onFinish={handleSubmit} method="post" layout="vertical">
        <Row className="flex justify-center">
          <Col xxl={8} lg={12} md={16} sm={20} xs={24}>
            <Row className="flex justify-center info_container">
              <Col span={24}>
                <Form.Item
                  name="current_password"
                  label="M???t kh???u hi???n t???i"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p m???t kh???u hi???n t???i!",
                      labelAlign: "left",
                    },
                  ]}
                >
                  <Input.Password
                    name="current_password"
                    onChange={handleOnChange}
                  />
                </Form.Item>
                <Form.Item
                  name="input_password"
                  label="M???t kh???u m???i"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p m???t kh???u b???n mu???n ?????i!",
                      labelAlign: "left",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    name="input_password"
                    onChange={handleOnChange}
                  />
                </Form.Item>

                <Form.Item
                  name="confirm_password"
                  label="X??c nh???n m???t kh???u"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p l???i m???t kh???u b???n mu???n ?????i",
                      labelAlign: "left",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          !value ||
                          getFieldValue("input_password") === value
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "M???t kh???u x??c nh???n kh??ng tr??ng v???i m???t kh???u m???i!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    name="confirm_password"
                    onChange={handleOnChange}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <div className="flex justify-end">
                  <Button
                    className="edit_button"
                    htmlType="submit"
                    type="primary"
                    style={{ borderRadius: "5px" }}
                  >
                    ?????i m???t kh???u
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default ChangePassword;
