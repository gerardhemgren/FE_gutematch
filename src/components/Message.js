import React from 'react'

const Message = ({ msg }) => {
  if (msg) {
    let message = msg
    return (
      <div className='message'>
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