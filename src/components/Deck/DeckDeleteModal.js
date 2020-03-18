import React, { Component } from 'react'
// import { destroyDeck } from '../../api/decks'
// import messages from '../Auth/AutoDismissAlert/messages'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'

class DeckDeleteModal extends Component {
  render () {
    const { onHide, deleteDeck} = this.props

    return (
          <Modal
            {...this.props}
            size='md'
            area-labelledby='contained-modal-title-vcenter'
            centered
            onHide={onHide}
          >
            <Modal.Header closeButton>
              <Modal.Title id='contained-modal-title-vcenter'>
              Are you sure?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <strong>Deleting a deck will delete all of its cards. This action is irreversible.</strong>{" "}
              Are you certain you want to delete?
            </Modal.Body>
            <Modal.Footer>
              <Button
              className='delete-button'
              variant='warning'
              type='button'
              onClick={onHide}
              >
              Cancel
              </Button>
              <Button
                className='delete-button'
                variant='danger'
                type='button'
                onClick={deleteDeck}
              >
              Delete
              </Button>
            </Modal.Footer>
          </Modal>
  )
  }
}

export default DeckDeleteModal
