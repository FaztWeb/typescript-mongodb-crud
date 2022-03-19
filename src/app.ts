import express from "express";
import morgan from "morgan";
import { create } from "express-handlebars";
import path from "path";
import { PORT } from "./config";

// Routes
import indexRoutes from "./routes/index.routes";
import tasksRoutes from "./routes/tasks.routes";

export class Applicaction {
  app: express.Application;

  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.app.set("views", path.join(__dirname, "views"));
    this.app.engine(
      ".hbs",
      create({
        layoutsDir: path.join(this.app.get("views"), "layouts"),
        partialsDir: path.join(this.app.get("views"), "partials"),
        defaultLayout: "main",
        extname: ".hbs",
      }).engine
    );
    this.app.set("view engine", ".hbs");
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/", indexRoutes);
    this.app.use("/tasks", tasksRoutes);

    this.app.use(express.static(path.join(__dirname, "public")));
  }

  start(): void {
    this.app.listen(PORT, () => {
      console.log("Server is running at", PORT);
    });
  }
}
