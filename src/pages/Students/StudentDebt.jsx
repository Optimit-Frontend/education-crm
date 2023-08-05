import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Col, Form, Input, Modal, Row, Select
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTable from "../../module/CustomTable";
import useKeyPress from "../../hooks/UseKeyPress";
import usersDataReducer from "../../reducer/usersDataReducer";
import employeeReducer, {
  getEmployeeBranch,
} from "../../reducer/employeeReducer";
import transactionReducer, {
  deleteTransaction, editStudentTransaction,
  editTransaction,
  getTransactionHistoryActiveTrue,
  getTransactionHistoryFindAllBranch,
  getTrasactionHistoryById, saveStudentTransaction, saveTransaction,
} from "../../reducer/transactionReducer";
import balanceReducer, { getAllBalanceBranch } from "../../reducer/balanceReducer";
import studentAccountReducer, {
  getStudentAccountByBranch,
  getStudentDebt,
} from "../../reducer/studentAccountReducer.js";

const { Option } = Select;

const columns = [
  {
    title: "Talaba",
    dataIndex: "firstName",
    key: "firstName",
    width: "30%",
    search: true,
  },
  {
    title: "Shot raqami",
    dataIndex: "accountNumber",
    key: "accountNumber",
    width: "30%",
    search: true,
  },
  {
    title: "Tel raqami",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    width: "30%",
    search: true,
  },
  {
    title: "Qarzi",
    dataIndex: "amountOfDebit",
    key: "amountOfDebit",
    width: "25%",
    search: false,
  },
  {
    title: "Chegirma",
    dataIndex: "discount",
    key: "discount",
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
    title: "Filial",
    dataIndex: "branchId",
    key: "branchId",
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

function StudentDebt({
  usersDataReducer,
  getTransactionHistoryFindAllBranch,
  getStudentAccountByBranch,
  transactionReducer, editStudentTransaction, studentAccountReducer,
  balanceReducer, deleteTransaction, saveStudentTransaction, getStudentDebt
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([[], []]);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [onedit, setOnedit] = useState(false);
  const enter = useKeyPress("Enter");
  const size = localStorage.getItem("PageSize") || 10;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [money, setMoney] = useState(0);
  const page = searchParams.get("page");
  const [pageData, setPageData] = useState({
    page: 1,
    size,
    loading: false,
  });

  useEffect(() => {
    getTransactionHistoryFindAllBranch(usersDataReducer?.branch?.id);
    getAllBalanceBranch(usersDataReducer?.branch?.id);
    getStudentAccountByBranch(usersDataReducer?.branch?.id);
    getStudentDebt();
    // getEmployeeBranchId(usersDataReducer?.branch?.id);
    setVisible(false);
    form.resetFields();
    setSelectedRowKeys([[], []]);
  }, [transactionReducer?.changeData]);

  useEffect(() => {
    const pageSize = parseInt(size, 10);
    const pageCount = parseInt(page, 10) >= 1 ? parseInt(page, 10) : 1;
    if (pageSize >= 100) {
      setPageData((prev) => {
        return { ...prev, size: 100 };
      });
      navigate(`/student-debts?page=${pageCount}&size=100`);
    } else if (pageSize >= 50) {
      setPageData((prev) => {
        return { ...prev, size: 50 };
      });
      navigate(`/student-debts?page=${pageCount}&size=50`);
    } else if (pageSize >= 20) {
      setPageData((prev) => {
        return { ...prev, size: 20 };
      });
      navigate(`/student-debts?page=${pageCount}&size=20`);
    } else {
      setPageData((prev) => {
        return { ...prev, size: 10 };
      });
      navigate(`/student-debts?page=${pageCount}&size=10`);
    }
  }, []);

  const handleDelete = (arr) => {
    arr?.map((item) => {
      deleteTransaction(item);
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
          selectedRowKeys[1][0]?.id && editStudentTransaction({ ...values });
          setOnedit(false);
        })
        .catch((info) => {
          console.error("Validate Failed:", info);
        })
      : form
        .validateFields()
        .then((values) => {
          saveStudentTransaction({ ...values, accountNumber: values?.accountNumber.toString() });
          setOnedit(false);
          console.log(values?.accountNumber.toString());
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
      <h3 className="text-2xl font-bold mb-5">Qarzdor talabalar</h3>
      {/* <div className="flex items-center justify-end gap-5 mb-3"> */}
      {/*   <button */}
      {/*     onClick={() => { */}
      {/*       handleDelete(selectedRowKeys[0]); */}
      {/*       setSelectedRowKeys([[], []]); */}
      {/*       console.log(selectedRowKeys); */}
      {/*     }} */}
      {/*     type="button" */}
      {/*     className="flex items-center gap-2 px-4 py-[6px] bg-red-600 text-white rounded-lg" */}
      {/*   > */}
      {/*     <svg */}
      {/*       xmlns="http://www.w3.org/2000/svg" */}
      {/*       fill="none" */}
      {/*       viewBox="0 0 24 24" */}
      {/*       strokeWidth={1.5} */}
      {/*       stroke="currentColor" */}
      {/*       className="w-5 h-5" */}
      {/*     > */}
      {/*       <path */}
      {/*         strokeLinecap="round" */}
      {/*         strokeLinejoin="round" */}
      {/*         d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" */}
      {/*       /> */}
      {/*     </svg> */}
      {/*     <span>O&apos;chirish</span> */}
      {/*   </button> */}
      {/* </div> */}
      <Modal
        open={visible}
        title={(
          <h3 className="text-xl mb-3 font-semibold">
            Pul o`tkazma
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
                key="money"
                name="money"
                label={<span className="text-base font-medium">Pul miqdori</span>}
                rules={[
                  {
                    required: true,
                    message: "So`mmani kiritng",
                  },
                ]}
              >
                <Input
                  // value={money}
                  // onchange={((e) => { return setMoney(e.target.value); })}
                  type="number"
                  placeholder="So`mmani kiriting ..."
                />
              </Form.Item>
              <Form.Item
                key="accountNumber"
                name="accountNumber"
                label={<span className="text-base font-medium">Talaba hisob raqami</span>}
                rules={[
                  {
                    required: true,
                    message: "Hisob raqami",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Talaba hisob raqami"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {studentAccountReducer?.account?.map((account) => {
                    return (
                      <Option value={account?.accountNumber} key={account.id}>{account?.accountNumber}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                key="expenseType"
                name="expenseType"
                label={<span className="text-base font-medium">O`tkazma turi</span>}
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
                  placeholder="O`tkazma turini tanlang"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  <Option value="SALARY">Maosh</Option>
                  <Option value="PAYMENT">Tulov</Option>
                  <Option value="ADDITIONAL_PAYMENT">Qo`shimcha to`lov</Option>
                  <Option value="ADDITIONAL_EXPENSE">Qo`shimcha xarajat</Option>
                  <Option value="STUDENT_PAYMENT">Talaba to`lov</Option>
                  <Option value="STUDENT_EXPENSE">Talaba xarajati</Option>
                  <Option value="MEAL_EXPENSE">Oziq-ovqat xarajati</Option>
                </Select>
              </Form.Item>
              <Form.Item
                key="mainBalanceId"
                name="mainBalanceId"
                label={<span className="text-base font-medium">Balance raqam tanlash</span>}
                rules={[
                  {
                    required: false,
                    message: "Balance pulni kiriting",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Balance raqam"
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
                key="paidInFull"
                name="paidInFull"
                label={<span className="text-base font-medium">Yillik tulov</span>}
                rules={[
                  {
                    required: false,
                    message: "Yillik tulovni tanlang",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Balance raqam"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  <Option value="true">Ha</Option>
                  <Option value="false">Yuq</Option>
                </Select>
              </Form.Item>
              <Form.Item
                key="comment"
                name="comment"
                label={<span className="text-base font-medium">Qisqa eslatma</span>}
                rules={[
                  {
                    required: false,
                    message: "eslatma ni kiriting",
                  },
                ]}
              >
                <Input type="text" placeholder="qisqa eslatma..." />
              </Form.Item>
              <Form.Item
                key="paymentType"
                name="paymentType"
                label={<span className="text-base font-medium">To`lov turi</span>}
                rules={[
                  {
                    required: false,
                    message: "Tulov turini tanlang",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Tulov turini tanlang"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  <Option value="CASH">Naqd</Option>
                  <Option value="CARD">Karta</Option>
                  <Option value="HISOBDAN_HISOBGA">Hisobdan hisobga</Option>
                  <Option value="ELEKTRON">ELEKTRON</Option>
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
        tableData={studentAccountReducer?.debts?.map((item) => {
          return ({
            ...item,
            firstName: item?.student?.firstName,
            phoneNumber: item?.student?.phoneNumber,
            branchId: item?.branch?.name
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
    usersDataReducer, transactionReducer, balanceReducer, studentAccountReducer
  ), {
    getTransactionHistoryFindAllBranch,
    getTransactionHistoryActiveTrue,
    editTransaction,
    getAllBalanceBranch,
    getEmployeeBranch,
    deleteTransaction,
    saveStudentTransaction,
    getStudentAccountByBranch,
    getStudentDebt,
    editStudentTransaction
  }
)(StudentDebt);
