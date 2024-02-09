import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Header from '../components/Header';
import About from '../components/About';
import Latest from '../components/Latest';

function Home() {
  // const[user,setuser]=useState("")
  // useEffect(()=>
  // {
  //   setuser(JSON.parse(sessionStorage.getItem("alreadyuser"))?.username)
  // },[user])
  // console.log(user);

  // const handleLogout = () => {
  //   setuser("");
  // };
  
  return (
    <div>
      <div className="homepage">
        {/* <Header userchange={handleLogout}/> */}
        <Header/>
        <div className="background-image">
          <h1 style={{color:'#79155B'}}>Recipez</h1>
          <nav className="mt-5 navhome">
          </nav>
        </div>
        </div>
        <div>
          <About />
          <Latest/>
        </div>
    </div>
  );
}

export default Home;
