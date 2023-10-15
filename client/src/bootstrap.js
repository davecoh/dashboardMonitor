import React from 'react';
import { createRoot } from 'react-dom/client';
import Provider from 'react-redux/es/components/Provider';

/* Standalone */

const ProviderContainer = (
    <Provider store={{}}>
        <></>
    </Provider>
);

createRoot(document.getElementById('app')).render(ProviderContainer);

export default ProviderContainer;
