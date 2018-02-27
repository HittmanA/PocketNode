const Tag = pocketnode("/nbt/tags/Tag.js");

class ShortTag extends Tag {
    constructor(buffer){
        super(buffer);
        this.setPayload();
        super.setChild();
    }

    setPayload(){
        let buffer = super.getBuffer();
        if(buffer instanceof Array){
            var shortLength = 2;
            var payload = "";
            for(var i = 0; i < shortLength; i++){
                payload += buffer.shift();
            }
            super.setPayloadContent(payload);
        }
    }
}

module.exports = ShortTag;
