﻿import {reducer} from './reducer.ts';
import {configureStore} from '@reduxjs/toolkit';
import {createApi} from '../services/api.ts';

const api = createApi();
export const store = configureStore(
  {
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api
        }
      })
  });
