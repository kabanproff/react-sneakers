
import './App.css';
import Header from './components/Header';
import Card from './components/Card';
import Drawer from './components/Drawer';

function App() {
	return (
		<div className="wrapper clear">
			<Drawer />
			<Header />
			<div className={'content p-40'}>
				<div className={'d-flex mb-40 align-center justify-between'}>
					<h1>Все кроссовки</h1>
					<div className={'search-block d-flex align-center'}>
						<img src={'./img/iconSearch.svg'} alt={'Search'} />
						<input placeholder={'Поиск...'} />
					</div>
				</div>
				<div className={'sneakers d-flex'}>
					<Card />
				</div>
			</div>
		</div>
	);
}

export default App;
