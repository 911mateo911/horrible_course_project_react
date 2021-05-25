import React, { Component } from 'react'
import MiniPalette from '../MiniPalette/Minipalette'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import sizes from '../sizes'
import bg from '../../src/endless.svg'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'

const styles = {
    '@global': {
        '.fade-exit': {
            opacity: 1
        },
        '.fade-exit-active': {
            opacity: 0,
            transition: 'opacity 0.5s ease-out'
        }
    },
    root: {
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#330033',
        backgroundImage: `url(${bg})`,
        overflowY: 'scroll'
    },
    container: {
        width: '50%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        [sizes.down('lg')]: {
            width: '90%'
        }
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
        gridGap: '5%',
        [sizes.down('sm')]: {
            gridTemplateColumns: 'repeat(1,100%)'
        }
    }
}

class PaletteList extends Component {
    constructor() {
        super()
        this.state = {
            openDeleteDialog: false,
            deleteId: ''
        }
        this.openDialog = this.openDialog.bind(this)
        this.closeDialog = this.closeDialog.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`)
    }
    openDialog(id) {
        this.setState({ openDeleteDialog: true, deleteId: id })
    }
    closeDialog() {
        this.setState({ openDeleteDialog: false, deleteId: '' })
    }
    handleDelete() {
        this.props.deletePalette(this.state.deleteId)
        this.closeDialog()
    }
    render() {
        const { palettes, classes } = this.props
        const { openDeleteDialog } = this.state
        return (
            <div className={classes.root} >
                <div className={classes.container} >
                    <nav className={classes.nav} >
                        <h1>React Colors</h1>
                        <Link to="/palette/new" >Create palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes} >
                        {palettes.map(p =>
                            <CSSTransition
                                key={p.id}
                                classNames='fade'
                                timeout={500}
                            >
                                <MiniPalette
                                    {...p}
                                    handleClick={() => this.goToPalette(p.id)}
                                    key={p.id}
                                    id={p.id}
                                    openDialog={this.openDialog}
                                />
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </div>
                <Dialog open={openDeleteDialog} onClose={this.closeDialog} aria-labelledby='delete-dialog-title' >
                    <DialogTitle id='delete-dialog-title' >Delete this palette?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete} >
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }} >
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>Delete</ListItemText>
                        </ListItem>
                        <ListItem button onClick={this.closeDialog}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>Cancel</ListItemText>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList)