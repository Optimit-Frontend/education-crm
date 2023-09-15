import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Col, Form, Input, InputNumber, Modal, Row, Select,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import CustomTable from "../../module/CustomTable";
import useKeyPress from "../../hooks/UseKeyPress";
import usersDataReducer from "../../reducer/usersDataReducer";
import balanceReducer, { getAllBalanceBranch } from "../../reducer/balanceReducer";
import studentAccountReducer, {
  deleteStudentAccount,
  editStudentAccount,
  getStudentAccountByBranch,
  getStudentAccountByBranchByClass,
  saveStudentAccount,
  saveStudentPayment, searchStudentAccaunt,
} from "../../reducer/studentAccountReducer";
import studentReducer, { getSearchStudents, getStudentsAllByClass } from "../../reducer/studentReducer";
import classReducer, { getClassesAll } from "../../reducer/classReducer";
import { numberWithCommas } from "../../utils";

const { Option } = Select;
const { TextArea } = Input;

const columns = [
  {
    title: "Hisob raqam",
    dataIndex: "accountNumber",
    key: "accountNumber",
    width: "15%",
    search: true,
  },
  {
    title: "Talaba",
    dataIndex: "studentName",
    key: "studentName",
    width: "15%",
    search: true,
  },
  {
    title: "Balans",
    dataIndex: "balance",
    key: "balance",
    width: "15%",
    search: false,
    render: (eski) => {
      return numberWithCommas(eski);
    }
  },
  {
    title: "Chegirma",
    dataIndex: "discount",
    key: "discount",
    width: "10%",
    search: false,
    render: (eski) => {
      return numberWithCommas(eski);
    }
  },
  {
    title: "Sabab",
    dataIndex: "description",
    key: "description",
    width: "15%",
    search: false,
  },
  {
    title: "Sana",
    dataIndex: "date",
    key: "date",
    width: "15%",
    search: false,
    render: (eski) => {
      return dayjs(eski).format("DD-MM-YYYY");
    }
  },
  {
    title: "Qarz",
    dataIndex: "amountOfDebit",
    key: "amountOfDebit",
    width: "10%",
    search: false,
    render: (eski) => {
      return numberWithCommas(eski);
    }
  },
];

function StudentAccount({
  classReducer,
  usersDataReducer,
  getAllBalanceBranch,
  studentAccountReducer,
  studentReducer,
  balanceReducer,
  deleteStudentAccount,
  editStudentAccount,
  saveStudentAccount,
  getStudentAccountByBranch,
  getStudentAccountByBranchByClass,
  getSearchStudents,
  getClassesAll,
  getStudentsAllByClass,
  searchStudentAccaunt
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([[], []]);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [onedit, setOnedit] = useState(false);
  const enter = useKeyPress("Enter");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
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
      searchStudentAccaunt({
        search,
        page: pageData.page,
        size: pageData.size,
      });
    } else {
      selectData ? getStudentAccountByBranchByClass({
        classId: selectData,
        branchId: usersDataReducer.branch?.id,
        page: pageData.page,
        size: pageData.size
      }) : getStudentAccountByBranch({
        branchId: usersDataReducer.branch?.id,
        page: pageData.page,
        size: pageData.size
      });
    }
    getAllBalanceBranch(usersDataReducer?.branch?.id);
    getClassesAll({ id: usersDataReducer?.branch?.id });
    setOnedit(false);
    setVisible(false);
    form.resetFields();
    setSelectedRowKeys([[], []]);
  }, [studentAccountReducer?.changeData]);

  useEffect(() => {
    const pageSize = parseInt(size, 10);
    const pageCount = parseInt(page, 10) >= 1 ? parseInt(page, 10) : 1;
    if (pageSize >= 100) {
      setPageData((prev) => {
        return { ...prev, size: 100 };
      });
      navigate(`/create-account?page=${pageCount}&size=100`);
    } else if (pageSize >= 50) {
      setPageData((prev) => {
        return { ...prev, size: 50 };
      });
      navigate(`/create-account?page=${pageCount}&size=50`);
    } else if (pageSize >= 20) {
      setPageData((prev) => {
        return { ...prev, size: 20 };
      });
      navigate(`/create-account?page=${pageCount}&size=20`);
    } else {
      setPageData((prev) => {
        return { ...prev, size: 10 };
      });
      navigate(`/create-account?page=${pageCount}&size=10`);
    }
  }, []);

  const handleDelete = (arr) => {
    arr?.map((item) => {
      deleteStudentAccount(item);
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
    navigate(`/create-account?page=${pageNumber}&size=${page}`);
  };

  const formValidate = () => {
    onedit
      ? form
        .validateFields()
        .then((values) => {
          selectedRowKeys[1][0]?.id && editStudentAccount({
            newAccountNumber: values?.newAccountNumber?.toString() || "0",
            accountNumber: values.accountNumber,
            discount: values.discount,
            mainBalanceId: values.mainBalanceId,
            studentId: values.studentId,
            branchId: usersDataReducer?.branch?.id,
            description: values.description,
          }, selectedRowKeys[1][0]?.id);
        })
        .catch((info) => {
          console.error("Validate Failed:", info);
        })
      : form
        .validateFields()
        .then((values) => {
          saveStudentAccount({
            accountNumber: values.accountNumber,
            description: values.description,
            discount: values.discount,
            mainBalanceId: values.mainBalanceId,
            studentId: values.studentId,
            branchId: usersDataReducer?.branch?.id
          });
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
      <h3 className="text-2xl font-bold mb-5">Talaba hisob raqamlari</h3>
      <div>
        <Input
          placeholder="Student to'lov raqami yoki ismi orqali izlang..."
          className="mb-5"
          size="large"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value !== "" ? e.target.value : null);
            e.target.value !== "" ? searchStudentAccaunt({
              search: e.target.value,
              page: 1,
              size: pageData.size,
            }) : getStudentAccountByBranch({
              branchId: usersDataReducer.branch?.id,
              page: 1,
              size: pageData.size
            });
          }}
        />
      </div>
      <div className="flex items-center justify-between gap-5 mb-3">
        <div className="w-40">
          <Select
            onChange={(e) => {
              e ? getStudentAccountByBranchByClass({
                classId: e,
                branchId: usersDataReducer.branch?.id,
                page: 1,
                size: pageData.size
              }) : getStudentAccountByBranch({
                branchId: usersDataReducer.branch?.id,
                page: 1,
                size: pageData.size
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
        <div className="flex items-center justify-end gap-5 mb-3">
          {selectedRowKeys[0].length === 1 && (
          <button
            onClick={() => {
              setOnedit(true);
              setVisible(true);
              form.setFieldValue("accountNumber", selectedRowKeys[1][0]?.accountNumber);
              form.setFieldValue("studentId", selectedRowKeys[1][0]?.studentId);
              form.setFieldValue("branchId", selectedRowKeys[1][0]?.branch?.id);
              form.setFieldValue("discount", selectedRowKeys[1][0]?.discount);
              form.setFieldValue("mainBalanceId", selectedRowKeys[1][0]?.mainBalance?.accountNumber);
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
      </div>
      <Modal
        open={visible}
        title={(
          <h3 className="text-xl mb-3 font-semibold">
            Talaba hisob raqami
            {onedit ? "ni taxrirlash" : " "}
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
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                key="accountNumber"
                name="accountNumber"
                label={<span className="text-base font-medium">Hisob raqam ( Talaba )</span>}
                rules={[
                  {
                    required: true,
                    message: "Hisob raqam kiriting",
                  },
                ]}
              >
                <InputNumber className="w-full" placeholder="Hisob raqam kiriting..." />
              </Form.Item>
              { onedit
                ? (
                  <Form.Item
                    key="newAccountNumber"
                    name="newAccountNumber"
                    label={<span className="text-base font-medium">Yangi shot raqam</span>}
                  >
                    <InputNumber
                      className="w-full"
                      placeholder="Yangi shot raqam kiriting"
                    />
                  </Form.Item>
                ) : null}
              <Form.Item
                key="discount"
                name="discount"
                label={<span className="text-base font-medium">Chegirma</span>}
                rules={[
                  {
                    required: true,
                    message: "Chegirmani so'mda kiriting",
                  },
                ]}
              >
                <InputNumber
                  formatter={(value) => { return numberWithCommas(value); }}
                  parser={(value) => { return value?.replace(/\$\s?|( *)/g, ""); }}
                  min="0"
                  className="w-full"
                  placeholder="Chegirmani so'mda kiriting..."
                />
              </Form.Item>
              <Form.Item
                key="description"
                name="description"
                label={<span className="text-base font-medium">Sabab</span>}
              >
                <TextArea row={3} placeholder="Chegirma sababini kiriting.." />
              </Form.Item>
              <Form.Item
                key="mainBalanceId"
                name="mainBalanceId"
                label={<span className="text-base font-medium">Hisob raqam tanlash ( Maktab )</span>}
                rules={[
                  {
                    required: true,
                    message: "Hisobdagi pulni kiriting",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Hisob raqam"
                  optionFilterProp="children"
                  className="w-full"
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {balanceReducer?.balance?.map((balance) => {
                    return (
                      <Option value={balance.id} key={balance.id}>{balance?.accountNumber}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                key="studentClassId"
                name="studentClassId"
                label={<span className="text-base font-medium">Sinf</span>}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Sinfni tanlang..."
                  optionFilterProp="children"
                  className="w-full"
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()
                      ?.includes(input.toLowerCase());
                  }}
                  onChange={(newValue) => {
                    newValue && getStudentsAllByClass({
                      classId: newValue,
                      branchId: usersDataReducer.branch?.id,
                    });
                  }}
                >
                  {classReducer?.class?.map((room) => {
                    return (
                      <Option value={room.id} key={room.id}>{room?.className}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                key="studentId"
                name="studentId"
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
                  placeholder="Talaba tanlash"
                  optionFilterProp="children"
                  className="w-full"
                  key="id"
                  onSearch={(input) => {
                    input !== "" && getSearchStudents({
                      name: input.toLowerCase(),
                      page: 1,
                      size: pageData.size,
                    });
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
        totalItems={studentAccountReducer?.accountTotalCount}
        tableData={studentAccountReducer?.account?.map((item) => {
          return ({
            ...item,
            branchId: item.branch?.name,
            studentName: item.student?.firstName,
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
    usersDataReducer, studentReducer, classReducer,
    balanceReducer, studentAccountReducer
  ), {
    getAllBalanceBranch,
    getStudentAccountByBranch,
    getStudentAccountByBranchByClass,
    saveStudentAccount,
    saveStudentPayment,
    editStudentAccount,
    deleteStudentAccount,
    getSearchStudents,
    getClassesAll,
    getStudentsAllByClass,
    searchStudentAccaunt
  }
)(StudentAccount);
