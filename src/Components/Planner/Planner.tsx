import React, { useState } from 'react';
import Timepicker from '../Timepicker/Timepicker';
;

const Planner = () => {
    const [theTime, setThetime] = useState<string>('');


    return (

        <div>
          <h1>Parent Component</h1>

            <p>Data from child: {theTime}</p>
            <Timepicker
             onChange={ (data) => {
              setThetime(data)
            }}
            defaultValue='12:00:00' />
        </div>
    );
};

export default Planner;