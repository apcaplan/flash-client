import React, { Component } from 'react'
import './decks.css'
import { withRouter } from 'react-router-dom'
import { getDeck, editDeck, destroyDeck } from '../../api/decks'
import messages from './../Auth/AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import DeckDeleteModal from './DeckDeleteModal'
import backHomeIcon from './DeckCancelIcon'

class EditDeck extends Component {
  constructor () {
    super()

    this.state = {
      deckId: null,
      oldDeckName: '',
      newDeckName: '',
      showModal: false
    }
  }

  onShowModalDeckDelete = deck => {
    this.setState({
      deckId: this.props.match.params.id,
      showModal: true
    })
  }

  onHideModalDeckDelete = deck => {
    this.setState({
      showModal: false
    })
  }

  handleChange = event => {
    this.setState({
    [event.target.name]: event.target.value
  })
}

  onEditDeck = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    editDeck(this.state, user)
    .then(() => msgAlert({
      heading: 'Update success!',
      message: messages.deckEditSuccess,
      variant: 'success'
    }))
    .then(() => history.push('/welcome'))
    .catch(error => {
      msgAlert({
        heading: 'Update failed with error: ' + error.message,
        message: messages.deckEditFailure,
        variant: 'failed'
      })
      console.error(error)
    })
  }

  onDeleteDeck = event => {
    event.preventDefault()
    const { msgAlert, user, history } = this.props
    destroyDeck( this.state.deckId, user)
      .then(() => {
        msgAlert({
        heading: 'Successfully deleted deck',
        message: messages.deckDeleteSuccess,
        variant: 'success'
        })
      })
      .then(this.onHideModalDeckDelete)
      .then(() => setTimeout((history.push('/welcome'))), 2000)
      .then(this.onHideModalDeckDelete)
        .catch(error => {
          console.error(error)
          msgAlert({
            heading: 'Delete failed with error: ' + error.message,
            message: messages.deckDeleteFailure,
            variant: 'failed'
          })
        })
  }

  componentDidMount(){
    getDeck(this.props.match.params.id, this.props.user)
      .then(res => {this.setState({
        deckId: res.data.deck._id,
        oldDeckName: res.data.deck.deckName
      })
    })
      .catch(console.error)
  }

render () {
  const { oldDeckName } = this.state

  return(
    <div className='wrapper'>
      { backHomeIcon() }
      <div className='deck-form row'>
        <div className='form-wrapper2'>
          <h3>Edit Deck</h3>
          <Form>
            <Form.Group controlId='newDeckName'>
              <Form.Label>Change deck name from {oldDeckName}:</Form.Label>
              <Form.Control
                className='deck-new'
                // required
                name='newDeckName'
                // defaultValue={oldDeckName}
                type='text'
                placeholder='Enter new deck name'
                onChange={this.handleChange}
              />
              </Form.Group>
          </Form>
          <div className='buttons'>
            <Button
              className='button-edit2'
              variant='primary'
              type='submit'
              onClick={this.onEditDeck}
            >
              Save Changes
            </Button>
            <Button
              className='button-edit2 button-delete'
              variant='danger'
              type='button'
              onClick={this.onShowModalDeckDelete}
            >
              Delete Deck
            </Button>
          </div>
        </div>
      </div>

      <div>
        { this.state.showModal ? (
          <DeckDeleteModal
            state={this.state}
            user={this.props.user}
            show={this.state.showModal}
            onHide={this.onHideModalDeckDelete}
            deleteDeck={this.onDeleteDeck}
          /> ) : null }
      </div>

    </div>

  )
}
}

export default withRouter(EditDeck)
