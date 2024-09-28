import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Scorelist from './Scorelist.jsx'
import CuurentScore from './CurrentScore.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <CuurentScore/>
    <Scorelist/> */}
  </React.StrictMode>,
)
