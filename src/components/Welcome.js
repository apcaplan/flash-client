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
            <Row className=''>
              <Col md='4' className='deck-name'>
                <Link to={{
                  pathname: `/decks/${deck._id}/cards`,
                  state: { deckId: deck._id }
                }}
                  >
                  <h2>{deck.deckName}</h2>
                </Link>
              </Col>
              <Col md='1'>
                <Link to={`/decks/${deck._id}/edit-deck`}>
                  <FontAwesomeIcon icon='pencil-alt' />
                </Link>
              </Col>
            </Row>
          </Container>
        )
      }) : (
      <div className='center'>Click add button below to create a deck!</div>
      )

    if (error) {
      return <p className='deckless'>ERROR: { error } </p>
    }

    return (
      <div className='container welcome'>
        <h1 className='deckHeading'>Your Decks</h1>
        { deckList }
      </div>
    )
  }
}

export default withRouter(Welcome)
