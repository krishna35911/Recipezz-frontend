import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import { Button } from 'bootstrap';

function Header() {

  const[user,setuser]=useState("")
  const navigate=useNavigate()

  const logout=()=>
  {
    sessionStorage.removeItem('alreadyuser')
    sessionStorage.removeItem('token')
    setuser("")
    navigate('/')
  }

  useEffect(()=>
  {
    setuser(JSON.parse(sessionStorage.getItem("alreadyuser"))?.username)
  },[])
  console.log(user);

  return (
    <nav className="navbar">
    <ul className="nav-links">
      <li>
        {user? <Link to="/add-recipes">
           Share Recipes
        </Link>: <Link to={"/login"}>Share Recipes</Link>}
      </li>
      <li>
        <Link to="/view-recipes">
          Explore Recipes
        </Link>
      </li>

     {user? <li className="dropdown">
          {/* Dropdown Trigger */}
          <p
            className="dropdown-toggle"
            type="button"
            id="aboutDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa-solid fa-user me-2"></i>{user ? `${user}`:'Login/Signup'}
          </p>

          {/* Dropdown Menu */}
          <ul className="dropdown-menu" aria-labelledby="aboutDropdown">
            <li>
              <Link to="/userdashboard" className="dropdown-item">
                Profile
              </Link>
            </li>
            <li>
              <button className="dropdown-item btn fs-6" onClick={logout}>
              <i class="fa-solid fa-right-from-bracket me-2"></i>Logout
              </button>
            </li>
          </ul>
        </li> : <li>
         <a href='/login'> <i class="fa-solid fa-user me-2"></i>Login/Signup</a>
      </li>}

      {/*  */}
      {/* <li>
         <p><i class="fa-solid fa-right-from-bracket"></i>Logout</p>
      </li> */}
    </ul>
  </nav>
  );
}

export default Header
