import React, {useState} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import './AddSynonyms.css';

export default function AddSynonyms() {

  const [word,setWord] =useState("");
  const [synonym,setSynonym] =useState("");
  const [showPopup, setShowPopup] = useState(false);
  const status = "active";
 
  const handleWordChange = (event) => {
    const inputValue = event.target.value;
    const alphabeticValue = inputValue.replace(/[^a-zA-Z]/g, "");
    setWord(alphabeticValue);
  };

  const handleSynonymChange = (event) => {
    const inputValue = event.target.value;
    const alphabeticValue = inputValue.replace(/[^a-zA-Z]/g, "");
    setSynonym(alphabeticValue);
  };

  function sendData(e){
    e.preventDefault();
  
    const newSynonym = {
      word,
      synonym,
      status
    }
    
    // axios.post("http://localhost:8070/synonyms/SynonymAdd",newSynonym).then(()=>{{[
    //   'success'
    //   ].map((variant) => (
    //   <alert variant="success">Synnonym is added</alert>
    // ))}
    //   alert("data added")
    // }).catch((err)=>{{[
    //   'danger'
    //   ].map((variant) => (
    //   <alert>data not added</alert>
    // ))}
    //   // alert("data not added")
    //   // console.log(err);
    // })

    axios
    .post("http://localhost:8070/synonyms/SynonymAdd",newSynonym)
    .then(() => {
      setShowPopup(true);
    })
    .catch((err) => {
      alert(err);
    });


   
  
  }



  return (
    <div  className="addBody">
      <br />
      <br />

      <h1>Add Synonym</h1>

      <form onSubmit={sendData}>
      <div className="add-container">
        <div class="mb-3">
          <label for="formGroupExampleInput" class="form-label">Word</label>
          <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter word" 
          onChange={(e)=>{
            setWord(e.target.value);
            handleWordChange(e);
          }}
          value={word}
          required/>
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput2" class="form-label">Synonym</label>
          <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Enter synonym" 
          onChange={(e)=>{
            setSynonym(e.target.value);
            handleSynonymChange(e);
          }}
          value={synonym}
          required/>
        </div>
      </div>
      <div class="vertical-center">
        <button className="add-button">ADD</button>
      </div>
      </form>
      <div className="btn-group" role="group" aria-label="Basic mixed styles example">
        <button type="button" class="btn1">
          <Link to="/updateSynonyms">
            <i class="bi bi-pencil-square"></i>
            <svg style={{color: '#ffffff'}} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg>
          </Link>
        </button>
      </div>


      {showPopup === true && (
        <div className="popup">
          <div className="d-flex justify-content-center popup-box">
            <div className="text-white pop-heading">Successfully added synonym</div>

            <button
              onClick={() => {
                setShowPopup(false);
              }}
              className="pop-btn btn-success"
            >
              ok
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
