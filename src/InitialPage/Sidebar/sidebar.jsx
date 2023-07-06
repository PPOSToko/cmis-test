import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Switch, withRouter, useHistory, useLocation, Link } from "react-router-dom";
import {
  Dashboard,
  Expense,
  People,
  Places,
  Product,
  Time,
  Users1,
  settings,
  Purchase,
  Quotation,
  Return,
  Transfer,
  Sales1,
} from "../../EntryFile/imagePath";
// import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import FeatherIcon from "feather-icons-react";

const Sidebar = (props) => {
  const [isSideMenu, setSideMenu] = useState("");
  const [path, setPath] = useState("");
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem("myCat"));
  const toggleSidebar = (value) => {
    setSideMenu(value);
  };
  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };
  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };
  const pageRefresh = (url, page) => {
    history.push(`/${url}/${page}`);
    window.location.reload();
  };
  const location = useLocation();
  let pathname = location.pathname;
  useEffect(() => {
    document.querySelector(".main-wrapper").classList.remove("slide-nav");
    document.querySelector(".sidebar-overlay").classList.remove("opened");
    document.querySelector(".sidebar-overlay").onclick = function () {
      this.classList.remove("opened");
      document.querySelector(".main-wrapper").classList.remove("slide-nav");
    };
  }, [pathname]);

  return (
    <div className="sidebar" id="sidebar">      
        <Scrollbars>
          <div className="sidebar-inner slimscroll">
            <div
              id="sidebar-menu"
              className="sidebar-menu"
              onMouseLeave={expandMenu}
              onMouseOver={expandMenuOpen}
            >
              <ul>
                <li className={pathname.includes("dashboard") ? "active" : ""}>
                  <Link
                    to="/dream-pos/dashboard"
                    onClick={() => toggleSidebar(isSideMenu == "" ? "" : "")}
                  >
                    <img src={Dashboard} alt="img" />
                    <span>Dashboard</span>
                  </Link>
                </li>
            
          
                {/* coba */}
                { userData.menu.map((datamenu, index) => 
                
                    <li className="submenu"  key={index}>  
                          <Link
                            className={
                              pathname.includes(`{datamenu.nm_mm}`)
                                ? "subdrop active"
                                : "" || isSideMenu == datamenu.lnk
                                ? "subdrop active"
                                : ""
                            }  
                            onClick={() =>
                              toggleSidebar(isSideMenu == datamenu.lnk ? "" : datamenu.lnk)
                            }
                            to="#"
                          >
                            {" "}
                            <img src={Purchase} alt="img" /> <span>{datamenu.nm_mm}</span>{" "}
                            {/* ../../EntryFile/imagePath */}
                            <span className="menu-arrow"></span>
                          </Link> 
                        { isSideMenu == datamenu.lnk ? (
                        <ul>
                          <li>
                            <Link
                              className={
                                pathname.includes(datamenu.nm_mm) ? "active" : ""
                              }
                              to={`/dream-pos/${datamenu.lnk}`}
                            >
                              {datamenu.nama}
                            </Link>
                          </li>
                        </ul>
                        ) : (
                          ""
                        )}
                    </li>
                 )}
                 {/* <li className="submenu">
                  <Link
                    to="#"
                    className={
                      pathname.includes("/dream-pos/users")
                        ? "subdrop active"
                        : "" || isSideMenu == "Users"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "Users" ? "" : "Users")
                    }
                  >
                    <img src={Users1} alt="img" />
                    <span> Users</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Users" ? (
                    <ul>
                      <li>
                        <Link
                          to="/dream-pos/users/newuser"
                          className={
                            pathname.includes("newuser") ? "active" : ""
                          }
                        >
                          New User{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dream-pos/users/userlists"
                          className={
                            pathname.includes("userlists") ? "active" : ""
                          }
                        >
                          Users List
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li> */}
             
              </ul>
            </div>
          </div>
        </Scrollbars>
      </div>    
  );
};

export default withRouter(Sidebar);
