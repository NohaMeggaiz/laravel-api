import { useRef } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    const Submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login", {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });

            setUser(response.data.user);
            setToken(response.data.token);
            navigate("/products"); // Redirect after successful login
        } catch (error) {
            alert("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">Login To Your Account</h1>
                <form onSubmit={Submit}>
                    <input ref={emailRef} type="email" placeholder="Email" required />
                    <input ref={passwordRef} type="password" placeholder="Password" required />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered? <Link to="/register">Create a new account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
