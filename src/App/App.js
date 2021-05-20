import React, { Component } from 'react'
import Palette from '../Palette/Palette'
import seedColors from './seedColors'
import { generatePalette } from '../ColorHelpers/ColorHelpers'
import { Route, Switch } from 'react-router-dom'
import PaletteList from '../PaletteList/PaletteList'
import './App.css'

class App extends Component {
  findPalette(id) {
    return seedColors.find(palette => palette.id === id)
  }
  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => <PaletteList palettes={seedColors} />} />
        <Route
          exact
          path='/palette/:id'
          render={(routeProps) => <Palette
            palette={generatePalette(this.findPalette(routeProps.match.params.id))}
          />}
        />
      </Switch>
      // <div className="App">
      //   <Palette palette={generatePalette(seedColors[4])} />
      // </div>
    );
  }
}

export default App;
