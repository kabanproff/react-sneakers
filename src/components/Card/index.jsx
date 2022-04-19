import React from 'react'
import ContentLoader from 'react-content-loader'

import AppContext from '../../context'
import s from './Card.module.scss'

function Card({
	id,
	parentId,
	price,
	title,
	imageUrl,
	favorited,
	onFavorites,
	loading,
	onPlus
}) {

	const { isItemAdded } = React.useContext(AppContext)
	const obj = { id, parentId, title, imageUrl, price };

	const onClickPlus = () => {
		onPlus(obj)
	}

	const onClickFavorite = () => {
		onFavorites(obj)
	}

	return (
		<div className={s.card} >
			{
				loading ? (
					<ContentLoader
						speed={2}
						width={155}
						height={250}
						viewBox="0 0 155 265"
						backgroundColor="#f3f3f3"
						foregroundColor="#ecebeb">
						<rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
						<rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
						<rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
						<rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
						<rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
					</ContentLoader>
				) : (
					<>
						{
							onFavorites &&
							<div
								onClick={onClickFavorite}
								className={s.favorite}
							>

								<img src={process.env.PUBLIC_URL + `/img/${favorited ? 'icon-heartL' : 'icon-heartU'}.svg`} alt={'heart like'} />
							</div>}
						<img width={133} height={112} src={process.env.PUBLIC_URL + `/${imageUrl}`} alt={'sneakers'} />
						<h5>{title}</h5>
						<div className={'d-flex justify-between align-center'}>
							<div className={'d-flex flex-column'}>
								<span>Цена:</span>
								<b>{price} руб.</b>
							</div>
							{onPlus &&
								<img
									className={s.plus}
									onClick={onClickPlus}
									src={process.env.PUBLIC_URL + `/img/${isItemAdded(parentId) ? 'iconBtnCheck' : 'iconBtnPlus'}.svg`}
									alt={'bi'}
								/>}
						</div>
					</>
				)
			}
		</div>
	)
}


export default Card
