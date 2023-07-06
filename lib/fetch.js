import { module } from '../config/testing'

export const apiFetch = async ( url, option) => {
    return fetch(`${module.REACT_APP_API_KEY}${url}`, {...option})
    
}