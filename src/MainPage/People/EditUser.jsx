import React, { useState, useEffect } from "react";
import { Profile2, Upload } from "../../EntryFile/imagePath";
import { Link } from "react-router-dom";
import Select2 from "react-select2-wrapper";
import { useHistory, useLocation } from "react-router-dom";
import "react-select2-wrapper/css/select2.css";
import { text } from "@fortawesome/fontawesome-svg-core";

const EditUser = () => {
  const userData = JSON.parse(localStorage.getItem("myCat"));
  const [groups, setGroups] = useState([]);
  const [depts, setDepts] = useState([]);
  const [jabatans, setJabatans] = useState([]);
  const [dataaja, setDataaja] = useState();
  const [datajabatan, setDatajabatan] = useState();
  const [username, setUsername] = useState();
  const [nama, setNama] = useState();
  const [filternama, setFilternama] = useState();
  const history = useHistory();
  // const location = useLocation();
  const [email, setEmail] = useState();
  const [statusres, setStatusres] = useState();
  const [statusjabatan, setStatusjabatan] = useState();
  const [statusakun, setStatusakun] = useState();
  const [groupcheckbox, setGroupcheckbox] = useState();
  const [departemencheckbox, setDepartemencheckbox] = useState();
  const [jabatanscheckbox, setJabatanscheckbox] = useState();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState([]);
  let location = useLocation();

  // console.log(location)
  const status_akun = [
    { id: 1, text: "Aktif" },
    { id: 0, text: "Non Aktif" },
  ];

  async function doAsyncTask() {
    const url =
      "http://192.168.31.149:8080/show_user?" +
      new URLSearchParams({ token: userData.token }).toString();
    const result = await fetch(url).then((response) => {
      return response.json();
    });

    setUsers(result.listuser);
  }

  // console.log(users)
  const items = users.filter((item) => item.iduser === location.state);
  // console.log(items)
  async function dogrup() {
    const url =
      "http://192.168.31.149:8080/show_group?" +
      new URLSearchParams({ token: userData.token }).toString();
    const result = await fetch(url).then((response) => {
      return response.json();
    });
    // console.log({result});
    setGroups(result.listgroup);
    // console.log('Fetched from: ' + url);
  }

  async function dodept() {
    const url =
      "http://192.168.31.149:8080/show_dept?" +
      new URLSearchParams({ token: userData.token }).toString();
    const result = await fetch(url).then((response) => {
      return response.json();
    });

    setDepts(result.listdept);
    // console.log('Fetched from: ' + url);
  }
  //console.log({depts});

  async function dojabatan() {
    const url =
      "http://192.168.31.149:8080/show_jabatan?" +
      new URLSearchParams({ token: userData.token }) +
      "&" +
      new URLSearchParams({ dep_id: departemencheckbox }).toString();
    // console.log('dataurl:')
    // console.log(url)

    const result = await fetch(url).then((response) => {
      return response.json();
    });
    setJabatans(result.listjabatan);
    // console.log('Fetched from: ' + url);
  }

  useEffect(() => {
    if (!items) {
      setForm(items);
    }
    console.log(form);
  }, [items]);

  useEffect(() => {
    doAsyncTask();
    dogrup();
    dodept();
    dojabatan();
  }, [departemencheckbox]);

  const groupss = groups?.map((list, index) => {
    return {
      id: list.id,
      text: list.id + list.nama,
    };
  });
  const Departemen = depts?.map((deptlist, index) => {
    return {
      id: deptlist.id,
      text: deptlist.nama,
    };
  });
  const jabatanss = jabatans?.map((jabatanlist, index) => {
    return {
      id: jabatanlist.id,
      text: jabatanlist.nama,
    };
  });
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>User Management</h4>
              <h6>Edit User</h6>
            </div>
          </div>
          {/* /add */}
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Nama User</label>
                    <input
                      type="text"
                      placeholder="Nama User"
                      value={items?.nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {/* <div className="form-group">
                    <label>jabatan</label>
                    <input type="text" onChange={(e)=>setJabatans(e.target.value)}  />
                  </div> */}
                  <div className="form-group">
                    <label>Status Akun </label>
                    <Select2
                      className="select"
                      value={statusakun}
                      onChange={(e) => setStatusakun(e.target.value)}
                      data={status_akun}
                      options={{
                        placeholder: "Pilih Status",
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6 col-12">
                  {/* <div className="form-group">
                    <label>User Name</label>
                    <input type="text" />
                  </div> */}
                </div>
                <div className="col-lg-3 col-sm-6 col-12"></div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Group</label>
                    <Select2
                      className="select"
                      value={groupcheckbox}
                      data={groupss}
                      onChange={(e) => setGroupcheckbox(e.target.value)}
                      options={{
                        placeholder: "Pilih Group",
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Departemen</label>
                    <Select2
                      className="select"
                      value={departemencheckbox}
                      data={Departemen}
                      onChange={(e) => setDepartemencheckbox(e.target.value)}
                      options={{
                        placeholder: "Pilih Departemen",
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-6"></div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Jabatan</label>
                    <Select2
                      className="select"
                      value={jabatanscheckbox}
                      data={jabatanss}
                      onChange={(e) => setJabatanscheckbox(e.target.value)}
                      options={{
                        placeholder: "Pilih Jabatan",
                      }}
                    />
                  </div>
                </div>
                <div className="col-lm-12">
                  <button className="btn btn-submit me-3 " onClick={EditUser}>
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* /add */}
        </div>
      </div>
    </>
  );
};

export default EditUser;
