import { EventEmitter, errorMonitor, prependListener } from "events";
const evtEmitter = new EventEmitter();

const lfn = (data) => console.log("lfn>>", data);
evtEmitter.addListener("evt1", lfn);
evtEmitter.prependListener("prepend>>", (data) => console.log("prepend", data));
evtEmitter.on("evt1", (data) => console.log("evt1--->>>", data));

evtEmitter.on("evt2", (data) => console.log("evt2--->>>", data));

evtEmitter.emit("evt1", "111");
evtEmitter.emit("evt1", "111-2");
evtEmitter.emit("evt2", "222");

evtEmitter.once("evt3", (data) => console.log("evt2--->>>", data));

evtEmitter.emit("evt3", "333-1");
evtEmitter.emit("evt3", "333-2");

evtEmitter.on("error", (err) => console.error("ERR>>", err.message));
evtEmitter.on(errorMonitor, (err) => console.error("ERR>>", err.message));

try {
  evtEmitter.emit("error", new Error("xxx"));
} catch (ErEr) {
  console.log("ErEr---->>", ErEr);
}
