import React, { useEffect, useState } from 'react';
import './Latest.css';
import { getapprovedrecipesapi } from '../Backend/Apicalls';
import { base_url } from '../Backend/Base-url';

function Latest() {
  // const[username,setusername]=useState("")
  // useEffect(()=>
  // {
  //   setusername(JSON.parse(sessionStorage.getItem("alreadyuser"))?.username)
  // },[])
  const[recipes,setrecipes]=useState([])

  const allrecipes=async()=>
  {
    const result=await getapprovedrecipesapi()
    setrecipes(result.data)
  }
console.log(recipes);

useEffect(()=>
{
  allrecipes()
})

  return (
    <div>
      <div className='latest'>
        <div className='row'>
          <h2 className='ms-5 mt-4'>Your Recipes,<br />Our Community</h2>
        </div>
        
        <div className='row d-flex justify-content-center align-items-center'>
          <div className='row d-flex mt-5 justify-content-center align-items-center mb-5'>
            <div className="col-md-6 mb-4 p-5">
                <h4>"Cook, Capture, Share"</h4>
                <p className='mt-4'>Discover a world of delicious possibilities with our recipe-sharing app. Spice up your kitchen, connect with fellow food enthusiasts, and turn every meal into a masterpiece... </p>
            </div>
            <div className="col-md-6">
              <img src="https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" width={'480px'} height={'300px'} className='mt-5 rounded shadow'/>
            </div>
          </div>
          <hr />
          <div className='row d-flex justify-content-center align-items-center p-5'>
           
            <div className="col-md-6">
              <img src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" width={'480px'} height={'300px'} className='rounded shadow'/>
            </div>
            <div className="col-md-6 mb-4">
                <h4>"Taste the Love, Share the Recipe."</h4>
                <p className='mt-4'>Unleash your inner chef with us, where every dish is a story waiting to be told. From kitchen secrets to savory delights, join our culinary community and savor the joy of sharing flavors!! </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* trending from us */}
      <div className='trending'>
  <div className='row p-5'>
  <h2 className='text-center mb-4 fw-bold' style={{fontSize:'60px',fontFamily:'initial'}}>Latest from us</h2>
      {recipes?.length>0 && (<div className="col-md-6 p-3" style={{position:'relative'}}>
        <div className='image-container'>
          <img
            src={`${base_url}/fileuploads/${recipes[0].recipeimg}`}
            className="w-100 rounded-4 zoom-image" style={{height:'530px'}}
            alt=""
          />
        </div>
        <div className="image-caption p-3" style={{top: '70%',left:'20%'}}>
            <p className='text-light fs-2'>{recipes[0].title}</p>
        </div>
      </div>)}
      <div className="col-md-6 p-3">
        <div className="row mb-3" >
          {recipes?.length>1 && (<div className="col-md-8" style={{position:'relative'}}>
            <div className='image-container'>
              <img
                src={`${base_url}/fileuploads/${recipes[4].recipeimg}`}
                className="w-100 rounded-4  zoom-image" style={{height:'250px'}}
                alt=""
              />
            </div>
            <div className="image-caption p-4" style={{top: '50%',left:'20%'}}>
              <p className='text-light fs-4'>{recipes[4].title}</p>
            </div>
          </div>)}
         {recipes?.length>2 && (<div className="col-md-4" style={{position:'relative'}}>
            <div className='image-container'>
              <img
                src={`${base_url}/fileuploads/${recipes[2].recipeimg}`}
                className="w-100 rounded-4 h-100 zoom-image"
                alt=""
              />
            </div>
            <div className="image-caption p-2" style={{top: '60%',left:'20%'}}>
            <p className='text-light fs-5'>{recipes[2].title}</p>
           </div>
          </div>) }
        </div>
        <div className="row">
         {recipes?.length>3 && (<div className="col-md-4" style={{position:'relative'}}>
            <div className='image-container'>
              <img
                src={`${base_url}/fileuploads/${recipes[1].recipeimg}`}
                className="w-100 rounded-4 h-100 zoom-image"
                alt=""
              />
            </div>
            <div className="image-caption p-2" style={{top: '60%',left:'20%'}}>
            <p className='text-light fs-5'>{recipes[1].title}</p>
           </div>
          </div>)}
          {recipes?.length>4 && (<div className="col-md-8" style={{position:'relative'}}>
           <div className='image-container'>
              <img
                src={`${base_url}/fileuploads/${recipes[3].recipeimg}`}
                className="w-100 rounded-4 h-100 zoom-image"
                alt=""
              />
           </div>
            <div className="image-caption p-4" style={{top: '60%',left:'30%'}}>
            <p className='text-dark fs-4'>{recipes[3].title}</p>
         </div>
          </div>) }
        </div>
      </div>
  </div>
</div>


    </div>
  );
}

export default Latest;
