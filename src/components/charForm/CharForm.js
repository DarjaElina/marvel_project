import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useMarvelService from '../../services/MarvelService';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './charForm.scss';



const CharForm = () => {

    const [foundedChar, setFoundedChar] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')
    
    const {findCharacter} = useMarvelService();

    const findChar = (value) => {
        findCharacter(value)
        .then(onFoundedCharLoaded)
        .catch(onError)
    }

    const onFoundedCharLoaded = (foundedChar) => {
        setFoundedChar(foundedChar)
        setErrorMessage("")
    }

    const onError = () => {
        setErrorMessage("There is no such character. Please check the name and try again")
        setFoundedChar([])
    }
    
    

    const style = !foundedChar.name ? {"display": "none"} : {"display": "flex", "color": "#03710E", "font-size": 18, "justifyContent": "space-between", "alignItems": "center", "fontWeight": 700};

   
    return (
    
        <Formik
            initialValues={{
                name: ''
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                        .required('This field is required')
    
            })}
            onSubmit={values => findChar(values.name)}
            >
                {({ errors }) => (
                    <Form className="char__form">
                    <h2>Or find a character by name:</h2>
                    
                        <Field
                            name="name" 
                            className="char__form_search-input"
                            placeholder="Enter name"
                            id="name"
                            type="text"
                        />
                        <button type="submit" className="button button__main" style={{"marginLeft": 24}}>
                            <div className="inner">Find</div>
                        </button>
                        {errors.name ? (
                            <div className="char__form_validation-error">{errors.name}</div>
                        ) : null}
                        <div style={style}>
                            <div>There is! Visit {foundedChar.name} page?</div>
                                <Link to={`/characters/${foundedChar.id}`} className="button button__main button__secondary" style={{"marginLeft": 62}}>
                                    <div className="inner">To page</div>
                                </Link>
                        </div>
                        <div style={{"color": "#9F0013", "fontSize": 18, "fontWeight": 700}}>{errorMessage}</div>
                    </Form>
                )}
                
        </Formik>
    )
}

export default CharForm;