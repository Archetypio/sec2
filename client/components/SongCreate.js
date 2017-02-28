import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link, hashHistory } from 'react-router'
import query from '../queries/fetchSongs'

class SongCreate extends Component {
  constructor(props) {
    super(props)
    this.state = { title: '' }
  }

  onSubmit(event) {
    // don't autosubmit in the background (default)
    event.preventDefault()

    this.props.mutate({
      variables: {title: this.state.title},
      refetchQueries: [{ query }]
    }).then(() => hashHistory.push('/'))
  }

  render() {
    return(
      <div>
        <Link to="/">
          Back
        </Link>
        <h3>Create A New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value})}
            value={this.state.title}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`

// This will come in as props.mutate, not props.data
// Calling this.props.mutate will _run_ the mutation
export default graphql(mutation)(SongCreate)
