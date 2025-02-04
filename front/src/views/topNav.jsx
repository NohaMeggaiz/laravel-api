import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const topNav = () => {
    const navigate = useNavigate();
    const baseUrl = "http://127.0.0.1:8000/api";


    const handleLogout = async () => {
        const token = localStorage.getItem('ACCESS_TOKEN'); // Assurez-vous que c'est bien "ACCESS_TOKEN"
    
        try {
            await axios.post(
                `${baseUrl}/logout`, 
                {}, // Le corps de la requête est vide ici
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            localStorage.removeItem('ACCESS_TOKEN'); // Assurez-vous de supprimer la bonne clé
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };
    

    return (
        <nav style={styles.navbar}>
            <div style={styles.navBrand}>My App</div>
            <button style={styles.logoutButton} onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff',
    },
    navBrand: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    logoutButton: {
        padding: '5px 10px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default topNav;