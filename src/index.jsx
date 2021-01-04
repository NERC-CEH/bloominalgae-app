import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <h1>Algae!</h1>;

function init() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

init();
