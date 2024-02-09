import React from 'react'
import './Footer.css'
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBCol,
  MDBRow,
  MDBRipple,
  MDBBtn
} from 'mdb-react-ui-kit';
function Footer() {
  return (
   <>
      <footer className="footer">
      <div className="footer-content mt-3">
        <div className="footer-section about">
          <h4>About Us</h4>
          <p className='mt-4' style={{color:'white',fontSize:'14px',lineHeight:'24px'}}>Welcome to Recipez, the ultimate platform for sharing and discovering delicious recipes! Recipez brings food enthusiasts together in a vibrant community to exchange, explore, and celebrate the joy of cooking.</p>
        </div>
  
        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <div className="contact-info mt-4">
            <p style={{color:'white',fontSize:'14px'}}><i class="fa-solid fa-envelope me-2"></i>Phone: +1 (555) 123-4567</p>
            <p style={{color:'white',fontSize:'14px'}}><i class="fa-solid fa-phone me-2"></i>Email: info@example.com</p>
          </div>
        </div>
  
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul className='mt-4'>
            <li ><a href="#" style={{color:'white',fontSize:'14px',textDecoration:'none'}}>Home</a></li>
            <li><a href="#" style={{color:'white',fontSize:'14px',textDecoration:'none'}}>Explore Recipes</a></li>
            <li><a href="#" style={{color:'white',fontSize:'14px',textDecoration:'none'}}>Share with us</a></li>
            <li><a href="#" style={{color:'white',fontSize:'14px',textDecoration:'none'}}>FAQs</a></li>
          </ul>
        </div>
      </div>
      </footer>
  
      <MDBFooter className='text-center text-white' style={{ backgroundColor: '#f1f1f1' }}>
          <MDBContainer>
            <section className='p-2'>
              <MDBBtn
                rippleColor="dark"
                color='link'
                floating
                size="lg"
                className='text-dark m-1'
                href='#!'
                role='button'
              >
                <MDBIcon fab className='fab fa-facebook-f' />
              </MDBBtn>
    
              <MDBBtn
                rippleColor="dark"
                color='link'
                floating
                size="lg"
                className='text-dark m-1'
                href='#!'
                role='button'
              >
                <MDBIcon fab className='fa-twitter' />
              </MDBBtn>
    
              <MDBBtn
                rippleColor="dark"
                color='link'
                floating
                size="lg"
                className='text-dark m-1'
                href='#!'
                role='button'
              >
                <MDBIcon fab className='fa-google' />
              </MDBBtn>
    
              <MDBBtn
                rippleColor="dark"
                color='link'
                floating
                size="lg"
                className='text-dark m-1'
                href='#!'
                role='button'
              >
                <MDBIcon fab className='fa-instagram' />
              </MDBBtn>
    
              <MDBBtn
                rippleColor="dark"
                color='link'
                floating
                size="lg"
                className='text-dark m-1'
                href='#!'
                role='button'
              >
                <MDBIcon fab className='fa-linkedin' />
              </MDBBtn>
    
              <MDBBtn
                rippleColor="dark"
                color='link'
                floating
                size="lg"
                className='text-dark m-1'
                href='#!'
                role='button'
              >
                <MDBIcon fab className='fa-github' />
              </MDBBtn>
            </section>
          </MDBContainer>
    
          <div className='text-center text-light p-3' style={{ backgroundColor: 'black' }}>
            © 2024 Copyright:
            <a className='text-light' href='https://mdbootstrap.com/'>
              Recipezz.com
            </a>
          </div>
        </MDBFooter>
   </>


  )
}

export default Footer
