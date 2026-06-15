// import React, { useState } from "react";
// import axios from "axios";

// const Checker = () => {
//   const [name, setName] = useState("");
//   const [surname, setSurname] = useState("");
//   const [email, setEmail] = useState("");
//   const [country, setCountry] = useState("");

//   const headers = { jkhdj: "*" };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // prevent page reload
//     console.log("done dude");

//     try {
//       const response = await axios.post(
//         "https://68beea609c70953d96ee2d6c.mockapi.io/api/mahakaljym/mahakal-jym",
//         {
//           name,
//           surname,
//           email,
//           country,
//         },
//         { headers } // ✅ pass headers here
//       );
//         setName("");
//       setSurname("");
//       setEmail("");
//       setCountry("");

//       console.log("Response:", response.data);
//       alert("Form submitted successfully!");
      
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div>
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-4"
//       >
//         <div className="flex flex-col">
//           <label
//             htmlFor="firstName"
//             className="mb-1 text-sm font-medium text-gray-700"
//           >
//             First Name
//           </label>
//           <input
//             type="text"
//             id="firstName"
//             name="firstName"
//             placeholder="Enter your first name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             required
//           />
//         </div>

//         <div className="flex flex-col">
//           <label
//             htmlFor="lastName"
//             className="mb-1 text-sm font-medium text-gray-700"
//           >
//             Surname
//           </label>
//           <input
//             type="text"
//             id="lastName"
//             name="lastName"
//             value={surname}
//             onChange={(e) => setSurname(e.target.value)}
//             placeholder="Enter your surname"
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             required
//           />
//         </div>

//         <div className="flex flex-col">
//           <label
//             htmlFor="email"
//             className="mb-1 text-sm font-medium text-gray-700"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             required
//           />
//         </div>

//         <div className="flex flex-col">
//           <label
//             htmlFor="country"
//             className="mb-1 text-sm font-medium text-gray-700"
//           >
//             Country
//           </label>
//           <input
//             type="text"
//             id="country"
//             name="country"
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             placeholder="Enter your country"
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Checker;




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
