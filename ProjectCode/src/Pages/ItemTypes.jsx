import React, { useState, useEffect } from 'react';
import styles from './Itemtypes.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { database } from '../firebase'; // Import Firebase instance
import { ref, onValue, remove } from 'firebase/database';
import { useTheme } from "../ThemeContext";
import { text } from '@fortawesome/fontawesome-svg-core';

function Itemtypes() {
    const navigate = useNavigate();
    const { category } = useParams(); // `category` comes from the route definition in App.js
    const [filteredItems, setFilteredItems] = useState([]);
    const [itemSearch, setItemSearch] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const { isDarkTheme } = useTheme();
    const textStyle = {
            color: isDarkTheme ? '#f8f8f8' : '#333',  // Use theme colors for text

        };
        const textStyle1 = {
            backgroundColor: isDarkTheme ? '#333':'#fff'
        };

    useEffect(() => {
        const itemsRef = ref(database, `items/${category}`);
        onValue(itemsRef, (snapshot) => {
            const itemsData = snapshot.val();
            const itemsArray = itemsData ? Object.keys(itemsData).map(id => ({ id, ...itemsData[id] })) : [];
            setFilteredItems(itemsArray);
        });
    }, [category]);

    const navigateAddItem = () => {
        navigate(`/add-item-type/${category}`);
    };

    const handleBack = () => {
        navigate('/item-categories');
    };

    const handleDeleteItem = async () => {
        if (itemToDelete) {
            const itemRef = ref(database, `items/${category}/${itemToDelete}`);
            try {
                await remove(itemRef);
                setFilteredItems((prevItems) => prevItems.filter((item) => item.id !== itemToDelete));
                console.log(`Deleted item: ${itemToDelete}`);
            } catch (error) {
                console.error("Error deleting item: ", error);
            } finally {
                setItemToDelete(null);
                setShowConfirmation(false);
            }
        }
    };

    const handleDetailsPage = (itemName) => {
        navigate(`/details/${category}/${itemName}`);
    };

    // Filter items based on search input
    const filteredSearch = filteredItems.filter(item =>
        item.name.toLowerCase().includes(itemSearch.toLowerCase())
    );

    const confirmDelete = (deleteItem) => {
        setItemToDelete(deleteItem);
        setShowConfirmation(true);
    };

    const handleCancel = () => {
        setItemToDelete(null);
        setShowConfirmation(false);
    };

    return (
        <div>
            <div className={styles.search_item}>
                <button onClick={handleBack} className='styles.backbutton'>Back</button>
                <h1 style={textStyle}>Items in {category}</h1>
                <input
                    type="text"
                    placeholder="Search the item"
                    className={styles.searchBar}
                    onChange={(e) => setItemSearch(e.target.value)}
                />
                <button onClick={navigateAddItem}>Add New Item</button>
            </div>

            <div className={styles.item_styles}>
                {filteredSearch.map((item) => (
                    <div key={item.id} className={styles.item_container} style={textStyle1}>
                        <div className={styles.item} onClick={() => handleDetailsPage(item.name)}>
                        <div style={{fontSize:"20px",fontWeight:"bold"}}>{item.name}</div>
                            <img className={styles.image_style} src={item.image} alt="Item" />
                            <strong>${item.price}</strong>
                        </div>
                        <div className={styles.delete_icon_container}>
                            <FontAwesomeIcon
                                icon={faTrash}
                                className={styles.delete_icon}
                                onClick={() => confirmDelete(item.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {showConfirmation && (
                <div className={styles.outer} style={textStyle}>
                    <div className={styles.confirmation} style={textStyle1}>
                        <p>Are you sure you want to proceed?</p>
                        <button onClick={handleDeleteItem}>Yes</button>
                        <button onClick={handleCancel}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Itemtypes;





