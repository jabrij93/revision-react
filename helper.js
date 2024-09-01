// Helper function to format the date and time
// export const formatDateTime = (datetime) => {
//     const date = new Date(datetime);

//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
//     const year = date.getFullYear();

//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');

//     const formattedDate = `${day}-${month}-${year}`;
//     const formattedTime = `${hours}:${minutes}`;

//     return { formattedDate, formattedTime };
// };

export const formatDateTime = (timestamp, gmtOffset) => {
  // Correct the timestamp if it's ahead by a certain number of hours
  const correctedTimestamp = timestamp - (2 * gmtOffset); // Subtract 16 hours in seconds if necessary

  // Convert corrected timestamp to milliseconds
  const utcTimestamp = correctedTimestamp * 1000;

  // const utcTimestamp = timestamp * 1000;

  // Calculate the local timestamp by applying the GMT offset
  const localTimestamp = utcTimestamp + gmtOffset * 1000;

  // Create a new Date object with the adjusted timestamp
  const date = new Date(localTimestamp);

  console.log('Calculated Local Date:', date.toString());

  console.log('Raw Timestamp:', timestamp);
  console.log('Raw GMT Offset:', gmtOffset);
  

  // Format the date and time
  const formattedDate = date.toLocaleDateString('en-GB'); // Use en-GB for DD/MM/YYYY format
  const formattedTime = date.toLocaleTimeString('en-GB'); // Use en-GB to keep time in 24-hour format

  return {
    formattedDate,
    formattedTime
  };
}
  
