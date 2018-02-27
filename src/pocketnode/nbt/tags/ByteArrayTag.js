const Tag = pocketnode("/nbt/tags/Tag.js");

class ByteArrayTag extends Tag {
    constructor(){
        super(0x07);
    }

    setPayload(buffer){
        if(buffer instanceof Array){
            var byteArrayLength = hexToDec(buffer.shift() + buffer.shift() + buffer.shift() + buffer.shift());
            var payload = [];
            console.log("Looping")
            for(var i = 0; i < byteArrayLength; i++){
                payload.push(buffer.shift());
            }
            //this.setPayload(payload);
            console.log("Finished Loop")
            return {payload: payload, buffer: buffer};
        }
    }
}

module.exports = ByteArrayTag;
