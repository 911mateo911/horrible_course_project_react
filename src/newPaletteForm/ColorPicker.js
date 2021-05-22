import React, { Component } from 'react'
import { ChromePicker } from 'react-color'
import { Button } from "@material-ui/core";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

export default class ColorPicker extends Component {
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
        const { paletteIsFull } = this.props
        const { newColorName, currentColor } = this.state
        return (
            <div>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={this.updateCurrentColor}
                />
                <ValidatorForm onSubmit={this.handleSubmit} >
                    <TextValidator
                        value={newColorName}
                        onChange={this.handleChange}
                        name='newColorName'
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['Enter color name', 'Color name must be unique', 'Color already exists']}
                    />
                    <Button
                        variant='contained'
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
