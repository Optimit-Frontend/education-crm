import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Col, Form, Input, InputNumber, Modal, Row, Select,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTable from "../../module/CustomTable";
import useKeyPress from "../../hooks/UseKeyPress";
import usersDataReducer from "../../reducer/usersDataReducer";
import balanceReducer, { getAllBalanceBranch } from "../../reducer/balanceReducer";
import studentReducer, { getStudentsAll } from "../../reducer/studentReducer";
import familiyReducer, {
  deleteFamily, editFamily, getFamily, saveFamily
} from "../../reducer/familiyReducer.js";
import businessBranchesReducer, {
  getBusinessBranch,
} from "../../reducer/businessBranchesReducer.js";

const { Option } = Select;

const columns = [

  {
    title: "Ism",
    dataIndex: "fullName",
    key: "fullName",
    width: "30%",
    search: true,
  },
  {
    title: "Tel raqam",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    width: "25%",
    search: false,
  },
  {
    title: "Jinsi",
    dataIndex: "gender",
    key: "gender",
    width: "30%",
    search: true,
  },
];

function Family({
  usersDataReducer,
  getAllBalanceBranch,
  getStudentsAll,
  studentReducer,
  getFamily,
  editFamily,
  saveFamily,
  deleteFamily,
  businessBranchesReducer,
  familiyReducer,
  getBusinessBranch
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([[], []]);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [onedit, setOnedit] = useState(false);
  const enter = useKeyPress("Enter");
  const [newAccountNumber, setNewAccountNumber] = useState(0);
  const size = localStorage.getItem("PageSize") || 10;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const page = searchParams.get("page");
  const [pageData, setPageData] = useState({
    page: 1,
    size,
    loading: false,
  });

  useEffect(() => {
    getFamily({
      branchId: usersDataReducer.branch?.id,
      page: pageData.page,
      size: pageData.size
    });
    getAllBalanceBranch(usersDataReducer?.branch?.id);
    getBusinessBranch(usersDataReducer?.branch?.id);
    getStudentsAll({
      branchId: usersDataReducer.branch?.id,
      page: pageData.page,
      size: pageData.size
    });
    setVisible(false);
    form.resetFields();
    setSelectedRowKeys([[], []]);
  }, [familiyReducer?.changeData]);

  useEffect(() => {
    const pageSize = parseInt(size, 10);
    const pageCount = parseInt(page, 10) >= 1 ? parseInt(page, 10) : 1;
    if (pageSize >= 100) {
      setPageData((prev) => {
        return { ...prev, size: 100 };
      });
      navigate(`/family?page=${pageCount}&size=100`);
    } else if (pageSize >= 50) {
      setPageData((prev) => {
        return { ...prev, size: 50 };
      });
      navigate(`/family?page=${pageCount}&size=50`);
    } else if (pageSize >= 20) {
      setPageData((prev) => {
        return { ...prev, size: 20 };
      });
      navigate(`/family?page=${pageCount}&size=20`);
    } else {
      setPageData((prev) => {
        return { ...prev, size: 10 };
      });
      navigate(`/family?page=${pageCount}&size=10`);
    }
  }, []);

  const handleDelete = (arr) => {
    arr?.map((item) => {
      deleteFamily(parseInt(item?.id, 10));
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
          selectedRowKeys[1][0]?.id && editFamily({
            ...values,
            newAccountNumber: newAccountNumber || "0",
          });
          setOnedit(false);
        })
        .catch((info) => {
          console.error("Validate Failed:", info);
        })
      : form
        .validateFields()
        .then((values) => {
          saveFamily({
            ...values,
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
      <h3 className="text-2xl font-bold mb-5">Talaba malumotlari</h3>
      <div className="flex items-center justify-end gap-5 mb-3">
        {selectedRowKeys[0].length === 1 && (
          <button
            onClick={() => {
              setOnedit(true);
              setVisible(true);
              form.setFieldValue("gender", selectedRowKeys[1][0]?.gender);
              form.setFieldValue("fullName", selectedRowKeys[1][0]?.fullName);
              form.setFieldValue("branchId", selectedRowKeys[1][0]?.branch?.id);
              form.setFieldValue("password", selectedRowKeys[1][0]?.password);
              form.setFieldValue("phoneNumber", selectedRowKeys[1][0]?.phoneNumber);
              form.setFieldValue("studentIdList", selectedRowKeys[1][0]?.studentResponses[0]);
              console.log(selectedRowKeys[1][0]);
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
            handleDelete(selectedRowKeys[1]);
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
            Talaba haqida
            {onedit ? "ni taxrirlash" : " "}
          </h3>
        )}
        okText={onedit ? "Taxrirlsh" : "Qo'shish"}
        okButtonProps={{ className: "bg-blue-600" }}
        cancelText="Bekor qilish"
        width={600}
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
                key="fullName"
                name="fullName"
                label={<span className="text-base font-medium">Ism familiya</span>}
                rules={[
                  {
                    required: true,
                    message: "ism familiya kiriting",
                  },
                ]}
              >
                <Input placeholder="Ism familiya kiriting" />
              </Form.Item>
              <Form.Item
                key="phoneNumber"
                name="phoneNumber"
                label={<span className="text-base font-medium">Tel raqam </span>}
                rules={[
                  {
                    required: true,
                    message: "Tel raqam",
                  },
                ]}
              >
                <Input addonBefore="+998" type="number" placeholder="Tel raqam" />
              </Form.Item>
              <Form.Item
                key="password"
                name="password"
                label={<span className="text-base font-medium">Parol </span>}
                rules={[
                  {
                    required: true,
                    message: "password is required",
                  },
                ]}
              >
                <InputNumber className="w-full" placeholder="Password" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key="branchId"
                name="branchId"
                label={<span className="text-base font-medium">Filial ( Branch )</span>}
                rules={[
                  {
                    required: true,
                    message: "Filialni tanlang",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Filialni tanlang"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {
                    businessBranchesReducer?.businessBranch?.map((barnch) => {
                      return (
                        <Option value={barnch?.id} key={barnch?.id}>
                          {barnch?.name}
                        </Option>
                      );
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item
                key="gender"
                name="gender"
                label={<span className="text-base font-medium">Jinsi</span>}
                rules={[
                  {
                    required: true,
                    message: "Jisini kiriting",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Jinsini kiriting"
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
              <Form.Item
                key="studentIdList"
                name="studentIdList"
                label={<span className="text-base font-medium">Talaba tanlash</span>}
                rules={[
                  {
                    required: true,
                    message: "Xarajat turini kiriting",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  mode="multiple"
                  placeholder="Talaba tanlash"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {studentReducer?.students?.map((student) => {
                    return (
                      <Option value={student.id} key={student.id}>{student?.firstName}</Option>
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
        tableData={familiyReducer?.family?.familyResponseDtoList?.map((item) => {
          return ({
            ...item,
            branchId: item.branch?.name,
            studentId: item.student?.id
          });
        })}
        loading={pageData?.loading}
        setSelectedRowKeys={setSelectedRowKeys}
        selectedRowKeys={selectedRowKeys}
        onChange={onChange}
      />
    </div>
  );
}

export default connect(
  (
    usersDataReducer, studentReducer, balanceReducer, businessBranchesReducer
  ), {
    getAllBalanceBranch,
    getStudentsAll,
    deleteFamily,
    editFamily,
    saveFamily,
    getFamily,
    getBusinessBranch
  }
)(Family);
