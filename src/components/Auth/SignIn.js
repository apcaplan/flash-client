import React, { Component } from 'react'
import './auth.css'
import { withRouter, Link } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from './AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/welcome'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <div className="row">
        <div className="form-wrapper">
          <h3>Sign In</h3>
          <Form className='signIn-form' onSubmit={this.onSignIn}>
            <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
              <Form.Control
                className='auth-input'
                required
                type="email"
                name="email"
                value={email}
                placeholder="Email address"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
              <Form.Control
                className='auth-input'
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              className='button-auth'
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
          <p>No account? Sign up <Link style={{ color: '#007BFF' }} to="/sign-up">here</Link>!</p>
        </div>
      </div>
    )
  }
}

export default withRouter(SignIn)
