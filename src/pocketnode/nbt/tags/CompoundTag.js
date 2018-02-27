const Tag = pocketnode("/nbt/tags/Tag.js");

class CompoundTag extends Tag {
    constructor(buffer){
        super(buffer);
        super.setChild();
    }
}

module.exports = CompoundTag;
