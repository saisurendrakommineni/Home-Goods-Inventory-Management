import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { database } from "../firebase";
import { ref, get, update } from "firebase/database";
import styles from './AddItemType.module.css';
import { useTheme } from "../ThemeContext";

function EditItemDetails() {
    const { category, itemId } = useParams();
    const [details, setDetails] = useState({
        name: "", 
        price: "",
        stock: "", 
        desc: "", 
        manufacturer: "", 
        dimension: "", 
        warranty: "", 
        image: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

const { isDarkTheme } = useTheme();
const textStyle = {
        color: isDarkTheme ? '#f8f8f8' : '#333',  // Use theme colors for text
    };
 const textStyle1 = {
            backgroundColor: isDarkTheme ? '#333':'#fff'
        };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const itemRef = ref(database, `items/${category}/${itemId}`);
                const snapshot = await get(itemRef);
                if (snapshot.exists()) setDetails(snapshot.val());
                else setError("Item not found.");
            } catch (error) {
                setError("Failed to load item details.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [category, itemId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => ({ ...prev, [name]: value }));
    };
    const handleInputChange1 = (e) => {
        const { name, value } = e.target;
        const parsedValue = parseFloat(value);
      
        if (parsedValue > 0 || value === "") {
          setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
          }));
        }
      };
      
    const handleSaveChanges = async () => {
        try {
            const itemRef = ref(database, `items/${category}/${itemId}`);
            await update(itemRef, details);
            navigate(`/details/${category}/${details.name}`);
        } catch (error) {
            setError("Failed to save changes.");
        }
    };

    const handleCancelChanges = () => navigate(`/details/${category}/${details.name}`);
    const handleCancel = () => setShowConfirmation(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    if (loading) return <p>Loading item details...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div className={styles.form_container} >
            <h1 style={textStyle}>Edit Item Details</h1>
            <form onSubmit={handleSubmit}style={textStyle1}>
                <div className={styles.form_group}>
                    <label htmlFor="name">Item Name:</label>
                    <input type="text" id="name" name="name" value={details.name} onChange={handleInputChange} />
                </div>
                {/* <div className={styles.form_group}>
                    <label htmlFor="price">Item Price:</label>
                    <input type="number" id="price" name="price" value={details.price} onChange={handleInputChange} />
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="stock">Item Stock:</label>
                    <input type="number" id="stock" name="stock" value={details.stock} onChange={handleInputChange} />
                </div> */}
                <div className={styles.form_group}><label htmlFor="price">Item Price:</label>
                <input type="number" id="price" name="price" value={details.price} onChange={handleInputChange1} min="1" /></div>

                <div className={styles.form_group}><label htmlFor="stock">Item Stock:</label>
                <input type="number" id="stock" name="stock" value={details.stock} onChange={handleInputChange1} min="1" /></div>
                
                <div className={styles.form_group}>
                    <label htmlFor="desc">Description:</label>
                    <input type="text" id="desc" name="desc" value={details.desc} onChange={handleInputChange} />
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="manufacturer">Manufacturer:</label>
                    <input type="text" id="manufacturer" name="manufacturer" value={details.manufacturer} onChange={handleInputChange} />
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="dimension">Dimensions and Weight:</label>
                    <input type="text" id="dimension" name="dimension" value={details.dimension} onChange={handleInputChange} />
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="warranty">Warranty:</label>
                    <input type="text" id="warranty" name="warranty" value={details.warranty} onChange={handleInputChange} />
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="image">Image URL:</label>
                    <input type="text" id="image" name="image" value={details.image} onChange={handleInputChange} />
                </div>
                <button type="submit" className={styles.submit_button}>Save</button>
                <button type="button" onClick={handleCancelChanges} className={styles.cancel_button}>Cancel</button>
            </form>
            {showConfirmation && (
                <div className={styles.outer} style={textStyle}>
                    <div className={styles.confirmation} style={textStyle1}>
                        <p style={textStyle}>Do you want to confirm these changes?</p>
                        <button onClick={handleSaveChanges}>Yes</button>
                        <button onClick={handleCancel}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditItemDetails;








