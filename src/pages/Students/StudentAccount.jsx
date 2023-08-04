import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Col, Form, Input, Modal, Row, Select
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTable from "../../module/CustomTable";
import useKeyPress from "../../hooks/UseKeyPress";
import usersDataReducer from "../../reducer/usersDataReducer";
import balanceReducer, { getAllBalanceBranch } from "../../reducer/balanceReducer";
import studentAccountReducer, {
  deleteStudentAccount,
  editStudentAccount,
  getStudentAccountByBranch,
  getStudentAccountById, saveStudentAccount, saveStudentPayment,
} from "../../reducer/studentAccountReducer";
import studentReducer, { getStudentsAll } from "../../reducer/studentReducer";

const { Option } = Select;

const columns = [
  {
    title: "Talaba",
    dataIndex: "student",
    key: "student",
    width: "30%",
    search: true,
  },
  {
    title: "Hisob raqam",
    dataIndex: "accountNumber",
    key: "accountNumber",
    width: "30%",
    search: true,
  },
  {
    title: "Filial",
    dataIndex: "branchId",
    key: "branchId",
    width: "25%",
    search: false,
  },
  {
    title: "Sana",
    dataIndex: "date",
    key: "date",
    width: "30%",
    search: false,
  },
  {
    title: "Qarz",
    dataIndex: "amountOfDebit",
    key: "amountOfDebit",
    width: "20%",
    search: false,
  },
  {
    title: "Amallar",
    dataIndex: "getOneId",
    key: "getOneId",
    width: "30%",
    search: false,
    render: (eski) => {
      return (
        <button style={{ background: "gold", padding: "5px", borderRadius: "5px" }} type="button" onClick={() => { return console.log(eski); }}>
          Ko`rish
        </button>
      );
    }
  },
];

function StudentAccount({
  usersDataReducer,
  getAllBalanceBranch, studentAccountReducer, getStudentsAll, studentReducer,
  balanceReducer, deleteStudentAccount, editStudentAccount, saveStudentPayment, saveStudentAccount, getStudentAccountByBranch, getStudentAccountById
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([[], []]);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [onedit, setOnedit] = useState(false);
  const enter = useKeyPress("Enter");
  const [newAccountNumber, setNewAccountNumber] = useState(0);
  const [accNumber, setAccNumber] = useState(null);
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
    getStudentAccountByBranch(usersDataReducer?.branch?.id);
    getAllBalanceBranch(usersDataReducer?.branch?.id);
    getStudentsAll({ branchId: usersDataReducer.branch?.id, page: pageData.page, size: pageData.size });
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
      deleteStudentAccount(parseInt(item?.accountNumber, 10));
      return null;
    });
    console.log(arr);
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
          selectedRowKeys[1][0]?.id && editStudentAccount({
            ...values,
            // id: selectedRowKeys[1][0]?.id,
            // accountNumber: selectedRowKeys[1][0]?.accountNumber,
            newAccountNumber: newAccountNumber || "0",
          });
          console.log(selectedRowKeys);
          setOnedit(false);
        })
        .catch((info) => {
          console.error("Validate Failed:", info);
        })
      : form
        .validateFields()
        .then((values) => {
          saveStudentAccount({
            ...values,
            // discount: parseInt(selectedRowKeys[1][0].discount, 10)
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
      <h3 className="text-2xl font-bold mb-5">Talaba hisob raqamlari</h3>
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
            console.log(selectedRowKeys);
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
            Talaba hisob raqami
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
                key="accountNumber"
                name="accountNumber"
                label={<span className="text-base font-medium">Shot raqam </span>}
                rules={[
                  {
                    required: false,
                    message: "Hisobdagi pulni kiriting",
                  },
                ]}
              >
                <Input type="number" placeholder="Shot raqam kiriting" />
              </Form.Item>
              <Form.Item
                key="discount"
                name="discount"
                label={<span className="text-base font-medium">Chegirma % </span>}
                rules={[
                  {
                    required: false,
                    message: "Chegirma %",
                  },
                ]}
              >
                <Input type="number" placeholder="Chegirma %" />
              </Form.Item>
              <Form.Item
                key="mainBalanceId"
                name="mainBalanceId"
                label={<span className="text-base font-medium">Hisob raqam tanlash</span>}
                rules={[
                  {
                    required: false,
                    message: "Hisobdagi pulni kiriting",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Hisobd raqam"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
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
            </Col>
            <Col span={12}>
              { onedit
                ? (
                  <Form.Item
                    key="newAccountNumber"
                    name="newAccountNumber"
                    label={<span className="text-base font-medium">Yangi shot raqam </span>}
                    rules={[
                      {
                        required: false,
                        message: "Hisobdagi pulni kiriting",
                      },
                    ]}
                  >
                    <Input
                      value={newAccountNumber}
                      onChange={(e) => { return setNewAccountNumber(e.target.value); }}
                      type="number"
                      placeholder="yangi shot raqam kiriting"
                    />
                  </Form.Item>
                ) : ""}
              <Form.Item
                key="branchId"
                name="branchId"
                label={<span className="text-base font-medium">Filial ( Branch )</span>}
                rules={[
                  {
                    required: false,
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
                  <Option value={1}>1</Option>
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
                  style={{ width: "100%" }}
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {studentReducer?.students?.studentResponseDtoList?.map((student) => {
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
        tableData={studentAccountReducer?.account?.map((item) => {
          return ({
            ...item,
            branchId: item.branch?.name,
            student: item.student?.firstName,
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
    usersDataReducer, studentReducer,
    balanceReducer, studentAccountReducer
  ), {
    getAllBalanceBranch,
    getStudentAccountById,
    getStudentAccountByBranch,
    saveStudentAccount,
    saveStudentPayment,
    editStudentAccount,
    deleteStudentAccount,
    getStudentsAll
  }
)(StudentAccount);
