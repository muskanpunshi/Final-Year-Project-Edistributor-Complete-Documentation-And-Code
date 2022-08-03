import * as React from 'react';
import AppNavigation from './Components/AppNavigation/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './Components/Redux/store/Store';


export default function App() {
  return (

    <Provider store={store}>
      <AppNavigation />
    </Provider>


  )
}