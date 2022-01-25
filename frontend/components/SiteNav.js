import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import AuthContext from '@/context/AuthContext'
import LoginModal from '@/components/LoginModal';
const SiteNav = (props) => {
    const context = useContext(AuthContext);
    const [modalShow, setModalShow] = React.useState(false);
    console.log('====================================');
    console.log(context);
    console.log('====================================');
    const { user } = context;
    return (
        <>
            <LoginModal
                block={true}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Navbar expand='sm' bg="dark" variant="dark" collapseOnSelect>
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Link href="/" passHref>
                        <Navbar.Brand>DKT Store</Navbar.Brand>
                    </Link>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="">
                            <Link href="/About" passHref>
                                <Nav.Link>About</Nav.Link>
                            </Link>
                        </Nav>

                        {
                            user ?

                                <Nav className="">
                                    <Link href="/Dashboard" passHref>
                                        <Nav.Link>Dashboard</Nav.Link>
                                    </Link>
                                </Nav>

                                :
                                ""
                        }
                    </Navbar.Collapse>
                    {
                        !user ?
                            <>
                            </>
                            // <Nav>

                            //     <Button variant="primary" onClick={() => setModalShow(true)}>Login</Button>
                            // </Nav>
                            :
                            // <Navbar.Collapse className="justify-content-end">
                            //     <Navbar.Text>
                            //         Signed in as: {user.number}
                            //     </Navbar.Text>
                            // </Navbar.Collapse>
                            <Navbar.Collapse className="justify-content-end">
                                {/* <Navbar.Text> */}
                                <NavDropdown title={`Signed in as: ${user.number}`} id="basic-nav-dropdown">
                                    <Link href="/logout" passHref><NavDropdown.Item>Logout</NavDropdown.Item></Link>
                                    {/* <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                                </NavDropdown>
                                {/* </Navbar.Text> */}
                            </Navbar.Collapse>
                    }

                </Container>
            </Navbar>
        </>
    )
}

export default SiteNav
