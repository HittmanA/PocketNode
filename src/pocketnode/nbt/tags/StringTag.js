const Tag = pocketnode("/nbt/tags/Tag.js");

class StringTag extends Tag {
    constructor(buffer){
        super(buffer);
        this.setPayload();
        super.setChild();
    }

    setPayload(){
        let buffer = super.getBuffer();
        if(buffer instanceof Array){
            var stringLength = hexToDec(buffer.shift() + buffer.shift());
            var payload = "";
            for(var i = 0; i < stringLength; i++){
                payload += buffer.shift();
            }
            //this.setPayload(payload);
            super.setPayloadContent(hexToASCII(payload));
        }
    }
}

module.exports = StringTag;
