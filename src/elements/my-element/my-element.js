import {html} from 'lit';
import AbstractElement from '../AbstractElement';

class MyElement extends AbstractElement {
    constructor() {
        super();
        this.version = 'STARTING';
    }

    render() {
        return html`
            <p>Welcome to the Lit tutorial!</p>
            <p>This is the ${this.version} code.</p>
        `;
    }
}

MyElement.properties = {
    version: {},
};

customElements.define('my-element', MyElement);
