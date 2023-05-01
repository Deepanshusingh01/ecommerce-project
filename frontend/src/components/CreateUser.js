import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateUser() {

    function refreshPage() {
        window.location.reload(false);
    }

    const navigate = useNavigate();

    const [showPassword, setPassword] = useState(false);

    function handlePasswordVisibility() {
        setPassword(!showPassword);
    }

    function LoginNav() {
        navigate("/login");
    }

    const [username, setUsername] = useState("");
    const [password, setNewPassword] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");

    const userDetails = {
        name: username,
        email: email,
        phoneNo: mobile,
        password: password
    };

    function handleUsername(event) {
        setUsername(event.target.value);
    }

    function handleEmail(event) {
        setEmail(event.target.value);
    }

    function handleMobile(event) {
        setMobile(event.target.value);
    }

    function handlePassword(event) {
        setNewPassword(event.target.value);
    }

    async function signUp(event) {

        event.preventDefault();
    
        let result = await fetch("http://localhost:8080/user/signup",{
            method:"post",
            body:JSON.stringify(userDetails),
            headers : {
              "Content-Type":"application/json" 
            }
        });

        result  = await result.json();
        
        if(result.userId){
            if(window.confirm("\nThank you for creating account at Online Store!\n\nDo you want to login now?")===true){
                navigate("/login");
            }else{
                refreshPage();
            }
        }else{
            alert(result.mesg);
        }
    
    }


    return (
        <>
            <div className="container-sm">
            <center><h4 style={{color:"rgb(206,103,103)", marginBottom:20}}>Create account</h4></center>
            <hr/>
                <form>
                    <div className="mb-3">
                        <label className="form-label required">Full Name</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" value={username} onChange={handleUsername}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">Email Address</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp" value={email} onChange={handleEmail}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">Mobile</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" value={mobile} onChange={handleMobile}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">Password</label>
                        <input type={showPassword ? "text" : "password"} className="form-control" value={password} onChange={handlePassword}/>
                        <input type="checkbox" className="password-checkbox" onChange={handlePasswordVisibility} />
                        <label className="label-password">Show Password</label>
                    </div>
                    <center><div className="mb-3 form-check">
                        <u className='create-account-label' onClick={LoginNav}>Login account</u>
                    </div>
                        <button type="button" className="btn btn-primary" onClick={signUp}>Create Account</button>
                    </center>
                </form>
            </div>
        </>
    );
}


export default CreateUser;