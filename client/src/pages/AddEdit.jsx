import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const AddEdit = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate();
    const isEditMode = Boolean(id); // Determine if it's edit mode

    useEffect(() => {
        console.log('id from useParams:', id); // Log the ID to check if it's correctly retrieved

        // If we're editing an existing user, load the data
        if (isEditMode) {
            axios.get(`http://localhost:5000/api/get/${id}`)
                .then((response) => {
                    const { name, email, contact } = response.data;
                    setName(name);
                    setEmail(email);
                    setContact(contact);
                })
                .catch((error) => {
                    console.error("Error fetching user data", error);
                    Swal.fire('Error', 'Failed to load user data', 'error');
                });
        }
    }, [id, isEditMode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !contact) {
            Swal.fire('Warning', 'All fields are required', 'warning');
            return;
        }

        const newUser = { name, email, contact };

        // Check if it's an edit operation
        if (isEditMode) {
            console.log('Attempting to update user with id:', id); // Log the ID to verify
            axios.put(`http://localhost:5000/api/put/${id}`, newUser)
                .then(() => {
                    Swal.fire('Success', 'User updated successfully', 'success');
                    navigate('/');
                })
                .catch((error) => {
                    console.error("Error updating user", error);
                    Swal.fire('Error', 'Failed to update user', 'error');
                });
        } else {
            // Otherwise, it's an add operation
            axios.post('http://localhost:5000/api/post', newUser)
                .then(() => {
                    Swal.fire('Success', 'User added successfully', 'success');
                    navigate('/');
                })
                .catch((error) => {
                    console.error("Error adding user", error);
                    Swal.fire('Error', 'Failed to add user', 'error');
                });
        }
    };

    return (
        <div className="mt-36 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl text-center">{isEditMode ? 'Edit User' : 'Add User'}</h1>

            <form className="max-w-lg mx-auto mt-8" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Name:</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Email:</label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Contact:</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    {isEditMode ? 'Update User' : 'Add User'}
                </button>
            </form>
        </div>
    );
};

export default AddEdit;
