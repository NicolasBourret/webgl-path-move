import { css } from 'lit';

export const drawPoints = (context, startX, startY, endX, endY) => {
   context.fillStyle = 'blue';
   context.beginPath();
   context.arc(startX, startY, 5, 0, 2 * Math.PI);
   context.arc(endX, endY, 5, 0, 2 * Math.PI);
   context.fill();
};

export const taskWidth = 400;
export const taskWidthStyle = css`
   ${taskWidth}px
`;
export const taskHeigth = 120;
export const taskHeigthStyle = css`
   ${taskHeigth}px
`;
