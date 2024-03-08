import React from 'react';

const Naviagtion = ({ onRouteChange }) => {
    return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signin')} className='f4 b ma3 link white dim pa3 pointer br-pill bg-light-purple shadow-5'>Sign Out</p>
        </nav>
    );
}

export default Naviagtion;