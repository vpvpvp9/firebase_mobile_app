import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://products1-77ccf-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const moviesInDB = ref(database, "mvList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const moviesList = document.getElementById("movies-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(moviesInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(moviesInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearMoviesListEL()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendMovieTo(currentItem)
        }    
    } else {
        moviesList.innerHTML = "No movies here"
    }
})

function clearMoviesListEL() {
    moviesList.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendMovieTo(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `mvList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    moviesList.append(newEl)
}