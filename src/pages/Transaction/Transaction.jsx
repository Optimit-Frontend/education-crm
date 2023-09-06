import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Form, Input, InputNumber, Modal, Row, Select
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import CustomTable from "../../module/CustomTable";
import useKeyPress from "../../hooks/UseKeyPress";
import usersDataReducer from "../../reducer/usersDataReducer";
import transactionReducer, {
  deleteTransaction,
  editTransaction,
  getTransactionHistoryFindAllBranch,
  saveTransaction,
} from "../../reducer/transactionReducer";
import balanceReducer, { getAllBalanceBranch } from "../../reducer/balanceReducer";
import { expenseType, paymentType } from "../../const";
import FormLayoutComp from "../../components/FormLayoutComp";

const { Option } = Select;

const columns = [
  {
    title: "Otkazma",
    dataIndex: "moneyAmount",
    key: "moneyAmount",
    width: "30%",
    search: false,
  },
  {
    title: "Tulov usuli",
    dataIndex: "paymentType",
    key: "paymentType",
    width: "25%",
    search: false,
    render: (eski) => {
      const payment = paymentType?.find((item) => { return item.value === eski; });
      return payment?.name;
    }
  },
  {
    title: "Otkazma turi",
    dataIndex: "expenseType",
    key: "expenseType",
    width: "25%",
    search: false,
    render: (eski) => {
      const expense = expenseType?.find((item) => { return item.value === eski; });
      return expense?.name;
    }
  },
  {
    title: "Sana",
    dataIndex: "date",
    key: "date",
    width: "30%",
    search: false,
    render: (eski) => {
      return moment(eski).format("HH:mm:ss DD:MM:YYYY");
    }
  },
  {
    title: "Qisqa eslatma",
    dataIndex: "comment",
    key: "comment",
    width: "20%",
    search: false,
  },
];

function Transaction({
  usersDataReducer,
  getAllBalanceBranch,
  getTransactionHistoryFindAllBranch,
  saveTransaction,
  editTransaction,
  transactionReducer,
  balanceReducer, deleteTransaction
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

  useEffect(() => {
    getTransactionHistoryFindAllBranch({
      branchId: usersDataReducer?.branch?.id,
      page: pageData.page,
      size: pageData.size
    });
    getAllBalanceBranch(usersDataReducer?.branch?.id);
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
      navigate(`/transactions?page=${pageCount}&size=100`);
    } else if (pageSize >= 50) {
      setPageData((prev) => {
        return { ...prev, size: 50 };
      });
      navigate(`/transactions?page=${pageCount}&size=50`);
    } else if (pageSize >= 20) {
      setPageData((prev) => {
        return { ...prev, size: 20 };
      });
      navigate(`/transactions?page=${pageCount}&size=20`);
    } else {
      setPageData((prev) => {
        return { ...prev, size: 10 };
      });
      navigate(`/transactions?page=${pageCount}&size=10`);
    }
  }, []);

  const handleDelete = (arr) => {
    arr?.map((item) => {
      deleteTransaction(item);
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
    navigate(`/transactions?page=${pageNumber}&size=${page}`);
  };

  const formValidate = () => {
    onedit
      ? form
        .validateFields()
        .then((values) => {
          selectedRowKeys[1][0]?.id && editTransaction({
            ...values,
            id: selectedRowKeys[1][0].id,
            branchId: usersDataReducer?.branch?.id,
          });
          setOnedit(false);
        })
        .catch((info) => {
          console.error("Validate Failed:", info);
        })
      : form
        .validateFields()
        .then((values) => {
          saveTransaction({
            ...values,
            branchId: usersDataReducer?.branch?.id
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
      <h3 className="text-2xl font-bold mb-5">Hamma o`tkazmalar</h3>
      <div className="flex items-center justify-end gap-5 mb-3">
        {selectedRowKeys[0].length === 1 && (
          <button
            onClick={() => {
              setOnedit(true);
              setVisible(true);
              // form.setFieldValue("moneyAmount", parseFloat(selectedRowKeys[1][0]?.moneyAmount));
              form.setFieldValue("moneyAmount", selectedRowKeys[1][0]?.moneyAmount);
              form.setFieldValue("comment", selectedRowKeys[1][0]?.comment);
              form.setFieldValue("expenseType", selectedRowKeys[1][0]?.expenseType);
              form.setFieldValue("branchId", selectedRowKeys[1][0]?.branch?.id);
              form.setFieldValue("paymentType", selectedRowKeys[1][0]?.paymentType);
              form.setFieldValue("accountNumber", selectedRowKeys[1][0]?.accountNumber);
              form.setFieldValue("mainBalanceId", selectedRowKeys[1][0]?.mainBalanceResponse?.accountNumber);
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
            <FormLayoutComp>
              <Form.Item
                key="moneyAmount"
                name="moneyAmount"
                label={<span className="text-base font-medium">Pul miqdori</span>}
                rules={[
                  {
                    required: true,
                    message: "So`mmani kiritng",
                  },
                ]}
              >
                <InputNumber
                  className="w-full"
                  placeholder="So`mmani kiriting ..."
                />
              </Form.Item>
            </FormLayoutComp>
            <FormLayoutComp>
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
                  {expenseType?.map((option) => {
                    return (
                      <Option value={option.value} key={option.value}>
                        {option.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </FormLayoutComp>
            <FormLayoutComp>
              <Form.Item
                key="mainBalanceId"
                name="mainBalanceId"
                label={<span className="text-base font-medium">Balance raqam tanlash</span>}
                rules={[
                  {
                    required: true,
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
            </FormLayoutComp>
            <FormLayoutComp>
              <Form.Item
                key="comment"
                name="comment"
                label={<span className="text-base font-medium">Qisqa eslatma</span>}
                rules={[
                  {
                    required: true,
                    message: "eslatma ni kiriting",
                  },
                ]}
              >
                <Input placeholder="qisqa eslatma..." />
              </Form.Item>
            </FormLayoutComp>
            <FormLayoutComp>
              <Form.Item
                key="paymentType"
                name="paymentType"
                label={<span className="text-base font-medium">To`lov turi</span>}
                rules={[
                  {
                    required: true,
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
                  {paymentType?.map((option) => {
                    return (
                      <Option value={option.value} key={option.value}>
                        {option.name}
                      </Option>
                    );
                  })}
                </Select>
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
        tableData={transactionReducer?.transaction}
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
    usersDataReducer, transactionReducer, balanceReducer
  ), {
    getTransactionHistoryFindAllBranch,
    saveTransaction,
    editTransaction,
    getAllBalanceBranch,
    deleteTransaction
  }
)(Transaction);
