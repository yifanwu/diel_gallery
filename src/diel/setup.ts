import Diel from "./Diel";

console.log("setup");

export const diel = new Diel();
(<any>window).diel = diel;