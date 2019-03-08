import Axios from "axios";

export function getAPOD(date = '') {
    return Axios.get(`https://api.nasa.gov/planetary/apod?api_key=ZElStJtBJydqdJbP7v9z2PcfNSUXew9PAD8t75hY&date=${date}`)
}