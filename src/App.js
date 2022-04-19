import * as React from 'react'
import { Contacts, Contracts, ContactDetail } from './components'
import { Routes, Route } from 'react-router';
import './App.css';
import Header from './components/Header'
import { drawerWidth, headerHeight } from './components/constants';


const App = () => {
  return (
    <div style={{height: `100vh`}}>
      <Header drawerWidth={drawerWidth} headerHeight={headerHeight}/>
      <div style={{ height: `calc(100% - ${headerHeight}px)`, marginLeft: `${drawerWidth}px` }}>
        <Routes>
          <Route exact path="/" element={<Contacts/>} />
          <Route path="/contacts" element={<Contacts/>} />
          <Route path="/contacts/:id" element={<ContactDetail/>} />
          <Route path="/contracts" element={<Contracts/>} />
        </Routes>
      </div>
    </div>
)}

export default App;
