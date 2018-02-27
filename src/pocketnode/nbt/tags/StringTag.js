const Tag = pocketnode("/nbt/tags/Tag.js");

class StringTag extends Tag {
    constructor(){
        super(0x08);
    }

    setPayload(buffer){
        if(buffer instanceof Array){
            var stringLength = hexToDec(buffer.shift() + buffer.shift());
            var payload = "";
            for(var i = 0; i < stringLength; i++){
                payload += buffer.shift();
            }
            this.setPayload(payload);
            console.log(payload)
            return {payload: hexToAscii(payload), buffer: buffer};
        }
    }
}

module.exports = StringTag;
