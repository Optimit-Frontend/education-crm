import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Col, Form, Input, InputNumber, Modal, Row, Select
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import CustomTable from "../../module/CustomTable";
import useKeyPress from "../../hooks/UseKeyPress";
import usersDataReducer from "../../reducer/usersDataReducer";
import { measurement } from "../../const";
import employeeReducer, { getEmployeeBranchId } from "../../reducer/employeeReducer";
import warehouseReducer, { getAllWarehouse } from "../../reducer/warehouseReducer";
import dailyConsumedProductsReducer, {
  deletedailyConsumedProducts,
  editdailyConsumedProducts,
  getdailyConsumedProductsBranch,
  getdailyConsumedProductsWearehouse,
  savedailyConsumedProducts
} from "../../reducer/dailyConsumedProductsReducer";

const { Option } = Select;
const { TextArea } = Input;

const columns = [
  {
    title: "Nomi",
    dataIndex: "name",
    key: "name",
    width: "15%",
    search: false,
  },
  {
    title: "Miqdori",
    dataIndex: "quantity",
    key: "quantity",
    width: "10%",
    search: false,
  },
  {
    title: "O'lchov birlik",
    dataIndex: "measurementType",
    key: "measurementType",
    width: "15%",
    search: false,
    render: (eski) => {
      const meas = measurement?.find((item) => { return item.value === eski; });
      return meas?.name;
    }
  },
  {
    title: "Ma'lumot",
    dataIndex: "description",
    key: "description",
    width: "15%",
    search: false,
  },
  {
    title: "Vaqti",
    dataIndex: "localDateTime",
    key: "localDateTime",
    width: "15%",
    search: false,
    render: (eski) => {
      return moment(eski).format("HH:mm:ss DD:MM:YYYY");
    }
  },
  {
    title: "Hodim",
    dataIndex: "employeeName",
    key: "employeeName",
    width: "15%",
    search: false,
  },
  {
    title: "Ombor",
    dataIndex: "warehouseName",
    key: "warehouseName",
    width: "10%",
    search: false,
  }
];

function DailyConsumedProducts({
  dailyConsumedProductsReducer,
  employeeReducer,
  warehouseReducer,
  usersDataReducer,
  getEmployeeBranchId,
  getAllWarehouse,
  getdailyConsumedProductsBranch,
  getdailyConsumedProductsWearehouse,
  savedailyConsumedProducts,
  deletedailyConsumedProducts,
  editdailyConsumedProducts
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

  useEffect(() => {
    getdailyConsumedProductsBranch({
      page: pageData.page,
      size: pageData.size,
      branchId: usersDataReducer?.branch?.id
    });
    getAllWarehouse(usersDataReducer?.branch?.id);
    getEmployeeBranchId(usersDataReducer?.branch?.id);
    setVisible(false);
    setOnedit(false);
    form.resetFields();
    setSelectedRowKeys([[], []]);
  }, [dailyConsumedProductsReducer?.changeData]);

  useEffect(() => {
    const pageSize = parseInt(size, 10);
    const pageCount = parseInt(page, 10) >= 1 ? parseInt(page, 10) : 1;
    if (pageSize >= 100) {
      setPageData((prev) => {
        return { ...prev, size: 100 };
      });
      navigate(`/kitchen/dailyconsumedProduct?page=${pageCount}&size=100`);
    } else if (pageSize >= 50) {
      setPageData((prev) => {
        return { ...prev, size: 50 };
      });
      navigate(`/kitchen/dailyconsumedProduct?page=${pageCount}&size=50`);
    } else if (pageSize >= 20) {
      setPageData((prev) => {
        return { ...prev, size: 20 };
      });
      navigate(`/kitchen/dailyconsumedProduct?page=${pageCount}&size=20`);
    } else {
      setPageData((prev) => {
        return { ...prev, size: 10 };
      });
      navigate(`/kitchen/dailyconsumedProduct?page=${pageCount}&size=10`);
    }
  }, []);

  const handleDelete = (arr) => {
    arr?.map((item) => {
      deletedailyConsumedProducts(item);
      return null;
    });
  };

  const onChange = (pageNumber, page) => {
    setPageData({ size: page, page: pageNumber, loading: false });
    searchParams.set("size", page);
    searchParams.set("page", pageNumber);
    localStorage.setItem("PageSize", page);
    navigate(`/kitchen/dailyconsumedProduct?page=${pageNumber}&size=${page}`);
  };

  const formValidate = () => {
    onedit
      ? form
        .validateFields()
        .then((values) => {
          selectedRowKeys[1][0]?.id && editdailyConsumedProducts({
            ...values,
            id: selectedRowKeys[1][0]?.id,
            branchId: usersDataReducer?.branch?.id
          });
        })
        .catch((info) => {
          console.error("Validate Failed:", info);
        })
      : form
        .validateFields()
        .then((values) => {
          savedailyConsumedProducts({ ...values, branchId: usersDataReducer?.branch?.id });
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
      <h3 className="mb-5 text-2xl font-bold">Kunlik ishlatilgan mahsulotlar</h3>
      <div className="mb-3 flex items-center justify-between gap-5">
        <div>
          <Select
            onChange={(e) => {
              e ? getdailyConsumedProductsWearehouse({
                page: pageData.page,
                size: pageData.size,
                warehouseId: e,
              }) : getdailyConsumedProductsBranch({
                page: pageData.page,
                size: pageData.size,
                branchId: usersDataReducer?.branch?.id
              });
            }}
            showSearch
            allowClear
            placeholder="Omborni tanlang..."
            optionFilterProp="children"
            className="w-40"
            key="id"
            filterOption={(input, option) => {
              return option.children.toLowerCase()?.includes(input.toLowerCase());
            }}
          >
            {warehouseReducer?.warehouse?.map((warehouse) => {
              return (
                <Option value={warehouse.id} key={warehouse.id}>
                  {warehouse?.name}
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="flex items-center gap-5">
          {selectedRowKeys[0].length === 1 && (
            <button
              onClick={() => {
                setOnedit(true);
                setVisible(true);
                form.setFieldValue("name", selectedRowKeys[1][0]?.name);
                form.setFieldValue("quantity", selectedRowKeys[1][0]?.quantity);
                form.setFieldValue("description", selectedRowKeys[1][0]?.description);
                form.setFieldValue("measurementType", selectedRowKeys[1][0]?.measurementType);
                form.setFieldValue("warehouseId", selectedRowKeys[1][0]?.warehouse?.id);
                form.setFieldValue("employeeId", selectedRowKeys[1][0]?.employee?.id);
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
      </div>
      <Modal
        open={visible}
        title={(
          <h3 className="mb-3 text-xl font-semibold">
            Kunlik ishlatilgan mahsulot
            {onedit ? "ni taxrirlash" : "ni qo'shish"}
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
                key="name"
                name="name"
                label={<span className="text-base font-medium">Mahsulot nomi</span>}
                rules={[
                  {
                    required: true,
                    message: "Mahsulot nomini kiriting",
                  },
                ]}
              >
                <Input placeholder="Mahsulot nomini kiriting..." />
              </Form.Item>
              <Form.Item
                key="quantity"
                name="quantity"
                label={<span className="text-base font-medium">Mahsulot miqdori</span>}
                rules={[
                  {
                    required: true,
                    message: "Mahsulot miqdorini kiriting",
                  },
                ]}
              >
                <InputNumber placeholder="Mahsulot miqdorini kiriting..." className="w-full" />
              </Form.Item>
              <Form.Item
                key="measurementType"
                name="measurementType"
                label={<span className="text-base font-medium">O&apos;lchov birlik</span>}
                rules={[
                  {
                    required: true,
                    message: "O'lchov birlikini tanlang",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="O'lchov birlikini tanlang"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {measurement?.map((option) => {
                    return (
                      <Option value={option.value} key={option.value}>
                        {option.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                key="description"
                name="description"
                label={<span className="text-base font-medium">Ma&apos;lumot</span>}
                rules={[
                  {
                    required: true,
                    message: "Ma'lumotni kiriting",
                  },
                ]}
              >
                <TextArea rows={3} placeholder="Ma'lumotni kiriting..." />
              </Form.Item>
              <Form.Item
                key="employeeId"
                name="employeeId"
                label={<span className="text-base font-medium">Ishlatuvchi hodim</span>}
                rules={[
                  {
                    required: true,
                    message: "Ishlatuvchi hodimni tanlang",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Ishlatuvchi hodimni tanlang..."
                  optionFilterProp="children"
                  className="w-full"
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {employeeReducer?.employeesAllBranch?.map((room) => {
                    return (
                      <Option value={room.id} key={room.id}>
                        {room?.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                key="warehouseId"
                name="warehouseId"
                label={<span className="text-base font-medium">Ombor</span>}
                rules={[
                  {
                    required: true,
                    message: "Omborni tanlang",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Omborni tanlang..."
                  optionFilterProp="children"
                  className="w-full"
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {warehouseReducer?.warehouse?.map((warehouse) => {
                    return (
                      <Option value={warehouse.id} key={warehouse.id}>
                        {warehouse?.name}
                      </Option>
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
        totalItems={dailyConsumedProductsReducer?.dailyConsumedProductsTotalCount}
        tableData={dailyConsumedProductsReducer?.dailyConsumedProducts?.map((item) => {
          return {
            ...item,
            warehouseName: item.warehouse?.name,
            employeeName: item.employee?.name,
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

export default connect(
  (
    dailyConsumedProductsReducer,
    employeeReducer,
    warehouseReducer,
    usersDataReducer
  ), {
    getEmployeeBranchId,
    getAllWarehouse,
    getdailyConsumedProductsBranch,
    getdailyConsumedProductsWearehouse,
    savedailyConsumedProducts,
    deletedailyConsumedProducts,
    editdailyConsumedProducts
  }
)(DailyConsumedProducts);
