const Tag = pocketnode("/nbt/tags/Tag.js");

class DoubleTag extends Tag {
    constructor(){
        super(0x06);
    }

    getLength(){
        return 8;
    }

    setPayload(buffer){
        if(buffer instanceof Array){
            var floatLength = 8;
            var payload = "";
            for(var i = 0; i < floatLength; i++){
                payload += buffer.shift();
            }
            this.setPayload(payload);
            console.log(buffer)
            return {payload: Buffer(payload, 'hex').readDoubleBE(0), buffer: buffer};
        }
    }
}

module.exports = DoubleTag;
