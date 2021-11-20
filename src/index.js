// components bundles
import './components/bundles/components.js';

// app imports
import namespace from './core/namespace.js';
import initializeLayout from './behaviors/initializeLayout.js';

initializeLayout();

window.App = {
    name: 'Lit-Boilerplate',
    // export to global scope
};

namespace(window.App);
