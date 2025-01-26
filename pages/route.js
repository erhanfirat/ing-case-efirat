import {Router} from '@vaadin/router';

export function initRouter(outlet) {
  const router = new Router(outlet);

  router.setRoutes([
    {
      path: '/',
      component: 'employee-list',
      action: async () => {
        await import('./employee-list.js');
      },
    },
    {
      path: '/add',
      component: 'employee-form',
      action: async () => {
        await import('./employee-form.js'); // Lazy-load the employee form component
      },
    },
    {
      path: '/edit/:id',
      component: 'employee-form',
      action: async () => {
        await import('./employee-form.js');
      },
    },
    {
      path: '(.*)',
      component: 'not-found',
      action: async () => {
        await import('./not-found.js');
      },
    },
  ]);

  return router;
}
