
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';

import Routes from './navigator/Routes';

import { reducers } from './reducers';

const AppWithNavigationState = createAppContainer(Routes);

export default class App extends Component {
    render() {
        return (
            <Provider store={createStore(reducers)}>
               <AppWithNavigationState /> 
            </Provider>
        );
    } 
}

