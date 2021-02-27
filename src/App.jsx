import React from 'react';
import './app.css';
import Counter from './component/Counter/Counter';

/**
 * this file be used for entry point of current app
 */
export default class App extends React.Component {
  render() {
    return (
      <div className={'title'}>
        <h1>React JS - SSR CSR Template</h1>
        <Counter />
      </div>
    );
  }
}
