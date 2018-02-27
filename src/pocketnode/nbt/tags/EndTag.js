const Tag = pocketnode("/nbt/tags/Tag.js");

class EndTag extends Tag {
    constructor(buffer){
        super(buffer);
        this.setPayload();
        super.setChild();
    }

    setPayload(){
        let buffer = super.getBuffer();
        if(buffer instanceof Array){
            //buffer.shift();
            super.setPayloadContent(buffer);
        }
    }
}

module.exports = EndTag;
