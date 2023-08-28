import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Form, InputNumber, Modal, Row, Select
} from "antd";
import dayjs from "dayjs";
import CustomTable from "../../module/CustomTable";
import useKeyPress from "../../hooks/UseKeyPress";
import usersDataReducer from "../../reducer/usersDataReducer";
import lessonScheduleReducer, {
  deleteLessonSchedule,
  editLessonSchedule,
  getLessonScheduleByStudentClass,
  getLessonScheduleByTeacher,
  saveLessonSchedule
} from "../../reducer/lessonScheduleReducer";
import employeeReducer, { getEmployeeBranchId } from "../../reducer/employeeReducer";
import FormLayoutComp from "../../components/FormLayoutComp";
import subjectForLevelReducer, { getSubjectForLevelAllByBranchId } from "../../reducer/subjectForLevelReducer";
import classReducer, { getClassesAll } from "../../reducer/classReducer";
import roomReducer, { getAllRoomBranch } from "../../reducer/roomReducer";
import typeOfWorkReducer, { getAllTypeOfWork } from "../../reducer/typeOfWorkReducer";
import { week } from "../../const";

const { Option } = Select;
const columns = [
  {
    title: "Vaqti",
    dataIndex: "lessonHour",
    key: "lessonHour",
    width: "10%",
    search: false,
  },
  {
    title: "Fan",
    dataIndex: "subjectName",
    key: "subjectName",
    width: "20%",
    search: false,
  },
  {
    title: "Xona",
    dataIndex: "roomName",
    key: "roomName",
    width: "10%",
    search: false,
  },
  {
    title: "Sinf",
    dataIndex: "studentClassName",
    key: "studentClassName",
    width: "20%",
    search: false,
  },
  {
    title: "O'qituvchi",
    dataIndex: "teacherName",
    key: "teacherName",
    width: "20%",
    search: false,
  },
  {
    title: "Ish turi",
    dataIndex: "typeOfWorkName",
    key: "typeOfWorkName",
    width: "20%",
    search: false,
  }
];

function LessonSchedule({
  getAllTypeOfWork,
  getAllRoomBranch,
  getClassesAll,
  getSubjectForLevelAllByBranchId,
  getEmployeeBranchId,
  deleteLessonSchedule,
  editLessonSchedule,
  saveLessonSchedule,
  getLessonScheduleByTeacher,
  getLessonScheduleByStudentClass,
  usersDataReducer,
  lessonScheduleReducer,
  employeeReducer,
  subjectForLevelReducer,
  classReducer,
  roomReducer,
  typeOfWorkReducer
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([[], []]);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [onedit, setOnedit] = useState(false);
  const enter = useKeyPress("Enter");
  const size = localStorage.getItem("PageSize") || 10;
  const [pageData, setPageData] = useState({
    page: 1,
    size,
    loading: false,
  });

  useEffect(() => {
    getAllTypeOfWork(usersDataReducer?.branch?.id);
    getAllRoomBranch(usersDataReducer?.branch?.id);
    getClassesAll({ id: usersDataReducer?.branch?.id });
    getSubjectForLevelAllByBranchId(usersDataReducer?.branch?.id);
    getEmployeeBranchId(usersDataReducer?.branch?.id);
    setVisible(false);
    setOnedit(false);
    form.resetFields();
    setSelectedRowKeys([[], []]);
  }, [lessonScheduleReducer?.changeData]);

  const handleDelete = (arr) => {
    arr?.map((item) => {
      deleteLessonSchedule(item);
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
            id: selectedRowKeys[1][0]?.id,
            branchId: selectedRowKeys[1][0]?.branch?.id
          });
        })
        .catch((info) => {
          console.error("Validate Failed:", info);
        })
      : form
        .validateFields()
        .then((values) => {
          saveLessonSchedule({ ...values, branchId: usersDataReducer?.branch?.id });
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
      <h3 className="text-2xl font-bold mb-5">Dars jadvali</h3>
      <div className="flex items-center justify-between gap-5 mb-3">
        <div className="w-40">
          <Select
            onChange={(e) => {
              e && getLessonScheduleByTeacher(e);
            }}
            showSearch
            allowClear
            placeholder="Xodimni tanlang..."
            optionFilterProp="children"
            className="w-full"
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
        </div>
        <div className="flex items-center gap-5">
          {selectedRowKeys[0].length === 1 && (
            <button
              onClick={() => {
                setOnedit(true);
                setVisible(true);
                form.setFieldValue("typeOfWorkId", selectedRowKeys[1][0]?.typeOfWorkId);
                form.setFieldValue("date", dayjs(selectedRowKeys[1][0]?.date));
                form.setFieldValue("lessonHours", selectedRowKeys[1][0]?.lessonHours);
                form.setFieldValue("teacherId", selectedRowKeys[1][0]?.teacherId);
                form.setFieldValue("subjectLevelId", selectedRowKeys[1][0]?.subjectLevelId);
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
      </div>
      <Modal
        open={visible}
        title={(
          <h3 className="text-xl mb-3 font-semibold">
            Dars vaqti
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
          <Row gutter={12}>
            <FormLayoutComp>
              <Form.Item
                key="subjectLevelId"
                name="subjectLevelId"
                label={<span className="text-base font-medium">Fanni tanlash</span>}
                rules={[
                  {
                    required: true,
                    message: "Fanni tanlang",
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
                key="teacherId"
                name="teacherId"
                label={<span className="text-base font-medium">O`qituvchi</span>}
                rules={[
                  {
                    required: true,
                    message: "O`qituvchini tanlang",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="O`qituvchi tanlang..."
                  optionFilterProp="children"
                  className="w-full"
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
                key="studentClassId"
                name="studentClassId"
                label={<span className="text-base font-medium">Sinf</span>}
                rules={[
                  {
                    required: true,
                    message: "Sinf tanlang",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Sinf tanlang..."
                  optionFilterProp="children"
                  className="w-full"
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {classReducer?.class?.map((classes) => {
                    return (
                      <Option value={classes.id} key={classes.id}>{classes?.className}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </FormLayoutComp>
            <FormLayoutComp>
              <Form.Item
                key="roomId"
                name="roomId"
                label={<span className="text-base font-medium">Xona</span>}
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
                  placeholder="Xona tanlang"
                  optionFilterProp="children"
                  className="w-full"
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {roomReducer?.roomAllBarnch?.map((room) => {
                    return (
                      <Option value={room.id} key={room.id}>{room?.roomNumber}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </FormLayoutComp>
            <FormLayoutComp>
              <Form.Item
                key="typeOfWorkId"
                name="typeOfWorkId"
                label={<span className="text-base font-medium">Ish turi</span>}
                rules={[
                  {
                    required: true,
                    message: "Ish turini tanlang",
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
            </FormLayoutComp>
            <FormLayoutComp>
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
                <InputNumber className="w-full" placeholder="Dars soati" />
              </Form.Item>
            </FormLayoutComp>
            <FormLayoutComp>
              <Form.Item
                key="weekDays"
                name="weekDays"
                label={<span className="text-base font-medium">Kun</span>}
                rules={[
                  {
                    required: true,
                    message: "Kunni tanlang",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Kunni tanlang..."
                  optionFilterProp="children"
                  className="w-full"
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {week?.map((option) => {
                    return (
                      <Option value={option.value} key={option.value}>
                        {option.name}
                      </Option>
                    );
                  })}
                </Select>
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
        tableData={lessonScheduleReducer?.lessonSchedule?.map((item) => {
          return ({
            ...item,
            roomName: item.room?.roomNumber,
            subjectName: item.subject?.name,
            studentClassName: item.studentClass?.className,
            teacherName: item.teacher?.name,
            typeOfWorkName: item.typeOfWork?.name,
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
    lessonScheduleReducer, employeeReducer, subjectForLevelReducer, classReducer, roomReducer,
    typeOfWorkReducer, usersDataReducer
  ), {
    deleteLessonSchedule,
    editLessonSchedule,
    saveLessonSchedule,
    getLessonScheduleByTeacher,
    getLessonScheduleByStudentClass,
    getEmployeeBranchId,
    getSubjectForLevelAllByBranchId,
    getClassesAll,
    getAllRoomBranch,
    getAllTypeOfWork
  }
)(LessonSchedule);
