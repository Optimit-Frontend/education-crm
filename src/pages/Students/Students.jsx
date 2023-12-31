import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Button, DatePicker, Form, Image, Input, InputNumber, Modal, Row, Select, Upload,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";
import CustomTable from "../../module/CustomTable";
import useKeyPress from "../../hooks/UseKeyPress";
import studentReducer, {
  deleteStudent,
  editStudent,
  getSearchStudents,
  getStudentById,
  getStudentsAll,
  getStudentsAllByClass,
  getStudentsAllNeActive,
  saveStudent,
} from "../../reducer/studentReducer";
import usersDataReducer from "../../reducer/usersDataReducer";
import classReducer, { getClassesAll } from "../../reducer/classReducer";
import { BASE_URL } from "../../services/Axios";
import FormLayoutComp from "../../components/FormLayoutComp";
import { numberWithCommas } from "../../utils";

const { Option } = Select;

const columns = [
  {
    title: "Ismi",
    dataIndex: "ismi",
    key: "ismi",
    width: "30%",
    search: true,
  },
  {
    title: "Sinf",
    dataIndex: "studentClassName",
    key: "studentClassName",
    width: "25%",
    search: false,
  },
  {
    title: "To`langan summa",
    dataIndex: "paymentAmount",
    key: "paymentAmount",
    width: "25%",
    search: false,
    render: (eski) => {
      return `${numberWithCommas(eski.paymentAmount)} /
      ${(100 - (eski.paymentAmount / eski.studentClassOveralSum) * 100)}%`;
    }
  },
  {
    title: "Tug`ilgan kuni",
    dataIndex: "birthDate",
    key: "birthDate",
    width: "25%",
    search: false,
    render: (eski) => {
      return dayjs(eski).format("DD-MM-YYYY");
    }
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
    dataIndex: "photoId",
    key: "photoId",
    width: "30%",
    search: false,
    render: (eski) => {
      return (
        <Image
          width={50}
          height={50}
          src={`${BASE_URL}/attachment/download/${eski}`}
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
        />
      );
    },
  },
  {
    title: "Holati",
    dataIndex: "active",
    key: "active",
    width: "15%",
    search: false,
    render: (eski) => {
      return eski ? (
        <span
          className="bg-green-200 text-green-700 py-1 px-3 whitespace-nowrap rounded-full text-xs"
        >
          Active
        </span>
      ) : (
        <span
          className="bg-red-200 text-red-600 py-1 px-3 whitespace-nowrap rounded-full text-xs"
        >
          Nofaol
        </span>
      );
    },
  },
];

function Students({
  usersDataReducer,
  getClassesAll,
  classReducer,
  studentReducer,
  getStudentsAll,
  deleteStudent,
  editStudent,
  saveStudent,
  getSearchStudents,
  getStudentsAllByClass
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
  const [selectData, setSelectData] = useState(null);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    if (search) {
      getSearchStudents({
        name: search,
        page: pageData.page,
        size: pageData.size,
      });
    } else {
      selectData ? getStudentsAllByClass({
        classId: selectData,
        branchId: usersDataReducer.branch?.id,
      }) : getStudentsAll({
        branchId: usersDataReducer.branch?.id,
        page: pageData.page,
        size: pageData.size,
      });
    }
    getClassesAll({ id: usersDataReducer?.branch?.id });
    setVisible(false);
    setOnedit(false);
    form.resetFields();
    setSelectedRowKeys([[], []]);
  }, [studentReducer?.changeData]);

  useEffect(() => {
    const pageSize = parseInt(size, 10);
    const pageCount = parseInt(page, 10) >= 1 ? parseInt(page, 10) : 1;
    if (pageSize >= 100) {
      setPageData((prev) => {
        return {
          ...prev,
          size: 100,
        };
      });
      navigate(`/students?page=${pageCount}&size=100`);
    } else if (pageSize >= 50) {
      setPageData((prev) => {
        return {
          ...prev,
          size: 50,
        };
      });
      navigate(`/students?page=${pageCount}&size=50`);
    } else if (pageSize >= 20) {
      setPageData((prev) => {
        return {
          ...prev,
          size: 20,
        };
      });
      navigate(`/students?page=${pageCount}&size=20`);
    } else {
      setPageData((prev) => {
        return {
          ...prev,
          size: 10,
        };
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
    setPageData({
      size: page,
      page: pageNumber,
      loading: false,
    });
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
          const docPhotoIds = values?.docPhotoIds?.fileList?.map((item) => {
            return item?.response;
          });
          const photoId = values?.photoId?.file?.response;
          const medDocPhotoId = values?.medDocPhotoId?.file?.response;
          selectedRowKeys[1][0]?.id && editStudent({
            ...values,
            docPhotoIds,
            photoId,
            medDocPhotoId,
            id: selectedRowKeys[1][0]?.id,
            branchId: usersDataReducer?.branch?.id,
            birthDate: dayjs(values?.birthDate)
              .format("YYYY-MM-DD")
          });
        })
        .catch((info) => {
          console.error("Validate Failed:", info);
        })
      : form
        .validateFields()
        .then((values) => {
          const docPhotoIds = values?.docPhotoIds?.fileList?.map((item) => {
            return item?.response;
          });
          const photoId = values?.photoId?.file?.response;
          const medDocPhotoId = values?.medDocPhotoId?.file?.response;
          saveStudent({
            ...values,
            docPhotoIds,
            photoId,
            medDocPhotoId,
            branchId: usersDataReducer?.branch?.id,
            birthDate: dayjs(values?.birthDate)
              .format("YYYY-MM-DD")
          });
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
      <div>
        <Input
          placeholder="Enter name..."
          value={search}
          className="mb-5"
          size="large"
          onChange={(e) => {
            setSearch(e.target.value !== "" ? e.target.value : null);
            e.target.value !== "" ? getSearchStudents({
              name: e.target.value,
              page: 1,
              size: pageData.size,
            }) : getStudentsAll({
              branchId: usersDataReducer.branch?.id,
              page: 1,
              size: pageData.size,
            });
          }}
        />
      </div>
      <div className="flex items-center justify-between gap-5 mb-3">
        <div className="w-40">
          <Select
            onChange={(e) => {
              e ? getStudentsAllByClass({
                classId: e,
                branchId: usersDataReducer.branch?.id,
              }) : getStudentsAll({
                branchId: usersDataReducer.branch?.id,
                page: 1,
                size: pageData.size,
              });
              e ? setSelectData(e) : setSelectData(null);
            }}
            showSearch
            allowClear
            placeholder="Sinfni tanlang..."
            optionFilterProp="children"
            className="w-full"
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
        </div>
        <div className="flex items-center justify-end gap-5">
          {selectedRowKeys[0].length === 1 && usersDataReducer?.editStudent && (
            <button
              onClick={() => {
                setOnedit(true);
                setVisible(true);
                form.setFieldValue("firstName", selectedRowKeys[1][0]?.firstName);
                form.setFieldValue("lastName", selectedRowKeys[1][0]?.lastName);
                form.setFieldValue("fatherName", selectedRowKeys[1][0]?.fatherName);
                form.setFieldValue("phoneNumber", selectedRowKeys[1][0]?.phoneNumber);
                form.setFieldValue("docNumber", selectedRowKeys[1][0]?.docNumber);
                form.setFieldValue("studentClassId", selectedRowKeys[1][0]?.studentClassId);
                form.setFieldValue("paymentAmount", selectedRowKeys[1][0]?.paymentAmount);
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
          {
            usersDataReducer?.addStudent
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
            usersDataReducer?.deleteStudent
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
            <FormLayoutComp>
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
            </FormLayoutComp>
            <FormLayoutComp>
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
            </FormLayoutComp>
            <FormLayoutComp>
              <Form.Item
                key="fatherName"
                name="fatherName"
                label={<span className="text-base font-medium">Otasi</span>}
                rules={[
                  {
                    required: true,
                    message: "Talaba otasi nomini kiriting",
                  },
                ]}
              >
                <Input placeholder="Talaba familiya nomini kiriting..." />
              </Form.Item>
            </FormLayoutComp>
            <FormLayoutComp>
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
              </Form.Item>
            </FormLayoutComp>
            <FormLayoutComp>
              <Form.Item
                key="phoneNumber"
                name="phoneNumber"
                label={<span className="text-base font-medium">Tel raqam</span>}
                rules={[
                  {
                    required: true,
                    message: "Telefon raqamni kiriting",
                  },
                ]}
              >
                <InputNumber
                  maxLength={9}
                  addonBefore="+998"
                  className="w-full"
                  placeholder="Tel raqam ..."
                />
              </Form.Item>
            </FormLayoutComp>
            <FormLayoutComp>
              <Form.Item
                key="studentClassId"
                name="studentClassId"
                label={<span className="text-base font-medium">Student sinf</span>}
                rules={[
                  {
                    required: true,
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
                    return option.children.toLowerCase()
                      ?.includes(input.toLowerCase());
                  }}
                >
                  {classReducer?.class?.map((room) => {
                    return (
                      <Option value={room.id} key={room.id}>{room?.className}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </FormLayoutComp>
            <FormLayoutComp>
              <Form.Item
                key="password"
                name="password"
                label={<span className="text-base font-medium">Parol</span>}
                rules={[
                  {
                    required: !onedit,
                    message: "Parolni kiriting",
                  },
                ]}
              >
                <Input placeholder="Parolni kiriting..." />
              </Form.Item>
            </FormLayoutComp>
            { onedit
              ? (
                <FormLayoutComp>
                  <Form.Item
                    key="paymentAmount"
                    name="paymentAmount"
                    label={<span className="text-base font-medium">To&apos;lov summasi</span>}
                    rules={[
                      {
                        required: false,
                        message: "To'lov summasini kiriting",
                      },
                    ]}
                  >
                    <InputNumber className="w-full" placeholder="To'lov summasini kiriting..." />
                  </Form.Item>
                </FormLayoutComp>
              ) : null }
            <FormLayoutComp>
              <Form.Item
                key="docNumber"
                name="docNumber"
                label={<span className="text-base font-medium">Passport / Guvohnoma / raqami</span>}
                rules={[
                  {
                    required: false,
                    message: "Passport raqami . . .",
                  },
                ]}
              >
                <Input placeholder="Passport / Guvohnoma raqami..." />
              </Form.Item>
            </FormLayoutComp>
            <FormLayoutComp>
              <Form.Item
                key="docPhotoIds"
                name="docPhotoIds"
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
                    const {
                      onSuccess,
                      file,
                    } = options;
                    const files = new FormData();
                    files.append("file", file);
                    axios.post(`${BASE_URL}/attachment/upload`, files).then((data) => {
                      data.data.success && onSuccess(data.data?.data?.id);
                    }).catch((err) => {
                      console.error(err);
                    });
                    onSuccess(file);
                  }}
                  listType="picture"
                  multiple
                  maxCount={4}
                  accept="image/*"
                  className="w-full"
                >
                  <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                    Yuklash
                  </Button>
                </Upload>
              </Form.Item>
            </FormLayoutComp>
            <FormLayoutComp>
              <Form.Item
                key="medDocPhotoId"
                name="medDocPhotoId"
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
                    const {
                      onSuccess,
                      file,
                    } = options;
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
                  <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                    Yuklash
                  </Button>
                </Upload>
              </Form.Item>
            </FormLayoutComp>
            <FormLayoutComp>
              <Form.Item
                key="photoId"
                name="photoId"
                label={<span className="text-base font-medium">Rasm ( 3X4 )</span>}
                rules={[
                  {
                    required: false,
                    message: "Photo",
                  },
                ]}
              >
                <Upload
                  customRequest={async (options) => {
                    const {
                      onSuccess,
                      file,
                    } = options;
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
                  <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                    Yuklash
                  </Button>
                </Upload>
              </Form.Item>
            </FormLayoutComp>
          </Row>
        </Form>
      </Modal>

      <CustomTable
        columns={columns}
        pageSizeOptions={[10, 20, 50, 100]}
        current={pageData?.page}
        pageSize={pageData?.size}
        totalItems={studentReducer?.studentsTotalCount}
        tableData={studentReducer?.students?.map((student) => {
          return {
            ...student,
            studentClassName: student?.studentClass?.className,
            studentClassId: student?.studentClass?.id,
            photo: student?.photo,
            paymentAmount: {
              paymentAmount: student?.paymentAmount,
              studentClassOveralSum: student?.studentClass?.overallSum,
            },
            ismi: `${student?.firstName} ${student?.lastName} ${student?.fatherName}`,
            branchId: student?.branch?.id,
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
  getStudentsAll,
  getStudentById,
  getStudentsAllNeActive,
  getStudentsAllByClass,
  deleteStudent,
  editStudent,
  saveStudent,
  getClassesAll,
  getSearchStudents,
})(Students);
