const mockedPrizes = [
    {
        name: 'Mérőszalag',
        description: 'Mérjen Ön is meg mindent!',
        price: 'mérföldkő',
        available: null,
        imageAvailable: true
    },
    {
        name: 'Csővágó',
        description: 'A csövet bizony el kell vágni.',
        price: 'mérföldkő',
        available: null,
        imageAvailable: true
    },
    {
        name: 'Céges autó',
        description: 'Csak a legjobbaknak jár.',
        price: 'mérföldkő',
        available: null,
        imageAvailable: false
    },
    {
        name: 'Póló',
        description: 'Nagyon divatos szabása van.',
        price: 5000,
        available: 100,
        imageAvailable: true
    },
    {
        name: 'Nadrág',
        description: 'Beépített dekoltázzsal.',
        price: 10000,
        available: 25,
        imageAvailable: true
    },
    {
        name: 'Kulcstartó',
        description: 'Mindenkinek kell egy.',
        price: 6000,
        available: 8,
        imageAvailable: false
    },
  ]

export const prizes = {
    namespaced: true,
    state: {
        prizes: mockedPrizes
    },
    getters: {

    },
    actions: {

    },
    mutations: {

    }
}