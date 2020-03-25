import React, { Component } from 'react'
import { showDecks } from '../api/decks'
import { Link, withRouter } from 'react-router-dom'
import { Container, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './icons'


class Welcome extends Component {
  constructor (props) {
    super(props)

    this.state = {
      decks: [],
      error: null,
    }
}

  display = () => {
    showDecks(this.props.user)
    .then(res => this.setState({ decks: res.data.decks }))
    .catch(err => this.setState({ error: err.stack }))
    }

    componentDidMount() {
      this.display()
    }

  render() {
    const { decks, error } = this.state

    const deckList = decks.length ?
      decks.map(deck => {
        return (
          <Container className='deck-container' key={deck._id}>
            <Row className='deck-item'>
              <Col className='deck-name'>
                <Link to={{
                  pathname: `/decks/${deck._id}/cards`,
                  state: {
                    deckId: deck._id,
                    deckName: deck.deckName
                  }
                }}
                onClick={ localStorage.setItem('deckName', deck.deckName) }
                  >
                  <h2>{deck.deckName}</h2>
                </Link>
              </Col>
              <Col className='deckEdit-icon'>
                <Link className='deck-edit' to={`/decks/${deck._id}/edit-deck`}>
                  <FontAwesomeIcon icon='pencil-alt' />
                </Link>
              </Col>
            </Row>
          </Container>
        )
      }) : (
      <div className='center'>Click add button below to create one!</div>
      )

    if (error) {
      return <p className='deckless'>ERROR: { error } </p>
    }

    const heading = () => {
      if (this.state.decks.length === 0) {
        return (<h1 className='deckHeading'>You don't have any flashcard decks yet.</h1> )
      } else if (this.state.decks.length === 1) {
        return (<h1 className='deckHeading'>Your Flashcard Deck</h1> )
      } else {
        return (<h1 className='deckHeading'>Your Flashcard Decks</h1> )
      }
    }

    return (
      <div className='container welcome'>
        { heading() }
        { deckList }
        <div>
          <Link className='add-deck' to='/create-deck'>
            <FontAwesomeIcon icon='plus-circle' size='2x' />
            <p>Create Deck</p>
          </Link>
        </div>
      </div>
    )
  }
}

export default withRouter(Welcome)
