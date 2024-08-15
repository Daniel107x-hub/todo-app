import {Container, Nav, Navbar} from "react-bootstrap";
import {useState} from "react";

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
    const [userData, setUserData] = useState(null);
    const { brand, links } = props;
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                {
                    brand && <Navbar.Brand href={brand.url}>{brand.title}</Navbar.Brand>
                }
                <Nav>
                    {
                        links.map((link) => {
                            if(!link.isPrivate || userData) return <Nav.Link key={link.url} href={link.url}>{link.title}</Nav.Link>
                            return <></>
                        })
                    }
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;