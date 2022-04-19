import React from 'react'

import Card from '../components/Card'


function Home({
	items,
	favorites,
	searchValue,
	setSearchValue,
	onChangeSearchInput,
	onAddToFavorite,
	isLoading,
	onAddToCart
}) {

	const renderItems = () => {
		const filterItems = items.filter(i => i.title.toLowerCase().includes(searchValue.toLowerCase()))

		return (
			(isLoading ? [...Array(8)] : filterItems).map((i, id) => {
				return <Card
					key={id}
					onFavorites={onAddToFavorite}
					loading={isLoading}
					favorited={favorites.some(fav => +fav.parentId === +i.id)}
					onPlus={onAddToCart}
					{...i}
				/>
			})
		)
	}

	return (
		<div className={'content p-40'}>
			<div className={'d-flex mb-40 align-center justify-between'}>
				<h1>{searchValue ? `Поиск по ${searchValue}` : 'Все кроссовки'}</h1>
				<div className={'search-block d-flex align-center'}>
					<img src={process.env.PUBLIC_URL + '/img/iconSearch.svg'} alt={'Search'} />
					<input onChange={onChangeSearchInput} placeholder={'Поиск...'} value={searchValue} />
					{searchValue && <img onClick={() => setSearchValue('')} className={'clear cu-p'} src={process.env.PUBLIC_URL + '/img/iconRemove.svg'} alt={'Clear'} />}
				</div>
			</div>
			<div className={'sneakers d-flex'}>
				{renderItems()}
			</div>
		</div>
	)
}

export default Home