// mocked milestone data
const mockedMilestones = [
    {
        level: 1,
        title: 'Kezdő klímás',
        requiredWatts: 10000,
        usersCompleted: 6,
        prize: 'Mérőszalag',
        active: true
    },
    {
        level: 2,
        title: 'Tapasztalt szerelő',
        requiredWatts: 100000,
        usersCompleted: 2,
        prize: 'Csővágó',
        active: true
    },
    {
    level: 3,
        title: 'Durva arc',
        requiredWatts: 300000,
        usersCompleted: 0,
        prize: 'Céges autó',
        active: true
    }
];

export const milestones = {
    namespaced: true,
    state: {
        milestones: mockedMilestones
    },
    getters: {

    },
    actions: {

    },
    mutations: {

    }
}