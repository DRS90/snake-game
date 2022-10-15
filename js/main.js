/**
 * @type {HTMLDivElement}
 */

const root = document.getElementById("root");
const debugContainer = document.getElementById("debugger");

const config = {
  rows: 9,
  columns: 9,
  showFieldsNumber: true,
};

const MAX_ROW = config.rows * config.columns - config.columns;
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
  speed: 5, // fps
  body: 1,
  position: { x: 5, y: 5 },
  moving: null,
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
    if (newPosition > MAX_ROW) {
      this.position.y = 0;
      return;
    }
    this.position.y = newPosition;
  },
  move(arrow) {
    switch (arrow) {
      case ARROW.UP:
        this.moving = ARROW.UP;
        this.handleY(this.position.y - direction.vertical);
        break;
      case ARROW.DOWN:
        this.moving = ARROW.DOWN;
        this.handleY(this.position.y + direction.vertical);
        break;
      case ARROW.LEFT:
        this.moving = ARROW.LEFT;
        this.handleX(this.position.x - direction.horizontal);
        break;
      case ARROW.RIGHT:
        this.moving = ARROW.RIGHT;
        this.handleX(this.position.x + direction.horizontal);
        break;
    }
  },
};

const game = (snake) => {
  debugContainer.innerHTML = JSON.stringify(snake, null, 2);
  const hasBody = ({ headPosition, currentField }) => {
    if (!snake.body) {
      return false;
    }
    const snakeBody = Array(snake.body).fill(undefined);
    let hasBody = false;

    const positionModifier = {
      [ARROW.RIGHT]: 1,
      [ARROW.LEFT]: -1,
      [ARROW.UP]: -config.columns,
      [ARROW.DOWN]: config.columns,
    }[snake.moving];

    snakeBody.forEach((_, bodyPiece) => {
      if (headPosition - (bodyPiece + positionModifier) === currentField) {
        hasBody = true;
      }
    });
    return hasBody;
  };

  const area = Array(config.rows * config.columns)
    .fill(undefined)
    .map((_, currentField) => {
      const headPosition = snake.position.x + snake.position.y;

      if (headPosition === currentField)
        return `
        <span class="field">
          <span class="snake snake_head ${
            snake.moving?.toLowerCase().replace("arrow", "moving ") || ""
          }"></span>
        </span>`;

      if (hasBody({ headPosition, currentField }))
        return `
            <span class="field">
              <span class="snake snake_body"></span>
            </span>
          `;
      const fieldValue = config.showFieldsNumber ? currentField : "";
      return `<span class="field">${fieldValue}</span>`;
    });

  const formatArea = (area) => {
    return area.toString().replaceAll(",", "");
  };
  return formatArea(area);
};

let timer = null;

root.style = `
  display: grid;
  grid-template-columns: repeat(${config.columns}, 32px);
  grid-template-rows: repeat(${config.rows}, 32px);
`;

// render game
root.innerHTML = game(snake);

window.addEventListener("keydown", ({ key }) => {
  if (!timer) {
    // start game
    setInterval(() => {
      root.innerHTML = game(snake);
    }, config.fps * 1);
  }
  if (timer) {
    clearInterval(timer);
  }

  const secToMs = (seconds) => seconds * 1000;

  timer = setInterval(() => snake.move(key), secToMs(1) / snake.speed);
});
