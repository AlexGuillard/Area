import React from 'react';
import './areaCard.css';

interface AreaCardProps {
  name: string;
}

function AreaCard(props: AreaCardProps) {
  return (
    <div className='areaCardBody'>
      <span className='areaCardName'>
        {props.name}
      </span>
    </div>
  );
}

export default AreaCard;