import { GoogleLogin } from "@react-oauth/google";
import { useLoginMutation } from "../../redux/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
    const [executeLogin, result] = useLoginMutation<AuthResponse>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSuccess = async (response:any) => {
        const data = (await executeLogin(response.credential)).data;
        const token = data?.token; 
        if(!token) return;
        setTokenInLocalStorage(token);
        navigate("/");
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