<?php
function sitemapListPage($page, $adminUrl) {

	// Just to avoid insane loops in huge sites
	$maxChilds = 20;

	if (isset($_GET['curPageId'])) {
		$curPageId = $_GET['curPageId'];
	} else {
		$curPageId = '';
	}

	$class = '';
	if ((int)$curPageId == (int)$page->id) {
		$class="current";
	}

	echo "<li><a class='{$class}' target='_top' title='{$page->url}' href='{$page->url}'>$page->title</a>";

	$numChildren = $page->numChildren;
	$moreChildren = $numChildren - $maxChilds;

	if($page->numChildren) {
		echo "<ul>";
			foreach($page->children("limit=$maxChilds") as $child) {
				sitemapListPage($child, $adminUrl);
			}
			if($page->numChildren > $maxChilds) {
				echo "<li><i><a target='_top' href='{$adminUrl}'>... {$moreChildren} more pages, you can view them through admin.</a></i></li>";
			}
		echo "</ul>";
	}
	echo "</li>";
}

?>
<!DOCTYPE html>
<html>
	<head>
		<title>AdminBar sitemap</title>
		<link href="<?php echo $config->urls->AdminBar?>templates/sitemapstyler/sitemapstyler.css" rel="stylesheet" type="text/css" media="screen" />
		<script type="text/javascript" src="<?php echo $config->urls->AdminBar?>templates/sitemapstyler/sitemapstyler.js"></script>
	</head>
	<body>
		<div class="nav">
			<?php
			$adminUrl = $config->urls->admin;
			echo "<a target='_top' class='action' href='$adminUrl'>Go to administration</a>";
			echo "<ul id='sitemap'>";
			sitemapListPage($pages->get("/"), $adminUrl);
			echo "</ul>";
			?>
		</div>
	</body>
</html>
