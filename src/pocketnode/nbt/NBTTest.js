class NBTTest {
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
        this.returnNBT = {};
    }

    constructor() {
        var zlib = require('zlib');
        this.initVars();
        var parsedObject = {};
        //console.log(decToHex(this.tags.TAG_STRING.getId()));
        var fs = require("fs");
        var buffer = fs.readFileSync(__dirname+"/hello_world.nbt");
        //buffer = zlib.gunzipSync(buffer);
        buffer = buffer.toString('hex');
        buffer = splitString(buffer, 2);
        //console.log(buffer)
        console.log(JSON.stringify(this.parseTag(buffer, {})));
        //console.log(JSON.stringify(squashObject(this.returnNBT), false, 4));
        /*for(var z = 0; z < buffer.length; z++){
            var type = buffer.shift();
            var length = hexToDec(buffer.shift() + buffer.shift());
            for(var t = 0; t < Object.keys(this.tags).length; t ++){
                var forTag = new this.tags[Object.keys(this.tags)[t]];
                if(forTag.getId() === type){
                    forTag = null;
                    var tag = new this.tags[Object.keys(this.tags)[t]];
                    buffer = tag.setName(buffer, length);
                    var name = tag.getName();
                    console.log(type, decToHex(length), name, tag.isCompound())
                    console.log(buffer)
                    if(tag.isCompound()){
                        var encapsulatedData = "";
                        for(var e = 0; e < buffer.length; e++){
                            if(buffer[e] != 0x00){
                                encapsulatedData += buffer.splice(e, 1);
                                e--
                            } else {
                                buffer.shift()
                            }
                        }
                        console.log(encapsulatedData)
                    }
                    parsedObject[tag.getName()] = {
                        type: type,
                    }
                }
            }
        }*/
    }

    parseTag(buffer, parentObject, inCompound = false){
        var type = buffer.shift();
        if(type != "00"){
            var length = hexToDec(buffer.shift() + buffer.shift());
        }
        for(var t = 0; t < Object.keys(this.tags).length; t ++){
            var forTag = new this.tags[Object.keys(this.tags)[t]];
            if(forTag.getId() === type){
                forTag = null;
                var tag = new this.tags[Object.keys(this.tags)[t]];
                if(!tag.isEnd()){
                    //console.log(buffer, length)
                    buffer = tag.setName(buffer, length);
                    var name = tag.getName();
                    console.log(type, length, name, tag.isCompound())
                    //console.log(buffer)
                    if(tag.isCompound()){
                        parentObject = this.parseCompoundTag(buffer, name, parentObject);
                    } else if(tag.isList()) {
                        parentObject = this.parseListTag(buffer, name, parentObject);
                        console.log(buffer)
                        if(buffer.length !== 0){
                            console.log(parentObject)
                            var tag = this.parseTag(buffer, parentObject);
                            console.log(JSON.stringify(tag));
                            parentObject = tag.return;
                        }
                    } else {
                        console.log(buffer)
                        var postPayload = tag.setPayload(buffer)
                        parentObject[name] = postPayload.payload;
                        buffer = postPayload.buffer;
                        if(buffer.length !== 0){
                            console.log(parentObject)
                            var tag = this.parseTag(buffer, parentObject);
                            console.log(JSON.stringify(tag));
                            parentObject = tag.return;
                        }
                    }
                } else {
                    console.log(type, "END")
                    console.log(buffer)
                    //var postPayload = tag.setPayload(buffer)
                    ////ReturnObject[hexToAscii(name)] = postPayload.payload;
                    //buffer = postPayload.buffer;
                    if(buffer.length != 0){
                        var tag = this.parseTag(buffer, parentObject);
                        console.log(JSON.stringify(tag));
                        //ReturnObject[hexToAscii(tag.name)] = tag.return;
                    }
                }
            }
        }
        console.log(parentObject)
        return {parent: parentObject, name: name};
    }

    parseCompoundTag(buffer, name, parentObject){
        if(name !== null) {
            name = hexToAscii(name);
            name = name.replace(/\s+/g, '-');
            console.log(name)
            name = AsciiToHex(name);
            parentObject[name] = {};
            console.log(parentObject[name])
            console.log("Compound recieved", buffer)
            if(buffer[0] != "0a"){
                console.log(parentObject)
                var ret = this.parseTag(buffer, parentObject[name], true);
                parentObject = ret.parent;
            } else {
                var type = buffer.shift();
                var length = hexToDec(buffer.shift() + buffer.shift());
                for(var t = 0; t < Object.keys(this.tags).length; t ++){
                    var forTag = new this.tags[Object.keys(this.tags)[t]];
                    if(forTag.getId() === type){
                        forTag = null;
                        var tag = new this.tags[Object.keys(this.tags)[t]];
                        buffer = tag.setName(buffer, length);
                        var tagName = tag.getName();
                        console.log(type, length, tagName, tag.isCompound())
                        parentObject = this.parseCompoundTag(buffer, tagName, parentObject[name]);
                    }
                }
            }
        } else {
            parentObject = [];
            console.log(buffer)
            if(buffer[0] != "0a"){
                console.log(parentObject)
                var ret = this.parseTag(buffer, parentObject[name], true);
                parentObject.unshift(ret.parent);
            } else {
                var type = buffer.shift();
                var length = hexToDec(buffer.shift() + buffer.shift());
                for(var t = 0; t < Object.keys(this.tags).length; t ++){
                    var forTag = new this.tags[Object.keys(this.tags)[t]];
                    if(forTag.getId() === type){
                        forTag = null;
                        var tag = new this.tags[Object.keys(this.tags)[t]];
                        buffer = tag.setName(buffer, length);
                        var tagName = tag.getName();
                        console.log(type, length, tagName, tag.isCompound())
                        parentObject.unshift(this.parseCompoundTag(buffer, tagName, parentObject[name]));
                    }
                }
            }
        }
        return parentObject;
    }

    parseListTag(buffer, name, parentObject){
        parentObject[name] = []
        var returnList = [];
        console.log("List recieved", buffer)
        var type = buffer.shift();
        var length = hexToDec(buffer.shift() + buffer.shift() + buffer.shift() + buffer.shift());
        var listBuffer = [];
        for(var t = 0; t < Object.keys(this.tags).length; t ++){
            var forTag = new this.tags[Object.keys(this.tags)[t]];
            if(forTag.getId() === type){
                forTag = null;
                var tag = new this.tags[Object.keys(this.tags)[t]];
                for(var i = 0; i < length; i++){
                    var arrayPush = ""
                    for(var a = 0; a < tag.getLength(); a ++){
                        arrayPush += buffer.shift()
                    }
                    listBuffer.push(/*type + */arrayPush);
                }
                console.log(type, length, listBuffer);
                console.log(listBuffer)
                for(var d = 0; d < listBuffer.length; d++){
                    if(tag.isCompound()){
                        listBuffer[d] = splitString(listBuffer[d], 2);
                        this.parseCompoundTag(listBuffer, null, parentObject[name]);
                    } else if(tag.isList()) {
                        this.parseListTag(buffer, null);
                    } else {
                        console.log(listBuffer[d])
                        listBuffer[d] = splitString(listBuffer[d], 2);
                        var postPayload = tag.setPayload(listBuffer[d]);
                        buffer = postPayload.buffer;
                    }
                    var payload = {};
                    payload[type] = postPayload.payload;
                    returnList.push(payload);
                }
                parentObject[name] = returnList
                return parentObject;
            }
        }
    }
}

module.exports = NBTTest;
