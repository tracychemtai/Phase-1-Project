// Add event listener to search button
document.getElementById("button").addEventListener('click', () => {
    // Get value from the input field
    let inputValue = document.getElementById('inputName').value
    // Get details container element
    let details = document.getElementById("details")
details.innerHTML = ""
// Fetch data from mealsDB API
    fetch(`https:www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            // Get items container element
            const items = document.getElementById("items")
            items.innerHTML = ""
            if (data.meals == null) {
                // Dispalys message if no meals were found
                document.getElementById("msg").style.display = "block"
            } else {
                document.getElementById("msg").style.display = "none"
                console.log(data.meals)
                data.meals.forEach(meal => {
                    // Create a div for each meal item
                    itemDiv = document.createElement("div")
                    itemDiv.className = "m-2 singleItem"
                    // Add click event listener to show details of the meal
                    itemDiv.setAttribute('onclick', `details('${meal.idMeal}')`)
                // Constructs HTML for each meal item
                    let itemInfo = `
                    <div class="card" style="width: 12rem;">
                       <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                       <div class="card-body text-center">
                  <h5 class="card-text">${meal.strMeal}</h5>
                       </div>
                    </div>
                    `
                    itemDiv.innerHTML = itemInfo
                    items.appendChild(itemDiv)

                })
            }

        })

})

// Function to fetch and display details of a meal
function details(id) {
    // Fetch details of the meal by its ID
    console.log(id)
    fetch(`https:www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(detail => {
            let meal = detail.meals[0]
            console.log(meal)
            let details = document.getElementById("details")
            details.innerHTML = ""
            let detailsDiv = document.createElement("div")
            // Constructs HTML for the details
            let detailsInfo = `
                <div class="card" style="width: 19rem;">
                       <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                       <div class="card-body">
                          <h3 class="card-text">${meal.strMeal}</h3>
                          <h6>Ingredients</h6>
                          <ul>
                          <li>${meal.strArea}</li>
                          <li>${meal.strCategory}</li>
                          <li>${meal.strIngredient1}</li>
                          <li>${meal.strIngredient2}</li>
                          <li>${meal.strIngredient3}</li>
                          <li>${meal.strIngredient4}</li>
                          <li>${meal.strIngredient5}</li>
                    


                       </div>
                </div>
        `
// Sets the HTML content of the details div
        detailsDiv.innerHTML = detailsInfo
        details.appendChild(detailsDiv)
        })
}
