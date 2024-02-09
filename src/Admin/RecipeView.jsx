import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { deleteadminrecipes, delteapproved, getapprovedrecipesapi } from '../Backend/Apicalls'
import { base_url } from '../Backend/Base-url'

function RecipeView() {
 
  const[allrecipes,setallrecipes]=useState([])

  const allapprovedrecipes=async()=>
  {
    const result=await getapprovedrecipesapi()
    setallrecipes(result.data)
  }

  const handleDelete=async(id)=>
 {
  const token=sessionStorage.getItem("admintoken")
  const reqheader={
    "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`
  }
  const result=await delteapproved(id,reqheader)
  console.log(result);

  if(result.status===200)
  {
    allapprovedrecipes()
  }
  else
  {
    alert(result.response.data)
  }
 }

  useEffect(()=>
  {
    allapprovedrecipes()
  },[])

  return (
    <div className='d-flex'> 
          <div><Sidebar/></div>
    <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4 p-5'>
      {allrecipes?.length>0?
      allrecipes.map((recipes)=>( 
        <div className="col">
        <div className="card" style={{ width: '10rem',height:'350px' }}>
          <img
            src={`${base_url}/fileuploads/${recipes.recipeimg}`}
            className="card-img-top"
            alt="Banh Mi"
            style={{ width: '100%',objectFit: 'cover' ,height:'200px'}}
          />
          <div className="card-body">
            <h5 className="card-title" style={{fontSize:'15px'}}>{recipes.title}</h5>
            <p style={{fontSize:'10px'}}>{recipes.username}</p>
          </div>
          <div className='card-body d-flex justify-content-between'>
            <p style={{fontSize:'10px'}}>{recipes.time}</p>
            <i class="fa-solid fa-trash text-danger" onClick={()=>handleDelete(recipes._id)}></i>
          </div>
        </div>
      </div>))
     :<p>nothing</p>}

      {/* Repeat the above structure for other cards */}
    </div>
    </div>
  )
}

export default RecipeView
