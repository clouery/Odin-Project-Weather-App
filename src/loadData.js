let data;

export const loadData = async(searchInput) => {
    const encodedInput = encodeURIComponent(searchInput);
    console.log("country is: " + encodedInput);
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedInput}?key=W58CWY48DGQ7R9XXKMUYP8D5G&unitGroup=metric`);
    if(!response.ok){
        console.log("failed to fetch weather");
    }
    
    console.log("fetch weather success!");

    data = await response.json();
    // console.log(data);

    // return a json file
    return data;
};
