import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Button,
  Col, DatePicker, Form, Input, Modal, Row, Select, Upload,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
// eslint-disable-next-line import/no-extraneous-dependencies
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from "dayjs";
import CustomTable from "../../module/CustomTable";
import businessReducer from "../../reducer/businessReducer";
import useKeyPress from "../../hooks/UseKeyPress";
import studentReducer, {
  deleteStudent,
  editStudent,
  getStudentById,
  getStudentsAll,
  getStudentsAllByClass,
  getStudentsAllNeActive,
  saveStudent,
} from "../../reducer/studentReducer";
import usersDataReducer from "../../reducer/usersDataReducer";
import classReducer, { getClassesAll } from "../../reducer/classReducer.js";

const { Option } = Select;

const columns = [
  {
    title: "Ismi",
    dataIndex: "firstName",
    key: "firstName",
    width: "30%",
    search: true,
  },
  {
    title: "Sinf",
    dataIndex: "studentClass",
    key: "studentClass",
    width: "25%",
    search: false,
  },
  {
    title: "Tug`ilgan kuni",
    dataIndex: "birthDate",
    key: "birthDate",
    width: "25%",
    search: false,
  },
  {
    title: "Passport raqami",
    dataIndex: "docNumber",
    key: "docNumber",
    width: "30%",
    search: false,
  },
  {
    title: "Photo",
    dataIndex: "photo",
    render: (photo) => { return <img alt="3333" src={photo} />, console.log(photo); },
    key: "photo",
    width: "30%",
    search: false,
  },
  {
    title: "Holati",
    dataIndex: "active",
    key: "active",
    width: "15%",
    search: false,
    render: (eski) => {
      return eski ? (
        <span className="bg-green-200 text-green-700 py-1 px-3 rounded-full text-xs">Active</span>
      ) : (
        <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Nofaol</span>
      );
    },
  },
];

function Students({
  usersDataReducer, getClassesAll, classReducer, studentReducer,
  getStudentsAllByClass, getStudentsAllNeActive, getStudentById, getStudentsAll, deleteStudent, editStudent, saveStudent
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([[], []]);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [onedit, setOnedit] = useState(false);
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
  const [file, setFile] = useState(null);
  const [reference, setReference] = useState(null);
  const [medDocPhoto, setMedDocPhoto] = useState(null);
  const [docPhoto, setDocPhoto] = useState([]);

  useEffect(() => {
    getStudentsAll({ branchId: usersDataReducer.branch?.id, page: pageData.page, size: pageData.size });
    getClassesAll({ id: usersDataReducer?.branch?.id });
    setVisible(false);
    setFile(null);
    setDocPhoto([]);
    setReference(null);
    setMedDocPhoto(null);
    form.resetFields();
    setSelectedRowKeys([[], []]);
  }, [studentReducer?.changeData]);

  useEffect(() => {
    const pageSize = parseInt(size, 10);
    const pageCount = parseInt(page, 10) >= 1 ? parseInt(page, 10) : 1;
    if (pageSize >= 100) {
      setPageData((prev) => {
        return { ...prev, size: 100 };
      });
      navigate(`/students?page=${pageCount}&size=100`);
    } else if (pageSize >= 50) {
      setPageData((prev) => {
        return { ...prev, size: 50 };
      });
      navigate(`/students?page=${pageCount}&size=50`);
    } else if (pageSize >= 20) {
      setPageData((prev) => {
        return { ...prev, size: 20 };
      });
      navigate(`/students?page=${pageCount}&size=20`);
    } else {
      setPageData((prev) => {
        return { ...prev, size: 10 };
      });
      navigate(`/students?page=${pageCount}&size=10`);
    }
  }, []);

  const handleDelete = (arr) => {
    arr?.map((item) => {
      deleteStudent(item);
      return null;
    });
  };

  const onChange = (pageNumber, page) => {
    setPageData({ size: page, page: pageNumber, loading: false });
    searchParams.set("size", page);
    searchParams.set("page", pageNumber);
    localStorage.setItem("PageSize", page);
    navigate(`/students?page=${pageNumber}&size=${page}`);
  };

  const formValidate = () => {
    onedit
      ? form
        .validateFields()
        .then((values) => {
          selectedRowKeys[1][0]?.id && editStudent({ ...values, id: selectedRowKeys[1][0]?.id });
          // const fmData = new FormData();
          // file && fmData.append("file", file);
          // fmData.append("firstName", values?.firstName);
          // fmData.append("lastName", values?.lastName);
          // fmData.append("fatherName", values?.fatherName);
          // fmData.append("birthDate", new Date(values?.birthDate).toISOString().substring(0, 10));
          // fmData.append("docNumber", values?.docNumber);
          // docPhoto.map((item) => {
          //   return fmData.append("docPhoto", item);
          // });
          // fmData.append("reference", file);
          // fmData.append("photo", file);
          // fmData.append("studentClassId", values?.studentClassId);
          // fmData.append("branchId", usersDataReducer?.branch?.id);
          // fmData.append("active", true);
          // fmData.append("medDocPhoto", medDocPhoto);
          // fmData.append("username", values?.username);
          // fmData.append("password", values?.password);
          // editStudent(fmData);
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
          fmData.append("firstName", values?.firstName);
          fmData.append("lastName", values?.lastName);
          fmData.append("fatherName", values?.fatherName);
          fmData.append("birthDate", new Date(values?.birthDate).toISOString().substring(0, 10));
          fmData.append("docNumber", values?.docNumber);
          docPhoto.map((item) => {
            return fmData.append("docPhoto", item);
          });
          fmData.append("reference", file);
          fmData.append("photo", file);
          fmData.append("studentClassId", values?.studentClassId);
          fmData.append("branchId", usersDataReducer?.branch?.id);
          fmData.append("active", true);
          fmData.append("medDocPhoto", medDocPhoto);
          fmData.append("username", values?.username);
          fmData.append("password", values?.password);
          saveStudent(fmData);
          console.log(values, docPhoto);
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
      <h3 className="text-2xl font-bold mb-5">Hamma Talabalar</h3>
      <div className="flex items-center justify-end gap-5 mb-3">
        {selectedRowKeys[0].length === 1 && (
          <button
            onClick={() => {
              setOnedit(true);
              setVisible(true);
              form.setFieldValue("firstName", selectedRowKeys[1][0]?.firstName);
              form.setFieldValue("lastName", selectedRowKeys[1][0]?.lastName);
              form.setFieldValue("fatherName", selectedRowKeys[1][0]?.fatherName);
              form.setFieldValue("username", selectedRowKeys[1][0]?.username);
              form.setFieldValue("docNumber", selectedRowKeys[1][0]?.docNumber);
              form.setFieldValue("studentClassId", selectedRowKeys[1][0]?.studentClass);
              form.setFieldValue("photo", selectedRowKeys[1][0]?.photo);
              form.setFieldValue("branchId", usersDataReducer?.branch?.id);
              form.setFieldValue("birthDate", dayjs(selectedRowKeys[1][0]?.birthDate));
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
      </div>
      <Modal
        open={visible}
        title={(
          <h3 className="text-xl mb-3 font-semibold">
            Talaba
            {onedit ? "ni taxrirlash" : " qo'shish"}
          </h3>
        )}
        okText={onedit ? "Taxrirlsh" : "Qo'shish"}
        okButtonProps={{ className: "bg-blue-600" }}
        cancelText="Bekor qilish"
        width={800}
        onCancel={() => {
          setVisible(false);
          setOnedit(false);
          form.resetFields();
        }}
        onOk={formValidate}
        forceRender
      >
        <Form form={form} layout="vertical" name="table_adddata_modal">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                key="firstName"
                name="firstName"
                label={<span className="text-base font-medium">Ism</span>}
                rules={[
                  {
                    required: true,
                    message: "Talaba nomini kiriting",
                  },
                ]}
              >
                <Input placeholder="Talaba Familiyasini kiriting..." />
              </Form.Item>
              <Form.Item
                key="lastName"
                name="lastName"
                label={<span className="text-base font-medium">Familiya</span>}
                rules={[
                  {
                    required: true,
                    message: "Bizness nomini kiriting",
                  },
                ]}
              >
                <Input placeholder="Talaba familiya nomini kiriting..." />
              </Form.Item>
              <Form.Item
                key="fatherName"
                name="fatherName"
                label={<span className="text-base font-medium">Otasi</span>}
                rules={[
                  {
                    required: false,
                    message: "Talaba otasi nomini kiriting",
                  },
                ]}
              >
                <Input placeholder="Talaba familiya nomini kiriting..." />
              </Form.Item>
              <Form.Item
                key="birthDate"
                name="birthDate"
                label={<span className="text-base font-medium">Tug`ilgan kun</span>}
                rules={[
                  {
                    required: true,
                    message: "Talaba otasi nomini kiriting",
                  },
                ]}
              >
                <DatePicker
                  className="w-full"
                  placeholder="Hodim tug'ilgan kunini kiriting..."
                />
                {/* <Input type="date" placeholder="Talaba familiya nomini kiriting..." /> */}
              </Form.Item>
              <Form.Item
                key="branchId"
                name="branchId"
                label={<span className="text-base font-medium">Filial ( Branch )</span>}
                rules={[
                  {
                    required: true,
                    message: "Bizness telefon nomerini kiriting",
                  },
                ]}
              >
                <Input placeholder="Bizness telefon nomerini kiriting..." />
              </Form.Item>
              <Form.Item
                key="docPhoto"
                name="docPhoto"
                label={<span className="text-base font-medium">Passport rasm</span>}
                rules={[
                  {
                    required: false,
                    message: "Passport rasm",
                  },
                ]}
              >
                <Upload
                  customRequest={async (options) => {
                    const { onSuccess, file } = options;
                    docPhoto.push(file);
                    onSuccess(file);
                  }}
                  listType="picture"
                  multiple
                  maxCount={1}
                  accept="image/*"
                  className="w-full"
                >
                  <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                    Yuklash
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                key="password"
                name="password"
                label={<span className="text-base font-medium">Password</span>}
                rules={[
                  {
                    required: false,
                    message: "password kiriting",
                  },
                ]}
              >
                <Input type="text" placeholder="Password . . ." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key="username"
                name="username"
                label={<span className="text-base font-medium">username</span>}
                rules={[
                  {
                    required: true,
                    message: "username",
                  },
                ]}
              >
                <Input placeholder="username ..." />
              </Form.Item>
              <Form.Item
                key="docNumber"
                name="docNumber"
                label={<span className="text-base font-medium">Passport raqami</span>}
                rules={[
                  {
                    required: false,
                    message: "Passport raqami . . .",
                  },
                ]}
              >
                <Input placeholder="Passport raqami ..." />
              </Form.Item>
              <Form.Item
                key="medDocPhoto"
                name="medDocPhoto"
                label={<span className="text-base font-medium">0/83 Yoki 0/86</span>}
                rules={[
                  {
                    required: false,
                    message: "0/83 yoki 0/86",
                  },
                ]}
              >
                <Upload
                  customRequest={async (options) => {
                    const { onSuccess, file } = options;
                    setMedDocPhoto(file);
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
              <Form.Item
                key="reference"
                name="reference"
                label={<span className="text-base font-medium">Ota - ona ish ma`lumotnoma</span>}
                rules={[
                  {
                    required: false,
                    message: "Reference",
                  },
                ]}
              >
                <Upload
                  customRequest={async (options) => {
                    const { onSuccess, file } = options;
                    setReference(file);
                    onSuccess(file);
                  }}
                  listType="picture"
                  multiple={false}
                  maxCount={1}
                  accept="image/*"
                  className="w-full"
                >
                  <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                    Yuklash ( Ota - ona ish ma`lumotnoma )
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                key="photo"
                name="photo"
                label={<span className="text-base font-medium">Photo 3X4</span>}
                rules={[
                  {
                    required: false,
                    message: "Photo",
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
              <Form.Item
                key="studentClassId"
                name="studentClassId"
                label={<span className="text-base font-medium">Student sinf</span>}
                rules={[
                  {
                    required: false,
                    message: "Sinf kiritng",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Xona tanlang"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {classReducer?.class?.map((room) => {
                    return (
                      <Option value={room.id} key={room.id}>{room?.className}</Option>
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
        totalItems={studentReducer?.studentsTotalCount}
        tableData={studentReducer?.students?.studentResponseDtoList?.map((student) => {
          return {
            ...student,
            studentClass: student?.studentClass?.className,
            photo: student?.photo,
            Ismi: `${student?.firstName} ${student?.lastName} ${student?.fatherName}`,
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

export default connect((usersDataReducer, studentReducer, classReducer), {
  getStudentsAll, getStudentById, getStudentsAllNeActive, getStudentsAllByClass, deleteStudent, editStudent, saveStudent, getClassesAll
})(Students);
