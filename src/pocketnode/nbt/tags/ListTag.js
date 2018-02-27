const Tag = pocketnode("/nbt/tags/Tag.js");

class ListTag extends Tag {
    constructor(){
        super(0x09);
    }

    setType(type){
        this.type = type;
    };

    getType(){
        return this.type;
    }
}

module.exports = ListTag;
