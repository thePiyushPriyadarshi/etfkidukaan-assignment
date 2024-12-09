export function formatDate(date:string) {
    const d = new Date(date);
    const year = d.getFullYear();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[d.getMonth()]; // Get month name
    const day = String(d.getDate()).padStart(2, '0'); // Pad day to ensure two digits
    
    return `${month} ${day}, ${year}`;
  }