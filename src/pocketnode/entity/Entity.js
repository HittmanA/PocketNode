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

class Entity {

    public const MOTION_THRESHOLD = 0.00001;

	public const NETWORK_ID = -1;

	public const DATA_TYPE_BYTE = 0;
	public const DATA_TYPE_SHORT = 1;
	public const DATA_TYPE_INT = 2;
	public const DATA_TYPE_FLOAT = 3;
	public const DATA_TYPE_STRING = 4;
	public const DATA_TYPE_SLOT = 5;
	public const DATA_TYPE_POS = 6;
	public const DATA_TYPE_LONG = 7;
	public const DATA_TYPE_VECTOR3F = 8;

	public const DATA_FLAGS = 0;
	public const DATA_HEALTH = 1; //int (minecart/boat)
	public const DATA_VARIANT = 2; //int
	public const DATA_COLOR = 3, DATA_COLOUR = 3; //byte
	public const DATA_NAMETAG = 4; //string
	public const DATA_OWNER_EID = 5; //long
	public const DATA_TARGET_EID = 6; //long
	public const DATA_AIR = 7; //short
	public const DATA_POTION_COLOR = 8; //int (ARGB!)
	public const DATA_POTION_AMBIENT = 9; //byte
	/* 10 (byte) */
	public const DATA_HURT_TIME = 11; //int (minecart/boat)
	public const DATA_HURT_DIRECTION = 12; //int (minecart/boat)
	public const DATA_PADDLE_TIME_LEFT = 13; //float
	public const DATA_PADDLE_TIME_RIGHT = 14; //float
	public const DATA_EXPERIENCE_VALUE = 15; //int (xp orb)
	public const DATA_MINECART_DISPLAY_BLOCK = 16; //int (id | (data << 16))
	public const DATA_MINECART_DISPLAY_OFFSET = 17; //int
	public const DATA_MINECART_HAS_DISPLAY = 18; //byte (must be 1 for minecart to show block inside)

	//TODO: add more properties

	public const DATA_ENDERMAN_HELD_ITEM_ID = 23; //short
	public const DATA_ENDERMAN_HELD_ITEM_DAMAGE = 24; //short
	public const DATA_ENTITY_AGE = 25; //short

	/* 27 (byte) player-specific flags
	 * 28 (int) player "index"?
	 * 29 (block coords) bed position */
	public const DATA_FIREBALL_POWER_X = 30; //float
	public const DATA_FIREBALL_POWER_Y = 31;
	public const DATA_FIREBALL_POWER_Z = 32;
	/* 33 (unknown)
	 * 34 (float) fishing bobber
	 * 35 (float) fishing bobber
	 * 36 (float) fishing bobber */
	public const DATA_POTION_AUX_VALUE = 37; //short
	public const DATA_LEAD_HOLDER_EID = 38; //long
	public const DATA_SCALE = 39; //float
	public const DATA_INTERACTIVE_TAG = 40; //string (button text)
	public const DATA_NPC_SKIN_ID = 41; //string
	public const DATA_URL_TAG = 42; //string
	public const DATA_MAX_AIR = 43; //short
	public const DATA_MARK_VARIANT = 44; //int
	/* 45 (byte) container stuff
	 * 46 (int) container stuff
	 * 47 (int) container stuff */
	public const DATA_BLOCK_TARGET = 48; //block coords (ender crystal)
	public const DATA_WITHER_INVULNERABLE_TICKS = 49; //int
	public const DATA_WITHER_TARGET_1 = 50; //long
	public const DATA_WITHER_TARGET_2 = 51; //long
	public const DATA_WITHER_TARGET_3 = 52; //long
	/* 53 (short) */
	public const DATA_BOUNDING_BOX_WIDTH = 54; //float
	public const DATA_BOUNDING_BOX_HEIGHT = 55; //float
	public const DATA_FUSE_LENGTH = 56; //int
	public const DATA_RIDER_SEAT_POSITION = 57; //vector3f
	public const DATA_RIDER_ROTATION_LOCKED = 58; //byte
	public const DATA_RIDER_MAX_ROTATION = 59; //float
	public const DATA_RIDER_MIN_ROTATION = 60; //float
	public const DATA_AREA_EFFECT_CLOUD_RADIUS = 61; //float
	public const DATA_AREA_EFFECT_CLOUD_WAITING = 62; //int
	public const DATA_AREA_EFFECT_CLOUD_PARTICLE_ID = 63; //int
	/* 64 (int) shulker-related */
	public const DATA_SHULKER_ATTACH_FACE = 65; //byte
	/* 66 (short) shulker-related */
	public const DATA_SHULKER_ATTACH_POS = 67; //block coords
	public const DATA_TRADING_PLAYER_EID = 68; //long

	/* 70 (byte) command-block */
	public const DATA_COMMAND_BLOCK_COMMAND = 71; //string
	public const DATA_COMMAND_BLOCK_LAST_OUTPUT = 72; //string
	public const DATA_COMMAND_BLOCK_TRACK_OUTPUT = 73; //byte
	public const DATA_CONTROLLING_RIDER_SEAT_NUMBER = 74; //byte
	public const DATA_STRENGTH = 75; //int
	public const DATA_MAX_STRENGTH = 76; //int
	/* 77 (int)
	 * 78 (int) */

	public const DATA_FLAG_ONFIRE = 0;
	public const DATA_FLAG_SNEAKING = 1;
	public const DATA_FLAG_RIDING = 2;
	public const DATA_FLAG_SPRINTING = 3;
	public const DATA_FLAG_ACTION = 4;
	public const DATA_FLAG_INVISIBLE = 5;
	public const DATA_FLAG_TEMPTED = 6;
	public const DATA_FLAG_INLOVE = 7;
	public const DATA_FLAG_SADDLED = 8;
	public const DATA_FLAG_POWERED = 9;
	public const DATA_FLAG_IGNITED = 10;
	public const DATA_FLAG_BABY = 11;
	public const DATA_FLAG_CONVERTING = 12;
	public const DATA_FLAG_CRITICAL = 13;
	public const DATA_FLAG_CAN_SHOW_NAMETAG = 14;
	public const DATA_FLAG_ALWAYS_SHOW_NAMETAG = 15;
	public const DATA_FLAG_IMMOBILE = 16, DATA_FLAG_NO_AI = 16;
	public const DATA_FLAG_SILENT = 17;
	public const DATA_FLAG_WALLCLIMBING = 18;
	public const DATA_FLAG_CAN_CLIMB = 19;
	public const DATA_FLAG_SWIMMER = 20;
	public const DATA_FLAG_CAN_FLY = 21;
	public const DATA_FLAG_RESTING = 22;
	public const DATA_FLAG_SITTING = 23;
	public const DATA_FLAG_ANGRY = 24;
	public const DATA_FLAG_INTERESTED = 25;
	public const DATA_FLAG_CHARGED = 26;
	public const DATA_FLAG_TAMED = 27;
	public const DATA_FLAG_LEASHED = 28;
	public const DATA_FLAG_SHEARED = 29;
	public const DATA_FLAG_GLIDING = 30;
	public const DATA_FLAG_ELDER = 31;
	public const DATA_FLAG_MOVING = 32;
	public const DATA_FLAG_BREATHING = 33;
	public const DATA_FLAG_CHESTED = 34;
	public const DATA_FLAG_STACKABLE = 35;
	public const DATA_FLAG_SHOWBASE = 36;
	public const DATA_FLAG_REARING = 37;
	public const DATA_FLAG_VIBRATING = 38;
	public const DATA_FLAG_IDLING = 39;
	public const DATA_FLAG_EVOKER_SPELL = 40;
	public const DATA_FLAG_CHARGE_ATTACK = 41;
	public const DATA_FLAG_WASD_CONTROLLED = 42;
	public const DATA_FLAG_CAN_POWER_JUMP = 43;
	public const DATA_FLAG_LINGER = 44;
	public const DATA_FLAG_HAS_COLLISION = 45;
	public const DATA_FLAG_AFFECTED_BY_GRAVITY = 46;
	public const DATA_FLAG_FIRE_IMMUNE = 47;
	public const DATA_FLAG_DANCING = 48;

	public static entityCount = 1;
	/** @var Entity[] */
	private static knownEntities = [];
	/** @var string[] */
	private static saveNames = [];

    /**
	 * Called on server startup to register default entity types.
	 */
	public static function init()
    {
		//define legacy save IDs first - use them for saving for maximum compatibility with Minecraft PC
		//TODO: index them by version to allow proper multi-save compatibility
		Entity.registerEntity(Arrow.class, false, ['Arrow', 'minecraft:arrow']);
		Entity.registerEntity(Egg.class, false, ['Egg', 'minecraft:egg']);
		Entity.registerEntity(FallingSand.class, false, ['FallingSand', 'minecraft:falling_block']);
		Entity.registerEntity(Item.class, false, ['Item', 'minecraft:item']);
		Entity.registerEntity(PrimedTNT.class, false, ['PrimedTnt', 'PrimedTNT', 'minecraft:tnt']);
		Entity.registerEntity(Snowball.class, false, ['Snowball', 'minecraft:snowball']);
		Entity.registerEntity(Squid.class, false, ['Squid', 'minecraft:squid']);
		Entity.registerEntity(Villager.class, false, ['Villager',	'minecraft:villager']);
		Entity.registerEntity(Zombie.class, false, ['Zombie',	'minecraft:zombie']);
		Entity.registerEntity(Human.class, true);
	}

}
