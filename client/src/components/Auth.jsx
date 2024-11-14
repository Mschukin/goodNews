import axios from "axios";
import { useState } from "react";

function Auth({setUs}) {

const[email,setEmail] = useState('')
const[password,setPassword] = useState('')

async function authUser(event) {
    event.preventDefault()
    try {
        const{data} = await axios.post('/api/auth/authorization',{name,email,password})
        setUs(data)
    } catch (error) {
        console.log(error.message);
        alert(error.message);
    }
}



    return (
        <form onSubmit={authUser}>
        <div className="container sm">
<input value={email} onChange={event=>setEmail(event.target.value)}  className="form-control form-control-lg mt-5" type="text" placeholder="Введите почту" aria-label=".form-control-lg example" autoFocus/>
<input value={password} onChange={event=>setPassword(event.target.value)} className="form-control form-control-lg mt-2" type="text" placeholder="Введите пароль" aria-label=".form-control-lg example" autoFocus/>
<button  type="submit"  className="btn btn-primary btn-lg mt-5">Войти</button>

        </div>
        </form>
    );
}

export default Auth;