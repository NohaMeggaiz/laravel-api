import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const pwdconf = useRef();
    const navigate = useNavigate();

    const Submit = async (ev) => {
        ev.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: pwdconf.current.value,
        };

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register", payload);
            const { user, token } = response.data;
            console.log("Received Token:", token);

            if (token) {
                localStorage.setItem("ACCESS_TOKEN", token);
                console.log("Token stored in localStorage:", localStorage.getItem("ACCESS_TOKEN")); // Verify storage
                navigate("/products"); // Redirect after successful registration
            } else {
                alert("Registration failed. No token received.");
            }
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                console.log("Validation Errors:", response.data.errors);
            } else {
                console.error("Registration error:", err);
                alert("An error occurred during registration.");
            }
        }
    };

    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">Create A New Account</h1>
                <form onSubmit={Submit}>
                    <input ref={nameRef} type="text" placeholder="Name" required />
                    <input ref={emailRef} type="email" placeholder="Email" required />
                    <input ref={passwordRef} type="password" placeholder="Password" required />
                    <input ref={pwdconf} type="password" placeholder="Confirm Password" required />

                    <button className="btn btn-block">Register</button>
                    <p className="message">
                        Already Have An Account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
