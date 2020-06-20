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
import logo from './1.png';

const Intro = ({id,fetchedUser,userSeeIntro,go}) => {
	return (
		<Panel id={id} centered ={true}>
			<PanelHeader>
					Tellida
			</PanelHeader>
			{(!userSeeIntro && fetchedUser) &&
			<Fragment>
				<Div><img src={logo}/></Div>

				<Group>
					<Div className ='User'>
						<h3>Самые необходимые тебе услуги ближе, чем ты думаешь. Просто выбери услугу, и приложение подскажет тебе, кто делает её ближе, лучше и дешевле</h3>
					</Div>
				</Group>



				<FixedLayout vertical = 'bottom' >
					<Div style={{display: 'flex'}} >
						<Button className="Butto" style={{fontsize: '70px'}} onClick={go} >
							Начать
						</Button>
					</Div>
				</FixedLayout>
			</Fragment>
			}
		</Panel>)
};



export default Intro;