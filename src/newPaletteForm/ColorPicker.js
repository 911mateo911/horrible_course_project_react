import React, { Component } from 'react'
import { ChromePicker } from 'react-color'
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const styles = {
    picker: {
        width: '100% !important',
        marginTop: '1rem'
    },
    mainContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addColor: {
        padding: '.7rem 2.1rem',
        marginTop: '1rem',
        fontSize: '1rem'
    },
    colorInput: {
        width: '100%',
        height: '70px'
    },
    form: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        '& div': {
            width: '100%'
        }
    }
}

class ColorPicker extends Component {
    constructor() {
        super()
        this.state = {
            newColorName: '',
            currentColor: '#3EC376'
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex })
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
            return this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        })
        ValidatorForm.addValidationRule('isColorUnique', (value) => {
            return this.props.colors.every(
                ({ color }) => color !== this.state.currentColor
            )
        })
    }

    handleSubmit() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        }
        this.props.addNewColor(newColor)
        this.setState({ newColorName: '', currentColor: this.getRandomColor() })
    }

    render() {
        const { paletteIsFull, classes } = this.props
        const { newColorName, currentColor } = this.state
        return (
            <div className={classes.mainContainer} >
                <ChromePicker
                    className={classes.picker}
                    color={currentColor}
                    onChangeComplete={this.updateCurrentColor}
                />
                <ValidatorForm className={classes.form} onSubmit={this.handleSubmit} >
                    <TextValidator
                        value={newColorName}
                        className={classes.colorInput}
                        onChange={this.handleChange}
                        name='newColorName'
                        margin='normal'
                        variant='filled'
                        placeholder='Color name'
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['Enter color name', 'Color name must be unique', 'Color already exists']}
                    />
                    <Button
                        variant='contained'
                        className={classes.addColor}
                        style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
                        color='primary'
                        disabled={paletteIsFull}
                        type='submit'>
                        {paletteIsFull ? 'Palette is full' : 'Add color'}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPicker)