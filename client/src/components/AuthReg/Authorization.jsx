import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance, setAccessToken } from "../../axiosInstance";

export default function Authorization({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const authSubmitHandle = async (event) => {
    event.preventDefault();
    try {
      if (email.trim() === '' || password.trim() === '') {
        setError('Please, fill the fields')
        return
      }

      const responce = await axiosInstance.post('/auth/authorization', {
        email,
        password
      })

      if (responce.status === 200) {
        setEmail('')
        setPassword('')
        setAccessToken(response.data.accessToken);        
        setUser(responce.data.user)
        setError(null)
        navigate('/news')
        return
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  }

  return (
    <div>
      <h1>Authorization</h1>
      {error && <p>{error}</p>}
      <form onSubmit={ authSubmitHandle } className="registration-form">
        <input
          type="email"
          value={ email }
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="registration-form__input"
        />
        <input
          type="password"
          value={ password }
          minLength={3}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          className="registration-form__input"
        />
        <button type="submit" className="btn btn-primary btn-lg mt-5">
          Войти в учетную запись
        </button>
    </form>
    </div>
  );
}
