import React, { useEffect } from 'react';
import './add.css';
import { useState } from 'react';
import SelectInput from '../../Image/SelectInput.png'

function Add() {

  const [nameArea, setNameArea] = useState("");
  const [selectedAction, setSelectedAction] = useState("Action");
  const [selectedReaction, setSelectedReaction] = useState("Reaction");
  const [paramArea, setParamArea] = useState("");
  const [showlistAction, setShowListAction] = useState(false);
  const [showlistReaction, setShowListReaction] = useState(false);
  const [listAction, setListAction] = useState<string []>();
  const [listReaction, setListReaction] = useState<string []>();

  const handleNameAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameArea(event.target.value);
  };

  const handleClickActionList = () => {
    setShowListAction(!showlistAction)
    setShowListReaction(false)
  }

  const handleClickReactionList = () => {
    setShowListReaction(!showlistReaction)
    setShowListAction(false)
  }

  const handleActionAreaChange = (event: string) => {
    setSelectedAction(event);
    setShowListAction(false)
  };

  const handleReactionAreaChange = (event: string) => {
    setSelectedReaction(event);
    setShowListReaction(false)
  };


  const handleParamAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParamArea(event.target.value);
  };

  useEffect(() => {
    setListAction(["test1", "test2", "test3", "test4"])
  }, []);

  return (
    <div className='addComponent'>
      <div className='addComponentBody'>
        <span className='addComponentTitle'>Create Area</span>
        <input
          type="text"
          id="text-input"
          value={nameArea}
          onChange={handleNameAreaChange}
          placeholder="Name area"
          className='addComponentNameInput'
        />
        <div className='addComponentActionInput'>
          <span>{selectedAction}</span>
          <div className='addComponentActionLine'/>
          <img src={SelectInput} className='addComponentActionButton' onClick={() => handleClickActionList()}/>
          {showlistAction &&
            (
              <ul className='addComponentActionListArea'>
                {
                  listAction && listAction.map((item) =>
                    <li key={item} className='addComponentActionList' >
                      <span onClick={() => handleActionAreaChange(item)}>{item}</span>
                    </li>
                  )
                }
              </ul>
            )
          }
        </div>
        <div className='addComponentReactionInput'>
          <span>{selectedReaction}</span>
          <div className='addComponentReactionLine'/>
          <img src={SelectInput} className='addComponentReactionButton'  onClick={() => handleClickReactionList()}/>
          {showlistReaction &&
            (
              <ul className='addComponentReactionListArea'>
                {
                  listReaction && listReaction.map((item) =>
                    <li key={item} className='addComponentReactionList' >
                      <span onClick={() => handleReactionAreaChange(item)}>{item}</span>
                    </li>
                  )
                }
              </ul>
            )
          }
        </div>
        <input
          type="text"
          id="text-input"
          value={paramArea}
          onChange={handleParamAreaChange}
          placeholder="Reaction parameter"
          className='addComponentParamInput'
        />
      </div>
      <div className='addComponentButton'>
        <span className='addComponentButtonText'>Create</span>
      </div>
    </div>
  );
}

export default Add;
