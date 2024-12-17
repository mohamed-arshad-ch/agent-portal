function formatDate(isoString) {
    const date = new Date(isoString);
    
    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, '0'); // Ensures two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

export default formatDate