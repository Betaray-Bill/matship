import React, { useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import '../Styles/Pages/Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../features/userSlice';

function Register() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
    company:"",
    phoneNumber:0,
  })

  const [confirmPassword, setConfirmPassword] = useState("")

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const submitHandler = async(e) => {
    console.log(formData)
    e.preventDefault()
    if(formData.password !== confirmPassword){
        alert("Password mismatch")
    }else{
        try {
            setLoading(true);
            setError(false);
            const res = await fetch('/api/user/register', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
            setLoading(false);
            if (data.success === false) {
                setError(true);
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/login');
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    }
  }
  
  return (
    <>
        <div className="nav_holder">
            <Nav/>
        </div>
        <div className="register">
            <div className="register_container">
                <div className="register_header">
                    <p>Register</p>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <form class="register-form" onSubmit={submitHandler}>
                    <div className="register_wrapper">
                      <div class="input-floating-label">
                          <input class="input" type="text" 
                              onChange={handleChange}
                              name="name" placeholder="username" />
                          <label for="input"><ion-icon name="person-outline"></ion-icon> <span>Username</span></label>
                          <span class="focus-bg"></span>
                      </div>

                      <div class="input-floating-label">
                          <input class="input" type="email" 
                              onChange={handleChange}
                              name="email" placeholder="username" />
                          <label for="input"><ion-icon name="mail-outline"></ion-icon> <span>Email</span></label>
                          <span class="focus-bg"></span>
                      </div>
                      <div class="input-floating-label">
                          <input class="input" type="text" 
                              onChange={handleChange}
                              name="company" placeholder="username" />
                          <label for="input"><ion-icon name="mail-outline"></ion-icon> <span>Company</span></label>
                          <span class="focus-bg"></span>
                      </div>
                      <div class="input-floating-label">
                          <input class="input" type="Number" 
                              onChange={handleChange}
                              name="phoneNumber" placeholder="username" />
                          <label for="input"><ion-icon name="call-outline"></ion-icon> <span>Phone Number</span></label>
                          <span class="focus-bg"></span>
                      </div>
                      <div class="input-floating-label">
                          <input class="input" type="password" 
                              onChange={handleChange}
                              name="password" placeholder="password" />
                          <label for="input"><ion-icon name="key-outline"></ion-icon><span>Password</span></label>
                          <span class="focus-bg"></span>
                      </div>
                      <div class="input-floating-label">
                          <input class="input" type="password" 
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              name="confirmPassword" placeholder="Confirm Password" />
                          <label for="input"><ion-icon name="key-outline"></ion-icon><span>Confirm Password</span></label>
                          <span class="focus-bg"></span>
                      </div>
                    </div>
                    <button disabled={loading}
                        id="submit" class="btn-submit">
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                </form>
                <p>Already have an Account? <Link to="/login">Login</Link></p>
            </div>
            <div className="register_img">

            </div>
        </div>
    </>
  )
}

export default Register
