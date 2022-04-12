import React from 'react'
import Card from '../components/Card'



function Home({
	items,
	searchValue,
	setSearchValue,
	onChangeSearchInput,
	onAddToFavorite,
	onAddToCart,
	isLoading,
}) {
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
				{

					items.length > 0 &&
					items.filter(i => i.title.toLowerCase().includes(searchValue.toLowerCase())).map((i, id) => (
						<Card
							key={id}
							onFavorites={onAddToFavorite}
							onPlus={onAddToCart}
							loading={isLoading}
							{...i}
						/>
					))
				}
			</div>
		</div>
	)
}

export default Home