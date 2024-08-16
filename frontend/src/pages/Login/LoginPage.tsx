import { GoogleLogin } from "@react-oauth/google";
import {setUser} from "../../redux/Auth/AuthSlice";
import { useLoginMutation} from "../../redux/Auth/AuthApi";
import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { setTokenInLocalStorage } from "../../utils/LocalStorageUtils";
import {toast} from "react-toastify";
import {User} from "../../types/Todo";
import {Card} from "react-bootstrap";
import styles from "./LoginPage.module.css";
import {ROOT_PATH} from "../../constants/constants";

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
    const [executeLogin] = useLoginMutation<AuthResponse>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth.user);
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
        navigate(ROOT_PATH);
    };

    const onFailure = () => {
        console.log('Login Failed:');
    };

    if(user) return <Navigate to={ROOT_PATH}/>

    return (
    <div className={styles.content}>
        <Card className={styles.card}>
            <h2>Login</h2>
            <div className={styles.loginOptions}>
                <span className={styles.option}>
                    <h4>Login with google</h4>
                    <GoogleLogin
                        shape="pill"
                        theme="filled_blue"
                        onSuccess={onSuccess}
                        onError={onFailure}
                    />
                </span>
            </div>
        </Card>
    </div>
    );
};

export default LoginPage;