import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from "axios";

const Home = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteContact = (id) => {
        // Show SweetAlert2 confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with deletion if confirmed
                axios.delete(`http://localhost:5000/api/remove/${id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'Contact has been deleted successfully.',
                            'success'
                        );
                        setTimeout(() => loadData(), 100);
                    })
                    .catch((error) => {
                        console.error("There was an error deleting the contact!", error);
                        Swal.fire(
                            'Error!',
                            'Failed to delete contact.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div className="mt-36 px-4 sm:px-6 lg:px-8">
            <Link to="/addContact">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Add Contact</button>
            </Link>
        
            <div className="mt-8 overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-center">No.</th>
                            <th className="px-4 py-2 text-center">Name</th>
                            <th className="px-4 py-2 text-center">Email</th>
                            <th className="px-4 py-2 text-center">Contact</th>
                            <th className="px-4 py-2 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id} className="border-b">
                                <td className="px-4 py-2 text-center">{index + 1}</td>
                                <td className="px-4 py-2 text-center">{item.name}</td>
                                <td className="px-4 py-2 text-center">{item.email}</td>
                                <td className="px-4 py-2 text-center">{item.contact}</td>
                                <td className="px-4 py-2 text-center space-x-2">
                                    <Link to={`/update/${item.id}`}>
                                        <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition" >Edit</button>
                                    </Link>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition" onClick={() => deleteContact(item._id)}>Delete</button>
                                    <Link to={`/view/${item.id}`}>
                                        <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition">View</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
