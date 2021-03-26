import {
    ADD, EDIT, DELETE
  } from '../actions/appActions';
  
  export const appReducer = (state = [], action) => {
    console.log('Będziemy tworzyć nowy stan aplikacji :)')
    switch (action.type) {
      case ADD:
        return [ ...state, action.payload];
      case EDIT:
        return state.map(currentStateElement => {
          if (currentStateElement.id !== action.payload.id) {
            return currentStateElement;
          }
  
          const { author, comment, rate } = action.payload;  
  
          return ({
            author,
            comment,
            id: currentStateElement.id,
            rate,
          });
        });
      case DELETE:
        return state.filter(currentStateElement => currentStateElement.id !== action.payload.id);
      
      default:
        console.warn(`Nie mamy akcji typu: ${action.type}`);
        return state;
    }
  }