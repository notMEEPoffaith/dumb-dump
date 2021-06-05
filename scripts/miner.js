const miner = extend(ItemTurret, "miner", {
	size: 2,
	range: 320,
	health: 1800,
	shootCone: 20,
	shootSound: Sounds.shootBig,
	targetAir: false,
	targetGround: true,
	rotateSpeed: 2,
	restitution: 0.02,
	recoilAmount: 3,
	cooldown: 0.11,
	inaccuracy: 8,
	shootEffect: Fx.none,
	smokeEffect: Fx.none,
	ammoUseEffect: Fx.none,
	reloadTime: 20,
	shots: 1
});

//I probably left too many comments for such simple code, but whatever
const mine = extend(ArtilleryBulletType, {
	speed: 2.5,
	damage: 0,
	width: 9,
	height: 15,
	lifetime: 90,
	
	//given the way artillery bullets work, it is unnecessary to put this code under both despawned() and hit()
	despawned(b){
		//the entity coordinates are 8x greater than the Vars.world.tile coordinates so we need to divide by 8 to compensate
		let targetTile = Vars.world.tile(b.x/8, b.y/8)
		
		//I'm not entirely sure how, but for some reason this null check is mandatory for preventing the bullet from crashing instantly
		if(targetTile != null) {
			targetTile.setBlock(Blocks.shockMine, b.team);
		}

		this.super$despawned(b);
	}
});

miner.ammo(
	Items.silicon, mine
);

miner.setupRequirements(Category.turret, ItemStack.with(
	Items.copper, 200,
	Items.graphite, 300,
	Items.titanium, 100,
	Items.silicon, 100
));

miner.buildType = () => extend(ItemTurret.ItemTurretBuild, miner, {});