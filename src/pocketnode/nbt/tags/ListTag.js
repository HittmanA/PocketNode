const Tag = pocketnode("/nbt/tags/Tag.js");

class ListTag extends Tag {
    constructor(buffer){
        console.log(buffer);
        super(buffer);
        this.setPayload();
        super.setChild();
    }

    setPayload(){
        let buffer = super.getBuffer();
        if(buffer instanceof Array){
            var type = buffer.shift();
            var length = buffer.shift() + buffer.shift() + buffer.shift() + buffer.shift();
            var payload = "";
            for(var i = 0; i < hexToDec(length); i++){
                payload += buffer.shift();
            }
            super.setChild(type);
        }
    }

    setType(type){
        this.type = type;
    };

    getType(){
        return this.type;
    }
}

module.exports = ListTag;
