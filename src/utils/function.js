export const handleFileChange = (e) => {
  const file = e.target.files[0];
  const imageUrl = URL.createObjectURL(file);
  return imageUrl
};

export const formatDate = (data) => {
  const date = new Date(data);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('id-ID', options);

  return formattedDate
}

export const convertDateString = (data) => {
  const dateObject = new Date(data);
  const year = dateObject.getFullYear();
  const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
  const day = ('0' + dateObject.getDate()).slice(-2);
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}