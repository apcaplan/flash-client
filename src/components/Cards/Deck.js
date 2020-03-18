import React, { Component } from 'react'

class Deck extends Component {
  state = {

  }

  handleChange = () => {
    this.setState({ checked: !this.state.checked })
  }

  componentDidMount() {
    this.props.getDeckById(this.props.match.params.id)
  }

  render() {
    if (!this.props.currentDeck){
      return null
    } else {
      const cards = this.props.currentDeck.deckCards.map((card, index) =>
      <cards front={card.front} back={card.back} key={index} onRef={ref=> (this.child = ref)}/>)

    let button
    if (!this.props.currentUser){
      return null
    } else {
      button = this.props.currentDeck.deckAuthor !== this.props.currentUser.id ? null:
      <button className="edit-btn" onClick= { () => this.props.history.push('edit-deck')}>Edit Deck</button>
    }

    }
    return (
      <div className="deck-container">
        <div className="deck">
          <h2>(this.props.currentDeck.deckName)</h2>
          <header>
            <p>{this.props.currentDeck.deckCards.length} Cards in this deck</p>
          </header>
          <p className="instructions">Click card to flip it</p>
        </div>
      </div>
    )
  }
}

export default Deck
