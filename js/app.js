 /*Copyright (C) 2019 Fabian Schoettler

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


// !!! ONLY FOR BPM

// Source: 2110-20 anex a

// bpp = 180 blocks per package
// ppp = pixels per package
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


// Register listeners
$( document ).ready(function() {
    console.log( "ready!" );
	
	$("#calc_btn").on("click", ()=>{
		calculate();
	});
	
	$('#preset').on('change', function() {
		onPresetSelect( PRESETS[ this.value ] );
		calculate();
	});
	
	$("#frame_width, #frame_height, #sampling, #sample_res, #frames_p_s").on("input", ()=> calculate());
	
	
});

function retrieveInput (){
	var width = $("#frame_width").val();
	var height= $("#frame_height").val();
	var sampling = $("#sampling option:selected").val();
	var sampleRes = $("#sample_res option:selected").val();
	var fps = $("#frames_p_s").val();
	
	return {
		width,
		height,
		sampling,
		sampleRes,
		fps
	}
}

function onPresetSelect( preset ){
	$("#frame_width").val( preset.width );
	$("#frame_height").val( preset.height );
	$("#sampling").val( preset.sampling );
	$("#sample_res").val( preset.sampleRes );
	$("#frames_p_s").val( preset.fps);
}

function calculate (){
	var currInput = retrieveInput();
	var frameSize= calcFrameSize(currInput.width, currInput.height, currInput.sampling, currInput.sampleRes);
	var videoSize = calcVideoSize(frameSize, currInput.fps);
	var sampling = $("#sampling option:selected").val();
	
	/*console.log("Sampling : ", sampling);
	console.log( "Frame Size : ", frameSize);
	console.log( "Video Size : ", videoSize);*/
	
	$("#frame_size").text( (frameSize/ 1000000.0).toLocaleString().replace(/,/g , " " ));
	$("#video_size").text( (videoSize/ 1000000.0).toLocaleString().replace(/,/g  , " " ));
	
	var ppf = calcPcktsPerFrame( currInput.width* currInput.height, sampling, currInput.sampleRes);
	var headerSize = calcAvgHeaderSize( calcRTPPayloadHeaderSize());
	
	var streamSize = calcStreamSize( currInput.fps, headerSize, ppf, videoSize);
	
	$("#header_size").text( headerSize.toLocaleString().replace(/,/g , " " ) );
	$("#stream_size").text( (streamSize/ 1000000).toLocaleString().replace(/,/g  , " " ));
	$("#pps").text( (ppf * currInput.fps).toLocaleString().replace(/,/g  , " " ) );
	$("#ppf").text( ppf.toLocaleString().replace(/,/g , " " ) );
	
	$("#gbit_req").text( Math.ceil((streamSize * 8) /1000000000 ));
}


function calcFrameSize( width, height, sampling, sampleRes ){
	var samplingFactor;
	switch(sampling){
		case "4:2:2":
			samplingFactor=2;
			break;
		case "4:2:0":
			samplingFactor=1.5;
			break;
		case "4:4:4":
			samplingFactor=3;
			break;
	}
	return (width * height * samplingFactor * sampleRes) / 8;
}

function calcVideoSize ( frameSize, fps ){
	return frameSize * fps;
}

function calcPcktsPerFrame( totalPixels, sampling, sampleRes ){
	return Math.ceil( totalPixels / samplingTable[sampling][sampleRes].ppp );
}

function calcRTPPayloadHeaderSize(){
	return 8;
}

function calcAvgHeaderSize( RTPPayloadHeader ){
	return RTP_HEADER_SIZE_BYTE + RTPPayloadHeader;
}

function calcStreamSize( fps, headerSize, ppf, videoSize){
	return (fps * headerSize* ppf) + videoSize;
}




// ETHERNET + IP_HEADER + UDP_HEADER + 
const RTP_HEADER_SIZE_BYTE = 14 + 20 + 8 + 12;