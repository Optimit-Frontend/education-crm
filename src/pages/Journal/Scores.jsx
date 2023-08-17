import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Col, Form, Input, InputNumber, Modal, Row, Select,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTable from "../../module/CustomTable";
import useKeyPress from "../../hooks/UseKeyPress";
import usersDataReducer from "../../reducer/usersDataReducer";
import balanceReducer, { getAllBalanceBranch } from "../../reducer/balanceReducer";
import studentHomeworkReducer, {
  deleteHomework,
  editHomework,
  getHomeWorkList,
  saveHomework,
} from "../../reducer/studentHomeworkReducer.js";
import subjectReducer, { getSubject } from "../../reducer/subjectReducer.js";
import classReducer, { getClassesAll } from "../../reducer/classReducer.js";
import employeeReducer, { getEmployeeBranch, getUserLists } from "../../reducer/employeeReducer.js";
import scoreReducer, {
  deleteScore,
  editScore,
  getScores,
  saveScore,
} from "../../reducer/scoreReducer.js";
import businessBranchesReducer, { getBusinessBranch } from "../../reducer/businessBranchesReducer.js";

const { Option } = Select;

const columns = [
  {
    title: "Fan",
    dataIndex: "subjectName",
    key: "subjectName",
    width: "30%",
    search: true,
  },
  {
    title: "Mavzu raqam",
    dataIndex: "topicNumber",
    key: "topicNumber",
    width: "30%",
    search: true,
  },
  {
    title: "Uy ishi",
    dataIndex: "homework",
    key: "homework",
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
    title: "Qisqa eslatma",
    dataIndex: "description",
    key: "description",
    width: "20%",
    search: false,
  },
  {
    title: "Dars soati",
    dataIndex: "lessonHour",
    key: "lessonHour",
    width: "30%",
    search: false,
  },
];

function StudentHomework({
  usersDataReducer,
  getEmployeeBranch, employeeReducer, getUserLists, scoreReducer, getScores, saveScore, editScore, deleteScore,
  subjectReducer, classReducer, getSubject, getClassesAll, getBusinessBranch,
  studentHomeworkReducer, getHomeWorkList, saveHomework, editHomework, deleteHomework, businessBranchesReducer
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([[], []]);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [onedit, setOnedit] = useState(false);
  const enter = useKeyPress("Enter");
  const size = localStorage.getItem("PageSize") || 10;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const page = searchParams.get("page");
  const [pageData, setPageData] = useState({
    page: 1,
    size,
    loading: false,
  });

  useEffect(() => {
    getHomeWorkList();
    getClassesAll({ id: usersDataReducer?.branch?.id });
    getSubject(usersDataReducer?.branch?.id);
    getBusinessBranch(usersDataReducer?.branch?.id);
    getUserLists();
    // getEmployeeBranch({
    //   page: pageData.page,
    //   size: pageData.size,
    //   branchId: usersDataReducer?.branch?.id,
    // });
    setVisible(false);
    form.resetFields();
    setSelectedRowKeys([[], []]);
  }, [studentHomeworkReducer?.changeData]);

  useEffect(() => {
    const pageSize = parseInt(size, 10);
    const pageCount = parseInt(page, 10) >= 1 ? parseInt(page, 10) : 1;
    if (pageSize >= 100) {
      setPageData((prev) => {
        return { ...prev, size: 100 };
      });
      navigate(`/scores?page=${pageCount}&size=100`);
    } else if (pageSize >= 50) {
      setPageData((prev) => {
        return { ...prev, size: 50 };
      });
      navigate(`/scores?page=${pageCount}&size=50`);
    } else if (pageSize >= 20) {
      setPageData((prev) => {
        return { ...prev, size: 20 };
      });
      navigate(`/scores?page=${pageCount}&size=20`);
    } else {
      setPageData((prev) => {
        return { ...prev, size: 10 };
      });
      navigate(`/scores?page=${pageCount}&size=10`);
    }
  }, []);

  const handleDelete = (arr) => {
    arr?.map((item) => {
      deleteScore(item);
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
          selectedRowKeys[1][0]?.id && editScore({
            ...values,
          });
          setOnedit(false);
        })
        .catch((info) => {
          console.error("Validate Failed:", info);
        })
      : form
        .validateFields()
        .then((values) => {
          saveScore({
            ...values,
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
      <h3 className="text-2xl font-bold mb-5">Baholar</h3>
      <div className="flex items-center justify-end gap-5 mb-3">
        {selectedRowKeys[0].length === 1 && (
          <button
            onClick={() => {
              setOnedit(true);
              setVisible(true);
              form.setFieldValue("topicNumber", selectedRowKeys[1][0]?.topicNumber);
              form.setFieldValue("subjectId", selectedRowKeys[1][0]?.subject?.id);
              form.setFieldValue("branchId", selectedRowKeys[1][0]?.branch?.id);
              form.setFieldValue("description", selectedRowKeys[1][0]?.description);
              form.setFieldValue("homework", selectedRowKeys[1][0]?.homework);
              form.setFieldValue("date", selectedRowKeys[1][0]?.date);
              form.setFieldValue("lessonHour", selectedRowKeys[1][0]?.lessonHour);
              form.setFieldValue("teacherId", selectedRowKeys[1][0]?.teacherId);
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
            Talaba hisob raqami
            {onedit ? "ni taxrirlash" : " "}
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
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                key="topicNumber"
                name="topicNumber"
                label={<span className="text-base font-medium">Mavzu raqami </span>}
                rules={[
                  {
                    required: true,
                    message: "Mavzu raqamini kiriting",
                  },
                ]}
              >
                <Input type="number" className="w-full" placeholder="Mavzu raqamini kiriting" />
              </Form.Item>
              <Form.Item
                key="lessonHour"
                name="lessonHour"
                label={<span className="text-base font-medium">Dars vaqti </span>}
                rules={[
                  {
                    required: false,
                    message: "Dars vaqti",
                  },
                ]}
              >
                <InputNumber type="number" className="w-full" placeholder="Dars vaqti" />
              </Form.Item>
              <Form.Item
                key="date"
                name="date"
                label={<span className="text-base font-medium">Sana </span>}
                rules={[
                  {
                    required: false,
                    message: "Sana",
                  },
                ]}
              >
                <Input type="date" className="w-full" placeholder="Dars vaqti" />
              </Form.Item>
              <Form.Item
                key="studentClassId"
                name="studentClassId"
                label={<span className="text-base font-medium">Xona tanlash</span>}
                rules={[
                  {
                    required: false,
                    message: "Xona kiriting",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Xona tanlash"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {classReducer?.class?.map((room) => {
                    return (
                      <Option value={room.id} key={room.id}>{room?.className}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                key="teacherId"
                name="teacherId"
                label={<span className="text-base font-medium">O`qituvchi tanlash</span>}
                rules={[
                  {
                    required: true,
                    message: "O`qituvchi kiriting",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="O`qituvchi tanlash"
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
            </Col>
            <Col span={12}>
              <Form.Item
                key="branchId"
                name="branchId"
                label={<span className="text-base font-medium">Filial ( Branch )</span>}
                rules={[
                  {
                    required: false,
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
              <Form.Item
                key="subjectId"
                name="subjectId"
                label={<span className="text-base font-medium">Fan tanlash</span>}
                rules={[
                  {
                    required: true,
                    message: "Fan turini kiriting",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Fan tanlash"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {subjectReducer?.subjects?.map((student) => {
                    return (
                      <Option value={student.id} key={student.id}>{student?.name}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                key="homework"
                name="homework"
                label={<span className="text-base font-medium">Uy ishi</span>}
                rules={[
                  {
                    required: true,
                    message: "Uy ishini kiriting",
                  },
                ]}
              >
                <Input placeholder="Uy ishini kiriting" />
              </Form.Item>
              <Form.Item
                key="description"
                name="description"
                label={<span className="text-base font-medium">Qisqa eslatma</span>}
                rules={[
                  {
                    required: true,
                    message: "Qisqa eslatma",
                  },
                ]}
              >
                <Input placeholder="Qisqa eslatma" />
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
        tableData={studentHomeworkReducer?.homework?.map((item) => {
          return ({
            ...item,
            branchId: item.branch?.name,
            subjectName: item.subject?.name,
            studentId: item.student?.id
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
  (
    usersDataReducer, employeeReducer, businessBranchesReducer,
    balanceReducer, studentHomeworkReducer, subjectReducer, classReducer, scoreReducer
  ), {
    getAllBalanceBranch,
    getSubject,
    getClassesAll,
    getHomeWorkList,
    saveHomework,
    editHomework,
    deleteHomework,
    getEmployeeBranch,
    getUserLists,
    getScores,
    saveScore,
    editScore,
    deleteScore,
    getBusinessBranch,
  }
)(StudentHomework);
