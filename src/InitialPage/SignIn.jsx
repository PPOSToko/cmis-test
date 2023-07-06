import React,{useEffect, useState,  useRef} from 'react';
import { LoginImage,MailIcon, Logo, Users1 } from '../EntryFile/imagePath'
import { useHistory } from 'react-router-dom'
import { Banner } from '../EntryFile/imagePath';
import { Banner2 } from '../EntryFile/imagePath';
import { Logocmis } from '../EntryFile/imagePath';
import { Helmet } from 'react-helmet';
import {apiFetch} from '../../lib/fetch';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';



const SignInPage = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [data, setData] = useState();
    const [status, setStatus] = useState();
    const history = useHistory();
    const[eye,seteye]=useState(true);
    const onEyeClick = () =>{
        seteye(!eye)
        }

    const localIpAddress = require("local-ip-address")
    const localIp = localIpAddress();

    async function login()
    {
       apiFetch(`/login`, {
      method: "POST",
    //   mode: "no-cors",
      //credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "*"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then((response) => {
        setStatus(response);
        return response.json();
        // Ini response network 
      })
      .then((data) => {
        setData(data);
        if(data.status === 1){
            localStorage.setItem("myCat", JSON.stringify(data));
            history.push("/dream-pos/dashboard")
            sessionStorage.setItem("tokencmis", data.token);
            
            // console.log(sessionStorage.getItem('tokencmis'));
            return;
        }
        else{(data.status === 0)
            history.push("/signIn")
            win.clear();
            return;
        }
        // Response data dari BE to FE
       // console.log(setUsername)
      });
          
  
  };

  
  let userData = localStorage.getItem("myCat")
  console.log(userData);

        
    return (
        <>
            <div className="main-wrapper">
                <Helmet>
                    <title>CMIS - Cahaya Management Information System</title>
                    <meta name="description" content="SignIn page" />
                </Helmet>
                <div className="account-content">
                    <div className="login-wrapper">
                        <div className="login-img">
                            <img src={Banner2} />
                        </div>
                        <div className="login-content">
                            <div className="login-userset">
                                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                                    <div className="login-logo">
                                        <img src={Logocmis} alt="img" />
                                    </div>
                                    <div className="login-userheading">
                                        <h3>Hai 👋</h3>
                                        <h4>Silahkan login terlebih dahulu untuk bisa menggunakan fitur di CMIS</h4>
                                     
                                    </div>
                                    <div className="form-login">
                                        <label>Username</label>
                                        <div className="form-addons">
                                           <input type="text" placeholder='Username' 
                                           onChange={(e)=>setUsername(e.target.value)} className='form-control'/>   
                                            {data?.status === 1 && <p>{data?.msg}</p>}
                                        {data?.status === 0 && <p>{data?.msg}</p>}
                                        <img src={Users1} alt="img" />
                                        </div>
                                        
                                    </div>
                                    <div className="form-login">
                                        <label>Password</label>
                                        <div className="pass-group">
                                        <input type={eye ? "password" : "text"} placeholder='Password' onChange={(e)=>setPassword(e.target.value)} className='form-control'/> 
                                        <span  onClick={onEyeClick} className={`fas toggle-password ${eye ? "fa-eye-slash":"fa-eye"} `} />
                                           
                                        
                                        </div>

                                    </div>
                                    <div className="form-login">
                                        <button onClick={login} className="btn btn-login" >
                                            Login
                                        </button>
                                        
                                    </div>
                                    <div style={{fontfamily: 'Inter',
                                                    fontstyle: 'normal',
                                                    fontweight: '500',
                                                    fontsize: '16px',
                                                    textAlign: "center",
                                                    // color: '#1E5AF6;',
                                                    color: "#1E5AF6",
                                                    flex: 'none',
                                                    order: '0',
                                                    flexGrow: '0',
                                                    }}>
                                    <label>IP Anda : 192.168.30.130 {localIp}</label>
                                    </div>
                                    <div style={{fontfamily: 'Inter',
                                                    fontstyle: 'normal',
                                                    fontweight: '400',
                                                    fontsize: '14px',
                                                    textAlign: "center",
                                                    padding: "40px",
                                                    color: "#757575",
                                                    
                                                    }}>
                                    <label>Copyrights © PT. Cahaya Jakarta</label>
                                    <label>All data and programs CMIS is owned by PT. Cahaya Jakartaand are not allowed misuse or copiedwithout permission of the company.</label>
                                    </div>
                          
                               
                            </div>
                        </div>
                      
                    </div>
                </div>
            </div>

        </>
    )
}

export default SignInPage;