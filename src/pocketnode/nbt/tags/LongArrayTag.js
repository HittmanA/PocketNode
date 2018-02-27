const Tag = pocketnode("/nbt/tags/Tag.js");

class LongArrayTag extends Tag {
    constructor(){
        super(0x0c);
    }
}

module.exports = LongArrayTag;
