import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createDeck } from '../../api/decks'
import messages from '../Auth/AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreateDeck extends Component {
  constructor () {
    super()

    this.state = {
      deckName: ''
    }
  }

  handleChange = event => {
    this.setState({
    [event.target.name]: event.target.value
    })
  }

  onCreateDeck = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props
    createDeck(user, this.state)
    .then(() => {
      msgAlert({
        heading: 'Success!',
        message: messages.deckCreateSuccess,
        variant: 'success'
      })
    })
    .then(() => history.push('/welcome'))
    .catch(error => {
      msgAlert({
        heading: 'Failed to create a new deck',
        message: messages.deckCreateFailure,
        variant: 'danger'
      })
    })
  }

  cancel = () => {
    const { history } = this.props
    history.push('/welcome')
  }

render () {
  const { newDeckName } = this.state

  return(
    <div>
      <div className='editDeck-form row'>
        <div className='form-wrapper2'>
          <h3>Create New Deck</h3>
          <Form onSubmit={this.onCreateDeck}>
            <Form.Group controlId='deckName'>
              <Form.Label>Deck Name:</Form.Label>
              <Form.Control
                required
                name='deckName'
                value={newDeckName}
                type='text'
                placeholder='Enter deck name'
                onChange={this.handleChange}
              />
              </Form.Group>
              <Button
                className='button-auth2'
                variant='primary'
                type='submit'
              >
                Add Deck
              </Button>
              <Button
                className='cancel-button'
                variant='secondary'
                type='button'
                onClick={this.cancel}
              >
                Cancel
              </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
}

export default withRouter(CreateDeck)
