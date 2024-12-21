import React from 'react';
import './MainScreen.css'


function MainScreen(props) {
    return (
      <a href='/card/3/1'>
        <div className='square' style={{width: 35 + 'px', height: 35 + 'px', fontSize: 150 + '%'}}>
            12
        </div>
      </a>
    )
}

export default MainScreen;