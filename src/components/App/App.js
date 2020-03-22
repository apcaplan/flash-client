
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../Auth/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../Auth/AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../Auth/SignUp'
import SignIn from '../Auth/SignIn'
import SignOut from '../Auth/SignOut'
import ChangePassword from '../Auth/ChangePassword'
import Welcome from '../Welcome'
import DeckCreateNew from '../Deck/DeckCreateNew'
import EditDeck from '../Deck/DeckEdit'
import DeckDeleteModal from '../Deck/DeckDeleteModal'
// import ShowCards from '../Cards/CardShow'
import Flashcard from '../Cards/Flashcard'
import AddCard from '../Cards/CardCreate'
import EditCard from '../Cards/CardEdit'
import CardDeleteModal from '../Cards/CardDeleteModal'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/welcome' render={() => (
            <Welcome user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-deck' render={() => (
            <DeckCreateNew msgAlert={this.msgAlert} user={user} />
            )} />
          <AuthenticatedRoute user={user} exact path='/decks/:id/edit-deck' render={(props) => (
            <EditDeck msgAlert={this.msgAlert} user={user} />
            )} />
            <AuthenticatedRoute user={user} exact path='/decks/:id/delete-deck' render={(props) => (
              <DeckDeleteModal msgAlert={this.msgAlert} user={user} />
              )} />
            <AuthenticatedRoute user={user} exact path='/decks/:id/cards' render={(props) => (
              <Flashcard msgAlert={this.msgAlert} user={user} />
            )} />
            <AuthenticatedRoute user={user} exact path='/decks/:id/create-card' render={(props) => (
              <AddCard msgAlert={this.msgAlert} user={user} />
            )} />
            <AuthenticatedRoute user={user} exact path='/cards/:id/edit-card' render={(props) => (
              <EditCard msgAlert={this.msgAlert} user={user} />
            )} />
            <AuthenticatedRoute user={user} exact path='/cards/:id/delete-card' render={(props) => (
              <CardDeleteModal msgAlert={this.msgAlert} user={user} />
            )} />
        </main>
      </Fragment>
    )
  }
}

export default App
