import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import userReducer from "./features/user";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
