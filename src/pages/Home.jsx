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
}) {
	console.log('items', items)
	console.log('favorites', favorites)
	const renderItems = () => {
		const filterItems = items.filter(i => i.title.toLowerCase().includes(searchValue.toLowerCase()))

		return (
			(isLoading ? [...Array(8)] : filterItems).map((i, id) => {
				// !isLoading && console.log(`--${i.id}`, favorites.some(fav => +fav.parentId === +i.id))
				return <Card
					key={id}
					onFavorites={onAddToFavorite}
					loading={isLoading}
					{...i}
					favorited={favorites.some(fav => +fav.parentId === +i.id)}
				/>
			})
		)
	}

	return (
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
				{renderItems()}
			</div>
		</div>
	)
}

export default Home