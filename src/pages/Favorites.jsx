import React from 'react'

import Card from '../components/Card'

function Favorites({ isLoading, favorites, onAddToFavorite, onAddToCart }) {

	return (
		<div className={'content p-40'}>
			<div className={'d-flex mb-40 align-center justify-between'}>
				<h1>Мои закладки</h1>
			</div>
			<div className={'sneakers d-flex flex-wrap'}>
				{
					(isLoading ? [...Array(8)] : favorites)
						.map((i, id) => (
							<Card
								key={id}
								favorited={true}
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

export default Favorites