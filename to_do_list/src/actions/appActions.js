export const ADD = 'ADD';
export const DELETE = 'DELETE';
export const EDIT = 'EDIT';


const addBMRInfromations = ({height, weight, BMR}) => ({
    type: ADD,
    payload: {
        height,
        weight,
        BMR
    }
});

const deleteBMRInfromations = ({height, weight, BMR}) => ({
    type: DELETE,
    payload: {
        height,
        weight,
        BMR
    }
});

const editBMRInfromations = ({height, weight, BMR}) => ({
    type: EDIT,
    payload: {
        height,
        weight,
        BMR
    }
});
