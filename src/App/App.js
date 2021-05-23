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
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))
    this.state = { palettes: savedPalettes || seedColors }
    this.savePalette = this.savePalette.bind(this)
    this.findPalette = this.findPalette.bind(this)
    this.savePalette = this.savePalette.bind(this)
    this.deletePalette = this.deletePalette.bind(this)
  }
  findPalette(id) {
    return this.state.palettes.find(palette => palette.id === id)
  }
  deletePalette(id) {
    this.setState(st => ({
      palettes: st.palettes.filter(palette => palette.id !== id)
    }), this.syncLocalStorage)
  }
  savePalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] }, this.syncLocalStorage)
  }
  syncLocalStorage() {
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
  }
  render() {
    return (
      <Switch>
        <Route exact path='/' render={(routeProps) => <PaletteList
          palettes={this.state.palettes}
          {...routeProps}
          deletePalette={this.deletePalette}
        />}
        />
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
