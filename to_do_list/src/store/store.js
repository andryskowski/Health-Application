import { applyMiddleware, createStore } from 'redux';
import { validate } from '../middleware/validate';

import { rootReducer } from '../reducers/rootReducer';

const store = createStore(rootReducer,
    applyMiddleware(validate));

export default store;