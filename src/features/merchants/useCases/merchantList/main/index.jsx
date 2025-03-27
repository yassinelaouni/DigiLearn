import React, { useState, useEffect, useCallback } from 'react'
import { Grid, IconButton } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import MerchantCard from '../card'
import selectAll from '../../../selectors/all'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../../actions'
import Delete from '../delete'
import ChangeStatus from '../changeStatus'

const initialState = {
	openDelete: false,
	openDeacivate: false,
}

const MerchantList = () => {
	const dispatch = useDispatch()

	const [modal, setModal] = useState(initialState)

	let [id, setId] = useState(null)

	// get merchants' ids
	useEffect(() => {
		dispatch(actions.get())
	}, [])

	// useEffect(() => {
	// 	fetch("/api/merchants")
	// 		.then((response) => response.json())
	// 		.then((json) => setUsers(json))
	// }, [])
	// console.log(users)

	const handleModalOpen = useCallback(
		({ type, id }) => {
			dispatch(actions.selectedSet({ id }))

			if (type === 'delete') {
				setModal({ ...initialState, openDelete: true })
				setId(id)
			}
			else if (type === 'deactivate')
				setModal({ ...initialState, openDeacivate: true })
			setId(id)
		},
		[initialState, dispatch]
	)
	const handleModalClose = useCallback(
		() => setModal(initialState),
		[initialState]
	)

	const allMerchants = useSelector(state => selectAll(state))
	const [merchants, setMerchants] = useState([])
	const [merchantCount, setMerchantCount] = useState(9) // Initial number of merchants to display

	useEffect(() => {
		if (allMerchants && Object.keys(allMerchants).length > 0) {
			const merchantArray = Object.values(allMerchants)
			setMerchants(merchantArray)
		}
	}, [allMerchants])

	const handleLoadMore = () => {
		setMerchantCount(prevCount => prevCount + 2)
	}

	const merchantCards = merchants.slice(0, merchantCount).map(merchant => (
		<Grid item xs={12} sm={11} md={4} key={merchant.id}>
			<MerchantCard merchant={merchant} handleOpen={handleModalOpen} />
		</Grid>
	))

	return (
		<div
			style={{
				marginTop: '16px',
				marginBottom: '16px',
				justifyContent: 'center',
				display: 'grid',
			}}
		>
			<Grid container spacing={2} style={{ justifyContent: 'center' }}>
				{merchantCards}
			</Grid>
			{/** refresh */}
			<Grid
				style={{
					marginTop: '38px',
					justifyContent: 'center',
					display: 'grid',
				}}
			>
				<IconButton
					color='primary'
					aria-label='Load more'
					size='large'
					onClick={handleLoadMore}
				>
					<RefreshIcon />
				</IconButton>
			</Grid>
			<Delete open={modal.openDelete} handleCancel={handleModalClose} id={id} />
			< ChangeStatus
				open={modal.openDeacivate}
				handleCancel={handleModalClose}
				id={id}
			/>
		</div>
	)
}

export default MerchantList
