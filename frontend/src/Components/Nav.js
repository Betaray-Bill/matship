import React, { useEffect, useState } from 'react'
import '../Styles/Components/Nav.css'
import logo from '../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { signOut } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function Nav() {
    const {currentUser} = useSelector(state => state.user)

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [yea, setYes] = useState(false)
    let location = useLocation();

    useEffect(() =>{
        if(location.pathname === "/login" || location.pathname === "/register"){
            console.log("object")
            setYes(true)
        }else{
            setYes(false)
        }
    }, [location])

    const signout= async () => {
        try {
            await fetch('/api/user/signout');
            dispatch(signOut())
            navigate("/login")
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className="nav">
        <div className="nav_container">
            <div className="nav_logo">
                <img src={logo} alt="matship logo" />
            </div>

            <div className="nav_content">
                {
                    !yea ? <>
                    <Link>
                        Welcome {
                            currentUser && currentUser.name
                        }
                    </Link>
                    <Link onClick={signout}>
                        Sign Out
                    </Link>
                    </> : ""
                }
            </div>
        </div>
    </div>
  )
}

export default Nav