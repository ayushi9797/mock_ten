const socket = io()

let name;

// selexcting textarea and messagearea

let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

console.log(textarea, messageArea)

do {
    name = prompt(`your name first please`)
} while (!name)

// pressing send buttoon
textarea.addEventListener("keyup", async (element) => {
    try {
        if (element.key == "Enter") {
            sendMessage(element.target.value)
        }

    } catch (error) {
        console.log(error.message)
    }


})

// sending the mesage
async function sendMessage(message) {
    try {
        let msg = {
            // user and message content 
            user: name,
            message: message.trim()
        }

        // appending the message

        appendMessage(msg, "outgoing")

        textarea.value = ""

        // to the server side

        socket.emit("message", msg)

    } catch (error) {

        console.log(error.message)

    }

}


// appending message server

async function appendMessage(msg, type) {

    try {
        // making div for message

        let mainDiv = document.createElement("div")
        let className = type

        mainDiv.classList.add(className, "message")


        let markup = `
    <h3>${msg.user}</h3>
    <p>${msg.message}</p>
    
    `

        mainDiv.innerHTML = markup;

        messageArea.appendChild(mainDiv)

    } catch (error) {

        console.log(error.message)

    }


}



// get your message


socket.on("message", async (msg) => {
    try {

        console.log(msg)

        appendMessage(msg, "incoming message")

    } catch (error) {

        console.log(error.message)

    }

})