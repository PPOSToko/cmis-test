import React, { useState, useEffect } from "react";

import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { viewModel } from "./ViewModel";

const AddUser = () => {
  const [username, setUsername] = useState();
  const [nama, setNama] = useState();
  const [email, setEmail] = useState();
  const [statusakun, setStatusakun] = useState();
  const [groupcheckbox, setGroupcheckbox] = useState();
  const [departemencheckbox, setDepartemencheckbox] = useState();
  const [jabatanscheckbox, setJabatanscheckbox] = useState();

  const {
    method: { submitAdd, getDepts, getGroups, getJabatan },
    data: { groupArrays, departemenArrays, jabatanArrays },
  } = viewModel({
    departemencheckbox,
    email,
    groupId: groupcheckbox,
    jabatanId: jabatanscheckbox,
    nama,
    status: statusakun,
    username,
  });

  useEffect(() => {
    getDepts();
    getGroups();
    getJabatan(departemencheckbox);
  }, [departemencheckbox]);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>User Management</h4>
              <h6>Add/Update User</h6>
            </div>
          </div>
          <button className="btn btn-submit me-3">Kembali</button>
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
                      data={groupArrays}
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
                      data={departemenArrays}
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
                      data={jabatanArrays}
                      onChange={(e) => setJabatanscheckbox(e.target.value)}
                      options={{
                        placeholder: "Pilih Jabatan",
                      }}
                    />
                  </div>
                </div>
                <div className="col-lm-12">
                  <button className="btn btn-submit me-3 " onClick={submitAdd}>
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
export default AddUser;
