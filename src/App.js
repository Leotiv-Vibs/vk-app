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
	const [activePanel, setActivePanel] = useState(ROUTES.HOME);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [userSeeIntro, setUserSeeIntro] = useState(false);
	const [counter, setCounter] = useState(calculateTimeLeft);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}

		});

		setTimeout(() => {
			setCounter(calculateTimeLeft());
		}, 1000);
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
	}, [counter]);


	const go = panel => {
		setActivePanel(panel);
	};
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
	const timerComponents = [];
	let a=0
	Object.keys(counter).forEach(interval => {
		if (!counter) {
			return;
		}
			a+=1
	if (a<=3)
		timerComponents.push(
			<span>
        {counter[interval]}{":"}
      </span>
		);
	else
		timerComponents.push(
			<span>
        {counter[interval]}
      </span>
		);
	});
	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id={ROUTES.HOME} fetchedUser={fetchedUser} go={go} counter={timerComponents} />
			<Intro id={ROUTES.INTRO} fetchedUser={fetchedUser} go={viewIntro}  userSeeIntro={userSeeIntro} />
		</View>
	);
}

export default App;