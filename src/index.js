import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ServerForm from './components/ServerForm';
import ServerList from './components/ServerList';
import ServerGenerationPipeline from './components/ServerGenerationPipeline';
import Home from './components/Home';
import Header from './components/Header';
import thunk from 'redux-thunk';
import reducers from './reducers';

    const store = createStore(
   reducers,
   applyMiddleware(thunk)
 );

ReactDOM.render(
  <Provider store={store}>
  <Router>
    <div className="app">
    <Header />
      <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/servercreate" component={ServerForm} />
      <Route path="/serverinstances" component={ServerList} />
      <Route path="/serverpipeline" component={ServerGenerationPipeline} />
      </Switch>
    </div>
  </Router>
  </Provider>, document.querySelector('#root'));
