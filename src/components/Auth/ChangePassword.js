import React, { Component } from 'react'
import './auth.css'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import messages from './AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import backHomeIcon from '../Deck/DeckCancelIcon'


class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    changePassword(this.state, user)
      .then(() => msgAlert({
        heading: 'Change Password Success',
        message: messages.changePasswordSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/welcome'))
      .catch(error => {
        this.setState({ oldPassword: '', newPassword: '' })
        msgAlert({
          heading: 'Change Password Failed with error: ' + error.message,
          message: messages.changePasswordFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <div className='wrapper welcome'>
      { backHomeIcon() }
        <div className="change-pw row">
          <div className="form-wrapper2">
            <h3>Change Password</h3>
            <Form onSubmit={this.onChangePassword}>
              <Form.Group controlId="oldPassword">
                {/* <Form.Label>Old password</Form.Label> */}
                <Form.Control
                  className="password"
                  required
                  name="oldPassword"
                  value={oldPassword}
                  type="password"
                  placeholder="Old Password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="newPassword">
                {/* <Form.Label>New Password</Form.Label> */}
                <Form.Control
                  className="password"
                  required
                  name="newPassword"
                  value={newPassword}
                  type="password"
                  placeholder="New Password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                className="pw-button"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ChangePassword)
