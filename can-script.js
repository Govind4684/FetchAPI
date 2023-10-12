fetch("products.json")
    .then((response) => {
        if(!response.ok){
            throw new Error(`HTTP error : ${response.status}`);
        }

        return response.json();
    })
    .then((json) => main(json))
    .catch((err) => console.error(`Fetch issue : ${err.message}`));

function main(Products) {
    const category = document.querySelector("#category");
    const searchTerm =  document.querySelector("#searchTerm");
    const searchBtn = document.querySelector("button");
    const main = document.querySelector("main");

    updateDisplay();

    function updateDisplay() {
        for ( const product of Products) {
            fetchBlob(product);
        }
    }

    function fetchBlob(product){
        const url = `images/${product.image}`;

        fetch(url)
            .then((response) => {

                if(!response.ok){
                    throw new Error(`HTTP error : ${response.status}`);
                }

                // returning response in blob format for the image, masking the actual url and properties
                return response.blob();
            })
            .then((blob) => showProduct(product,blob))
            .catch((error) => console.error(`Error fetching image ${error.message}`));
    }    

    function showProduct(product,blob){

        // Internal object url to safely link image to product
        const objectURL = URL.createObjectURL(blob);

        const section = document.createElement("section");
        const para = document.createElement("p");
        const heading = document.createElement("h2");
        const image = document.createElement("img");

        // setting class value to sesction element and will use this to apply styling
        section.setAttribute("class", product.type);

        image.src = objectURL;
        image.alt = product.name;

        // Assigning text content to header after replacing first character by upper case character
        heading.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());

        // Fxing product price to 2 decimal places
        para.textContent = `$${product.price.toFixed(2)}`;

        main.appendChild(section);
        section.appendChild(heading);
        section.appendChild(para);
        section.appendChild(image);
    }

}

