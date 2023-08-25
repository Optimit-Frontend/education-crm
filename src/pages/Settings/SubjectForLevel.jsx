import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  Col, Form, InputNumber, Modal, Row, Select
} from "antd";
import CustomTable from "../../module/CustomTable";
import useKeyPress from "../../hooks/UseKeyPress";
import usersDataReducer from "../../reducer/usersDataReducer";
import subjectReducer, { getSubject } from "../../reducer/subjectReducer";
import subjectForLevelReducer, {
  deleteSubjectForLevel, editSubjectForLevel, getSubjectForLevel, saveSubjectForLevel
} from "../../reducer/subjectForLevelReducer";
import levelReducer, { getLevels } from "../../reducer/levelReducer";

const { Option } = Select;

const columns = [
  {
    title: "Fan nomi",
    dataIndex: "subjectName",
    key: "subjectName",
    width: "30%",
    search: true,
  },
  {
    title: "Sinf bosqichi",
    dataIndex: "levelName",
    key: "levelName",
    width: "20%",
    search: false,
  },
  {
    title: "O'tiladigan soati",
    dataIndex: "teachingHour",
    key: "teachingHour",
    width: "20%",
    search: false,
  },
  {
    title: "Soatlik o'tilish narxi",
    dataIndex: "priceForPerHour",
    key: "priceForPerHour",
    width: "30%",
    search: false,
  },
];

function Subjects({
  deleteSubjectForLevel,
  editSubjectForLevel,
  saveSubjectForLevel,
  getSubjectForLevel,
  getLevels,
  getSubject,
  subjectForLevelReducer,
  levelReducer,
  subjectReducer,
  usersDataReducer
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
    getSubject(usersDataReducer?.branch?.id);
    getSubjectForLevel(usersDataReducer?.branch?.id);
    getLevels();
    setVisible(false);
    setOnedit(false);
    form.resetFields();
    setSelectedRowKeys([[], []]);
  }, [subjectForLevelReducer?.changeData]);

  const handleDelete = (arr) => {
    arr?.map((item) => {
      deleteSubjectForLevel(item);
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
          selectedRowKeys[1][0]?.id && editSubjectForLevel({
            ...values,
            branchId: usersDataReducer?.branch?.id,
            id: selectedRowKeys[1][0]?.id
          });
        })
        .catch((info) => {
          console.error("Validate Failed:", info);
        })
      : form
        .validateFields()
        .then((values) => {
          saveSubjectForLevel({ ...values, branchId: usersDataReducer?.branch?.id });
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
      <h3 className="text-2xl font-bold mb-5">Sinflar kesimidagi fanlar</h3>
      <div className="flex items-center justify-end gap-5 mb-3">
        {selectedRowKeys[0].length === 1 && (
        <button
          onClick={() => {
            setOnedit(true);
            setVisible(true);
            form.setFieldValue("priceForPerHour", selectedRowKeys[1][0]?.priceForPerHour);
            form.setFieldValue("teachingHour", selectedRowKeys[1][0]?.teachingHour);
            form.setFieldValue("levelId", selectedRowKeys[1][0]?.level?.id);
            form.setFieldValue("subjectId", selectedRowKeys[1][0]?.subject?.id);
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
            Sinflar kesimidagi fan
            {onedit ? "ni taxrirlash" : " qo'shish"}
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
                key="subjectId"
                name="subjectId"
                label={<span className="text-base font-medium">Fan</span>}
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
                  placeholder="Fanni tanlang"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  key="id"
                  filterOption={(input, option) => {
                    return option.children.toLowerCase()?.includes(input.toLowerCase());
                  }}
                >
                  {subjectForLevelReducer?.subjectForLevel?.map((subject) => {
                    return (
                      <Option value={subject.id} key={subject.id}>{subject?.name}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                key="levelId"
                name="levelId"
                label={<span className="text-base font-medium">Sinf bosqich</span>}
                rules={[
                  {
                    required: false,
                    message: "Sinf bosqichini tanlang",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Sinf bosqichini tanlang..."
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
              {/* <Form.Item */}
              {/*   key="teachingHour" */}
              {/*   name="teachingHour" */}
              {/*   label={<span className="text-base font-medium">O&apos;qitilish soati</span>} */}
              {/*   rules={[ */}
              {/*     { */}
              {/*       required: true, */}
              {/*       message: "O'qitilish soatini kiriting", */}
              {/*     }, */}
              {/*   ]} */}
              {/* > */}
              {/*   <InputNumber className="w-full" placeholder="O'qitilish soatini kiriting..." /> */}
              {/* </Form.Item> */}
              {/* <Form.Item */}
              {/*   key="priceForPerHour" */}
              {/*   name="priceForPerHour" */}
              {/*   label={<span className="text-base font-medium">Soatlik o&apos;qitish narxi</span>} */}
              {/*   rules={[ */}
              {/*     { */}
              {/*       required: true, */}
              {/*       message: "Soatlik o'qitish narxini kiriting", */}
              {/*     }, */}
              {/*   ]} */}
              {/* > */}
              {/*   <InputNumber className="w-full" placeholder="Soatlik o'qitish narxini kiriting..." /> */}
              {/* </Form.Item> */}
            </Col>
          </Row>
        </Form>
      </Modal>
      <CustomTable
        columns={columns}
        pageSizeOptions={[10, 20, 50, 100]}
        current={pageData?.page}
        pageSize={pageData?.size}
        tableData={subjectForLevelReducer?.subjectForLevel?.map((item) => {
          return ({ ...item, levelName: item.level?.level, subjectName: item.subject?.name });
        })}
        loading={pageData?.loading}
        setSelectedRowKeys={setSelectedRowKeys}
        selectedRowKeys={selectedRowKeys}
        onChange={onChange}
      />
    </div>
  );
}

export default connect((subjectForLevelReducer, levelReducer, subjectReducer, usersDataReducer), {
  deleteSubjectForLevel,
  editSubjectForLevel,
  saveSubjectForLevel,
  getSubjectForLevel,
  getSubject,
  getLevels
})(Subjects);
