import React, { useEffect } from 'react';
import './area.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [listArea] = useState<string []>();

  const handleClickAdd = () => {
    setShowEditArea(false)
    setShowAddArea(true)
  }

  const handleClickEdit = (item: string) => {
    setShowEditArea(true)
    setShowAddArea(false)
    setAreaSelected(item)
  }

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken == null)
      navigate("/")
  }, [navigate]);

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
            <Edit name={areaSelected}/>
          </div>
        )
      }
      <div className='areaHeader'>
        <span className='areaTitle'>
          Area
        </span>
        <img src={User} className='UserLogo' onClick={() => navigate("/Services")} alt="area"/>
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
      <img src={AddIcon} className='AddLogo' onClick={() => handleClickAdd()} alt="add"/>
    </div>
  );
}

export default Area;
