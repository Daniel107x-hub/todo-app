import {Container, Nav, Navbar} from "react-bootstrap";

type HeaderLink = {
    title: string;
    url: string;
};

type HeaderProps = {
    brand?: HeaderLink;
    links: HeaderLink[];
};

const Header = (props: HeaderProps) => {
    const { brand, links } = props;
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                {
                    brand && <Navbar.Brand href={brand.url}>{brand.title}</Navbar.Brand>
                }
                <Nav>
                    {
                        links.map((link) => <Nav.Link key={link.url} href={link.url}>{link.title}</Nav.Link>)
                    }
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;