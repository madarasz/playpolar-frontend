// mocked data
const mockedChallanges = [
    {
        title: 'Első Scan',
        description: 'Csippantsd be az első szerelésed!',
        awardedWatts: 5000,
        usersCompleted: 8,
        usersActive: 5,
        usersFailed: 1,
        requiredWatts: null,
        requiredScans: 1,
        requiredType: null,
        requiredInvites: null,
        minimumWatts: null,
        maximumWatts: null,
        active: true
    },
    {
        title: 'Multizás',
        description: 'Csippants három multi split készülékeket!',
        awardedWatts: 8000,
        usersCompleted: 1,
        usersActive: 5,
        usersFailed: 4,
        requiredWatts: null,
        requiredScans: 3,
        requiredInvites: null,
        requiredType: 'multi split',
        minimumWatts: null,
        maximumWatts: null,
        active: true
    },
    {
        title: 'Merj nagyot',
        description: 'Csippants két legalább 5000W-os árut!',
        awardedWatts: 100000,
        usersCompleted: 3,
        usersActive: 3,
        usersFailed: 4,
        requiredWatts: null,
        requiredScans: 2,
        requiredInvites: null,
        requiredType: null,
        minimumWatts: 5000,
        maximumWatts: null,
        active: true
    },
    {
        title: 'Sok kicsi sokra megy',
        description: 'Csippants összesen 20000 W-nyi készüléket!',
        awardedWatts: 100000,
        usersCompleted: 3,
        usersActive: 5,
        usersFailed: 2,
        requiredWatts: 20000,
        requiredScans: null,
        requiredInvites: null,
        requiredType: null,
        minimumWatts: null,
        maximumWatts: null,
        active: true
    },
    {
        title: 'Jó társaság',
        description: 'Hívj meg két ismerősödet!',
        awardedWatts: 40000,
        usersCompleted: 2,
        usersActive: 5,
        usersFailed: 3,
        requiredWatts: null,
        requiredScans: null,
        requiredInvites: 2,
        requiredType: null,
        minimumWatts: null,
        maximumWatts: null,
        active: true
    }
];

export const challenges = {
    namespaced: true,
    state: {
        challenges: mockedChallanges
    },
    getters: {
        // getAllChallenges: state => {
        //     return state.challenges;
        // }
    },
    actions: {

    },
    mutations: {

    }
}