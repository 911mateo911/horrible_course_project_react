import React, { Component } from 'react'
import ColorBox from '../ColorBox/ColorBox'
import Navbar from '../Navbar/Navbar'
import './Palette.css'

export default class Palette extends Component {
    constructor() {
        super()
        this.state = {
            level: 500
        }
        this.changeLevel = this.changeLevel.bind(this)
    }
    changeLevel(level) {
        this.setState({ level })
    }
    render() {
        const { colors } = this.props.palette
        const { level } = this.state
        const colorBoxes = colors[level].map(color =>
            <ColorBox
                background={color.hex}
                name={color.name}
            />)
        return (
            <div className='palette' >
                <Navbar level={level} changeLevel={this.changeLevel} />
                <div className='palette-colors' >
                    {colorBoxes}
                </div>
                {/* Footer here */}
            </div>
        )
    }
}
