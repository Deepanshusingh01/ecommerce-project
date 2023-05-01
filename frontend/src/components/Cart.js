import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

function Cart() {

  const navigate = useNavigate();

  function HomeNav() {
    navigate("/");
  }
  return (
    <>
      <div className="container-lg cart-component">
        <FontAwesomeIcon icon={faCartShopping} size="2xl" className="cart-icon" />
        <p className="cart-description">Your cart items</p>
        <hr />
        <div className="container-md">
          <div className="card">
            <img className="card-img-top" src="winter.jpg" alt="" />
            <div className="card-body">
              <h5 className="card-title">Product 1</h5>
              <p className="card-text text-justify">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <div className="quantity-div">
                <input type="button" className="quantity btn-primary" value="-" />
                <input type="button" className="quantity" value={0} />
                <input type="button" className="quantity btn-primary" value="+" />
              </div>
              <div className='rupees'>
                <h5>Price</h5><span><h5><i>&#8377;</i>1000/-</h5></span>
              </div>
              <button type="button" className="btn btn-primary">Remove Item</button>
            </div>
          </div>
        </div>
        <div className='back-button-div'>
          <button type="button" className='cart-back-button btn btn-primary' onClick={HomeNav}>Back</button>
        </div>
      </div>
    </>
  );
}

export default Cart;