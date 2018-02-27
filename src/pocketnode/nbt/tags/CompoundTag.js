const Tag = pocketnode("/nbt/tags/Tag.js");

class CompoundTag extends Tag {
    constructor(){
        super(0x0a);
    }
}

module.exports = CompoundTag;
