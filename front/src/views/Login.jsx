import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const Submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login", {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });

            const { token } = response.data;
            console.log("Received Token:", token);

            if (token) {
                localStorage.setItem("ACCESS_TOKEN", token);
                console.log("Token stored in localStorage:", localStorage.getItem("ACCESS_TOKEN")); // Verify storage
                navigate("/products"); // Redirect after login
            } else {
                alert("Authentication failed. No token received.");
            }
        } catch (error) {
            console.error("Login error:", error);
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
