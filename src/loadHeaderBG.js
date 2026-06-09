import { loadGifs } from "./gifs.js";

export const loadHeader = async(event) => {
    const headerBG = await loadGifs();
    const header = document.querySelector('.header');
    header.style.backgroundImage = `url(${headerBG})`;
}