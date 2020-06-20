import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import FixedLayout from "@vkontakte/vkui/dist/components/FixedLayout/FixedLayout";
import HorizontalScroll from "@vkontakte/vkui/dist/components/HorizontalScroll/HorizontalScroll";
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon20Like from '@vkontakte/icons/dist/20/like_outline';
import Icon24Reorder from '@vkontakte/icons/dist/24/reorder';

import './Home.css';

const Home = ({ id,city,o,c,handle,search,searchrez}) => (

	<Panel id={id}>
		<PanelHeader>Tellida</PanelHeader>
		{!city &&
			<Fragment>

				<FixedLayout vertical = 'bottom' >
					<Div className='inp' style={{display: 'flex'}} >
						<input type="text" placeholder="City" onChange={e => c(e.target.value)}/>
					</Div>
				</FixedLayout>



				<FixedLayout vertical = 'bottom' >
					<Div  style={{display: 'flex'}} >
						<Button className='Butto' onClick={o} >
							Отправить
						</Button>
					</Div>
				</FixedLayout>
			</Fragment>
		}

		{city &&
		<Fragment>

			<input
				type="text"
				placeholder="Search"
				value={search}
				onChange={e=>handle(e.target.value)}
				style={{width:'600px'}}
			/>
			<HorizontalScroll>
				<div style={{ display: 'flex' }}>
					<Div   >
						<Button   >
							Отправить
						</Button>
					</Div>
					<Div  s >
						<Button   >
							Отправить
						</Button>
					</Div>
					<Div   >
						<Button   >
							Отправить
						</Button>
					</Div>
					<Div   >
						<Button   >
							Отправить
						</Button>
					</Div>
					<Div   >
						<Button   >
							Отправить
						</Button>
					</Div>
					<Div   >
						<Button   >
							Отправить
						</Button>
					</Div>
					<Div   >
						<Button   >
							Отправить
						</Button>
					</Div>
					<Div   >
						<Button   >
							Отправить
						</Button>
					</Div>








				</div>
			</HorizontalScroll>
<FixedLayout vertical='bottom'  >
			<Div className="footer">
				<Button  level="3" component="a"  before={<Icon24Reorder/>}/>
				<Button  level="3" component="a"  before={<Icon24Add/>}/>
				<Button  level="3" component="a" before={<Icon20Like/>} />
			</Div>
</FixedLayout>
		</Fragment>



		}




	</Panel>

);




export default Home;