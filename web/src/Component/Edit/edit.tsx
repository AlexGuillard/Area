import React, { useEffect } from 'react';
import './edit.css';
import { useState } from 'react';
import SelectInput from '../../Image/SelectInput.png'

interface editProps {
  name: string;
}

function Edit(props: editProps) {

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

  const handleActionAreaChange = (event: string) => {
    setSelectedAction(event);
  };

  const handleReactionAreaChange = (event: string) => {
    setSelectedReaction(event);
  };

  const handleParamAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParamArea(event.target.value);
  };

  useEffect(() => {
    setNameArea(props.name)
    setListAction(["test1", "test2", "test3", "test4", "aaaaaaaaa"])
    setListReaction(["test1", "test2"])
  }, []);

  return (
    <div className='editComponent'>
      <div className='editComponentBody'>
        <span className='editComponentTitle'>Edit Area</span>
        <input
          type="text"
          id="text-input"
          value={nameArea}
          onChange={handleNameAreaChange}
          placeholder="Name area"
          className='editComponentNameInput'
        />
        <div className='editComponentActionInput'>
          <span>{selectedAction}</span>
          <div className='editCompoentActionLine'/>
          <img src={SelectInput} className='editComponentActionButton' onClick={() => setShowListAction(!showlistAction)}/>
          {showlistAction &&
            (
              <ul className='editComponentActionListArea'>
                {
                  listAction && listAction.map((item) =>
                    <li key={item} className='editComponentActionList' >
                      <span onClick={() => handleActionAreaChange(item)}>{item}</span>
                    </li>
                  )
                }
              </ul>
            )
          }
        </div>
        <div className='editComponentReactionInput'>
          <span>{selectedReaction}</span>
          <div className='editCompoentReactionLine'/>
          <img src={SelectInput} className='editComponentReactionButton'  onClick={() => setShowListReaction(!showlistReaction)}/>
          {showlistReaction &&
            (
              <ul className='editComponentReactionListArea'>
                {
                  listReaction && listReaction.map((item) =>
                    <li key={item} className='editComponentReactionList' >
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
        <span className='addComponentButtonText'>Edit</span>
      </div>
    </div>
  );
}

export default Edit;