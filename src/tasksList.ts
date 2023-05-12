import { LitElement, css, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { tasks } from './datas/tasks';
import { taskHeigth, taskWidthStyle } from './utils';
import { taskListContainer } from './store/tasksListContainer';

@customElement('tasks-list')
export class TasksList extends LitElement {
   @query('.tasks-list')
   taskListContainer!: HTMLElement;

   @state()
   tasks = tasks;

   static styles = css`
      .tasks-list {
         list-style: none;
         padding: 0;
         display: flex;
         gap: 200px;
         border: 2px solid black;
         margin: 0;
      }

      .task {
         width: ${taskWidthStyle};
         height: ${taskHeigth};
         box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
         box-sizing: border-box;
         border-radius: 10px;
         padding: 16px;
         overflow: hidden;
      }

      .task-name {
         font-size: 24px;
         margin: 0;
      }

      .task-description {
         font-size: 13px;
      }
   `;

   firstUpdated() {
      const width = this.taskListContainer.getBoundingClientRect().width;
      const heigth = this.taskListContainer.getBoundingClientRect().height;
      taskListContainer({ heigth, width });
      const x = this.taskListContainer.getBoundingClientRect().x;
      const y = this.taskListContainer.getBoundingClientRect().y;

      console.log(heigth, width, x, y);
   }

   render() {
      return html`
         <ul class="tasks-list">
            ${map(
               this.tasks,
               (task) =>
                  html`<li class="task">
                     <h2 class="task-name">${task.name}</h2>
                     <p class="task-description">${task.description}</p>
                  </li>`
            )}
         </ul>
      `;
   }
}

declare global {
   interface HTMLElementTagNameMap {
      'tasks-list': TasksList;
   }
}
