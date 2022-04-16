import React from 'react'
import ItemCart from './ItemCart'
import Info from './Info'
import AppContext from '../context'
import axios from 'axios'
import { useCart } from '../hooks/useCart'



function Drawer({ onClose, items, onRemove }) {
	const { setCartItems, setCartOpened } = React.useContext(AppContext)
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
			console.log(data)


			setOrderId(data.id)
			setIsOrderComplete(true)
			setCartItems([])
			// debugger

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

	console.log('items in drawer', items)
	return (
		<div className={'overlay'}>
			<div className={'drawer'}>
				<h2 className={'d-flex justify-between mb-30'}>Корзина
					<img
						onClick={onClose}
						className={'remove-btn cu-p'}
						src={'./img/iconRemove.svg'}
						alt={'remove'} />
				</h2>

				{
					items.length > 0 ?
						<>
							<div className={'items mb-40'}>
								{items.map(item => (
									<ItemCart
										key={item.id}
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
									<img src={'./img/iconArrow.svg'} alt={'arrow'} />
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


