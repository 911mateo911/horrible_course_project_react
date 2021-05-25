import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

export default class PaletteMetaForm extends Component {
    constructor() {
        super()
        this.state = {
            stage: 'form',
            newPaletteName: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.showEmojiPicker = this.showEmojiPicker.bind(this)
        this.savePalette = this.savePalette.bind(this)
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

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    showEmojiPicker() {
        this.setState({ stage: 'emoji' })
    }

    savePalette(emoji) {
        const newPalette = {
            paletteName: this.state.newPaletteName,
            emoji: emoji.native
        }
        this.props.handleSubmit(newPalette)
        this.setState({ stage: '' })
    }

    render() {
        const { newPaletteName } = this.state
        const { hideForm } = this.props
        return (
            <div>
                <Dialog onClose={hideForm} open={this.state.stage === 'emoji'}>
                    <DialogTitle id="form-dialog-title">Choose a palette emoji</DialogTitle>
                    <Picker
                        title='Pick a palette emoji'
                        onSelect={this.savePalette}
                    />
                </Dialog>
                <Dialog open={this.state.stage === 'form'} onClose={hideForm} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Choose a palette name</DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker} >
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for your new beatiful palette.Make sure it is unique
                        </DialogContentText>
                            <TextValidator
                                onChange={this.handleChange}
                                label='Palette name'
                                name='newPaletteName'
                                value={newPaletteName}
                                fullWidth
                                margin='normal'
                                validators={['required', 'isPaletteUnique']}
                                errorMessages={['Enter palette name', 'Name already taken']} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={hideForm} color="primary">
                                Cancel
                        </Button>
                            <Button
                                variant='contained'
                                color='primary'
                                type='submit'>
                                Save Palette
                        </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        )
    }
}
