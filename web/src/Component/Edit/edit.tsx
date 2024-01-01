import React, { useEffect } from 'react';
import './edit.css';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import SelectInput from '../../Image/SelectInput.png'

interface editProps {
  name: string;
  nameAction: string;
  nameReaction: string;
}

function Edit(props: editProps) {

  const [nameArea, setNameArea] = useState(props.name);
  const [selectedAction, setSelectedAction] = useState(props.nameAction);
  const [selectedReaction, setSelectedReaction] = useState(props.nameReaction);
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

  const handleCallActionList = () => {
    const storedToken = Cookies.get('token');
    axios.get(process.env.REACT_APP_SERVER_URL + "/" + storedToken + "/actions")
      .then(response => {
        setListAction((prevState: string[] | undefined) => [
          ...(prevState || []),
          ...response.data.map((item: { name: string }) => item.name)
        ]);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleCallReactionList = () => {
    const storedToken = Cookies.get('token');
    axios.get(process.env.REACT_APP_SERVER_URL + "/" + storedToken + "/reactions")
      .then(response => {
        setListReaction((prevState: string[] | undefined) => [
          ...(prevState || []),
          ...response.data.map((item: { name: string }) => item.name)
        ]);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    setNameArea(props.name)
    handleCallActionList()
    handleCallReactionList()
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
          <img src={SelectInput} className='editComponentActionButton' onClick={() => handleClickActionList()}/>
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
          <img src={SelectInput} className='editComponentReactionButton'  onClick={() => handleClickReactionList()}/>
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