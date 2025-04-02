import React, { useState, useEffect, useCallback } from 'react'
import { Grid } from '@mui/material'

import Delete from '../remove'
import Reject from '../reject'
import Card from '../card'
import { useDispatch } from 'react-redux'
//import userActions from 'features/users/actions';

import useMain from './service'

export default function PaymentsMain() {
	const dispatch = useDispatch()
	const { ids, paymentId, isOpenModal, handleModalOpen, handleModalClose } = useMain()


	// get users' ids
	// useEffect(() => {
	// 	dispatch(userActions.get())
	// }, [])

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
				{ids.map(id => (
					<Grid
						item
						key={id}
						xs={12}
						sm={11}
						md={4}
					>
						<Card id={id} handleOpen={handleModalOpen} />
					</Grid>
				))}
			</Grid>
			<Delete open={isOpenModal.remove} paymentId={paymentId} handleCancel={handleModalClose} />
			<Reject open={isOpenModal.reject} paymentId={paymentId} handleCancel={handleModalClose} />
		</div >
	)
}
