const samplingTable = {
	"4:2:2":{
		"8" : {
			"bpp": 7,
			"ppp": 630
		},
		"10": {
			"bpp": 7,
			"ppp": 504
		},
		"12": {
			"bpp": 7,
			"ppp": 420
		}
	},
	"4:4:4":{
		"8" : {
			"bpp": 7,
			"ppp": 420
		},
		"10": {
			"bpp": 7,
			"ppp": 336
		},
		"12": {
			"bpp": 7,
			"ppp": 280
		},
		"16": {
			"bpp": 7,
			"ppp": 210
		}
	},
	"4:2:0":{
		"8" : {
			"bpp": 7,
			"ppp": 840
		},
		"10": {
			"bpp": 7,
			"ppp": 672
		},
		"12": {
			"bpp": 7,
			"ppp": 560
		}
	}
}

const PRESETS = {
	"2160p50 / 4:4:4 / 12 bit":{
		width: 4096,
		height: 2160,
		sampling: "4:4:4",
		sampleRes: 12,
		fps: 50
	},
	"2160p25 / 4:2:2 / 10 bit":{
		width: 4096,
		height: 2160,
		sampling: "4:2:2",
		sampleRes: 10,
		fps: 25
	},
	"2160p60 / 4:2:2 / 10 bit":{
		width: 4096,
		height: 2160,
		sampling: "4:2:2",
		sampleRes: 10,
		fps: 60
	},
	"1080p60 / 4:2:2 / 10 bit":{
		width: 1920,
		height: 1080,
		sampling: "4:2:2",
		sampleRes: 10,
		fps: 60
	},
	"1080p50 / 4:2:2 / 10 bit":{
		width: 1920,
		height: 1080,
		sampling: "4:2:2",
		sampleRes: 10,
		fps: 50
	},
	"1080p25 / 4:2:2 / 10 bit":{
		width: 1920,
		height: 1080,
		sampling: "4:2:2",
		sampleRes: 10,
		fps: 25
	},
	"720p50 / 4:2:2 / 10 bit":{
		width: 720,
		height: 1280,
		sampling: "4:2:2",
		sampleRes: 10,
		fps: 50
	},
	"PAL":{
		width: 720,
		height: 576,
		sampling: "4:2:2",
		sampleRes: 10,
		fps: 25
	},
	"NTSC":{
		width: 720,
		height: 576,
		sampling: "4:2:2",
		sampleRes: 10,
		fps: 29.97
	},
		
}
