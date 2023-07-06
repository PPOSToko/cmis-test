import React, { useEffect, useState } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
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
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import FeatherIcon from "feather-icons-react";
// import {apiFetch} from '../../../lib/fetch';

const Sidebar = (props) => {
  const [isSideMenu, setSideMenu] = useState("");
  // const [path, setPath] = useState("");
  const history = useHistory();

  const userData = JSON.parse(localStorage.getItem("myCat"));
//   const renderList = userData.menu.map((nm_mm, index) => {
//   console.log(nm_mm);
//   return(
//   <div key={index}>{nm_mm.nm_mm}</div>
//   )
// }
//   );  

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
    history.push(`/dream-pos/${url}/${page}`);
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
    <>
      <div className="sidebar" id="sidebar">

          <div className="sidebar-inner slimscroll">
            <div
              id="sidebar-menu"
              className="sidebar-menu"
              // onMouseOver={expandMenuOpen}
              // onMouseLeave={expandMenu}
            >
              <ul>
                {/* dashboard */}
                <li className="submenu-open">
                  <h6 className="submenu-hdr">Main</h6>
                  <ul>
                    <li
                      className={pathname.includes("dashboard") ? "active" : ""}
                    >
                      <Link to="/dream-pos/dashboard">
                    
                        {/* <FeatherIcon icon="grid" /> */}
                        <li className="menu-items">
                      { userData.menu.map((datamenu, index) =>   
                          <div  style={{
                            paddingTop: '40px',
                            boxSizing: 'content-box',
                          }} key={index}>{datamenu.nm_mm}
                          <a href={datamenu.lnk}>{datamenu.nama}</a>
                          </div>  )}
                        </li>
                       
                      </Link>
                    </li>

                  </ul>
                </li>
                <li >
                  <ul>
                  {/* <span>{renderList}</span> */}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        
      </div>
    </>
  );
};

export default withRouter(Sidebar);
