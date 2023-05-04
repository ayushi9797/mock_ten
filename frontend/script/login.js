const form = document.querySelector('#form');
console.log(form)

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {

        let obj = {

            email: form.email.value,
            password: form.password.value
        }

        console.log(obj)
        loginUser(obj)

    } catch (error) {

        console.log(error.message)

    }
})


const loginUser = async (obj) => {
    try {

        let res = await fetch("http://localhost:8080/users/login", {
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
            window.location.href = "/backend/index.html"

            localStorage.setItem("token", JSON.stringify(data.token))


        } else {
            alert(`succesfully failed login`)
        }

    } catch (error) {

        console.log(error.message)
        alert(`succesfully failed registereed`)
    }
}