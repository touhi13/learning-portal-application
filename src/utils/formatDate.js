const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const uploadedOn = `Uploaded on ${formattedDate}`;
    return uploadedOn;
}

export default formatDate;