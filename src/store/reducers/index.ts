import { initialState } from "../states";

const chatReducer = (
    state = initialState,
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case "ADD_BOT_COMMAND":
            return {
                ...state,
                divs: [
                    ...state.divs,
                    {
                        type: "bot-command",
                        text: action.payload,
                        id: state.divs.length,
                    },
                ],
            };
        case "ADD_USER_COMMAND":
            return {
                ...state,
                divs: [
                    ...state.divs,
                    {
                        type: "user-command",
                        text: action.payload,
                        id: state.divs.length,
                    },
                ],
            };

            case "ADD_NEWS_COMMAND":
                console.log(action.payload)
                return{
                    ...state,divs:[...state.divs,{type:"news-command",text:action.payload.response,id:state.divs.length,news:action.payload.news},]
                }
        default:
            return state;
    }
};

export default chatReducer;
