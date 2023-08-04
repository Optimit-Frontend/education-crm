import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Col, Form, Input, InputNumber, Modal, Row, Select
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTable from "../../module/CustomTable";
import useKeyPress from "../../hooks/UseKeyPress";
import usersDataReducer from "../../reducer/usersDataReducer";
import productReducer, {
  deleteProduct,
  editProduct,
  getProductBranchPage,
  saveProduct
} from "../../reducer/productReducer";
import measurmentReducer, { getAllMeasurement } from "../../reducer/measurmentReducer";

const { Option } = Select;
const { TextArea } = Input;

const columns = [
  {
    title: "Mahsulot nomi",
    dataIndex: "name",
    key: "name",
    width: "25%",
    search: false,
  },
  {
    title: "Narxi",
    dataIndex: "price",
    key: "price",
    width: "15%",
    search: false,
  },
  {
    title: "Ma'lumot",
    dataIndex: "description",
    key: "description",
    width: "40%",
    search: false,
  },
  {
    title: "O'lchov birlik",
    dataIndex: "measurementName",
    key: "measurementName",
    width: "20%",
    search: false,
  }
];

function Product({
  productReducer,
  measurmentReducer,
  usersDataReducer,
  getAllMeasurement,
  getProductBranchPage,
  saveProduct,
  deleteProduct,
  editProduct
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
    getAllMeasurement(usersDataReducer?.branch?.id);
    getProductBranchPage({
      page: pageData.page,
      size: pageData.size,
      branchId: usersDataReducer?.branch?.id
    });
    setVisible(false);
    form.resetFields();
    setSelectedRowKeys([[], []]);
  }, [productReducer?.changeData]);

  useEffect(() => {
    const pageSize = parseInt(size, 10);
    const pageCount = parseInt(page, 10) >= 1 ? parseInt(page, 10) : 1;
    if (pageSize >= 100) {
      setPageData((prev) => {
        return { ...prev, size: 100 };
      });
      navigate(`/kitchen/product?page=${pageCount}&size=100`);
    } else if (pageSize >= 50) {
      setPageData((prev) => {
        return { ...prev, size: 50 };
      });
      navigate(`/kitchen/product?page=${pageCount}&size=50`);
    } else if (pageSize >= 20) {
      setPageData((prev) => {
        return { ...prev, size: 20 };
      });
      navigate(`/kitchen/product?page=${pageCount}&size=20`);
    } else {
      setPageData((prev) => {
        return { ...prev, size: 10 };
      });
      navigate(`/kitchen/product?page=${pageCount}&size=10`);
    }
  }, []);

  const handleDelete = (arr) => {
    arr?.map((item) => {
      deleteProduct(item);
      return null;
    });
  };

  const onChange = (pageNumber, page) => {
    setPageData({ size: page, page: pageNumber, loading: false });
    searchParams.set("size", page);
    searchParams.set("page", pageNumber);
    localStorage.setItem("PageSize", page);
    navigate(`/kitchen/product?page=${pageNumber}&size=${page}`);
  };

  const formValidate = () => {
    onedit
      ? form
        .validateFields()
        .then((values) => {
          selectedRowKeys[1][0]?.id && editProduct({
            ...values,
            id: selectedRowKeys[1][0]?.id,
            branchId: usersDataReducer?.branch?.id
          });
          setOnedit(false);
        })
        .catch((info) => {
          console.error("Validate Failed:", info);
        })
      : form
        .validateFields()
        .then((values) => {
          saveProduct({ ...values, branchId: usersDataReducer?.branch?.id });
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
      <h3 className="text-2xl font-bold mb-5">Mahsulotlar</h3>
      <div className="flex items-center justify-end gap-5 mb-3">
        {selectedRowKeys[0].length === 1 && (
          <button
            onClick={() => {
              setOnedit(true);
              setVisible(true);
              form.setFieldValue("name", selectedRowKeys[1][0]?.name);
              form.setFieldValue("price", selectedRowKeys[1][0]?.price);
              form.setFieldValue("description", selectedRowKeys[1][0]?.description);
              form.setFieldValue("measurementId", selectedRowKeys[1][0]?.measurement?.id);
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
            Mahsulot
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
                key="price"
                name="price"
                label={<span className="text-base font-medium">Mahsulot narxi</span>}
                rules={[
                  {
                    required: true,
                    message: "Mahsulot narxini kiriting",
                  },
                ]}
              >
                <InputNumber placeholder="Mahsulot narxini kiriting..." className="w-full" />
              </Form.Item>
              <Form.Item
                key="description"
                name="description"
                label={<span className="text-base font-medium">Mahsulot haqida ma&apos;lumot</span>}
                rules={[
                  {
                    required: true,
                    message: "Mahsulot haqida ma'lumotni kiriting",
                  },
                ]}
              >
                <TextArea rows={3} placeholder="Mahsulot haqida ma'lumotni kiriting..." />
              </Form.Item>
              <Form.Item
                key="measurementId"
                name="measurementId"
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
                  filterOption={
                    (input, option) => {
                      return option.children.toLowerCase()?.includes(input.toLowerCase());
                    }
                  }
                >
                  {measurmentReducer?.measurment?.map((option) => {
                    return (
                      <Option value={option.id} key={option.id}>
                        {option.name}
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
        totalItems={productReducer?.productTotalCount}
        tableData={productReducer?.product?.map((item) => {
          return ({ ...item, measurementName: item?.measurement?.name });
        })}
        loading={pageData?.loading}
        setSelectedRowKeys={setSelectedRowKeys}
        selectedRowKeys={selectedRowKeys}
        onChange={onChange}
      />
    </div>
  );
}

export default connect((productReducer, measurmentReducer, usersDataReducer), {
  getAllMeasurement,
  getProductBranchPage,
  saveProduct,
  deleteProduct,
  editProduct
})(Product);
