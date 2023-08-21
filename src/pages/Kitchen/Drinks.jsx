import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTable from "../../module/CustomTable";
import usersDataReducer from "../../reducer/usersDataReducer";
import warehouseReducer, { getAllWarehouse } from "../../reducer/warehouseReducer";
import drinksReducer, { getDrinksBranch, getDrinksWearehouse } from "../../reducer/drinksReducer";

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
    title: "Soni",
    dataIndex: "count",
    key: "count",
    width: "20%",
    search: false,
  },
  {
    title: "Liter miqdori",
    dataIndex: "literQuantity",
    key: "literQuantity",
    width: "20%",
    search: false,
  },
  {
    title: "Ombor",
    dataIndex: "warehouseName",
    key: "warehouseName",
    width: "25%",
    search: false,
  }
];

function Drinks({
  drinksReducer,
  warehouseReducer,
  usersDataReducer,
  getAllWarehouse,
  getDrinksBranch,
  getDrinksWearehouse,
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
    getDrinksBranch({
      page: pageData.page,
      size: pageData.size,
      branchId: usersDataReducer?.branch?.id
    });
    getAllWarehouse(usersDataReducer?.branch?.id);
    setSelectedRowKeys([[], []]);
  }, [drinksReducer?.changeData]);

  useEffect(() => {
    const pageSize = parseInt(size, 10);
    const pageCount = parseInt(page, 10) >= 1 ? parseInt(page, 10) : 1;
    if (pageSize >= 100) {
      setPageData((prev) => {
        return { ...prev, size: 100 };
      });
      navigate(`/kitchen/drinks?page=${pageCount}&size=100`);
    } else if (pageSize >= 50) {
      setPageData((prev) => {
        return { ...prev, size: 50 };
      });
      navigate(`/kitchen/drinks?page=${pageCount}&size=50`);
    } else if (pageSize >= 20) {
      setPageData((prev) => {
        return { ...prev, size: 20 };
      });
      navigate(`/kitchen/drinks?page=${pageCount}&size=20`);
    } else {
      setPageData((prev) => {
        return { ...prev, size: 10 };
      });
      navigate(`/kitchen/drinks?page=${pageCount}&size=10`);
    }
  }, []);

  const onChange = (pageNumber, page) => {
    setPageData({ size: page, page: pageNumber, loading: false });
    searchParams.set("size", page);
    searchParams.set("page", pageNumber);
    localStorage.setItem("PageSize", page);
    navigate(`/kitchen/drinks?page=${pageNumber}&size=${page}`);
  };

  return (
    <div>
      <h3 className="mb-5 text-2xl font-bold">Ichimliklar</h3>
      <div className="mb-3 flex items-center justify-between gap-5">
        <div>
          <Select
            onChange={(e) => {
              e ? getDrinksWearehouse({
                page: pageData.page,
                size: pageData.size,
                warehouseId: e,
              }) : getDrinksBranch({
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
        totalItems={drinksReducer?.drinksTotalCount}
        tableData={drinksReducer?.drinks?.map((item) => {
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

export default connect((drinksReducer, warehouseReducer, usersDataReducer), {
  getAllWarehouse,
  getDrinksBranch,
  getDrinksWearehouse,
})(Drinks);
