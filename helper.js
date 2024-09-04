// Helper function to format the date and time

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
  console.log('GMT offset', ((gmtOffset / 60)/60) );

  // Calculate GMT offset in hours
  const gmtOffsetInHours = (gmtOffset / 60) / 60;

  // Format the date and time
  const formattedDate = localTime.toLocaleDateString('en-GB', { timeZone: 'UTC' });
  const formattedTime = localTime.toLocaleTimeString('en-GB', { timeZone: 'UTC' });

  return {
    formattedDate,
    formattedTime,
    gmtOffsetInHours
  };
}
