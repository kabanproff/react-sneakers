import React from 'react'
import axios from 'axios'

import Info from '../Info'
import ItemCart from '../ItemCart'

import AppContext from '../../context'
import { useCart } from '../../hooks/useCart'
import s from './Drawer.module.scss'

function Drawer({ onClose, items, onRemove, opened }) {
	const { setCartItems } = React.useContext(AppContext)
	const [isOrderComplete, setIsOrderComplete] = React.useState(false)
	const [orderId, setOrderId] = React.useState(null)
	const [isLoading, setIsLoading] = React.useState(false)
	const { totalPrice } = useCart()

	const delay = () => {
		return new Promise(rs => setTimeout(rs, 1000))
	}

	const onClickOrder = async () => {
		try {
			setIsLoading(true)
			const { data } = await axios.post('https://62544b5e89f28cf72b5b767b.mockapi.io/orders', { items })

			setOrderId(data.id)
			setIsOrderComplete(true)
			setCartItems([])

			for (let i = 0; i < items.length; i++) {
				const it = items[i]
				await axios.delete(`https://62544b5e89f28cf72b5b767b.mockapi.io/cart/${it.id}`)
				await delay()
			}
		} catch (e) {
			alert('Не удалось оформить заказ')
			console.error(e)
		}
		setIsLoading(false)
	}

	return (
		<div className={`${s.overlay} ${opened ? s.overlayVisible : ''}`}>
			<div className={s.drawer}>
				<h2 className={'d-flex justify-between mb-30'}>Корзина
					<img
						onClick={onClose}
						className={'remove-btn cu-p'}
						src={'img/iconRemove.svg'}
						alt={'remove'} />
				</h2>
				{
					items.length > 0 ?
						<>
							<div className={`${s.items} mb-40 `}>
								{items.map((item, id) => (
									<ItemCart
										key={id}
										{...item}
										onRemove={() => onRemove(item.id)}
									/>
								))
								}
							</div>
							<div className={'cartTotalBlock'}>
								<ul>
									<li>
										<span>Итого:</span>
										<div></div>
										<b>{totalPrice} руб.</b>
									</li>
									<li>
										<span>Налог 5%</span>
										<div></div>
										<b>{(totalPrice / 100 * 5).toFixed(2)} руб.</b>
									</li>
								</ul>
								<button
									disabled={isLoading}
									onClick={onClickOrder}
									className={'greenButton'}><span>Оформить заказ</span>
									<img src={'img/iconArrow.svg'} alt={'arrow'} />
								</button>
							</div>
						</>
						:
						<Info
							title={
								isOrderComplete
									? 'Заказ оформлен'
									: 'Корзина пустая'
							}
							description={
								isOrderComplete
									? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
									: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
							}
							image={
								isOrderComplete
									? 'img/iconOrderComplete.svg'
									: 'img/emptyCart.svg'
							}
						/>
				}
			</div>
		</div>
	)
}

export default Drawer