const userName=document.getElementById("name")
const password=document.getElementById("password")
const phone=document.getElementById("phone")
const email=document.getElementById("email")
const signup=document.getElementById("signup")

signup.addEventListener('click',signupUser)

async function signupUser(e){
    e.preventDefault()
    const obj={
        userName:userName.value,
        password:password.value,
        phone:phone.value,
        email:email.value
    }
    let res=await axios.post("http://localhost:3000/user/signup",obj)
    console.log(res)
}