import React from 'react'
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';


import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Header from './components/Header';
import Drawer from './components/Drawer';


import './App.css';
import AppContext from './context'
import Orders from './pages/Orders';


function App() {

	const [items, setItems] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [favorites, setFavorites] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState('');
	const [cartOpened, setCartOpened] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);



	useEffect(() => {
		async function fetchData() {
			try {
				const itemsResponse = await axios.get('https://62544b5e89f28cf72b5b767b.mockapi.io/items')
				const cartResponse = await axios.get('https://62544b5e89f28cf72b5b767b.mockapi.io/cart')
				const favoritesResponse = await axios.get('https://62544b5e89f28cf72b5b767b.mockapi.io/favorites')

				setIsLoading(false)
				setCartItems(cartResponse.data)
				setFavorites(favoritesResponse.data)
				setItems(itemsResponse.data)

			} catch (e) {
				alert('Ошибка при запросе данных')
				console.error(e)
			}

		}

		fetchData()

	}, [])

	// axios.delete(`https://62544b5e89f28cf72b5b767b.mockapi.io/cart/${3}`)

	const onAddToCart = async (cart) => {
		// console.log('cart', cart)

		try {
			const findItem = cartItems.find(i => +i.parentId === +cart.parentId)
			// console.log('findItem in cartItems', findItem)
			if (findItem) {

				setCartItems(prev => prev.filter(i => +i.parentId !== +cart.parentId))
				await axios.delete(`https://62544b5e89f28cf72b5b767b.mockapi.io/cart/${+findItem.id}`)
			} else {
				const { data } = await axios.post('https://62544b5e89f28cf72b5b767b.mockapi.io/cart', cart)
				console.log('data new cart', data)
				setCartItems(prev => [...prev, data])
				// console.log(data)
				// setCartItems(prev => {
				// 	// 	debugger
				// 	return prev.map(i => {
				// 		if (i.parentId === data.parentId) {
				// 			return {
				// 				...i,
				// 				id: data.id
				// 			}
				// 		}
				// 		return i
				// 	})
				// })
			}
		} catch (e) {
			alert('Ошибка при добавлении в корзину')
			console.error(e)
		}
	}

	const onRemoveItem = (id) => {
		axios.delete(`https://62544b5e89f28cf72b5b767b.mockapi.io/cart/${id}`)
		setCartItems(pr => pr.filter(i => i.id !== id))
	}

	const onChangeSearchInput = (e) => {
		setSearchValue(e.target.value)
	}

	const onAddToFavorite = async (cart) => {
		// console.log('card', cart)
		// console.log('find', favorites.find(i => +i.parentId === +cart.parentId))
		try {

			if (favorites.find(i => +i.parentId === +cart.parentId)) {
				const itemDelete = favorites.find(i => +i.parentId === +cart.parentId)
				axios.delete(`https://62544b5e89f28cf72b5b767b.mockapi.io/favorites/${itemDelete.id}`)
				setFavorites(pr => pr.filter(i => +i.parentId !== +cart.parentId))
			} else {
				const { data } = await axios.post('https://62544b5e89f28cf72b5b767b.mockapi.io/favorites', cart)
				console.log('data new cartfav', data)
				setFavorites(pr => [...pr, data])
			}
		} catch (e) {
			console.log(e)
			alert('Не удалось добавить в фавориты')
		}
	}
	// console.log('fav', favorites)

	const isItemAdded = (id) => {
		return cartItems.some(i => +i.parentId === +id)
	}

	console.log('cartitems', cartItems)
	return (
		<AppContext.Provider value={
			{
				items,
				cartItems,
				favorites,
				isItemAdded,
				onAddToFavorite,
				onAddToCart,
				setCartItems,
				setCartOpened,
			}

		}>
			<div className="wrapper clear">
				{cartOpened &&
					<Drawer
						items={cartItems}
						onClose={() => setCartOpened(false)}
						onRemove={onRemoveItem}
					/>}

				<Header onClickCart={() => setCartOpened(true)} />
				<Routes>
					<Route path={'/'} element={
						<Home
							items={items}
							favorites={favorites}
							cartItems={cartItems}
							searchValue={searchValue}
							setSearchValue={setSearchValue}
							onChangeSearchInput={onChangeSearchInput}
							onAddToFavorite={onAddToFavorite}
							onAddToCart={onAddToCart}
							isLoading={isLoading}
						/>
					} />
					<Route path={'/favorites'} element={<Favorites />} />
					<Route path={'/orders'} element={<Orders />} />
				</Routes>
			</div>
		</AppContext.Provider>
	);
}

export default App;
