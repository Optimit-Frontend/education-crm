import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTable from "../../module/CustomTable";
import usersDataReducer from "../../reducer/usersDataReducer";
import roleReducer, {
  deleteRole,
  editRole,
  getRoleBranch,
  saveRole
} from "../../reducer/roleReducer";

const columns = [
  {
    title: "Lavozim",
    dataIndex: "name",
    key: "name",
    width: "60%",
    search: false,
  },
  {
    title: "Holati",
    dataIndex: "active",
    key: "active",
    width: "40%",
    search: false,
    render: (eski) => {
      return eski ? (
        <span className="bg-green-200 text-green-700 py-1 px-3 rounded-full text-xs">Active</span>
      ) : (
        <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Nofaol</span>
      );
    },
  },
];

function Role({
  roleReducer,
  usersDataReducer,
  deleteRole,
  getRoleBranch
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
    getRoleBranch({
      page: pageData.page,
      size: pageData.size,
      branchId: usersDataReducer?.branch?.id
    });
    setSelectedRowKeys([[], []]);
  }, [roleReducer?.changeData]);

  useEffect(() => {
    const pageSize = parseInt(size, 10);
    const pageCount = parseInt(page, 10) >= 1 ? parseInt(page, 10) : 1;
    if (pageSize >= 100) {
      setPageData((prev) => {
        return { ...prev, size: 100 };
      });
      navigate(`/employee/role?page=${pageCount}&size=100`);
    } else if (pageSize >= 50) {
      setPageData((prev) => {
        return { ...prev, size: 50 };
      });
      navigate(`/employee/role?page=${pageCount}&size=50`);
    } else if (pageSize >= 20) {
      setPageData((prev) => {
        return { ...prev, size: 20 };
      });
      navigate(`/employee/role?page=${pageCount}&size=20`);
    } else {
      setPageData((prev) => {
        return { ...prev, size: 10 };
      });
      navigate(`/employee/role?page=${pageCount}&size=10`);
    }
  }, []);

  const handleDelete = (arr) => {
    arr?.map((item) => {
      deleteRole(item);
      return null;
    });
  };

  const onChange = (pageNumber, page) => {
    setPageData({ size: page, page: pageNumber, loading: false });
    searchParams.set("size", page);
    searchParams.set("page", pageNumber);
    localStorage.setItem("PageSize", page);
    navigate(`/employee/role?page=${pageNumber}&size=${page}`);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-5">Lavozimlar</h3>
      <div className="flex items-center justify-end gap-5 mb-3">
        {selectedRowKeys[0].length === 1 && usersDataReducer?.editRole && (
          <button
            onClick={() => {
              navigate(`/roles/${selectedRowKeys[0][0]}`);
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
        {
          usersDataReducer?.deleteRole
            ? (
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
            ) : ""
        }
        {
          usersDataReducer?.addRole
            ? (
              <button
                onClick={() => {
                  navigate("/roles");
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
            ) : ""
        }
      </div>
      <CustomTable
        columns={columns}
        pageSizeOptions={[10, 20, 50, 100]}
        current={pageData?.page}
        pageSize={pageData?.size}
        totalItems={roleReducer?.roleTotalCount}
        tableData={roleReducer?.role}
        loading={pageData?.loading}
        setSelectedRowKeys={setSelectedRowKeys}
        selectedRowKeys={selectedRowKeys}
        onChange={onChange}
      />
    </div>
  );
}

export default connect((roleReducer, usersDataReducer), {
  getRoleBranch,
  saveRole,
  deleteRole,
  editRole
})(Role);
