import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import './ColorBox.css'

export default class ColorBox extends Component {
    constructor() {
        super()
        this.state = { copied: false }
        this.changeCopyState = this.changeCopyState.bind(this)
    }

    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => {
                this.setState({ copied: false })
            }, 1300);
        })
    }

    render() {
        const { name, background } = this.props
        const { copied: isCopied } = this.state
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState} >
                <div style={{ background }} className='colorBox' >
                    <div style={{ background }}
                        className={`copy-overlay ${isCopied && 'show'}`} >
                    </div>
                    <div
                        className={`copy-msg ${isCopied && 'show'}`} >
                        <h1>copied!</h1>
                        <p>{this.props.background}</p>
                    </div>
                    <div className='copy-container' >
                        <div className='box-content' >
                            <span>{name}</span>
                        </div>
                        <button className='copy-button' >Copy</button>
                    </div>
                    <span className='see-more' >More</span>
                </div>
            </CopyToClipboard>
        )
    }
}
