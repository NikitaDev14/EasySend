export const ACTIONS = {
    SAVE_DOCUMENT: 'SAVE_DOCUMENT',
    SAVED_DOCUMENT: 'SAVED_DOCUMENT',
    INIT_DOCUMENT: 'INIT_DOCUMENT',
    INITED_DOCUMENT: 'INITED_DOCUMENT',
    ADD: 'ADD',
    DELETE: 'DELETE',
    SET_LABEL: 'SET_LABEL',
};

export const SAVE_DOCUMENT = {
  type: ACTIONS.SAVE_DOCUMENT,
};

export const SAVED_DOCUMENT = {
    type: ACTIONS.SAVED_DOCUMENT,
};

export const INIT_DOCUMENT = (payload) => ({
    type: ACTIONS.INIT_DOCUMENT,
    payload,
});

export const INITED_DOCUMENT = (payload) => ({
    type: ACTIONS.INITED_DOCUMENT,
    payload,
});

export const ADD = (payload) => ({
    type: ACTIONS.ADD,
    payload,
});

export const DELETE = {
    type: ACTIONS.DELETE,
};

export const SET_LABEL = (payload) => ({
    type: ACTIONS.SET_LABEL,
    payload,
});