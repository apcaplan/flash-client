import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { getCard, editCard, destroyCard } from '../../api/decks'
import messages from './../Auth/AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CardDeleteModal from './CardDeleteModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class EditCard extends Component {
  constructor () {
    super()

    this.state = {
      cardId: null,
      oldCardFront: '',
      newCardFront: '',
      oldCardBack: '',
      newCardBack: '',
      showModal: false
    }
  }

  onShowModalCardDelete = card => {
    this.setState({
      cardId: this.props.match.params.id,
      showModal: true
    })
  }

  onHideModalCardDelete = card => {
    this.setState({
      showModal: false
    })
  }

  handleChange = event => {
    this.setState({
    [event.target.name]: event.target.value
  })
}

  onEditCard = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    editCard(user, this.state, this.props.location.state.deck)
    .then(() => msgAlert({
      heading: 'Update success!',
      message: messages.cardEditSuccess,
      variant: 'success'
    }))
    .then(() => history.push(`/decks/${this.props.location.state.deck}/cards`))
    .catch(error => {
      msgAlert({
        heading: 'Update failed with error: ' + error.message,
        message: messages.cardEditFailure,
        variant: 'failed'
      })
    })
  }

  onDeleteCard = event => {
    event.preventDefault()
    const { msgAlert, user, history} = this.props
    destroyCard( this.state.cardId, user)
      .then(() => {
        msgAlert({
        heading: 'Successfully deleted card',
        message: messages.cardDeleteSuccess,
        variant: 'success'
        })
      })
      .then(this.onHideModalCardDelete)
      .then(() => setTimeout((history.push(`/decks/${this.props.location.state.deck}/cards`)), 2000))
      .then(this.onHideModalCardDelete)
        .catch(error => {
          msgAlert({
            heading: 'Delete failed with error: ' + error.message,
            message: messages.cardDeleteFailure,
            variant: 'failed'
          })
        })
  }

  componentDidMount(){
    getCard(this.props.match.params.id, this.props.user)
      .then(res => {this.setState({
        cardId: res.data.card._id,
        oldCardFront: res.data.card.cardFront,
        oldCardBack: res.data.card.cardBack
        })
      })
      .catch(console.error)
  }

render () {
  const { oldCardFront, oldCardBack  } = this.state

  return(
    <div className='wrapper'>
        <div className='backHomeIcon'>
          <Link to={ `/decks/${this.props.location.state.deck}/cards` }>
            <FontAwesomeIcon className='go-back' icon='times-circle' size='2x' />
          </Link>
        </div>
        <div className='card-form row'>
          <div className='form-wrapper3'>
          <h3>Edit Card</h3>
          <Form>
            <Form.Group className='card-edit' controlId='newCardFront'>
              <Form.Label>Term / Front of card</Form.Label>
              <Form.Control
                required
                as='textarea'
                rows='2'
                cols='80'
                name='newCardFront'
                defaultValue={oldCardFront}
                type='text'
                placeholder='Enter new term'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group   className='card-edit' controlId='newCardBack'>
              <Form.Label>Definition / Back of card</Form.Label>
              <Form.Control
                required
                as='textarea'
                rows='2'
                cols='80'
                name='newCardBack'
                defaultValue={oldCardBack}
                type='text'
                placeholder='Enter new definition'
                onChange={this.handleChange}
              />
              </Form.Group>
          </Form>
              <Button
                className='button-edit3'
                variant='primary'
                type='submit'
                onClick={this.onEditCard}
              >
                {/* <FontAwesomeIcon icon='save' /> */}
                Save Changes
              </Button>
              <Button
                className='button-delete'
                variant='danger'
                type='button'
                onClick={this.onShowModalCardDelete}
              >
                {/* <FontAwesomeIcon icon='trash' /> */}
                Delete Card
              </Button>
        </div>
      </div>

      <div>
        { this.state.showModal ? (
          <CardDeleteModal
            state={this.state}
            user={this.props.user}
            show={this.state.showModal}
            onHide={this.onHideModalCardDelete}
            destroyCard={this.onDeleteCard}
          /> ) : null }
      </div>

    </div>

  )
}
}

export default withRouter(EditCard)
