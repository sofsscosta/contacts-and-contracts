import * as React from 'react'
import { Tabs, Container, Contacts, Contracts } from './components'
import './App.css';

const App = () => {
  return (
    <Container>
      <Tabs>
        <Contacts/>
        <Contracts/>
      </Tabs>
    </Container>
)}

export default App;
