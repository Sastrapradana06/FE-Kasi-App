export const handleFileChange = (e) => {
  const file = e.target.files[0];
  const imageUrl = URL.createObjectURL(file);
  return imageUrl
};