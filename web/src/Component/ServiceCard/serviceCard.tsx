import React from 'react';
import './serviceCard.css';
import Google from '../../Image/Google.png'

interface ServiceCardProps {
  name: string;
  status: string;
  user: string;
  image: string;
}

function ServiceCard(props: ServiceCardProps) {
  return (
    <div className='serviceCard'>
      <div className='serviceCardHeader'>
        <span className='serviceCardName'>
          {props.name}
        </span>
        <span className='serviceCardStatus'>
          {props.status}
        </span>
      </div>
      <div className='serviceCardBody'>
        <img src={props.image} className='serviceLogo'/>
        <span className='serviceCardUser'>
          {props.user}
        </span>
      </div>
    </div>
  );
}

export default ServiceCard;