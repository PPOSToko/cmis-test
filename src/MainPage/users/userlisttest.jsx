import React, { useState,useEffect } from "react";
import Table from "../../EntryFile/datatable";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  ClosesIcon,
  Excel,
  Filter,
  Pdf,
  Calendar,
  Printer,
  search_whites,
  Search,
  PlusIcon,
  EditIcon,
  DeleteIcon,
} from "../../EntryFile/imagePath";
import {apiFetch} from './.././../../lib/fetch';
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { addDays } from "@fullcalendar/react";


const UserLists = () => {
  // server
  const userData = JSON.parse(localStorage.getItem("myCat"));
  const [negara, setNegara] = useState([]);
  const [users, setUsers] = useState([]);
  console.log(userData);
  async function doAsyncTask() {
 
    const url = (
      'http://192.168.31.149:8080/show_user?' +
      new URLSearchParams({token: userData.token}).toString()
    );
    // console.log(url);
    const result = await fetch(url)
    .then((response) => {
      return response.json();
    });
    console.log({result});
    setUsers(result.listuser);
    // console.log('Fetched from: ' + url);
 
  }
  // doAsyncTask();


  console.log(users?.map(it=>it.nama) ?? [])



  useEffect(() => {
    doAsyncTask();
  }, []);


console.log('data below:')
  // console.log('users:' + users.listuser.map((list)=>list.name))
  
// const tableData =users.listusers.map((list, index) => {
//     return{
//       nama: list.nama,
//       dept: list.dept,
//       username: list.username,
//       group: list.group,
//       iduser: list.iduser,
//       status: list.status,
//       nmdept: list.nmdept,
  
//     }
    
//   })  
  // console.log(tableData);


  const [startDate, setStartDate] = useState(new Date());
  const [inputfilter, setInputfilter] = useState(false);
//offline
 

// kalau online pakai yang fetch, ambil result



  

  const options = [
    { id: 1, text: "Disable", text: "Disable" },
    { id: 2, text: "Enable", text: "Enable" },
  ];
  const togglefilter = (value) => {
    setInputfilter(value);
  };
 
  const columns = [
    {
      title: "Departemen",
      dataIndex: "dept",
      // sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "username",
      dataIndex: "username",
      // sorter: (a, b) => a.Phone.length - b.Phone.length,
    },
    {
      title: "nama",
      dataIndex: "nama",
      // sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Nama departement",
      dataIndex: "nmdept",
      // sorter: (a, b) => a.Role.length - b.Role.length,
    },
    {
      title: "group",
      dataIndex: "group",
      // sorter: (a, b) => a.On.length - b.On.length,
    },
    {
      title: "iduser",
      dataIndex: "iduser",
      // sorter: (a, b) => a.On.length - b.On.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <>
          {text === "Aktif" && (
            <span className="badges bg-lightgreen">{text}</span>
          )}
          {text === "Non Aktif" && (
            <span className="badges bg-lightred">{text}</span>
          )}
        </>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Action",
      render: (text, record) => (
        <>
          <Link className="me-3" to="newuseredit">
            <img src={EditIcon} alt="img" />
          </Link>
          <Link className="me-3 confirm-text" to="#">
            <img src={DeleteIcon} alt="img" />
          </Link>
        </>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>User List</h4>
            <h6>Manage your User</h6>
          </div>
          <div className="page-btn">
            <Link to="/dream-pos/people/adduser-people" className="btn btn-added">
              <img src={PlusIcon} alt="img" className="me-2" />
              Add User
            </Link>
          </div>
        </div>
        {/* /product list */}
        <div className="card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-path">
                  <a
                    className={` btn ${
                      inputfilter ? "btn-filter setclose" : "btn-filter"
                    } `}
                    id="filter_search"
                    onClick={() => togglefilter(!inputfilter)}
                  >
                    <img src={Filter} alt="img" />
                    <span>
                      <img src={ClosesIcon} alt="img" />
                    </span>
                  </a>
                </div>
                <div className="search-input">
                  <input
                    className="form-control form-control-sm search-icon"
                    type="text"
                    placeholder="Search..."
                  />
                  <a className="btn btn-searchset">
                    {/* <img src={Search} alt="img" /> */}
                  </a>
                </div>
              </div>
              <div className="wordset">
                <ul>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="pdf"
                    >
                      <img src={Pdf} alt="img" />
                    </a>
                  </li>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="excel"
                    >
                      <img src={Excel} alt="img" />
                    </a>
                  </li>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="print"
                    >
                      <img src={Printer} alt="img" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* /Filter */}
            <div
              className={`card mb-0 ${inputfilter ? "toggleCls" : ""}`}
              id="filter_inputs"
              style={{ display: inputfilter ? "block" : "none" }}
            >
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <input type="text" placeholder="Enter User Name" />
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <input type="text" placeholder="Enter Phone" />
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <input type="text" placeholder="Enter Email" />
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <div className="input-groupicon">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                        <div className="addonset">
                          <img src={Calendar} alt="img" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <Select2
                        className="select"
                        data={options}
                        options={{
                          placeholder: "Select",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-1 col-sm-6 col-12 ms-auto">
                    <div className="form-group">
                      <a className="btn btn-filters ms-auto">
                        <img src={search_whites} alt="img" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Filter */}
            <div className="table-responsive">
              
              <Table columns={columns} dataSource=''/>
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
    </div>
  );
};

export default UserLists;
