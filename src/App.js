import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import List from './components/list.js';
import Read from './components/read.js';
import Authors from './components/authors.js';
import AuthorList from './components/authors_list.js'

import './App.css';

function App() {
  return (
    <Router>
      <Route exact path="/" component={List}/>
      <Route path="/read/:id" component={Read}/>
      <Route path="/author/:id" component={Authors}/>
      <Route path="/authors" component={AuthorList}/>  
    </Router>
  );
}

export default App;
