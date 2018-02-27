const Tag = pocketnode("/nbt/tags/Tag.js");

class IntArrayTag extends Tag {
    constructor(){
        super(0x0b);
    }
}

module.exports = IntArrayTag;
