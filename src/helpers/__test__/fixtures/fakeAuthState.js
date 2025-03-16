export default function fakeAuthState() {
	return {
		token: '',
		user: {
			balance: 10,
			email: 'lachquarhamza@gmail.com',
			password: 'Hamza@@234',
			firstName: 'Hamza',
			lastName: 'LACHQAR',
			phone: '+212655093497',
			website: 'https://laptops.msitifa.com', // to be deleted
			stores: [
				{ website: 'https://laptops.msitifa.com', isActive: true },
				{ website: 'https://laptops.msitifa.com', isActive: false },
			],
		},
	}
}
