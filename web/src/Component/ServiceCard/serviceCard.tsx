import React, { useRef } from 'react';
import './serviceCard.css';

interface ServiceCardProps {
  name: string;
  status: string;
  user: string;
  image: string;
  link: string;
}

function ServiceCard(props: ServiceCardProps) {

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (formRef.current) {
      console.log('Formulaire soumis !');
      formRef.current.submit();
    }
  };

  return (
    
    <form ref={formRef} action={props.link} method="get">
      <div 
        className='serviceCard' 
        role='button'
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(e);
          }
        }} 
        onClick={handleSubmit}>
        <div className='serviceCardHeader'>
          <span className='serviceCardName'>
            {props.name}
          </span>
          <span className='serviceCardStatus'>
            {props.status}
          </span>
        </div>
        <div className='serviceCardBody'>
          <img src={props.image} className='serviceLogo' alt="service logo"/>
          <span className='serviceCardUser'>
            {props.user}
          </span>
        </div>
        {/* <input type="submit" value="Press to log in"/> */}
      </div>
    </form>
  );
}

export default ServiceCard;
