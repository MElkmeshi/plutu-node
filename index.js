"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlutuTlync = exports.PlutuMpgs = exports.PlutuLocalBankCards = exports.PlutuSadad = exports.PlutuAdfali = void 0;
// index.ts
const PlutuAdfali_1 = require("./src/services/PlutuAdfali");
const PlutuSadad_1 = require("./src/services/PlutuSadad");
const PlutuLocalBankCards_1 = require("./src/services/PlutuLocalBankCards");
const PlutuMpgs_1 = require("./src/services/PlutuMpgs");
const PlutuTlync_1 = require("./src/services/PlutuTlync");
// Create instances
const PlutuAdfali = new PlutuAdfali_1.PlutuAdfali();
exports.PlutuAdfali = PlutuAdfali;
const PlutuSadad = new PlutuSadad_1.PlutuSadad();
exports.PlutuSadad = PlutuSadad;
const PlutuLocalBankCards = new PlutuLocalBankCards_1.PlutuLocalBankCards();
exports.PlutuLocalBankCards = PlutuLocalBankCards;
const PlutuMpgs = new PlutuMpgs_1.PlutuMpgs();
exports.PlutuMpgs = PlutuMpgs;
const PlutuTlync = new PlutuTlync_1.PlutuTlync();
exports.PlutuTlync = PlutuTlync;
