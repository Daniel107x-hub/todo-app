import { GoogleLogin } from "@react-oauth/google";
import { useLoginMutation } from "../../redux/Auth/AuthSlice";
import { setTokenInLocalStorage } from "../../utils/LocalStorageUtils";

export type AuthResponse = {
    credential: string;
    clientId: string;
    select_by: string;
}

export type LoginResponse = {
    token: string;
}

const LoginPage = () => {
    const [login, result] = useLoginMutation<AuthResponse>();
    const onSuccess = async (response:any) => {
        console.log('Login Success:', response);
        const data = (await login(response.credential)).data;
        const token = data?.token; 
        if(!token) return;
        // Successfully authenticated
        setTokenInLocalStorage(token);
    };

    const onFailure = () => {
        console.log('Login Failed:');
    };

    return (
    <div>
        <h2>Login with Google</h2>
        <GoogleLogin
            onSuccess={onSuccess}
            onError={onFailure}
        />
    </div>
    );
};

export default LoginPage;