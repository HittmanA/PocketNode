const Tag = pocketnode("/nbt/tags/Tag.js");

class LongTag extends Tag {
    constructor(buffer){
        super(buffer);
        this.setPayload();
        super.setChild();
    }

    setPayload(){
        let buffer = super.getBuffer();
        if(buffer instanceof Array){
            var longLength = 8;
            var payload = "";
            for(var i = 0; i < longLength; i++){
                payload += buffer.shift();
            }
            super.setPayloadContent(payload);
        }
    }
}

module.exports = LongTag;
