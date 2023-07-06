import React, { useState } from "react";
import {
  AvocatImage,
  Dash1,
  Dash2,
  Dash3,
  Dash4,
  Dropdown,
  OrangeImage,
  PineappleImage,
  EarpodIcon,
  StawberryImage,
  IphoneIcon,
  SamsungIcon,
  MacbookIcon,
} from "../EntryFile/imagePath";
import Table from "../EntryFile/datatables"
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import CountUp from "react-countup";
import { Helmet } from "react-helmet";
import RightSideBar from "../components/rightSidebar";

const userData = JSON.parse(localStorage.getItem("myCat"));

const Dashboard = () => {

  return (
    <>
      <div className="page-wrapper">
        <Helmet>
          <title>CMIS</title>
          <meta name="description" content="Dashboard page" />
        </Helmet>
        <div className="content">
      
            <div style={{
                            
                            textAlign: "center",
                            paddingLeft : "1%",
                            display: "block",
                            padding: "3px",
                            marginRight: "auto",
                            marginLeft: "10",
                            
                          }}>
              <img src={Dash1}  alt="img" />
              </div>
              <div>
              <h2 className="card-title" style={{
                             padding: "2px",
                            textAlign: "center",
                           
                            display: "block",
                            fontSize: "36px",
                            fontWeight: "600",
                            fontFamily: "inter",

                           
                           
                            
                          }}>Hi, {userData?.nama}
                          <h2 style={{
                             
                            textAlign: "center",
                            display: "block",
                            fontSize: "24px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            fontFamily: "inter",
                          }}>Selamat Datang di Cahaya Management Information System
                          </h2>
                </h2>
                
            </div>
           
          

    
 
        </div>
      </div>
      <RightSideBar />
    </>
  );
};

export default Dashboard;
