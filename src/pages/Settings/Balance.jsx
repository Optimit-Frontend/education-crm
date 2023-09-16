import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Col, Form, InputNumber, Modal, Row, Select
} from "antd";
import CustomTable from "../../module/CustomTable";
import useKeyPress from "../../hooks/UseKeyPress";
import usersDataReducer from "../../reducer/usersDataReducer";
import balanceReducer, {
  deleteBalance,
  editBalance,
  getAllBalanceBranch,
  saveBalance
} from "../../reducer/balanceReducer";
import businessBranchesReducer, { getBusinessBranch } from "../../reducer/businessBranchesReducer";

const { Option } = Select;

const columns = [
  {
    title: "Akkaunt nomeri",
    dataIndex: "accountNumber",
    key: "accountNumber",
    width: "15%",
    search: false,
  },
  {
    title: "Balans",
    dataIndex: "balance",
    key: "balance",
    width: "20%",
    search: false,
  },
  {
    title: "Naqt pul",
    dataIndex: "cashBalance",
    key: "cashBalance",
    width: "15%",
    search: false,
  },
  {
    title: "Plastik pul",
    dataIndex: "plasticBalance",
    key: "plasticBalance",
    width: "15%",
    search: false,
  },
  {
    title: "Yaratilgan vaqt",
    dataIndex: "date",
    key: "date",
    width: "15%",
    search: false,
  },
  {
    title: "Filial",
    dataIndex: "branchName",
    key: "branchName",
    width: "20%",
    search: false,
  },
];

function Balance({
  deleteBalance,
  editBalance,
  saveBalance,
  getAllBalanceBranch,
  getBusinessBranch,
  usersDataReducer,
  balanceReducer,
  businessBranchesReducer
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
    getAllBalanceBranch(usersDataReducer?.branch?.id);
    getBusinessBranch(usersDataReducer?.businessId);
    setVisible(false);
    setOnedit(false);
    form.resetFields();
    setSelectedRowKeys([[], []]);
  }, [balanceReducer?.changeData]);

  const handleDelete = (arr) => {
    arr?.map((item) => {
      deleteBalance(item);
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
          selectedRowKeys[1][0]?.id && editBalance({ ...values, id: selectedRowKeys[1][0]?.id });
        })
        .catch((info) => {
          console.error("Validate Failed:", info);
        })
      : form
        .validateFields()
        .then((values) => {
          saveBalance(values);
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
      <h3 className="mb-5 text-2xl font-bold">Balanslar</h3>
      <div className="mb-3 flex items-center justify-end gap-5">
        {selectedRowKeys[0].length === 1 && usersDataReducer?.editBalance && (
          <button
            onClick={() => {
              setOnedit(true);
              setVisible(true);
              form.setFieldValue("balance", selectedRowKeys[1][0]?.balance);
              form.setFieldValue("cashBalance", selectedRowKeys[1][0]?.cashBalance);
              form.setFieldValue("plasticBalance", selectedRowKeys[1][0]?.plasticBalance);
              form.setFieldValue("accountNumber", selectedRowKeys[1][0]?.accountNumber);
              form.setFieldValue("branchId", selectedRowKeys[1][0]?.branch?.id);
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
        {
          usersDataReducer.addBalance
            ? (
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
            ) : ""
        }
        {
          usersDataReducer.deleteBalance
            ? (
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
            ) : ""
        }
      </div>
      <Modal
        open={visible}
        title={(
          <h3 className="mb-3 text-xl font-semibold">
            Balans
            {onedit ? "ni taxrirlash" : " qo'shish"}
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
                key="balance"
                name="balance"
                label={<span className="text-base font-medium">Balans</span>}
                rules={[
                  {
                    required: true,
                    message: "Balansni kiriting",
                  },
                ]}
              >
                <InputNumber className="w-full" placeholder="Balansni kiriting..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                key="cashBalance"
                name="cashBalance"
                label={<span className="text-base font-medium">Naqt pul</span>}
                rules={[
                  {
                    required: true,
                    message: "Naqt pulni kiriting",
                  },
                ]}
              >
                <InputNumber className="w-full" placeholder="Naqt pulni kiriting..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                key="plasticBalance"
                name="plasticBalance"
                label={<span className="text-base font-medium">Plastik pul</span>}
                rules={[
                  {
                    required: true,
                    message: "Plastik pulni kiriting",
                  },
                ]}
              >
                <InputNumber className="w-full" placeholder="Plastik pulni kiriting..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                key="accountNumber"
                name="accountNumber"
                label={<span className="text-base font-medium">Balans raqami</span>}
                rules={[
                  {
                    required: true,
                    message: "Balans raqamini kiriting",
                  },
                ]}
              >
                <InputNumber className="w-full" placeholder="Balans raqamini kiriting..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                key="branchId"
                name="branchId"
                label={<span className="text-base font-medium">Filial</span>}
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
            </Col>
          </Row>
        </Form>
      </Modal>
      <CustomTable
        columns={columns}
        pageSizeOptions={[10, 20, 50, 100]}
        current={pageData?.page}
        pageSize={pageData?.size}
        tableData={balanceReducer?.balance?.map((item) => {
          return ({ ...item, branchName: item.branch.name });
        })}
        loading={pageData?.loading}
        setSelectedRowKeys={setSelectedRowKeys}
        selectedRowKeys={selectedRowKeys}
        onChange={onChange}
      />
    </div>
  );
}

export default connect((balanceReducer, businessBranchesReducer, usersDataReducer), {
  deleteBalance, editBalance, saveBalance, getAllBalanceBranch, getBusinessBranch
})(Balance);
