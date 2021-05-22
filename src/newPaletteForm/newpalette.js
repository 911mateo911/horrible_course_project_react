import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from 'react-color'
import { Button } from "@material-ui/core";
import DraggableColorbox from "./draggableColorbox";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const drawerWidth = 400;

const styles = theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    randColBtn: {
        backgroundColor: '#5262bc'
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    },
    content: {
        flexGrow: 1,
        height: 'calc(100vh - 64px)',
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    }
});

class NewPaletteForm extends Component {
    constructor() {
        super()
        this.state = {
            open: true,
            currentColor: 'teal',
            colors: [{ color: 'blue', name: 'blue' }],
            newColorName: '',
            newPaletteName: ''
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this)
        this.addNewColor = this.addNewColor.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex })
    }

    addNewColor() {
        const newColor = { color: this.state.currentColor, name: this.state.newColorName }
        this.setState({ colors: [...this.state.colors, newColor], newColorName: '' })
    }

    handleSubmit() {
        const newName = this.state.newPaletteName
        const newPalette = {
            paletteName: newName,
            id: newName.toLowerCase().replace(/ /g, '-'),
            colors: this.state.colors,
        }
        this.props.savePalette(newPalette)
        this.props.history.push('/')
    }

    removeColor(colorName) {
        this.setState({
            colors: this.state.colors.filter(col => col.name !== colorName)
        })
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
            return this.state.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        })
        ValidatorForm.addValidationRule('isColorUnique', (value) => {
            return this.state.colors.every(
                ({ color }) => color !== this.state.currentColor
            )
        })
        ValidatorForm.addValidationRule('isPaletteUnique', (value) => {
            return this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { classes } = this.props;
        const { open } = this.state;

        return (
            <div className={classes.root}>
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
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant='h6' color='inherit' noWrap>
                            Persistent drawer
                        </Typography>
                        <ValidatorForm onSubmit={this.handleSubmit} >
                            <TextValidator
                                onChange={this.handleChange}
                                label='Palette name'
                                name='newPaletteName'
                                value={this.state.newPaletteName}
                                validators={['required', 'isPaletteUnique']}
                                errorMessages={['Enter palette name', 'Name already taken']}
                            />
                            <Button
                                variant='contained'
                                color='primary'
                                type='submit'
                            >
                                Save Palette
                        </Button>
                        </ValidatorForm>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant='persistent'
                    anchor='left'
                    open={open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <Typography variant='h4' >
                        Design your palette
                    </Typography>
                    <div>
                        <Button variant='outlined' color='secondary' >
                            Clear Palette
                    </Button>
                        <Button className={classes.randColBtn} variant='contained' color='primary' >
                            Random Color
                    </Button>
                    </div>
                    <ChromePicker
                        color={this.state.currentColor}
                        onChangeComplete={this.updateCurrentColor}
                    />
                    <ValidatorForm onSubmit={this.addNewColor} >
                        <TextValidator
                            value={this.state.newColorName}
                            onChange={this.handleChange}
                            name='newColorName'
                            validators={['required', 'isColorNameUnique', 'isColorUnique']}
                            errorMessages={['Enter color name', 'Color name must be unique', 'Color already exists']}
                        />
                        <Button
                            variant='contained'
                            style={{ backgroundColor: this.state.currentColor }}
                            color='primary'
                            type='submit'>
                            Add Color
                    </Button>
                    </ValidatorForm>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open
                    })}
                >
                    <div className={classes.drawerHeader} />
                    {this.state.colors.map(col => <DraggableColorbox
                        name={col.name}
                        color={col.color}
                        key={col.name}
                        handleClick={() => this.removeColor(col.name)}
                    />)}
                </main>
            </div>
        );
    }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);