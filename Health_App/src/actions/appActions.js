export const ADD = 'ADD';
export const DELETE = 'DELETE';
export const EDIT = 'EDIT';

export const addBMRInformation = ({height, weight, BMR}) => ({
  type: ADD,
  payload: {
    height,
    weight,
    BMR
  }
});

export const deleteRate = id => ({
  type: DELETE,
  payload: {
    id,
  }
});

export const editRate = ({author, comment, id, rate}) => ({
  type: EDIT,
  payload: {
    author,
    comment,
    id,
    rate,
  }
});
