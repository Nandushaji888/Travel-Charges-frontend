import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [name,setName] =useState('')
  const [age, setAge] = useState('');
  const [message,setMessage] = useState('')
  const baseUrl = "http://localhost:5000/api";

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post( `${baseUrl}/signup`,{age,name}) 
      if(response.status===201){
        console.log(response);
        setMessage(response?.data?.message)
      }
    } catch (error) {
      console.log(error.message);
    }
    console.log('Form submitted:', { name, age });

  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Age</label>
            <input
              id="age"
              name="age"
              type="age"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          {message &&
            <p className='w-full font-bold text-red-600'>{message}</p>
          }
         
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-700"
          >
            Register
          </button>
        </form>
        <h4 className='text-lg'>Book your Metro Ticket <Link to='/create-journey' className='text-blue-700 font-bold' >Click here</Link></h4>
      </div>
    </div>
  );
};

export default RegisterPage;
