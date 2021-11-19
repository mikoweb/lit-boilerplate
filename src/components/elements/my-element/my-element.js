import AbstractElement from '../AbstractElement.js';
import {html} from 'lit';
import {styles} from './styles.js';
import {sharedStyles} from '../../style-modules/shared-styles.js';

class MyElement extends AbstractElement {
    static styles = [sharedStyles, styles];
    static properties = {
        version: {},
    };

    constructor() {
        super();
        this.version = 'STARTING';
    }

    render() {
        return html`
            <div class="container">
                <div class="my-element">
                    <p class="my-element__p">
                        Welcome to the Lit tutorial!
                    </p>
                    <p>
                        This is the ${this.version} code.
                    </p>
                </div>
            </div>
        `;
    }
}

customElements.define('my-element', MyElement);
