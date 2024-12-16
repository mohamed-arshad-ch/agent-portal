'use client';
import axios from 'axios';
import { useState, useEffect } from 'react'

// This is a mock API call. Replace with actual API calls in a real application.
const fetchLeads = async () => {
 

  try {
   

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/leads?populate=*&sort=createdAt:desc`,{headers:{
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    }})
    
    if (response.ok) {
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

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const data = await fetchLeads()
        setLeads(data)
        setIsLoading(false)
      } catch (err) {
        setError('Failed to fetch leads')
        setIsLoading(false)
      }
    }

    loadLeads()
  }, [])

  const addLead = (newLead) => {
    const lead = { ...newLead, id: Date.now().toString() }
    setLeads(prevLeads => [...prevLeads, lead])
  }

  const updateLead = (updatedLead) => {
    setLeads(prevLeads => prevLeads.map(lead => 
      lead.id === updatedLead.id ? updatedLead : lead))
  }

  const deleteLead = (id) => {
    setLeads(prevLeads => prevLeads.filter(lead => lead.id !== id))
  }

  return { leads, isLoading, error, addLead, updateLead, deleteLead }
}

