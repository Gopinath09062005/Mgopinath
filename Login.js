import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Login = () => {
  const navigate = useNavigate();

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const matchedUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!matchedUser) {
    alert('Invalid email or password');
    return;
  }

  alert('Login Successful');
  navigate('/dashboard');
};

  return (
    <div className="container">
      <div className="login form">
        <header>Login</header>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} required/>
          <div className="password-container">
            <input type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          {/* Forgot Password Link */}
          <div className="forgot-password">
            <a id='forgot' href="">Forgot password?</a>
          </div>
          <button className='btn' type='submit'>Login</button>
        </form>
        <div className="signup">
          Don't have an account? <label onClick={() => {navigate('/signup'); }}>Signup</label>
          {/* Don't have an account?<Link to={'/signup'}>signup</Link> */}
        </div>
      </div>
    </div>
  )
}

export default Login;

// import axios from 'axios';
// import React from 'react';

// const User = () => {
//   // Start with a single object, not an array
//   const [user, setUser] = React.useState({
//     uname: "",
//     email: "",
//     password: ""
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:1234/Login', user);
//       console.log(response.data);
//       alert("User created successfully");
//       setUser(response.data); // Save returned user (with id)
//     } catch (error) {
//       console.error("There was an error creating the user!", error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           name="uname"
//           value={user.uname}
//           onChange={handleChange}
//         />
//         <br/>

//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={user.email}
//           onChange={handleChange}
//         />
//         <br/>

//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           value={user.password}
//           onChange={handleChange}
//         />
//         <br/>

//         <input type="submit" value="Submit" />
//       </form>

//       {/* Display user after submission */}
//       {user.id && (
//         <div>
//           <h3>{user.uname}</h3>
//           <p>{user.email}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default User;