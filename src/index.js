import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import {App} from './components';
import UserProviders from './providers/UserProviders';

ReactDOM.render(<UserProviders><BrowserRouter> <App/> </BrowserRouter></UserProviders>,document.getElementById('root'));

