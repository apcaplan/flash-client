import React, { Component } from 'react'
import './cards.css'
import { withRouter, Link } from 'react-router-dom'
import { createCard } from '../../api/decks'
import messages from '../Auth/AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// stateful component to add card to database
class AddCard extends Component {
  constructor() {
    super()

    this.state = {
      cardFront: '',
      cardBack: '',
      deck: ''
    }
  }

  // handlechange event to target data
  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

// prevent page from reloading, api call
addCard = event => {
  event.preventDefault()

  const { msgAlert, history, user } = this.props
  createCard(user, { ...this.state})
  .then(() => {
    msgAlert({
      heading: 'Success!',
      message: messages.cardCreateSuccess,
      variant: 'success'
    })
  })
  .then(() => history.push(`/decks/${this.state.deck}/cards`))
  .catch(error => {
    msgAlert({
      heading: 'Failed to create a new card',
      message: messages.cardCreateFailure,
      variant: 'danger'
    })
  })
}

componentDidMount() {
  this.setState({
    deck: this.props.match.params.id
  })
}

  render () {
    const { cardFront, cardBack } = this.state
    // const { history } = this.props

    return (
      <div className='wrapper'>
        <div className='backHomeIcon'>
          <Link to={ `/decks/${this.state.deck}/cards` }>
            <FontAwesomeIcon className='go-back' icon='times-circle' size='2x' />
          </Link>
        </div>
        <div className='card-form row'>
          <div className='form-wrapper3'>
            <h3>Create New Card</h3>
            <Form onSubmit={this.addCard}>
              <Form.Group className='card-input' controlId="front">
                <Form.Label>Term / Front of card</Form.Label>
                <Form.Control
                  required
                  as='textarea'
                  rows='2'
                  cols='80'
                  name='cardFront'
                  value={cardFront}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group className='card-input' controlId="back">
                <Form.Label>Definition / Back of card</Form.Label>
                <Form.Control
                  required
                  as='textarea'
                  rows='2'
                  cols='80'
                  name='cardBack'
                  value={cardBack}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                className='button-edit2'
                variant='primary'
                type='submit'
              >
              Add to deck
              </Button>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AddCard)
