import React from 'react';
import Foo from './components/Foo/index.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>YO!!</h1>
        <Foo color="red" />
      </div>
    );
  }
}

React.render(<App />, document.getElementById('root'));
