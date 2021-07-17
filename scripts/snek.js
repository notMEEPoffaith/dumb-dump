const wormlib = require("dumb-dump/worm-base");

const snek = extendContent(UnitType, "snek", {
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

const snekBullet = extend(BasicBulletType, {});
snekBullet.keepVelocity = false;
snekBullet.damage = 35;
snekBullet.speed = 5;
snekBullet.lifetime = 30;
snekBullet.bulletShrink = 0;
snekBullet.bulletWidth = 10;
snekBullet.bulletHeight = 14;
snekBullet.frontColor = Color.valueOf("d187ff");
snekBullet.backColor = Color.valueOf("976bff");

const snekBlaster = extendContent(Weapon, "snek-blaster", {
	load(){
		this.region = Core.atlas.find("clear");
	}
});
snekBlaster.alternate = false;
snekBlaster.reload = 45;
snekBlaster.bullet = snekBullet;
snekBlaster.shootSound = Sounds.bigshot;

snek.weapon = SnekBlaster;
snek.shootCone = 90;
snek.create(prov(() => {
	unit = wormlib.newBase(20, 11.5, 0.01, 120, true, null, null, null, null, null, []);
	return unit;
}));
