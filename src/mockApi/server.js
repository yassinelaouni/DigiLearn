import { createServer, Model } from "miragejs"

const base64 =
    "/9j/4AAQSkZJRgABAQEAYABgAAD/4QA6RXhpZgAATU0AKgAAAAgAA1EQAAEAAAABAQAAAFERAAEAAAABAAAAAFESAAEAAAABAAAAAFIAAAEAAAABAAAAAFIgAAEAAAABAAAAAFQAAAMAAAABAAIAAAABAAIAAAEAAAABAAAAAGIBAAEAAAABAAAAAGKAAAAAAA"


createServer({
    models: {
        admin: Model,
        merchant: Model,
        rating: Model,
        buyer: Model,
        payment: Model

    },
    routes() {
        this.namespace = "api"

        this.post("/merchants/login", (schema, request) => {
            const { email, password } = JSON.parse(request.requestBody);

            // Perform authentication logic here
            // For example, check if the username and password match a user in the database
            const merchant = schema.merchants.find(1);

            if (email === "yassineelaouni581@gmail.com" && password === "Yss12346!99ghbn") {
                return {
                    success: true,
                    user: merchant,
                    token: "gkjGFGJ567hkulgg",
                };
            } else {
                return {
                    success: false,
                    message: "Login failed",
                    token: null,
                };
            }
        });
        this.post("/merchants/admin/login", (schema, request) => {
            const { email, password } = JSON.parse(request.requestBody);

            const admin = schema.admins.find(1);

            if (email === "yassineelaouni581@gmail.com" && password === "Admin!!$$89") {
                return {
                    success: true,
                    user: admin,
                    token: "gkjGFGJ567hkulgg",
                };
            } else {
                return {
                    success: false,
                    message: "Login failed",
                    token: null,
                };
            }
        });

        this.post("/merchants/verifyEmail", (schema, request) => {
            const { code } = JSON.parse(request.requestBody);


            if (code === "345678") {
                return {
                    success: true,
                    token: "gkjGFGJ567hkulgg",
                };
            } else {
                return {
                    success: false,
                    token: null,
                };
            }
        });
        this.post("/merchants/resendCode", (schema, request) => {

            return {
                success: true,
                errorCode: "",
                errorMessage: "new code has been resented successfully",
                errors: {},
            };

        });

        this.post("/merchants/checkEmail", (schema, request) => {
            const { email } = JSON.parse(request.requestBody);


            if (email === "yassineelaouni581@gmail.com") {
                return {
                    success: true,
                    token: "gkjGFGJ567hkulgg",
                };
            } else {
                return {
                    success: false,
                    token: null,
                };
            }
        });

        this.post("/merchants/resetPassword", (schema, request) => {
            const merchant = schema.merchants.find(1);
            return {
                success: true,
                user: merchant,
                token: "gkjGFGJ567hkulgg",
            };

        });

        this.post("/merchants/checkCode", (schema, request) => {
            const { code } = JSON.parse(request.requestBody);


            if (code === "345678") {
                return {
                    success: true,
                    token: "gkjGFGJ567hkulgg",
                };
            } else {
                return {
                    success: false,
                    token: null,
                };
            }
        });

        this.post("/merchants/register", (schema, request) => {
            const {
                email,
                password,
                firstName,
                lastName,
                phone,
            } = JSON.parse(request.requestBody);

            // Perform registration logic here
            // For example, create a new user in the database
            const merchant = schema.create("merchant", {
                balance: 10,
                status: [
                    {
                        value: "active",
                        date: "2023-09-06",
                    },
                ],
                email,
                firstName,
                lastName,
                password,
                phone,
                websites: [],
                isVerifiedEmail: "false",
                verifiedCode: "3245"
            });

            // Simulate a 1-second delay before returning the response
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        success: true,
                        user: merchant,
                        token: "gkjGFGJ567hkulgg"
                    });
                }, 1000); // delay of 1 second (1000 milliseconds)
            });
        });

        this.get("/merchants", (schema, request) => {
            const merchants = schema.merchants.all();
            return {
                success: true,
                found: merchants.models,
                errorCode: "",
                errorMessage: "",
                errors: {},
            };
        });
        this.get("/buyers", (schema, request) => {
            const merchants = schema.merchants.all();
            return {
                success: true,
                found: merchants.models,
                errorCode: "",
                errorMessage: "",
                errors: {},
            };
        });



        this.delete("/merchants/delete", (schema, request) => {
            const { merchantId } = JSON.parse(request.requestBody)
            const merchant = schema.merchants.find(merchantId);
            if (merchant) {
                merchant.destroy();
                return {
                    success: true,
                    deleted: merchant,
                    errorCode: "",
                    errorMessage: "",
                    errors: {},
                };
            } else {
                return {
                    success: false,
                    deleted: {},
                    errorCode: "Not found",
                    errorMessage: `Merchant with ID ${merchantId} not found`,
                    errors: {},
                };
            }
        });

        this.patch("/merchants/update/status", (schema, request) => {
            const { merchantId, status } = JSON.parse(request.requestBody)

            const merchant = schema.merchants.find(merchantId);

            if (merchant) {
                merchant.update({
                    status: [
                        {
                            value: status,
                            date: "2023-09-06",
                        },
                    ],
                });

                return {
                    success: true,
                    updated: { status: merchant.status, merchantId: merchant.id },
                    errorCode: "",
                    errorMessage: "",
                    errors: {},
                };
            } else {
                return {
                    success: false,
                    updated: {},
                    errorCode: "Not found",
                    errorMessage: `Merchant with ID ${merchantId} not found`,
                    errors: {},
                };
            }
        });

        this.patch("/merchants/update/phone", (schema, request) => {
            const { merchantId, phone } = JSON.parse(request.requestBody)


            const merchant = schema.merchants.find(merchantId);

            if (merchant) {
                merchant.update({
                    phone: phone
                });

                return {
                    success: true,
                    updated: { phone: merchant.phone, merchantId: merchant.id },
                    errorCode: "",
                    errorMessage: "phone has been changed successfully",
                    errors: {},
                };
            } else {
                return {
                    success: false,
                    updated: {},
                    errorCode: "Not found",
                    errorMessage: `Merchant with ID ${merchantId} not found`,
                    errors: {},
                };
            }
        });
        this.patch("/merchants/update/password", (schema, request) => {
            const { merchantId, password } = JSON.parse(request.requestBody)


            const merchant = schema.merchants.find(merchantId);

            if (merchant) {
                merchant.update({
                    password: password
                });

                return {
                    success: true,
                    updated: { password: merchant.password, merchantId: merchant.id },
                    errorCode: "",
                    errorMessage: "password has been changed successfully",
                    errors: {},
                };
            } else {
                return {
                    success: false,
                    updated: {},
                    errorCode: "Not found",
                    errorMessage: `Merchant with ID ${merchantId} not found`,
                    errors: {},
                };
            }
        });

        this.patch("/merchants/website/update", (schema, request) => {
            const { merchantId, url, websiteId } = JSON.parse(request.requestBody)


            const merchant = schema.merchants.find(merchantId);

            if (merchant) {
                const updatedWebsites = merchant.websites.map((website) => {
                    if (website.id === websiteId) {
                        return { ...website, url };
                    }
                    return website;
                });

                merchant.update({
                    websites: updatedWebsites
                });

                const updatedWebsite = merchant.websites.find((website) => website.id === websiteId);

                return {
                    success: true,
                    updated: { merchantId: merchantId, website: updatedWebsite },
                    errorCode: "",
                    errorMessage: "website has been changed successfully",
                    errors: {},
                };
            } else {
                return {
                    success: false,
                    updated: {},
                    errorCode: "Not found",
                    errorMessage: `Merchant with ID ${merchantId} not found`,
                    errors: {},
                };
            }
        });

        this.patch("/merchants/website/update/status", (schema, request) => {
            const { merchantId, status, websiteId } = JSON.parse(request.requestBody)



            const merchant = schema.merchants.find(parseInt(merchantId));
            if (merchant) {
                const updatedWebsites = merchant.websites.map((website) => {
                    if (website.id === websiteId) {
                        return { ...website, status };
                    }
                    return website;
                });

                merchant.update({
                    websites: updatedWebsites
                });

                return {
                    success: true,
                    updated: {
                        status,
                        merchantId: parseInt(merchantId),
                        websiteId: parseInt(websiteId)
                    },
                    errorCode: "",
                    errorMessage: "",
                    errors: {},
                };
            } else {
                return {
                    success: false,
                    updated: {},
                    errorCode: "Not found",
                    errorMessage: `Merchant with ID ${merchantId} not found`,
                    errors: {},
                };
            }
        });

        this.delete("/merchants/website/delete", (schema, request) => {
            const { websiteId, merchantId } = JSON.parse(request.requestBody)

            const merchant = schema.merchants.find(merchantId);

            if (merchant) {
                const websiteIndex = merchant.websites.indexOf(websiteId);
                if (websiteIndex !== -1) {
                    merchant.websites.splice(websiteIndex, 1);
                }

                return {
                    success: true,
                    deleted: { merchantId: merchantId, websiteId: websiteId },
                    errorCode: "",
                    errorMessage: "website has been deleted successfully",
                    errors: {},
                };
            } else {
                return {
                    success: false,
                    deleted: {},
                    errorCode: "Not found",
                    errorMessage: `Merchant with ID ${merchantId} not found`,
                    errors: {},
                };
            }
        });

        this.post("/merchants/website/add", (schema, request) => {
            const { url, merchantId } = JSON.parse(request.requestBody)
            const merchant = schema.merchants.find(merchantId);


            // Generate a unique ID for the new website
            function generateUniqueId() {
                const alphanumeric = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                let uniqueId = '';

                for (let i = 0; i < 10; i++) {
                    const randomIndex = Math.floor(Math.random() * alphanumeric.length);
                    uniqueId += alphanumeric[randomIndex];
                }

                return uniqueId;
            }

            if (merchant) {
                const newWebsite = {
                    id: generateUniqueId(),
                    url: url,
                    status: 'Inreview'
                };

                const updatedWebsites = [...merchant.websites, newWebsite];

                merchant.update({
                    websites: updatedWebsites
                });

                return {
                    success: true,
                    added: { merchantId: merchantId, website: newWebsite },
                    errorCode: "",
                    errorMessage: "website has been added successfully",
                    errors: {},
                };
            } else {
                return {
                    success: false,
                    added: {},
                    errorCode: "Not found",
                    errorMessage: `Merchant with ID ${merchantId} not found`,
                    errors: {},
                };
            }
        });



        this.post("/rating/addOne", (schema, request) => {
            const {
                firstName,
                lastName,
                phone,
                city,
                email,
                orderValue,
                punctuality,
                communication,
                orderCancellation,
                packageReturn,
                buyerId,
            } = JSON.parse(request.requestBody);

            // Generate a unique ID for the new rating
            function generateUniqueId() {
                const alphanumeric = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                let uniqueId = "";

                for (let i = 0; i < 10; i++) {
                    const randomIndex = Math.floor(Math.random() * alphanumeric.length);
                    uniqueId += alphanumeric[randomIndex];
                }

                return uniqueId;
            }

            let newRating;
            let condition = buyerId === "" ? null : buyerId
            if (condition) {
                newRating = {
                    id: generateUniqueId(),
                    buyerId,
                    orderValue,
                    punctuality,
                    communication,
                    orderCancellation,
                    packageReturn,
                };
            } else {
                newRating = {
                    id: generateUniqueId(),
                    firstName,
                    lastName,
                    phone,
                    city,
                    email: email === "" ? null : email,
                    orderValue,
                    punctuality,
                    communication,
                    orderCancellation,
                    packageReturn,
                };
            }

            // Add the new rating
            schema.ratings.create(newRating);

            return {
                success: true,
                added: newRating,
                errorCode: "",
                errorMessage: "The buyer has been successfully rated",
                errors: {},
            };
        });

        this.post("/rating/getOne", (schema, request) => {
            const { firstName, lastName, phone, buyerId } = request.queryParams;
            let rating

            if (firstName && lastName && phone) {
                // Find the rating based on firstName, lastName, and phone
                rating = schema.ratings.findBy({ firstName, lastName, phone });
            } else {
                // Find the rating based on buyerId
                rating = { id: 1, data: "rrr", by: "222222" };
                // rating = schema.ratings.findBy({ buyerId });
            }

            if (rating) {
                // Rating found
                return {
                    success: true,
                    found: rating,
                    errorCode: "",
                    count: 1,
                    errorMessage: "Rating retrieved successfully",
                    errors: {},
                };
            } else {
                // Rating not found
                return {
                    success: true,
                    rating: {},
                    count: 0,
                    errorCode: "404",
                    errorMessage: "buyer not found",
                    errors: {},
                };
            }
        });
        this.get("/payment/get", (schema, request) => {
            const payments = schema.payments.all();
            return {
                success: true,
                found: payments.models,
                errorCode: "",
                errorMessage: "pyments has been get successfully",
                errors: {},
            };
        });
        this.patch("/payments/update/status", (schema, request) => {
            const { status, paymentId } = JSON.parse(request.requestBody);

            const payment = schema.payments.find(parseInt(paymentId));

            if (payment) {
                payment.update({
                    status: [
                        {
                            value: status,
                            date: '2023-01-30T05:33:23.050Z',
                            user: "1"
                        },
                    ],
                });

                return {
                    success: true,
                    updated: {
                        status: payment.status,
                        paymentId: parseInt(paymentId)
                    },
                    errorCode: "",
                    errorMessage: "",
                    errors: {},
                };
            } else {
                return {
                    success: false,
                    updated: {},
                    errorCode: "Not found",
                    errorMessage: `Payment with ID ${paymentId} not found`,
                    errors: {},
                };
            }
        });

        this.delete("/payments/delete", (schema, request) => {
            const paymentId = 0

            schema.payments.find(paymentId).destroy()

            return {
                success: true,
                deleted: { paymentId },
                errorCode: "",
                errorMessage: "payment has been deleted successfully",
                errors: {},
            }
        });




    },
    seeds(server) {
        server.create('payment', {
            id: '0',
            creator: {
                id: "1",
                balance: 40,
                status: [
                    {
                        value: "active",
                        date: "2023-09-06",
                    },
                ],
                email: "yassineelaouni581@gmail.com",
                firstName: "Yassine",
                lastName: "EL AOUNI",
                password: "Yss12346!99ghbn",
                phone: "+212611856334",
                websites: [
                    { id: 1, url: "https://laptops.msitifa1.com", status: "Verified" },
                    { id: 2, url: "https://example2.com", status: "Inreview" },
                    { id: 3, url: "https://laptops.msitifa3.com", status: "Invalid" },
                    { id: 4, url: "https://example4.com", status: "Inreview" },
                ],
            },
            createdAt: '2023-01-22T05:33:23.050Z',
            photo: base64,
            amount: 90,
            status: [
                {
                    value: 'inreview',
                    date: '2023-01-30T05:33:23.050Z',
                    user: "1"
                },
            ],
        });
        server.create('payment', {
            id: '1',
            creator: {
                id: "2",
                balance: 40,
                status: [
                    {
                        value: "active",
                        date: "2023-09-06",
                    },
                ],
                email: "yassineelaouni581@gmail.com",
                firstName: "Yassine",
                lastName: "EL AOUNI",
                password: "Yss12346!99ghbn",
                phone: "+212611856334",
                websites: [
                    { id: 1, url: "https://laptops.msitifa1.com", status: "Verified" },
                    { id: 2, url: "https://example2.com", status: "Inreview" },
                    { id: 3, url: "https://laptops.msitifa3.com", status: "Invalid" },
                    { id: 4, url: "https://example4.com", status: "Inreview" },
                ],
            },
            createdAt: '2023-01-22T05:33:23.050Z',
            photo: base64,
            amount: 900,
            status: [
                {
                    value: 'approved',
                    date: '2023-01-22T05:33:23.050Z',
                    user: "2"
                },
            ],
        });
        server.create('payment', {
            id: '2',
            creator: {
                id: "3",
                balance: 40,
                status: [
                    {
                        value: "active",
                        date: "2023-09-06",
                    },
                ],
                email: "yassineelaouni581@gmail.com",
                firstName: "Yassine",
                lastName: "EL AOUNI",
                password: "Yss12346!99ghbn",
                phone: "+212611856334",
                websites: [
                    { id: 1, url: "https://laptops.msitifa1.com", status: "Verified" },
                    { id: 2, url: "https://example2.com", status: "Inreview" },
                    { id: 3, url: "https://laptops.msitifa3.com", status: "Invalid" },
                    { id: 4, url: "https://example4.com", status: "Inreview" },
                ],
            },
            createdAt: '2023-01-22T05:33:23.050Z',
            photo: base64,
            amount: 900,
            status: [
                {
                    value: 'inreview',
                    date: '2023-01-22T05:33:23.050Z',
                    user: "1"
                },
            ],
        });
        server.create('payment', {
            id: '3',
            creator: {
                id: "4",
                balance: 40,
                status: [
                    {
                        value: "active",
                        date: "2023-09-06",
                    },
                ],
                email: "yassineelaouni581@gmail.com",
                firstName: "Yassine",
                lastName: "EL AOUNI",
                password: "Yss12346!99ghbn",
                phone: "+212611856334",
                websites: [
                    { id: 1, url: "https://laptops.msitifa1.com", status: "Verified" },
                    { id: 2, url: "https://example2.com", status: "Inreview" },
                    { id: 3, url: "https://laptops.msitifa3.com", status: "Invalid" },
                    { id: 4, url: "https://example4.com", status: "Inreview" },
                ],
            },
            createdAt: '2023-01-22T05:33:23.050Z',
            photo: base64,
            amount: 900,
            status: [
                {
                    value: 'inreview',
                    date: '2023-01-22T05:33:23.050Z',
                    user: "1"
                },
            ],
        });
        server.create('payment', {
            id: '4',
            creator: {
                id: "5",
                balance: 40,
                status: [
                    {
                        value: "active",
                        date: "2023-09-06",
                    },
                ],
                email: "yassineelaouni581@gmail.com",
                firstName: "Yassine",
                lastName: "EL AOUNI",
                password: "Yss12346!99ghbn",
                phone: "+212611856334",
                websites: [
                    { id: 1, url: "https://laptops.msitifa1.com", status: "Verified" },
                    { id: 2, url: "https://example2.com", status: "Inreview" },
                    { id: 3, url: "https://laptops.msitifa3.com", status: "Invalid" },
                    { id: 4, url: "https://example4.com", status: "Inreview" },
                ],
            },
            createdAt: '2023-01-22T05:33:23.050Z',
            photo: base64,
            amount: 900,
            status: [
                {
                    value: 'inreview',
                    date: '2023-01-22T05:33:23.050Z',
                    user: "1"
                },
            ],
        });
        server.create('payment', {
            id: '5',
            creator: {
                id: "6",
                balance: 40,
                status: [
                    {
                        value: "active",
                        date: "2023-09-06",
                    },
                ],
                email: "yassineelaouni581@gmail.com",
                firstName: "Yassine",
                lastName: "EL AOUNI",
                password: "Yss12346!99ghbn",
                phone: "+212611856334",
                websites: [
                    { id: 1, url: "https://laptops.msitifa1.com", status: "Verified" },
                    { id: 2, url: "https://example2.com", status: "Inreview" },
                    { id: 3, url: "https://laptops.msitifa3.com", status: "Invalid" },
                    { id: 4, url: "https://example4.com", status: "Inreview" },
                ],
            },
            createdAt: '2023-01-22T05:33:23.050Z',
            photo: base64,
            amount: 900,
            status: [
                {
                    value: 'inreview',
                    date: '2023-01-22T05:33:23.050Z',
                    user: "1"
                },
            ],
        });
        server.create("rating", {
            id: "1",
            firstName: "John",
            lastName: "Doe",
            phone: "+123456789",
            city: "New York",
            email: "johndoe@example.com",
            orderValue: 4,
            punctuality: 3,
            communication: 5,
            orderCancellation: false,
            packageReturn: true,
            buyerId: "123123",
        });

        server.create("rating", {
            id: "2",
            firstName: "Hamza",
            lastName: "LACHQAR",
            phone: "+212655093497",
            city: "Los Angeles",
            email: "janesmith@example.com",
            orderValue: 5,
            punctuality: 5,
            communication: 5,
            orderCancellation: false,
            packageReturn: false,
            buyerId: "456",
        });

        server.create("rating", {
            id: "3",
            firstName: "ffff",
            lastName: "ffff",
            phone: "+212611856333",
            city: "Chicago",
            email: "michaeljohnson@example.com",
            orderValue: 4,
            punctuality: 4,
            communication: 3,
            orderCancellation: true,
            packageReturn: true,
            buyerId: "222222",
        });

        server.create("admin", {
            id: "1",
            role: "admin",
            status: [
                {
                    value: "active",
                    date: "2023-09-06",
                },
            ],
            email: "lachquarhamza@gmail.com",
            firstName: "Admin",
            lastName: "LACHQAR",
            password: "Admin!!$$89",
            phone: "+212655093497",
        });
        server.create("admin", {
            id: "2",
            status: [
                {
                    value: "active",
                    date: "2023-09-06",
                },
            ],
            email: "lachquarhamza@gmail.com",
            firstName: "Admin",
            lastName: "LACHQAR",
            password: "Admin!!$$89",
            phone: "+212655093497",
        });
        server.create("merchant", {
            id: "1",
            balance: 10,
            status: [
                {
                    value: "active",
                    date: "2023-09-06",
                },
            ],
            email: "lachquarhamza@gmail.com",
            firstName: "Hamza",
            lastName: "LACHQAR",
            password: "Yss12346!99ghbn",
            phone: "+212655093497",
            websites: [
                { id: 1, url: "https://laptops.msitifa1.com", status: "Verified" },
                { id: 2, url: "https://example2.com", status: "Inreview" },
                { id: 3, url: "https://laptops.msitifa3.com", status: "Invalid" },
                { id: 4, url: "https://example4.com", status: "Inreview" },
            ],
        });

        server.create("merchant", {
            id: "2",
            balance: 40,
            status: [
                {
                    value: "inactive",
                    date: "2023-09-06",
                },
            ],
            email: "yassineelaouni591@gmail.com",
            firstName: "Yassine",
            lastName: "EL AOUNI",
            password: "Yss12346!99ghbn",
            phone: "+212611856334",
            websites: [
                { id: 1, url: "https://laptops.msitifa1.com", status: "Verified" },
                { id: 2, url: "https://example2.com", status: "Inreview" },
                { id: 3, url: "https://laptops.msitifa3.com", status: "Invalid" },
                { id: 4, url: "https://example4.com", status: "Inreview" },
            ],
        });
        server.create("merchant", {
            id: "3",
            balance: 40,
            status: [
                {
                    value: "active",
                    date: "2023-09-06",
                },
            ],
            email: "yassineelaouni581@gmail.com",
            firstName: "Yassine",
            lastName: "EL AOUNI",
            password: "Yss12346!99ghbn",
            phone: "+212611856334",
            websites: [
                { id: 1, url: "https://laptops.msitifa1.com", status: "Verified" },
                { id: 2, url: "https://example2.com", status: "Inreview" },
                { id: 3, url: "https://laptops.msitifa3.com", status: "Invalid" },
                { id: 4, url: "https://example4.com", status: "Inreview" },
            ],
        });
        server.create("merchant", {
            id: "4",
            balance: 40,
            status: [
                {
                    value: "inactive",
                    date: "2023-09-06",
                },
            ],
            email: "yassineelaouni571@gmail.com",
            firstName: "Yassine",
            lastName: "EL AOUNI",
            password: "Yss12346!99ghbn",
            phone: "+212611856334",
            websites: [
                { id: 1, url: "https://laptops.msitifa1.com", status: "Verified" },
                { id: 2, url: "https://example2.com", status: "Inreview" },
                { id: 3, url: "https://laptops.msitifa3.com", status: "Invalid" },
                { id: 4, url: "https://example4.com", status: "Inreview" },
            ],
        });
        server.create("merchant", {
            id: "5",
            balance: 40,
            status: [
                {
                    value: "inactive",
                    date: "2023-09-06",
                },
            ],
            email: "yassineelaouni501@gmail.com",
            firstName: "Yassine",
            lastName: "EL AOUNI",
            password: "Yss12346!99ghbn",
            phone: "+212611856334",
            websites: [
                { id: 1, url: "https://laptops.msitifa1.com", status: "Verified" },
                { id: 2, url: "https://example2.com", status: "Inreview" },
                { id: 3, url: "https://laptops.msitifa3.com", status: "Invalid" },
                { id: 4, url: "https://example4.com", status: "Inreview" },
            ],
        });
        server.create("merchant", {
            id: "6",
            balance: 40,
            status: [
                {
                    value: "inactive",
                    date: "2023-09-06",
                },
            ],
            email: "yassineelaouni561@gmail.com",
            firstName: "Yassine",
            lastName: "EL AOUNI",
            password: "Yss12346!99ghbn",
            phone: "+212611856334",
            websites: [
                { id: 1, url: "https://laptops.msitifa1.com", status: "Verified" },
                { id: 2, url: "https://example2.com", status: "Inreview" },
                { id: 3, url: "https://laptops.msitifa3.com", status: "Invalid" },
                { id: 4, url: "https://example4.com", status: "Inreview" },
            ],
        });
        server.create("merchant", {
            id: "8",
            balance: 40,
            status: [
                {
                    value: "inactive",
                    date: "2023-09-06",
                },
            ],
            email: "yassineelaouni551@gmail.com",
            firstName: "Yassine",
            lastName: "EL AOUNI",
            password: "Yss12346!99ghbn",
            phone: "+212611856334",
            websites: [
                { id: 1, url: "https://laptops.msitifa1.com", status: "Verified" },
                { id: 2, url: "https://example2.com", status: "Inreview" },
                { id: 3, url: "https://laptops.msitifa3.com", status: "Invalid" },
                { id: 4, url: "https://example4.com", status: "Inreview" },
            ],
        });
    },
})