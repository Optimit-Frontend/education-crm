import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTable from "../../module/CustomTable";
import usersDataReducer from "../../reducer/usersDataReducer";
import { measurement } from "../../const";
import warehouseReducer, { getAllWarehouse } from "../../reducer/warehouseReducer";
import productReducer, { getProductsBranch, getProductsWearehouse } from "../../reducer/productReducer";

const { Option } = Select;
const columns = [
  {
    title: "Nomi",
    dataIndex: "name",
    key: "name",
    width: "35%",
    search: false,
  },
  {
    title: "Miqdori",
    dataIndex: "quantity",
    key: "quantity",
    width: "20%",
    search: false,
  },
  {
    title: "O'lchov birlik",
    dataIndex: "measurementType",
    key: "measurementType",
    width: "20%",
    search: false,
    render: (eski) => {
      const meas = measurement?.find((item) => { return item.value === eski; });
      return meas?.name;
    }
  },
  {
    title: "Ombor",
    dataIndex: "warehouseName",
    key: "warehouseName",
    width: "25%",
    search: false,
  }
];

function Product({
  productReducer,
  warehouseReducer,
  usersDataReducer,
  getAllWarehouse,
  getProductsBranch,
  getProductsWearehouse,
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([[], []]);
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
    getProductsBranch({
      page: pageData.page,
      size: pageData.size,
      branchId: usersDataReducer?.branch?.id
    });
    getAllWarehouse(usersDataReducer?.branch?.id);
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

  const onChange = (pageNumber, page) => {
    setPageData({ size: page, page: pageNumber, loading: false });
    searchParams.set("size", page);
    searchParams.set("page", pageNumber);
    localStorage.setItem("PageSize", page);
    navigate(`/kitchen/product?page=${pageNumber}&size=${page}`);
  };

  return (
    <div>
      <h3 className="mb-5 text-2xl font-bold">Mahsulotlar</h3>
      <div className="mb-3 flex items-center justify-between gap-5">
        <div>
          <Select
            onChange={(e) => {
              e ? getProductsWearehouse({
                page: pageData.page,
                size: pageData.size,
                warehouseId: e,
              }) : getProductsBranch({
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
        <div className="flex items-center gap-5" />
      </div>
      <CustomTable
        columns={columns}
        pageSizeOptions={[10, 20, 50, 100]}
        current={pageData?.page}
        pageSize={pageData?.size}
        totalItems={productReducer?.productsTotalCount}
        tableData={productReducer?.products?.map((item) => {
          return {
            ...item,
            warehouseName: item.warehouse?.name,
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
    productReducer,
    warehouseReducer,
    usersDataReducer
  ), {
    getAllWarehouse,
    getProductsBranch,
    getProductsWearehouse,
  }
)(Product);
