<?php
defined('_JEXEC') or die;

class TableArcAssets extends JTableNested
{

    public function __construct($db)
    {
        parent::__construct('#__arc','id',$db);
    }

    public function getMenuData($moId)
    {

        $db = jFactory::getDbo();
        $query = $db->getQuery(true);
        $query->select($db->quoteName(array('id','title','menu_data','menu_options')));
        $query->from($db->quoteName('#__arc'));
        $query->where($db->quoteName('module_id') . ' LIKE '. $db->quote($moId));//arc Test Page
        $db->setQuery($query);

        $menuData = json_encode($db->loadObject());
        return $menuData;


    }//end getMenuData

	public function getFakeData($moId)
	{
		//run some $db query
		//return something;
		return "absolutely nothing!";

	}

	public function addMyInfo($inStr,$dsp_Dta)
	{
		$arc_input = json_decode($inStr);
    $display_data = $dsp_Dta;

    switch($display_data)
    {
      case "info":
        $info_table = '#__arc_my_info';
      break;

      case "media":
        $info_table = '#__arc_my_media' ;
      break;

      case "group":
        $info_table = '#__arc_my_group' ;
      break;
    }

		$db = jFactory::getDbo();
        $query = $db->getQuery(true);


		if(!isset($arc_input->category)){$arc_input->category = "";}
		if(!isset($arc_input->core_data)){$arc_input->core_data = "";}
		if(!isset($arc_input->desc_data)){$arc_input->desc_data = "";}
    if(!isset($arc_input->other_data)){$arc_input->other_data = "";}
		if(!isset($arc_input->picture)){$arc_input->picture = "";}
		if(!isset($arc_input->published)){$arc_input->published = "";}
		if(!isset($arc_input->extra)){$arc_input->extra = "";}

		//get server timestamp
		$now = new DateTime();
		$arc_input->modified = $now->getTimestamp() * 1000;//miliseconds expired check

		//get the real user id
		$cur_arc_user = jFactory::getUser();
		$arc_input->user_id = $cur_arc_user->id;
		//$arc_user_id = ($cur_arc_user->id != 0) ? $cur_arc_user->id : $pStr->send_id;

		//insert columns
        $columns = array('user_id','category','core_data','desc_data','other_data','modified','picture','published','extra');

		if(isset($arc_input->category) && $arc_input->category == "notification")
		{
			$query = $db->getQuery(true);
			$query->select($db->quoteName(array('id')));
			$query->from($db->quoteName('#__arc_my_info'));
			$query->where($db->quoteName('extra') . ' LIKE '. $db->quote(htmlentities("%" . $arc_input->extra . "%")));//aliintro Test Page
			$db->setQuery($query);

			//$idData = json_encode($db->loadResult());//this json_encode was messing up my conversion code
			$doubleCheck = $db->loadResult();

			if($doubleCheck != ""){
			return "duplicate entry";

			}//end if
		}

		 //insert values
        $values = array(
        $db->quote($arc_input->user_id),
		$db->quote(htmlentities($arc_input->category)),
		$db->quote(htmlentities($arc_input->core_data)),
		$db->quote(htmlentities($arc_input->desc_data)),
    $db->quote(htmlentities($arc_input->other_data)),
		$db->quote($arc_input->modified),
		$db->quote(htmlentities($arc_input->picture)),
		$db->quote(htmlentities($arc_input->published)),
		$db->quote(htmlentities($arc_input->extra))
		);


        //prep the insert query
        $query->insert($db->quoteName($info_table))
        ->columns($db->quoteName($columns))
        ->values(implode(',',$values));
        $db->setQuery($query);
		$results = $db->execute();

		//bring back users data

		if($results != 1)
		{
			$retData = "upload failed";
			return $retData;

		}else{

			$retData = "upload success";
			return $retData;
		}


	}//end addMyInfo

	public function getMyInfo($dsp_Dta)
	{

    $display_data = $dsp_Dta;

    switch($display_data)
    {
      case "info":
        $info_table = '#__arc_my_info';
      break;

      case "media":
        $info_table = '#__arc_my_media' ;
      break;

      case "group":
        $info_table = '#__arc_my_group' ;
      break;
    }

		$db = jFactory::getDbo();
        $query = $db->getQuery(true);

		$cur_arc_user = jFactory::getUser();
		$arc_user_id = $cur_arc_user->id;

		if($arc_user_id == 0){return "unregistered user";}

        $query->select('*');
        $query->from($db->quoteName($info_table));
        $query->where($db->quoteName('user_id') . ' = '. $db->quote($arc_user_id));
		    $query->order($db->quoteName('category') . ' , ' . $db->quoteName('desc_data'));//aliintro Test Page
        //$query->order($db->quoteName('core_data'));//aliintro Test Page
        $db->setQuery($query);

		$rows = $db->loadAssocList();
		$returnData = json_encode($rows);

		$returnData = html_entity_decode($returnData);

		return $returnData;



	}//end getMyInfo

	public function deleteMyInfo($idStr,$dsp_Dta)
	{
		$arc_input = json_decode($idStr);
    $display_data = $dsp_Dta;

    //TODO:50 i need to check if the id belongs to the user

		$db = jFactory::getDbo();
        $query = $db->getQuery(true);

		$cur_arc_user = jFactory::getUser();
		$arc_user_id = $cur_arc_user->id;

    $info_table = ($display_data != "media") ? '#__arc_my_info' : '#__arc_my_media' ;

		if($arc_user_id == 0){return "unregistered user";}

		$conditions = array(
		$db->quoteName('id') . ' = ' . $db->quote(htmlentities($arc_input->id))
		);


        $query = $db->getQuery(true);
        $query->delete($db->quoteName($info_table));
        $query->where($conditions);//aliintro Test Page
        $db->setQuery($query);
		$results = $db->execute();

		return $results;



	}//end deleteMyInfo

	public function editMyInfo($inStr,$dsp_Dta)
	{
		$arc_input = json_decode($inStr);
    $display_data = $dsp_Dta;

		$db = jFactory::getDbo();
        $query = $db->getQuery(true);

      switch($display_data)
      {
        case "info":
          $info_table = '#__arc_my_info';
        break;

        case "media":
          $info_table = '#__arc_my_media' ;
        break;

        case "group":
          $info_table = '#__arc_my_group' ;
        break;
      }

		/*******************************************************/
		//matches the old data with the users original data matching id with id


		$query = $db->getQuery(true);
		$query->select('*');
		$query->from($db->quoteName($info_table));
		$query->where($db->quoteName('id') . ' = '. $db->quote(htmlentities($arc_input->data_id)));//aliintro Test Page
		$db->setQuery($query);

		$row = $db->loadAssoc();
		$compare_str = json_encode($row,JSON_UNESCAPED_SLASHES);

		/******************************************************/


		if($compare_str == $arc_input->data_str)
		{




			if(!isset($arc_input->category)){$arc_input->category = "";}
			if(!isset($arc_input->core_data)){$arc_input->core_data = "";}
			if(!isset($arc_input->desc_data)){$arc_input->desc_data = "";}
      if(!isset($arc_input->other_data)){$arc_input->other_data = "";}
			if(!isset($arc_input->picture)){$arc_input->picture = "";}
			if(!isset($arc_input->published)){$arc_input->published = "";}
			if(!isset($arc_input->extra)){$arc_input->extra = "";}

			//get server timestamp
			$now = new DateTime();
			$arc_input->modified = $now->getTimestamp() * 1000;//miliseconds expired check

			//get the real user id
			$cur_arc_user = jFactory::getUser();
			$arc_input->user_id = $cur_arc_user->id;


			//insert fields
			$fields = array(
			$db->quoteName('user_id') . ' = ' . $db->quote($arc_input->user_id),
			$db->quoteName('category') . ' = ' . $db->quote(htmlentities($arc_input->category)),
			$db->quoteName('core_data') . ' = ' . $db->quote(htmlentities($arc_input->core_data)),
			$db->quoteName('desc_data') . ' = ' . $db->quote(htmlentities($arc_input->desc_data)),
      $db->quoteName('other_data') . ' = ' . $db->quote(htmlentities($arc_input->other_data)),
			$db->quoteName('modified') . ' = ' . $db->quote(htmlentities($arc_input->modified)),
			$db->quoteName('picture') . ' = ' . $db->quote(htmlentities($arc_input->picture)),
			$db->quoteName('published') . ' = ' . $db->quote(htmlentities($arc_input->published)),
			$db->quoteName('extra') . ' = ' . $db->quote(htmlentities($arc_input->extra))
			);//$db->quote(htmlentities($str))


			$conditions = array($db->quoteName('id') . ' = ' . $db->quote(htmlentities($arc_input->data_id)));

			$query->update($db->quoteName($info_table))->set($fields )->where($conditions);
			$db->setQuery($query);
			$results = $db->execute();

			if($results == 1)
			{
				$retData = "update successful";
				return $retData;

			}else{

				$retData = "update failed";
				return $retData;

			}//end else

		}else{

			return "data discrepancy";
		}//end else


	}//end editMyInfo

}//end class
