// Function to set an item with expiration time in localStorage
function setItemWithExpiry(key, value, minutesToExpire) {
    const now = new Date();
    const expirationTime = now.getTime() + minutesToExpire * 60 * 1000; // Convert minutes to milliseconds
  
    const item = {
      value: value,
      expires: expirationTime,
    };
  
    localStorage.setItem(key, JSON.stringify(item));
  }
  
  // Function to get an item from localStorage and check if it's expired
  function getItemWithExpiry(key) {
    const itemString = localStorage.getItem(key);
    if (!itemString) {
      return null; // Item not found
    }
  
    const item = JSON.parse(itemString);
    const now = new Date();
  
    if (now.getTime() > item.expires) {
      localStorage.removeItem(key); // Remove the item if it's expired
      return null;
    }
  
    return item.value;
  }
  
  // Example usage
  const key = 'myData';
  const data = 'This is my data';
  const expirationMinutes = 30;
  
  // Set the item with expiration time
  setItemWithExpiry(key, data, expirationMinutes);
  
  // Get the item and check if it's expired
  const retrievedData = getItemWithExpiry(key);
  
  if (retrievedData !== null) {
    console.log('Data is still valid:', retrievedData);
  } else {
    console.log('Data has expired or not found.');
  }
  