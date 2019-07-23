import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search, Select } from 'semantic-ui-react'
import _ from 'lodash'
import {getAllPokemon, postPokemon} from '../assets/API'


class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    searchTerm: '',
    sortOption: 'default'
  }

  componentDidMount() {
    this.updatePokemonList();
  }

  updatePokemonList = () => {
    getAllPokemon().then(pokemon => this.setState({ pokemon }))
  }

  displayPokemon = () => {
    const filteredPokemon = this.state.searchTerm === '' ? this.state.pokemon : this.state.pokemon.filter(pokemon => pokemon.name.includes(this.state.searchTerm.toLowerCase()))
    
    return filteredPokemon.sort((a,b) => {
      if (this.state.sortOption === 'default') {
        return a.id - b.id
      } else if (this.state.sortOption === 'hp') {
        return parseInt(b.stats.find(stat => stat.name === 'hp').value, 10) - parseInt(a.stats.find(stat => stat.name === 'hp').value, 10)
      } else {
        return a.name.localeCompare(b.name)
      }
    })
  }

  addNewPokemon = (pokemon) => {
    postPokemon(pokemon).then(this.updatePokemonList)
  }

  sortOptions = () => {
    return [
      {key: 'default', value: 'default', text: 'Default'},
      {key: 'name', value: 'name', text: 'Name'},
      {key: 'hp', value: 'hp', text: 'HP'}
    ]
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce((e, {value}) => this.setState({searchTerm: value}),500)} showNoResults={false} />
        <Select placeholder='Sort Pokemon' options={this.sortOptions()} onChange={(e, {value}) => this.setState({ sortOption: value })} />
        <br />
        <PokemonCollection pokemon={this.displayPokemon()}/>
        <br />
        <PokemonForm handleSubmit={this.addNewPokemon}/>
      </div>
    )
  }
}

export default PokemonPage
