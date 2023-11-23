import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {App} from './App';
import {ThemeProvider} from './contexts';
import {store} from './store';
import {statisticsApi} from './apis/statistics.api';

const AppWrapper = () => {
  useEffect(() => {
    statisticsApi.registerVisitor();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  );
};

export {AppWrapper};
