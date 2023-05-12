import { LitElement, css, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { drawPoints } from './utils';
import { taskListContainer } from './store/tasksListContainer';

@customElement('my-canvas')
export class Canvas extends LitElement {
   @query('#canvas')
   canvas!: HTMLCanvasElement;

   @state()
   canvasDimension = {
      width: 0,
      heigth: 0,
   };

   @state()
   taskListContainer;

   static styles = css`
      #canvas {
         border: 2px solid red;
      }
   `;

   connectedCallback() {
      super.connectedCallback();
      this.taskListContainer = taskListContainer;
   }

   firstUpdated() {
      const context = this.canvas.getContext('2d');
      this.canvasDimension = {
         width: 300,
         heigth: 150,
      };
      const canvasXPosition = this.canvas.getBoundingClientRect().x;
      const canvasYPosition = this.canvas.getBoundingClientRect().y;

      let start = {
         x: 0,
         y: 150,
      };
      let cp1 = {
         x: 300,
         y: 150,
      };
      let cp2 = { x: 0, y: 0 };

      this.canvas.addEventListener('mousemove', (e) => {
         const cursorInCanvasX = e.clientX - canvasXPosition;
         const cursorInCanvasY = e.clientY - canvasYPosition;
         console.log(cursorInCanvasX, cursorInCanvasY);

         context.clearRect(0, 0, this.canvas.width, this.canvas.height);

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
      const context = this.canvas.getContext('2d');
      let start = {
         x: 0,
         y: 150,
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
      console.log(this.taskListContainer());
      return html`
         <canvas
            id="canvas"
            width=${this.canvasDimension.width + 10}
            height=${this.canvasDimension.heigth + 10}
         ></canvas>
      `;
   }
}

declare global {
   interface HTMLElementTagNameMap {
      'my-canvas': Canvas;
   }
}
