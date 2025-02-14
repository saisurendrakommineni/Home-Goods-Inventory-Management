import styles from './AddItemType.module.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { database } from "../firebase";
import { ref, push, onValue } from "firebase/database";
import { useTheme } from "../ThemeContext";

function AddItemType() {
    const navigate = useNavigate();
    const{categorys}=useParams()
    const [category, setCategory] = useState(""); // Stores selected category
    const [allCategories, setAllCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // Stores the current search term
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [name, setName] = useState("");
    const [stock, setStock] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    // const [rating, setRating] = useState("");
    const [image, setImage] = useState("");
    const [desc, setDesc] = useState("");
    const[price,setPrice]=useState("")
    const[dimension,setDimension]=useState("")
    const[warranty,setWarranty]=useState("")

    const [showConfirmation, setShowConfirmation] = useState(false); 

    const { isDarkTheme } = useTheme();

    const textStyle1 = {
        backgroundColor: isDarkTheme ? '#333':'#fff'
    };
const textStyle = {
        color: isDarkTheme ? '#f8f8f8' : '#333',  // Use theme colors for text
    };


    // Fetch all categories from Firebase on component mount
    useEffect(() => {
        const categoriesRef = ref(database, 'categories');
        onValue(categoriesRef, (snapshot) => {
            const data = snapshot.val();
            const categoriesArray = data ? Object.values(data) : [];
            setAllCategories(categoriesArray);
            setFilteredCategories(categoriesArray); // Initialize filtered categories
        });
    }, []);

    // Filter categories based on search query
    useEffect(() => {
        setFilteredCategories(
            allCategories.filter(cat => 
                cat.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, allCategories]);

    const item_add_handler = async (event) => {
        event.preventDefault();

        const newItem = {
            category,
            name,
            price,
            stock,
            manufacturer,
            image,
            desc,
            dimension,
            warranty
            };

        try {
            await push(ref(database, `items/${category}`), newItem);
            navigate(`/item-types/${category}`);
        } catch (error) {
            console.error("Error adding item to Firebase:", error);
        }
    };

    const cancel = () => {
        navigate(`/item-types/${categorys}`);
    };

    const handleCategorySelect = (cat) => {
        setCategory(cat);      
        setSearchQuery(cat);     // Clear the search query to display only the selected category
        setDropdownOpen(false); // Close the dropdown
    };

    const handleSaveClick = (event) => {
        event.preventDefault();
        setShowConfirmation(true); 
    };
    const handleCancel = () => {
        setShowConfirmation(false); 
    };
    const isFormValid = category.trim() !== "" && name.trim() !== "";

    return (
        <div className={styles.form_container}>
            <h1 style={textStyle}>Add New Item</h1>
            <form onSubmit={handleSaveClick} style={textStyle1}>
                <div className={styles.form_group}>
                    <label htmlFor="category_name">Category Name:</label>
                        <div className={styles.custom_dropdown}>
                            <input type="text" placeholder="Select or search categories..." value={searchQuery}  // Display search query only
                            onChange={(e) => {
                                setSearchQuery(e.target.value); // Update search query with typed value
                                setDropdownOpen(true); // Open dropdown for search results
                            }}
                            onFocus={() => setDropdownOpen(true)}
                            />
                            {dropdownOpen && (
                            <div className={styles.dropdown_list}>
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map((cat) => (
                                        <div
                                            key={cat}
                                            className={styles.dropdown_item}
                                            onClick={() => handleCategorySelect(cat)}
                                        >
                                            {cat}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.dropdown_item}>No categories found</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.form_group}>
                    <label htmlFor="item_type">Item Name:</label>
                    <input type="text" id="item_type" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
               

                <div className={styles.form_group}><label htmlFor="item_price">Item Price:</label>
                    <input type="number" id="item_price" value={price} onChange={(e) => {const value = parseFloat(e.target.value);
                    if (value > 0 || e.target.value === "") {
                        setPrice(e.target.value);}}} />
                </div>

                <div className={styles.form_group}><label htmlFor="item_stock">Item Stock:</label>
                <input type="number" id="item_stock" value={stock} onChange={(e) => {const value = parseFloat(e.target.value);
                if (value > 0 || e.target.value === "") {
                setStock(e.target.value)}}} /></div>


                <div className={styles.form_group}>
                    <label htmlFor="item_desc">Decription:</label>
                    <input type="text" id="item_desc" value={desc} onChange={(e) => setDesc(e.target.value)}/>
                </div>


                <div className={styles.form_group}>
                    <label htmlFor="item_manufacturer">Manufacturer:</label>
                    <input type="text" id="item_manufacturer" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)}/>
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="dimension">Dimensions and weight:</label>
                    <input type="text" id="dimension" value={dimension} onChange={(e) => setDimension(e.target.value)}/>
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="warranty">Warranty:</label>
                    <input type="text" id="warranty" value={warranty} onChange={(e) => setWarranty(e.target.value)}/>
                </div>

                <div className={styles.form_group}>
                    <label htmlFor="item_image">Image URL:</label>
                    <input type="text" id="item_image" value={image} onChange={(e) => setImage(e.target.value)}/>
                </div>

               
                <button type="submit" className={styles.submit_button } disabled={!isFormValid}>Add New Item</button>
                <button type="button" onClick={cancel} className={styles.cancel_button}>Cancel</button>
            </form>
             
            {showConfirmation && (
                <>
                
                    <div className={styles.outer} style={textStyle}>
                    <div className={styles.confirmation}style={textStyle1}>
                    <p>Do you want to confirm saving this new item?</p>
                    <button onClick={item_add_handler}>Yes</button>
                    <button onClick={handleCancel}>No</button>
                    </div>
                </div>

                </>
            )}

        </div>
    );
}

export default AddItemType;






