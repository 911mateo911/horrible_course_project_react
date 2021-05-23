import React, { Component } from 'react'
import MiniPalette from '../MiniPalette/Minipalette'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'

const styles = {
    root: {
        backgroundColor: 'blue',
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    container: {
        width: '50%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    nav: {
        display: 'flex',
        width: '100%',
        fontFamily: 'Roboto',
        justifyContent: 'space-between',
        color: 'white',
        alignItems: 'center',
        '& a': {
            textDecoration: 'none',
            color: 'white',
            padding: '10px',
            backgroundColor: 'rgba(255,255,255,0.4)',
            borderRadius: '5px',
            fontFamily: 'Roboto'
        }
    },
    palettes: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3,30%)',
        gridGap: '5%'
    }
}

class PaletteList extends Component {
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`)
    }
    render() {
        const { palettes, classes, deletePalette } = this.props
        return (
            <div className={classes.root} >
                <div className={classes.container} >
                    <nav className={classes.nav} >
                        <h1>React Colors</h1>
                        <Link to="/palette/new" >Create palette</Link>
                    </nav>
                    <div className={classes.palettes} >
                        {palettes.map(p => <MiniPalette
                            {...p}
                            handleClick={() => this.goToPalette(p.id)}
                            key={p.id}
                            id={p.id}
                            deletePalette={deletePalette}
                        />)}
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList)