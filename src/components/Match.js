import React from 'react'

const Match = ({ match }) => {
    return (
      <div> {match.location} {match.id} {match.id_game}
      <br></br>
      <br></br>
      </div>
    )
  }

export default Match