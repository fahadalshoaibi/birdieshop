import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';



const Rdashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});   
    console.log(data);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/admin", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    },
                });
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching admin stats:", error);
                setLoading(false);
            }
        }
    fetchData();
    }, []);
    console.log(data);

    if (loading) {
        return <div>Loading...</div>;
    }
  return (
    <div>
      
    </div>
  )
}

export default Rdashboard
