/**
 * @type {HTMLDivElement}
 */

const root = document.getElementById("root");

const config = {
  rows: 3,
  columns: 3,
  fps: 60,
};

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
  char: {
    body: "o",
    head: "O",
  },
  body: 1,
  position: { x: 0, y: 0 },
  handleX() {
    if (snake.position.x > 2) {
      snake.position.x = 0;
    }
    if (snake.position.x < 0) {
      snake.position.x = 2;
    }
  },
  handleY() {
    if (snake.position.y < 0) {
      snake.position.y = 6;
    }
    if (snake.position.y > 6) {
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
  },
};

const game = (snake) => {
  const area = Array(config.rows * config.columns)
    .fill(undefined)
    .map((_, i) => `[${i}]`)
    .map((field, i) => {
      const { x, y } = snake.position;
      if (x + 1 * y + 1 === i + 1) return snake.char.head;
      return field;
    });

  const formatArea = (area) => {
    let formattedArea = area.reduce((f, c, i) => {
      if (i !== 0 && i % config.columns === 0) {
        f.push("<br/>");
      }
      f.push(c);
      return f;
    }, []);

    return formattedArea.toString().replaceAll(",", "");
  };
  return formatArea(area);
};

setInterval(() => {
  root.innerHTML = game(snake);
}, config.fps * 1);

window.addEventListener("keydown", ({ key }) => {
  snake.move(key);
});
