import React from 'react'
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';


import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Orders from './pages/Orders';


import AppContext from './context'


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
				const [itemsResponse, cartResponse, favoritesResponse] = await Promise.all([
					axios.get('https://62544b5e89f28cf72b5b767b.mockapi.io/items'),
					axios.get('https://62544b5e89f28cf72b5b767b.mockapi.io/cart'),
					axios.get('https://62544b5e89f28cf72b5b767b.mockapi.io/favorites')
				])

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

	const onAddToCart = async (cart) => {
		try {
			const findItem = cartItems.find(i => +i.parentId === +cart.parentId)
			if (findItem) {
				setCartItems(prev => prev.filter(i => +i.parentId !== +cart.parentId))
				await axios.delete(`https://62544b5e89f28cf72b5b767b.mockapi.io/cart/${+findItem.id}`)
			} else {
				setCartItems(prev => [...prev, cart])
				const { data } = await axios.post('https://62544b5e89f28cf72b5b767b.mockapi.io/cart', cart)
				setCartItems(prev => prev.map(i => {
					if (i.parentId === data.parentId) {
						return {
							...i,
							id: data.id
						}
					}
					return i
				}))
			}
		} catch (e) {
			alert('Ошибка при добавлении в корзину')
			console.error(e)
		}
	}

	const onRemoveItem = (id) => {
		try {
			axios.delete(`https://62544b5e89f28cf72b5b767b.mockapi.io/cart/${id}`)
			setCartItems(pr => pr.filter(i => i.id !== id))
		} catch (e) {
			alert('Ошибка удаления из корзины')
		}
	}

	const onChangeSearchInput = (e) => {
		setSearchValue(e.target.value)
	}

	const onAddToFavorite = async (cart) => {
		try {
			if (favorites.find(i => +i.parentId === +cart.parentId)) {
				const itemDelete = favorites.find(i => +i.parentId === +cart.parentId)
				axios.delete(`https://62544b5e89f28cf72b5b767b.mockapi.io/favorites/${itemDelete.id}`)
				setFavorites(pr => pr.filter(i => +i.parentId !== +cart.parentId))
			} else {
				const { data } = await axios.post('https://62544b5e89f28cf72b5b767b.mockapi.io/favorites', cart)
				setFavorites(pr => [...pr, data])
			}
		} catch (e) {
			console.log(e)
			alert('Не удалось добавить в фавориты')
		}
	}

	const isItemAdded = (id) => {
		return cartItems.some(i => +i.parentId === +id)
	}

	return (
		<AppContext.Provider value={
			{
				cartItems,
				setCartItems,
				isItemAdded,
				setCartOpened,
			}

		}>
			<div className="wrapper clear">

				<Drawer
					opened={cartOpened}
					items={cartItems}
					onClose={() => setCartOpened(false)}
					onRemove={onRemoveItem}
				/>

				<Header onClickCart={() => setCartOpened(true)} />
				<Routes>
					<Route path={process.env.PUBLIC_URL} element={
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
					<Route path={'favorites'} element={<Favorites
						isLoading={isLoading}
						favorites={favorites}
						onAddToFavorite={onAddToFavorite}
						onAddToCart={onAddToCart}
					/>} />
					<Route path={'orders'} element={<Orders />} />
				</Routes>
			</div>
		</AppContext.Provider>
	);
}

export default App;
