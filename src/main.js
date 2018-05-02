import React from 'react';
import  {render}  from 'react-dom';
import 'babel-polyfill';
import Root from './routes/Root';



render(
        <Root  />
    ,
    document.getElementById('root')
);


