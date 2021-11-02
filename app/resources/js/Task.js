/* eslint-env browser */

/**
 * Achtung: Javascript kennt das Schlüsselwort class. Es kann verwendet werden, um auf eine einfache Art und Weise
 * Objekt-Prototypen zu definieren. Die Konstrukte haben nur wenig mit dem gemeinsam, was Sie aus Java als Klasse kennen.
 * Vgl. Classes [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes]
 * Vgl. "Introducing JavaScript objects" [https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects]
 */

const DEFAULT_TASK_TEXT = "New Task";

class Task {

    /**
     * Constructor function, wird aufgerufen, wenn mittels "new Task()" ein neues Task-Objekt erstellt wird. Für möglicherweise
     * nicht übergebene Parameter werden Default-Werte definiert.
     */
    constructor(description = DEFAULT_TASK_TEXT, id = Date.now().toString(),
        completed = false) {
        /**
         * Das this-Schlüsselwort verweist in Javascript immer auf den Kontext, in dem eine Funktion ausgeführt wird und
         * unterscheidet sich grundlegend von dem bekannten "this" aus Java, das auf eine Instanz verweist. In diesem Fall, 
         * verweist this auf ein neues, leeres Objekt, für das die definierte constructor function aufgerufen wurde.
         *
         * Eigenschaften können in Javascript jederzeit zu Objekten hinzugefügt werden
         */
        this.description = description;
        this.id = id;
        this.completed = completed;
    }

    /** 
     * Funktionen und Eigenschaften von Objekten sind in Javascript grundsätzlich "öffentlich", 
     * Zugriffsmodifikatoren existieren ebenso wenig wie Rückgabe- oder Parametertypen.
     */
    setDescription(description) {
        this.description = description;
    }

    toggleStatus() {
        this.completed = !this.completed;
        return this.completed;
    }

}

export default Task;