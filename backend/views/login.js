const email=document.getElementById("email")
const password=document.getElementById("password")
const login=document.getElementById("login")
const loginError=document.getElementById("loginError")
const loginSuccess=document.getElementById("loginSuccess")

login.addEventListener("click",loginPage)

async function loginPage(e){
    try{
            e.preventDefault()
            const login_obj={
                email:email.value,
                password:password.value
            }
            const data=await axios.post("http://localhost:3000/user/login",login_obj)
            
}catch{
        console.log("error in login page FE")
    }
}
