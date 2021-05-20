import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import './ColorBox.css'
import { Link } from 'react-router-dom'
import chroma from 'chroma-js'
import { withStyles } from '@material-ui/styles'

const styles = {
    darkColor: {
        color: props => chroma(props.background).luminance() >= 0.4 ? 'rgba(0, 0, 0, 0.8)' : 'white'
    },
    lightColor: {
        color: props => chroma(props.background).luminance() <= 0.08 ? 'white' : 'rgba(0, 0, 0, 0.8)'
    }
}

class ColorBox extends Component {
    constructor() {
        super()
        this.state = { copied: false }
        this.changeCopyState = this.changeCopyState.bind(this)
    }

    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => {
                this.setState({ copied: false })
            }, 1200);
        })
    }

    render() {
        const { name, background, moreUrl, showLink, classes } = this.props
        const { copied: isCopied } = this.state
        const isLightColor = chroma(background).luminance() >= 0.4
        return (
            <div style={{ background }} className='colorBox' >
                <div style={{ background }}
                    className={`copy-overlay ${isCopied && 'show'}`} >
                </div>
                <div
                    className={`copy-msg ${isCopied && 'show'}`} >
                    <h1 className={`h1 ${isLightColor && 'dark-text'}`} >copied!</h1>
                    <p className={classes.lightColor} >{this.props.background}</p>
                </div>
                <div className='copy-container' >
                    <div className='box-content' >
                        <span className={classes.darkColor} >{name}</span>
                    </div>
                    <CopyToClipboard text={background} onCopy={this.changeCopyState} >
                        <button className={`copy-button ${isLightColor && 'dark-text'}`} >Copy</button>
                    </CopyToClipboard>
                </div>
                {showLink && (
                    <Link to={moreUrl} >
                        <span className={`see-more ${classes.lightColor}`} >More</span>
                    </Link>
                )}
            </div >
        )
    }
}

export default withStyles(styles)(ColorBox)