import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ProtectedRoute(props) {

    const navigate = useNavigate();

    const { Component } = props;

    useEffect(()=>{
        
        let token = localStorage.getItem("token");

        if(!token){
            navigate("/login");
        }
    
    });
    
    
    return (
        <Component />
    );

}

export default ProtectedRoute;