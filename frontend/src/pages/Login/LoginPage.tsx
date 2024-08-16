import { GoogleLogin } from "@react-oauth/google";
import {setUser, useLoginMutation} from "../../redux/Auth/AuthSlice";
import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { setTokenInLocalStorage } from "../../utils/LocalStorageUtils";
import {toast} from "react-toastify";
import {User} from "../../types/Todo";
import {Card} from "react-bootstrap";
import styles from "./LoginPage.module.css";

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
        navigate("/");
    };

    const onFailure = () => {
        console.log('Login Failed:');
    };

    if(user) return <Navigate to={"/"}/>

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