import React from 'react';
import Foo from './components/Foo/foo';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>YO!!</h1>
        <div className="testss">Hello World!!!</div>
        <Foo color="green" />
        <Foo color="red" />
      </div>
    );
  }
}

React.render(<App />, document.getElementById('root'));
