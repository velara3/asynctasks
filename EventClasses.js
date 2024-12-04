export class EventDispatcher {
    addEventListener(type, listener, useCapture, scope) {
    }
    removeEventListener(type, listener, useCapture) {
    }
    removeAllEventListener(type) {
    }
    dispatchEvent(event) {
        return true;
    }
}
export class Event {
    type;
    target;
    currentTarget;
    constructor(type, bubbling, cancelable) {
        this.type = type;
    }
    clone() {
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRDbGFzc2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRXZlbnRDbGFzc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sT0FBTyxlQUFlO0lBRXhCLGdCQUFnQixDQUFDLElBQVksRUFBRSxRQUFhLEVBQUUsVUFBb0IsRUFBRSxLQUFXO0lBRS9FLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxJQUFZLEVBQUUsUUFBYSxFQUFFLFVBQW9CO0lBRXJFLENBQUM7SUFDRCxzQkFBc0IsQ0FBQyxJQUFhO0lBRXBDLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBWTtRQUN0QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUFFRCxNQUFNLE9BQU8sS0FBSztJQUVQLElBQUksQ0FBUztJQUViLE1BQU0sQ0FBTTtJQUNaLGFBQWEsQ0FBTTtJQUUxQixZQUFZLElBQVksRUFBRSxRQUFrQixFQUFFLFVBQW9CO1FBQzlELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxLQUFLO0lBRUwsQ0FBQztDQUNKIn0=