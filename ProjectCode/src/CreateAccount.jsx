import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function CreateAccount() {
    const navigate = useNavigate();
    const [Firstname, setFirstName] = useState('');
    const [Lastname, setLastName] = useState('');
    const [Email, setEmail] = useState({ value: '', isTouched: false });
    const [Password, setPassword] = useState({ value: '', isTouched: false });
    const [Repassword, setRepassword] = useState('');
    const [formErrors, setFormErrors] = useState({}); // Track form errors
    const [error, setError] = useState('');

    // Email validation regex for Gmail and GVSU emails
    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|mail\.gvsu\.edu)$/;
        return emailRegex.test(email);
    };

    // Password strength validation
    const isPasswordStrong = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            return `Password should be at least ${minLength} characters long`;
        }
        if (!hasUpperCase) {
            return "Password should contain at least one uppercase letter";
        }
        if (!hasNumber) {
            return "Password should contain at least one number";
        }
        if (!hasSpecialChar) {
            return "Password should contain at least one special character";
        }
        return null;
    };

    // Validate form fields
    const validateField = (field, value) => {
        let error = '';
        switch (field) {
            case 'Firstname':
                if (!value) error = 'First name is required';
                break;
            case 'Lastname':
                if (!value) error = 'Last name is required';
                break;
            case 'Email':
                if (!value || !isValidEmail(value)) error = 'Enter a valid Mail';
                break;
            case 'Password':
                error = isPasswordStrong(value);
                break;
            case 'Repassword':
                if (value !== Password.value) error = 'Passwords do not match';
                break;
            default:
                break;
        }
        return error;
    };

    const handleBlur = (field, value) => {
        const error = validateField(field, value);
        setFormErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    };

    const validateForm = () => {
        const errors = {
            Firstname: validateField('Firstname', Firstname),
            Lastname: validateField('Lastname', Lastname),
            Email: validateField('Email', Email.value),
            Password: validateField('Password', Password.value),
            Repassword: validateField('Repassword', Repassword),
        };
        setFormErrors(errors);
        return !Object.values(errors).some((error) => error); // Check if any errors exist
    };

    const handleCreateAccount = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                await createUserWithEmailAndPassword(auth, Email.value, Password.value);
                navigate('/account_success');
            } catch (error) {
                setError(error.message);
            }
        }
    };
        const navigateback=()=>{
            navigate('/')
        }
    return (
        <div className={styles.App}>
            <form onSubmit={handleCreateAccount}>
                <div className={styles.style1}>
                    <div className={styles.input_group}>
                        <label htmlFor="first_name">First Name <sup>*</sup></label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name1"
                            placeholder="Enter First name"
                            value={Firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                            onBlur={() => handleBlur('Firstname', Firstname)}
                        />
                        {formErrors.Firstname && <p className="FieldError">{formErrors.Firstname}</p>}
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="last_name">Last Name <sup>*</sup></label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name1"
                            placeholder="Enter Last name"
                            value={Lastname}
                            onChange={(e) => setLastName(e.target.value)}
                            onBlur={() => handleBlur('Lastname', Lastname)}
                        />
                        {formErrors.Lastname && <p className="FieldError">{formErrors.Lastname}</p>}
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="e_mail">E-mail <sup>*</sup></label>
                        <input
                            type="email"
                            id="e_mail"
                            name="e_mail1"
                            placeholder="Enter Email"
                            value={Email.value}
                            onChange={(e) => setEmail({ ...Email, value: e.target.value })}
                            onBlur={() => handleBlur('Email', Email.value)}
                        />
                        {formErrors.Email && <p className="FieldError">{formErrors.Email}</p>}
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="password">Create Password <sup>*</sup> </label>
                        <input
                            type="password"
                            id="password"
                            name="password1"
                            placeholder="Enter Password"
                            value={Password.value}
                            onChange={(e) => setPassword({ ...Password, value: e.target.value })}
                            onBlur={() => handleBlur('Password', Password.value)}
                        />
                        {formErrors.Password && <p className="FieldError">{formErrors.Password}</p>}
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="repassword">Re - Enter Password <sup>*</sup></label>
                        <input
                            type="password"
                            id="repassword"
                            name="repassword1"
                            placeholder="Re - Enter Password"
                            value={Repassword}
                            onChange={(e) => setRepassword(e.target.value)}
                            onBlur={() => handleBlur('Repassword', Repassword)}
                        />
                        {formErrors.Repassword && <p className="FieldError">{formErrors.Repassword}</p>}
                    </div>

                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.btn_style}>
                        <button type="submit">Create Account</button>
                    </div>
                    <div className={styles.btn_style}>
                        <button onClick={navigateback}>Back</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateAccount;

