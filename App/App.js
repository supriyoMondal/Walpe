import React from 'react'
import MainNavigator from './navigation'
import { Provider } from 'react-redux'
import store from './store'


const App = () => (
    <Provider store={store}>
        <MainNavigator />
    </Provider>
)


export default App

