<?php
defined('_JEXEC') or die;

class arcController extends JControllerLegacy //class folioController
{

		function testModule()
        {
			//targets the table in the tables directory
			JSession::checkToken( 'get' ) or die( 'Invalid Token' );
			/*
			//	window['FORM_TOKEN'] = '<?php //echo JHtml::_('form.token'); ?>';
				
				//this one works
				window['FORM_TOKEN'] = '<?php echo JSession::getFormToken(); ?>';
			*/
			
            echo "we're back too ";
            
        }//end testModule
        
		function getFakeData()
		{
			//called from arc_site.js calls getFakeData in moduleassests.php in tables directory
			//targets the table in the tables directory
			
			//targets the table in the tables directory
			JSession::checkToken( 'get' ) or die( 'Invalid Token' );
			/*
			//	window['FORM_TOKEN'] = '<?php //echo JHtml::_('form.token'); ?>';
				
				//this one works
				window['FORM_TOKEN'] = '<?php echo JSession::getFormToken(); ?>';
			*/
			
			JTable::addIncludePath(JPATH_COMPONENT . '/tables');
			$table = JTable::getInstance('arcassets','Table');
			
			$module_str = $_POST['module_str'];
		   
			$menu_data = $table->getFakeData("pass anything or nothing");
			
			echo "controller connection successful";
			//echo " menu data = " . $menu_data . " & module string = " . $module_str;
			
		}//end getFakeData
		
		function addMyInfo()
		{
			JSession::checkToken( 'get' ) or die( 'Invalid Token' );
			JTable::addIncludePath(JPATH_COMPONENT . '/tables');
			$table = JTable::getInstance('arcassets','Table');
			
			$input_str = $_POST['arc_input'];
			
			$input_results = $table->addMyInfo($input_str);
			
			echo $input_results;
			
		}//end addMyInfo
		
		function getMyInfo()
		{
			JSession::checkToken( 'get' ) or die( 'Invalid Token' );
			JTable::addIncludePath(JPATH_COMPONENT . '/tables');
			$table = JTable::getInstance('arcassets','Table');
			
			$info_type = $_POST['info'];
			
			$info_results = $table->getMyInfo($info_type);
			
			echo $info_results;
		}//end getMyInfo
		
		function deleteMyInfo()
		{
			JSession::checkToken( 'get' ) or die( 'Invalid Token' );
			JTable::addIncludePath(JPATH_COMPONENT . '/tables');
			$table = JTable::getInstance('arcassets','Table');
			
			$info_type = $_POST['arc_input'];
			
			$info_results = $table->deleteMyInfo($info_type);
			
			echo $info_results;
		}//end deleteMyInfo
		
		function editMyInfo()
		{
			JSession::checkToken( 'get' ) or die( 'Invalid Token' );
			JTable::addIncludePath(JPATH_COMPONENT . '/tables');
			$table = JTable::getInstance('arcassets','Table');
			
			$info_type = $_POST['arc_input'];
			
			$info_results = $table->editMyInfo($info_type);
			
			echo $info_results;
		}//end editMyInfo

}//end class