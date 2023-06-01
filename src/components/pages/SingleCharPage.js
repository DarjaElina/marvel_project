import { Helmet } from "react-helmet";
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';

import './singleCharPage.scss';

const SingleCharPage = () => {

    const {charId} = useParams();
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();


    useEffect(() => {
        updateChar()
    }, [charId])

    
    const updateChar = () => {
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    
    const onCharLoaded = (char) => {
        setChar(char);
    }
    

    
    const errorMessage = error ?  <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;


    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail} = char;
    let imgStyle = {'objectFit' : 'cover'};
            if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

    return (
        <>
            <Helmet>
            <meta
                name="description"
                content={`${name} character`}
                />
            <title>{name}</title>
            </Helmet>
            <AppBanner/>
            <div className="single-char">
                <img style={imgStyle} src={thumbnail} alt={name} className="single-char__img"/>
                <div className="single-char__info">
                    <h2 className="single-char__name">{name}</h2>
                    <p className="single-char__descr">{description}</p>
                </div>
            </div>
        </>
    )
}

export default SingleCharPage;