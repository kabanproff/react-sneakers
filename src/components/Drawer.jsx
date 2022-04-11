import React from 'react'
import PropTypes from 'prop-types'
import CardCart from './CardCart'

function Drawer(props) {
	return (
		<div className={'overlay'}>
			<div className={'drawer'}>
				<h2 className={'d-flex justify-between mb-30'}>Корзина
					<img className={'remove-btn cu-p'} src={'./img/iconRemove.svg'} alt={'remove'} />
				</h2>
				<div className={'items mb-40'}>
					<CardCart />
				</div>
				<div className={'cartTotalBlock'}>
					<ul>
						<li>
							<span>Итого:</span>
							<div></div>
							<b>21 498 руб.</b>
						</li>
						<li>
							<span>Налог 5%</span>
							<div></div>
							<b>1024 руб.</b>
						</li>
					</ul>
					<button className={'greenButton'}><span>Оформить заказ</span>
						<img src={'./img/iconArrow.svg'} alt={'arrow'} />
					</button>
				</div>

			</div>
		</div>
	)
}

Drawer.propTypes = {}

export default Drawer
