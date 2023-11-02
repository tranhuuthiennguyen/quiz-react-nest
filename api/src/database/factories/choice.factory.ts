import { setSeederFactory } from "typeorm-extension";
import { Choice } from "../entities/choice.entity";

export default setSeederFactory(Choice, (faker) => {
  const choice = new Choice()
  choice.text = faker.lorem.sentence()
  choice.is_correct = false

  return choice
})