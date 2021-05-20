import React, { Component } from 'react'
import ColorBox from '../ColorBox/ColorBox'
import Navbar from '../Navbar/Navbar'
import './Palette.css'

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
        const { colors, paletteName, emoji } = this.props.palette
        const { level, format } = this.state
        const colorBoxes = colors[level].map(color =>
            <ColorBox
                background={color[format]}
                name={color.name}
                key={color.id}
            />)
        return (
            <div className='palette' >
                <Navbar
                    level={level}
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat}
                />
                <div className='palette-colors' >
                    {colorBoxes}
                </div>
                <footer className='palette-footer' >
                    <div className='footer-text'>
                        {paletteName}<span>{emoji}</span>
                    </div>
                </footer>
            </div>
        )
    }
}
