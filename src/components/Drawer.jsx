import React from 'react'
import ItemCart from './ItemCart'
import Info from './Info'



function Drawer({ onClose, items, onRemove }) {
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
						</>
						:
						<Info
							cartClose={onClose}
							title={'Корзина пустая'}
							description={

								// ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
								'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
							}
							image={'img/emptyCart.svg'}
						/>
				}

			</div>
		</div>
	)
}



export default Drawer


