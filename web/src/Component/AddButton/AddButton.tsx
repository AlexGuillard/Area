import React, { useState } from 'react'
import Add from '../Modals/Add/Add.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './AddButton.css'

const AddButton = () => {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);


    const openAddModal = () => {
        setIsAddModalOpen(true);
      };
    
      const closeAddModal = () => {
        setIsAddModalOpen(false);
      };
    
  return (
    <div>
        <button className="add-button" onClick={openAddModal}>
            <FontAwesomeIcon icon={faPlus} size="2x"/>
        </button>

        {isAddModalOpen && <Add onClose={closeAddModal} />}

    </div>
  );
};

export default AddButton;
