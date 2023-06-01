import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';

import './singleCharPage.scss';

const SingleCharPage = () => {

    const {charId} = useParams();
    const [char, setChar] = useState(null);

    const {getCharacter, clearError, process, setProcess} = useMarvelService();


    useEffect(() => {
        updateChar()
    }, [charId])

    
    const updateChar = () => {
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    
    const onCharLoaded = (char) => {
        setChar(char);
    }
    

    
 


    return (
        <>
           {setContent(process, View, char)}
        </>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail} = data;
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