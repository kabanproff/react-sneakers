import React from 'react'
import PropTypes from 'prop-types'

function CardCart(props) {
	return (
		<div className={'cartItem mb-20 d-flex align-center'}>
			<img className={'imageItem mr-20'} width={70} height={70} src={'./img/sneakers/1.jpg'} alt={' in cart'} />
			<div className={'mr-20 mb-20'}>
				<p className={'mb-5'}>Мужские Кроссовки Nike Air Max 270</p>
				<b>8 499 руб.</b>
			</div>
			<img className={'remove-btn'} src={'./img/iconRemove.svg'} alt={'remove'} />
		</div>
	)
}

CardCart.propTypes = {}

export default CardCart
