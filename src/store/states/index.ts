export interface IApplicationState {
  divs: any;
}

export const initialState: IApplicationState = {
  divs: [
    {
      type: 'bot-command',
      text: 'Hello, How can I help ?',
      id: 0,
      news:[]
    },
  ],
};
