class Observer{
    constructor(){
        this.events = [];
    }

    notify(event){
        this.events.push(event);
    }

    deleteAllEvents(){
        this.events = [];
    }

    encode(){
        var encode = btoa(JSON.stringify(this.events));
        this.deleteAllEvents();
        return encode;
    }
}

class Event{
    constructor(name, score){
        this.name = name;
        this.score = score;
        this.time = new Date().getTime();
    }
}