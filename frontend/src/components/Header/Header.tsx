import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {removeTokenFromLocalStorage} from "../../utils/LocalStorageUtils";
import {removeUser} from "../../redux/Auth/AuthSlice";
import {useNavigate} from "react-router-dom";
import UserBadge from "./UserBadge";

type HeaderLink = {
    title: string;
    url: string;
    isPrivate?: boolean;
};

type HeaderProps = {
    brand?: HeaderLink;
    links: HeaderLink[];
};

const Header = (props: HeaderProps) => {
    const user = useSelector((state: any) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { brand, links } = props;
    const handleLogout = () => {
        removeTokenFromLocalStorage();
        dispatch(removeUser())
        navigate("/login");
    };
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                {
                    brand && <Navbar.Brand href={brand.url}>{brand.title}</Navbar.Brand>
                }
                <Nav>
                    {
                        links.map((link) => {
                            if(!link.isPrivate || user) return <Nav.Link key={link.url} href={link.url}>{link.title}</Nav.Link>
                            return <></>
                        })
                    }
                </Nav>
                {
                    user && <section>
                        <UserBadge>
                            <Button variant="danger" onClick={handleLogout}>Logout</Button>
                        </UserBadge>
                    </section>
                }
            </Container>
        </Navbar>
    );
}

export default Header;