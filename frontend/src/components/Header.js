import React from 'react';
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
	return (
		<Navbar bg='dark' variant='dark' expand='lg'>
			<Container>
				<LinkContainer to='/'>
					<Navbar.Brand>Phellytics</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<LinkContainer to='/predictions'>
							<Nav.Link>
								<i className='fas fa-chart-line'></i>Analytics
							</Nav.Link>
						</LinkContainer>
						{/* <LinkContainer to='/login'>
							<Nav.Link>
								<i className='fas fa-user'></i>Login
							</Nav.Link>
						</LinkContainer> */}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
