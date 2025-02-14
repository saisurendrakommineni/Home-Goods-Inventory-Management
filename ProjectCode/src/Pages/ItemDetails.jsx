import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, child, get } from 'firebase/database';
import styles from './ItemDetails.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from "../ThemeContext";


function Details() {
    const { item, category } = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [itemId, setItemId] = useState(null);
    const { isDarkTheme } = useTheme();
const textStyle = {
        color: isDarkTheme ? '#f8f8f8' : '#333',  // Use theme colors for text
    };

    useEffect(() => {
        const dbRef = ref(getDatabase());

        console.log('Fetching details for:', { category, item });
        get(child(dbRef, `items/${category}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const itemsData = snapshot.val();
                    const itemDetails = Object.entries(itemsData).find(
                        ([id, i]) => i.name.trim().toLowerCase() === item.trim().toLowerCase()
                    );

                    if (itemDetails) {
                        const [id, itemData] = itemDetails; 
                        setDetails(itemData);
                        setItemId(id); // Store the unique item ID
                    } else {
                        console.log('Item not found in category.');
                        setDetails(null);
                    }
                } else {
                    console.log('No data available for this category.');
                    setDetails(null);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                setLoading(false);
            });
    }, [category, item]);

    const handleBack = () => {
        navigate(`/item-types/${category}`);
    };

    const handleEditPage = () => {
        if (itemId) {
            navigate(`/editdetails/${category}/${itemId}`);
        } else {
            console.error('Item ID is undefined.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!details) {
        return <div>Item not found.</div>;
    }

    return (
        <div className={styles.details_wrapper} style={textStyle}>
            <div className={styles.details_buttons}>
                <button onClick={handleBack}>Back</button>
                <button onClick={handleEditPage}>Edit Item Details</button>
            </div>
            <h1 style={textStyle} className={styles.details_heading}>Item Details: {details.name}</h1>
            <div className={styles.details_content}>
                <p>
                    <span>Item Category:</span> {details.category}
                </p>
                <p>
                    <span>Item Name:</span> {details.name}
                </p>
                <p>
                    <span>Item Price:</span> {details.price}$
                </p>
                <p>
                    <span>Item Stock:</span> {details.stock}
                </p>
                <p>
                    <span>Description:</span> {details.desc}
                </p>
                <p>
                    <span>Manufacturer:</span> {details.manufacturer}
                </p>
                <p>
                    <span>Dimensions & Weight:</span> {details.dimension}
                </p>
                <p>
                    <span>Warranty:</span> {details.warranty}
                </p>
               
               
            </div>
            {details.image && (
                <div className={styles.details_image}>
                    <img src={details.image} alt={`${details.name}`} />
                </div>
            )}
        </div>
    );
}

export default Details;





