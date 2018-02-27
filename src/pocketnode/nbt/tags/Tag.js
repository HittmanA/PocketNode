class Tag {

    initVars(){
        this.tags = {};
        this.tags.TAG_END = pocketnode("nbt/tags/EndTag");
        this.tags.TAG_BYTE = pocketnode("nbt/tags/ByteTag");
        this.tags.TAG_SHORT = pocketnode("nbt/tags/ShortTag");
        this.tags.TAG_INT = pocketnode("nbt/tags/IntTag");
        this.tags.TAG_LONG = pocketnode("nbt/tags/LongTag");
        this.tags.TAG_FLOAT = pocketnode("nbt/tags/FloatTag");
        this.tags.TAG_DOUBLE = pocketnode("nbt/tags/DoubleTag");
        this.tags.TAG_BYTE_ARRAY = pocketnode("nbt/tags/ByteArrayTag");
        this.tags.TAG_STRING = pocketnode("nbt/tags/StringTag");
        this.tags.TAG_LIST = pocketnode("nbt/tags/ListTag");
        this.tags.TAG_COMPOUND = pocketnode("nbt/tags/CompoundTag");
        this.tags.TAG_INT_ARRAY = pocketnode("nbt/tags/IntArrayTag");
        this.tags.TAG_LONG_ARRAY = pocketnode("nbt/tags/LongArrayTag");
        this.id = null;
        this.name = "";
        this.length = 0;
        this.payload = null;
        this.compound = false;
        this.end = false;
        this.list = false;
        this.buffer = [];
    }

    constructor(buffer){
        this.initVars();
        //console.log(buffer);
        if(buffer instanceof Array){
            this.id = buffer.shift();
        } else {
            this.id = buffer;
        }
        if(this.getId() == "0a"){
            this.compound = true;
        }
        if(this.getId() == "00"){
            this.end = true;
        }
        if(this.getId() == "09"){
            this.list = true;
        }
        this.parseName(buffer);
    }

    /**
     * Returns the Id for this tag.
     * @returns {Number}
     */
    getId(){
        return this.id;
    }

    parseName(buffer){
        if(this.end !== true){
            if(this.list !== true) {
                //console.log(buffer)
                let length = buffer.shift() + buffer.shift();
                length = hexToDec(length);
                this.setLength(length);
                let name = "";
                for (let i = 0; i < this.getLength(); i++) {
                    name += buffer.shift();
                }
                name = hexToASCII(name);
                this.setName(name);
                this.buffer = buffer;
                //this.setChild(buffer);
            } else {
                let length = buffer.shift() + buffer.shift();
                length = hexToDec(length);
                this.setLength(length);
                let name = "";
                for (let i = 0; i < this.getLength(); i++) {
                    name += buffer.shift();
                }
                name = hexToASCII(name);
                this.setName(name);
                this.buffer = buffer;
            }
        } else {
            this.buffer = buffer;
        }
    }

    setName(name){
        this.name = name;
    }

    getName(){
        return this.name;
    }

    setLength(length){
        this.length = length;
    }

    getLength(){
        return this.length;
    }

    getBuffer(){
        return this.buffer;
    }

    setChild(NI = null){
        let payload = this.buffer;
        delete(this.buffer);
        if(NI === null){
            var nextId = payload[0];
        } else {
            var nextId = NI;
        }
        console.log(nextId)
        //console.log(nextId)
        switch(nextId){
            case "00":
                this.child = new this.tags.TAG_END(payload);
                break;
            case "01":
                this.child = new this.tags.TAG_BYTE(payload);
                break;
            case "02":
                this.child = new this.tags.TAG_SHORT(payload);
                break;
            case "03":
                this.child = new this.tags.TAG_INT(payload);
                break;
            case "04":
                this.child = new this.tags.TAG_LONG(payload);
                break;
            case "05":
                this.child = new this.tags.TAG_FLOAT(payload);
                break;
            case "06":
                this.child = new this.tags.TAG_DOUBLE(payload);
                break;
            case "07":
                this.child = new this.tags.TAG_BYTE_ARRAY(payload);
                break;
            case "08":
                this.child = new this.tags.TAG_STRING(payload);
                break;
            case "09":
                this.child = new this.tags.TAG_LIST(payload);
                break;
            case "0a":
                this.child = new this.tags.TAG_COMPOUND(payload);
                break;
            case "0b":
                this.child = new this.tags.TAG_INT_ARRAY(payload);
                break;
            case "0c":
                this.child = new this.tags.TAG_BYTE_ARRAY(payload);
                break;
        }
        //this.payload = this.child.parsePayload(payload);
    }

    setPayloadContent(payload){
        this.payload = payload;
    }

    getPayload(){
        return this.payload;
    }

    isCompound(){
        return this.compound;
    }

    isEnd(){
        return this.end;
    }

    isList(){
        return this.list;
    }
}

module.exports = Tag;
