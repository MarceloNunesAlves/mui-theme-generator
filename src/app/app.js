import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Perf from 'react-addons-perf' // ES6
import Main from './Containers/Main'; // Our custom react component

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

window.Perf = Perf;

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('app')
    );
};

render(Main);

if (module.hot) {
    module.hot.accept('./Containers/Main', () => {
        render(Main)
    });
}