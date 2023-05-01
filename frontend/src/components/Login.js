import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
// import { Context } from '../App';

function Login() {

    // const {setBtnName} = useContext(Context);

    const navigate = useNavigate();

    const [showPassword, setPassword] = useState(false);

    function CreateUserNav() {
        navigate("/create_user");
    }

    function handlePasswordVisibility() {
        setPassword(!showPassword);
    }

    const [email, setEmail] = useState("");
    const [password, setNewPassword] = useState("");

    const userDetails = {
        email: email,
        password: password
    };

    function handleEmail(event) {
        setEmail(event.target.value);
    }

    function handlePassword(event) {
        setNewPassword(event.target.value);
    }

    async function signIn(event) {

        event.preventDefault();

        let result = await fetch("http://localhost:8080/user/signin", {
            method: "post",
            body: JSON.stringify(userDetails),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (result) {
            result = await result.json();
        } else {
            alert("Request not processed!");
            return;
        }

        if (result.accessToken) {
            navigate("/");
        } else {
            alert(result.mesg);
            window.location.reload(false);
        }

    }

    return (
        <>
            <div className="container-sm">
                <center><h4 style={{ color: "rgb(206,103,103)", marginBottom: 20 }}>Login account</h4></center>
                <hr />
                <form>
                    <div className="mb-3">
                        <label className="form-label required">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={handleEmail} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">Password</label>
                        <input type={showPassword ? "text" : "password"} className="form-control" id="exampleInputPassword1" value={password} onChange={handlePassword} />
                        <input type="checkbox" className="password-checkbox" onChange={handlePasswordVisibility} />
                        <label className="label-password">Show Password</label>
                    </div>
                    <center><div className="mb-3 form-check">
                        <u className='create-account-label' onClick={CreateUserNav}>Create new account</u>
                    </div>
                        <button type="button" className="btn btn-primary" onClick={signIn}>Login</button>
                    </center>
                </form>
            </div>
        </>
    );
}


export default Login;