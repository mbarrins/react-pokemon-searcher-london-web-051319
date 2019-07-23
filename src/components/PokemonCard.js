import React from 'react'
import { Card } from 'semantic-ui-react'

const PokemonCard = ({ pokemon }) => {
  const [imageFront, setImageFront] = React.useState(true);

  return (
    <Card>
      <div onClick={() => setImageFront(!imageFront)}>
        <div className="image">
          <img alt={pokemon.name} src={imageFront ? pokemon.sprites.front : pokemon.sprites.back} />
        </div>
        <div className="content">
          <div className="header">{pokemon.name}</div>
        </div>
        <div className="extra content">
          <span>
            <i className="icon heartbeat red" />
            {pokemon.stats.find(stat => stat.name === 'hp').value}
          </span>
        </div>
      </div>
    </Card>
  )
}

export default PokemonCard
