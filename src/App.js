import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';


import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Intro from './panels/Intro';

const ROUTES = {
	HOME: 'home',
	INTRO: 'intro',
}

const STORAGE_KEYS = {
	STATUS : 'status',
}


const App = () => {
	const [activePanel, setActivePanel] = useState(ROUTES.INTRO);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [userSeeIntro, setUserSeeIntro] = useState(false);


	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}

		});


		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const storageData = await bridge.send('VKWebAppStorageGet',{
				keys: Object.values(STORAGE_KEYS)
			});
			console.log(storageData);
			const data = {};
			storageData.keys.forEach(({key,value}) =>{
				try {
					data[key] = value ? JSON.parse(value) :{};
					switch (key) {
						case STORAGE_KEYS.STATUS:
							if (data[key].hasSeen){
								setActivePanel(ROUTES.HOME);
								setUserSeeIntro(true)
							}
							break;
						default:
							// statements_def
							break;
					}

				}
				catch(error){
					console.log(error);
				}
			} );
			setUser(user);
			setPopout(null);
		}
		fetchData();
	},);



	const go = panel => {
		setActivePanel(panel);
	};


	const CountdownTimer = async function() {
		const calculateTimeLeft = () => {
			const difference = +new Date("2021-01-01") - +new Date();
			let timeLeft = {};

			if (difference > 0) {
				timeLeft = {
					days: Math.floor(difference / (1000 * 60 * 60 * 24)),
					hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
					minutes: Math.floor((difference / 1000 / 60) % 60),
					seconds: Math.floor((difference / 1000) % 60)
				};
			}

			return timeLeft;
		};

		const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

		useEffect(() => {
			setTimeout(() => {
				setTimeLeft(calculateTimeLeft());
			}, 1000);
		});

		const timerComponents = [];

		Object.keys(timeLeft).forEach(interval => {
			if (!timeLeft[interval]) {
				return;
			}

			timerComponents.push(
				<span>
        {timeLeft[interval]} {interval}{" "}
      </span>
			);
		});

		return (
			<div>
				<h1>Alligator.io New Year's 2020 Countdown</h1>
				<h2>With React Hooks!</h2>
				{timerComponents.length ? timerComponents : <span>Time's up!</span>}
			</div>
		);
	}
	const viewIntro = async function (){
		try{
			await bridge.send ('VKWebAppStorageSet',{
				key:STORAGE_KEYS.STATUS,
				value: JSON.stringify({
					hasSeen: true
				})
			});
			go(ROUTES.HOME)
		} catch(error){
			console.log(error);
		}
	}

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id={ROUTES.HOME} fetchedUser={fetchedUser} go={go} timerComponents={CountdownTimer} />
			<Intro id={ROUTES.INTRO} fetchedUser={fetchedUser} go={viewIntro}  userSeeIntro={userSeeIntro} />
		</View>
	);
}

export default App;

