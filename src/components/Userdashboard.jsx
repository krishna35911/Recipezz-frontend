import React, { useContext, useEffect, useState } from 'react'
import './userdashboard.css'
import { getsavedrecipes, getuserrecipesapi } from '../Backend/Apicalls'
import { base_url } from '../Backend/Base-url'
import { Link, useNavigate } from 'react-router-dom'
import { getapprovedcontext } from '../context/Contextshare'

function Userdashboard() {
  const[username,setusername]=useState("")
  const[token,settoken]=useState()
  const[recipes,setrecipes]=useState([])
  const[userid,setuserid]=useState()
  const navigate=useNavigate()
  const {approvedcontext,setapprovedcontext}=useContext(getapprovedcontext)

  useEffect(()=>
  {
    if(sessionStorage.getItem("token"))
    {
      settoken(sessionStorage.getItem("token"))
      setusername(JSON.parse(sessionStorage.getItem("alreadyuser"))?.username)
      setuserid(JSON.parse(sessionStorage.getItem("alreadyuser"))._id)
    }
  },[])

  console.log(userid);
  console.log(token);

  const allrecipes = async () => {
    if (token) {
      const reqheader = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      };

      try {
        const res = await getuserrecipesapi(userid, reqheader);
        console.log(res);

        if (res.status===200) {
          setrecipes(res.data);
        } else {
          console.log(res.response.data);
        }
      } catch (error) {
        console.error('Error fetching user recipes:', error);
      }
    }
  };

  console.log(recipes);

  const logout=()=>
  {
    if(sessionStorage.getItem("token"))
    {
    sessionStorage.removeItem('alreadyuser')
    sessionStorage.removeItem('token')
    navigate('/login')}
  }
useEffect(()=>
{
  allrecipes()
},[userid,token,approvedcontext])
  
useEffect(() => {
},[recipes]); 

  return (
    <>
       <nav className="navbar navbar-expand-lg navbar-light bg-teritiary p-2">
      <div className="container-fluid">
        <a className="navbar-brand ms-5" href="/">
          <h2 style={{ fontSize: '45px', fontWeight: 'bold', color: '#D24545', fontFamily: 'cursive' }}>Recipez</h2>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item ms-md-3 ms-lg-3">
              <a className="nav-link active" aria-current="page" href="/view-recipes">
                <button className="btn p-2 text-secondary"><i class="fa-solid fa-magnifying-glass me-2"></i>Search</button>
              </a>
            </li>
          <li className="nav-item ms-md-3 ms-lg-3">
              <a className="nav-link active" aria-current="page" href="/add-recipes">
                <button className="btn p-2 text-secondary"><i class="fa-regular fa-square-plus me-2"></i>Create</button>
              </a>
            </li>
            <li className="nav-item ms-md-3 ms-lg-3">
              <a className="nav-link active" aria-current="page" href="/userdashboard">
                <button className="btn p-2 text-secondary " onClick={logout}><i class="fa-regular fa-user me-2"></i>Logout</button>
              </a>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
    <div className='container mt-5 mb-5'>

      <div className='d-flex justify-content-between'>
          <div>
            <h2 className='fw-bold' style={{color:'#D63484'}}>Heyy {username ? `${username}`:'User'} <i class="fa-regular fa-face-smile-wink text-warning"></i></h2>
          </div>
          <div>
            <button className='btn btn-info'> <i class="fa-solid fa-gear me-2"></i><Link to={'/usersettings'}style={{textDecoration:'none',color:'black'}}>Account Settings</Link></button>
            <Link to={'/saved'}><button className='btn btn-success ms-5'><i class="fa-solid fa-bookmark me-2"></i>Saved recipes</button></Link>
          </div>
      </div>

      <h4 className='fw-bold mt-5 text-center' style={{color:'#CD5C08'}}>Status of your uploaded content</h4>
      <div className="styles mt-4">
      {recipes?.length>0?
      recipes.map((item)=>(<div className="recipeCard">
      <img src={`${base_url}/fileuploads/${item.recipeimg}`} className="recipeImage" />
      <div className='align-items-center justify-content-center d-flex'><button className='btn fw-bold'>{item.title}</button></div>
      <div className="overlay">
        <div className="recipeDetails">
          {item.status==='approved'?<h3 className="recipeName text-warning fw-bold"> Approved</h3>:item.status==='rejected'?<h3 className="recipeName text-danger fw-bold"> Rejected</h3>:<h3 className="recipeName text-primary fw-bold"> Pending</h3>}
        </div>
      </div>
</div>))
      :<p>nothing to display</p>}
    </div>
    </div>
    </>
  )
}

export default Userdashboard
