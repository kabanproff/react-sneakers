import React from 'react'
import PropTypes from 'prop-types'

function Card(props) {
	return (
		<div className={'card'} >
			<div className={'favorite'}>
				<img src={'./img/icon-heartU.svg'} alt={'heart like'} />
			</div>
			<img width={133} height={112} src={'./img/sneakers/1.jpg'} alt={'sneakers'} />
			<h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
			<div className={'d-flex justify-between align-center'}>
				<div className={'d-flex flex-column'}>
					<span>Цена:</span>
					<b>12 999 руб.</b>
				</div>
				<button className={'button'}>
					<img width={11} height={11} src={'./img/iconAdd.svg'} alt={'bi'} />
				</button>
			</div>
		</div>
	)
}

Card.propTypes = {}

export default Card
