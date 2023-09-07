import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Form, Input, InputNumber, Modal, Row, Select,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTable from "../../module/CustomTable";
import useKeyPress from "../../hooks/UseKeyPress";
import usersDataReducer from "../../reducer/usersDataReducer";
import classReducer, { getClassesAll } from "../../reducer/classReducer";
import employeeReducer, { getEmployeeBranch, getUserLists } from "../../reducer/employeeReducer";
import scoreReducer, {
  deleteScore,
  editScore,
  getScores,
  saveScore,
} from "../../reducer/scoreReducer";
import studentReducer, { getStudentsAll } from "../../reducer/studentReducer";
import journalReducer, { getJournal } from "../../reducer/journalReducer";
import FormLayoutComp from "../../components/FormLayoutComp";
import subjectForLevelReducer, {
  getSubjectForLevelAllByBranchId
} from "../../reducer/subjectForLevelReducer";

const { Option } = Select;
const { TextArea } = Input;
const columns = [
  {
    title: "Talaba",
    dataIndex: "firstName",
    key: "firstName",
    width: "30%",
    search: true,
  },
  {
    title: "Fan",
    dataIndex: "subjectName",
    key: "subjectName",
    width: "30%",
    search: true,
  },
  {
    title: "O`qituvchi",
    dataIndex: "teacher",
    key: "teacher",
    width: "30%",
    search: true,
  },
  {
    title: "Baho",
    dataIndex: "score",
    key: "score",
    width: "25%",
    search: false,
  },
  {
    title: "Sana",
    dataIndex: "createdDate",
    key: "createdDate",
    width: "30%",
    search: false,
  },
  {
    title: "Qisqa eslatma",
    dataIndex: "description",
    key: "description",
    width: "20%",
    search: false,
  }
];

function StudentHomework({
  usersDataReducer, getStudentsAll, employeeReducer, getUserLists, scoreReducer, getScores,
  saveScore, editScore, deleteScore, subjectForLevelReducer, getSubjectForLevelAllByBranchId,
  getClassesAll, studentReducer, getJournal, journalReducer,
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([[], []]);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [onedit, setOnedit] = useState(false);
  const enter = useKeyPress("Enter");
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
    getClassesAll({ id: usersDataReducer?.branch?.id });
    getSubjectForLevelAllByBranchId(usersDataReducer?.branch?.id);
    getJournal({
      branchId: usersDataReducer.branch?.id,
      page: pageData.page,
      size: pageData.size
    });
    getUserLists();
    getStudentsAll({
      branchId: usersDataReducer.branch?.id,
      page: pageData.page,
      size: pageData.size
    });
    setVisible(false);
    form.resetFields();
    setSelectedRowKeys([[], []]);
  }, [scoreReducer?.changeData]);

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
      deleteScore(item.id);
      return null;
    });
  };

  const onChange = (pageNumber, page) => {
    setPageData({ size: page, page: pageNumber, loading: false });
    searchParams.set("size", page);
    searchParams.set("page", pageNumber);
    localStorage.setItem("PageSize", page);
    navigate(`/scores?page=${pageNumber}&size=${page}`);
  };

  const formValidate = () => {
    onedit
      ? form
        .validateFields()
        .then((values) => {
          selectedRowKeys[1][0]?.id && editScore({
            ...values,
            id: selectedRowKeys[1][0]?.id
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
      <div className="flex items-center justify-between gap-5 mb-3">
        <div className="w-40">
          <Select
            showSearch
            allowClear
            onChange={(e) => {
              return e && getScores({
                journalId: e,
                page: pageData.page,
                size: pageData.size
              });
            }}
            placeholder="Jurnal tanlash"
            optionFilterProp="children"
            style={{ width: "100%" }}
            key="id"
            filterOption={(input, option) => {
              return option.children.toLowerCase()?.includes(input.toLowerCase());
            }}
          >
            {journalReducer?.journal?.journalResponses?.map((journal) => {
              return (
                <Option value={journal.id} key={journal.id}>
                  {journal?.studentClass?.className}
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
              form.setFieldValue("studentId", selectedRowKeys[1][0]?.student?.id);
              form.setFieldValue("subjectLevelId", selectedRowKeys[1][0]?.subject?.id);
              form.setFieldValue("description", selectedRowKeys[1][0]?.description);
              form.setFieldValue("journalId", selectedRowKeys[1][0]?.journal?.id);
              form.setFieldValue("date", selectedRowKeys[1][0]?.date);
              form.setFieldValue("score", selectedRowKeys[1][0]?.score);
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
      </div>
      <Modal
        open={visible}
        title={(
          <h3 className="text-xl mb-3 font-semibold">
            Baho
            {onedit ? "ni taxrirlash" : "ni qo'shish"}
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
            <FormLayoutComp>
              <Form.Item
                key="studentId"
                name="studentId"
                label={<span className="text-base font-medium">Talaba</span>}
                rules={[
                  {
                    required: true,
                    message: "Talabani tanlang",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Talabani tanlang..."
                  optionFilterProp="children"
                  className="w-full"
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {studentReducer?.students?.map((room) => {
                    return (
                      <Option value={room.id} key={room.id}>{room?.firstName}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </FormLayoutComp>
            <FormLayoutComp>
              <Form.Item
                key="score"
                name="score"
                label={<span className="text-base font-medium">Baho</span>}
                rules={[
                  {
                    required: true,
                    message: "Bahoni kiriting",
                  },
                ]}
              >
                <InputNumber type="number" className="w-full" placeholder="Baho kiriting ( 1...5 )" />
              </Form.Item>
            </FormLayoutComp>
            <FormLayoutComp>
              <Form.Item
                key="journalId"
                name="journalId"
                label={<span className="text-base font-medium">Jurnal tanlash</span>}
                rules={[
                  {
                    required: true,
                    message: "Jurnalni kiriting",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Jurnal tanlash"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {journalReducer?.journal?.journalResponses?.map((journal) => {
                    return (
                      <Option value={journal.id} key={journal.id}>
                        {journal?.studentClass?.className}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </FormLayoutComp>
            <FormLayoutComp>
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
            </FormLayoutComp>
            <FormLayoutComp>
              <Form.Item
                key="subjectLevelId"
                name="subjectLevelId"
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
                  placeholder="Fanni tanlang..."
                  optionFilterProp="children"
                  className="w-full"
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {
                          subjectForLevelReducer?.subjectForLevelAllBranch?.map((barnch) => {
                            return (
                              <Option value={barnch?.id} key={barnch?.id}>
                                {`${barnch?.level?.level}-sinf ${barnch?.subject?.name}`}
                              </Option>
                            );
                          })
                      }
                </Select>
              </Form.Item>
            </FormLayoutComp>
            <FormLayoutComp>
              <Form.Item
                key="description"
                name="description"
                label={<span className="text-base font-medium">Qisqa eslatma</span>}
                rules={[
                  {
                    required: false,
                    message: "Qisqa eslatma",
                  },
                ]}
              >
                <TextArea rows={3} placeholder="Qisqa eslatma..." />
              </Form.Item>
            </FormLayoutComp>
          </Row>
        </Form>
      </Modal>
      <CustomTable
        columns={columns}
        pageSizeOptions={[10, 20, 50, 100]}
        current={pageData?.page}
        pageSize={pageData?.size}
        totalItems={scoreReducer?.scoreTotalCount}
        tableData={scoreReducer?.scores?.map((item) => {
          return ({
            ...item,
            teacher: item.teacher?.name,
            teacherId: item.teacher?.id,
            firstName: item.student?.firstName,
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
    usersDataReducer, employeeReducer, studentReducer,
    subjectForLevelReducer, classReducer, scoreReducer, journalReducer
  ), {
    getSubjectForLevelAllByBranchId,
    getClassesAll,
    getEmployeeBranch,
    getUserLists,
    getScores,
    saveScore,
    getStudentsAll,
    editScore,
    deleteScore,
    getJournal
  }
)(StudentHomework);
