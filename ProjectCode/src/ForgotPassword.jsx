import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './ForgotPassword.module.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handlePasswordReset = async (event) => {
        event.preventDefault();
        const auth = getAuth();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent successfully. Please check your inbox.');
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className={styles.App}>
            <h1>Forgot Password</h1>
            <form onSubmit={handlePasswordReset}>
                <div className={styles.input_group}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.btn_style}>
                    <button type="submit">Send Reset Email</button>
                </div>
                {message && <div className={styles.message}>{message}</div>}
            </form>
            <button
                className={styles.back_to_login}
                onClick={() => navigate('/')} // Navigate to login page
            >
                Back to Login
            </button>
        </div>
    );
}

export default ForgotPassword;

