import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import FixedLayout from "@vkontakte/vkui/dist/components/FixedLayout/FixedLayout";

const Home = ({ id, go, fetchedUser,counter,seeButton }) => (

	<Panel id={id}>
		<PanelHeader>ВикторИрина</PanelHeader>
		{fetchedUser &&
		<Group title="User Data Fetched with VK Bridge">
			<Cell>
				<h3> {counter}</h3>
			</Cell>

		</Group>}
		{seeButton &&
		<FixedLayout vertical = 'bottom' >
			<Div>
				<Button mode='commerce' size='xl' onClick={go} >
					Хочу участвовать в викторине
				</Button>
			</Div>
		</FixedLayout>
		}


	</Panel>

);


Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;