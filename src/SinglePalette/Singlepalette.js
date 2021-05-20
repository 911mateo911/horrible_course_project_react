import React, { Component } from 'react'
import ColorBox from '../ColorBox/ColorBox'
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../Palettefooter/Palettefooter'

export default class Singlepalette extends Component {
    constructor(props) {
        super(props)
        this.state = {
            format: 'hex'
        }
        this._shades = this.gatherShades(this.props.palette, this.props.colorId)
        this.changeFormat = this.changeFormat.bind(this)
    }
    changeFormat(e) {
        this.setState({ format: e })
    }
    gatherShades(palette, colorToFilter) {
        let shades = []
        const allColors = palette.colors
        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilter)
            )
        }
        return shades.slice(1)
    }
    render() {
        const { paletteName, emoji, id } = this.props.palette
        const colorBoxes = this._shades.map(col => <ColorBox
            key={col.name}
            name={col.name}
            background={col.[this.state.format]}
            showLink={false}
        />)
        return (
            <div className='singleColor palette' >
                <Navbar
                    handleChange={this.changeFormat}
                    showAllColors={false}
                />
                <div className='palette-colors' >
                    {colorBoxes}
                    <div className='go-back colorBox' >
                        <Link to={`/palette/${id}`} className='back-btn' >Go Back</Link>
                    </div>
                </div>
                <Footer paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}
