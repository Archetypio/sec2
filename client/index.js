import './style/style.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import App from './components/App'
import SongList from './components/SongList'
import SongCreate from './components/SongCreate'
import SongDetail from './components/SongDetail'

const client = new ApolloClient({

  /*****************************************************************************
   * O stands for Object                                                       *
   * This piece of config takes every single piece of data that is fetched     *
   * by the ApolloClient from backend and runs it through this function.       *
   * The result of this function is used to identify that piece of data inside *
   * the ApolloClient/Store.                                                   *
   *****************************************************************************/

   /***************************************************************************
    * When we use the id off every record to identify inside Apollo, it means *
    * that whenever we make a query, we need to always ask for the id. If     *
    * we don't Apollo won't identify that data.                               *
    ***************************************************************************/

  dataIdFromObject: o => o.id
})

const Root = () => {
  return(
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
