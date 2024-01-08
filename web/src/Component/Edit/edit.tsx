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

  interface AreaItem {
    nameArea: string;
    nameAction: string;
    actionParameter: string;
    nameReaction: string;
    reactionParameter: string;
  }


  const [infoArea, setInfoArea] = useState<AreaItem | null>(null);

  const [nameArea, setNameArea] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedReaction, setSelectedReaction] = useState("");

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
    setListAction([])
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
    setListReaction([])
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

  const handleCallAreaInfo = async () => {
    try {
      const storedToken = Cookies.get('token');
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/" + storedToken + "/areas/" + props.name);
      await setInfoArea(await response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (infoArea === null) {
      handleCallAreaInfo()
    } else {
      setNameArea(infoArea.nameArea)
      setSelectedAction(infoArea.nameAction)
      setSelectedReaction(infoArea.nameReaction)
    }
    if (listAction === undefined) {
      handleCallActionList()
    }
    if (listReaction === undefined) {
      handleCallReactionList()
    }
  }, [infoArea]);

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
          <img src={SelectInput} className='editComponentActionButton' onClick={() => handleClickActionList()} alt="click action list"/>
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
          <img src={SelectInput} className='editComponentReactionButton'  onClick={() => handleClickReactionList()} alt="click reaction list"/>
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
