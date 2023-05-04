const form = document.querySelector('#form');
console.log(form)

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {

        let obj = {
            name: form.name.value,
            email: form.email.value,
            password: form.password.value
        }

        console.log(obj)
        registerUser(obj)

    } catch (error) {

        console.log(error.message)

    }
})


const registerUser = async (obj) => {
    try {

        let res = await fetch("http://localhost:8080/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        })

        if (res.status === 200) {
            let data = await res.json()
            console.log(data)
            alert(`succesfully registered`)
            window.location.reload()


        } else {
            alert(`succesfully failed registereed`)
        }

    } catch (error) {

        console.log(error.message)
        alert(`succesfully failed registereed`)
    }
}