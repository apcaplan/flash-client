import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const backHomeIcon = () => {
  return (
    <div className="backHomeIcon">
      <Link to="/welcome">
        <FontAwesomeIcon className="goBack" icon='times-circle' size='2x' />
      </Link>
    </div>
  )
}

export default backHomeIcon
