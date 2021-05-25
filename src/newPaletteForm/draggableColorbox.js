import React from 'react'
import { withStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete';
import chroma from 'chroma-js'
import { SortableElement } from 'react-sortable-hoc'
import sizes from '../sizes'

const styles = {
    root: {
        height: '25%',
        width: '20%',
        margin: '0 auto',
        display: 'inline-block',
        cursor: 'pointer',
        marginBottom: '-5px',
        position: 'relative',
        [sizes.down('lg')]: {
            width: '25%',
            height: '20%'
        },
        [sizes.down('md')]: {
            width: '50%',
            height: '10%'
        },
        [sizes.down('sm')]: {
            width: '100%',
            height: '5%'
        }
    },
    boxContent: {
        position: 'absolute',
        width: '100%',
        left: '0',
        bottom: '0',
        padding: '10px',
        color: props => chroma(props.color).luminance() >= 0.4 ? 'rgba(0, 0, 0, 0.8)' : 'white',
        fontSize: '11px',
        letterSpacing: '1px',
        boxSizing: 'border-box',
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'space-between'
    },
    deleteIcon: {
        '&:hover': {
            transform: 'scale(1.4)'
        },
        transition: '0.25s',
        color: props => chroma(props.color).luminance() >= 0.4 ? 'rgba(0, 0, 0, 0.8)' : 'white'
    }
}

const DraggableColorbox = SortableElement((props) => {
    const { classes, handleClick, name, color } = props
    return (
        <div className={classes.root} style={{ backgroundColor: color }} >
            <div className={classes.boxContent} >
                <span>{name}</span>
                <DeleteIcon
                    className={classes.deleteIcon}
                    onClick={handleClick}
                />
            </div>
        </div>
    )
})

export default withStyles(styles)(DraggableColorbox)
