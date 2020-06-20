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

const people = [
	"Siri",
	"Alexa",
	"Google",
	"Facebook",
	"Twitter",
	"Linkedin",
	"Sinkedin"
];


const App = () => {

	const [activePanel, setActivePanel] = useState(ROUTES.INTRO);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [userSeeIntro, setUserSeeIntro] = useState(false);
	const [city, setCity] = useState('');
	const [input, setInput] = useState("")
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const handleChange = e => {
        setSearchTerm(e.target.value);
    };



	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}

		});
        const results = people.filter(person =>
            person.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);


		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const storageData = await bridge.send('VKWebAppStorageGet',{
				keys: Object.values(STORAGE_KEYS)
			});

			const data = {};
			storageData.keys.forEach(({key,value}) =>{
				try {
					data[key] = value ? JSON.parse(value) :{};
					switch (key) {
						case STORAGE_KEYS.STATUS:
							if (data[key].hasSeen){

								setUserSeeIntro(false)
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
	},[searchTerm] );


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
	const submitValue = () => {
		if (input) {
			console.log(input)
			setCity(input)
		}
	}
	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id={ROUTES.HOME} fetchedUser={fetchedUser} city={city} o={submitValue} c={setInput} search={searchTerm} serachrez={searchResults} handle={setSearchTerm}/>
			<Intro id={ROUTES.INTRO} fetchedUser={fetchedUser} go={viewIntro}  userSeeIntro={userSeeIntro} />

		</View>
	);
}

export default App;