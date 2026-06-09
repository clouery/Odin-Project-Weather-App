

export const loadGifs = async(weather) => {
    const encodedInput = encodeURIComponent(weather);

    let response;
    if(weather === "") {
        // response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=ytJn2PKdxhabvU508wbi68ZDPW9c6C8k`);
    } else {
        // response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=ytJn2PKdxhabvU508wbi68ZDPW9c6C8k&s=${encodedInput}`);
    }

    if(!response.ok) {
        console.error("failed to fetch gif" + response.status + response.statusText);
        return;
    }

    console.log("fetch gif success!");
    
    const data = await response.json();

    // save img as data
    if(weather === ""){
        return data.data[0].images.original.url;
    }
    return data.data.images.original.url;
}