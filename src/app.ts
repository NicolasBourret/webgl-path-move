import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { taskListContainer } from './store/tasksListContainer';

const taskWidth = 400;
const taskWidthStyle = css`
   ${taskWidth}px
`;

@customElement('my-app')
export class MyApp extends LitElement {
   render() {
      console.log(taskListContainer());
      return html`
         <tasks-list .taskWidth=${taskWidthStyle}></tasks-list>
         <my-canvas></my-canvas>
      `;
   }
}

declare global {
   interface HTMLElementTagNameMap {
      'my-app': MyApp;
   }
}
