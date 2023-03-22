export const ADD_USER_COMMAND = 'ADD_USER_COMMAND';
export interface AddUserCommandActionType {
  type: typeof ADD_USER_COMMAND;
  payload: any;
}

export const ADD_BOT_COMMAND = 'ADD_BOT_COMMAND';
export interface AddBotCommandActionType {
  type: typeof ADD_BOT_COMMAND;
  payload: any;
}

export type ActionTypes = AddBotCommandActionType | AddUserCommandActionType;
