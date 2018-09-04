export default [
    {
        path: '/devices',
        name: 'Készülékek',
        component: () => import('./views/Devices.vue')
    },
    {
        path: '/challenges',
        name: 'Kihívások',
        component: () => import('./views/Challenges.vue')
    },
    {
        path: '/milestones',
        name: 'Mérföldkövek',
        component: () => import('./views/Milestones.vue')
    },
    {
        path: '/prizes',
        name: 'Ajándékok',
        component: () => import('./views/Prizes.vue')
    },
    {
        path: '/orders',
        name: 'Ajándék követés',
        component: () => import('./views/Orders.vue')
    },
    {
        path: '*',
        redirect: {
            name: 'Készülékek'
        }
    }
]