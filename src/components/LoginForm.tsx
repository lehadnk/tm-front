import {authenticate} from "../domain/AuthenticationService.ts";
import {useNavigate} from "react-router-dom";
import {UnauthenticatedException} from "../requests/exceptions/UnauthenticatedException.ts";

export default function LoginForm() {
    const navigate = useNavigate()

    async function handleSubmit() {
        try {
            const authenticationResponse = await authenticate('lehadnk@gmail.com', 'qweqwe')

            // @todo put it to state
            console.log(authenticationResponse)

            navigate("/torrents")
        } catch (e: unknown) {
            if (e instanceof UnauthenticatedException) {
                alert("Not authenticated")
            } else {
                alert("Authentication failed. Please try again later." + e);
            }
        }
    }

    return (
        <>
            <div>
                <input type="email" />
                <input type="password" />
                <button onClick={handleSubmit}>Login</button>
            </div>
            Login Form
        </>
    );
}