import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import gql from 'graphql-tag'
import query from '../queries/songDetails'

import LyricCreate from './LyricCreate'
import LyricList from './LyricList'

class SongDetail extends Component {
  constructor(props) {
    super(props)
    this.state = { title: '' }
  }

  render() {
    const { song } = this.props.data

    if (!song) { return <div></div> }

    return(
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics}/>
        <LyricCreate songId={this.props.params.id} />
      </div>
    )
  }
}

/*******************************************************
 * The way in which we call a mutation and pass along  *
 * some variables is very different (it is manual)     *
 * than how we have variables passed automatically to  *
 * a component when it mounts. In this case as it's    *
 * automatic, it needs to be associated at this level. *
 *******************************************************/

export default graphql(query, {
  /**
   * React Roter takes the props and passes it _first_
   * to graphql. Graphql _get all the props_ and then
   * passes all of them to SongDetail
   * @param  {[type]} props [description]
   * @return {[type]}       [description]
   */
  options: (props) => {
    return {
      variables: { id: props.params.id }
    }
  }
})(SongDetail)
