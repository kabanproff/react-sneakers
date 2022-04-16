import React, { useContext } from 'react'
import Card from '../components/Card'
import AppContext from '../context'



function Favorites() {

	const { favorites, onAddToFavorite } = useContext(AppContext)

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