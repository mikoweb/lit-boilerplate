/**
 * @param {CSSResult} styles
 * @param {string} id
 */
export default (styles, id) => {
    const template = document.createElement('template');
    template.setAttribute('id', id);
    template.innerHTML = `<style>${styles.toString()}</style>`;
    document.head.appendChild(template);
}
