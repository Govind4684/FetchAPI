fetch("products.json")
    .then((response) => {
        if(!response.ok){
            throw new Error(`HTTP error : ${response.status}`);
        }

        return response.json();
    })
    .then((json) => main(json))
    .catch((err) => console.error(`Fetch issue : ${err.message}`));


// function initialize(products){

//      // grab the UI elements that we need to manipulate
//     const category = document.querySelector('#category');
//     const searchTerm = document.querySelector('#searchTerm');
//     const searchBtn = document.querySelector('button');
//     const main = document.querySelector('main');

//     updateDisplay();


//     // start the process of updating the display with the new set of products
//     function updateDisplay() {
//         for (const product of products) {
//             fetchBlob(product);
//         }
//     }
    
//     function fetchBlob(product){
//          // construct the URL path to the image file from the product.image property
//         const url = `images/${product.image}`;
//         // Use fetch to fetch the image, and convert the resulting response to a blob
//         // Again, if any errors occur we report them in the console.
//         fetch(url)
//         .then( response => {
//             if (!response.ok) {
//             throw new Error(`HTTP error: ${response.status}`);
//             }
//             return response.blob();
//         })
//         .then( blob => showProduct(blob, product) )
//         .catch( err => console.error(`Fetch problem: ${err.message}`) );
//     }

//     // Display a product inside the <main> element
//     function showProduct(blob, product) {
//         // Convert the blob to an object URL — this is basically an temporary internal URL
//         // that points to an object stored inside the browser
//         const objectURL = URL.createObjectURL(blob);
//         // create <section>, <h2>, <p>, and <img> elements
//         const section = document.createElement('section');
//         const heading = document.createElement('h2');
//         const para = document.createElement('p');
//         const image = document.createElement('img');

//         // give the <section> a classname equal to the product "type" property so it will display the correct icon
//         section.setAttribute('class', product.type);

//         // Give the <h2> textContent equal to the product "name" property, but with the first character
//         // replaced with the uppercase version of the first character
//         heading.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());

//         // Give the <p> textContent equal to the product "price" property, with a $ sign in front
//         // toFixed(2) is used to fix the price at 2 decimal places, so for example 1.40 is displayed
//         // as 1.40, not 1.4.
//         para.textContent = `$${product.price.toFixed(2)}`;

//         // Set the src of the <img> element to the ObjectURL, and the alt to the product "name" property
//         image.src = objectURL;
//         image.alt = product.name;

//         // append the elements to the DOM as appropriate, to add the product to the UI
//         main.appendChild(section);
//         section.appendChild(heading);
//         section.appendChild(para);
//         section.appendChild(image);
//     }

// }

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

