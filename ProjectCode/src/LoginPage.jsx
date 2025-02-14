import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase'; // Import the auth object
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import the Firebase auth method
import styles from './LoginPage.module.css';
import login from './assets/login.jpg';  
import login1 from './assets/login1.jpg'; 


function Login({ onLogin }) {
    const navigate = useNavigate();
    const [Username, setUsername] = useState({ value: '', isTouched: false });
    const [Password, setPassword] = useState({ value: '', isTouched: false });
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({}); // To track field-specific errors

    const [showForm, setShowForm] = useState(false); 
    

    // Validate individual fields
    const validateField = (field, value) => {
        let error = '';
        switch (field) {
            case 'Username':
                if (!value) error = 'Username is required';
                break;
            case 'Password':
                if (!value) error = 'Password is required';
                break;
            default:
                break;
        }
        return error;
    };

    // Handle field blur
    const handleBlur = (field, value) => {
        const error = validateField(field, value);
        setFormErrors((prevErrors) => ({ ...prevErrors, [field]: error }));

        // Set isTouched to true
        if (field === 'Username') {
            setUsername((prev) => ({ ...prev, isTouched: true }));
        } else if (field === 'Password') {
            setPassword((prev) => ({ ...prev, isTouched: true }));
        }
    };

    // Form validation logic
    const Formvalid = () => {
        return Username.value && Password.value;
    };

    // Handle login form submission
    const handleLogin = async (event) => {
        event.preventDefault();
        const usernameError = validateField('Username', Username.value);
        const passwordError = validateField('Password', Password.value);

        if (usernameError || passwordError) {
            setFormErrors({
                Username: usernameError,
                Password: passwordError,
            });
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, Username.value, Password.value);
            onLogin();
            navigate('/item-categories'); // Navigate to item categories on successful login
        } catch (error) {
            setError(error.message); // Capture any errors
        }
    };

    const handleCreateAccountClick = (event) => {
        event.preventDefault();
        navigate('/create-account');
    };

    const handleForgotPassword = (event) => {
        event.preventDefault();
        navigate('/forgot-password'); // Navigate to the forgot password page
    };

    const handleGetStarted = () => {
        setShowForm(true);
        document.querySelector('.App'); // Add 'darken' class to the App div
      };

    return (
        
        // <div className={styles.App} style={{ backgroundImage: `url(${login})` }}>
             <div className={`${styles.App} ${showForm ? styles.darkBackground : ''}`} style={{ backgroundImage: `url(${login1})` }}>

{!showForm ? (
                <div className={styles.getStartedContainer}>
                    <button 
                        className={styles.getStartedButton} 
                        onClick={handleGetStarted}
                    >
                        Get Started
                    </button>
                </div>):(
        <div className={styles.App}>
            <form onSubmit={handleLogin}>
                <div className={styles.style1}>
                    <div className={styles.input_group}>
                        <label htmlFor="user_name">Username</label>
                        <input
                            type="email"
                            id="user_name"
                            name="user_name1"
                            placeholder="Enter User Name"
                            value={Username.value}
                            onChange={(e) => setUsername({ ...Username, value: e.target.value })}
                            onBlur={() => handleBlur('Username', Username.value)}
                        />
                        {Username.isTouched && formErrors.Username && (
                            <p className="FieldError">{formErrors.Username}</p>
                        )}
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password_1"
                            placeholder="Enter Password"
                            value={Password.value}
                            onChange={(e) => setPassword({ ...Password, value: e.target.value })}
                            onBlur={() => handleBlur('Password', Password.value)} 
                        />
                        {Password.isTouched && formErrors.Password && (
                            <p className="FieldError">{formErrors.Password}</p>
                        )}
                    </div>
                    {error && <div className={styles.error}>{error}</div>} 
                    <div className={styles.btn_style}>
                        <button type="submit" disabled={!Formvalid()}>
                            Login
                        </button>
                    </div>
                    <div className={styles.btn_style}>
                        <button onClick={handleCreateAccountClick}>Create Account</button>
                    </div>
                    <div className={styles.btn_style}>
                        <button onClick={handleForgotPassword}>Forgot Password?</button>
                    </div>
                </div>
            </form>
        </div>
                )}</div>
    );

    
}


Login.propTypes = {
    onLogin: PropTypes.func.isRequired, 
};


export default Login;





































// import { useState } from 'react';
// import styles from './LoginPage.module.css';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//     const navigate = useNavigate();
//     const handleCreateAccountClick = (event) => {
//     event.preventDefault(); 
//     navigate('/create-account');
//     };
//     const handleitemcategories=(event)=>{
//       event.preventDefault(); 
//       navigate('/item-categories')
//     }
//     const[Username,setUsername]=useState('')
//     const[Password,setPassword]=useState('')

//     const Formvalid=()=>{
//       return(
//         Username && Password
//       )

//     }

//   return (
//     <div className={styles.App}>
//       <form onSubmit={handleitemcategories}>
//       <div className={styles.style1}>
//       <div className={styles.input_group}>
//         <label htmlFor="user_name">Username</label>
//         <input type="text" id="user_name" name="user_name1" placeholder='Enter User Name' value={Username} onChange={(e)=>{setUsername(e.target.value)}} ></input>
//       </div>
//       <div className={styles.input_group}> 
//         <label htmlFor="password">Password</label>
//         <input type="password" id="password" name="password_1" placeholder='Enter Password' value={Password} onChange={(e)=>{setPassword(e.target.value)} }></input>
//       </div>
//       <div className={styles.btn_style}>
//         <button type="submit"  disabled={!Formvalid()}>Login</button>
//       </div>
//       <div className={styles.btn_style}>
//         <button onClick={handleCreateAccountClick}>Create Account</button>
//       </div>
//       </div>
//       </form>

//     </div>
  
//   );
// }
// export default Login;


