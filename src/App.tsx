import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from '@src/redux/store';

// import { ENVIROIMENT } from './config';
import Router from './Router';

// import { makeServer } from '@src/server';

// ENVIROIMENT === 'development' && makeServer();

const { store, persistor } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
}

export default App;
