const Tag = pocketnode("/nbt/tags/Tag.js");

class IntTag extends Tag {
    constructor(){
        super(0x03);
    }

    getLength(){
        return 4;
    }

    setPayload(buffer){
        if(buffer instanceof Array){
            var intLength = 4;
            console.log(buffer)
            var payload = "";
            for(var i = 0; i < intLength; i++){
                payload += buffer.shift();
            }
            this.setPayload(payload);
            console.log(payload)
            return {payload: hexToDec(payload), buffer: buffer};
        }
    }
}

module.exports = IntTag;
