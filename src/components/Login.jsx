import React, { useState } from 'react'
import { adminloginapi, loginapi, registerapi } from '../Backend/Apicalls';
import { useNavigate } from 'react-router-dom';

function Login({register}) {

    const [userdata,setuserdata]=useState({
        username:"",
        email:"",
        password:""
    })
console.log(userdata);
const navi=useNavigate()

    const handleregister=async(e)=>
    {
        e.preventDefault()
        const{username,email,password}=userdata

        if(!username || !email || !password)
        {
            alert('Fill completely')
        }
        else
        {
            const result=await registerapi(userdata)

            if(result.status==200)
            {
                alert('succesfully registered')
                setuserdata({
                    username:"",
                    email:"",
                    password:""
                })
                navi('/login')
            }
            else
            {
                alert(result.response.data)
            }
        }
    }

    const login=async(e)=>
    {
        e.preventDefault()
        const {email,password}=userdata
        if(!email || !password)
        {
            alert('Fill completely')
        }
        else
        {    
            if(email === 'alex@gmail.com')
            {
                try {
                    const admin=await adminloginapi({adminemail:'alex@gmail.com',adminpassword:'Alex1234'})
                    if(admin.status ===200)
                    {

                        alert('admin logged in')
                        sessionStorage.setItem('adminuser',JSON.stringify(admin.data.adminuser))
                        sessionStorage.setItem('admintoken',admin.data.admintoken)
                        setuserdata({
                            email:"",
                            password:""
                        })
                        setTimeout(()=>
                        {
                            navi('/adminpage/dashboard')
                        },2000)
                    }
                    else
                    {
                        alert('invalid login')
                    }

                } catch (error) {
                    console.log(error);
                }
            }
            else{
                const res=await loginapi(userdata)
                console.log(res);
    
                if(res.status==200)
                {
                    alert('login successful')
                    sessionStorage.setItem('alreadyuser',JSON.stringify(res.data.alreadyuser))
                    sessionStorage.setItem('token',res.data.token)
    
                    setuserdata({
                        email:"",
                        password:""
                    })
                    setTimeout(()=>
                    {
                        navi('/')
                    },2000)
                }
                else
                {
                    alert(res.response.data)
                }
            }
           
        }
    }


    const registerform=register?true:false

  return (
    <div className='container'>
        <div className="row d-flex justify-content-center align-items-center">
            
            <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
                <h2 className='fw-bold' style={{fontSize:'50px',color:'#910A67',fontFamily:'monospace'}}> 
                {!registerform? 'Account Sign-in':'Create an account'}</h2>
                <form className='w-100'>
                    {registerform &&
                        <div className='mt-5'>
                            <input type="text" value={userdata.username} onChange={(e)=>setuserdata({...userdata,username:e.target.value})} className='form-control' placeholder='Username' /></div>
                    }
                    <div className='mt-5'>
                        <input type="text" className='form-control' value={userdata.email} onChange={(e)=>setuserdata({...userdata,email:e.target.value})} placeholder='Email address' />
                    </div>
                   <div className='mt-5'> 
                        <input type="password" value={userdata.password} onChange={(e)=>setuserdata({...userdata,password:e.target.value})} className='form-control' placeholder='Password' />
                    </div>
                    {registerform? <div className='mt-5 text-center'>
                        <button type='button' onClick={handleregister} className='btn btn-warning w-50'>
                        Sign Up</button></div>
                        :
                        <div className='mt-5 text-center'>
                        <button type='button' onClick={login} className='btn btn-warning w-50'>
                        Sign In</button></div>}
                        
                </form>
                {
                !registerform?
                <div className='mt-5'><p>New user? <a href="/register" style={{textDecoration:'none',color:'#D63484'}}>Sign Up</a></p></div>
                :
                <div className='mt-5'><p>Already a user? <a href="/login" style={{textDecoration:'none',color:'#D63484'}}>Login</a></p></div>
                }
            </div>
            <div className="col-md-6" >
                <img src="https://img.freepik.com/premium-vector/woman-chef-white-clothes-with-food-ingredients_267439-9.jpg?w=740" alt="" style={{width:'600px'}} className=''/>
            </div>
        </div>
    </div>
  )
}

export default Login
