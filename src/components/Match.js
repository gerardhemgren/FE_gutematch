import React from 'react'

const Match = ({ match, source, action }) => {
  const {id_match, date, location, is_full } = match
  if (source === 'showOpenMatchs') {
    return (
      <div>
        {id_match} | {JSON.stringify(is_full)} 
        <button onClick={action}>Join</button>
        <br></br>
        {date} | {location}
        <br></br>
        <br></br>
        <br></br>
      </div>
    )
  } else if (source === 'showMyMatchs' || 'showAllMatchs') {
    return (
      <div>
        {match.id_match} | {JSON.stringify(match.is_full)}
        <br></br>
        {match.date} | {match.location}
        <br></br>
        <br></br>
        <br></br>
      </div>
    )
  }
}

export default Match