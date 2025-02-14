import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { database } from '../firebase'; // Import Firebase instance
import styles from "./AddItemCategory.module.css";
import { ref, push } from 'firebase/database';
import { useTheme } from "../ThemeContext";





function AddCategory() {
    const navigate = useNavigate();
    const [newCategory, setNewCategory] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false); 
    const { isDarkTheme } = useTheme();
    const textStyle = {
        color: isDarkTheme ? '#f8f8f8' : '#333',  // Use theme colors for text
    };
    const textStyle1 = {
        backgroundColor: isDarkTheme ? '#333':'#fff'
    };
    // const [message, setMessage] = useState(""); 

    const formValidate = () => {
        return newCategory.trim().length > 0;
    };

    const handleSaveClick = (event) => {
        event.preventDefault();
        setShowConfirmation(true); 
    };

    const handleAddCategory = async () => {
        const categoriesRef = ref(database, 'categories');
        await push(categoriesRef, newCategory);
        
        // setMessage("New Category Added"); // Set success message
        navigate('/item-categories');
    };

    const handleCancel = () => {
        setShowConfirmation(false); 
    };

    return (
        <div>
            <div className={styles.form_container}>
                <h1 style={textStyle}>Add Item Category</h1>
            
            <form onSubmit={handleSaveClick} style={textStyle1}>
            <div className={styles.form_group}>
                    <label htmlFor="Cat_name" style={{color: isDarkTheme ? '#f8f8f8' : '#333',}}>Enter Category Name :</label>
                    <input type="text" placeholder="Enter Category Name" id="Cat_name" name="new_category" value={newCategory} 
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                </div>
                <div>
                    <button disabled={!formValidate()}>Save</button>
                </div>
           

            {showConfirmation && (
                <>
                
                    <div className={styles.outer} style={textStyle}>
                    <div className={styles.confirmation} style={textStyle1}>
                    <p>Do you want to confirm saving this new category?</p>
                    <button onClick={handleAddCategory}>Yes</button>
                    <button onClick={handleCancel}>No</button></div>
                </div>

                </>
            )}
             
             
             {/* {showConfirmation && (
                <>
                <div className={styles.confirmation-overlay}>
                    <p>Would you like me to add a new category?</p>
                    <button onClick={handleAddCategory}>Yes</button>
                    <button onClick={handleCancel}>No</button>
                    </div>
                
                </>
            )} */}
</form>
            {/* {message && <p>{message}</p>} */}
        </div></div>
    );
}

export default AddCategory;

// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import { database } from '../firebase'; // Import Firebase instance
// import { ref, push } from 'firebase/database';
// import styles from './AddItemCategory.module.css';

// function AddCategory() {
//     const navigate = useNavigate();
//     const [newCategory, setNewCategory] = useState("");
//     const [imageUrl, setImageUrl] = useState(""); // New state for image URL
//     const [showConfirmation, setShowConfirmation] = useState(false); 

//     const formValidate = () => {
//         return newCategory.trim().length > 0 && imageUrl.trim().length > 0;
//     };

//     const handleSaveClick = (event) => {
//         event.preventDefault();
//         setShowConfirmation(true); 
//     };

//     const handleAddCategory = async () => {
//         const categoriesRef = ref(database, 'categories');
//         await push(categoriesRef, { name: newCategory, image: imageUrl }); // Save both name and image

//         navigate('/item-categories');
//     };

//     const handleCancel = () => {
//         setShowConfirmation(false); 
//     };

//     return (
//         <div>
//             <div>
//                 <h1>Add Item Category</h1>
//             </div>
//             <form onSubmit={handleSaveClick}>
//                 <div>
//                     <label htmlFor="Cat_name">Enter Category Name</label>
//                     <input
//                         type="text"
//                         placeholder="Enter Category Name"
//                         id="Cat_name"
//                         name="new_category"
//                         value={newCategory}
//                         onChange={(e) => setNewCategory(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="Cat_image">Enter Image URL</label>
//                     <input
//                         type="text"
//                         placeholder="Enter Image URL"
//                         id="Cat_image"
//                         name="image_url"
//                         value={imageUrl}
//                         onChange={(e) => setImageUrl(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <button disabled={!formValidate()}>Save</button>
//                 </div>
//             </form>

//             {showConfirmation && (
//                 <>
//                 <div className={styles.modal_overlay}></div>
//                 <div className={styles.confirmation_modal}>
//                     <p>Would you like to add a new category?</p>
//                     <button onClick={handleAddCategory}>Yes</button>
//                     <button onClick={handleCancel}>No</button>
//                 </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default AddCategory;





// import { useState } from "react"
// import {useNavigate } from "react-router-dom";

// function Addcategory({addCategory})
// {
//     const navigate=useNavigate()
//     const[newcategory,setnewcategory]=useState("")
//     const formvalidate=()=>{
//         return(
//             newcategory
//         )
//     }
//     const handle_add_category=(event)=>{
//         event.preventDefault(); 
//         addCategory(newcategory); 
//         navigate('/item-categories')
//       }
//     return(
//     <div>
//         <div>
//         <h1>Add Item Category</h1>
//         </div>
//         <form onSubmit={handle_add_category}>
//         <div>
//            <label htmlFor="Cat_name">Enter Category Name</label>
//             <input type="text" placeholder="Enter Category Name" id="Cat_name" name="new_category" value={newcategory} onChange={(e)=>{setnewcategory(e.target.value)}}></input>
//         </div>
//         <div>
//             <button disabled={!formvalidate()}>Save </button>
//         </div>
//         </form>
//     </div>
//     )
// }
// export default Addcategory