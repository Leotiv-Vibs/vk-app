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
import Select from "@vkontakte/vkui/dist/components/Select/Select";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import List from "@vkontakte/vkui/dist/components/List/List";



import Epic from "@vkontakte/vkui/dist/components/Epic/Epic";
import Tabbar from "@vkontakte/vkui/dist/components/Tabbar/Tabbar";
import TabbarItem from "@vkontakte/vkui/dist/components/TabbarItem/TabbarItem";
import View from "@vkontakte/vkui/dist/components/View/View";




import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon20Like from '@vkontakte/icons/dist/20/like_outline';
import Icon24Reorder from '@vkontakte/icons/dist/24/reorder';
import Icon24Like from '@vkontakte/icons/dist/24/like';

import './Home.css';

const Home = ({ id,city,o,c,handle,search,searchrez,a,add,a1,r,fav}) => {


	return (

		<Panel id={id}>

			{!city &&
			<Fragment>
				<PanelHeader>Tellida</PanelHeader>

				<FormLayout action='/profiles'>
					<FixedLayout vertical='bottom'>

						<Div className='inp' style={{display: 'flex'}}>
							<input type="text" placeholder="City" name='City' onChange={e => c(e.target.value)}/>
						</Div>
					</FixedLayout>

					<FixedLayout vertical='bottom'>
						<Div style={{display: 'flex'}}>
							<Button className='Butto' onClick={o}>
								Отправить
							</Button>
						</Div>

					</FixedLayout>
				</FormLayout>
			</Fragment>
			}

			{(city && !add && !fav) &&
			<Fragment>

				<input
					type="text"
					placeholder="Search"
					value={search}
					onChange={e => handle(e.target.value)}
					style={{width: '85%'}}
				/>
				<HorizontalScroll>
					<div style={{display: 'flex'}}>
						<Div>
							<Button>
								Доставка товара
							</Button>
						</Div>
						<Div s>
							<Button>
								Передержка животных
							</Button>
						</Div>
						<Div>
							<Button>
								Услуги татумастера
							</Button>
						</Div>
						<Div>
							<Button>
								Услуги реснички
							</Button>
						</Div>
						<Div>
							<Button>
								Услуги ноготочки
							</Button>
						</Div>
						<Div>
							<Button>
								Клининг услуги
							</Button>
						</Div>
						<Div>
							<Button>
								etc.
							</Button>
						</Div>
					</div>
				</HorizontalScroll>
				<Epic  tabbar={
					<Tabbar>
						<TabbarItem


							data-story="feed"
							text="Tellida"
						><Icon24Reorder /></TabbarItem>
						<TabbarItem

							onClick={a}
							text="Add"
						><Icon24Add /></TabbarItem>


						<TabbarItem
							onClick={r}
							data-story="more"
							text="Favorite"
						><Icon24Like /></TabbarItem>
					</Tabbar>
				}>

				</Epic>
			</Fragment>
			}{(add && !fav) &&
		< Fragment>
			<PanelHeader>Регистрация услуги</PanelHeader>
			<FormLayout>

				<Textarea top="Самореклама"/>
				<Input top="Город"/>
				<Select
					top="Название услуги"
					placeholder="Выберите услугу, которую можете предоставить"
				>
					<option value="0">Ноготочки</option>
					<option value="1">Реснички</option>
					<option value="2">Клининг</option>
					<option value="2">Передержка</option>
					<option value="1">Доставка еды или хоз товаров</option>
					<option value="2">Муж на час</option>
					<option value="2">Тату мастер</option>

				</Select>
				<FixedLayout>
					<Div className='zareg'>
						<Button>
							Зарегистрировать услугу
						</Button>
					</Div>
				</FixedLayout>
			</FormLayout>
			<Epic  tabbar={
				<Tabbar>
					<TabbarItem

						onClick={a1}
						data-story="feed"
						text="Tellida"
					><Icon24Reorder /></TabbarItem>
					<TabbarItem

						onClick={a}
						text="Add"
					><Icon24Add /></TabbarItem>


					<TabbarItem
						onClick={r}
						data-story="more"
						text="Favorite"
					><Icon24Like /></TabbarItem>
				</Tabbar>
			}></Epic>
		</Fragment>
		}
			{fav &&
				<Fragment>

				<PanelHeader>
				List
				</PanelHeader>
				<Group>
				<List>
				<Cell >Здесь был бы</Cell>
				<Cell >Список</Cell>
				<Cell >Избранных исполнителей(((</Cell>
				</List>
				</Group>
					<Epic  tabbar={
						<Tabbar>
							<TabbarItem

								onClick={a1}
								data-story="feed"
								text="Tellida"
							><Icon24Reorder /></TabbarItem>
							<TabbarItem

								onClick={a}
								text="Add"
							><Icon24Add /></TabbarItem>


							<TabbarItem
								onClick={r}
								data-story="more"
								text="Favorite"
							><Icon24Like /></TabbarItem>
						</Tabbar>
					}>

					</Epic>
				</Fragment>

			}

		</Panel>

	);


}

export default Home;