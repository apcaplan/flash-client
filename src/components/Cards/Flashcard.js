import React, { Component } from 'react'
import { showCards, createCard } from '../../api/decks'
import messages from '../Auth/AutoDismissAlert/messages'
import { Button } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Flashcard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      deckId: this.props.match.params.id,
      deckName: '',
      cards: [],
      count: 0,
      error: null
    }
  }

  shuffleForward = () => {
    const { cards, count } = this.state
    if (count >= (cards.length-1)) {
      this.setState({ count: 0 })
    } else {
      this.setState({ count: count+1 })
    }
  }

    shuffleBack = () => {
      const { cards, count } = this.state
      if (count <= 0) {
        this.setState({ count: cards.length-1 })
      } else {
        this.setState({ count: count-1 })
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
      .then(this.setState({ deckName: this.state.cards.deck }))
      .then(console.log(this.state))
      .then(() => history.push(`/decks/${data.card.deck}/cards`))
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
      const deckName = localStorage.getItem('deckName')
      this.setState({ deckName })
    }

  render() {
    const { cards, count, deckId, deckName, error } = this.state

    if (error) {
      return <p className='cardless'>ERROR: { error } </p>
    }

    if (cards.length === 0) {
      return (
        <div>
          <div className='center'>Click add button below to create a card!</div>
          <div>
            <Link to={`/decks/${deckId}/create-card`}>
              <FontAwesomeIcon icon='plus-circle' />
            </Link>
          </div>
        </div>
      )
    }

    return (
      <div className='container welcome'>
        <h1 className='cardHeading'>{deckName}</h1>

        <div className='flashcard'>
          <Button
            className='shuffle'
            onClick={this.shuffleBack}
          >
            <FontAwesomeIcon icon='chevron-circle-left' />
          </Button>
          <div className='card'>
            <div className='flashcard_front'>
              <span>
                {cards[count].cardFront}
              </span>
            </div>
            <div className='flashcard_back'>
              <span>
                {cards[count].cardBack}
              </span>
            </div>
          </div>
          <Button
            className='shuffle'
            onClick={this.shuffleForward}
          >
            <FontAwesomeIcon icon='chevron-circle-right' />
          </Button>
        </div>

        <div>
          <Link to={{
            pathname: `/cards/${cards[count]._id}/edit-card`,
            state: { deck: deckId }
          }}
          >
            <FontAwesomeIcon icon='pencil-alt' />
          </Link>
        </div>

        <div>
          <Link to={`/decks/${deckId}/create-card`}>
            <FontAwesomeIcon icon='plus-circle' />
          </Link>
        </div>

      </div>
    )
  }
}

export default withRouter(Flashcard)
