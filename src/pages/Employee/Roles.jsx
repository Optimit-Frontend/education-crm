import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTable from "../../module/CustomTable";
import "../../role.css";
import usersDataReducer from "../../reducer/usersDataReducer";
import roleReducer, {
  deleteRole,
  editRole,
  getRoleBranch,
  saveRole
} from "../../reducer/roleReducer";
// eslint-disable-next-line import/order
import { Button, Checkbox } from "antd";
// eslint-disable-next-line import/order
import { DownloadOutlined } from "@ant-design/icons";

function Role({
  roleReducer,
  usersDataReducer,
  deleteRole,
  saveRole,
  editRole,
  getRoleBranch,
  match
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([[], []]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const size = searchParams.get("size");
  const [pageData, setPageData] = useState({
    page: parseInt(page, 10) >= 1 ? parseInt(page, 10) : 1,
    size: size ? parseInt(size, 10) : 10,
    loading: false,
  });

  useEffect(() => {
    setSelectedRowKeys([[], []]);
  }, [roleReducer?.changeData]);

  useEffect(() => {
    const pageSize = parseInt(size, 10);
    const pageCount = parseInt(page, 10) >= 1 ? parseInt(page, 10) : 1;
    if (pageSize >= 100) {
      setPageData((prev) => {
        return { ...prev, size: 100 };
      });
      navigate(`/roles?page=${pageCount}&size=100`);
    } else if (pageSize >= 50) {
      setPageData((prev) => {
        return { ...prev, size: 50 };
      });
      navigate(`/roles?page=${pageCount}&size=50`);
    } else if (pageSize >= 20) {
      setPageData((prev) => {
        return { ...prev, size: 20 };
      });
      navigate(`/roles?page=${pageCount}&size=20`);
    } else {
      setPageData((prev) => {
        return { ...prev, size: 10 };
      });
      navigate(`/roles?page=${pageCount}&size=10`);
    }
  }, []);

  const [input, setInput] = useState(
    {
    //   USER
      viewUser: null,
      viewUserChecked: false,
      addUser: null,
      addUserChecked: false,
      editUser: null,
      editUserChecked: false,
      deleteUser: null,
      deleteUserChecked: false,
      // Roles
      AllRoleRoles: false,
      viewRole: null,
      viewRoleChecked: false,
      addRole: null,
      addRoleChecked: false,
      editRole: null,
      editRoleChecked: false,
      deleteRole: null,
      deleteRoleChecked: false,
      // WorkType
      // AllWorkTypeRoles: false,
      viewWorkType: null,
      viewWorkTypeChecked: false,
      addWorkType: null,
      addWorkTypeChecked: false,
      editWorkType: null,
      editWorkTypeChecked: false,
      deleteWorkType: null,
      deleteWorkTypeChecked: false
    }
  );

  const [roles, setRoles] = useState({
    AllUserRoles: ["addUser", "deleteUser", "editUser", "viewUser"],
    AllUserRolesValue: ["ADD_USER", "DELETE_USER", "EDIT_USER", "VIEW_USER"],
    AllRoleRoles: ["addRole", "deleteRole", "editRole", "viewRole"],
    AllRoleRolesValue: ["ADD_ROLE", "DELETE_ROLE", "EDIT_ROLE", "VIEW_ROLE"],
    AllWorkTypeRoles: ["addWorkType", "deleteWorkType", "editWorkType", "viewWorkType"],
    AllWorkTypeValue: ["ADD_WORK_OF_TYPE", "DELETE_WORK_OF_TYPE", "EDIT_WORK_OF_TYPE", "VIEW_WORK_OF_TYPE"]
  });

  const [permission, setpermission] = useState([]);

  function changeAllUserRoles(e) {
    if (e.target.checked) {
      input[e.target.name] = e.target.checked;
      roles[e.target.name].map((item, index) => {
        roles[`${e.target.name}Value`].map((value, label) => {
          if (index === label) {
            input[item] = value;
            input[`${item}Checked`] = e.target.checked;
          }
        });
      });
    } else {
      input[e.target.name] = e.target.checked;
      roles[e.target.name].map((item) => {
        input[item] = null;
        input[`${item}Checked`] = e.target.checked;
      });
    }
    const a = { ...input };
    setInput(a);
  }

  function changeRoles(e) {
    if (e.target.checked) {
      input[e.target.name] = e.target.value;
      input[`${e.target.name}Checked`] = e.target.checked;
    } else {
      input[e.target.name] = null;
      input[`${e.target.name}Checked`] = e.target.checked;
    }
    checkPermission();
  }

  function checkPermission() {
    input.AllUserRoles = input.addUserChecked && input.editUserChecked && input.deleteUserChecked && input.viewUserChecked;
    input.AllRoleRoles = input.addRoleChecked && input.editRoleChecked && input.deleteRoleChecked && input.viewRoleChecked;
    input.AllWorkTypeRoles = input.addWorkTypeChecked && input.editWorkTypeChecked && input.deleteWorkTypeChecked && input.viewWorkTypeChecked;

    const a = { ...input };
    setInput(a);
  }

  function saqla() {
    if (input.name === "") {
      input.namePlacholder = "Lavozim nomini kiriting...";
      const b = document.getElementById("inputValudesion");
      const a = { ...input };
      setInput(a);
      b.classList.add("inputValudetion");
    } else {
      permission.push(
        input.viewUser,
        input.addUser,
        input.editUser,
        input.deleteUser,
        input.viewRole,
        input.addRole,
        input.editRole,
        input.deleteRole,
        input.viewWorkType,
        input.addWorkType,
        input.editWorkType,
        input.deleteWorkType
      );
      const a = [...permission];
      setpermission(a);
      if (match.params.id === undefined) {
        saveRole(
          {
            name: input.name,
            permissions: permission,
          }
        );
      }
    }
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-5 text-center">Lavozim qo`shish</h3>
      <div className="div_container">
        <div className="block">
          <div className="border-2 p-3">
            <h2 className="text-center text-2xl">Hodimlar</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllUserRoles} name="AllUserRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_USER" name="addUser" checked={input.addUserChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hodim qo`shish</p>
            </div>
            <div className="div_check">
              <input value="VIEW_USER" name="viewUser" checked={input.viewUserChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hodim ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_USER" name="editUser" checked={input.editUserChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hodim tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_USER" name="deleteUser" checked={input.deleteUserChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hodim o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Ish turlari</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllWorkTypeRoles} name="AllWorkTypeRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_WORK_OF_TYPE" name="addWorkType" checked={input.addWorkTypeChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ish turi qo`shish</p>
            </div>
            <div className="div_check">
              <input value="VIEW_WORK_OF_TYPE" name="viewWorkType" checked={input.viewWorkTypeChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ish turi ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_WORK_OF_TYPE" name="editWorkType" checked={input.editWorkTypeChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ish turi tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_WORK_OF_TYPE" name="deleteWorkType" checked={input.deleteWorkTypeChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ish turi o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Ish Tajribasi</h2>
            <hr />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ish tajribasi qo`shish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ish tajribasi ko`rish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ish tajribasi tahrirlash</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ish tajribasi o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Sinf</h2>
            <hr />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Sinf qo`shish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Sinf ko`rish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Sinf tahrirlash</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Sinf o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Talaba vazifalari</h2>
            <hr />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Vazifa qo`shish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Vazifa ko`rish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Vazifa tahrirlash</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Vazifa o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Qarzdor talabalar</h2>
            <hr />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Vazifa ko`rish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Maoshlar</h2>
            <hr />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Maosh qo`shish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Maosh ko`rish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Maosh tahrirlash</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Maosh o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Baholar</h2>
            <hr />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Baho qo`shish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Baho ko`rish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Baho tahrirlash</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Baho o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Dars soati</h2>
            <hr />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Dars soati qo`shish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Dars soati ko`rish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Dars soati tahrirlash</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Dars soati o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Mavzu</h2>
            <hr />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Mavzu qo`shish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Mavzu ko`rish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Mavzu tahrirlash</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Mavzu o`chirish</p>
            </div>
          </div>
          <Button danger icon={<DownloadOutlined />} className="mt-4 d-flex justify-end text-xl" type="link" size={size}>
            Saqlash
          </Button>
        </div>

        {/* Ikkinchi tomon */}

        <div className="block">
          <div className="border-2 p-3">
            <h2 className="text-center text-2xl">Lavozimlar</h2>
            <hr />
            <div className="div_check">
              <input checked={input.AllRoleRoles} name="AllRoleRoles" onChange={changeAllUserRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hammasini belgilash</p>
            </div>
            <br />
            <div className="div_check">
              <input value="ADD_ROLE" name="addRole" checked={input.addRoleChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Lavozim qo`shish</p>
            </div>
            <div className="div_check">
              <input value="VIEW_ROLE" name="viewRole" checked={input.viewRoleChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Lavozim ko`rish</p>
            </div>
            <div className="div_check">
              <input value="EDIT_ROLE" name="editRole" checked={input.editRoleChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Lavozim tahrirlash</p>
            </div>
            <div className="div_check">
              <input value="DELETE_ROLE" name="deleteRole" checked={input.deleteRoleChecked} onChange={changeRoles} className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Lavozim o`chirish</p>
            </div>
          </div>

          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Hodim yutuqlari</h2>
            <hr />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Yutuq qo`shish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Yutuq ko`rish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Yutuq tahrirlash</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Yutuq o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Talabalar</h2>
            <hr />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Talaba qo`shish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Talaba ko`rish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Talaba tahrirlash</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Talaba o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Hisob raqam</h2>
            <hr />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hisob raqam qo`shish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hisob raqam ko`rish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hisob raqam tahrirlash</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hisob raqam o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Talaba to`lov qilish</h2>
            <hr />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">To`lov qo`shish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">To`lov ko`rish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">To`lov tahrirlash</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">To`lov o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Talaba haqida</h2>
            <hr />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ma`lumot qo`shish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ma`lumot ko`rish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ma`lumot tahrirlash</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ma`lumot o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Jurnal</h2>
            <hr />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Jurnal qo`shish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Jurnal ko`rish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Jurnal tahrirlash</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Jurnal o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Davomad</h2>
            <hr />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Davomad qo`shish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Davomad ko`rish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Davomad tahrirlash</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Davomad o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Dars jadvali</h2>
            <hr />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Dars jadvali qo`shish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Dars jadvali ko`rish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Dars jadvali tahrirlash</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Dars jadvali o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">O`tkazma ( transaction )</h2>
            <hr />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">O`tkazma qo`shish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">O`tkazma ko`rish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">O`tkazma tahrirlash</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">O`tkazma o`chirish</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect((roleReducer, usersDataReducer), {
  getRoleBranch,
  saveRole,
  deleteRole,
  editRole
})(Role);
