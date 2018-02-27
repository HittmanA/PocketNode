class Tag {

    initVars(){
        this.id = null;
        this.name = "";
        this.length = 0;
        this.payload = null;
        this.compound = false;
        this.end = false;
        this.list = false;
    }

    constructor(id){
        this.initVars();
        this.id = id;
        if(this.getId() == "0a"){
            this.compound = true;
        }
        if(this.getId() == "00"){
            this.end = true;
        }
        if(this.getId() == "09"){
            this.list = true;
        }
    }

    /**
     * Returns the Id for this tag.
     * @returns {Number}
     */
    getId(){
        return decToHex(this.id);
    }

    setName(buffer, length){
        var name = buffer.shift();
        length--;
        for(var i = 0; i < length; i++){
            name += buffer.shift();
        }
        this.name = hexToAscii(name);
        return buffer;
    }

    getName(){
        return this.name;
    }

    setLength(length){
        this.length = length;
    }

    getLength(){
        return this.length;
    }

    setPayload(payload){

    }

    getPayload(){
        return this.payload;
    }

    isCompound(){
        return this.compound;
    }

    isEnd(){
        return this.end;
    }

    isList(){
        return this.list;
    }
}

module.exports = Tag;
