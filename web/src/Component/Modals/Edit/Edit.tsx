import React, { useState } from 'react'
import '../Modal.css'

const Edit = ({ onClose }) => {
    const [selectedOption1, setSelectedOption1] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    const canSubmit = selectedOption1.trim() !== '' && selectedOption2.trim() !== '';

    const handleOption1Change = (event) => {
      setSelectedOption1(event.target.value);
    };

    const handleOption2Change = (event) => {
      setSelectedOption2(event.target.value);
    };

    // A modifier pour envoyer les données au serveur
    const handleSubmit = () => {

      if (canSubmit) {
        console.log('Selected Option 1:', selectedOption1);
        console.log('Selected Option 2:', selectedOption2);
    
        onClose();
      } else {
        console.log('Can not submit caus no selected option');
      }
    };

    return (
      <div className="modal">
        <div className="modal-content">

          <h2>Edit Area</h2>

          <label htmlFor="select1">Action</label>
          <select id="select1" value={selectedOption1} onChange={handleOption1Change}>
            {/* Ici utiliser une requête pour récupérer les actions possibles */}
            {/* maybe add a loading state during the api call */}
            <option value="">Select an Option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>

          <label htmlFor="select2">Reaction</label>
          <select id="select2" value={selectedOption2} onChange={handleOption2Change}>
            {/* Ici utiliser une requête pour récupérer les reaction possibles */}
            {/* maybe add a loading state during the api call */}
            <option value="">Select an Option</option>
            <option value="optionA">Option A</option>
            <option value="optionB">Option B</option>
          </select>

          <div className='button-container'>
            <button onClick={handleSubmit} disabled={!canSubmit}>Edit</button>
            <button onClick={onClose} className='close-button'>Annuler</button>
          </div>

        </div>
      </div>
    );
  };

export default Edit;