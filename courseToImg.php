<?php

session_start();
if(isset($_SESSION['loginStatus'])&&$_SESSION['loginStatus']==1){
	//
}
else{
	header('Location: login.php?error=1&bak=course');
	exit;
}

include 'config.php';
include 'lib/infoQuery.class.php';

$student=new infoQuery($_SESSION['sid'],$_SESSION['password']);

?>
<!DOCTYPE html>
<html lang="zh-cn">
	<head>
		<meta charset="utf-8">
		<title><?=$siteName;?> - 查课表 - 导出图片</title>
		<meta name="description" content="<?=$description;?>">
		<script src="js/jquery-1.8.3.min.js"></script>
		<script src="js/courseMaker.js"></script>
		<script>
		$(document).ready(function(){
			$('table').css({'display':'none'});
			var data=tableToJson();
			$('table').html('');
			makeCourse(data,'img/sky31.png');
		});
		</script>
	</head>
	<body>
		<?php $student->getCourseOld();?>
	</body>
	<footer>
		<h2><a href="course.php"><font color="red"><< 返回</font></a></h2>
	</footer>
</html>