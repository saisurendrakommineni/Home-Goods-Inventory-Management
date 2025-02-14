import React from 'react';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';

function Success()
{
    const navigate=useNavigate()
    const navigateback=(event) =>
    {
     event.preventDefault(); 
     navigate('/')   
    }
    return(
    <div className={styles.style2}>
        <h2>Account Created Successfully! Please Return to Login Page.</h2>
        <div className={styles.backbutton_style}>
        <button onClick={navigateback}>Back to Account</button>
    </div>
    </div>
    )
}
export default Success;