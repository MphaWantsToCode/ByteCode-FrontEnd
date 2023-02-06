import React , {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faPaperPlane } from "@fortawesome/free-solid-svg-icons"; 
import './window.css'

const Chat = () => {
  const [inputs, setInputs] = useState([]); // A state variable containing an array of all input types (image/text)
  const [text, setText] = useState('');  
  const [image, setImage] = useState(null); 

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result); //image is being set here
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleTextChange = (event) => {   //handling inputs
    setText(event.target.value);
  };


  //Submit Logic Without API
 const handleSubmit = () => {

    if (text) {
      setInputs([...inputs, { type: 'text', value: text }]);
      setText('');
    } else if (image) {
      setInputs([...inputs, { type: 'image', value: image }]);
      setImage(null);
    }
  }; 


  //Submit Logic with API 
/*   const handleSubmit = async () => {
    if (text || image) {
      let requestBody;
      if (text) {
        requestBody = {text};
        setInputs([...inputs, { type: 'text', value: text, isApiResponse: false }]);
      } else if (image) {
        requestBody = {image};
        setInputs([...inputs, { type: 'image', value: image }]);
        setImage(null);
      }
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      const data = await response.json();
  
      if (text) {
        setInputs([...inputs, { type: 'text', value: data.response, isApiResponse: true }]);
        setText('');
      }
    }
  }; */


  return (
    <div className='inputWindow'>
      <TextWindow inputs={inputs} />
      <Text_input 
        text={text}
        image={image}
        handleTextChange={handleTextChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
};


const TextWindow = ({ inputs }) => {
  return (
    <div className='textWindow' style={{ overflow: "auto"}} >
      {inputs.map((input, index) => (
        input.type === 'text' ?
        <div className={input.isApiResponse ? "api-response-bubble" : "bubble"} key={index}>{input.value}</div> :
        <img  
        style={{backGroundColor: '#53018A' ,float:'right',marginRight: "2rem",borderRadius: "10px" , maxWidth: "200px", maxHeight: "200px" }}
        key={index} 
        src={input.value}
        alt="Selected Image" />
      ))}
    </div>
  )
};


const Text_input = ({ text, image, handleTextChange, handleImageChange, handleSubmit }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
  
  return (
    <div>
      
      <div className='textBox' style={{ display: "flex", alignItems: "center" }}>
      <input type="file"  onChange={handleImageChange} style={{ display: "none"}} />
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          style={{
            padding: "1em",
            border: "1px solid lightgray",
            borderRadius: "5px",
            flexGrow: 5,
          }}
        />
        <div style={{ marginLeft: "0.5em" }} onClick={() => document.querySelector("input[type=file]").click()}>
          <FontAwesomeIcon icon={faPaperclip} color="#53018A" />
        </div>
        <div style={{ marginLeft: "0.5em" }} onClick={handleSubmit}>

          <FontAwesomeIcon icon={faPaperPlane} color="#53018A" />
        </div>
      </div>

    </div>
  )
}

export default Chat





   



