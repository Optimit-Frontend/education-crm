import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Col, Form, Input, Modal, Row, Select,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTable from "../../module/CustomTable";
import useKeyPress from "../../hooks/UseKeyPress";
import usersDataReducer from "../../reducer/usersDataReducer";
import employeeReducer, { getEmployeeBranch, getUserLists } from "../../reducer/employeeReducer";
import businessBranchesReducer, { getBusinessBranch } from "../../reducer/businessBranchesReducer";
import subjectReducer, { getSubject } from "../../reducer/subjectReducer";
import classReducer, { getClassesAll } from "../../reducer/classReducer";
import typeOfWorkReducer, {
  getAllTypeOfWork,
} from "../../reducer/typeOfWorkReducer";
import roomReducer, { getAllRoomBranch } from "../../reducer/roomReducer";
import lessonScheduleReducer, {
  deleteLessonSchedule,
  editLessonSchedule,
  getLessonSchedule,
  saveLessonSchedule,
} from "../../reducer/lessonScheduleReducer";

const { Option } = Select;

const columns = [
  {
    title: "Xodim",
    dataIndex: "teacher",
    key: "teacehr",
    width: "30%",
    search: true,
  },
  {
    title: "Dars soati",
    dataIndex: "lessonHour",
    key: "lessonHour",
    width: "30%",
    search: true,
  },
  {
    title: "Talaba xona",
    dataIndex: "studentClass",
    key: "studentClass",
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
    title: "Fan",
    dataIndex: "subjectId",
    key: "subjectId",
    width: "20%",
    search: false,
  }
];

function LessonSchedule({
  usersDataReducer, getAllTypeOfWork, typeOfWorkReducer, getAllRoomBranch, deleteLessonSchedule,
  editLessonSchedule, saveLessonSchedule, employeeReducer, getUserLists, subjectReducer, getSubject,
  getClassesAll, classReducer, getLessonSchedule,
  getBusinessBranch, businessBranchesReducer, roomReducer, lessonScheduleReducer
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
    getBusinessBranch(usersDataReducer?.branch?.id);
    getSubject(usersDataReducer?.branch?.id);
    getUserLists();
    getLessonSchedule({
      branchId: usersDataReducer.branch?.id,
      page: pageData.page,
      size: pageData.size
    });
    getAllTypeOfWork(usersDataReducer?.branch?.id);
    getClassesAll({ id: usersDataReducer?.branch?.id });
    getAllRoomBranch(usersDataReducer?.branch?.id);
    setVisible(false);
    form.resetFields();
    setSelectedRowKeys([[], []]);
  }, [lessonScheduleReducer?.changeData]);

  useEffect(() => {
    const pageSize = parseInt(size, 10);
    const pageCount = parseInt(page, 10) >= 1 ? parseInt(page, 10) : 1;
    if (pageSize >= 100) {
      setPageData((prev) => {
        return { ...prev, size: 100 };
      });
      navigate(`/lesson-schedule?page=${pageCount}&size=100`);
    } else if (pageSize >= 50) {
      setPageData((prev) => {
        return { ...prev, size: 50 };
      });
      navigate(`/lesson-schedule?page=${pageCount}&size=50`);
    } else if (pageSize >= 20) {
      setPageData((prev) => {
        return { ...prev, size: 20 };
      });
      navigate(`/lesson-schedule?page=${pageCount}&size=20`);
    } else {
      setPageData((prev) => {
        return { ...prev, size: 10 };
      });
      navigate(`/lesson-schedule?page=${pageCount}&size=10`);
    }
  }, []);

  const handleDelete = (arr) => {
    arr?.map((item) => {
      deleteLessonSchedule(item.id);
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
          selectedRowKeys[1][0]?.id && editLessonSchedule({
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
          saveLessonSchedule({
            ...values,
            lessonHour: parseInt(values.lessonHour, 10)
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
      <h3 className="text-2xl font-bold mb-5">Dars Jadvali</h3>
      <div className="flex items-center justify-end gap-5 mb-3">
        {selectedRowKeys[0].length === 1 && (
          <button
            onClick={() => {
              setOnedit(true);
              setVisible(true);
              form.setFieldValue("typeOfWorkId", selectedRowKeys[1][0]?.typeOfWorkId);
              form.setFieldValue("roomId", selectedRowKeys[1][0]?.room?.roomType?.id);
              form.setFieldValue("branchId", selectedRowKeys[1][0]?.branch?.id);
              form.setFieldValue("lessonHour", selectedRowKeys[1][0]?.lessonHour);
              form.setFieldValue("teacherId", selectedRowKeys[1][0]?.teacherId);
              form.setFieldValue("subjectId", selectedRowKeys[1][0]?.subject?.id);
              form.setFieldValue("studentClassId", selectedRowKeys[1][0]?.studentClassId);
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
                key="subjectId"
                name="subjectId"
                label={<span className="text-base font-medium">Fan tanlash</span>}
                rules={[
                  {
                    required: true,
                    message: "Fan tanlang",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Fan tanlang"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {
                    subjectReducer?.subjects?.map((barnch) => {
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
                key="studentClassId"
                name="studentClassId"
                label={<span className="text-base font-medium">Talabalar xonasi</span>}
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
                  {
                    classReducer?.class?.map((barnch) => {
                      return (
                        <Option value={barnch?.id} key={barnch?.id}>
                          {barnch?.className}
                        </Option>
                      );
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item
                key="weekDays"
                name="weekDays"
                label={<span className="text-base font-medium">Hafta kunlari</span>}
                rules={[
                  {
                    required: true,
                    message: "Hafta kunini kiriting",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Hafta kunini tanlang"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  <Option value="MONDAY">Dushanba</Option>
                  <Option value="TUESDAY">Seshanba</Option>
                  <Option value="WEDNESDAY">Chorshanba</Option>
                  <Option value="THURSDAY">Payshanba</Option>
                  <Option value="FRIDAY">Juma</Option>
                  <Option value="SATURDAY">Shanba</Option>
                  <Option value="SUNDAY">Yakshanba</Option>
                </Select>
              </Form.Item>
              <Form.Item
                key="branchId"
                name="branchId"
                label={<span className="text-base font-medium">Filial</span>}
                rules={[
                  {
                    required: true,
                    message: "Filial kiriting",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Filial tanlang"
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
            </Col>
            <Col span={12}>
              <Form.Item
                key="teacherId"
                name="teacherId"
                label={<span className="text-base font-medium">Xodim tanlash</span>}
                rules={[
                  {
                    required: true,
                    message: "Xodim kiriting",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Xodim tanlash"
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
              <Form.Item
                key="lessonHour"
                name="lessonHour"
                label={<span className="text-base font-medium">Dars soati</span>}
                rules={[
                  {
                    required: true,
                    message: "Dars soati",
                  },
                ]}
              >
                <Input placeholder="Dars soati" />
              </Form.Item>
              <Form.Item
                key="typeOfWorkId"
                name="typeOfWorkId"
                label={<span className="text-base font-medium">Ish</span>}
                rules={[
                  {
                    required: false,
                    message: "Ish tajriba kiriting",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Ish turini tanlang..."
                  optionFilterProp="children"
                  className="w-full"
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {
                    typeOfWorkReducer?.typeOfWork?.map((work) => {
                      return (
                        <Option value={work?.id} key={work?.id}>
                          {`${work?.name} ${work?.price}`}
                        </Option>
                      );
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item
                key="roomId"
                name="roomId"
                label={<span className="text-base font-medium">Xona</span>}
                rules={[
                  {
                    required: true,
                    message: "Xona kiriting",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Xona tanlang"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {
                    roomReducer?.roomAllBarnch?.map((room) => {
                      return (
                        <Option value={room?.id} key={room?.id}>
                          {room?.roomType?.name}
                        </Option>
                      );
                    })
                  }
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
        tableData={lessonScheduleReducer?.lessonSchedule?.map((item) => {
          return ({
            ...item,
            teacher: item.teacher?.name,
            studentClass: item.studentClass?.className,
            teacherId: item.teacher?.id,
            branchId: item.branch?.name,
            subjectId: item.subject?.name,
            studentClassId: item.studentClass?.id,
            typeOfWorkId: item.typeOfWork?.id,
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
    usersDataReducer, employeeReducer, businessBranchesReducer, businessBranchesReducer,
    subjectReducer, classReducer, typeOfWorkReducer, roomReducer, lessonScheduleReducer
  ), {
    getEmployeeBranch,
    getUserLists,
    getBusinessBranch,
    getSubject,
    getClassesAll,
    getAllTypeOfWork,
    getAllRoomBranch,
    getLessonSchedule,
    saveLessonSchedule,
    editLessonSchedule,
    deleteLessonSchedule
  }
)(LessonSchedule);
