import React from 'react'
import'./About.css'
function About() {
  
  return (
   <div className='background'>
        <div className='row mt-5'>
          <div className="review-container mt-5 p-3 ms-5 mb-5 message-icon">
          <div className="photo-container mt-5">
            <img className="user-photo" src="https://www.shutterstock.com/image-photo/head-shot-portrait-dissatisfied-man-600nw-1419352847.jpg" alt='' />
          </div>
          <div className="review-content p-3">
            <div className="user-info mt-5">
              <h4>Frederick</h4>      
                </div>
            <p className="user-review">"Fantastic recipe app! The ability to customize serving sizes is a game-changer for a solo cook like me"</p>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="star">&#9733;</span>
                  ))}
          </div>
        </div>
        </div>
      <div className="review-container p-3 mb-5" style={{marginLeft:'600px'}}>
        <div className="photo-container p-2 mt-5">
          <img className="user-photo" src="https://images.unsplash.com/profile-1577443846130-99fa0af43fdfimage?bg=fff&crop=faces&h=150&w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt='' />
        </div>
        <div className="review-content ">
          <div className="user-info mt-5">
            <h3>Isabella</h3>      
              </div>
          <p className="user-review">"This app is a culinary treasure trove! The variety of recipes ensures there's something for every mood and occasion"</p>
                {[1, 2, 3, 4].map((star) => (
                  <span key={star} className="star">&#9733;</span>
                ))}
        </div>
      </div>
      <div className="join-community-container mx-auto">
        <div className="subscribe-form d-flex justify-content-center align-items-center p-5 text-center">
            <h2 className='me-5 mb-2'>Want more deliciousness?</h2>
            <h6 className='me-5 mt-2'>Subscribe here and we’ll send you an email as new recipes are published</h6>
          <input type="email" placeholder="Enter your email" className="form-control email-input w-50 mb-2" />
          <button className="btn subscribe-button mb-2">Subscribe</button>
        </div>
      </div>
   </div>
  )
}

export default About
