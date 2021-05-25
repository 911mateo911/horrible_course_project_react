import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete'

const styles = {
    root: {
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '0.5rem',
        border: '1px solid black',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover svg': {
            opacity: 1
        }
    },
    colors: {
        height: '150px',
        width: '100%',
        borderRadius: '5px',
        backgroundColor: '#dae1e4',
        overflow: 'hidden'
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0',
        color: 'black',
        paddingTop: '0.5rem',
        fontSize: '.8rem',
        position: 'relative'
    },
    emoji: {
        backgroundColor: 'white',
        marginLeft: '0.5rem',
        fontSize: '1rem'
    },
    miniColor: {
        height: '25%',
        width: '20%',
        display: 'inline-block',
        margin: '0 auto',
        position: 'relative',
        marginBottom: '-5px'
    },
    deleteIcon: {
        color: 'white',
        backgroundColor: '#eb3d30',
        width: '20px',
        height: '20px',
        position: 'absolute',
        right: 0,
        top: 0,
        padding: '10px',
        zIndex: 10,
        opacity: 0
    }
}

class MiniPalette extends Component {
    constructor() {
        super()
        this.deletePalette = this.deletePalette.bind(this)
    }

    deletePalette(e) {
        e.stopPropagation()
        this.props.openDialog(this.props.id)
    }

    render() {
        const { classes, paletteName, emoji, colors, handleClick } = this.props
        const miniColorBoxes = colors.map(col => (
            <div
                className={classes.miniColor}
                style={{ backgroundColor: col.color }}
                key={col.name}
            />
        ))
        return (
            <div className={classes.root} onClick={handleClick} >
                <DeleteIcon
                    className={classes.deleteIcon}
                    style={{ transition: 'all 0.2s ease-in-out' }}
                    onClick={this.deletePalette}
                />
                <div className={classes.colors} >
                    {miniColorBoxes}
                </div>
                <h5 className={classes.title} >
                    {paletteName}
                    <span className={classes.emoji} >{emoji}</span>
                </h5>
            </div>
        )
    }
}

export default withStyles(styles)(MiniPalette)