/* 
import React, { useState } from 'react';

const ImagePicker = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
    };

  reader.readAsDataURL(selectedFile);
    
  };

  return (
    <div style={{backGround: 'green'}}>
      <input type="file" onChange={handleImageChange} />
      {image && <img src={image} alt="Selected Image" />}
    </div>
  );
};

export default ImagePicker;  */
