import React from 'react'
import Card from '../components/Card'
// import AppContect from '../context'

// console.log(AppContect)

function Favorites({ favorites, onAddToFavorite }) {
	console.log('favorites,onaddtofav', favorites, onAddToFavorite)
	// const { favorites, onAddToFavorite } = React.useContext(AppContext)

	return (
		<div className={'content p-40'}>
			<div className={'d-flex mb-40 align-center justify-between'}>
				<h1>Мои закладки</h1>
			</div>
			<div className={'sneakers d-flex flex-wrap'}>
				{
					favorites.map((i, id) => (
						<Card
							key={id}
							favorited={true}
							onFavorites={onAddToFavorite}
							{...i}
						/>
					))
				}
			</div>
		</div>
	)
}

export default Favorites