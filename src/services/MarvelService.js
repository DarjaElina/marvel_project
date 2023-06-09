import {useHttp} from '../hooks/http.hook'

const useMarvelService = () => {
    const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=612399cd65672cbcfc4caa418fd9f0a7';
    const _baseOffset = 210;


   

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
        
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComic);
    }

    const findCharacter = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        if (res.data.results.length === 0) {
            throw new Error("There is no such character. Check the name and try again.")
        }
        return _transformCharacter(res.data.results[0]);
    }
    

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
    }

    const _transformComic = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? comics.prices[0].price + '$' : 'not available'
        }
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 230)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items.length <= 10 ? char.comics.items : char.comics.items.slice(0, 10)
        }
        
    }

    return { 
            process, 
            setProcess,
            clearError,
            getAllCharacters, 
            getCharacter,
            getAllComics, 
            getComic, 
            findCharacter}
    
}

export default useMarvelService;