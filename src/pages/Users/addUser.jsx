import "./addUser.css";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
// eslint-disable-next-line import/named
import userReducer, {addUser, deleteUser, editUser, getUsers} from "../../reducer/userReducer.js";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

function AddUser({usersDataReducer}) {

  const [openAddUserModal, closeAddUserModal] = useState(false)

  function openAddUserToggle() {
    closeAddUserModal(!openAddUserModal)
  }

  useEffect(() => {

  }, []);

  return (
    <div>
      <h3 className="text-center">Xodim qo`shish</h3>
      <div className="mt-3 ">
        {/* eslint-disable-next-line react/button-has-type */}
        <button onClick={openAddUserToggle}
                className="justify-end rounded hover:rounded-lg btnAdd">Xodim qo`shish
        </button>
      </div>

      <div className="mt-4 table_div">
        <table className="table_one">
          <thead className="border">
          <tr>
            <th>Name</th>
            <th>Name</th>
            <th>Name</th>
            <th>Name</th>
            <th>Name</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td className="border text-center">dasd</td>
            <td className="border text-center">dasd</td>
            <td className="border text-center">dasd</td>
            <td className="border text-center">dasd</td>
            <td className="border text-center">dasd</td>
          </tr>
          </tbody>
        </table>
      </div>

      <Modal toggle={openAddUserToggle} isOpen={openAddUserModal}>
        <ModalHeader>
          <h4>Xodim qo'shish</h4>
        </ModalHeader>
        <ModalBody>
          <div>
            dasd
          </div>
        </ModalBody>
        <ModalFooter>
          <button>Saqlash</button>
          <button onClick={openAddUserToggle}>Chiqish</button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default connect((userReducer), {getUsers, addUser, editUser, deleteUser})(AddUser);
