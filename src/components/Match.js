import React from 'react'

const Match = ({ match, source, action }) => {
  const { id_match, date, location, is_full } = match
  let actionButton;
  
  if (source === 'showOpenMatchs') {
    actionButton = <button onClick={action}>Join</button>
  } else if (source === 'showMyMatchs') {
    actionButton = <button onClick={action}>Left</button>
  }
  else { actionButton = '' }

  return (
    <div>
      <div>
        {id_match} | {JSON.stringify(is_full)}
      </div>
      <div>
        {date} | {location}
      </div>
      <div>
        {actionButton}
      </div>
    </div>
  )
}

export default Match