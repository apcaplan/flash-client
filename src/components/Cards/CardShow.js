import React, { Component } from 'react'
import { showCards, createCard } from '../../api/decks'
import messages from '../Auth/AutoDismissAlert/messages'
import { Container, Col, Row } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ShowCards extends Component {
  constructor (props) {
    super(props)

    this.state = {
      deckId: this.props.match.params.id,
      deckName: '',
      cards: [ ],
      error: null
    }
  }

  displayCards = () => {
    showCards(this.state.deckId, this.props.user)
    .then(res => this.setState({ cards: res.data.cards }))
    .catch(err => this.setState({ error: err.stack }))
    }

  onCreateCard = event => {
    event.preventDefault()

    const { msgAlert, history, user, data } = this.props
    createCard(user.token, data.card)
    .then(() => {
      msgAlert({
        heading: 'Success!',
        message: messages.cardCreateSuccess,
        variant: 'success'
      })
    })
    .then(() => history.push('/welcome'))
    .catch(error => {
      console.error(error)
      msgAlert({
        heading: 'Failed to create a new card',
        message: messages.cardCreateFailure,
        variant: 'danger'
      })
    })
  }

  componentDidMount() {
    this.displayCards()
    if (this.props.location.state.deckName) {
      this.setState({ deckName: this.props.location.state.deckName})
    } else {
    this.setState({ deckName: this.state.cards.deck})
    }
    setTimeout(() => console.log(this.state), 2000)
  }

  render() {
    const { cards, deckId, deckName, error } = this.state

    const cardList = cards.length ?
      cards.map(card => {
        return (
          <Container className='card-container' key={card._id}>
            <Row className=''>
              <Col md='4' className='card-front'>
                <h2>{card.cardFront}</h2>
              </Col>
              <Col md='1'>
                <Link to={{
                  pathname: `/cards/${card._id}/edit-card`,
                  state: { deck: deckId }
                }}
                >
                  <FontAwesomeIcon icon='pencil-alt' />
                </Link>
              </Col>
            </Row>
          </Container>
        )
      }) : (
      <div className='center'>Click add button below to create a card!</div>
      )

    if (error) {
      return <p className='cardless'>ERROR: { error } </p>
    }

    return (
      <div className='container welcome'>
        <h1 className='cardHeading'>{deckName}</h1>
        { cardList }

        <div>
          <Link to={`/decks/${deckId}/create-card`}>
            <FontAwesomeIcon icon='plus-circle' />
          </Link>
        </div>

      </div>

    )
  }
  }

export default withRouter(ShowCards)
