import React, { useEffect, useState } from 'react';

const API = 'https://dummyjson.com/products';

function Sec() {
    const [Products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productsName, setProductsName] = useState("");
    const [cart, setCart] = useState([]);

    const fetchData = async (url) => {
        try {
            const res = await fetch(url);
            const result = await res.json();
            if (result.products) {
                setProducts(result.products);
                setFilteredProducts(result.products);
            }
            console.log(result);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchData(API);
    }, []);

    useEffect(() => {
        const filtered = Products.filter(product =>
            product.title.toLowerCase().includes(productsName.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [productsName, Products]);

    // Function to handle adding items to the cart
    const addToCart = (product) => {
        setCart(prevCart => [...prevCart, product]);
        alert(`${product.title} has been added to your cart.`);
    };

    // Function to handle removing items from the cart
    const removeFromCart = (product) => {
        setCart(prevCart => prevCart.filter(item => item.id !== product.id));
        alert(`${product.title} has been removed from your cart.`);
    };

    // Calculate total amount
    const totalAmount = cart.reduce((total, item) => total + item.price, 0);

    // Handle Checkout
    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            const itemList = cart.map(item => item.title);
            alert(`Proceeding to checkout with items: ${itemList}`);
        }
    };

    return (
        <div className='grid'>
            <div className='srch'>
                <input
                    onChange={(e) => setProductsName(e.target.value)}
                    value={productsName}
                    type='text'
                    placeholder=  ' 🔍Search Any Product Here....'
                />
            </div>
            <div className='crt'>
                <h2>Cart Items:</h2>
                {cart.length > 0 ? (
                    <>
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <p>{item.title}</p>
                                <button className="remove-button" onClick={() => removeFromCart(item)}>Remove</button>
                            </div>
                        ))}
                        <h3>Total Amount: ${totalAmount.toFixed(2)}</h3> {/* Display total amount */}
                        <button className="checkout-button" onClick={handleCheckout}>Checkout</button> {/* Checkout button */}
                    </>
                ) : (
                    <p>No items in cart.</p>
                )}
            </div>

            {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                    <div key={item.id} className='card'>
                        <h2><b>Title</b>: {item.title}</h2>
                        <p><b>Description</b>: {item.description}</p>
                        <p><b>Category</b>: {item.category}</p>
                        <p><b>Price: $</b>{item.price}</p>
                        <img src={item.thumbnail} alt={item.title} />
                        <button onClick={() => addToCart(item)}>Add to Cart</button> {/* Add to Cart button */}
                    </div>
                    
                ))
            ) : (
                <p className='prd'>No Products found.</p>
            )}
          
        </div>
    );
}

export default Sec;         