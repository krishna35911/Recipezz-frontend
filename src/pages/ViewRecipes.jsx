import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addtosaved, getapprovedrecipesapi } from '../Backend/Apicalls';
import { base_url } from '../Backend/Base-url';
import { Modal, Button } from 'react-bootstrap';
import './ViewRecipes.css'

function Navbar() {

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [show, setshow] = useState(false);
  const[username,setusername]=useState("")


  const handleClose = () => {
    setshow(false);
    setSelectedRecipe(null);
  };

  const handleShow = (recipe) => {
    setSelectedRecipe(recipe);
    setshow(true);
  };

  const[recipes,setrecipes]=useState([])

  const navigate=useNavigate()

  const allrecipes=async()=>
  {
    const result=await getapprovedrecipesapi()
    setrecipes(result.data)
  }
console.log(recipes);


const handlesaved = async () => {
  try {
    const user = JSON.parse(sessionStorage.getItem("alreadyuser"));
    if (!user || !user._id) {
      // Handle the case where the user is not authenticated
      console.error("User not authenticated");
      return;
    }

    const userId = user._id;
    const recipeId = selectedRecipe._id;

    const token = sessionStorage.getItem("token");
    if (!token) {
      // Handle the case where the authentication token is missing
      console.error("Authentication token missing");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Assuming you don't need to send a request body
    const response = await addtosaved(recipeId, userId, null, headers);

    // Handle the response as needed
    console.log(response);
    alert('Recipe saved')
    // Close the modal after saving the recipe
    handleClose();
  } catch (error) {
    console.error("Error saving recipe:", error);
    // Handle the error as needed (e.g., show an error message to the user)
  }
};


  useEffect(()=>
  {
    setusername(JSON.parse(sessionStorage.getItem("alreadyuser"))?.username)
    allrecipes()
  },[])
  
  return (
  <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light w-100 p-4">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <h2 style={{ fontSize: '60px', fontWeight: 'bold', color: '#D24545', fontFamily: 'cursive' }} className='ms-5'>Recipez</h2>
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
          {/* <form className="d-flex ms-md-5 ms-lg-5 me-md-3 me-lg-5 w-100">
            <input
              className="form-control me-2 flex-grow-1"
              type="search"
              placeholder="What would you like to cook?"
              aria-label="Search"
            />
            <button className="btn btn-outline-danger" type="submit">
              Search
            </button>
          </form> */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
          <li className="nav-item ms-md-3 ms-lg-3">
              <a className="nav-link active" aria-current="page">
{username?<Link to={'/add-recipes'}><button className="btn btn btn-outline-secondary p-2">Create your recipe</button></Link>
:<Link to={'/login'}><button className="btn btn btn-outline-secondary p-2">Create your recipe</button></Link>}              </a>
            </li>
            <li className="nav-item ms-md-3 ms-lg-3">
              <a className="nav-link active" aria-current="page">
{username?<Link to={'/userdashboard'}><button className="btn btn btn-outline-secondary p-2">{username}</button></Link>
:<button className="btn btn btn-outline-secondary p-2">Login</button>}              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    {/* <div className={` text-center ${isHovered ? 'hovered' : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <ul className="nav">
          <li className="nav-item">
            <a className={`nav-link ${isHovered ? 'active' : ''}`} aria-current="true" href="#">
              <h5 className='text-danger'>Recipes</h5>
            </a>
          </li>
        </ul>
      {isHovered && (
          <div className='row d-flex justify-content-center align-items-center w-75 rounded shadow mt-3 p-4'>
           <div className="col-md-3">
            <p>EVERYDAY RECIPES</p>
            <div>
                <p  style={{fontSize:'15px'}}>Easy</p>

                <p  style={{fontSize:'15px'}}>Healthy</p>

                <p style={{fontSize:'15px'}}>Pasta</p>

                <p style={{fontSize:'15px'}}>Quick</p>
            </div>
           </div>
           <div className="col-md-3">
            <p>BY MEAL</p>
            <div>
                <p  style={{fontSize:'15px'}}>Dinner</p>

                <p  style={{fontSize:'15px'}}>Breakfast</p>

                <p style={{fontSize:'15px'}}>Lunch</p>

                <p style={{fontSize:'15px'}}>Drinks</p>
            </div>
           </div>
           <div className="col-md-3">
            <p>BY DIET</p>
            <div>
                <p  style={{fontSize:'15px'}}>Vegetarian</p>

                <p  style={{fontSize:'15px'}}>Vegan</p>

                <p style={{fontSize:'15px'}}>Gluten-Free</p>

                <p style={{fontSize:'15px'}}>Dairy-Free</p>

            </div>
           </div>
           <div className="col-md-3">          
            <p>BY METHOD</p>
            <div>
                <p  style={{fontSize:'15px'}}>Air Fryer</p>

                <p style={{fontSize:'15px'}}>Slow Cooker</p>

                <p style={{fontSize:'15px'}}>BBQ & Grilling</p>

                <p style={{fontSize:'15px'}}>Baking</p>
             
            </div>
           </div>
          </div>
      )}
    </div> */}

    <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 p-5' >
    {recipes?.length > 0 ? (
  recipes.map((item) => (
    <div className="col" >
      <div className="recipe-item">
        <div className="img-container">
          <img
            src={`${base_url}/fileuploads/${item.recipeimg}`}
            className="recipe-img" style={{height:'200px'}}
            alt="Recipe Image"
          />
        </div>
        <div className="info-container">
          <h5 className="recipe-title">{item.title}</h5>
          <p className="recipe-author">By {item.username}</p>
          <p className="recipe-time">{item.time}</p>
        </div>
        <button className='btn btn-success' key={item._id} onClick={() => handleShow(item)}>View recipe</button>
      </div>
    </div>
  ))
) : (
  <p>Nothing uploaded</p>
)}

              <Modal
                show={show} onHide={handleClose}  size='xl' 
                fullscreen
              >
                <Modal.Header closeButton>
                  <Modal.Title className='mx-auto'>
                    <h2 className='fw-bold' style={{fontSize:'60px'}}>{selectedRecipe?.title}</h2> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-6 ">
                      <img src={`${base_url}/fileuploads/${selectedRecipe?.recipeimg}`} width={'100%'} height={'600px'} alt="" />
                    </div>
                    <div className="col-md-6 d-flex flex-column" >
                    <div className='mb-5 d-flex'><h3>Uploaded by <span className='text-primary'>{selectedRecipe?.username}</span></h3></div>
                       <p style={{fontSize:'20px',fontFamily:'serif'}}>{selectedRecipe?.description}</p>
                      <div >
                        <p style={{fontSize:'18px',fontFamily:'serif'}}>Serves : {selectedRecipe?.serve}</p>
                        <p style={{fontSize:'18px',fontFamily:'serif'}}>Time for preparation :  {selectedRecipe?.time}</p>
                      </div>
                      <div>
                          <p style={{fontSize:'20px',fontFamily:'serif',color:'#FE7A36'}}>Ingredients</p>
                          {selectedRecipe?.ingredients.map((items)=>(<p style={{fontSize:'18px',fontFamily:'serif'}}>{items.name} {items.quantity} {items.unit}</p>))}
                        </div>
                      </div>

                     <div className='row mt-4'>
                        
                        <div>
                          <p style={{fontSize:'20px',fontFamily:'serif',color:'#FE7A36'}}>Steps for preparation</p>
                          {selectedRecipe?.steps.map((items)=>(<p style={{fontSize:'18px',fontFamily:'serif'}}>{items.number} {items.description}</p>))}
                        </div>
                     </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-info' onClick={handleClose}>Cancel</Button>
{ username?                   <Button className='btn-success ms-5' onClick={handlesaved}>Save recipe</Button>
:<Link to={"/login"}><Button className='btn-success ms-5'>Save recipe</Button></Link>}                </Modal.Footer>
              </Modal>
  
</div>

  </>
  );
}

export default Navbar;

