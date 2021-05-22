import React, { Component } from 'react'
import Palette from '../Palette/Palette'
import seedColors from './seedColors'
import { generatePalette } from '../ColorHelpers/ColorHelpers'
import { Route, Switch } from 'react-router-dom'
import PaletteList from '../PaletteList/PaletteList'
import SinglePalette from '../SinglePalette/Singlepalette'
import NewPalette from '../newPaletteForm/newpalette'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = { palettes: seedColors }
    this.savePalette = this.savePalette.bind(this)
    this.findPalette = this.findPalette.bind(this)
  }
  findPalette(id) {
    return this.state.palettes.find(palette => palette.id === id)
  }
  savePalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] })
  }
  render() {
    return (
      <Switch>
        <Route exact path='/' render={(routeProps) => <PaletteList palettes={this.state.palettes} {...routeProps} />} />
        <Route exact path='/palette/new' render={(routeProps) => <NewPalette
          {...routeProps}
          palettes={this.state.palettes}
          savePalette={this.savePalette} />}
        />
        <Route
          exact
          path='/palette/:id'
          render={(routeProps) => <Palette
            palette={generatePalette(this.findPalette(routeProps.match.params.id))}
          />}
        />
        <Route
          exact
          path='/palette/:paletteId/:colorId'
          render={(routeProps) => <SinglePalette
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
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
