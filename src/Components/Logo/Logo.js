import React from 'react';
import { Tilt } from 'react-tilt';
import face from './face-scan.png'
import './Logo.css';



const Logo = () => {
    return (
    <div className='ma4 mt0'>
        <Tilt className="Tilt br2 shadow-2" options={{ max : 55}} style={{ height: 150, width: 150 }}>
        <div className='Tilt pa3'><img src={face} alt='logo'/></div>
        </Tilt>
    </div>
    );
}

export default Logo;