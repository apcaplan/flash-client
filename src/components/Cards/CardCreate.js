import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createCard } from '../../api/decks'
import messages from '../Auth/AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
    console.error(error)
    console.log(this.state)
    console.log(this.props)
    msgAlert({
      heading: 'Failed to create a new card',
      message: messages.cardCreateFailure,
      variant: 'danger'
    })
  })
}

componentDidMount() {
  console.log(this.props)
  this.setState({
    deck: this.props.match.params.id
  })
}

  render () {
    const { cardFront, cardBack } = this.state
    const { history } = this.props

    return (
              <Form onSubmit={this.addCard}>
                <Form.Group controlId="front">
                  <Form.Label>Term / Front of card</Form.Label>
                  <Form.Control
                    required
                    as='textarea'
                    rows='2'
                    name='cardFront'
                    value={cardFront}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="back">
                  <Form.Label>Definition / Back of card</Form.Label>
                  <Form.Control
                    required
                    as='textarea'
                    rows='2'
                    name='cardBack'
                    value={cardBack}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button
                  className='create-button'
                  variant='primary'
                  type='submit'
                >
                Add to deck
                </Button>
                <Button
                  className='delete-button'
                  variant='warning'
                  type='button'
                  onClick={() => history.push(`/decks/${this.state.deck}/cards`)}
                >
                Cancel
                </Button>

              </Form>
    )
  }
}

export default withRouter(AddCard)
