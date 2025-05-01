import React from "react";
import Container from 'react-bootstrap/Container';
import Header from "./header"

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <Container>
            {children}
            </Container>
        </>
    )
}

export default Layout;