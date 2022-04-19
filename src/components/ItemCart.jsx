import React from 'react'


function ItemCart({ price, title, imageUrl, onRemove }) {
	return (
		<div className={'cartItem mb-20 d-flex align-center'}>
			<img className={'imageItem mr-20'} width={70} height={70} src={process.env.PUBLIC_URL + '/' + imageUrl} alt={'in cart'} />
			<div className={'mr-20 mb-20'}>
				<p className={'mb-5'}>{title}</p>
				<b>{price} руб.</b>
			</div>
			<img onClick={onRemove} className={'remove-btn'} src={process.env.PUBLIC_URL + '/img/iconRemove.svg'} alt={'remove'} />
		</div>
	)
}

export default ItemCart
