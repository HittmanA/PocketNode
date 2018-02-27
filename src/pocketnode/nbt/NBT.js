/*
 *   _____           _        _   _   _           _
 *  |  __ \         | |      | | | \ | |         | |
 *  | |__) |__   ___| | _____| |_|  \| | ___   __| | ___
 *  |  ___/ _ \ / __| |/ / _ \ __| . ` |/ _ \ / _` |/ _ \
 *  | |  | (_) | (__|   <  __/ |_| |\  | (_) | (_| |  __/
 *  |_|   \___/ \___|_|\_\___|\__|_| \_|\___/ \__,_|\___|
 *
 *  @author PocketNode Team
 *  @link https://pocketnode.me
*/

class NBT {
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
        var buffer = fs.readFileSync(__dirname+"/bigtest.nbt");
        buffer = zlib.gunzipSync(buffer);
        buffer = buffer.toString('hex');
        buffer = splitString(buffer, 2);
        console.log(buffer)
        console.log(JSON.stringify(this.parseCompound(buffer, {})));
    }

    parseCompound(buffer, parentObj, type = null){
        if(type === null){
            type = buffer.shift();
        }
        if(type != "00"){
            var length = hexToDec(buffer.shift() + buffer.shift());
        }
        for(var t = 0; t < Object.keys(this.tags).length; t ++){
            var forTag = new this.tags[Object.keys(this.tags)[t]];
            if(forTag.getId() === type){
                forTag = null;
                var tag = new this.tags[Object.keys(this.tags)[t]];
                if(!tag.isEnd()){
                    buffer = tag.setName(buffer, length);
                    var name = tag.getName();
                    parentObj[name] = {};
                    console.log(type, length, name, tag.isCompound());
                    var NextType = buffer.shift();
                    if(NextType != "0a"){
                        this.parseTag(buffer, parentObj[name], NextType)
                    } else {
                        this.parseCompound(buffer, parentObj[name]);
                    }
                    return parentObj;
                }
            }
        }
    }

    parseTag(buffer, parentObj, type = null){
        if(type === null){
            type = buffer.shift();
        }
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
                    console.log(type, length, name, tag.isCompound());
                    if(tag.isCompound()){
                        parentObj[name] = {};
                        parentObj[name] = this.parseCompound(buffer, parentObj[name]);
                    } /*else if(tag.isList()) {
                        parentObject = this.parseListTag(buffer, name, parentObject);
                        console.log(buffer)
                        if(buffer.length !== 0){
                            console.log(parentObject)
                            var tag = this.parseTag(buffer, parentObject);
                            console.log(JSON.stringify(tag));
                            parentObject = tag.return;
                        }
                    } */else {
                        console.log(buffer)
                        var postPayload = tag.setPayload(buffer)
                        parentObj[name] = postPayload.payload;
                        buffer = postPayload.buffer;
                        if(buffer.length !== 0){
                            console.log(parentObj)
                            var tag = this.parseTag(buffer, parentObj);
                            console.log(JSON.stringify(tag));
                        }
                    }
                    return parentObj;
                } else {
                    var NextType = buffer.shift();
                    console.log("END", buffer)
                    if(NextType != "0a"){
                        this.parseTag(buffer, parentObj, NextType)
                    } else {
                        this.parseCompound(buffer, parentObj, NextType);
                    }
                    return parentObj;
                }
            }
        }
    }
}

module.exports = NBT;
