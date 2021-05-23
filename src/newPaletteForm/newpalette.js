import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ColorPicker from './ColorPicker'
import { Button } from "@material-ui/core";
import DraggableColorList from './DraggableColorList'
import { arrayMove } from 'react-sortable-hoc'
import PaletteFormNav from './PaletteFormNav'
import { DRAWER_WIDTH as drawerWidth } from '../constants'

const styles = theme => ({
    root: {
        display: "flex"
    },
    randColBtn: {
        backgroundColor: '#5262bc'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
        display: 'flex',
        alignItems: 'center'
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
        width: '100%'
    },
    content: {
        flexGrow: 1,
        height: 'calc(100vh - 64px)',
        padding: 0,
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
    },
    container: {
        height: '100%',
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonCont: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '1rem'
    },
    button: {
        width: '45%'
    }
});

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            currentColor: 'teal',
            colors: this.props.palettes[0].colors
        }
        this.addNewColor = this.addNewColor.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.removeColor = this.removeColor.bind(this)
        this.clearColors = this.clearColors.bind(this)
        this.addRandColor = this.addRandColor.bind(this)
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    clearColors() {
        this.setState({ colors: [] })
    }

    addNewColor(newColor) {
        this.setState({ colors: [...this.state.colors, newColor], newColorName: '' })
    }

    addRandColor() {
        const allColors = this.props.palettes.map(p => p.colors).flat()
        const i = Math.floor(Math.random() * allColors.length)
        const randomColor = allColors[i]
        this.setState({ colors: [...this.state.colors, randomColor] })
    }

    handleSubmit(newPalette) {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-')
        newPalette.colors = this.state.colors
        this.props.savePalette(newPalette)
        this.props.history.push('/')
    }

    removeColor(colorName) {
        this.setState({
            colors: this.state.colors.filter(col => col.name !== colorName)
        })
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex),
        }))
    };

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, colors } = this.state;
        const paletteIsFull = colors.length >= maxColors

        return (
            <div className={classes.root}>
                <PaletteFormNav
                    open={open}
                    palettes={palettes}
                    handleDrawerOpen={this.handleDrawerOpen}
                    handleSubmit={this.handleSubmit}
                />
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
                    <div className={classes.container} >
                        <Typography variant='h4' >
                            Design your palette
                    </Typography>
                        <div className={classes.buttonCont} >
                            <Button
                                onClick={this.clearColors}
                                variant='outlined'
                                color='secondary'
                                className={classes.btn}
                            >
                                Clear Palette
                    </Button>
                            <Button
                                disabled={paletteIsFull}
                                onClick={this.addRandColor}
                                className={classes.randColBtn}
                                variant='contained'
                                color='primary'
                            >
                                Random Color
                    </Button>
                        </div>
                        <ColorPicker
                            paletteIsFull={paletteIsFull}
                            addNewColor={this.addNewColor}
                            colors={colors}
                        />
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList
                        colors={colors}
                        axis='xy'
                        onSortEnd={this.onSortEnd}
                        removeColor={this.removeColor}
                    />
                </main>
            </div>
        );
    }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);