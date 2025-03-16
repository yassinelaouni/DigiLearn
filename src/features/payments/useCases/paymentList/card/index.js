import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { CardMedia } from '@mui/material';
import { Modal } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import selectors from '../../../selectors';
import actions from 'features/payments/actions';
import merchantActions from 'features/merchants/actions';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const menuId = 'primary-search-account-menu';

const cardStyle = {
	background: '#f0f0f0',
	padding: '10px',
	borderRadius: '4px',
	border: 'none',
	boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
};

function ActionMenu({ anchorEl, isMenuOpen, handleMenuClose, handleOpen, id }) {
	const dispatch = useDispatch();

	const handleOpenRemove = React.useCallback(() => {
		handleOpen({ type: 'remove', id });
		handleMenuClose();
	}, [id, handleOpen, handleMenuClose]);

	const handleOpenReject = React.useCallback(() => {
		handleOpen({ type: 'reject', id });
		handleMenuClose();
	}, [id, handleOpen, handleMenuClose]);

	const handleApprove = React.useCallback(() => {
		dispatch(actions.selectedSet({ id }))
		dispatch(actions.changeStatus({ paymentId: id, status: 'approved' }));
		handleMenuClose();
	}, [dispatch, id, handleMenuClose]);

	if (!isMenuOpen) return null;

	return (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			{true ? (
				<MenuItem onClick={handleApprove}>
					<Button
						variant='text'
						startIcon={<CheckCircleIcon />}
						size='small'
						color='success'
					>
						Approve
					</Button>
				</MenuItem>
			) : null}
			{true ? (
				<MenuItem onClick={handleOpenReject}>
					<Button
						variant='text'
						startIcon={<CancelIcon />}
						size='small'
						color='error'
					>
						Reject
					</Button>
				</MenuItem>
			) : null}
			<MenuItem onClick={handleOpenRemove}>
				<Button
					variant='text'
					startIcon={<DeleteIcon />}
					size='small'
					color='error'
				>
					Delete
				</Button>
			</MenuItem>
		</Menu>
	);
}

export default function PaymentsCard({ id, handleOpen = () => { } }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const payment = useSelector((state) => selectors.detailedOneById({ state, id }));
	const [anchorEl, setAnchorEl] = React.useState(null);
	const isMenuOpen = Boolean(anchorEl);
	const [anchorElActionMenu, setAnchorElActionMenu] = React.useState(null);
	const [isMenuOpenActionMenu, setIsMenuOpenActionMenu] = React.useState(false);
	const [isPhotoClicked, setIsPhotoClicked] = React.useState(false);



	const handleOpenActionMenu = (event) => {
		setAnchorElActionMenu(event.currentTarget);
		setIsMenuOpenActionMenu(true);
	};

	const handleMenuCloseActionMenu = () => {
		setAnchorElActionMenu(null);
		setIsMenuOpenActionMenu(false);
	};

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handlePhotoClick = () => {
		setIsPhotoClicked(!isPhotoClicked);
	};

	const handleGotoCreator = React.useCallback(() => {
		dispatch(merchantActions.selectedSet({ id: payment.creator?.id }));//payment?.creator?.id
		navigate('/adminDashboard/merchants/detailed');
	}, [dispatch, navigate, payment]);

	if (!payment) return null;

	return (
		<>
			<Card sx={{ width: '95%' }} style={cardStyle}>
				<CardHeader
					// avatar={
					// 	<Button onClick={handleGotoCreator}>
					// 		<Avatar
					// 			src={payment?.creator?.photo}
					// 			sx={{ width: 50, height: 50 }}
					// 		/>
					// 	</Button>
					// }
					action={
						<IconButton aria-controls={menuId} onClick={handleMenuOpen}>
							{payment.isApproved ? (
								<CheckCircleIcon color={'success'} />
							) : payment.isRejected ? (
								<CancelIcon color={'error'} />
							) : (
								<HourglassTopIcon color='warning' />
							)}
						</IconButton>
					}
					title={
						<Typography onClick={handleGotoCreator} variant='h6' style={{ fontWeight: "500", cursor: 'pointer' }}>{payment?.creator?.fullName}</Typography>
					}
					subheader={
						<Typography variant='caption'>{payment?.createdAt}</Typography>
					}
				/>

				<CardMedia
					component='img'
					height='260'
					style={{
						boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '4px',
						border: 'none',
						cursor: 'pointer'
					}}
					onClick={handlePhotoClick}
					src={`data:image/png;base64,${payment.photo}`}
				/>
			</Card >
			<ActionMenu
				handleOpen={handleOpen}
				anchorEl={anchorEl}
				isMenuOpen={isMenuOpen}
				handleMenuClose={handleMenuClose}
				id={id}
			/>
			<Modal
				open={isPhotoClicked}
				onClose={handlePhotoClick}
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					height: '100%',
					width: '100%',
				}}
			>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						height: '80%',
						width: '70%',
						backgroundColor: '#fff',
						padding: '20px',
						position: 'relative',
					}}
				>
					<IconButton
						onClick={handlePhotoClick}
						style={{
							position: 'absolute',
							width: '35px',
							height: '35px',
							padding: '8px',
							top: -13,
							right: -13,
							backgroundColor: 'red',
							color: 'white',
						}}
					>
						<CloseIcon />
					</IconButton>

					<CardMedia
						component='img'
						height='99%'
						width='99%'
						src={`data:image/png;base64,${payment.photo}`}
						onClick={handlePhotoClick}
						style={{ cursor: 'pointer', margin: 8 }}
					/>
				</div>
			</Modal >
		</>
	);
}