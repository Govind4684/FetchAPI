fetch("products.json")
    .then((response) => {
        if(!response.ok){
            throw new Error(`HTTP error : ${response.status}`);
        }

        return response.json();
    })
    .then((json) => initialize(json))
    .catch((err) => console.error(`Fetch issue : ${err.message}`));


function initialize(json){
    console.log(json);
}

initialize;