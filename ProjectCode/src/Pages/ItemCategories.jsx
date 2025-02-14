import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './ItemCategories.module.css';
import './ItemCategories.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { database } from '../firebase'; // Import your Firebase database instance
import { ref, onValue, remove } from 'firebase/database';
import { useTheme } from "../ThemeContext";

function Itemcategories() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const { isDarkTheme } = useTheme();

    // Fetch categories from Firebase on component mount
    useEffect(() => {
        const categoriesRef = ref(database, 'categories');
        onValue(categoriesRef, (snapshot) => {
            const data = snapshot.val();
            const categoriesArray = data ? Object.values(data) : [];
            setCategories(categoriesArray);
        });
    }, []);

    // Navigate to item types in the selected category
    const handleItemTypesNavigation = (categoryName) => {
        navigate(`/item-types/${categoryName}`);
    };

    // Navigate to add new category page
    const handleAddCategory = () => {
        navigate("/add-item-categories");
    };

    // Handle delete confirmation
    const confirmDelete = (deleteItem) => {
        setCategoryToDelete(deleteItem);
        setShowConfirmation(true);
    };

    const handleDelete = () => {
        if (categoryToDelete) {
            const categoriesRef = ref(database, 'categories');
            onValue(
                categoriesRef,
                (snapshot) => {
                    const data = snapshot.val();
                    const categoryKey = Object.keys(data).find(
                        (key) => data[key] === categoryToDelete
                    );

                    if (categoryKey) {
                        const categoryRef = ref(database, `categories/${categoryKey}`);
                        remove(categoryRef)
                            .then(() => {
                                console.log(`Deleted ${categoryToDelete} from categories`);

                                // Delete from 'items' node as well
                                const itemsRef = ref(database, `items/${categoryToDelete}`);
                                return remove(itemsRef);
                            })
                            .then(() => {
                                console.log(`Deleted ${categoryToDelete} from items`);
                                setCategories((prevCategories) =>
                                    prevCategories.filter((category) => category !== categoryToDelete)
                                );
                                setCategoryToDelete(null);
                                setShowConfirmation(false);
                            })
                            .catch((error) => {
                                console.error("Error deleting category: ", error);
                            });
                    }
                },
                { onlyOnce: true }
            );
        }
    };

    const handleCancel = () => {
        setCategoryToDelete(null);
        setShowConfirmation(false);
    };

    const filteredCategories = categories.filter((category) =>
        category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const textStyle = {
        color: isDarkTheme ? '#f8f8f8' : '#333',  // Use theme colors for text
    };
    const textStyle1 = {
        backgroundColor: isDarkTheme ? '#333':'#fff'
    };
   
    return (
        <div>
            <div className={styles.search_item}>
                <h1 style={textStyle}>Item Categories</h1>
                <input
                    type="text"
                    placeholder="Search The Item"
                    className={styles.searchBar}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button className="add-button" onClick={handleAddCategory}>
                    Add New Category
                </button>
            </div>

            <div className={styles.item_styles} >
                {filteredCategories.map((name) => (
                    <div key={name} className={styles.item} >
                        <h1 style={textStyle} onClick={() => handleItemTypesNavigation(name)}> {name} </h1>
                        <FontAwesomeIcon
                            icon={faTrash}
                            className={styles.delete_icon}
                            onClick={() => confirmDelete(name)}
                        />
                    </div>
                ))}
            </div>

            {showConfirmation && (
                <div className={styles.outer} style={textStyle}>
                    <div className={styles.confirmation} style={textStyle1} >
                        <p>Are you sure you want to delete {categoryToDelete}?</p>
                        <button onClick={handleDelete} >Yes</button>
                        <button onClick={handleCancel}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Itemcategories;





