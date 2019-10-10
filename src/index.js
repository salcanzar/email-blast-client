import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-toastify/dist/ReactToastify.css';
import * as serviceWorker from './serviceWorker';
import socketIO from 'socket.io-client'

let socket = socketIO("http://localhost:8080")

ReactDOM.render(<App socket={socket}/>, document.getElementById('root'));

serviceWorker.unregister();
