class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.states = config.states;
        this.curState = config.initial;
        this.prevState = [];
        this.nextState = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.curState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        for(var key in this.states) {
            if(state == key) {
                this.prevState.push(this.curState);
                this.nextState = [];
                this.curState = key;
                return this;
            }
        }
        throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var transition = this.states[this.curState ].transitions;
        if(event in transition) {
            this.prevState.push(this.curState);
            this.nextState =[];
            this.curState = transition[event];
        }
            
        else 
            throw new Error()
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.prevState = [];
        this.curState = 'normal';
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var arr = [];
        if(event == undefined) {
            for(var key in this.states){
               arr.push(key);
            }
        } else {
            for(var key in this.states){
                if(event in this.states[key].transitions) {
                    arr.push(key);
                }
            }
        }
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.prevState.length == 0) return false;

        this.nextState.push(this.curState);
        var prev = this.prevState.pop();

        this.curState = prev;
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.nextState.length == 0) return false;
        var next = this.nextState.pop();
        this.prevState.push(this.curState);

        this.curState = next;
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.prevState = [];
        this.nextState = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
