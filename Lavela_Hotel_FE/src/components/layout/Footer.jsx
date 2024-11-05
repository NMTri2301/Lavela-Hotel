/* eslint-disable no-unused-vars */
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    let today = new Date()
    return (
        <footer className="bg-dark text-white py-3 footer mt-lg-5">
            <Container>
                <Row>
                    <Col xs={12} className="text-center">
                        <p className="mb-0"> &copy; {today.getFullYear()} Lavela Hotel</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer