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

class NBTParser {
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
        //buffer = splitString(buffer, 2);
        var tree = this.parse(buffer);
        console.log(JSON.stringify(tree));
        //console.log(JSON.stringify(this.parseCompound(buffer, {})));
    }

    parse(buffer) {
        var bufferArray = [];
        for (var i = 0, charsLength = buffer.length; i < charsLength; i += 2) {
            bufferArray.push(buffer.substring(i, i + 2));
        }
        var tree = new this.tags.TAG_COMPOUND(bufferArray);
        return tree;
    }

}

module.exports = NBTParser;
