import './foo.scss';
import React, { Component, PropTypes } from 'react';

const propTypes = {
  color: PropTypes.string,
};

class Foo extends Component  {
  render() {
    return (
      <div className="Foo">
        I am foo!! {this.props.color}
      </div>
    );
  }
}

Foo.propTypes = propTypes;

export default Foo;
