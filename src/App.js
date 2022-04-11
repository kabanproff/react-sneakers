import React from 'react'
import './App.css';
import Header from './components/Header';
import Card from './components/Card';
import Drawer from './components/Drawer';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

	const [items, setItems] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [favorites, setFavorites] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState('');
	const [cartOpened, setCartOpened] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

	useEffect(() => {
		axios.get('https://60d62397943aa60017768e77.mockapi.io/items')
			.then(rs => {
				// console.log(rs.data)
				setItems(rs.data)
			})
		// axios.get('https://60d62397943aa60017768e77.mockapi.io/cart')
		// 	.then(rs => {
		// 		setCartItems(rs.data)
		// 	})
	}, [])

	const onAddToCart = async (cart) => {
		console.log(cart)
		try {
			const findItem = cartItems.find(i => +i.id === +cart.id)
			// if (findItem) {
			// setCartItems(prev => prev.filter(i => +i.parentId !== +cart.id))
			// await axios.delete(`https://60d62397943aa60017768e77.mockapi.io/cart/${findItem.id}`)
			// } else {
			setCartItems(prev => [...prev, cart])
			// const { data } = await axios.post('https://60d62397943aa60017768e77.mockapi.io/cart', cart)
			// console.log(data)
			// setCartItems(prev => {
			// 	debugger
			// 	prev.map(i => {
			// 		if (i.parentId === data.parentId) {
			// 			return {
			// 				...i,
			// 				id: data.id
			// 			}
			// 		}
			// 		return i
			// 	})
			// })
			// }
		} catch (e) {
			alert('Ошибка при добавлении в корзину')
			console.error(e)
		}
	}

	const onRemoveItem = (id) => {
		// axios.delete(`https://60d62397943aa60017768e77.mockapi.io/cart/${id}`)
		setCartItems(pr => pr.filter(i => i.id !== id))
	}

	const onChangeSearchInput = (e) => {
		setSearchValue(e.target.value)
	}

	console.log(cartItems)
	return (
		<div className="wrapper clear">
			{cartOpened &&
				<Drawer
					items={cartItems}
					onClose={() => setCartOpened(false)}
					onRemove={onRemoveItem}
				/>}

			<Header onClickCart={() => setCartOpened(true)} />
			<div className={'content p-40'}>
				<div className={'d-flex mb-40 align-center justify-between'}>
					<h1>{searchValue ? `Поиск по ${searchValue}` : 'Все кроссовки'}</h1>
					<div className={'search-block d-flex align-center'}>
						<img src={'./img/iconSearch.svg'} alt={'Search'} />
						<input onChange={onChangeSearchInput} placeholder={'Поиск...'} value={searchValue} />
						{searchValue && <img onClick={() => setSearchValue('')} className={'clear cu-p'} src={'./img/iconRemove.svg'} alt={'Clear'} />}
					</div>
				</div>
				<div className={'sneakers d-flex'}>
					{

						items.length > 0 &&
						items.filter(i => i.title.toLowerCase().includes(searchValue.toLowerCase())).map((i, id) => (
							<Card
								key={id}
								onFavorite={() => console.log('add Fav')}
								onPlus={() => onAddToCart(i)}
								{...i}
							/>
						))
					}
				</div>
			</div>
		</div>
	);
}

export default App;
