import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const render = App => {
    ReactDOM.hydrate(<App/>, document.getElementById('root'));
}

setTimeout(() => {
    render(App);
}, 0);

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./App', () => {
        render(App);
    });
}
