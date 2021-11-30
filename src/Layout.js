import styled from 'styled-components';

const Header = styled.div`
	display: flex;
	posiion: relative;
	align-items: center;
	text-align: center;
	justify-content: center;
	height: 80px;
	width: 100%;
	background-color: #3eaf0e;
	color: white;
	box-shadow: 0 3px 6px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.2);
	font-size: 1.5rem;
`;

const Body = styled.div`
	display: flex;
	text-align: center;
	height: calc(100vh - 80px);
`;

const SideBar = styled.div`
	display: flex;
	flex-direction: column;
	width: 210px;
	background-color: #e0e0e0;
	box-shadow: 3px 0 6px rgba(0,0,0,0.1), 3px 0 6px rgba(0,0,0,0.2);
`;

const Main = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: calc(100vw - 210px);
	padding: 30px;
	overflow: auto;
`;

export { Header, Body, SideBar, Main };
