import { connect } from "react-redux";
import { useState } from "react";
import userReducer, { addUser, deleteUser, editUser, getUsers } from "../../reducer/userReducer";
import CustomTable from "../../module/CustomTable";

const columns = [
  {
    title: "FIO",
    dataIndex: "fullName",
    key: "fullName",
    width: "300px",
    search: true,
  },
  {
    title: "Haqida",
    dataIndex: "about",
    key: "about",
    width: "400px",
    search: false,
  },
];

function AddUser({ usersDataReducer }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([[], []]);
  const [pageData, setPageData] = useState({
    page: 1,
    pageSize: 10,
    loading: false,
  });

  const onChange = (pageNumber, page) => {
    setPageData({ pageSize: page, page: pageNumber, loading: false });
  };

  return (
    <div>
      <CustomTable
        columns={columns}
        pageSizeOptions={[10, 20, 50, 100]}
        current={pageData.page}
        pageSize={pageData.pageSize}
        // tableData={subjects?.data}
        loading={pageData.loading}
        setSelectedRowKeys={setSelectedRowKeys}
        selectedRowKeys={selectedRowKeys}
        onChange={onChange}
      />
    </div>
  );
}

export default connect(userReducer, { getUsers, addUser, editUser, deleteUser })(AddUser);
