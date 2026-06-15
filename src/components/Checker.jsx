

import React, { useEffect, useState } from 'react'
import { handleError, handleSuccess } from "../util";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoutButton from './LogoutButton';

const Checker = () => {
  const [product, setProduct] = useState([]); 

  const fetchproducts = async () => {
    try {
      const url = 'http://localhost:8080/products/getproducts';
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem('token'),
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
      setProduct(result);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchproducts();
  }, []);

  return (
    <div>
      checker
      <div>
        {product.length > 0 ? (
          product.map((item, index) => (
            <ul key={index}>
              <li>{item.name}{item.price}</li>
            </ul>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
      <LogoutButton/>
      <ToastContainer />
    </div>
  );
};

export default Checker;
