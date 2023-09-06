import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTable from "../../module/CustomTable";
import studentAccountReducer, { getStudentDebt } from "../../reducer/studentAccountReducer";
import usersDataReducer from "../../reducer/usersDataReducer";

const columns = [
  {
    title: "Shot raqami",
    dataIndex: "accountNumber",
    key: "accountNumber",
    width: "20%",
    search: false,
  },
  {
    title: "Talaba",
    dataIndex: "firstName",
    key: "firstName",
    width: "20%",
    search: false,
  },
  {
    title: "Tel raqami",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    width: "15%",
    search: false,
  },
  {
    title: "Qarzi",
    dataIndex: "amountOfDebit",
    key: "amountOfDebit",
    width: "15%",
    search: false,
  },
  {
    title: "Chegirma",
    dataIndex: "discount",
    key: "discount",
    width: "15%",
    search: false,
  },
  {
    title: "Balans",
    dataIndex: "balance",
    key: "balance",
    width: "15%",
    search: false,
  },
];

function StudentDebt({
  studentAccountReducer,
  usersDataReducer,
  getStudentDebt
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([[], []]);
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
    getStudentDebt({
      branchId: usersDataReducer.branch?.id,
      page: pageData.page,
      size: pageData.size,
    });
    setSelectedRowKeys([[], []]);
  }, [studentAccountReducer?.changeData]);

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

  const onChange = (pageNumber, page) => {
    setPageData({ size: page, page: pageNumber, loading: false });
    searchParams.set("size", page);
    searchParams.set("page", pageNumber);
    localStorage.setItem("PageSize", page);
    navigate(`/student-debts?page=${pageNumber}&size=${page}`);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-5">Qarzdor talabalar</h3>
      <CustomTable
        columns={columns}
        pageSizeOptions={[10, 20, 50, 100]}
        current={pageData?.page}
        pageSize={pageData?.size}
        totalItems={studentAccountReducer?.debtsTotalCount}
        tableData={studentAccountReducer?.debts?.map((item) => {
          return ({
            ...item,
            firstName: item?.student?.firstName,
            phoneNumber: item?.student?.phoneNumber
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

export default connect((studentAccountReducer, usersDataReducer), { getStudentDebt })(StudentDebt);
