
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import ReduxThunk from 'redux-thunk';

import NavigationService from './navigator/NavigationService';
import Routes from './navigator/Routes';

import { reducers } from './reducers';

const AppWithNavigationState = createAppContainer(Routes);

export default class App extends Component<{}> {
    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
               <AppWithNavigationState 
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
               /> 
            </Provider>
        );
    } 
}

