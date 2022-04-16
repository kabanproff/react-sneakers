import axios from 'axios'
import React from 'react'
import Card from '../components/Card'



function Orders() {

	const [orders, setOrders] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)


	React.useEffect(() => {
		(async () => {

			const { data } = await axios.get('https://62544b5e89f28cf72b5b767b.mockapi.io/orders')
			setOrders(data.reduce((ords, item) => ords.concat(item.items), []))
			console.log(data)
			setIsLoading(false)
		})()
	}, [])

	console.log(orders, isLoading)
	return (
		<div className={'content p-40'}>
			<div className={'d-flex mb-40 align-center justify-between'}>
				<h1>Мои заказы</h1>
			</div>
			<div className={'sneakers d-flex flex-wrap'}>
				{
					orders.map((i, id) => (
						<Card
							key={id}
							loading={isLoading}
							{...i}
						// favorited={favorites.some(fav => +fav.parentId === +i.id)}
						/>
					))
				}
			</div>
		</div>
	)
}

export default Orders