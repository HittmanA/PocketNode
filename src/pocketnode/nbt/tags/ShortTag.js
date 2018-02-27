const Tag = pocketnode("/nbt/tags/Tag.js");

class ShortTag extends Tag {
    constructor(){
        super(0x02);
    }

    getLength(){
        return 2;
    }

    setPayload(buffer){
        if(buffer instanceof Array){
            var shortLength = 2;
            console.log(buffer)
            var payload = "";
            for(var i = 0; i < shortLength; i++){
                payload += buffer.shift();
            }
            this.setPayload(payload);
            console.log(payload)
            return {payload: hexToDec(payload), buffer: buffer};
        }
    }
}

module.exports = ShortTag;
