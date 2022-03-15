export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";


const initialState2: any = {
    data: 42,
    title: 'YARC (yet another redux counter with redux toolkit)'
}
export function increment(amount = 1) {
    return {
        type: INCREMENT_COUNTER,
        payload: amount
    }
}
export function decrement(amount = 1) {
    return {
        type: DECREMENT_COUNTER,
        payload: amount
    }
}

export default function counterReducer(state = initialState2, action: any) {

    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                ...state,
                data: state.data + action.payload
            }
        case DECREMENT_COUNTER:
            return {
                ...state,
                data: state.data - action.payload
            }
        default:
            return state;
    }
}