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
import { DownloadOutlined } from "@ant-design/icons";

function Role({
  roleReducer,
  usersDataReducer,
  deleteRole,
  getRoleBranch
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
    getRoleBranch({
      page: pageData.page,
      size: pageData.size,
      branchId: usersDataReducer?.branch?.id
    });
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
    }
  );

  return (
    <div>
      <h3 className="text-2xl font-bold mb-5 text-center">Lavozim qo`shish</h3>
      <div className="div_container">
        <div className="block">
          <div className="border-2 p-3">
            <h2 className="text-center text-2xl">Hodimlar</h2>
            <hr />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hodim qo`shish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hodim ko`rish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hodim tahrirlash</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Hodim o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Ish turlari</h2>
            <hr />
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ish turi qo`shish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ish turi ko`rish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ish turi tahrirlash</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Ish turi o`chirish</p>
            </div>
          </div>
          <div className="border-2 p-3 mt-4">
            <h2 className="text-center text-2xl">Ish Tajribasi</h2>
            <hr />
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
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Lavozim qo`shish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Lavozim ko`rish</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
              <p className="ml-4 text-xl">Lavozim tahrirlash</p>
            </div>
            <div className="div_check">
              <input className="checkInput" type="checkbox" />
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
