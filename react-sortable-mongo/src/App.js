import React from 'react'
import './App.css';
import SortableComponent from './Component/SortableComponent'

function App() {

  return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-4 offset-md-4'>
            <SortableComponent />
          </div>
        </div>
      </div>
    )
}

export default App;
