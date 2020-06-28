import axios from 'axios';
import { GET_POLLS, ADD_POLL, DELETE_POLL, POLLS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { IPoll } from '../../types/interfaces';

const polls = [
  {
      id: '1',
      title: 'poll 1',
      options: []
  },
  {
      id: '2',
      title: 'poll 2',
      options: []
  }
  ];
  
export const getPolls = () => (dispatch: Function) => {
    dispatch(setPollsLoading());
    // axios
    // .get('/api/polls')
    // .then(res =>
    // dispatch({
    //     type: GET_POLLS,
    //     payload: res.data
    // })
    // )
    // .catch(err =>
    // dispatch(returnErrors(err.response.data, err.response.status))
    // );
    dispatch({
          type: GET_POLLS,
          payload: polls
      });
};

export const addPoll = (poll: IPoll) => (
    dispatch: Function,
    getState: Function
  ) => {
    axios
      .post('/api/polls', poll, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: ADD_POLL,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

export const deletePoll = (id: string) => (
    dispatch: Function,
    getState: Function
  ) => {
    axios
      .delete(`/api/polls/${id}`, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: DELETE_POLL,
          payload: id
        })
      )
      .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

  export const setPollsLoading = () => {
    return {
      type: POLLS_LOADING
    };
  };