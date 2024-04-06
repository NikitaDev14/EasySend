import {Fragment, useEffect, useRef, useState} from "react";
import {Routes, Route, useNavigate, useMatch} from 'react-router-dom';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {ADD, DELETE, INIT_DOCUMENT, SET_LABEL} from "./actions";
import {FORM_TYPES, initDocument, saveDocument} from "./reducers";

const generateRandomId = () => {
    return Math.random().toString(36).substring(7);
};

const Index = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/${generateRandomId()}`, { replace: true });
    }, []);

    return <Fragment></Fragment>;
}

const Loading = () => {
    return (
        <Fragment>
            <h1>Loading...</h1>
        </Fragment>
    )
}

const Header = () => {
    const dispatch = useDispatch();

    return (
        <div className='bordered flex p-1'>
            <button onClick={() => dispatch(
                ADD({id: generateRandomId(), formType: FORM_TYPES.textfield})
            )}>Add text</button>
            <button onClick={() => dispatch(
                ADD({id: generateRandomId(), formType: FORM_TYPES.button})
            )}>Add button</button>
            <button
                className='header_save_btn'
                onClick={() => dispatch(saveDocument())}>
                Save
            </button>
        </div>
    );
}

const Sidebar = () => {
    const dispatch = useDispatch();
    const label = useSelector(state => state.document.label);

    return (
        <div className='bordered p-1' tabIndex='-1'>
            <p>Textfield:</p>
            <p>ID {label}</p>
            <div>
                <label>Label</label>
                <input type='text' onChange={
                    (event) =>
                        dispatch(SET_LABEL(event.target.value))
                }/>
            </div>
            <button onClick={() => dispatch(DELETE)}>Delete</button>
        </div>
    )
}

const FormBody = () => {
    const formElements = useSelector(state => state.document.content);

    return (
        <div className='bordered form_body p-1' tabIndex='0'>
            Form
            {formElements.map((formElement, index) => {
                switch (formElement.formType) {
                    case FORM_TYPES.textfield: {
                        return (<div tabIndex={index} key={formElement.id}>
                            <label>{formElement.label}</label>
                            <input/>
                        </div>);
                    }

                    case FORM_TYPES.button: {
                        return <button tabIndex={index} key={formElement.id}>
                            {formElement.label}
                        </button>;
                    }
                }
            })}
        </div>
    )
}

const MiniFormEditor = () => {
    const routeMatch = useMatch('/:id');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initDocument(routeMatch.params.id));
    }, [routeMatch.params.id]);

    return (
        <Fragment>
            <Header/>
            <div className='flex'>
                <Sidebar/>
                <FormBody/>
            </div>
        </Fragment>
    )
}

export const App = () => {
    const isLoading = useSelector(state => state.document.isLoading);

    return (
        <Fragment>
            {isLoading && <Loading/> }

            <Routes>
                <Route index path="/" element={<Index />} />
                <Route path="/:id" element={<MiniFormEditor />} />
            </Routes>
        </Fragment>
    );
}
