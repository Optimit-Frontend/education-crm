import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Button, Col, Form, Image, Input, Modal, Row, Select, Upload
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import CustomTable from "../../module/CustomTable";
import useKeyPress from "../../hooks/UseKeyPress";
import usersDataReducer from "../../reducer/usersDataReducer";
import achievementReducer, {
  deleteAchievement,
  editAchievement,
  getAchievementUserId,
  saveAchievement
} from "../../reducer/achievementReducer";
import employeeReducer, { getEmployeeBranchId } from "../../reducer/employeeReducer";
import { BASE_URL } from "../../services/Axios";

const { TextArea } = Input;
const { Option } = Select;

const columns = [
  {
    title: "Rasmi",
    dataIndex: "photoCertificateId",
    key: "photoCertificateId",
    width: "15%",
    search: false,
    render: (eski) => {
      return (
        <Image
          width={50}
          height={50}
          src={`${BASE_URL}/attachment/download/${eski}`}
          fallback="data:image/png;base64,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"
        />
      );
    },
  },
  {
    title: "Yutug' nomi",
    dataIndex: "name",
    key: "name",
    width: "30%",
    search: true,
  },
  {
    title: "Yutug' haqida",
    dataIndex: "aboutAchievement",
    key: "aboutAchievement",
    width: "30%",
    search: true,
  },
  {
    title: "Holati",
    dataIndex: "userId",
    key: "userId",
    width: "25%",
    search: false,
  },
];

function Achievement({
  deleteAchievement,
  editAchievement,
  saveAchievement,
  getAchievementUserId,
  getEmployeeBranchId,
  usersDataReducer,
  achievementReducer,
  employeeReducer,
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([[], []]);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [onedit, setOnedit] = useState(false);
  const enter = useKeyPress("Enter");
  const size = localStorage.getItem("PageSize") || 10;
  const [pageData, setPageData] = useState({
    page: 1,
    size,
    loading: false,
  });

  useEffect(() => {
    getAchievementUserId(usersDataReducer?.userData?.id);
    getEmployeeBranchId(usersDataReducer?.branch?.id);
    setVisible(false);
    setOnedit(false);
    form.resetFields();
    setSelectedRowKeys([[], []]);
  }, [achievementReducer?.changeData]);

  const handleDelete = (arr) => {
    arr?.map((item) => {
      deleteAchievement(item);
      return null;
    });
  };

  const onChange = (pageNumber, page) => {
    setPageData({ size: page, page: pageNumber, loading: false });
    localStorage.setItem("PageSize", page);
  };

  const formValidate = () => {
    onedit
      ? form
        .validateFields()
        .then((values) => {
          const photoCertificateId = values?.photoCertificateId?.file?.response;
          selectedRowKeys[1][0]?.id
          && editAchievement({
            ...values,
            photoCertificateId: photoCertificateId || selectedRowKeys[1][0]?.photoCertificateId,
            id: selectedRowKeys[1][0]?.id
          });
        })
        .catch((info) => {
          console.error("Validate Failed:", info);
        })
      : form
        .validateFields()
        .then((values) => {
          const photoCertificateId = values?.photoCertificateId?.file?.response;
          saveAchievement({ ...values, photoCertificateId });
        })
        .catch((info) => {
          console.error("Validate Failed:", info);
        });
  };

  if (enter && visible) {
    formValidate();
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-5">Hodim erishgan yutuqlari</h3>
      <div className="flex items-center justify-between gap-5 mb-3">
        <div className="w-40">
          <Select
            onChange={(e) => {
              e ? getAchievementUserId(e) : getAchievementUserId(usersDataReducer?.userData?.id);
            }}
            showSearch
            allowClear
            placeholder="Xodimni tanlang..."
            optionFilterProp="children"
            className="w-full"
            key="id"
            filterOption={(input, option) => {
              return option.children.toLowerCase()?.includes(input.toLowerCase());
            }}
          >
            {employeeReducer?.employeesAllBranch?.map((employee) => {
              return (
                <Option value={employee.id} key={employee.id}>{employee?.name}</Option>
              );
            })}
          </Select>
        </div>
        <div className="flex items-center gap-5">
          {selectedRowKeys[0].length === 1 && usersDataReducer?.viewAchievement && (
            <button
              onClick={() => {
                setOnedit(true);
                setVisible(true);
                form.setFieldValue("name", selectedRowKeys[1][0]?.name);
                form.setFieldValue("aboutAchievement", selectedRowKeys[1][0]?.aboutAchievement);
                form.setFieldValue("userId", selectedRowKeys[1][0]?.userId);
              }}
              type="button"
              className="flex items-center gap-2 px-4 py-[6px] bg-yellow-600 text-white rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              <span>Taxrirlsh</span>
            </button>
          )}
          {
            usersDataReducer?.addAchievement
              ? (
                <button
                  onClick={() => {
                    setVisible(true);
                  }}
                  type="button"
                  className="flex items-center gap-2 px-4 py-[6px] bg-blue-600 text-white rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span>Qo&apos;shish</span>
                </button>
              ) : ""
          }
          {
            usersDataReducer?.deleteAchievement
              ? (
                <button
                  onClick={() => {
                    handleDelete(selectedRowKeys[0]);
                    setSelectedRowKeys([[], []]);
                  }}
                  type="button"
                  className="flex items-center gap-2 px-4 py-[6px] bg-red-600 text-white rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  <span>O&apos;chirish</span>
                </button>
              ) : ""
          }
        </div>
      </div>
      <Modal
        open={visible}
        title={(
          <h3 className="text-xl mb-3 font-semibold">
            Xona turi
            {onedit ? "ni taxrirlash" : "ni qo'shish"}
          </h3>
        )}
        okText={onedit ? "Taxrirlsh" : "Qo'shish"}
        okButtonProps={{ className: "bg-blue-600" }}
        cancelText="Bekor qilish"
        width={500}
        onCancel={() => {
          setVisible(false);
          setOnedit(false);
          form.resetFields();
        }}
        onOk={formValidate}
        forceRender
      >
        <Form form={form} layout="vertical" name="table_adddata_modal">
          <Row gutter={12}>
            <Col span={24}>
              <Form.Item
                key="name"
                name="name"
                label={<span className="text-base font-medium">Yutuq nomi</span>}
                rules={[
                  {
                    required: true,
                    message: "Yutuq nomini kiriting",
                  },
                ]}
              >
                <Input placeholder="Yutuq nomini kiriting..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                key="aboutAchievement"
                name="aboutAchievement"
                label={<span className="text-base font-medium">Yutuq haqida ma&apos;lumot</span>}
                rules={[
                  {
                    required: true,
                    message: "Yutuq haqida ma'lumotni kiriting",
                  },
                ]}
              >
                <TextArea rows={3} placeholder="Yutuq haqida ma'lumotni kiriting..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                key="photoCertificateId"
                name="photoCertificateId"
                label={<span className="text-base font-medium">Yutuq sertifikati rasmi</span>}
              >
                <Upload
                  customRequest={async (options) => {
                    const { onSuccess, file } = options;
                    const files = new FormData();
                    files.append("file", file);
                    axios.post(`${BASE_URL}/attachment/upload`, files).then((data) => {
                      data.data.success && onSuccess(data.data?.data?.id);
                    }).catch((err) => {
                      console.error(err);
                    });
                  }}
                  listType="picture"
                  multiple={false}
                  maxCount={1}
                  accept="image/*"
                  className="w-full"
                >
                  <Button className="w-full" icon={<UploadOutlined />}>
                    Yuklash
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                key="userId"
                name="userId"
                label={<span className="text-base font-medium">Hodim</span>}
                rules={[
                  {
                    required: true,
                    message: "Hodimni tanlang",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Hodimni tanlang..."
                  optionFilterProp="children"
                  className="w-full"
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {employeeReducer?.employeesAllBranch?.map((room) => {
                    return (
                      <Option value={room.id} key={room.id}>{room?.name}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <CustomTable
        columns={columns}
        pageSizeOptions={[10, 20, 50, 100]}
        current={pageData?.page}
        pageSize={pageData?.size}
        tableData={achievementReducer?.achievement}
        loading={pageData?.loading}
        setSelectedRowKeys={setSelectedRowKeys}
        selectedRowKeys={selectedRowKeys}
        onChange={onChange}
      />
    </div>
  );
}

export default connect((achievementReducer, employeeReducer, usersDataReducer), {
  deleteAchievement, editAchievement, saveAchievement, getAchievementUserId, getEmployeeBranchId
})(Achievement);
