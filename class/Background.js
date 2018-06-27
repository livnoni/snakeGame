class Background{
    constructor(src){
        this.ground = new Image();
        this.ground.src = src;
    }
    get pic(){
        return this.ground;
    }
}