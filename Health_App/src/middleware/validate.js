import { ADD } from '../actions/appActions';

export const validate= ({dispatch}) => next => (action) => {
  if (action.type === ADD ) {
    console.warn('elo! xd');
    return;
  }

  next(action);
};