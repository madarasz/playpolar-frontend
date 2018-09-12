// mocked user data
const mockedUsers = [
    {   
        id: 1,
        name: 'Nagy Béla',
        points: 38000,
        scans: 14,
        fb: true,
        lastActive: '2018.06.12. 13:04'
    },
    {
        id: 2,
        name: 'Kiss Attila',
        points: 3000,
        scans: 2,
        fb: false,
        lastActive: '2018.07.10. 8:24'
    },
    {
        id: 3,
        name: 'Tóth Tibor',
        points: 1000,
        scans: 1,
        fb: true,
        lastActive: '2018.09.04. 13:55'
    },
    {
        id: 4,
        name: 'Kisfaludiné Erika',
        points: 12000,
        scans: 5,
        fb: false,
        lastActive: '2018.09.02. 12:00'
    },
    {
        id: 5,
        name: 'Franci György',
        points: 8800,
        scans: 3,
        fb: false,
        lastActive: '2018.06.22. 17:03'
    },
    {
        id: 6,
        name: 'Barna Frigyes',
        points: 12000,
        scans: 5,
        fb: true,
        lastActive: '2018.09.02. 12:00'
    },
    {
        id: 7,
        name: 'Hajnal Andor',
        points: 17500,
        scans: 8,
        fb: true,
        lastActive: '2018.05.03. 13:13'
    },
    {
        id: 8,
        name: 'Kis Béla',
        points: 11500,
        scans: 5,
        fb: true,
        lastActive: '2018.05.08. 13:03'
    },
];

// mocked invite data
const mockedInvites = [
    {
        name: 'Lugosi Béla',
        invitedBy: 'Kis Béla'
    },
    {
        name: 'Nagy Csongor',
        invitedBy: 'Barna Frigyes'
    },
]

// mocked user details data
const mockedUserDetails = {
    email: 'kamucim@gmail.com',
    registeredOn: '2017.01.22. 22:01',
    orders: [
        {
          prizeName: 'Kulcstartó',
          wattPrice: 6000,
          orderedOn: '2017.03.21. 12:41',
          status: 'átvéve'
        },
        {
          prizeName: 'Nadrág',
          wattPrice: 10000,
          orderedOn: '2017.09.04. 9:25',
          status: 'feladva'
        }
      ],
    scans: [
        {
            deviceName: 'Polar MO4H080SAX multi kültéri egység',
            deviceType: 'multi split',
            wattPoints: 8100,
            scannedOn: '2017.01.23. 14:31',
        },
        {
            deviceName: 'Bosch Climate 5000 9000BTU',
            deviceType: 'split',
            wattPoints: 2900,
            scannedOn: '2017.05.13. 4:21',
        },
        {
            deviceName: 'Bosch Climate 5000 9000BTU',
            deviceType: 'split',
            wattPoints: 2900,
            scannedOn: '2017.05.15. 15:32',
        },
    ],
    invites: [
        {
            inviteName: 'Kisfaludiné Erika',
            isRegistered: true,
            wattPoints: 12000,
            scans: 5,
        },
        {
            inviteName: 'Lugosi Béla',
            isRegistered: false,
            wattPoints: null,
            scans: null,
        },
    ]
}

export const users = {
    namespaced: true,
    state: {
        users: mockedUsers,
        invites: mockedInvites,
        userDetails: mockedUserDetails
    },
    getters: {
    },
    actions: {

    },
    mutations: {

    }
}