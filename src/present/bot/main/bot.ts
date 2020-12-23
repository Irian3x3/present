import { PresentClient, alreadyMadeOptionsLmao as op, token } from "./core";

const bot = new PresentClient(token, op);

(async () => {
    await bot.init();
})();