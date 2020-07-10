import React from "react";
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import withRoot from "./withRoot";
import App from "./pages/App";
import Profile from "./pages/Profile";
import Header from "./components/Shared/Header"
import Loading from "./components/Shared/Loading";
import Error from "./components/Shared/Error";

// const { Provider, Consumer } = React.createContext();
export const UserContext = React.createContext();

const Root = () => (
  // default fetchPolicy='cache-first'
  // cache-and-network -> tries to resolve from cache, but also makes network request
  // network-only -> always send a network request
  // no-cache -> always sends a network request, does no cache response
  <Query query={ME_QUERY} fetchPolicy='cache-and-network'>
    {/* render prop function */}
    {({data, loading, error}) => {
      if (loading) return <Loading />;
      if (error) return <Error error={error}/>;
      const currentUser = data.me;

      return (
        <Router>
          <UserContext.Provider value={currentUser}>
            <Header currentUser={currentUser} />
            <Switch>
              <Route exact path="/" component={App} />
              <Route path="/profile/:id" component={Profile} />
            </Switch>
          </UserContext.Provider>
        </Router>
      )
    }}
  </Query>
)

export const ME_QUERY = gql`
  {
    me {
      id
      username
      email
      likeSet {
        track {
          id
        }
      }
    }
  }

`

export default withRoot(Root);
