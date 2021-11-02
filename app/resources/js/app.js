/*eslint-env browser */

/**
 * Die notwendigen Klassen (Achtung, der "Klassen-Begriff" ist in Javascript
 * mit Vorsicht zu genießen) werden aus den separaten Dateien importiert um in
 * diesem Modul verwendet zu werden.
 */
import Task from "./Task.js";
import TaskView from "./TaskView.js";

/** 
 * Map [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map]
 * zum Speichern der einzelnen Task. Später wird die ID der Tasks als Schlüssel verwendet.
 *
 * Variablen werden in Javascript dynamsich typsiert!
 */
var taskMap = new Map(),
    /**
     * Referenziert das HTML-Element (<ul>), in dem die einzelnen Aufgaben als Listenelemente
     * (<li>) angezeigt werden.
     */
    taskListEl;

/**
 * Initalisiert die Anwendung:
 * - Selektion der notwendigen UI-Elemente aus dem DOM
 * - Registrieren von Listener auf die Interaktionsereignisse, die der Nutzer im UI auslösen kann
 *
 * Vgl: Programmatische Repräsentation und Verwendung von Views in Android
 */
function init() {
    /**
     * Die Variable document beeinhaltet ein Javascript-Objekt, das den DOM repräsentiert
     * Die Methode querySelector erlaubt die Selektion von Elementen anhand der bekannten CSS-Selektoren
     */
    let addTaskButton = document.querySelector(".button.new-task"),
        clearListButton = document.querySelector(".button.clear-list");
    taskListEl = document.querySelector(".task-list");
    /** 
     * Die addEventListener-Methode erlaubt das Zuweisen einer Callback-Methode zu einem Ereignis:
     * Wird im Observable (hier: addTaskButton) der Event "click" asugelöst (Mausklick auf das Element), wird
     * die registrierte Callback-Methode (hier: addTask) aufgerufen.
     */
    addTaskButton.addEventListener("click", addTask);
    clearListButton.addEventListener("click", clearList);
}

/**
 * Erstellt einen neuen Task sowie einen dazugehörigen View für dessen UI-Repräsentation.
 * Anschließend wird der TaskView ins DOM eingegliedert und im UI angezeigt.
 */
function addTask() {
    let newTask = new Task(),
        taskView = new TaskView(newTask);
    taskMap.set(newTask.id, newTask);
    /**
     * Die appendChild Methode fügt ein neues Element in den DOM ein 
     * (als Kindelement des angegebenen "parent", hier: taskListEl)
     */
    taskListEl.appendChild(taskView.getElement());
    taskView.focus();
}

/**
 * Selektiert und entfernt alle bereits erledigten Aufgaben
 */
function clearList() {
    for (let task of taskMap.values()) {
        if (task.completed === true) {
            taskMap.delete(task.id);
            taskListEl.querySelector("[data-id=\"" + task.id + "\"]").remove();
        }
    }
}

// Aufruf der init-Funktion, nachdem die Datei vollständig eingelesen und interpretiert wurde
init();