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

  interface ParamItem {
    nameParam: string;
    typeParam: string;
    param: any;
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

  const [listParamAction, setListParamAction] = useState<ParamItem []>([]);
  const [listParamReaction, setListParamReaction] = useState<ParamItem []>([]);

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

  const handleActionAreaChange = async(event: string) => {
    setSelectedAction(event);
    setListParamAction([])
    try {
      const storedToken = Cookies.get('token');

      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/" + storedToken + "/actions/" + event);

      const allPropertyNames = Object.keys(response.data) as (keyof typeof response.data)[];

      const updatedList = allPropertyNames.map(async (key) => {
        const data = response.data[key];
        const variableType = typeof data;

        return {
          nameParam: String(key),
          typeParam: variableType,
          param: null
        };
      });

      const resolvedList = await Promise.all(updatedList);

      setListParamAction(await resolvedList);
    } catch (error) {
      console.error(error);
    }
      setShowListAction(false)
    };

  const handleReactionAreaChange = async(event: string) => {
    setSelectedReaction(event);
    setListParamReaction([])
    try {
      const storedToken = Cookies.get('token');

      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/" + storedToken + "/reactions/" + event);

      const allPropertyNames = Object.keys(response.data) as (keyof typeof response.data)[];

      const updatedList = allPropertyNames.map(async (key) => {
        const data = response.data[key];
        const variableType = typeof data;

        return {
          nameParam: String(key),
          typeParam: variableType,
          param: null
        };
      });

      const resolvedList = await Promise.all(updatedList);

      setListParamReaction(await resolvedList);
    } catch (error) {
      console.error(error);
    }
    setShowListReaction(false)
  };

  const handleParamActionChange = (event: React.ChangeEvent<HTMLInputElement>, nameParam: string) => {
    const updatedList = listParamAction.map(param => {
      if (param.nameParam === nameParam) {
        return {
          ...param,
          variableType: event.target.value,
        };
      }
      return param;
    });
    setListParamAction(updatedList);
  };

  const handleParamReactionChange = (event: React.ChangeEvent<HTMLInputElement>, nameParam: string) => {
    const updatedList = listParamReaction.map(param => {
      if (param.nameParam === nameParam) {
        return {
          ...param,
          variableType: event.target.value,
        };
      }
      return param;
    });
    setListParamReaction(updatedList);
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

  const handleUpdateArea = () => {
    const data = {
      nameArea: nameArea,
      nameAction: selectedAction,
      actionParameter: "",
      nameReaction: selectedReaction,
      reactionParameter: paramArea
    };
    console.log(data)
    const storedToken = Cookies.get('token');
    axios.put(process.env.REACT_APP_SERVER_URL + "/" + storedToken + "/areas", data)
    .then(response => {
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
      handleActionAreaChange(infoArea.nameAction)
      handleReactionAreaChange(infoArea.nameReaction)
    }
    if (listAction === undefined) {
      handleCallActionList()
    }
    if (listReaction === undefined) {
      handleCallReactionList()
    }
  }, [infoArea, handleCallAreaInfo, listAction, listReaction]);

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
          <span className='editComponentActionTitle'>{selectedAction}</span>
          <div className='editComponentActionLine'/>
          <img src={SelectInput} className='editComponentActionButton' onClick={() => handleClickActionList()} alt="click action list"/>
          {showlistAction &&
            (
              <ul className='editComponentActionListArea'>
                {
                  listAction && listAction.map((item) =>
                    <li key={item} className='editComponentActionList' >
                      <span className='editComponentActionListName' onClick={() => handleActionAreaChange(item)}>{item}</span>
                    </li>
                  )
                }
              </ul>
            )
          }
        </div>
        {listParamAction &&
        (
          <ul className='editComponentParamArea'>
            {
              listParamAction && listParamAction.map((item) =>
                <li key={item.nameParam} className='editComponentParamList' >
                  {item.typeParam === "string" &&
                    (
                      <input
                        type="text"
                        id="text-input"
                        value={item.param}
                        onChange={(event) => handleParamActionChange(event, item.nameParam)}
                        placeholder={item.nameParam}
                        className='editComponentParamInput'
                      />
                    )
                  }
                  {item.typeParam === "int" &&
                    (
                      <input
                        type="number"
                        id="number-input"
                        value={item.param}
                        onChange={(event) => handleParamActionChange(event, item.nameParam)}
                        placeholder={item.nameParam}
                      />
                    )
                  }
                  {item.typeParam === "boolean" &&
                    (
                      <input
                        type="checkbox"
                        id="checkbox-input"
                        value={item.param}
                        onChange={(event) => handleParamActionChange(event, item.nameParam)}
                        placeholder={item.nameParam}
                      />
                    )
                  }
                </li>
              )
            }
          </ul>)
        }
        <div className='editComponentReactionInput'>
          <span className='editComponentReactionTitle'>{selectedReaction}</span>
          <div className='editComponentReactionLine'/>
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
        {listParamReaction &&
        (
          <ul className='editComponentParamArea'>
            {
              listParamReaction && listParamReaction.map((item) =>
                <li key={item.nameParam} className='editComponentParamList' >
                  {item.typeParam === "string" &&
                    (
                      <input
                        type="text"
                        id="text-input"
                        value={item.param}
                        onChange={(event) => handleParamReactionChange(event, item.nameParam)}
                        placeholder={item.nameParam}
                        className='editComponentParamInput'
                      />
                    )
                  }
                  {item.typeParam === "int" &&
                    (
                      <input
                        type="number"
                        id="number-input"
                        value={item.param}
                        onChange={(event) => handleParamReactionChange(event, item.nameParam)}
                        placeholder={item.nameParam}
                      />
                    )
                  }
                  {item.typeParam === "boolean" &&
                    (
                      <input
                        type="checkbox"
                        id="checkbox-input"
                        value={item.param}
                        onChange={(event) => handleParamReactionChange(event, item.nameParam)}
                        placeholder={item.nameParam}
                      />
                    )
                  }
                </li>
              )
            }
          </ul>)
        }
      </div>
      <div className='editComponentButton'>
        <span className='editComponentButtonText' onClick={handleUpdateArea}>Edit</span>
      </div>
    </div>
  );
}

export default Edit;
