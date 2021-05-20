import React from 'react'

export default function Palettefooter(props) {
    const { paletteName, emoji } = props
    return (
        <div>
            <footer className='palette-footer' >
                <div className='footer-text'>
                    {paletteName}<span>{emoji}</span>
                </div>
            </footer>
        </div>
    )
}
