import React, { Component } from "react";
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from 'react-router-dom'
import { Button } from "@material-ui/core";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

export default class PaletteFormNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newPaletteName: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
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
        const { newPaletteName } = this.state
        const { open, classes } = this.props;
        return (
            <div>
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
                            <MenuIcon />
                        </IconButton>
                        <Typography variant='h6' color='inherit' noWrap>
                            Persistent drawer
                        </Typography>
                        <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)} >
                            <TextValidator
                                onChange={this.handleChange}
                                label='Palette name'
                                name='newPaletteName'
                                value={newPaletteName}
                                validators={['required', 'isPaletteUnique']}
                                errorMessages={['Enter palette name', 'Name already taken']}
                            />
                            <Link
                                style={{ textDecoration: 'none' }}
                                to='/'
                            >
                                <Button
                                    variant='outlined'
                                    color='secondary'
                                >Go back</Button>
                            </Link>
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
            </div>
        )
    }
}
