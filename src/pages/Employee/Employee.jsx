import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Upload,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
import CustomTable from "../../module/CustomTable";
import useKeyPress from "../../hooks/UseKeyPress";
import usersDataReducer from "../../reducer/usersDataReducer";
import employeeReducer, {
  deleteEmployee,
  getEmployeeBranch,
  saveEmployee,
} from "../../reducer/employeeReducer";
import roleReducer, { getAllRoleByBranch } from "../../reducer/roleReducer";

const { TextArea } = Input;
const { Option } = Select;

const columns = [
  {
    title: "FIO",
    dataIndex: "fio",
    key: "fio",
    width: "30%",
    search: false,
  },
  {
    title: "Telefon nomeri",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    width: "20%",
    search: false,
  },
  {
    title: "Tug'ilgan kuni",
    dataIndex: "birthDate",
    key: "birthDate",
    width: "15%",
    search: false,
  },
  {
    title: "Email",
    dataIndex: "emailAddress",
    key: "emailAddress",
    width: "15%",
    search: false,
  },
  {
    title: "INN",
    dataIndex: "inn",
    key: "inn",
    width: "10%",
    search: false,
  },
  {
    title: "INPS",
    dataIndex: "inps",
    key: "inps",
    width: "10%",
    search: false,
  },
];

function Employee({
  employeeReducer,
  roleReducer,
  usersDataReducer,
  getAllRoleByBranch,
  getEmployeeBranch,
  saveEmployee,
  deleteEmployee,
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([[], []]);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [onedit, setOnedit] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [file, setFile] = useState(null);
  const enter = useKeyPress("Enter");
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const size = searchParams.get("size");
  const [pageData, setPageData] = useState({
    page: parseInt(page, 10) >= 1 ? parseInt(page, 10) : 1,
    size: size ? parseInt(size, 10) : 10,
    loading: false,
  });

  useEffect(() => {
    getAllRoleByBranch(usersDataReducer?.branch?.id);
    getEmployeeBranch({
      page: pageData.page,
      size: pageData.size,
      branchId: usersDataReducer?.branch?.id,
    });
    setVisible(false);
    setFile(null);
    setBirthday("");
    form.resetFields();
    setSelectedRowKeys([[], []]);
  }, [employeeReducer?.changeData]);

  useEffect(() => {
    const pageSize = parseInt(size, 10);
    const pageCount = parseInt(page, 10) >= 1 ? parseInt(page, 10) : 1;
    if (pageSize >= 100) {
      setPageData((prev) => {
        return { ...prev, size: 100 };
      });
      navigate(`/employee?page=${pageCount}&size=100`);
    } else if (pageSize >= 50) {
      setPageData((prev) => {
        return { ...prev, size: 50 };
      });
      navigate(`/employee?page=${pageCount}&size=50`);
    } else if (pageSize >= 20) {
      setPageData((prev) => {
        return { ...prev, size: 20 };
      });
      navigate(`/employee?page=${pageCount}&size=20`);
    } else {
      setPageData((prev) => {
        return { ...prev, size: 10 };
      });
      navigate(`/employee?page=${pageCount}&size=10`);
    }
  }, []);

  const handleDelete = (arr) => {
    arr?.map((item) => {
      deleteEmployee(item);
      return null;
    });
  };

  const onChange = (pageNumber, page) => {
    setPageData({ size: page, page: pageNumber, loading: false });
    searchParams.set("size", page);
    searchParams.set("page", pageNumber);
    localStorage.setItem("PageSize", page);
    navigate(`/employee?page=${pageNumber}&size=${page}`);
  };

  const formValidate = () => {
    onedit
      ? form
        .validateFields()
        .then((values) => {
          // selectedRowKeys[1][0]?.id && editRoom({
          //   ...values,
          //   roomId: selectedRowKeys[1][0]?.id,
          //   branchId: usersDataReducer?.branch?.id
          // });
          setOnedit(false);
        })
        .catch((info) => {
          console.error("Validate Failed:", info);
        })
      : form
        .validateFields()
        .then((values) => {
          const fmData = new FormData();
          file && fmData.append("file", file);
          fmData.append("email", values?.email);
          fmData.append("phoneNumber", values?.phoneNumber);
          fmData.append("fatherName", values?.fatherName);
          fmData.append("surname", values?.surname);
          fmData.append("name", values?.name);
          fmData.append("birthDate", birthday.substring(0, 10));
          fmData.append("biography", values?.biography);
          fmData.append("inps", values?.inps);
          fmData.append("inn", values?.inn);
          fmData.append("password", values?.password);
          fmData.append("branchId", usersDataReducer?.branch?.id);
          fmData.append("married", values?.married);
          fmData.append("roleId", values?.roleId);
          fmData.append("profilePhoto", file);
          fmData.append("gender", values?.gender);
          fmData.append("workDays", values?.workDays);
          saveEmployee(fmData);
          setOnedit(false);
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
      <h3 className="mb-5 text-2xl font-bold">Hodimlar</h3>
      <div className="mb-3 flex items-center justify-end gap-5">
        {selectedRowKeys[0].length === 1 && (
          <button
            onClick={() => {
              setOnedit(true);
              setVisible(true);
              form.setFieldValue("roomNumber", selectedRowKeys[1][0]?.roomNumber);
              form.setFieldValue("roomTypeId", selectedRowKeys[1][0]?.roomType?.id);
            }}
            type="button"
            className="flex items-center gap-2 rounded-lg bg-yellow-600 px-4 py-[6px] text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
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
        <button
          onClick={() => {
            setVisible(true);
          }}
          type="button"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-[6px] text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Qo&apos;shish</span>
        </button>
        <button
          onClick={() => {
            handleDelete(selectedRowKeys[0]);
            setSelectedRowKeys([[], []]);
          }}
          type="button"
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-[6px] text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          <span>O&apos;chirish</span>
        </button>
      </div>
      <Modal
        open={visible}
        title={(
          <h3 className="mb-3 text-xl font-semibold">
            Hodim
            {onedit ? "ni taxrirlash" : " qo'shish"}
          </h3>
        )}
        okText={onedit ? "Taxrirlsh" : "Qo'shish"}
        okButtonProps={{ className: "bg-blue-600" }}
        cancelText="Bekor qilish"
        width={700}
        onCancel={() => {
          setVisible(false);
          setFile(null);
          setBirthday("");
          setOnedit(false);
          form.resetFields();
        }}
        onOk={formValidate}
        forceRender
      >
        <Form form={form} layout="vertical" name="table_adddata_modal">
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                key="name"
                name="name"
                label={<span className="text-base font-medium">Hodim ismi</span>}
                rules={[
                  {
                    required: true,
                    message: "Hodim ismini kiriting",
                  },
                ]}
              >
                <Input placeholder="Hodim ismini kiriting..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key="surname"
                name="surname"
                label={<span className="text-base font-medium">Hodim familiyasi</span>}
                rules={[
                  {
                    required: true,
                    message: "Hodim familiyasini kiriting",
                  },
                ]}
              >
                <Input placeholder="Hodim familiyasini kiriting..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key="fatherName"
                name="fatherName"
                label={<span className="text-base font-medium">Hodim sharifi</span>}
                rules={[
                  {
                    required: true,
                    message: "Hodim sharifini kiriting",
                  },
                ]}
              >
                <Input placeholder="Hodim sharifini kiriting..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key="phoneNumber"
                name="phoneNumber"
                label={<span className="text-base font-medium">Hodim nomeri</span>}
                rules={[
                  {
                    required: true,
                    message: "Hodim nomerini kiriting",
                  },
                ]}
              >
                <InputNumber
                  className="w-full"
                  addonBefore="+998"
                  maxLength={9}
                  placeholder="Hodim nomerini kiriting..."
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key="married"
                name="married"
                label={<span className="text-base font-medium">Turmush qurganmi</span>}
                rules={[
                  {
                    required: true,
                    message: "Turmush qurganmi",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="true"> Turmush qurgan </Radio>
                  <Radio value="false"> Turmush qurmagan </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key="email"
                name="email"
                label={<span className="text-base font-medium">Hodim emaili</span>}
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Hodim emailini kiriting",
                  },
                ]}
              >
                <Input placeholder="Hodim emailini kiriting..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key="password"
                name="password"
                label={<span className="text-base font-medium">Parol</span>}
                rules={[
                  {
                    required: true,
                    message: "Parolni kiriting",
                  },
                  {
                    min: 6,
                    message: "Parol kamida 6ta belgidan iborat bo'lishi kerak!",
                  },
                ]}
              >
                <Input placeholder="Parolni kiriting..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key="inn"
                name="inn"
                label={<span className="text-base font-medium">Hodim INNsi</span>}
                rules={[
                  {
                    required: true,
                    message: "Hodim INNsini kiriting",
                  },
                ]}
              >
                <InputNumber className="w-full" placeholder="Hodim INNsini kiriting..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key="inps"
                name="inps"
                label={<span className="text-base font-medium">Hodim INPSi</span>}
                rules={[
                  {
                    required: true,
                    message: "Hodim INPSini kiriting",
                  },
                ]}
              >
                <InputNumber className="w-full" placeholder="Hodim INPSini kiriting..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key="birthDate"
                name="birthDate"
                label={<span className="text-base font-medium">Hodim tug&apos;ilgan kuni</span>}
                rules={[
                  {
                    required: true,
                    message: "Hodim tug'ilgan kunini kiriting",
                  },
                ]}
              >
                <DatePicker
                  onChange={(e) => {
                    return setBirthday(moment(e).toISOString());
                  }}
                  className="w-full"
                  placeholder="Hodim tug'ilgan kunini kiriting..."
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key="gender"
                name="gender"
                label={<span className="text-base font-medium">Hodim jinsi</span>}
                rules={[
                  {
                    required: true,
                    message: "Hodim jinsini tanlang",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Hodim jinsini tanlang"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  <Option value="ERKAK">Erkak</Option>
                  <Option value="AYOL">Ayol</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key="roleId"
                name="roleId"
                label={<span className="text-base font-medium">Lavozimi</span>}
                rules={[
                  {
                    required: true,
                    message: "Lavozimni tanlang",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Lavozimni tanlang"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {roleReducer?.allRole?.map((option) => {
                    return (
                      <Option value={option.id} key={option.id}>
                        {option.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key="workDays"
                name="workDays"
                label={<span className="text-base font-medium">Bir oyda necha kun ishlashi</span>}
                rules={[
                  {
                    required: true,
                    message: "Bir oyda necha kun ishlashini kiriting",
                  },
                ]}
              >
                <InputNumber
                  className="w-full"
                  placeholder="Bir oyda necha kun ishlashini kiriting..."
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key="profilePhoto"
                name="profilePhoto"
                label={<span className="text-base font-medium">Hodim rasmi</span>}
                rules={[
                  {
                    required: true,
                    message: "Hodim rasmini kiriting",
                  },
                ]}
              >
                <Upload
                  customRequest={async (options) => {
                    const { onSuccess, file } = options;
                    setFile(file);
                    onSuccess(file);
                  }}
                  listType="picture"
                  multiple={false}
                  maxCount={1}
                  accept="image/*"
                  className="w-full"
                >
                  <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                    Yuklash
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key="biography"
                name="biography"
                label={<span className="text-base font-medium">Hodim haqida ma&apos;lumot</span>}
                rules={[
                  {
                    required: true,
                    message: "Hodim haqida ma'lumot kiriting",
                  },
                ]}
              >
                <TextArea rows={3} placeholder="Hodim haqida ma'lumot kiriting..." />
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
        totalItems={employeeReducer?.employeesTotalCount}
        tableData={employeeReducer?.employees?.map((employee) => {
          return {
            ...employee,
            fio: `${employee?.surname} ${employee?.name} ${employee?.fatherName}`,
          };
        })}
        loading={pageData?.loading}
        setSelectedRowKeys={setSelectedRowKeys}
        selectedRowKeys={selectedRowKeys}
        onChange={onChange}
      />
    </div>
  );
}

export default connect((employeeReducer, roleReducer, usersDataReducer), {
  getAllRoleByBranch,
  getEmployeeBranch,
  saveEmployee,
  deleteEmployee,
})(Employee);
