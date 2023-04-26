import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    
    const navigate = useNavigate();
    
    const [showPassword, setPassword] = useState(false);

    function CreateUserNav(){
        navigate("/create_user");
    }

    function handlePasswordVisibility(){
        setPassword(!showPassword);
    }

    return (
        <>
            <div className="container-sm">
                <form>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label required">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label required">Password</label>
                        <input type={showPassword?"text":"password"} className="form-control" id="exampleInputPassword1"/>
                        <input type="checkbox" className="password-checkbox" onChange={handlePasswordVisibility}/>
                        <label className="label-password">Show Password</label>
                    </div>
                    <center><div className="mb-3 form-check">
                        <u className='create-account-label' onClick={CreateUserNav}>Create new account</u>
                    </div>
                    <button type="button" className="btn btn-primary">Submit</button></center>
                </form>
            </div>
        </>
    );
}


export default Login;