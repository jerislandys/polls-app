import {
    GET_POLLS,
    ADD_POLL,
    DELETE_POLL,
    POLLS_LOADING
} from '../actions/types';
import { IAction, IPoll } from '../../types/interfaces';

const initialState = {
    polls: [],
    loading: false
  };
  
interface IState {
polls: IPoll[];
}

export default function(state: IState = initialState, action: IAction) {
  switch (action.type) {
    case GET_POLLS:
    return {
        ...state,
        polls: action.payload,
        loading: false
    };
    case DELETE_POLL:
    return {
        ...state,
        polls: state.polls.filter(poll => poll._id !== action.payload)
    };
    case ADD_POLL:
    return {
        ...state,
        polls: [action.payload, ...state.polls]
    };
    case POLLS_LOADING:
    return {
        ...state,
        loading: true
    };
    default:
    return state;
  }
}