import {Router} from '@vaadin/router';

export function initRouter(outlet) {
  const router = new Router(outlet);

  router.setRoutes([
    {
      path: '/',
      component: 'employee-list',
      action: async () => {
        await import('./employee-list.js'); // Lazy-load the employee list component
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
        await import('./employee-form.js'); // Lazy-load the employee form component
      },
    },
    {
      path: '(.*)',
      component: 'not-found',
      action: async () => {
        await import('./not-found.js'); // Create a simple 404 component
      },
    },
  ]);

  return router;
}
