module.exports = [
    {
        path: '/users',
        name: 'Felhasználók',
        component: () => import('./views/Users.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('./views/About.vue')
    },
    {
        path: '*',
        redirect: {
            name: 'Felhasználók'
        }
    }
]