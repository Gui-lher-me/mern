import { Users } from '../../user/pages/Users';
import { NewPlace } from '../../places/pages/NewPlace';

export const routes = Object.freeze([
    {
        url: '/',
        path: '/',
        component: Users,
    },
    {
        url: '/places/new',
        path: '/places/new',
        component: NewPlace,
    },
]);
