import React, { Component } from 'react'
import ColorBox from '../ColorBox/ColorBox'
import './Palette.css'

export default class Palette extends Component {
    render() {
        const colorBoxes = this.props.colors.map(color =>
            <ColorBox
                background={color.color}
                name={color.name}
            />)
        return (
            <div className='palette' >
                {/* Navbar here */}
                <div className='palette-colors' >
                    {colorBoxes}
                </div>
                {/* Footer here */}
            </div>
        )
    }
}
