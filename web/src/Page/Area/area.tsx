import React, { useEffect } from 'react';
import './area.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import User from '../../Image/User.png'
import AddIcon from '../../Image/AddIcon.png'
import AreaCard from '../../Component/AreaCard/areaCard'
import Add from '../../Component/Add/add';
import Edit from '../../Component/Edit/edit';

function Area() {

  const navigate = useNavigate();

  const [showAddArea, setShowAddArea] = useState(false);
  const [showEditArea, setShowEditArea] = useState(false);
  const [areaSelected, setAreaSelected] = useState("");
  const [actionSelected, setActionSelected] = useState("");
  const [reactionSelected, setReactionSelected] = useState("");
  const [listArea, setListArea] = useState<string []>();
  const [listselectedAction, setListSelectedAction] = useState<string []>();
  const [listselectedReaction, setListSelectedReaction] = useState<string []>();

  const handleClickAdd = () => {
    setShowEditArea(false)
    setShowAddArea(true)
  }

  const handleClickEdit = (item: string) => {
    setShowEditArea(true)
    setShowAddArea(false)
    setAreaSelected(item)
    setActionSelected("")
    setReactionSelected("")
  }

  const handleCallAreaList = () => {
    const storedToken = Cookies.get('token');
    console.log(storedToken)
    axios.get(process.env.REACT_APP_SERVER_URL + "/" + storedToken + "/areas")
      .then(response => {
        console.log(response.data)
        setListArea((prevState: string[] | undefined) => [
          ...(prevState || []),
          ...response.data.map((item: { nameArea: string }) => item.nameArea)
        ]);
        setListSelectedAction((prevState: string[] | undefined) => [
          ...(prevState || []),
          ...response.data.map((item: { nameAction: string }) => item.nameAction)
        ]);
        setListSelectedReaction((prevState: string[] | undefined) => [
          ...(prevState || []),
          ...response.data.map((item: { nameReaction: string }) => item.nameReaction)
        ]);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken == null)
      navigate("/")
    handleCallAreaList()
  }, []);

  return (
    <div className='areaBody'>
      {showAddArea &&
        (
          <div className='areaComponentArea'>
            <div className='areaComponentBack' onClick={() => setShowAddArea(false)} />
            <Add />
          </div>
        )
      }
      {showEditArea &&
        (
          <div className='areaComponentArea'>
            <div className='areaComponentBack' onClick={() => setShowEditArea(false)} />
            <Edit name={areaSelected} nameAction={actionSelected} nameReaction={reactionSelected}/>
          </div>
        )
      }
      <div className='areaHeader'>
        <span className='areaTitle'>
          Area
        </span>
        <img src={User} className='UserLogo' onClick={() => navigate("/Services")}/>
      </div>
      <ul className='areaList'>
        {
          listArea && listArea.map((item) =>
            <li key={item} className='areaCardArea'>
              <div onClick={() => handleClickEdit(item)}>
                <AreaCard name={item}/>
              </div>
            </li>
          )
        }
      </ul>
      <img src={AddIcon} className='AddLogo' onClick={() => handleClickAdd()}/>
    </div>
  );
}

export default Area;