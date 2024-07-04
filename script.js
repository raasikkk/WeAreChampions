import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://firstfirebaseproject-63e62-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const firstfirebaseproject = ref(database, "endorsementInfo")

const publishBtn = document.getElementById('publishBtn')
const endorsementField = document.getElementById('endorsementField')
const fromField = document.getElementById('fromInputField')
const toField = document.getElementById('toInputField')
const endorsementList = document.getElementById('endorsementsLists')


publishBtn.addEventListener('click', function() {
    let endorsementValue = endorsementField.value
    let fromValue = fromField.value
    let toValue = toField.value

    let endorsementPushInfo = [endorsementValue, fromValue, toValue]

    push(firstfirebaseproject, endorsementPushInfo)

    clearInputField()
})

onValue(firstfirebaseproject, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearEndorsementList()
        
        console.log(itemsArray)

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemId = currentItem[0]
            let currentItemValues = currentItem[1]
            let currentItemMainValue = currentItemValues[0]
            let currentItemFromValue = currentItemValues[1]
            let currentItemToValue = currentItemValues[2]
            
            appendItemToEndorsementList(currentItemMainValue, currentItemFromValue, currentItemToValue)
        } 
    } else {
        endorsementList.innerHTML = "No endorsements here... yet"
    }
})

function clearEndorsementList() {
    endorsementList.innerHTML = ""
}

function clearInputField() {
    endorsementField.value = ""
    fromField.value = ""
    toField.value = ""
}

function appendItemToEndorsementList(value, from, to) {
    let newEl = document.createElement("li")
    let toEl = document.createElement("div")
    toEl.className = 'to'
    toEl.textContent = `To ${to}`
    let endorsementsTextEl = document.createElement('div')
    endorsementsTextEl.className = 'endorsements_text'
    endorsementsTextEl.textContent = value
    let fromEl = document.createElement('div')
    fromEl.className = 'from'
    fromEl.textContent = `From ${from}`

    newEl.append(toEl, endorsementsTextEl, fromEl)

    
    endorsementList.append(newEl)
}