const Tag = pocketnode("/nbt/tags/Tag.js");

class FloatTag extends Tag {
    constructor(){
        super(0x05);
    }

    getLength(){
        return 4;
    }

    setPayload(buffer){
        if(buffer instanceof Array){
            var floatLength = 4;
            var payload = "";
            for(var i = 0; i < floatLength; i++){
                payload += buffer.shift();
            }
            this.setPayload(payload);
            console.log(buffer)
            return {payload: Buffer(payload, 'hex').readFloatBE(0), buffer: buffer};
        }
    }
}

module.exports = FloatTag;
