import { GoogleLogin } from "@react-oauth/google";
import {setUser, useLoginMutation} from "../../redux/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTokenInLocalStorage } from "../../utils/LocalStorageUtils";
import {toast} from "react-toastify";
import {User} from "../../types/Todo";

export type AuthResponse = {
    credential: string;
    clientId: string;
    select_by: string;
}

export type LoginResponse = {
    token: string;
    user: User
}

const LoginPage = () => {
    const [executeLogin, result] = useLoginMutation<AuthResponse>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSuccess = async (response:any) => {
        const data = (await executeLogin(response.credential)).data as LoginResponse;
        const token = data?.token;
        const user = data?.user;
        if(!token || !user){
            toast.error("Login Failed");
            return;
        }
        setTokenInLocalStorage(token);
        dispatch(setUser(user));
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