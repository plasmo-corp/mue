import { Suspense, lazy } from 'react';

import Tabs from './tabs/backend/Tabs';

import './scss/index.scss';

// Lazy load all the tabs instead of the modal itself
const Settings = lazy(() => import('./tabs/Settings'));
const Addons = lazy(() => import('./tabs/Addons'));
const Marketplace = lazy(() => import('./tabs/Marketplace'));

const renderLoader = () => (
  <Tabs>
    <div label={window.language.modals.main.loading}>
      <div className='emptyitems'>
        <div className='emptyMessage'>
          <h1>{window.language.modals.main.loading}</h1>
        </div>
      </div>
    </div>
    <div label='' style={{ display: 'none' }}></div>
  </Tabs>
);

export default function MainModal({ modalClose }) {
  const language = window.language.modals.main.navbar;

  return (
    <>
      <span className='closeModal' onClick={modalClose}>&times;</span>
      <Tabs navbar={true}>
        <div label={language.settings} name='settings'>
          <Suspense fallback={renderLoader()}>
            <Settings/>
          </Suspense>
        </div>
        <div label={language.addons} name='addons'>
          <Suspense fallback={renderLoader()}>
            <Addons/>
          </Suspense>
        </div>
        <div label={language.marketplace} name='marketplace'>
          <Suspense fallback={renderLoader()}>
            <Marketplace/>
          </Suspense>
        </div>
      </Tabs>
    </>
  );
}
