import React, { Component } from 'react'
import ColorBox from '../ColorBox/ColorBox'
import Navbar from '../Navbar/Navbar'
import './Palette.css'
import Footer from '../Palettefooter/Palettefooter'

export default class Palette extends Component {
    constructor() {
        super()
        this.state = {
            level: 500,
            format: 'hex'
        }
        this.changeLevel = this.changeLevel.bind(this)
        this.changeFormat = this.changeFormat.bind(this)
    }
    changeLevel(level) {
        this.setState({ level })
    }
    changeFormat(e) {
        this.setState({ format: e })
    }
    render() {
        const { colors, paletteName, emoji, id } = this.props.palette
        const { level, format } = this.state
        const colorBoxes = colors[level].map(color =>
            <ColorBox
                background={color[format]}
                name={color.name}
                key={color.id}
                showLink
                moreUrl={`/palette/${id}/${color.id}`}
            />)
        return (
            <div className='palette' >
                <Navbar
                    level={level}
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat}
                    showAllColors
                />
                <div className='palette-colors' >
                    {colorBoxes}
                </div>
                <Footer paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}
