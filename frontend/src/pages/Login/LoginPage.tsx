import { GoogleLogin } from "@react-oauth/google";
import { useLoginMutation, login } from "../../redux/Auth/AuthSlice";
import { setTokenInLocalStorage } from "../../utils/LocalStorageUtils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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
        dispatch(login({token}));
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