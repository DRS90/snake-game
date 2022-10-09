/**
 * @type {HTMLDivElement}
 */

const root = document.getElementById("root");

const config = {
  rows: 3,
  columns: 5,
  fps: 60,
  showFieldsNumber: true,
};

const MAX_ROW = config.rows * config.columns;
const MAX_COLUM = config.columns - 1;

const direction = {
  vertical: config.columns,
  horizontal: 1,
};

const ARROW = {
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
};

const snake = {
  speed: 6,
  body: 1,
  position: { x: 0, y: 0 },
  handleX() {
    if (snake.position.x > MAX_COLUM) {
      snake.position.x = 0;
    }
    if (snake.position.x < 0) {
      snake.position.x = MAX_COLUM;
    }
  },
  handleY() {
    if (snake.position.y < 1) {
      console.log(MAX_ROW);
      snake.position.y = MAX_ROW;
    }
    if (snake.position.y > MAX_ROW) {
      snake.position.y = 0;
    }
  },
  move(arrow) {
    switch (arrow) {
      case ARROW.UP:
        snake.position.y -= direction.vertical;
        this.handleY();
        break;
      case ARROW.DOWN:
        snake.position.y += direction.vertical;
        this.handleY();
        break;
      case ARROW.LEFT:
        snake.position.x -= direction.horizontal;
        this.handleX();
        break;
      case ARROW.RIGHT:
        snake.position.x += direction.horizontal;
        this.handleX();
        break;
    }
    console.log(snake.position);
  },
};

const game = (snake) => {
  const area = Array(config.rows * config.columns)
    .fill(undefined)
    .map(
      (_, i) => `<span class="field">${config.showFieldsNumber ? i : ""}</span>`
    )
    .map((field, i) => {
      const { x, y } = snake.position;
      if (x + 1 * y + 1 === i + 1)
        return `
        <span class="field">
          <span class="snake"></span>
        </span>`;
      return field;
    });

  const formatArea = (area) => {
    return area.toString().replaceAll(",", "");
  };
  return formatArea(area);
};

setInterval(() => {
  root.innerHTML = game(snake);
}, config.fps * 1);
let timer = null;
root.styles = {
  display: "grid",
  gridTemplateColumns: `repeat(${config.columns}, 32px)`,
};
root.style = `
  display: grid;
  grid-template-columns: repeat(${config.columns}, 32px);
  grid-template-rows: repeat(${config.rows}, 32px);
`;
window.addEventListener("keydown", ({ key }) => {
  if (timer) {
    clearInterval(timer);
  }

  timer = setInterval(() => snake.move(key), config.fps * snake.speed);
});
