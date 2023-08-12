import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Form } from "antd";
import CustomTable from "../../module/CustomTable";
import studentAccountReducer, { getStudentDebt } from "../../reducer/studentAccountReducer";

const columns = [
  {
    title: "Talaba",
    dataIndex: "firstName",
    key: "firstName",
    width: "30%",
    search: true,
  },
  {
    title: "Shot raqami",
    dataIndex: "accountNumber",
    key: "accountNumber",
    width: "30%",
    search: true,
  },
  {
    title: "Tel raqami",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    width: "30%",
    search: true,
  },
  {
    title: "Qarzi",
    dataIndex: "amountOfDebit",
    key: "amountOfDebit",
    width: "25%",
    search: false,
  },
  {
    title: "Chegirma",
    dataIndex: "discount",
    key: "discount",
    width: "25%",
    search: false,
  },
  {
    title: "Sana",
    dataIndex: "date",
    key: "date",
    width: "30%",
    search: false,
  },
  {
    title: "Filial",
    dataIndex: "branchId",
    key: "branchId",
    width: "20%",
    search: false,
  },
  {
    title: "Amallar",
    dataIndex: "getOneId",
    key: "getOneId",
    width: "30%",
    search: false,
    render: (eski) => {
      return (
        <button style={{ background: "gold", padding: "5px", borderRadius: "5px" }} type="button" onClick={() => { return console.log(eski); }}>
          Ko`rish
        </button>
      );
    }
  },
];

function StudentDebt({
  studentAccountReducer,
  getStudentDebt
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([[], []]);
  const [form] = Form.useForm();
  const size = localStorage.getItem("PageSize") || 10;
  const [pageData, setPageData] = useState({
    page: 1,
    size,
    loading: false,
  });

  useEffect(() => {
    getStudentDebt();
    form.resetFields();
    setSelectedRowKeys([[], []]);
  }, [studentAccountReducer?.changeData]);

  const onChange = (pageNumber, page) => {
    setPageData({ size: page, page: pageNumber, loading: false });
    localStorage.setItem("PageSize", page);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-5">Qarzdor talabalar</h3>
      <CustomTable
        columns={columns}
        pageSizeOptions={[10, 20, 50, 100]}
        current={pageData?.page}
        pageSize={pageData?.size}
        tableData={studentAccountReducer?.debts?.map((item) => {
          return ({
            ...item,
            firstName: item?.student?.firstName,
            phoneNumber: item?.student?.phoneNumber,
            branchId: item?.branch?.name
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

export default connect((studentAccountReducer), { getStudentDebt })(StudentDebt);
