import { Applicaction } from "./app";
import { connectToMongodb } from "./database";

async function main() {
  await connectToMongodb();
  const app = new Applicaction();
  app.start();
}

main()
