import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class CardDeleteModal extends Component {
  render () {
    const { onHide, destroyCard} = this.props

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
              <strong>Deleting a card will remove it forever.</strong>{" "}
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
                className='button-delete'
                variant='danger'
                type='button'
                onClick={destroyCard}
              >
              Delete
              </Button>
            </Modal.Footer>
          </Modal>
  )
  }
}

export default CardDeleteModal
