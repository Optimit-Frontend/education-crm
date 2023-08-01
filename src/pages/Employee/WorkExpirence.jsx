import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Col, DatePicker, Form, Input, Modal, Row, Select
} from "antd";
import dayjs from "dayjs";
import CustomTable from "../../module/CustomTable";
import useKeyPress from "../../hooks/UseKeyPress";
import usersDataReducer from "../../reducer/usersDataReducer";
import employeeReducer, {
  getEmployeeBranchId
} from "../../reducer/employeeReducer";
import workExpirenceReducer, {
  deleteWorkExperience,
  editWorkExperience,
  getWorkExperienceByUserId,
  saveWorkExperience
} from "../../reducer/workExpirenceReducer";

const { Option } = Select;

const columns = [
  {
    title: "Ish joyi",
    dataIndex: "placeOfWork",
    key: "placeOfWork",
    width: "20%",
    search: true,
  },
  {
    title: "Lavozimi",
    dataIndex: "position",
    key: "position",
    width: "30%",
    search: true,
  },
  {
    title: "Boshlash vaqti",
    dataIndex: "startDate",
    key: "startDate",
    width: "15%",
    search: false,
  },
  {
    title: "Tugash vaqti",
    dataIndex: "endDate",
    key: "endDate",
    width: "15%",
    search: false,
  },
  {
    title: "Hodim",
    dataIndex: "employeeFullName",
    key: "employeeFullName",
    width: "20%",
    search: false,
  },
];

function WorkExpirence({
  deleteWorkExperience,
  editWorkExperience,
  saveWorkExperience,
  getWorkExperienceByUserId,
  getEmployeeBranchId,
  usersDataReducer,
  workExpirenceReducer,
  employeeReducer,
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
    getWorkExperienceByUserId(usersDataReducer?.userData?.id);
    getEmployeeBranchId(usersDataReducer?.branch?.id);
    setVisible(false);
    setOnedit(false);
    form.resetFields();
    setSelectedRowKeys([[], []]);
  }, [workExpirenceReducer?.changeData]);

  const handleDelete = (arr) => {
    arr?.map((item) => {
      deleteWorkExperience(item);
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
          selectedRowKeys[1][0]?.id && editWorkExperience({
            ...values,
            startDate: new Date(values?.startDate).toISOString().substring(0, 10),
            endDate: new Date(values?.endDate).toISOString().substring(0, 10)
          });
        })
        .catch((info) => {
          console.error("Validate Failed:", info);
        })
      : form
        .validateFields()
        .then((values) => {
          saveWorkExperience({
            ...values,
            startDate: new Date(values?.startDate).toISOString().substring(0, 10),
            endDate: new Date(values?.endDate).toISOString().substring(0, 10)
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
      <h3 className="text-2xl font-bold mb-5">Hodim ish tajribasi</h3>
      <div className="flex items-center justify-end gap-5 mb-3">
        {selectedRowKeys[0].length === 1 && (
          <button
            onClick={() => {
              setOnedit(true);
              setVisible(true);
              form.setFieldValue("placeOfWork", selectedRowKeys[1][0]?.placeOfWork);
              form.setFieldValue("position", selectedRowKeys[1][0]?.position);
              form.setFieldValue("startDate", dayjs(selectedRowKeys[1][0]?.startDate));
              form.setFieldValue("endDate", dayjs(selectedRowKeys[1][0]?.endDate));
              form.setFieldValue("employeeId", selectedRowKeys[1][0]?.employeeId);
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
      </div>
      <Modal
        open={visible}
        title={(
          <h3 className="text-xl mb-3 font-semibold">
            Hodim ish tajribasi
            {onedit ? "ni taxrirlash" : "ni qo'shish"}
          </h3>
        )}
        okText={onedit ? "Taxrirlsh" : "Qo'shish"}
        okButtonProps={{ className: "bg-blue-600" }}
        cancelText="Bekor qilish"
        width={500}
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
            <Col span={24}>
              <Form.Item
                key="placeOfWork"
                name="placeOfWork"
                label={<span className="text-base font-medium">Ish joyi</span>}
                rules={[
                  {
                    required: true,
                    message: "Ish joyini kiriting",
                  },
                ]}
              >
                <Input placeholder="Ish joyini kiriting..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                key="position"
                name="position"
                label={<span className="text-base font-medium">Lavozimi</span>}
                rules={[
                  {
                    required: true,
                    message: "Lavozimini kiriting",
                  },
                ]}
              >
                <Input placeholder="Lavozimini kiriting..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                key="startDate"
                name="startDate"
                label={<span className="text-base font-medium">Ishni boshlagan vaqti</span>}
                rules={[
                  {
                    required: true,
                    message: "Ishni boshlagan vaqtini kiriting",
                  },
                ]}
              >
                <DatePicker
                  className="w-full"
                  placeholder="Ishni boshlagan vaqtini kiriting..."
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                key="endDate"
                name="endDate"
                label={<span className="text-base font-medium">Ishni tugagan vaqti</span>}
                rules={[
                  {
                    required: true,
                    message: "Ishni tugagan vaqtini kiriting",
                  },
                ]}
              >
                <DatePicker
                  className="w-full"
                  placeholder="Ishni tugagan vaqtini kiriting..."
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                key="employeeId"
                name="employeeId"
                label={<span className="text-base font-medium">Hodim</span>}
                rules={[
                  {
                    required: true,
                    message: "Hodimni tanlang",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Hodimni tanlang"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {employeeReducer?.employeesAllBranch?.map((room) => {
                    return (
                      <Option value={room.id} key={room.id}>{room?.name}</Option>
                    );
                  })}
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
        tableData={workExpirenceReducer?.workExpirence}
        loading={pageData?.loading}
        setSelectedRowKeys={setSelectedRowKeys}
        selectedRowKeys={selectedRowKeys}
        onChange={onChange}
      />
    </div>
  );
}

export default connect((workExpirenceReducer, employeeReducer, usersDataReducer), {
  deleteWorkExperience,
  editWorkExperience,
  saveWorkExperience,
  getWorkExperienceByUserId,
  getEmployeeBranchId
})(WorkExpirence);
