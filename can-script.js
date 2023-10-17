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

    // setting default value to lastCategory
    let lastCateory = category.value;
    let lastSearch = '';

    let categoryGroup;
    let finalGroup;

    // initially set final group of results to all products, to be displayed
    finalGroup = Products;
    updateDisplay();

    // set empty values to result container, before searching function executes
    categoryGroup = [];
    finalGroup = [];
    
    searchBtn.addEventListener("click", selectCategory);

    function selectCategory(e) {
        // disable the default page reload event of form to preserve data
        e.preventDefault();

        // erase the previously hold results
        categoryGroup = [];
        finalGroup = [];

        if(category.value === lastCateory && searchTerm.value.trim() === lastSearch){
            return;
        } else {
            lastCateory = category.value;
            lastSearch = searchTerm.value.trim();

            if(lastCateory === 'All'){
                categoryGroup = Products;
                selectProducts();
            } else {
                const lowerCaseType = category.value.toLowerCase();
                categoryGroup = Products.filter( product => product.type === lowerCaseType);
                selectProducts();
            }
        }

    }

    function selectProducts(){
        
        if(searchTerm.value.trim() === ''){
            // if no items to search in category, display all items in that category
            finalGroup = categoryGroup;
        } else {
            const lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();
            // if search item is there, filter through json using includes method to select particular product
            finalGroup = categoryGroup.filter(product => product.name.includes(lowerCaseSearchTerm));      
        }

        updateDisplay();
    }

    function updateDisplay() {
        // remove prvious results displayed in <main>
        while(main.firstChild){
            main.removeChild(main.firstChild);
        }

        if(finalGroup.length === 0){
            const para = document.createElement("p");
            para.textContent = "No results to display";
            main.appendChild(para);
        } else {
            for(const product of finalGroup){
                fetchBlob(product);
            }
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

