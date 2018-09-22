// mocked orders data
const mockedOrders = [
    {
        prizeName: 'Mérőszalag',
        user: 'Nagy Béla',
        orderedAt: '2018.07.25. 14:02',
        shippedAt: '2018.07.27. 12:00',
        receivedAt: '2018.07.29. 9:02',
        address: '1133 Budapest Hegedűs Gyula 32. 3.em. 42.',
        notes: null
    },
    {
        prizeName: 'Mérőszalag',
        user: 'Barna Frigyes',
        orderedAt: '2018.06.22. 17:17',
        shippedAt: null,
        receivedAt: null,
        address: '1425 Budapest Kathi Béla út 66.',
        notes: 'Cím nem létezik, felhívni'
    },
    {
        prizeName: 'Nadrág',
        user: 'Lancsa Péter Pál',
        orderedAt: '2018.09.04. 3:42',
        shippedAt: '2018.09.05. 12:14',
        receivedAt: null,
        address: '5540 Szarvas Körös utca 27',
        notes: null
    },
    {
        prizeName: 'Póló',
        user: 'Hajnal Andor',
        orderedAt: '2018.06.22. 16:12',
        shippedAt: '2018.06.27. 14:00',
        receivedAt: '2018.06.29. 9:15',
        address: '1042 Budapest Árpád út 44.',
        notes: null
    },
];

export const orders = {
    namespaced: true,
    state: {
        orders: mockedOrders
    },
    getters: {

    },
    actions: {

    },
    mutations: {

    }
}