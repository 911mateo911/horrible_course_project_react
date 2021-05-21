import React from 'react'
import { withStyles } from '@material-ui/styles'

const styles = {
    root: {
        height: '25%',
        width: '20%',
        margin: '0 auto',
        display: 'inline-block',
        cursor: 'pointer',
        marginBottom: '-5px'
    }
}

function DraggableColorbox(props) {
    return (
        <div className={props.classes.root} style={{ backgroundColor: props.color }} >
            {props.name}
        </div>
    )
}

export default withStyles(styles)(DraggableColorbox)
