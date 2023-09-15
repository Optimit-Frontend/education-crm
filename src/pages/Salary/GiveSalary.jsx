import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Form, Modal, Select
} from "antd";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTable from "../../module/CustomTable";
import useKeyPress from "../../hooks/UseKeyPress";
import usersDataReducer from "../../reducer/usersDataReducer";
import employeeReducer, { getEmployeeBranchId, getUserLists } from "../../reducer/employeeReducer";
import salaryReducer, {
  deleteSalary,
  editSalary,
  saveGiveCashAdvance,
  saveGiveDebtToEmployee,
  getGiveSalary,
  savePartlySalary, saveSalary, giveSalary,
} from "../../reducer/salaryReducer";
import balanceReducer, { getAllBalanceBranch } from "../../reducer/balanceReducer";
import { numberWithCommas } from "../../utils";
import { paymentType } from "../../const";

const { Option } = Select;

const columns = [
  {
    title: "Ism",
    dataIndex: "username",
    key: "username",
    width: "30%",
    search: true,
  },
  {
    title: "Olgan maoshi",
    dataIndex: "cashAdvance",
    key: "cashAdvance",
    width: "30%",
    search: false,
    render: (eski) => {
      return numberWithCommas(eski);
    }
  },
  {
    title: "Sana",
    dataIndex: "date",
    key: "date",
    width: "20%",
    search: false,
    render: (eski) => {
      return dayjs(eski).format("DD-MM-YYYY");
    }
  },
  {
    title: "Maosh ( stabilniy )",
    dataIndex: "fix",
    key: "fix",
    width: "30%",
    search: false,
    render: (eski) => {
      return numberWithCommas(eski);
    }
  },
  {
    title: "Qarzi",
    dataIndex: "amountDebt",
    key: "amountDebt",
    width: "20%",
    search: false,
    render: (eski) => {
      return numberWithCommas(eski);
    }
  },
];

function GiveSalary({
  usersDataReducer,
  getGiveSalary,
  giveSalary,
  salaryReducer,
  getUserLists,
  employeeReducer,
  editSalary,
  deleteSalary,
  getAllBalanceBranch
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([[], []]);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [onedit, setOnedit] = useState(false);
  const enter = useKeyPress("Enter");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const size = localStorage.getItem("PageSize") || 10;
  const [pageData, setPageData] = useState({
    page: 1,
    size,
    loading: false,
  });

  useEffect(() => {
    getGiveSalary(usersDataReducer?.branch?.id);
    getUserLists();
    getAllBalanceBranch(usersDataReducer?.branch?.id);
    setVisible(false);
    form.resetFields();
    setSelectedRowKeys([[], []]);
  }, [salaryReducer?.changeData]);

  useEffect(() => {
    const pageSize = parseInt(size, 10);
    const pageCount = parseInt(page, 10) >= 1 ? parseInt(page, 10) : 1;
    if (pageSize >= 100) {
      setPageData((prev) => {
        return { ...prev, size: 100 };
      });
      navigate(`/give-salaries?page=${pageCount}&size=100`);
    } else if (pageSize >= 50) {
      setPageData((prev) => {
        return { ...prev, size: 50 };
      });
      navigate(`/give-salaries?page=${pageCount}&size=50`);
    } else if (pageSize >= 20) {
      setPageData((prev) => {
        return { ...prev, size: 20 };
      });
      navigate(`/give-salaries?page=${pageCount}&size=20`);
    } else {
      setPageData((prev) => {
        return { ...prev, size: 10 };
      });
      navigate(`/give-salaries?page=${pageCount}&size=10`);
    }
  }, []);

  const handleDelete = (arr) => {
    arr?.map((item) => {
      deleteSalary(item?.user?.phoneNumber);
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
          selectedRowKeys[1][0]?.id && editSalary({
            ...values,
            id: selectedRowKeys[1][0]?.id,
          });
          setOnedit(false);
        })
        .catch((info) => {
          console.error("Validate Failed:", info);
        })
      : form
        .validateFields()
        .then((values) => {
          giveSalary({
            id: values.id,
            branchId: usersDataReducer?.branch?.id,
            withholdingOfDebtIfAny: values?.withholdingOfDebtIfAny,
            paymentType: values.paymentType
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
      <h3 className="text-2xl font-bold mb-5">Maosh Berish</h3>
      <div className="flex items-center justify-end gap-5 mb-3">
        {selectedRowKeys[0].length === -1 && (
          <button
            onClick={() => {
              setOnedit(true);
              setVisible(true);
              form.setFieldValue("phoneNumber", selectedRowKeys[1][0]?.user?.phoneNumber);
              form.setFieldValue("startDate", dayjs(selectedRowKeys[1][0]?.startDate));
              form.setFieldValue("date", dayjs(selectedRowKeys[1][0]?.date));
              form.setFieldValue("fix", selectedRowKeys[1][0]?.fix);
              form.setFieldValue("mainBalanceId", selectedRowKeys[1][0]?.mainBalanceId);
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
            Maosh
            {onedit ? "ni taxrirlash" : " qo'shish"}
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
          <Form.Item
            key="paymentType"
            name="paymentType"
            label={<span className="text-base font-medium">Maosh turi</span>}
            rules={[
              {
                required: true,
                message: "Maosh turi kiriting",
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              placeholder="Tulov turi tanlang"
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
          <Form.Item
            key="withholdingOfDebtIfAny"
            name="withholdingOfDebtIfAny"
            label={<span className="text-base font-medium">Qarz</span>}
            rules={[
              {
                required: true,
                message: "Tanlang",
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              placeholder="Tanlash"
              optionFilterProp="children"
              style={{ width: "100%" }}
              key="id"
              filterOption={(input, option) => {
                return option.children.toLowerCase()?.includes(input.toLowerCase());
              }}
            >
              <Option value="true">Qarz</Option>
              <Option value="false">Qarz -</Option>
            </Select>
          </Form.Item>
          <Form.Item
            key="id"
            name="id"
            label={<span className="text-base font-medium">Xodim tanlash</span>}
            rules={[
              {
                required: true,
                message: "Xodim kiriting",
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              placeholder="Xodim tanlash"
              optionFilterProp="children"
              style={{ width: "100%" }}
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
          </Form.Item>
        </Form>
      </Modal>
      <CustomTable
        columns={columns}
        pageSizeOptions={[10, 20, 50, 100]}
        current={pageData?.page}
        pageSize={pageData?.size}
        tableData={salaryReducer?.salaries?.map((item) => {
          return ({
            ...item,
            branchName: item.branch?.name,
            username: item?.user?.name
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
  (usersDataReducer, employeeReducer, salaryReducer, balanceReducer),
  {
    getGiveSalary,
    savePartlySalary,
    saveGiveDebtToEmployee,
    saveGiveCashAdvance,
    saveSalary,
    editSalary,
    deleteSalary,
    getEmployeeBranchId,
    getAllBalanceBranch,
    getUserLists,
    giveSalary
  }
)(GiveSalary);
