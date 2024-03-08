import React from 'react';

const Naviagtion = ({ onRouteChange, isSignedIn }) => {
        if (isSignedIn) {
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signout')} className='f4 b ma3 link white dim pa3 pointer br-pill bg-light-purple shadow-5'>Sign Out</p>
                </nav>
            );
        } else {
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className='f4 b ma3 link white dim pa3 pointer br-pill bg-light-purple shadow-5'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='f4 b ma3 link white dim pa3 pointer br-pill bg-light-purple shadow-5'>Register</p>
                </nav>
            );
        }
}

export default Naviagtion;