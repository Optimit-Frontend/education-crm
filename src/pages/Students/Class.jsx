import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Col, DatePicker, Form, Input, Modal, Row, Select
} from "antd";
import dayjs from "dayjs";
import moment from "moment";
import CustomTable from "../../module/CustomTable";
import useKeyPress from "../../hooks/UseKeyPress";
import usersDataReducer from "../../reducer/usersDataReducer";
import classReducer, {
  deleteClass,
  editClass,
  getClassById,
  getClassesAll,
  getClassesAllNeActive,
  saveClass,
} from "../../reducer/classReducer";
import roomReducer, { getAllRoomBranch } from "../../reducer/roomReducer";
import levelReducer, { getLevels } from "../../reducer/levelReducer";
import employeeReducer, { getEmployeeBranchId } from "../../reducer/employeeReducer";
import businessBranchesReducer, { getBusinessBranch } from "../../reducer/businessBranchesReducer";

const { Option } = Select;

const columns = [
  {
    title: "Sinf",
    dataIndex: "className",
    key: "className",
    width: "30%",
    search: true,
  },
  {
    title: "Filial",
    dataIndex: "branchName",
    key: "branchName",
    width: "25%",
    search: false,
  },
  {
    title: "Sinf rahbar",
    dataIndex: "classLeaderName",
    key: "classLeaderName",
    width: "30%",
    search: false,
  },
  {
    title: "Boshlangan sana",
    dataIndex: "startDate",
    key: "startDate",
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

function Class({
  usersDataReducer,
  getClassesAll,
  saveClass,
  editClass,
  deleteClass,
  classReducer,
  roomReducer,
  getAllRoomBranch,
  levelReducer,
  getLevels,
  getEmployeeBranchId,
  getBusinessBranch,
  employeeReducer,
  businessBranchesReducer
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
    getClassesAll({ id: usersDataReducer?.branch?.id });
    getBusinessBranch(usersDataReducer?.businessId);
    getLevels();
    getEmployeeBranchId(usersDataReducer?.branch?.id);
    getAllRoomBranch(usersDataReducer?.branch?.id);
    setVisible(false);
    form.resetFields();
    setSelectedRowKeys([[], []]);
  }, [classReducer?.changeData]);

  const handleDelete = (arr) => {
    arr?.map((item) => {
      deleteClass(item);
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
          selectedRowKeys[1][0]?.id && editClass({
            ...values,
            id: selectedRowKeys[1][0]?.id,
            startDate: moment(
              new Date(values?.startDate)?.toLocaleDateString()
            ).format("YYYY-MM-DD"),
            endDate: moment(new Date(values?.endDate)?.toLocaleDateString()).format("YYYY-MM-DD"),
          });
          setOnedit(false);
        })
        .catch((info) => {
          console.error("Validate Failed:", info);
        })
      : form
        .validateFields()
        .then((values) => {
          saveClass({
            ...values,
            startDate: moment(
              new Date(values?.startDate)?.toLocaleDateString()
            ).format("YYYY-MM-DD"),
            endDate: moment(new Date(values?.endDate)?.toLocaleDateString()).format("YYYY-MM-DD"),
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
      <h3 className="text-2xl font-bold mb-5">Hamma Sinflar</h3>
      <div className="flex items-center justify-end gap-5 mb-3">
        {selectedRowKeys[0].length === 1 && (
          <button
            onClick={() => {
              setOnedit(true);
              setVisible(true);
              form.setFieldValue("className", selectedRowKeys[1][0]?.className);
              form.setFieldValue("startDate", dayjs(selectedRowKeys[1][0]?.startDate));
              form.setFieldValue("endDate", dayjs(selectedRowKeys[1][0]?.endDate));
              form.setFieldValue("branchId", selectedRowKeys[1][0]?.branch?.id);
              form.setFieldValue("classLeaderId", selectedRowKeys[1][0]?.classLeader?.id);
              form.setFieldValue("roomId", selectedRowKeys[1][0]?.room?.id);
              form.setFieldValue("levelId", selectedRowKeys[1][0]?.level?.id);
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
            Talaba
            {onedit ? "ni taxrirlash" : " qo'shish"}
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
                key="className"
                name="className"
                label={<span className="text-base font-medium">Sinf nomi</span>}
                rules={[
                  {
                    required: true,
                    message: "Sinf nomini kiriting",
                  },
                ]}
              >
                <Input placeholder="Sinf nomi kiriting..." />
              </Form.Item>
              <Form.Item
                key="startDate"
                name="startDate"
                label={<span className="text-base font-medium">Boshlangan sana</span>}
                rules={[
                  {
                    required: true,
                    message: "Sanani kiriting",
                  },
                ]}
              >
                <DatePicker
                  className="w-full"
                  placeholder="Boshlagan sanasini kiriting..."
                />
              </Form.Item>
              <Form.Item
                key="classLeaderId"
                name="classLeaderId"
                label={<span className="text-base font-medium">Sinf rahbari</span>}
                rules={[
                  {
                    required: true,
                    message: "Rahbarni kiriting",
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
                  {employeeReducer?.employees?.map((room) => {
                    return (
                      <Option value={room.id} key={room.id}>{room?.name}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                key="roomIdroomId"
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
                  style={{ width: "100%" }}
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
                key="endDate"
                name="endDate"
                label={<span className="text-base font-medium">Tugash sana</span>}
                rules={[
                  {
                    required: false,
                    message: "Sanani kiriting",
                  },
                ]}
              >
                <DatePicker
                  className="w-full"
                  placeholder="Tugash sanasini kiriting..."
                />
              </Form.Item>
              <Form.Item
                key="levelId"
                name="levelId"
                label={<span className="text-base font-medium">Sinf bosqich</span>}
                rules={[
                  {
                    required: false,
                    message: "Level tanlang",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Sinf bosqichini tanlang"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {levelReducer?.level?.map((room) => {
                    return (
                      <Option value={room.id} key={room.id}>{room?.level}</Option>
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
        tableData={classReducer?.class?.map((item) => {
          return ({
            ...item,
            branchName: item.branch?.name,
            classLeaderName: item.classLeader.name,
            getOneId: item.id
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
    usersDataReducer,
    classReducer,
    roomReducer,
    levelReducer,
    employeeReducer,
    businessBranchesReducer
  ), {
    getClassById,
    getClassesAll,
    getClassesAllNeActive,
    saveClass,
    editClass,
    deleteClass,
    getAllRoomBranch,
    getLevels,
    getEmployeeBranchId,
    getBusinessBranch
  }
)(Class);
