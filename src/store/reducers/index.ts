import { ADD_BOT_COMMAND, ADD_USER_COMMAND } from '../actions';

import { initialState } from '../states';
const chatReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case ADD_BOT_COMMAND:
      return {
        ...state,
        divs: [
          ...state.divs,
          {
            type: 'bot-command',
            text: action.payload,
            id: state.divs.length,
          },
        ],
      };
    case ADD_USER_COMMAND:
      return {
        ...state,
        divs: [
          ...state.divs,
          {
            type: 'user-command',
            text: action.payload,
            id: state.divs.length,
          },
        ],
      };
    default:
      return state;
  }
};

export default chatReducer;
