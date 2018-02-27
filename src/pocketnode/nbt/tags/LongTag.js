const Tag = pocketnode("/nbt/tags/Tag.js");

class LongTag extends Tag {
    constructor(){
        super(0x04);
    }

    getLength(){
        return 8;
    }

    setPayload(buffer){
        if(buffer instanceof Array){
            var longLength = 8;
            var payload = "";
            for(var i = 0; i < longLength; i++){
                payload += buffer.shift();
            }
            this.setPayload(payload);
            return {payload: hexToDec(payload), buffer: buffer};
        }
    }
}

module.exports = LongTag;
