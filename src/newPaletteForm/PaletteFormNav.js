import React, { Component } from "react";
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import { Link } from 'react-router-dom'
import { Button } from "@material-ui/core";
import PaletteMetaForm from './PaletteMetaForm'
import { DRAWER_WIDTH as drawerWidth } from '../constants'

const styles = theme => ({
    root: {
        display: 'flex'
    },
    hide: {
        display: "none"
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '64px',
        alignItems: 'center'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20
    },
    navBtns: {
        marginRight: '1rem'
    },
    btn: {
        margin: '10px'
    }
})

class PaletteFormNav extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            formShowing: false
        }
        this.hideForm = this.hideForm.bind(this)
        this.showForm = this.showForm.bind(this)
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    showForm() {
        this.setState({ formShowing: true })
    }

    hideForm() {
        this.setState({ formShowing: false })
    }

    render() {
        const { open, classes, palettes, handleSubmit } = this.props;
        return (
            <div className={classes.root} >
                <CssBaseline />
                <AppBar
                    position='fixed'
                    color='default'
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color='inherit'
                            aria-label='Open drawer'
                            onClick={this.props.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}>
                            <AddToPhotosIcon />
                        </IconButton>
                        <Typography variant='h6' color='inherit' noWrap>
                            Create a new Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns} >
                        <Button
                            variant="contained"
                            className={classes.btn}
                            color="primary"
                            onClick={this.showForm}
                        >
                            Save
                        </Button>
                        <Link
                            className={classes.btn}
                            style={{ textDecoration: 'none' }}
                            to='/'>
                            <Button
                                variant='outlined'
                                color='secondary'
                            >Go back
                            </Button>
                        </Link>
                    </div>
                </AppBar>
                {this.state.formShowing && (
                    <PaletteMetaForm
                        palettes={palettes}
                        handleSubmit={handleSubmit}
                        hideForm={this.hideForm}
                    />
                )}
            </div>
        )
    }
}

export default withStyles(styles)(PaletteFormNav)