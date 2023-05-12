import { LitElement, css, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { drawPoints } from './utils';
import { taskListContainer } from './store/tasksListContainer';

@customElement('my-canvas')
export class Canvas extends LitElement {
   @query('#canvas')
   canvas!: HTMLCanvasElement;

   @state()
   canvasDimension;

   static styles = css`
      #canvas {
         border: 2px solid red;
      }
   `;

   connectedCallback() {
      super.connectedCallback();
      this.canvasDimension = taskListContainer;
   }

   // move this in updated
   firstUpdated() {
      const context = this.canvas.getContext('2d');
      const canvasXPosition = this.canvas.getBoundingClientRect().x;
      const canvasYPosition = this.canvas.getBoundingClientRect().y;

      console.log(this.canvasDimension().height);

      let start = {
         x: 0,
         y: this.canvasDimension().height,
      };
      let cp1 = {
         x: 300,
         y: 150,
      };
      let cp2 = { x: 0, y: 0 };

      this.canvas.addEventListener('mousemove', (e) => {
         const cursorInCanvasX = e.clientX - canvasXPosition;
         const cursorInCanvasY = e.clientY - canvasYPosition;

         context.clearRect(
            0,
            0,
            this.canvasDimension().width,
            this.canvasDimension().height
         );

         drawPoints(
            context,
            start.x,
            start.y,
            cursorInCanvasX,
            cursorInCanvasY
         );

         context.beginPath();
         context.moveTo(start.x, start.y);
         context?.bezierCurveTo(
            cursorInCanvasX,
            cp1.y,
            cp2.x,
            cursorInCanvasY,
            cursorInCanvasX,
            cursorInCanvasY
         );
         context.stroke();
      });
   }

   updated() {
      console.log(this.canvasDimension().height);
      const context = this.canvas.getContext('2d');
      let start = {
         x: 0,
         y: this.canvasDimension().height,
      };
      let cp1 = {
         x: 300,
         y: 150,
      };
      let cp2 = { x: 0, y: 0 };
      let end = {
         x: 300,
         y: 0,
      };

      drawPoints(context, start.x, start.y, end.x, end.y);

      context.beginPath();
      context.moveTo(start.x, start.y);
      context.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
      context.stroke();
   }

   render() {
      return html`
         <canvas
            id="canvas"
            width=${this.canvasDimension().width}
            height=${this.canvasDimension().height}
         ></canvas>
      `;
   }
}

declare global {
   interface HTMLElementTagNameMap {
      'my-canvas': Canvas;
   }
}
