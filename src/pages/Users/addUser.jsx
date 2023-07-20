import "./addUser.css";
import { connect } from "react-redux";
import { useEffect } from "react";
// eslint-disable-next-line import/named
import userReducer, { addUser, deleteUser, editUser, getUsers } from "../../reducer/userReducer.js";

function AddUser({ usersDataReducer }) {
  useEffect(() => {
  }, []);

  return (
    <div>
      <h3 className="text-center">Xodim qo`shish</h3>
      <div className="mt-3 ">
        {/* eslint-disable-next-line react/button-has-type */}
        <button className="justify-end rounded hover:rounded-lg btnAdd">Xodim qo`shish</button>
      </div>

      <div className="mt-4">
        <table className="table-fixed border-2 table-row">
          <thead>
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
              <td>dasd</td>
              <td>dasd</td>
              <td>dasd</td>
              <td>dasd</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default connect((userReducer), { getUsers, addUser, editUser, deleteUser })(AddUser);
