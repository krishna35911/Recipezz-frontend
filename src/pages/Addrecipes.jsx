import React, { useContext, useEffect, useState } from 'react'
import './Addrecipes.css'
import { addrecipesapi } from '../Backend/Apicalls';
import { useNavigate } from 'react-router-dom';
import { addprojectcontext } from '../context/Contextshare';

function Addrecipes() {
  const [steps, setSteps] = useState([{number:1,description:""}]); 
  const[user,setuser]=useState("")
  const navigate=useNavigate()
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
  const[token,settoken]=useState()
  const[img,setimg]=useState("")
  const[adddata,setadddata]=useState({
    recipeimg:"",
    title:"",
    description:"",
    serve:"",
    time:"",
    ingredients:[],
    steps:[]
  })

  const {addcontext,setaddcontext}=useContext(addprojectcontext)

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);

    setadddata({
      ...adddata,
      ingredients: updatedIngredients,
    });
  };

  const handleStepChange = (index, field, value) => {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    setSteps(newSteps);

    // Update adddata state with the latest steps
    setadddata({
      ...adddata,
      steps: newSteps,
    });
  };

  // console.log(adddata);


  const addIngredientBox = () => {
    // Add a new empty ingredient box
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const addStepBox = () => {
    // Add a new empty step box
    setSteps([...steps, { number: steps.length + 1, description: '' }]);
  };

  useEffect(()=>
  {
    if(adddata.recipeimg)
    {
      setimg(URL.createObjectURL(adddata.recipeimg))
    }
  },[adddata.recipeimg])
  
  useEffect(()=>
  {
    if(sessionStorage.getItem("token"))
    {
      settoken(sessionStorage.getItem("token"))
      setuser(JSON.parse(sessionStorage.getItem("alreadyuser"))?.username)
    }
  },[])
  console.log(img);
  console.log(token);

  const handlepublish=async(e)=>
  {
    e.preventDefault()
try {
  const{recipeimg,title,description,serve,time,ingredients,steps}=adddata

    if(!recipeimg || !title || !description || !serve || !time || !ingredients || !steps)
    {
      alert('please fill the form completely');
    }
    else
    {
      const reqbody=new FormData()

      reqbody.append("recipeimg",recipeimg)
      reqbody.append("title",title)
      reqbody.append("description",description)
      reqbody.append("serve",serve)
      reqbody.append("time",time)
      ingredients.forEach((ingredient, index) => {
        reqbody.append(`ingredients[${index}][name]`, ingredient.name);
        reqbody.append(`ingredients[${index}][quantity]`, ingredient.quantity);
        reqbody.append(`ingredients[${index}][unit]`, ingredient.unit);
      });
  
      // Append steps array
      steps.forEach((step, index) => {
        reqbody.append(`steps[${index}][number]`, step.number);
        reqbody.append(`steps[${index}][description]`, step.description);
      });

      if(token)
      {
        const reqheader={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        const res=await addrecipesapi(reqbody,reqheader)
        console.log(res);
        if(res.status===200)
        {
          alert("added")
          setaddcontext(res.data)
          setTimeout(()=>
          {
              navigate('/add-recipes/acknowledgement')
          },1000)
        }
        else
        {
          console.log(res.response.data);
        }
      }
    }  
} catch (error) {
  console.log(error);
}
    
    
  }

  const removeIngredientBox = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  
    // Update adddata state with the latest ingredients
    setadddata({
      ...adddata,
      ingredients: updatedIngredients,
    });
  };
  const removeStepBox = (index) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
  
    // Renumber the remaining steps
    newSteps.forEach((step, i) => {
      step.number = i + 1;
    });
  
    setSteps(newSteps);
  
    // Update adddata state with the latest steps
    setadddata({
      ...adddata,
      steps: newSteps,
    });
  };
 

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
                <button className="btn p-2 text-secondary"><i class="fa-solid fa-magnifying-glass me-2"></i>Search recipes</button>
              </a>
            </li>
          
            <li className="nav-item ms-md-3 ms-lg-3">
              <a className="nav-link active" aria-current="page" href="/userdashboard">
                <button className="btn p-2 text-secondary"><i class="fa-regular fa-user me-2"></i>{user ? `${user}`:'Profile'}</button>
              </a>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
    <div className='p-3 w-75 mx-auto'>

       <label className='d-flex justify-content-center align-items-center flex-column'>
          <input type="file" style={{display:'none'}} onChange={(e)=>setadddata({...adddata,recipeimg:e.target.files[0]})}/>
          <img src={img?img:"https://cdn-icons-png.freepik.com/256/3004/3004613.png?ga=GA1.1.1015531453.1696605683"} style={{width:'200px'}} alt="" />
          <h6 className='mt-3'>Upload your finished dish</h6>
       </label>

       <div style={{backgroundColor:'beige'}} className='p-3 mt-3 rounded shadow'>
            <div className='d-flex justify-content-center align-items-center flex-column'>
              <input type="text" placeholder='Title of your recipe' className='form-control w-75' value={adddata.title} onChange={(e)=>setadddata({...adddata,title:e.target.value})}/>

              <textarea placeholder='Share a little more about your dish' className='form-control w-75 mt-3'  value={adddata.description} onChange={(e)=>setadddata({...adddata,description:e.target.value})}></textarea>
            </div>          
            <div className='row d-flex justify-content-center align-items-center mt-3'>
              <label className="col-2">Serves</label>
              <input type="text" placeholder='2 people' className='form-control w-25 col-3'  value={adddata.serve} onChange={(e)=>setadddata({...adddata,serve:e.target.value})}/>
            </div>
  
            <div className='row d-flex justify-content-center align-items-center mt-3'>
              <label className="col-2">Cooking Time</label>
              <input type="text" placeholder='30 min' className='form-control w-25 col-3'  value={adddata.time} onChange={(e)=>setadddata({...adddata,time:e.target.value})} />
            </div>

            <div className='rounded bg-light w-75 mx-auto mt-3 p-4'>
                <h5 className='fw-bold'>Ingredients</h5>
                {ingredients.map((ingredient, index) => (
            <div key={index} className='d-flex justify-content-center align-items-center mt-3'>
              <i className="fa-solid fa-bars me-3"></i>
              <input
                type="text"
                placeholder='Ingredient Name'
                className='form-control'
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              />
              <input
                type="text"
                placeholder='Quantity'
                className='form-control mx-2'
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
              />
              <input
                type="text"
                placeholder='Unit'
                className='form-control'
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
              />
              <i className="fa-solid fa-ellipsis ms-3" onClick={() => removeIngredientBox(index)}></i>
            </div>
          ))}
                <div className='d-flex justify-content-center align-items-center mt-5'>
                   <button className='btn' onClick={addIngredientBox}/><i class="fa-solid fa-plus me-2"></i> Ingredient
                </div>
            </div>

            <div className='rounded bg-light w-75 mx-auto mt-3 p-4'>
      <h5 className='fw-bold'>Preparation</h5>

      {steps.map((step, index) => (
            <div key={index} className={`mt-4 step fade-in`}>
              <p className='' style={{ fontSize: '15px' }}>Step {index + 1}</p>
              <div className='d-flex justify-content-center align-items-center'>
                <input
                  type="number"
                  placeholder='Step Number'
                  className='form-control'
                  value={step.number}
                  onChange={(e) => handleStepChange(index, 'number', e.target.value)}
                />
                <textarea
                  rows="3"
                  placeholder='Step Description'
                  className='form-control ms-2'
                  value={step.description}
                  onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                />
                <i className="fa-solid fa-ellipsis ms-3" onClick={() => removeStepBox(index)}></i>
              </div>
            </div>
          ))}
            <div className='d-flex justify-content-center align-items-center mt-3'>
            <button className='btn' onClick={addStepBox}>
              <i className="fa-solid fa-plus me-2" ></i> Add Step
            </button>
          </div>
    </div>
    <div className='d-flex justify-content-center align-items-center mt-4 mb-4'><button className='btn btn-warning w-25' type='button' onClick={handlepublish}>Publish</button></div>
       </div>
      </div>
    </>
  )
}

export default Addrecipes
