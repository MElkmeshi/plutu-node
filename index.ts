// index.ts
import { PlutuAdfali as PlutuAdfaliClass } from "./src/services/PlutuAdfali";
import { PlutuSadad as PlutuSadadClass } from "./src/services/PlutuSadad";
import { PlutuLocalBankCards as PlutuLocalBankCardsClass } from "./src/services/PlutuLocalBankCards";
import { PlutuMpgs as PlutuMpgsClass } from "./src/services/PlutuMpgs";
import { PlutuTlync as PlutuTlyncClass } from "./src/services/PlutuTlync";

// Create instances
const PlutuAdfali = new PlutuAdfaliClass();
const PlutuSadad = new PlutuSadadClass();
const PlutuLocalBankCards = new PlutuLocalBankCardsClass();
const PlutuMpgs = new PlutuMpgsClass();
const PlutuTlync = new PlutuTlyncClass();

export { PlutuAdfali, PlutuSadad, PlutuLocalBankCards, PlutuMpgs, PlutuTlync };
