import { NotFountLayout } from './layouts/NotFound.layout';
import { createBrowserRouter } from 'react-router-dom';
import { ErrorLayout } from './layouts/Error.layout';
import { AppLayout } from './layouts/App.layout';
import { getDemos } from './utils/getDemos';
import App from './app/App';

export const baseRouter = [
  {
    //  element: getDemos(import.meta.glob('~/virtual-list/demo/*.tsx')),
    element: getDemos({}),
    name: 'test 测试路由',
    path: '/test',
  },
  /* {import insert target} */
];

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <App />,
        path: '/',
      },
      ...baseRouter,
    ],
    errorElement: <ErrorLayout />,
    element: <AppLayout />,
    path: '',
  },
  {
    element: <NotFountLayout />,
    path: '*',
  },
]);
