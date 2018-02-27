const Tag = pocketnode("/nbt/tags/Tag.js");

class EndTag extends Tag {
    constructor(){
        super(0x00);
    }

    setPayload(buffer){
        if(buffer instanceof Array){
            buffer.shift();
            return {payload: null, buffer: buffer};
        }
    }
}

module.exports = EndTag;
