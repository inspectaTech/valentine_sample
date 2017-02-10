<?php
	defined('_JEXEC') or die;
?>
	<div id="arc_stage" class="test_grey arc_stage ui-grid-b">
		<div id="popup_holder" class="popup_holder" >
		</div><!-- href="#arc_popup" ui-corner-all-->
		<button class="arc_my_info arc_intro_btn ui-btn " data-rel="popup" data-position-to="window" data-transition="pop" ></button>
		<button class="arc_my_group arc_intro_btn arc_intro_btn ui-btn"data-rel="popup" data-position-to="window" data-transition="pop" ></button>
		<button class="arc_my_media arc_intro_btn arc_intro_btn ui-btn" data-rel="popup" data-position-to="window" data-transition="pop"></button>
	</div>
	<script>

	window['SITEURL'] = "<?php echo JUri::current(); ?>";
	console.info("site url = " + SITEURL);//

	window['FORM_TOKEN'] = '<?php echo JSession::getFormToken(); ?>';
	//getFakeArcData("123");
	acr_setTheStage();

	window['ARC_IMG_URL'] = "<?php echo JUri::root(); ?>components/com_arc/xfiles/images/";

	window['ALIGHTHOME'] =  "<?php echo JUri::root(); ?>index.php/alight/home";
	console.info("home url = " + ALIGHTHOME);

	screen.orientation.lock("portrait-primary").catch(function(){});

	//this removes all the endless hashs added to the address to make an extremely lengthly url
	location.hash = "";

	</script>
