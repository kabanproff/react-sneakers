import React from 'react'

function Header() {
	return (
		<header className={'d-flex justify-between align-center p-40'}>
			<div className={'headerLeft d-flex align-center'}>
				<img alt={'logo'} src='./img/logo.png' width={40} height={40} />
				<div>
					<h3 className={'text-uppercase'}>React Sneakers</h3>
					<p className={'opacity-5'}>Магазин лучших кроссовок</p>
				</div>
			</div>
			<ul className={'d-flex'}>
				<li className={'mr-30'}>
					<img alt={'basket'} src='./img/iconBasket.svg' width={18} height={18} />
					<span>1205 руб.</span>
				</li>
				<li>
					<img alt={'user'} src='./img/iconUser.svg' width={18} height={18} />

				</li>
			</ul>
		</header>
	)
}

export default Header