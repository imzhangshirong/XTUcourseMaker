直接获取XTU教务系统的课表
检索，得到数据数组，生成课程表图片
var data=tableToJson();//返回检索的数据
makeCourse(data,'./logo.png');//logo.png为水印图片