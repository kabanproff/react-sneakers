import React from 'react'
import PropTypes from 'prop-types'


import s from './Card.module.scss'

function Card({ id, price, title, imageUrl, onFavorite, onPlus }) {

	const [isAdded, setIsAdded] = React.useState(false)

	const onClickPlus = () => {
		setIsAdded(!isAdded)
		onPlus()
	}

	// React.useEffect(() => {
	// 	console.log('bpv')
	// }, [isAdded])

	// console.log(price, title, imageUrl)
	return (
		<div className={s.card} >
			<div
				onClick={onFavorite}
				className={s.favorite}
			>
				<img src={'./img/icon-heartU.svg'} alt={'heart like'} />
			</div>
			<img width={133} height={112} src={`./${imageUrl}`} alt={'sneakers'} />
			<h5>{title}</h5>
			<div className={'d-flex justify-between align-center'}>
				<div className={'d-flex flex-column'}>
					<span>Цена:</span>
					<b>{price} руб.</b>
				</div>
				<img
					className={s.plus}
					onClick={onClickPlus}
					src={`./img/${isAdded ? 'iconBtnCheck' : 'iconBtnPlus'}.svg`}
					alt={'bi'}
				/>
			</div>
		</div>
	)
}

Card.propTypes = {}

export default Card
