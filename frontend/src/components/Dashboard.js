import React, { useState } from 'react';
import './Dashboard.css';
import APIs from '../APIs/APIs';
// import { Context } from '../App';
const products = APIs.products;
console.log(products);


function Dashboard() {

    const [quantity, setQuantity] = useState(1);

    function quantityIncrease() {
        setQuantity(1);
    }

    function quantityDecrease() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    function addToCart() {
        setQuantity(quantity + 1);
    }

    return (
        <>
            {
                products.map((products, index) => {
                    return (
                        <div className="card">
                            <img className="card-img-top" src={products.imgPath} alt="" />
                            <div className="card-body">
                                <h5 className="card-title">{products.name}</h5>
                                <p className="card-text">{products.description}</p>
                                <div className="quantity-div">
                                    <input type="button" className="quantity btn-primary" value="-" onClick={quantityDecrease} />
                                    <input type="button" className="quantity" value={0} />
                                    <input type="button" className="quantity btn-primary" value="+" onClick={quantityIncrease} />
                                </div>
                                <div className='rupees'>
                                    <h5>Price</h5><span><h5><i>&#8377;</i>{products.price}/-</h5></span>
                                </div>
                                <div>
                                    <button className="add-to-cart btn btn-primary" onClick={addToCart}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    );
}

export default Dashboard;