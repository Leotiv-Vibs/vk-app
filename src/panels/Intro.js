import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Button from '@vkontakte/vkui/dist/components/Button/Button';






import './Intro.css';



const Intro = ({id,fetchedUser,userSeeIntro,go}) => {
	return (
		<Panel id={id} centered ={true}>
		<PanelHeader>
			,-,-,-,-,-ff 
		</PanelHeader>
		{(!userSeeIntro && fetchedUser) && 
		  <Fragment> 
				<Group>
					<Div className ='User' >
						{fetchedUser.photo_200 && <Avatar src={fetchedUser.photo_200}> </Avatar>}
						<h2>Привет, {fetchedUser.first_name}!</h2>
						<h3>Здесь ты можешь заработать деньги своими знаниями отвечая на вопросы викторины. Для участия в викторине нужно закинуть 50 рублей. Ответив на три вопроса, вы получаете выигрыш в размере (количество участников*50)/(количество победителей)</h3>
					</Div>
				</Group>
		  

		  <FixedLayout vertical = 'bottom' >
		  	<Div>
		  		<Button mode='commerce' size='xl' onClick={go}>
		  			Базара зира начальник
		  		</Button>
		  	</Div>
		  </FixedLayout>
		  </Fragment>
		}
	</Panel>)
};



export default Intro;
