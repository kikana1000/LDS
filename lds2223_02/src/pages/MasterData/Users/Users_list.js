import {Table,PopupInfo} from "../../../components";
import { Person, PersonAdd } from "react-bootstrap-icons";
import React, { useState } from "react";
import PopupAdd from "./PopupAdd";
import PopupEdit from "./PopupEdit";
import "../../MasterData/styles.scss";

function Users_list() {
  const [users, setUsers] = useState([
    {
      ID: 1,
      Name: "Frank Murphy",
      Email: "frank.murphy@test.com",
      Role: "User",
      Password: "123",
      Telephone: "918492732",
      NIF: "274723612",
      Active: true,
    },
    {
      ID: 2,
      Name: "Vic Reynolds",
      Email: "vic.reynolds@test.com",
      Role: "Admin",
      Password: "dksieusda",
      Telephone: "918342732",
      NIF: "375826312",
      Active: true,
    },
    {
      ID: 3,
      Name: "Gina Jabowski",
      Email: "gina.jabowski@test.com",
      Role: "Admin",
      Password: "dksieusda",
      Telephone: "918492564",
      NIF: "545633218",
      Active: true,
    },
    {
      ID: 4,
      Name: "Jessi Glaser",
      Email: "jessi.glaser@test.com",
      Role: "Gestor",
      Password: "dksieusda",
      Telephone: "918492311",
      NIF: "756342132",
      Active: true,
    },
    {
      ID: 5,
      Name: "Jay Bilzerian",
      Email: "jay.bilzerian@test.com",
      Role: "Admin",
      Password: "dksieusda",
      Telephone: "912948234",
      NIF: "123534533",
      Active: true,
    },
  ]); 

  const [buttonPopupAdd, setButtonPopupAdd] = useState(false);
  const [buttonPopupEdit, setButtonPopupEdit] = useState(false);
  const [buttonPopupInfo, setButtonPopupInfo] = useState(false);
  const [elementInfo, setElementInfo] = useState(null);
  const [elementEdit, setElementEdit] = useState(null);

  const infoToShow = ["Name", "Email", "Role"];

  const remove = (e) => {
    console.log(e)
    const ID = e.ID;
    setUsers((current) => current.filter((item) => item.ID !== ID));
  };

  return (
    <div className="local-bootstrap container font gap-3 " >
      <div className="users-list">
        <div className="mx-3">
          <h1 className="p-3 text-center">
            {" "}
            <Person className="header-icon" fontSize={"x-large"} />
            Employee
          </h1>
          <div className="button-add">
                <button
                  className="btn btn-outline-success"
                  onClick={() => setButtonPopupAdd(true)}>
                  Add Employee
                  <PersonAdd color="green" className="btn-icon" />
                </button>
                </div>
          <Table
            infoToShow={infoToShow}
            data={users}
            setElementInfo={(e) => setElementInfo(e)}
            setElementEdit={(e) => setElementEdit(e)}
            setButtonPopupEdit={(e) => setButtonPopupEdit(e)}
            setButtonPopupInfo={(e) => setButtonPopupInfo(e)}
            remove={(e) => remove(e)}
          />
          <PopupAdd
            users={users}
            setUsers={setUsers}
            trigger={buttonPopupAdd}
            setTrigger={setButtonPopupAdd}
          ></PopupAdd>
          <PopupEdit
            user={elementEdit}
            setUser={setElementEdit}
            users={users}
            setUsers={(e) => setUsers(e)}
            trigger={buttonPopupEdit}
            setTrigger={setButtonPopupEdit}
          ></PopupEdit>
          <PopupInfo
            headData={[ "Name", "Email", "Role", "Telephone","NIF","Active"]}
            data={elementInfo}
            trigger={buttonPopupInfo}
            setTrigger={setButtonPopupInfo}
          ></PopupInfo>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Users_list;
