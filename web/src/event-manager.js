/**
 * Created by lucas on 16/05/16.
 */
export default class EventManager {
    constructor() {
        this.listeners = [];
    }
    addListener(fn) {
        return this.listeners.push(fn) - 1;
    }
    removeListener(idx) {
        this.listeners.splice(idx);
    }
    notify(payload) {
        this.listeners.forEach(fn => fn(payload));
    }
}