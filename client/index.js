import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-client";
import {ApolloProvider} from "react-apollo";
import SongList from "./components/SongList";
import {Router, Route, hashHistory, IndexRoute} from "react-router";
import App from './components/App'
import SongCreate from "./components/SongCreate";
import './style/style.css'
import SongDetail from "./components/SongDetail";

const client = new ApolloClient({
    dataIdFromObject: o => o.id
})

const Root = () => {
  return (
      <ApolloProvider client={client}>
        <Router history={hashHistory}>
            <Route path={'/'} components={App}>
                <IndexRoute components={SongList} />
                <Route path={'songs/new'} components={SongCreate} />
                <Route path={'songs/:id'} components={SongDetail} />
            </Route>
        </Router>
      </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
