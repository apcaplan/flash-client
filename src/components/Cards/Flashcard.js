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
        <h5 className='cardCount'>Card {count + 1}/{cards.length}</h5>

        <div className='flashcard'>
          <Button
            className='shuffle'
            onClick={this.shuffleBack}
          >
            <FontAwesomeIcon icon='chevron-circle-left' />
          </Button>
          <div className='card'>
            <div className='card-inner'>
              <div className='flashcard_front'>
                <div className= 'text'>
                  <span>
                    {cards[count].cardFront}
                  </span>
                </div>
              </div>
              <div className='flashcard_back'>
                <div className= 'text'>
                  <span>
                    {cards[count].cardBack}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Button
            className='shuffle'
            onClick={this.shuffleForward}
          >
            <FontAwesomeIcon icon='chevron-circle-right' />
          </Button>
        </div>

        <div className='footer-bar'>
          <div>
            <Link className='add-card' to={`/decks/${deckId}/create-card`}>
              <FontAwesomeIcon icon='plus-circle' />
              <p>Add Card</p>
            </Link>
          </div>

          <div>
            <Link className='edit-card' to={{
              pathname: `/cards/${cards[count]._id}/edit-card`,
              state: { deck: deckId }
            }}
            >
              <FontAwesomeIcon icon='pencil-alt' />
              <p>Edit Card</p>
            </Link>
          </div>

          <div>
            <Link className='go-home' to={ '/welcome' } >
              <FontAwesomeIcon icon='home' />
              <p>Go Home</p>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Flashcard)
