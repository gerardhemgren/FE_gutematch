import React from 'react'

const Match = ({ user, match, source, join, left, deleteMatch }) => {
  const { id_match, date, location, is_full, players, players_field, id_admin } = match
  
  let actionButton;
  if (source === 'showOpenMatchs') {
    actionButton = <button onClick={join}>Join</button>
  } else if (source === 'showMyMatchs') {
    actionButton = <button onClick={left}>Left</button>
  } else {
    actionButton = ''
  }

  let deleteButton
  if(id_admin === user) {
    deleteButton = <button onClick={deleteMatch}>Delete Match</button>
  }
  return (
    <div>
      <div>
        {id_match} | {JSON.stringify(is_full)} | {players} | {players_field}
      </div>
      <div>
        {date} | {location}
      </div>
      <div>
        {actionButton} {deleteButton}
      </div>
    </div>
  )
}

export default Match