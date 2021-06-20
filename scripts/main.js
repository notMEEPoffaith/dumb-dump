let req = Seq.with(
	"blocks/miner"
);
req.forEach(s => {
	try{
		require(s)
	}catch(e){
		Log.err(e)
	}
});