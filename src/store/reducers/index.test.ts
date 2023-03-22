import { Reducer } from 'redux-testkit';
import {
  AddBotCommandActionType,
  AddUserCommandActionType,
  ADD_BOT_COMMAND,
  ADD_USER_COMMAND,
} from '../actions';
import { IApplicationState } from '../states';
import chatReducer from '.';

describe('Reducers tests', () => {
  it(`handles ${ADD_BOT_COMMAND}`, () => {
    // GIVEN
    // const initialState: IApplicationState = {
    //   ...,
    // };
    // // WHEN
    // const action: AddBotCommandActionType = {
    //   type: ADD_BOT_COMMAND,
    //   payload: [mockBlotterItem1],
    // };
    // THEN
    // const expectedState: IApplicationState = {
    //   ...initialState,
    //   blotterItems: action.payload,
    // };
    // Reducer(chatReducer as any)
    //   .withState(initialState)
    //   .expect(action)
    //   .toReturnState(expectedState);
  });

  it(`handles ${ADD_USER_COMMAND}`, () => {
    // GIVEN
    // const initialState: IApplicationState = {
    //   ...initialState,
    //   blotterItems: [mockBlotterItem1],
    // };
    // // WHEN
    // const action: AddUserCommandActionType = {
    //   type: ADD_USER_COMMAND,
    //   id: 'blotterItem1',
    // };
    //   // THEN
    //   const expectedState: IApplicationState = {
    //     ...initialState,
    //     blotterItems: [],
    //   };
    //   Reducer(chatReducer as any)
    //     .withState(initialState)
    //     .expect(action)
    //     .toReturnState(expectedState);
    // });
  });
});
