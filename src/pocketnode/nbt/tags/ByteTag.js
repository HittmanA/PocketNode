const Tag = pocketnode("/nbt/tags/Tag.js");

class ByteTag extends Tag {
    constructor(){
        super(0x01);
    }

    getLength(){
        return 1;
    }

    setPayload(buffer){
        if(buffer instanceof Array){
            var intLength = 1;
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

module.exports = ByteTag;
