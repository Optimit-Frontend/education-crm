import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Form, Input, Modal, Row, Select, TimePicker,
} from "antd";
import dayjs from "dayjs";
import useKeyPress from "../../hooks/UseKeyPress";
import usersDataReducer from "../../reducer/usersDataReducer";
import employeeReducer, { getEmployeeBranch, getUserLists } from "../../reducer/employeeReducer";
import classReducer, { getClassesAll } from "../../reducer/classReducer";
import typeOfWorkReducer, { getAllTypeOfWork } from "../../reducer/typeOfWorkReducer";
import roomReducer, { getAllRoomBranch } from "../../reducer/roomReducer";
import lessonScheduleReducer, {
  deleteLessonSchedule,
  editLessonSchedule,
  getAllByTeacherId,
  saveLessonSchedule,
} from "../../reducer/lessonScheduleReducer";
import { week } from "../../const";
import FormLayoutComp from "../../components/FormLayoutComp";
import subjectForLevelReducer, { getSubjectForLevelAllByBranchId } from "../../reducer/subjectForLevelReducer";

const { Option } = Select;
const format = "HH:mm";

function LessonSchedule({
  usersDataReducer, getAllTypeOfWork, typeOfWorkReducer, getAllRoomBranch, deleteLessonSchedule,
  editLessonSchedule, saveLessonSchedule, employeeReducer, getUserLists, subjectForLevelReducer,
  getSubjectForLevelAllByBranchId, getClassesAll, classReducer, getAllByTeacherId,
  roomReducer, lessonScheduleReducer
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([[], []]);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [onedit, setOnedit] = useState(false);
  const enter = useKeyPress("Enter");
  const [selectData, setSelectData] = useState(null);

  useEffect(() => {
    getSubjectForLevelAllByBranchId(usersDataReducer?.branch?.id);
    getUserLists();
    getAllTypeOfWork(usersDataReducer?.branch?.id);
    getClassesAll({ id: usersDataReducer?.branch?.id });
    getAllRoomBranch(usersDataReducer?.branch?.id);
    setVisible(false);
    form.resetFields();
    setSelectedRowKeys([[], []]);
  }, [lessonScheduleReducer?.changeData]);

  const handleDelete = (arr) => {
    arr?.map((item) => {
      deleteLessonSchedule(item.id);
      return null;
    });
  };

  const formValidate = () => {
    onedit
      ? form
        .validateFields()
        .then((values) => {
          selectedRowKeys[1][0]?.id && editLessonSchedule({
            ...values,
            id: selectedRowKeys[1][0]?.id,
            startTime: dayjs(values?.startTime).format("HH:mm"),
            endTime: dayjs(values?.endTime).format("HH:mm"),
            branchId: selectedRowKeys[1][0]?.branch?.id
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
            startTime: dayjs(values?.startTime).format("HH:mm"),
            endTime: dayjs(values?.endTime).format("HH:mm"),
            branchId: usersDataReducer?.branch?.id
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
      <div className="flex items-center justify-between gap-5 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-40">
            <Select
              onChange={(e) => {
                e && getAllByTeacherId(e);
                e ? setSelectData(e) : setSelectData(null);
              }}
              showSearch
              allowClear
              placeholder="Sinfni tanlang..."
              optionFilterProp="children"
              className="w-full"
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
          </div>
          <div className="w-40">
            <Select
              onChange={(e) => {
                e && getAllByTeacherId(e);
                e ? setSelectData(e) : setSelectData(null);
              }}
              showSearch
              allowClear
              placeholder="O'qituvchini tanlang..."
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
        </div>
        <div className="flex items-center justify-end gap-5 mb-3">
          {selectedRowKeys[0].length === 1 && usersDataReducer?.editSchedule && (
          <button
            onClick={() => {
              setOnedit(true);
              setVisible(true);
              form.setFieldValue("typeOfWorkId", selectedRowKeys[1][0]?.typeOfWorkId);
              form.setFieldValue("roomId", selectedRowKeys[1][0]?.room?.roomType?.id);
              form.setFieldValue("branchId", selectedRowKeys[1][0]?.branch?.id);
              form.setFieldValue("lessonHour", selectedRowKeys[1][0]?.lessonHour);
              form.setFieldValue("teacherId", selectedRowKeys[1][0]?.teacherId);
              form.setFieldValue("subjectLevelId", selectedRowKeys[1][0]?.subject?.id);
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
          {
            usersDataReducer?.addSchedule
              ? (
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
              ) : ""
          }
          {
            usersDataReducer?.deleteSchedule
              ? (
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
              ) : ""
          }
        </div>
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
        width={700}
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
                key="subjectLevelId"
                name="subjectLevelId"
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
                  className="w-full"
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
            </FormLayoutComp>
            <FormLayoutComp>
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
                  placeholder="Hafta kunini tanlang..."
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
            <FormLayoutComp>
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
            </FormLayoutComp>
            <FormLayoutComp>
              <Form.Item
                key="startTime"
                name="startTime"
                label={<span className="text-base font-medium">Boshlanish vaqti</span>}
                rules={[
                  {
                    required: true,
                    message: "Boshlanish vaqtini kiriting",
                  },
                ]}
              >
                <TimePicker className="w-full" format={format} />
              </Form.Item>
            </FormLayoutComp>
            <FormLayoutComp>
              <Form.Item
                key="endTime"
                name="endTime"
                label={<span className="text-base font-medium">Tugash vaqti</span>}
                rules={[
                  {
                    required: true,
                    message: "Tugash vaqtini kiriting",
                  },
                ]}
              >
                <TimePicker className="w-full" format={format} />
              </Form.Item>
            </FormLayoutComp>
            <FormLayoutComp>
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
            </FormLayoutComp>
            <FormLayoutComp>
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
                  className="w-full"
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {
                    roomReducer?.roomAllBarnch?.map((room) => {
                      return (
                        <Option value={room?.id} key={room?.id}>
                          {`${room?.roomNumber} ${room?.roomType?.name}`}
                        </Option>
                      );
                    })
                  }
                </Select>
              </Form.Item>
            </FormLayoutComp>
          </Row>
        </Form>
      </Modal>

    </div>
  );
}

export default connect(
  (
    usersDataReducer, employeeReducer, subjectForLevelReducer, classReducer, typeOfWorkReducer,
    roomReducer, lessonScheduleReducer
  ), {
    getEmployeeBranch,
    getUserLists,
    getSubjectForLevelAllByBranchId,
    getClassesAll,
    getAllTypeOfWork,
    getAllRoomBranch,
    getAllByTeacherId,
    saveLessonSchedule,
    editLessonSchedule,
    deleteLessonSchedule
  }
)(LessonSchedule);
