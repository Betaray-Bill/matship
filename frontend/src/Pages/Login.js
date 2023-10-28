import React, { useState } from 'react'
import '../Styles/Pages/Login.css'
import Nav from '../Components/Nav'
import { Link, useNavigate } from 'react-router-dom'
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
    const { loading, error } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        email:"",
        password:"",
        companyEntity:""
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const submitHandler = async(e) => {
        e.preventDefault()
        try {
            dispatch(signInStart());
            const res = await fetch('api/user/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data));
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            dispatch(signInFailure(error));
        }
    }
  return (
    <>
        <div className="nav_holder">
            <Nav />
        </div>
        <div className="login">
            <div className="login_container">
                <div className="login_header">
                    <p>Login </p>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <form class="login-form" onSubmit={submitHandler}>
                    <div class="input-floating-label">
                        <input class="input" type="email" value={formData.email}
                            onChange={handleChange}
                            name="email" placeholder="username" />
                        <label for="input"><ion-icon name="mail-outline"></ion-icon> <span>Email</span></label>
                        <span class="focus-bg"></span>
                    </div>
                    <div class="input-floating-label">
                        <input class="input" type="text" value={formData.companyEntity}
                            onChange={handleChange}
                            name="companyEntity" placeholder="username" />
                        <label for="input"><ion-icon name="mail-outline"></ion-icon> <span>Company Entity</span></label>
                        <span class="focus-bg"></span>
                    </div>
                    <div class="input-floating-label">
                        <input class="input" type="password" value={formData.password} 
                            onChange={handleChange}
                            name="password" placeholder="password" />
                        <label for="input"><ion-icon name="key-outline"></ion-icon><span>Password</span></label>
                        <span class="focus-bg"></span>
                    </div>
                    <button disabled={loading} id="submit" class="btn-submit">
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
                <p>Create a new Account? <Link to="/register">Register</Link></p>
            </div>
            <div className="login_img">

            </div>
        </div>
    </>
  )
}

export default Login
