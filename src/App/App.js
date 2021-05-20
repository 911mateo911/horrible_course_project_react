import React, { Component } from 'react'
import Palette from '../Palette/Palette'
import seedColors from './seedColors'
import { generatePalette } from '../ColorHelpers/ColorHelpers'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Palette palette={generatePalette(seedColors[4])} />
      </div>
    );
  }
}

export default App;
