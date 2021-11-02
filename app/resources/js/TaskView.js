/* eslint-env browser */

const TASK_VIEW_TEMPLATE_STRING = document.querySelector("#task-template").innerHTML.trim();

/**
 * Diese Klasse verwaltet Darstellung und Interaktion mit den Task-Objekten im UI.
 * Es wird ein Task-Objekt übergeben, welches durch Interaktion mit dem TaskView verändert und aktualisiert wird.
 */
class TaskView {

    constructor(task) {
        this.task = task; // Speichern der Referenz zum Task-Objekt
        this.el = TaskView.createTaskElement(); // Erstellung eines neuen TaskViews zur späteren Darstellung im UI
        this.el.setAttribute("data-id", this.task.id); // Abspeichern der Task-ID für die spätere Referenzierung
        this.statusCheckbox = this.el.querySelector(".task-status-checkbox");
        this.statusCheckbox.checked = this.task.completed;
        this.statusCheckbox.addEventListener("change", this.onCheckboxStatusChanged.bind(
        this)); // Registrierung eines EventListeners für Reaktion auf Änderung des Task-Status
        this.textInput = this.el.querySelector(".task-text-input");
        this.textInput.value = this.task.description;
        this.textInput.addEventListener("input", this.onTextContentChanged.bind(
        this)); // Registrierung eines EventListeners für Reaktion auf Änderung des Task-Textes
        this.textInput.addEventListener("keypress", this.onKeyPressed.bind(this));
        this.textInput.addEventListener("focus", this.onTextFocusChanged.bind(this));
        this.textInput.addEventListener("blur", this.onTextFocusChanged.bind(this));
    }

    getElement() {
        return this.el;
    }

    /**
     * Reaktion auf den Toggle des Status eines Tasks, um diesen zu aktivieren/deaktivieren.
     */
    onCheckboxStatusChanged() {
        this.task.toggleStatus();
        this.el.classList.toggle("finished");
        this.textInput.disabled = !this.textInput.disabled;
    }

    /**
     * Reaktion auf die Änderung des Task-Textes
     */
    onTextContentChanged(event) {
        this.task.setDescription(event.target.value);
    }

    /**
     * Reaktion auf den Abschluss einer Änderung des Task-Textes
     */
    onKeyPressed(event) {
        if (event.key === "Enter") {
            this.textInput.blur();
        }
    }

    /**
     * Reaktion auf die Fokusänderung eines Task-Elements (Selektion eines Elements zur Bearbeitung des Textes)
     */
    onTextFocusChanged() {
        this.el.classList.toggle("edit");
    }

    focus() {
        this.textInput.focus();
        this.textInput.select();
    }

    /**
     * Statische Methode, welche von überall aufgerufen werden kann
     * und HTML-Elemente für ein leeres TaskView-Objekt zurückgibt.
     */
    static createTaskElement() {
        let el = document.createElement("div");
        el.innerHTML = TASK_VIEW_TEMPLATE_STRING;
        return el.firstChild;
    }

}

export default TaskView;