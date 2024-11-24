/* eslint-disable no-unused-vars */
import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

const Footer = () => {
    let today = new Date()
    return (
        <div className="bg-dark text-white py-3 mt-lg-5 position-relative">
            <Container className="py-3">
                <Row className="mb-3">
                    <Col xs={12} className="text-center">
                        <p className="text-uppercase mb-1" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                            Lavela Hotel & Our Branches
                        </p>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={12} className="text-center">
                        <h6 className="text-uppercase font-weight-bold mb-3" style={{ letterSpacing: '1px' }}></h6>
                    </Col>
                </Row>

                <Row className="text-center">
                    <Col xs={12} md={4} className="mb-2">
                        <div className="footer-branch">
                            <h6 className="font-weight-bold" style={{ fontSize: '1rem' }}>Lavela Saigon</h6>
                            <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>115 Trần Quang Khải, P. Tân Định, Q. 3, TP.HCM</p>
                            <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Tel: +84 28 3939 9292</p>
                        </div>
                    </Col>
                    <Col xs={12} md={4} className="mb-2">
                        <div className="footer-branch">
                            <h6 className="font-weight-bold" style={{ fontSize: '1rem' }}>Lavela Hanoi</h6>
                            <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>123 Nguyễn Du, P. Bến Thành, Q. Hoàn Kiếm, Hà Nội</p>
                            <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Tel: +84 24 3939 9292</p>
                        </div>
                    </Col>
                    <Col xs={12} md={4} className="mb-2">
                        <div className="footer-branch">
                            <h6 className="font-weight-bold" style={{ fontSize: '1rem' }}>Lavela Nha Trang</h6>
                            <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>456 Trần Phú, P. Xương Huân, Nha Trang</p>
                            <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Tel: +84 58 3939 9292</p>
                        </div>
                    </Col>
                </Row>

                <Row className="text-center mt-3">
                    <Col xs={12}>
                        <p className="mb-2" style={{ opacity: 0.7, fontSize: '0.85rem' }}>Follow us on</p>
                        <div className="d-flex justify-content-center">
                            <Button variant="outline-light" className="mx-2" href="https://www.facebook.com/lavelahotel" target="_blank" style={{ borderRadius: '50px' }} size="sm">
                                Facebook
                            </Button>
                            <Button variant="outline-light" className="mx-2" href="https://www.instagram.com/lavelahotel" target="_blank" style={{ borderRadius: '50px' }} size="sm">
                                Instagram
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>

            <div className="text-white" style={{
                position: 'absolute',
                bottom: '0',
                left: '10px',
                padding: '10px 0',
                fontSize: '0.75rem',
                opacity: 0.7,
                textAlign: 'left',
            }}>
                <p className="mb-0">&copy; {today.getFullYear()} Lavela Hotel. All rights reserved</p>
            </div>
        </div>
    )
}

export default Footer
