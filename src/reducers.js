import {combineReducers} from "redux";
import {ACTIONS, INIT_DOCUMENT, INITED_DOCUMENT, SAVE_DOCUMENT, SAVED_DOCUMENT} from "./actions";

export const FORM_TYPES = {
    textfield: 'textfield',
    button: 'button',
}

const initialDocumentState = {
    isLoading: false,
    label: '',
    id: '',
    content: [],
};

const documentReducer = (state = initialDocumentState, action) => {
    switch (action.type) {
        case ACTIONS.INIT_DOCUMENT: {
            return {
                ...state,
                isLoading: true,
                id: action.payload,
            }
        }

        case ACTIONS.INITED_DOCUMENT: {
            return {
                ...state,
                isLoading: false,
                content: action.payload,
            }
        }

        case ACTIONS.ADD: {
            return {
                ...state,
                content: [
                    ...state.content,
                    {
                        id: action.payload.id,
                        formType: action.payload.formType,
                        label: state.label,
                    }
                ],
            }
        }

        case ACTIONS.DELETE: {
            const indexToRemove = state.content.findIndex(element => element.label === state.label);

            if (indexToRemove === -1) {
                return state;
            }

            return {
                ...state,
                content: [
                    ...state.content.slice(0, indexToRemove),
                    ...state.content.slice(indexToRemove + 1),
                ],
            };
        }

        case ACTIONS.SAVE_DOCUMENT: {
            return {
                ...state,
                isLoading: true,
            };
        }

        case ACTIONS.SAVED_DOCUMENT: {
            return {
                ...state,
                isLoading: false,
            }
        }

        case ACTIONS.SET_LABEL: {
            return {
                ...state,
                label: action.payload,
            }
        }

        default: {
            return state;
        }
    }
};

export const saveDocument = () => {
    return async (dispatch, getState) => {
        dispatch(SAVE_DOCUMENT);

        const state = getState();

        await fetch(`https://easysend-frontend-exam.herokuapp.com/document/${state.document.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(state.document.content),
        });

        dispatch(SAVED_DOCUMENT);
    }
};

export const initDocument = (id) => {
    return async (dispatch, getState) => {
        dispatch(INIT_DOCUMENT(id));

        const state = getState();

        const rawResponse = await fetch(`https://easysend-frontend-exam.herokuapp.com/document/${state.document.id}`);

        const response = await rawResponse.json() || [];

        dispatch(INITED_DOCUMENT(response));
    }
};

export const rootReducer = combineReducers({
    document: documentReducer,
});