import React from "react";
import './Navbar.css';


function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <i><a className="navbar-brand" href="#">Online Store</a></i>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Winter</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Summer</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i>Categories</i>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Men</a></li>
                                    <li><a className="dropdown-item" href="#">Women</a></li>
                                    <li><a className="dropdown-item" href="#">Kids</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <a href="/login"><button style={{marginLeft:5}} className="btn btn-outline-success" type="button">Login</button></a>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;