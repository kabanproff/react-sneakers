import React from 'react'
import { Link } from 'react-router-dom'

import { useCart } from '../hooks/useCart'

function Header({ onClickCart }) {
	const { totalPrice } = useCart()

	return (
		<header className={'d-flex justify-between align-center p-40'}>
			<Link to={process.env.PUBLIC_URL} >
				<div className={'headerLeft d-flex align-center'}>
					<img alt={'logo'} src={process.env.PUBLIC_URL + '/img/logo.png'} width={40} height={40} />
					<div>
						<h3 className={'text-uppercase'}>React Sneakers</h3>
						<p className={'opacity-5'}>Магазин лучших кроссовок</p>
					</div>
				</div>
			</Link>
			<ul className={'d-flex'}>
				<li
					onClick={onClickCart}
					className={'mr-30 cu-p'}
				>
					<img alt={'basket'} src={process.env.PUBLIC_URL + '/img/iconBasket.svg'} width={18} height={18} />
					<span>{totalPrice} руб.</span>
				</li>
				<li className={'mr-20 cu-p'}>
					<Link to={'/favorites'} >
						<img alt={'likes'} src={process.env.PUBLIC_URL + '/img/iconHeart.svg'} width={18} height={18} />
					</Link>
				</li>
				<li>
					<Link to={'/orders'} >
						<img alt={'user'} src={process.env.PUBLIC_URL + '/img/iconUser.svg'} width={18} height={18} />
					</Link>
				</li>
			</ul>
		</header>
	)
}

export default Header