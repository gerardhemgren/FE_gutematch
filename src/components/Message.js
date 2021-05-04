import React from 'react'
import './Message.css'

const Message = ({ msg }) => {
  if (msg) {
    let message = msg
    return (
      <div className='Message'>
        <div>
          {message}
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default Message