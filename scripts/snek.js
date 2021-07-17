const wormlib = require("dumb-dump/worm-base");

const python = extendContent(UnitType, "snek", {
	load(){
		this.super$load();
		this.region = Core.atlas.find(this.name);
		this.bodyRegion = Core.atlas.find(this.name + "-body");
		this.tailRegion = Core.atlas.find(this.name + "-tail");
		this.cellRegion = Core.atlas.find(this.name + "-head-cell");
		this.cellBodyRegion = Core.atlas.find(this.name + "-body-cell");
		this.cellTailRegion = Core.atlas.find(this.name + "-tail-cell");
	},
	getReg(){
		return {
			head: this.region,
			body: this.bodyRegion,
			tail: this.tailRegion
		}
	},
	getCellReg(){
		return {
			head: this.cellRegion,
			body: this.cellBodyRegion,
			tail: this.cellTailRegion
		}
	}
});

const pythonBullet = extend(BasicBulletType, {});
pythonBullet.keepVelocity = false;
pythonBullet.damage = 35;
pythonBullet.speed = 5;
pythonBullet.lifetime = 30;
pythonBullet.bulletShrink = 0;
pythonBullet.bulletWidth = 10;
pythonBullet.bulletHeight = 14;
pythonBullet.frontColor = Color.valueOf("d187ff");
pythonBullet.backColor = Color.valueOf("976bff");

const pythonBlaster = extendContent(Weapon, "snek-blaster", {
	load(){
		this.region = Core.atlas.find("clear");
	}
});
pythonBlaster.alternate = false;
pythonBlaster.reload = 45;
pythonBlaster.bullet = snekBullet;
pythonBlaster.shootSound = Sounds.bigshot;

python.weapon = SnekBlaster;
python.shootCone = 90;
python.create(prov(() => {
	unit = wormlib.newBase(20, 11.5, 0.01, 120, true, null, null, null, null, null, []);
	return unit;
}));
