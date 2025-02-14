// installation package
// npm install react-router-dom
// npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons

import './LoginPage.module.css';
import { useReducer, useState ,useEffect} from "react";
import { ThemeProvider } from './ThemeContext';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Added Navigate for redirection

import Login from './LoginPage';
import CreateAccount from './CreateAccount';
import Success from './AccountCreationSuccessful';
import ItemCategories from './Pages/ItemCategories';
import AddCategory from './Pages/AddItemCategory';
import ItemTypes from './Pages/ItemTypes';
import AddItemType from './Pages/AddItemType';
import Details from './Pages/ItemDetails';
import EditDetails from './Pages/EditItemDetails';
import ForgotPassword from './ForgotPassword';
import InventoryCounter from "./InventoryCounter";
import Layout from './Layout'; // Import the Layout component

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  });

   // Function to set login status to true when the user logs in
  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true'); // Save to local storage
  };

  // Function to set login status to false when the user logs out
  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn'); // Remove from local storage
  };


  
  const [categories, setCategories] = useState([]);
  const addCategory = (newCategory) => {
    setCategories(prevCategories => [...prevCategories, newCategory]);
  };

  const handleDelete = (deleteItem) => {
    const updated = categories.filter(categoryDelete => categoryDelete !== deleteItem);
    setCategories(updated);
  };

  const itemTypes = [{}];   

  const reducer = (types, action) => {
    switch (action.type) {
      case 'addItem':
        return [...types, action.payload];
      case 'editItem':
        return types.map(item => 
          item.id === action.payload.id ? { ...action.payload } : item
        );
      default:
        return types;
    }
  }

  const [items, dispatch] = useReducer(reducer, itemTypes);

 

  return (
    <ThemeProvider>
      <Router>
        {isLoggedIn ? (
          <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
            <Routes>
              <Route path="/item-categories" element={<ItemCategories categories={categories} handleDelete={handleDelete} />} />
              <Route path="/add-item-categories" element={<AddCategory addCategory={addCategory} />} />
              <Route path="/item-types/:category" element={<ItemTypes items={items} />} /> 
              <Route path="/add-item-type/:categorys" element={<AddItemType addItem={(newItem) => dispatch({ type: 'addItem', payload: newItem })} />} />
              <Route path="/details/:category/:item" element={<Details items={items} />} /> 
              <Route path="/editdetails/:category/:itemId" element={<EditDetails />} />
              <Route path="/inventory" element={<InventoryCounter />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="*" element={<Navigate to="/item-categories" />} /> {/* Redirect unknown paths */}
            </Routes>
          </Layout>
        ) : (
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/account_success" element={<Success />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown paths */}
          </Routes>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;

