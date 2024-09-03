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

// export const formatDateTime = (timestamp, gmtOffset) => {
//   // Convert the original timestamp to milliseconds
//   const utcTimestamp = timestamp * 1000;

//   // Calculate the corrected timestamp by applying the GMT offset
//   // Subtract the offset because GMT offset is positive for east of UTC
//   const correctedTimestamp = utcTimestamp - (gmtOffset * 1000);
  
//   // Create a Date object with the corrected timestamp
//   const date = new Date(correctedTimestamp);
  
//   // Use Intl.DateTimeFormat to format the date and time correctly
//   const options = {
//     timeZone: 'UTC',
//     hour12: false, 
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit'
//   };
  

//   // Format date and time based on the corrected timestamp
//   const formatter = new Intl.DateTimeFormat('en-GB', options);
//   const parts = formatter.formatToParts(date);
  
//   const formattedDate = `${parts[4].value}/${parts[2].value}/${parts[0].value}`; // DD/MM/YYYY
//   const formattedTime = `${parts[6].value}:${parts[8].value}:${parts[10].value}`; // HH:MM:SS

//   // console.log('Calculated Local Date:', date.toString());
//   // console.log('Raw Timestamp:', timestamp);
//   // console.log('Raw GMT Offset:', gmtOffset);
//   console.log("formattedDate", formattedDate);
//   console.log("formattedTime", formattedTime);

//   return {
//     formattedDate,
//     formattedTime
//   };
// }
  
// export const formatDateTime = (timestamp, gmtOffset) => {
//   // Convert the timestamp to milliseconds
//   const utcTimestamp = timestamp * 1000;

//   // Create a new Date object with the UTC timestamp
//   const date = new Date(utcTimestamp);

//   // Manually apply the GMT offset (in milliseconds)
//   const localTime = new Date(date.getTime() + gmtOffset * 1000);

//   console.log('Calculated Local Date:', localTime.toString());
//   console.log('Raw Timestamp:', timestamp);
//   console.log('Raw GMT Offset:', gmtOffset);

//   // Format the date and time
//   const formattedDate = localTime.toLocaleDateString('en-GB'); // Use en-GB for DD/MM/YYYY format
//   const formattedTime = localTime.toLocaleTimeString('en-GB'); // Use en-GB to keep time in 24-hour format

//   return {
//     formattedDate,
//     formattedTime
//   };
// }

export const formatDateTime = (timestamp, gmtOffset) => {
  // Convert the timestamp to milliseconds
  const utcTimestamp = timestamp * 1000;

  // Calculate the local timestamp by applying the GMT offset
  const localTimestamp = utcTimestamp + (gmtOffset * 1000);

  // Create a new Date object with the adjusted local timestamp
  const localTime = new Date(localTimestamp);

  console.log('Calculated Local Date:', localTime.toString());
  console.log('Raw Timestamp:', timestamp);
  console.log('Raw GMT Offset:', gmtOffset);

  // Format the date and time
  const formattedDate = localTime.toLocaleDateString('en-GB', { timeZone: 'UTC' });
  const formattedTime = localTime.toLocaleTimeString('en-GB', { timeZone: 'UTC' });

  return {
    formattedDate,
    formattedTime
  };
}
