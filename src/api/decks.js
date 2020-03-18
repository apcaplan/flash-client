import apiUrl from '../apiConfig'
import axios from 'axios'
// import messages from '../components/Auth/AutoDismissAlert/messages'

// Deck related actions
export const showDecks = (user) => {
  return axios({
    url: apiUrl + '/decks',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const getDeck = (deck, user) => {
  return axios({
    url: apiUrl + `/decks/${deck}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const createDeck = (user, data) => {
  return axios({
    url: `${apiUrl}/decks`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    },
    data: { deck: {deckName: data.deckName} }
  })
}

export const editDeck = (data, user) => {
  return axios ({
    url: `${apiUrl}/decks/${data.deckId}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { deck: { deckName: data.newDeckName }
    }
  })
  // .then(() => this.props.msgAlert({
  //   heading: 'Successfully Made Changes',
  //     message: messages.editSuccess,
  //     variant: 'success'
  //   }))
  //   .catch(error => {
  //     console.error(error)
  //     this.props.msgAlert({
  //       heading: 'Failed to make changes',
  //       message: messages.editFailure,
  //       variant: 'failed'
  //     })
  // })
}

export const destroyDeck = (id, user) => {
  return axios({
    url: `${apiUrl}/decks/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`,
    }
  })
}

// Card related actions
export const showCards = (id, user) => {
  return axios({
    url: `${apiUrl}/decks/${id}/cards`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },

  })
}

export const getCard = (card, user) => {
  return axios({
    url: apiUrl + `/cards/${card}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const createCard = (user, data) => {
  return axios({
    url: `${apiUrl}/cards`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    },
    data: { card: {...data} }
  })
}

export const editCard = (user, data, deck) => {
  return axios ({
    url: `${apiUrl}/cards/${data.cardId}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { card: {
      cardFront: data.newCardFront,
      cardBack: data.newCardBack
    }}
  })
}

export const destroyCard = (id, user) => {
  return axios({
    url: `${apiUrl}/cards/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`,
    }
  })
}
