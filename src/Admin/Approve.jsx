import React, { useContext, useEffect, useState } from 'react';
import { addtoapproveapi, addtorejected, approverecipeapi, deleteadminrecipes, getadminrecipeapi } from '../Backend/Apicalls';
import Sidebar from './Sidebar';
import { base_url } from '../Backend/Base-url';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addprojectcontext, getapprovedcontext } from '../context/Contextshare';


function Approve({onapprove}) {
  const [approve, setApprove] = useState([]);
  const {addcontext,setaddcontext}=useContext(addprojectcontext)
  const {approvedcontext,setapprovedcontext}=useContext(getapprovedcontext)


  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(null);
    setShowAllSteps(false); // Reset the state when closing the modal
  };
    const [showAllSteps, setShowAllSteps] = useState(false);

  
  const handleShow = (item) => {
    if (item.status === 'approved') {
      approverecipes();
    } else {
      setShow(item);
    }
  };


  const getAdmin = async () => {
    const res = await getadminrecipeapi();
    console.log(res.data);
    setApprove(res.data);
  };

  console.log(approve);
  console.log(show)

  const approverecipes = async () => {
    try {
      if (show) {
        const res = await approverecipeapi(show._id);
        console.log(res);
        if (res.status === 200) {
          getAdmin();
          
        } else {
          console.error('Recipe approval failed:', res.data);
        }
        handleClose();
      }
    } catch (error) {
    console.error('Error approving recipe:', error);
    }
  };

  const handleDelete = async (show) => {

    try {
      const result = await deleteadminrecipes(show._id);
      console.log(show._id);
      console.log(result);
  
      if (result.status === 200) {
        getAdmin();
        setapprovedcontext(result.data)
        handleClose(); // Close the modal after successfully deleting the recipe
      } else {
        alert(result.response.data);
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const sendbutton=async(show,e)=>
  {

   try {
    e.preventDefault();
    const res=await addtoapproveapi(show._id)
    console.log(show._id);
    console.log(res);
    if (res.status === 200) {
      handleDelete(show)
    } else {
      console.error('Failed to add to approve list:', res.data);
    }
   } catch (error) {
    console.log(error);
   }
  }

  const reject=async(show,e)=>
  {

   try {
    e.preventDefault();
    const res=await addtorejected(show._id)
    console.log(show._id);
    console.log(res);
    if (res.status === 200) {
       handleClose()
       handleDelete(show)     
    } else {
      console.error('Failed to add to reject list:', res.data);
    }
   } catch (error) {
    console.log(error);
   }
  }

  useEffect(() => {
    getAdmin()
  },[addcontext,approve]);

  return (
    <div className="d-flex">
      <div>
        <Sidebar />
      </div>
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {approve?.length > 0 ? (
            approve.map((item) => (
             <>
                <div className="col mb-4 text-center" style={{width:'18rem'}}>
                  <div className="card h-100" onClick={() => handleShow(item)}>
                    <img
                      src={`${base_url}/fileuploads/${item.recipeimg}`}
                      className="card-img-top" style={{height:'150px'}}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text mt-3" style={{ fontSize: '15px' }}>
                        By {item.username}
                      </p>
                    </div>
                    {item.status === 'approved' ? (
          <div className="card-body text-center">
            <button className='btn btn-success' onClick={(e) => sendbutton(item, e)}>Send</button>
          </div>
        ) : item.status === 'rejected' ? (
          <div className="card-body text-center">
            <p className="text-danger fs-3">Rejected</p>
          </div>
        ) : (
          <>
           
          </>
        )}
                  </div>
                </div>
             </>
              
            ))

            
          ) : (
            <p>Nothing</p>
          )}

            {show && <Modal
                show={!!show} 
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
              >
                <Modal.Header closeButton>
                  <Modal.Title className='d-flex justify-content-between'><h2>{show.title}</h2> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row">
                    <div className="col-md-6 p-2">
                      <img src={`${base_url}/fileuploads/${show.recipeimg}`} width={'90%'} alt="" />
                    </div>
                    <div className="col-md-6 d-flex flex-column " >
                      <div >
                      <h3 className='mt-5'>Uploaded by : {show.username}</h3>
                        <p className='mt-5' style={{fontSize:'18px',fontFamily:'serif'}}>Serves : {show.serve}</p>
                        <p style={{fontSize:'18px',fontFamily:'serif'}} className='mt-3'>Time for preparation :  {show.time}</p>
                      </div>
                      <div>

                      </div>
                      {/* <div>
                        <p style={{fontSize:'20px',fontFamily:'serif',color:'#FE7A36'}}>Steps for preparation</p>
                        {show.steps.map((items)=>(<p style={{fontSize:'18px',fontFamily:'serif'}}>{items.number} {items.description}</p>))}
                      </div> */}
                    </div>
                    <div className='mt-4 p-3'>
                    <p style={{fontSize:'18px',fontFamily:'serif'}}>{show.description}</p>

                    </div>
                    <div className="row">
                    <p style={{fontSize:'20px',fontFamily:'serif',color:'#FE7A36'}}>Ingredients</p>
                      {show.ingredients.map((items, index) => (
                        <div key={items.name} className="col-md-4">
                          <p style={{ fontSize: '18px', fontFamily: 'serif' }}>
                            {items.name} {items.quantity} {items.unit}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="row mt-3">

                    <p style={{fontSize:'20px',fontFamily:'serif',color:'#FE7A36'}}>Steps for preparation</p>
                    {show.steps.slice(0, showAllSteps ? show.steps.length : 2).map((items) => (
                      <p key={items.number} style={{ fontSize: '18px', fontFamily: 'serif' }} className='mb-4'>
                        <span className='rounded-circle bg-success p-2'>{items.number}</span>
                        <span className='ms-3'>{items.description}</span>
                      </p>))}

                      {!showAllSteps && show.steps.length > 5 && (
                        <div className="col-12 text-center mt-3">
                          <Button variant="btn btn-warning" onClick={() => setShowAllSteps(true)}>
                            View More Steps
                          </Button>
                        </div>
                      )}
                    </div>


                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={(e)=>reject(show,e)}>
                    Reject
                  </Button>
                  <Button variant="success" onClick={approverecipes}>Approve Recipe</Button>
                </Modal.Footer>
              </Modal>}

        </div>
      </div>

    </div>
  );
}

export default Approve;
