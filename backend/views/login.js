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
            if(data.data.success===false){
                const errorText=document.createTextNode(data.data.message)
                loginError.appendChild(errorText)
                loginError.style.color="red"
            setTimeout(()=>{
                loginError.removeChild(errorText)
            },3000)
        }

     //If email and password are valid
    if(data.data.success){
        const successText=document.createTextNode(data.data.message)
        loginSuccess.appendChild(successText)
        loginSuccess.style.color="green"
        setTimeout(()=>{
            loginSuccess.removeChild(successText)
        },3000)
        localStorage.setItem("token",data.data.token)
        //connecting login page to expense app
        window.location.href="./expense.html"
    }
}catch{
        console.log("error in login page FE")
    }
}
