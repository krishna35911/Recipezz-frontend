import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { getapprovedrecipesapi, getrecipecount, getsavedrecipes, registerapi, usercountapi } from '../Backend/Apicalls'
import { base_url } from '../Backend/Base-url'
import { getapprovedcontext } from '../context/Contextshare'

function Dashboard() {

  const[usernumber,setusernumber]=useState("")
  const[recipecount,setrecipecount]=useState("")
  const[allrecipes,setallrecipes]=useState([])
  const {approvedcontext,setapprovedcontext}=useContext(getapprovedcontext)

  const users=async()=>
  {
    const res=await usercountapi()
    if(res.status===200)
    {
      setusernumber(res.data)
    }
    else
    {
      console.log(res.response.data)
    }
  }

  const recipescount=async()=>
  {
    const res=await getrecipecount()
    if(res.status===200)
    {
      setrecipecount(res.data)
    }
    else
    {
      console.log(res.response.data)
    }

  }

  const allrecipeslist=async()=>
  {
    const res=await getapprovedrecipesapi()
    if(res.status===200)
    {
      setallrecipes(res.data.slice(0,5))
    }
    else
    {
      console.log(res.response.data)
    }

  }
  console.log(usernumber);


  useEffect(()=>
  {
    users()
    recipescount()
    allrecipeslist()
  },[approvedcontext])

  return (
    <div className='d-flex'>
      <div><Sidebar/></div>
      <div className='container mt-2 d-flex flex-column'>
      <h5 className='fw-bold' style={{fontFamily:'monospace',fontSize:'20PX'}}> <u>Dashboard</u> </h5>
          <div className="row ms-2 mt-2">
            <div className="col-md-12 rounded d-flex justify-content-center align-items-center flex-column p-3" style={{backgroundColor:'#F9EFDB',width:'100%',height:'400px'}}>
                <h5 className='mb-3'>Trending Recipes</h5>
                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6  mt-3'>
                {allrecipes?.length>0?
          allrecipes.map((item)=>(
          <div className="col ms-3">
          <div className="card" style={{ width: '10rem' }}>
            <img
              src={`${base_url}/fileuploads/${item.recipeimg}`}
              className="card-img-top"
              alt="Banh Mi"
              style={{ width: '100%',objectFit: 'cover',height:'200px' }}
            />
            <div className="card-body">
              <h5 className="card-title" style={{fontSize:'15px'}}>{item.title}</h5>
              <p style={{fontSize:'10px'}}>{item.username}</p>
            </div>
            <div className="card-body text-center">
            </div>
          
          </div>
        </div>))
        :<p>nothing</p>}
    </div>
            </div>
          </div>
          <div className='row d-flex ms-2 justify-content-center alignb-items-center mt-3'>
            <div className="col-md-4 rounded" style={{backgroundColor:'#FFB0B0',width:'310px',height:'140px'}}>
            <h5 className='fw-bold mt-4' style={{fontSize:'20px',fontFamily:'sans-serif'}}><i class="fa-solid fa-plus me-3"></i>Registered Users</h5>
            <p className='text-secondary text-center mt-4'>{usernumber?`${usernumber} users`:'no users'}</p>
            </div>
            <div className="col-md-4 ms-4 rounded" style={{backgroundColor:'#E5E1DA',width:'300px'}}>
            <h5 className='fw-bold mt-4' style={{fontSize:'20px',fontFamily:'sans-serif'}}><i class="fa-solid fa-plus me-3"></i>Uploaded Recipes</h5>
            <p className='text-secondary text-center mt-4'>{recipecount?`${recipecount} recipes`:'no recipes uploaded'}</p>
            </div>
            <div className="col-md-4 ms-4 rounded" style={{backgroundColor:'#F3D7CA',width:'320px'}}>
            <h5 className='fw-bold mt-4' style={{fontSize:'20px',fontFamily:'sans-serif'}}><i class="fa-regular fa-comment-dots me-3"></i>Messages</h5>
            <p className='text-secondary text-center mt-4'>No messages</p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Dashboard
