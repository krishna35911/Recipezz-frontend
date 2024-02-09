import React, { useEffect, useState } from 'react'
import './userdashboard.css'
import { getsavedrecipes, getuserrecipesapi } from '../Backend/Apicalls'
import { base_url } from '../Backend/Base-url'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'

function Saved() {
    const [username, setusername] = useState('');
  const [token, settoken] = useState('');
  const [recipes, setrecipes] = useState([]);
  const [userid, setuserid] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [show, setshow] = useState(false);


  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      settoken(sessionStorage.getItem('token'));
      setusername(JSON.parse(sessionStorage.getItem('alreadyuser'))?.username);
      setuserid(JSON.parse(sessionStorage.getItem('alreadyuser'))._id);
    }
  }, []);

  useEffect(() => {
    const getsaved = async () => {
      if (token) {
        const reqheader = {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        };

        try {
          const res = await getsavedrecipes(userid, reqheader);
          console.log(res);

          if (res.status === 200) {
            setrecipes(res.data);
          } else {
            console.log(res.response.data);
          }
        } catch (error) {
          console.error('Error fetching user recipes:', error);
        }
      }
    };

    getsaved();
  }, [userid, token]);

  const handleShow = (recipe) => {
    setSelectedRecipe(recipe);
    setshow(true);
  };
  const handleClose = () => {
    setshow(false);
    setSelectedRecipe(null);
  };

  return (
   <div>
            <div className='d-flex justify-content-between'>
                <h2 className='fw-bold  text-center mt-5 ms-5' style={{fontSize:'40px'}}>Saved Recipes</h2>
                <Link to={'/userdashboard'}><button className='btn btn-success mt-5 me-5'>Back to home</button></Link>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 p-5">
        {recipes?.length > 0 ? (
          recipes.map((item) => (
            <div className="col" key={item._id}>
              <div className="recipe-item">
                <div className="img-container">
                  <img
                    src={`${base_url}/fileuploads/${item.recipeimg}`}
                    className="recipe-img"
                    alt="Recipe Image"
                  />
                </div>
                <div className="info-container">
                  <h5 className="recipe-title">{item.title}</h5>
                  <p className="recipe-author">By {item.username}</p>
                  <p className="recipe-time">{item.time}</p>
                </div>
                <button
                  className="btn btn-success"
                  onClick={() => handleShow(item)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nothing uploaded</p>
        )}
      </div>
      {selectedRecipe && (
         <Modal
         show={show} onHide={handleClose}  size='lg' 
         
       >
         <Modal.Header closeButton>
           <Modal.Title className='mx-auto'>
             <h2 className='fw-bold' style={{fontSize:'60px'}}>{selectedRecipe?.title}</h2> </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <div className="row d-flex justify-content-center align-items-center">
             <div className="col-md-6 ">
               <img src={`${base_url}/fileuploads/${selectedRecipe?.recipeimg}`} width={'100%'} height={'400px'} alt="" />
             </div>
             <div className="col-md-6 d-flex flex-column" >
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
 </Modal.Footer>
       </Modal>
      )}
      </div>

  )
}

export default Saved
