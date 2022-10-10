/**
 * @type {HTMLDivElement}
 */

const root = document.getElementById("root");

const config = {
  rows: 9,
  columns: 9,
  fps: 60,
  showFieldsNumber: true,
};

const MAX_ROW = config.rows * config.columns;
const MAX_COLUMN = config.columns - 1;

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
  handleX(newPosition) {
    if (newPosition > MAX_COLUMN) {
      this.position.x = 0;
      return;
    }
    if (newPosition < 0) {
      this.position.x = MAX_COLUMN;
      return;
    }
    this.position.x = newPosition;
  },
  handleY(newPosition) {
    if (newPosition < 0) {
      this.position.y = MAX_ROW;
      return;
    }
    if (newPosition >= MAX_ROW) {
      this.position.y = 0;
      return;
    }
    this.position.y = newPosition;
  },
  move(arrow) {
    switch (arrow) {
      case ARROW.UP:
        this.handleY(this.position.y - direction.vertical);
        break;
      case ARROW.DOWN:
        this.handleY(this.position.y + direction.vertical);
        break;
      case ARROW.LEFT:
        this.handleX(this.position.x - direction.horizontal);
        break;
      case ARROW.RIGHT:
        this.handleX(this.position.x + direction.horizontal);
        break;
    }
  },
};

const game = (snake) => {
  const area = Array(config.rows * config.columns)
    .fill(undefined)
    .map((_, i) => {
      const { x, y } = snake.position;
      if (x + y === i)
        return `
        <span class="field">
          <span class="snake"></span>
        </span>`;
      return `<span class="field">${config.showFieldsNumber ? i : ""}</span>`;
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
