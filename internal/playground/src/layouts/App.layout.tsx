import { useLocation, Outlet, Link } from 'react-router-dom';
import { getClassNames } from '@tool-pack/basic';
import styles from './App.layout.module.scss';
import { baseRouter } from '../router';
import React from 'react';

export function AppLayout(): JSX.Element {
  const location = useLocation();

  const onSelectChange = (/* e: BaseSyntheticEvent */) => {
    document.documentElement.classList.toggle('dark');
  };
  return (
    <section className={styles['app']}>
      <header className={styles['header']}>
        playground({location.pathname.replace(/^\//, '')})
        <select onChange={onSelectChange} id="mode-selector" name="mode">
          <option value="light">light</option>
          <option value="dark">dark</option>
        </select>
      </header>
      <section className={styles['body']}>
        <aside className={styles['aside']}>
          <ul>
            {baseRouter.map((item, index) => (
              <li
                className={getClassNames({
                  active: item.path === location.pathname,
                })}
                key={item.name}
              >
                <Link to={item.path}>
                  {index + 1}. {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <main className={styles['main']}>
          <React.Suspense>
            <Outlet />
          </React.Suspense>
        </main>
      </section>
    </section>
  );
}
