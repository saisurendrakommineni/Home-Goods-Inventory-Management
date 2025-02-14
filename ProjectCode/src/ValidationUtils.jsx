export const isPasswordStrong = (password) => {
    const passwordConditions = {
        length: password.length >= 8, // At least 8 characters
        uppercase: /[A-Z]/.test(password), // Contains at least one uppercase letter
        lowercase: /[a-z]/.test(password), // Contains at least one lowercase letter
        number: /\d/.test(password), // Contains at least one number
    };

    // Check if all conditions are met
    return passwordConditions.length && passwordConditions.uppercase && passwordConditions.lowercase && passwordConditions.number;
};
