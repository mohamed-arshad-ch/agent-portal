'use client';
import axios from 'axios';
import { useState, useEffect } from 'react'

// This is a mock API call. Replace with actual API calls in a real application.
export const fetchLeads = async () => {
 

  try {
   

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/leads?populate=*&sort=createdAt:desc`,{headers:{
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    }})
    
    if (response.data) {
      const result = await response.data;
      return result.data
    } else {
      const errorData = await response.data;
      console.error("Error response:", errorData);
      return errorData.data
      
    }
  } catch (error) {
   
    console.error("Error:", error);
  }

}

export const useLeads = () => {
  const [leads, setLeads] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadLeads = async () => {
    try {
      setIsLoading(true)
      const data = await fetchLeads()
      setLeads(data)
      setIsLoading(false)
    } catch (err) {
      setError('Failed to fetch leads')
      setIsLoading(false)
    }
  }


  useEffect(() => {
   

    loadLeads()
  }, [])

 

 



  const addLead = async(newLead) => {
    const lead = { ...newLead, id: Date.now().toString() }
   await loadLeads()
    // setLeads(prevLeads => [...prevLeads, lead])
    // await fetchLeads();
  }

  const updateLead = async(updatedLead) => {
    // await loadLeads()
  }

  const deleteLead = async(id) => {
    // await fetchLeads();
  }

  return { leads, isLoading, error, addLead, updateLead, deleteLead,loadLeads }
}

