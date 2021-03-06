import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  Form,
  Input,
  Button,
  Col,
  Row,
  Space,
  notification,
  Radio,
  Spin,
} from "antd";
import BackButton from "../../../../component/BackButton";
import ConfirmModal from "../../../../component/ConfirmModal";
import { LoadingOutlined } from "@ant-design/icons";
import {
  activeStaffForAdmin,
  getStaffDetailForAdmin,
} from "../../../../reducers/adminManagement/StaffManagement";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  /* color: #3483eb; */
  padding: 20px 50px 100px;
  background-color: #f1f9ff;
  textarea {
    resize: none;
  }
  .edit_area {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    margin-bottom: 50px;
    .edit_button {
      background: #1890ff;
      color: #ffffff;
      border-radius: 5px;
      width: 140px;
    }
    .deactive_button {
      border-radius: 5px;
      /* background: #ff0000;
      color: #fff; */
      width: 140px;
    }
    .active_button {
      /* background: #2eb82e; */
      border-radius: 5px;
      /* color: #ffffff; */
      width: 140px;
    }
  }
  h1 {
    font-size: 30px;
    font-weight: 700;
    text-align: left;
    padding-bottom: 20px;
    margin-bottom: 0;
    color: #286ba6;
  }
  .status {
    display: flex;
    font-size: 22px;
    justify-content: flex-end;
    align-items: center;
    /* width: 100%;
    height: 100%; */
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
  .ant-input[disabled] {
    color: #6b7280;
    border-radius: 5px;
  }
  .ant-select-disabled.ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    color: #6b7280;
    border-radius: 5px;
  }
  .ant-radio-disabled + span {
    color: #6b7280;
  }
  .ant-form-item {
    margin-bottom: 14px;
  }
`;

const Status = styled.h2`
  color: ${(props) => (props.status === "Active" ? "#83CE91" : "#d7101c")};
`;

const StaffDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getStaffDetailForAdmin(id));
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const staffDetail = useSelector((state) =>
    state.staffManagement.staffDetail ? state.staffManagement.staffDetail : {}
  );

  const [modalShowActive, setModalShowActive] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);

  const callbackFunctionActive = async () => {
    const response = await dispatch(activeStaffForAdmin(id));
    await dispatch(getStaffDetailForAdmin(id));
    if (response.status === 200) {
      if (staffDetail.status === "Inactive")
        await notification.success({
          message: "???? cho ph??p nh??n vi??n n??y ti???p t???c l??m vi???c!",
          duration: 2.5,
        });
      else
        await notification.warning({
          message: "???? cho ph??p nh??n vi??n n??y ng??ng l??m vi???c!",
          duration: 2.5,
        });
    } else
      await notification.error({
        message: "???? x???y ra l???i! Xin vui l??ng th??? l???i sau!",
        duration: 2.5,
      });
  };

  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      {/* <Row gutter={16}>
        <Col span={8}>
          <img
            className="img_container"
            // src={ staffDetail.avatar}
            alt=""
            width="130px"
            height="130px"
          />
        </Col>
        <Col span={16}> */}
      <div className="header">
        <BackButton />
        <h1>Th??ng tin c?? nh??n</h1>
      </div>
      <div className="status">
        <Space>
          <h3>Tr???ng th??i:</h3>
          {staffDetail.status === "Inactive" ? (
            <Status status="Deactive">Ng??ng l??m vi???c</Status>
          ) : (
            <Status status="Active">??ang l??m vi???c</Status>
          )}
        </Space>
      </div>
      {/* </Col>
      </Row> */}
      <Spin
        spinning={loading}
        tip="Vui l??ng ?????i..."
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        <Form layout="vertical">
          <Row gutter={32}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item label="H??? v?? t??n">
                <Input disabled={true} value={staffDetail.full_name} />
              </Form.Item>
              <Form.Item label="T??i kho???n">
                <Input disabled={true} value={staffDetail.username} />
              </Form.Item>
              <Form.Item label="Email">
                <Input disabled={true} value={staffDetail.email} />
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item label="Gi???i t??nh">
                <Radio.Group disabled={true} value={staffDetail.sex}>
                  <Space>
                    <Radio value={true}>Nam</Radio>
                    <Radio value={false}>N???</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="S??? ??i???n tho???i">
                <Input disabled={true} value={staffDetail.phone} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
      <div className="edit_area">
        <Space>
          {staffDetail.status === "Inactive" ? (
            <Button
              onClick={() => {
                setModalShowActive(true);
              }}
              className="active_button"
            >
              Ti???p t???c l??m vi???c
            </Button>
          ) : (
            <Button
              onClick={() => {
                setModalShowDelete(true);
              }}
              className="deactive_button"
            >
              Ng??ng l??m vi???c
            </Button>
          )}
          <NavLink to={`${location.pathname}/edit`} replace>
            <Button className="edit_button">S???a th??ng tin</Button>
          </NavLink>
        </Space>
      </div>

      <ConfirmModal
        visible={modalShowDelete}
        onHide={() => setModalShowDelete(false)}
        title="X??c nh???n nh??n vi??n ng??ng l??m vi???c"
        modalText="B???n c?? ch???c ch???n ng??ng l??m vi???c nh??n vi??n n??y kh??ng?"
        callBack={callbackFunctionActive}
      />
      <ConfirmModal
        visible={modalShowActive}
        onHide={() => setModalShowActive(false)}
        title="X??c nh???n nh??n vi??n ti???p t???c l??m vi???c"
        modalText="B???n c?? ch???c ch???n cho nh??n vi??n n??y ti???p t???c l??m vi???c kh??ng?"
        callBack={callbackFunctionActive}
      />
    </Wrapper>
  );
};

export default StaffDetail;
