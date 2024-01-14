import React, { useEffect } from 'react';
import './add.css';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import SelectInput from '../../Image/SelectInput.png'
import GoogleIcon from '../../Image/Google.png'
import GithubIcon from '../../Image/Github.png'
import SpotifyIcon from '../../Image/Spotify.png'
import DiscordIcon from '../../Image/Discord.png'
import ClockIcon from '../../Image/Clock.png'
import WeatherIcon from '../../Image/Weather.png'

function GetIcon(type: string) {
  const iconMap: { [key: string]: string } = {
    "GOOGLE": GoogleIcon,
    "GITHUB": GithubIcon,
    "SPOTIFY": SpotifyIcon,
    "DISCORD": DiscordIcon,
    "TIME": ClockIcon,
    "WEATHER": WeatherIcon
  }

  if (!iconMap[type]) {
    return GoogleIcon
  }
  return iconMap[type]
}

function Add(props: {refreshAreas: () => void, closeAddArea: () => void}) {

  interface ParamItem {
    nameParam: string;
    typeParam: string;
    param: any;
  }

  interface Action {
    name: string;
    description: string;
    typeService: string;
  }

  interface Reaction {
    name: string;
    description: string;
    typeService: string;
  }

  const [nameArea, setNameArea] = useState("");
  const [selectedAction, setSelectedAction] = useState("Action");
  const [selectedReaction, setSelectedReaction] = useState("Reaction");
  const [showlistAction, setShowListAction] = useState(false);
  const [showlistReaction, setShowListReaction] = useState(false);
  const [listAction, setListAction] = useState<Action []>();
  const [listReaction, setListReaction] = useState<Reaction []>();

  const [listParamAction, setListParamAction] = useState<ParamItem []>([]);
  const [listParamReaction, setListParamReaction] = useState<ParamItem []>([]);

  const [modelParamAction, setModelParamAction] = useState<any>([])
  const [modelParamReaction, setModelParamReaction] = useState<any>([])

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
  
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/actions/" + event, {
          headers: {
            token: storedToken
          }
        });
  
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
        setModelParamAction(await response.data)
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
  
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/reactions/" + event, {
          headers: {
            token: storedToken
          }
        });
  
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
        setModelParamReaction(await response.data)
      } catch (error) {
        console.error(error);
      }
      setShowListReaction(false)
    };

    const handleParamActionChange = (event: React.ChangeEvent<HTMLInputElement>, nameParam: string) => {
      const updatedList = listParamAction.map(param => {
        if (param.nameParam === nameParam) {
          if (param.typeParam === "boolean") {
            if (param.param === "") {
              return {
                ...param,
                param: true
              }
            }
            return {
              ...param,
              param: !param.param
            }
          } else {
            return {
              ...param,
              param: event.target.value,
            };
          }
        }
        return param;
      });
  
      setListParamAction(updatedList);
    };

    const handleParamReactionChange = (event: React.ChangeEvent<HTMLInputElement>, nameParam: string) => {
      const updatedList = listParamReaction.map(param => {
        if (param.nameParam === nameParam) {
          if (param.typeParam === "boolean") {
            if (param.param === "") {
              return {
                ...param,
                param: true
              }
            }
            return {
              ...param,
              param: !param.param
            }
          } else {
            return {
              ...param,
              param: event.target.value,
            };
          }
        }
        return param;
      });
  
      setListParamReaction(updatedList);
    };
  const handleCreateArea = () => {
    for (var i = 0; i < listParamAction.length; i++) {
      if (listParamAction[i].typeParam === "number") {
        modelParamAction[listParamAction[i].nameParam] = Number(listParamAction[i].param)
      } else if (listParamAction[i].typeParam === "string"){
        modelParamAction[listParamAction[i].nameParam] = listParamAction[i].param
      } else if (listParamAction[i].typeParam === "boolean"){
        modelParamAction[listParamAction[i].nameParam] = Boolean(listParamAction[i].param)
      }
    }
  
    for (var y = 0; y < listParamReaction.length; y++) {
      if (listParamReaction[y].typeParam === "number") {
        modelParamReaction[listParamReaction[y].nameParam] = Number(listParamReaction[y].param)
      } else if (listParamReaction[i].typeParam === "string"){
        modelParamReaction[listParamReaction[y].nameParam] = listParamReaction[y].param
      } else if (listParamReaction[i].typeParam === "boolean"){
        modelParamReaction[listParamReaction[y].nameParam] = Boolean(listParamReaction[y].param)
      }
    }

    const data = {
      nameArea: nameArea,
      nameAction: selectedAction,
      actionParameter: modelParamAction,
      nameReaction: selectedReaction,
      reactionParameter: modelParamReaction
    };
    console.log(data)
    const storedToken = Cookies.get('token');
    axios.post(process.env.REACT_APP_SERVER_URL + "/areas", data, {
      headers: {
        token: storedToken
      }
    })
    .then(response => {
      props.refreshAreas();
      props.closeAddArea();
    })
    .catch(error => {
      console.error(error);
    });
  }

  useEffect(() => {
    const handleCallActionList = () => {
      const storedToken = Cookies.get('token');
      axios.get(process.env.REACT_APP_SERVER_URL + "/actions", {
        headers: {
          token: storedToken
        }
      })
        .then(response => {
          setListAction((prevState: Action[] | undefined) => [
            ...(prevState || []),
            ...response.data.map((item: Action) => item)
          ]);
        })
        .catch(error => {
          console.error(error);
        });
    }

    const handleCallReactionList = () => {
      const storedToken = Cookies.get('token');
      axios.get(process.env.REACT_APP_SERVER_URL + "/reactions", {
        headers: {
          token: storedToken
        }
      })
        .then(response => {
          setListReaction((prevState: Reaction[] | undefined) => [
            ...(prevState || []),
            ...response.data.map((item: Reaction) => item)
          ]);
        })
        .catch(error => {
          console.error(error);
        });
    }

    handleCallActionList()
    handleCallReactionList()
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
          <span className='addComponentActionTitle'>{selectedAction}</span>
          <div className='addComponentActionLine'/>
          <img src={SelectInput} className='addComponentActionButton' onClick={() => handleClickActionList()} alt="click action list"/>
          {showlistAction &&
            (
              <ul className='addComponentActionListArea'>
                {
                  listAction && listAction.map((item) =>
                    <li key={item.name} className='addComponentActionList' >
                      <img src={GetIcon(item.typeService)} className='addComponentListIcon' alt="icon"/>
                      <span className='addComponentActionListName' onClick={() => handleActionAreaChange(item.name)}>{item.name}</span>
                    </li>
                  )
                }
              </ul>
            )
          }
        </div>
        {listParamAction &&
        (
          <ul className='addComponentParamArea'>
            {
              listParamAction && listParamAction.map((item) =>
                <li key={item.nameParam} className='addComponentParamList' >
                  {item.typeParam === "string" &&
                    (
                      <input
                        type="text"
                        id="text-input"
                        value={item.param}
                        onChange={(event) => handleParamActionChange(event, item.nameParam)}
                        placeholder={item.nameParam}
                        className='addComponentParamInput'
                      />
                    )
                  }
                  {item.typeParam === "number" &&
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
                      <div>
                        <span className="addComponentNameParam">{item.nameParam}</span>
                        <input
                          type="checkbox"
                          id="checkbox-input"
                          value={item.param}
                          onChange={(event) => handleParamActionChange(event, item.nameParam)}
                          placeholder={item.nameParam}
                          className='addComponentParamBoolean'
                        />
                      </div>
                    )
                  }
                </li>
              )
            }
          </ul>)
        }
        <div className='addComponentReactionInput'>
          <span className='addComponentReactionTitle'>{selectedReaction}</span>
          <div className='addComponentReactionLine'/>
          <img src={SelectInput} className='addComponentReactionButton'  onClick={() => handleClickReactionList()} alt="click reaction list"/>
          {showlistReaction &&
            (
              <ul className='addComponentReactionListArea'>
                {
                  listReaction && listReaction.map((item) =>
                    <li key={item.name} className='addComponentReactionList' >
                      <img src={GetIcon(item.typeService)} className='addComponentListIcon' alt="icon"/>
                      <span onClick={() => handleReactionAreaChange(item.name)}>{item.name}</span>
                    </li>
                  )
                }
              </ul>
            )
          }
        </div>
        {listParamReaction &&
        (
          <ul className='addComponentParamArea'>
            {
              listParamReaction && listParamReaction.map((item) =>
                <li key={item.nameParam} className='addComponentParamList' >
                  {item.typeParam === "string" &&
                    (
                      <input
                        type="text"
                        id="text-input"
                        value={item.param}
                        onChange={(event) => handleParamReactionChange(event, item.nameParam)}
                        placeholder={item.nameParam}
                        className='addComponentParamInput'
                      />
                    )
                  }
                  {item.typeParam === "number" &&
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
      <div className='addComponentButton' onClick={handleCreateArea}>
        <span className='addComponentButtonText'>Create</span>
      </div>
    </div>
  );
}

export default Add;
