/**
 * Created by Jarvis.
 */
function  tableToJson(){
	//$('table').html()
	var data=[];
	var data_=[];
	var data__=[];
	var data_0=[];
	var data_0_=[];
	var data_1=[];
	var data_2=[];
	data=[];
	$('table').children('tbody').children('tr:first').each(function(){
		data_=[];
		data_[0]=40;
		data_[1]=40;
		data__=[];
		$(this).children('td:first').each(function(){
			data_0=[];
			data_0[0]=40;
			data_0[1]=trim(cleanHtml(trim($(this).html(),3)),0);
			data_0[2]='vertical';
			data__[data__.length]=data_0;
		});
		$(this).children('td:first').nextAll().each(function(){
			data_0=[];
			data_0[0]=100;
			data_0[1]=trim(cleanHtml(trim($(this).html(),3)),0);
			data_0[2]='center';
			data__[data__.length]=data_0;
		});
		data_[data_.length]=data__;
		data[data.length]=data_;
	});
	$('table').children('tbody').children('tr:first').nextAll().each(function(){
		data_=[];
		data_[0]=130;
		data_[1]=130;
		data__=[];
		$(this).children('td:first').each(function(){
			data_0=[];
			data_0[0]=40;
			data_0[1]=trim(cleanHtml(trim($(this).html(),3)),0);
			data_0[2]='vertical';
			data__[data__.length]=data_0;
		});
		$(this).children('td:first').nextAll().each(function(){
			data_0=[];
			data_0[0]=100;
			data_0_=[];
			$(this).children('table').each(function(){
				data_1=[];
				$(this).children('tbody').children('tr').each(function(){
					//alert($(this).html())
					$(this).children('td').each(function(){
						data_1[data_1.length]=trim(cleanHtml(trim($(this).html(),3)),0);
					});
					
				});
				data_0_[data_0_.length]=data_1;
			});
			data_0[data_0.length]=data_0_;
			data_0[2]='left';
			data__[data__.length]=data_0;
		});
		data_[data_.length]=data__;
		data[data.length]=data_;
	});
	console.log(data)
	return data;
}
function cleanHtml(str){
	return str.replace(/<[^>]*>/g,"");
	
}
function trim(str,type){
	var re=''
	switch(type){
		case 0:
			re=str.replace(/(^\s*)|(\s*$)/g,"");
			break;
		case 1:
			re=str.replace(/(^\s*)/g,"");
			break;
		case 2:
			re=str.replace(/(\s*$)/g,"");
			break;
		case 3:
			re=str.replace(/\t|\r|\n|\f/g,"");
			break;
		case 4:
			re=str.replace(/(\s*)/g,"");
			break;
	}
    return re;
}

function  makeCourse(data,pic) {
	var canvasE = document.createElement("canvas");
	document.body.appendChild(canvasE);
	//canvasE.style.display="none";
	var height_=0,width_=0;
	for (var i = 0; i < data.length; i++) {
		for(var a=0;a<data[i][2].length;a++){
			height_+=data[i][1];
			break;
		}
	}
	for (var i = 0; i < data.length; i++) {
		var mm=0;
		for(var a=0;a<data[i][2].length;a++){
			mm+=data[i][2][a][0];
		}
		if(mm>width_)width_=mm;
	}
	canvasE.width=width_;
	canvasE.height=height_;
	var canvas=canvasE.getContext('2d');
	canvas.font="normal normal 400 30px Microsoft Yahei";
	canvas.fillText('_(:3 」∠ )_ 翼宝正在努力绘制你的课表...',(width_-canvas.measureText('_(:3 」∠ )_ 翼宝正在努力绘制你的课表...').width)/2,canvasE.height/2-40);
	//////////
	var img=new Image();
	img.src=pic;
	img.onload = function(){
		var xTable=0,yTable=0;
		canvas.strokeStyle='#DDDDDD';
		canvas.lineWidth=0;
		var maxWidth=[0,0,0,0,0,0,0,0];
		var maxHeight=[0,0,0,0,0,0];
		for (var i = 0; i < data.length; i++) {

			for(var a=0;a<data[i][2].length;a++){
				var temp0=0;
				var tt=0;
				if(data[i][2][a][1])tt=data[i][2][a][1].length;
				if(maxWidth[a]<data[i][2][a][0])maxWidth[a]=data[i][2][a][0];
				for(var b=0;b<tt;b++){
					if(data[i][2][a][1][0].length>1){
						canvas.font="normal normal 700 14px Microsoft Yahei";
						var temp=canvas.measureText(data[i][2][a][1][b][0]).width+30;
						if(maxWidth[a]<temp)maxWidth[a]=temp;
						canvas.font="normal normal 400 14px Microsoft Yahei";
						temp=canvas.measureText(data[i][2][a][1][b][1]).width+20+canvas.measureText(data[i][2][a][1][b][2]).width+30;
						if(maxWidth[a]<temp)maxWidth[a]=temp;
						temp0+=60;
					}
				}
				if(maxHeight[i]<temp0)maxHeight[i]=temp0;
			}
			if(maxHeight[i]<data[i][1])maxHeight[i]=data[i][1];
		}
		width_=0;
		for(var a=0;a<maxWidth.length;a++){
			width_+=maxWidth[a];
		}
		height_=0;
		for(var a=0;a<maxHeight.length;a++){
			height_+=maxHeight[a];
		}
		console.log(width_,height_,maxHeight)
		canvasE.width=width_;
		canvasE.height=height_;
		canvas.strokeStyle='#DDDDDD';
		canvas.lineWidth=0;
		for (var i = 0; i < data.length; i++) {
			if(i%2==0){
				canvas.fillStyle='#F9F9F9';
			}
			else{canvas.fillStyle='#FFF';}
			canvas.fillRect(0,yTable,canvasE.clientWidth,maxHeight[i]);
			yTable+=maxHeight[i];
			canvas.beginPath();
			canvas.moveTo(0,yTable);
			canvas.lineTo(canvasE.clientWidth,yTable);
			canvas.stroke();
			//console.log(data[i][0]);
			xTable=0;
			//console.log(data);
			for(var a=0;a<data[i][2].length;a++){
				canvas.font="normal normal 400 14px Microsoft Yahei";
				canvas.fillStyle="#000";
				var y_=yTable-(maxHeight[i])+14+5;
				var tt=0;
				if(data[i][2][a][1])tt=data[i][2][a][1].length;
				for(var b=0;b<tt;b++){
					//console.log(data[i][1][a][1])
					if(data[i][2][a][1][0].length>1){
						canvas.font="normal normal 700 14px Microsoft Yahei";
						canvas.fillText(data[i][2][a][1][b][0],xTable+5,y_);
						canvas.font="normal normal 400 14px Microsoft Yahei";
						canvas.fillText(data[i][2][a][1][b][1],xTable+5,y_+18);
						canvas.fillText(data[i][2][a][1][b][2],xTable+5+canvas.measureText(data[i][2][a][1][b][1]).width+20,y_+18);
						canvas.fillText(data[i][2][a][1][b][3],xTable+5,y_+18+18);
						y_+=18*3+5;
					}
					else{
						if (data[i][2][a][2]=="center") {
							canvas.fillText(data[i][2][a][1],xTable+5,y_+(data[i][0]-14)/2-5);
						}
						else if(data[i][2][a][2]=="vertical"){
							for(var c=0;c<data[i][2][a][1].length;c++){
								canvas.fillText(data[i][2][a][1].substring(c,c+1),xTable+12,y_+5+c*22);
							}
						}
						else{canvas.fillText(data[i][2][a][1],xTable+5,y_);}
						break;
					}
				}
				//console.log(canvas.measureText(data[i][1][a][1][b][0]).width)
				xTable+=maxWidth[a];
				canvas.beginPath();
				canvas.moveTo(xTable,yTable-maxHeight[i]);
				canvas.lineTo(xTable,yTable);
				canvas.stroke();
			}
		}
		canvas.strokeRect(0,0,canvasE.clientWidth,canvasE.clientHeight);
		canvas.drawImage(img,canvasE.clientWidth-img.width,canvasE.clientHeight-img.height);
		var type = 'png';
		imgData=canvasE.toDataURL(type);
		$.ajax({
			type:"post",
			url:"./saveImage.php",
			data:{'img':imgData},
			async:false,
			beforeSend: function(XMLHttpRequest){
			},
			success: function(data, textStatus){
				if(data!='fail'){
					//alert(data)
					canvasE.style.display='none';
					console.log($('table:first'))
					$('table:first').attr('border',0);
					$('table:first').html('<h2>长按或右键保存哟~</h2><img src="'+data+'">');
					$('table:first').css('display','block');
					//saveFile(data,'sky31_'+(new Date()).getTime()+'.png');
					//console.log(data);
				}
				else{
					alert('抱歉, 获取失败 ...')
				}
			},
			complete: function(XMLHttpRequest, textStatus){
			},
			error: function(){
			}
		});
		
		//console.log(imgData);
		//document.write(imgData)
	}
}
function saveFile(data, filename){
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = data;
    save_link.download = filename;
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
};

   
