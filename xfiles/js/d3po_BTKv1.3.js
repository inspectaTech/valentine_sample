    //d3po Bootstrap Toolkit

    /****************************************************************************************
	//TODO:210 store & validate the data on change

    !!!!!!!Important

    bugFix: button when color changed in external style sheet reverts back to inactive state
     when styling buttons you must add:

    //these selectors for the background state including background-image:none !important when in these states.
    .col_primary0:hover, .col_primary0:focus, .col_primary0:active, .col_primary0.active,
    .col_primary0.disabled, .col_primary0[disabled]{background-color:#828282 !important;
    background-image:none !important;}

    .col_primary0{ border-color:#000 !important;
    background-image: linear-gradient(to bottom,#f2f2f2,#828282) !important; }

    search tags:
    //button prep
    //button reset

    //icon prep


	//different types?
	//see display()


    ****************************************************************************************/
    function masterButtons(mstrObj)
    {
        //for bootstrap views
        ///mstrObj needs - name, home, selectClass,
        //example input - window['miko'] = new masterButtons({varName:'miko',home:'.masBtn_tab-pane0',type:'iconBox'});

        //properties
        var prepType = mstrObj.type;
        var type = prepType.toLowerCase() || "";//see set & get


        var prefix = mstrObj.varName || "masBtn";//get set

        var iUN = mstrObj.iUN || Math.round(Math.random() * 10000);//see iUN get and set


        var objectName = mstrObj.varName;//objects variable name

        //name of the group class container

        //var homeStr = mstrObj.home;
        var home = mstrObj.home || "";
		var clearHome = "true";

        var start = mstrObj.start || "";

        //important see set & get
        //home may need to be able to distinguish between a .class and #id string
        var stringType = "class";

        var iconDisplay = "visible";//see get & set

        var listNumber = 1;

        var groupLabelText = "";

        var homeContainer = document.getElementsByClassName(home)[0];

        var labels = [];
		//empty arrays are [] not "[]" as a string value i.e.(if(labels == [])) arrays with an index are not [] anymore

		var has_labels = "false";
        var titles = [];
		var placeholders = [];//handles more than 1 elements placeholder
		var custom_class = [];
		var event_ids = [];//array of id's of html elements this object manages
		var obj_attributes = [];//used to add attributes to input/textarea
		//good for one element or duplicate attributes on multiple elements
		var select_options = [];

		var forbidList = [
		" delete ","delete ",
		" select ","select ",
		" insert ","insert ",
		" into ","into ",
		" drop ","drop ",
		" update ","update ",
		"<",">",
		"%3e","%3c"
		];

		var data_check_array = [];

		var object_elements = {};

        var selectedButton = "";//see get get

        var selectedButtonObject = {};

        var selectedIcon = "bars";


        var text_tag = mstrObj.text_tag || "div";//see set

        var move_target_str = "";
        var move_target = "";
        var target_contents = "";
        var moveType = "";


        var set_clear = "false";
		var add_to_class = true;

		var id_type = "default";
		var custom_id = "";
		var fill_content = "";//for list,label_box,tag
		var default_setting = "";//for slider & select
		var inner_html = "";//for create_text_input,create_select
		var custom_select = "false";
		var custom_select_str = "custom";
		var casing = "false";
		var currentValue = "";

        //methods

        var getStringType = function(str)
        {
            var initialLetter = str.substr(0,1);
            var discovery = (initialLetter.indexOf("#") != -1)? "id" : "class";//stringType
            return discovery;

        }//end getStringType

        var prepElementStringType = function(str)
        {
            //preps the element string type
            //removes '.' class or '#' id indicator
            var initialLetter = str.substr(0,1);//homeStr.substr(0,1);

            if(initialLetter.indexOf("#") == 0 || initialLetter.indexOf(".") == 0)
            {
                var newHome = str.substr(1);//homeStr.substr(1);
                var discovery = getStringType(str);//set stringType variable to id or class  //getStringType(str);

            }//end if
            else
            {
                alert("You must pass an object to the new masterButtons object using home: '.var' \n or home: '#var'  to set class or id of the target container");
                throw "You must pass an object to the new masterButtons object using home: '.var' \n or home: '#var'  to set class or id of the target container";
            }//end else

            return {"target":newHome,"type":discovery};
            //home = newHome;
        }//end prepElementStringType

        var prepStartString = function()
        {
			//i think this sets the default start selection of a button group

           //i need to make sure the start has the same case as the labels
           if(start != "" && selectedButton == ""){
                var isString = checkArrayForString({'string':start,'array':labels});
                if(isString != -1){selectedButton = start}
                else{alert("please make sure the start property uses the same letters and casing as the labels");
                throw "please make sure the start property uses the same letters and casing as the labels";}
           }//end if
           else{if(labels[0] != undefined && selectedButton == ""){selectedButton = labels[0];}}
        }//end prepStartString

        this.setStart = function(str){start = str;}

        this.setHome = function(str){ home = str;/*homeStr = str;*/ }

        this.getHome = function(str){return home;}

        this.setPrefix = function(str){prefix = str;}
		//usually doesn't need a getter because it is set externally? if not its static

        this.setType = function(){type = str;}
        this.getType = function(){return type;}

        this.setIUN = function(str){/*must be a number*/ iUN = parseInt(str);}
        this.getIUN = function(){return iUN;}

		//TODO:200 see where each of these can work in each display
		this.setText = function(str){inner_html = str; default_setting = str; fill_content = str;}//works in: create_text_input,create_select

		this.setDefault = function(str){inner_html = str; default_setting = str; fill_content = str;}//works in: create_select

		this.setContent = function(str){inner_html = str; default_setting = str; fill_content = str;}//works in: label_box, list & tag

		this.clearHome = function(str){clearHome = str};//set other than true stop bigDaddy from clearing its innerHTML


        this.setIconDisplay = function(str)
        {
            if(str == "visible" || str == "hidden")
            {
                iconDisplay = str;
            }else{
                alert("icon display text must be limited to either 'visible' or 'hidden' ");
                throw "icon display text must be limited to either 'visible' or 'hidden' ";
            }//end else
        }

        this.getIconDisplay = function(){return iconDisplay.toLowerCase();}


        this.getSelectedButton = function()
        {
            return selectedButton.toLowerCase();

        }//end getSelectedButton

        this.setSelectedButton = function(str)
        {
            selectedButton = str;
        }//end setSelectedButton

        this.setSelectedIcon = function(str){

            var isString = checkArrayForString({'string':str,'array':iconList});

            if(isString != -1){ selectedIcon = str;}
            else
            {
                alert("setSelectedIcon string must be the title of a JQuery Mobile icon.");
                throw "setSelectedIcon string must be the title of a JQuery Mobile icon.";
            }

        }//end setSelectedIcon

        this.getSelectedIcon = function(){return selectedIcon.toLowerCase();}

        //sets the 'Label'(or label for the entire button group)
        this.setGroupLabel = function(str){groupLabelText = str;}

        //sets labes and titles of the individual buttons
        this.setLabels = function(arObj)
        {
			console.log("label type = ",typeof(arObj))
			//can take an array,a single str and be set to none
			if(arObj != undefined && typeof(arObj) == "object"){
				labels = arObj;//still will be an array
				has_labels = "true";
            }else if(arObj != undefined && typeof(arObj) == "string" && arObj != ""){
				labels[0] = arObj;//labels initiate counts
				has_labels = "true";
			}else{
				labels[0] = "";
				has_labels = "false";
			}

        }//end setLabels

        this.setTitles = function(arObj)
        {
			if(arObj != undefined && typeof(arObj) == "object"){
				titles = arObj;
			}else if(arObj != undefined || typeof(arObj) == "string"){
				titles[0] = arObj;
			}//end if

        }//end setTitles

		this.setPlaceholders = function(arObj)
        {
            placeholders = arObj;

        }//end setPlaceholders


        var checkArrayForString = function(sObj)
        {
            var testString = sObj.string;
            var testArray = sObj.array;

            var strIndx = -1;

            for(var i = 0; i < testArray.length; i++)
            {
                var checkString = testArray[i];

				//does the array index have this string anywhere in it
				//"&*()$".indexof("*")
                if(checkString.indexOf(testString) != -1)
                {
                  strIndx = i;
                }

            }//end for

            return strIndx;
        }//end checkArrayForString

	var checkStringForArray = function(sObj)
	{
		//example use: var isString = checkStringForArray({'string':start,'array':labels});

		var testString = sObj.string;
		var testArray = sObj.array;

		var strIndx = -1;

		for(var i = 0; i < testArray.length; i++)
		{
			var checkString = testString;//

			//does the string - (usually long) have anything found in this (short) array index
			//"https://youtube.com/#*(&$)*&*(*)whatever".indexof("youtube")
			if(checkString.indexOf(testArray[i]) != -1)
			{
			  strIndx = i;
			}
		}//end for

		return strIndx;

	}//checkStringForArray

        this.setListNumber = function(str){listNumber = parseInt(str);}


        this.getObjectName = function(){return objectName;}

        this.setTextTag = function(str)
        {//create regExp checker
            text_tag = str;
        }//end setHtag

        /*sets the element you want moved / or where its coming from*/
        this.setMoveTarget = function(str){ move_target_str = str;}

		this.setClear = function(){set_clear = "true";}
		this.setCustomClass = function(clsAry,addPar){custom_class = clsAry; add_to_class = addPar || true;/*addPar is nothing yet*/}

		this.get_event_ids = function(){return event_ids;}

		this.setInputAttributes = function(iObj){ obj_attributes.push(iObj);}

		this.setCustomId = function(cId){custom_id = cId; id_type = "custom";}
		this.setSelectOptions = function(sAry){select_options = sAry;}

		this.setCustomSelect = function(oStr)
		{
			if(type != "slider")
			{
				custom_select = "true";
				custom_select_str = oStr || "custom";
			}
		}//end if setCustomSelect

		this.runDataCheck = function(){

			//data_check_object_str = JSON.stringify(data_check_object);

			for(var dc = 0; dc < data_check_array.length; dc++)
			{
				dataCheck(data_check_array[dc]);

			}//end for

		}//end runDataCheck

		this.setCasing = function(){casing = "true";}



		var custom_input_id = "";
		var custom_select_id = "";


        var iconList = ['action','alert','arrow-d','arrow-d-l',
        'arrow-d-r','arrow-l','arrow-r','arrow-u','arrow-u-l',
        'arrow-u-r','audio','back','bars','bullets','calendar',
        'camera','carat-d','carat-l','carat-r','carat-u','check',
        'clock','cloud','comment','delete','edit','eye',
        'forbidden','forward','gear','grid','heart','home',
        'info','location','lock','mail','minus','navigation',
        'phone','plus','power','recycle','refresh','search',
        'shop','star','tag','user','video'];

        var iconBoxDisplay = function()
        {
			/************************************** Sample Code ****************************************
			window['miko'] = new masterButtons({varName:'miko',home:'.masBtn_tab-pane0',type:'iconBox'});
			//miko.iconBoxDisplay();
			//miko.setIconDisplay('hidden');//works
			//miko.setSelectedIcon("bullets");works
			miko.display();
			********************************************************************************************/



            //Needed properties - home - name of the group class container

            var homeContainer = (/*stringType == "class"*/document.getElementById(home)) ? document.getElementById(home) : document.getElementsByClassName(home)[0];
            //clear the stage
            homeContainer.innerHTML = "";

            homeContainer.style.minHeight = "100px";

            //needs text
            //icon prep
            var iBoxtext = document.createElement('h5');
            iBoxtext.innerHTML = "Select an icon";
            iBoxtext.className = prefix + "_iBox_text";
            homeContainer.appendChild(iBoxtext);

            //masterCont - goes into the homeContainer
            var masBtnCont = document.createElement('div');
            masBtnCont.className = prefix + "_MBCont " + prefix + "_MBCont" + iUN;//controls
            //masBtnCont.style = "border:1px solid yellow;height:auto;margin:auto;width:60%;";//script in css

            //masterButton Icon Menu - goes into masterCont
            var masBtnIconMenu = document.createElement('div');
            masBtnIconMenu.className = prefix + "_icon_menu " + prefix + "_icon_menu" + iUN;
            //masBtnIconMenu.style = "height:100px; border:1px solid red; overflow-y:auto;width:50%;";//script in css
            //buttons go in the icon menu

            //master Button Select Container - goes into MasterCont
            var masBtnSelectCont = document.createElement('div');
            masBtnSelectCont.className = prefix + "_Choice_cont " + prefix + "_Choice_cont" + iUN;
            //masBtnSelectCont.style = "border:1px solid grey;float:left;height:100px;width:30%;";

            //master Button Choice - goes into master Button Select Container
            //I need to create selected button & hide it
            newSelectBtn = document.createElement('div');
            newSelectBtn.id = prefix + '_Choice' + iUN;
            newSelectBtn.className = "well " + prefix + "_Choice " + prefix + "_Choice" + iUN + " jqm_icon_" + selectedIcon;
            //newSelectBtn.style = "height:25px;width:25px;float:left;";
            newSelectBtn.setAttribute('data-value',selectedIcon);
            newSelectBtn.title = selectedIcon + " icon";
            newSelectBtn.name = selectedIcon;
            newSelectBtn.style.visibility = iconDisplay;


            //show Hide display icon button
            toggleDisplayBtn = document.createElement('div');
            toggleDisplayBtn.id = prefix + '_toggleDisplay' + iUN;
            toggleDisplayBtn.className = (iconDisplay == 'visible') ? "well btn-success " + prefix + "_toggleDisplay "
            + prefix + "_toggleDisplay" + iUN : "well btn-danger " + prefix + "_toggleDisplay " + prefix + "_toggleDisplay" + iUN  ;

            toggleDisplayBtn.title = "switch Display on and off";
            toggleDisplayBtn.setAttribute('onclick',"minorButtons({'action':'changeDisplayIcon','objectName':'" + objectName + "','toggle':'" + iconDisplay + "'})");
            toggleDisplayBtn.innerHTML = (iconDisplay == 'visible') ? "ON" : "OFF";


            masBtnCont.appendChild(masBtnIconMenu);
            masBtnCont.appendChild(masBtnSelectCont);
            var clearer = document.createElement('div');
            clearer.className = "clr";
            masBtnCont.appendChild(clearer);

            masBtnSelectCont.appendChild(newSelectBtn);
            masBtnSelectCont.appendChild(toggleDisplayBtn);
            homeContainer.appendChild(masBtnCont);


            //creates menu of buttons to choose from
            for(i=0;i < iconList.length; i++)
            {
               newBtn = document.createElement('button');
               newBtn.type = "button";
               newBtn.className = "well jqm_btn jqm_" + prefix + "btn jqm_icon_" + iconList[i];
               newBtn.setAttribute("onclick","minorButtons({'action':'showCaseIcon','objectName':'" + objectName + "'})");

               /*
               I need to see one of these to see if it works
               originally I tried puting the brackets in quotes '{'action':'pressbutton'}'
               */

               newBtn.style = "height:25px;width:25px;float:left;";//display:none
               newBtn.title =  iconList[i] + " icon";
               newBtn.name =  iconList[i];

               masBtnIconMenu.appendChild(newBtn);

            }//end for

        }//end iconBoxDisplay

        this.showCaseIcon = function(rData)
        {
            //alert("I'm Back");
           //manages the view/style once an icon button is pressed
           var uPBN = 'jqm_' + prefix + 'btn'; //+ iUN

           /*if Im successfully using buttons and not divs this code is redundant
           buttons automatically activate and inactivate*/
            var btnClass = document.getElementsByClassName(uPBN);
            for(var i=0;i < btnClass.length; i++ )
            {
               //resets all the buttons to inactive
               var btnAdjust = document.getElementsByClassName(uPBN)[i];
               btnAdjust.btnStatus = "inactive";

            }

            var e = event || window.event;

            //then activates that target
            var curBtn = e.srcElement;
            curBtn.btnStatus = "active";
            //alert("icon name = " + curBtn.name);

            //it just changes the attributes of the choice sample to match the users preference
            uBtnChoice = prefix + '_Choice' + iUN;
            var tBtn = document.getElementById(uBtnChoice);
            tBtn.className = "well " + prefix + "_Choice " + prefix + "_Choice" + iUN + " jqm_icon_" + curBtn.name;
            tBtn.title = curBtn.name + " icon";
            tBtn.name = curBtn.name;

            selectedIcon = curBtn.name;

          /*alert("b1 status = " + b1.btnStatus + "\n b2 status = " + b2.btnStatus + "\n b3 status = " + b3.btnStatus +
           "\n \n b1 classname is " + b1.className + "\n b2 classname is " + b2.className + "\n b3 classname is " + b3.className );*/

        }// end showCaseIcon

        this.changeDisplayIcon = function(actn)
        {

            //alert();
            var e = event || window.event;
            //then activates that target
            var current_Btn = e.srcElement;



            var idStr = prefix + '_Choice' + iUN;
             var tBtn = document.getElementById(idStr);
            //var tst = bVTest.options.length;

            if(actn == "visible")
            {
                tBtn.style.visibility = "hidden";
                current_Btn.setAttribute("onclick","minorButtons({'action':'changeDisplayIcon','objectName':'" + objectName + "','toggle':'hidden'})");
                current_Btn.className = "well btn-danger " + prefix + "_toggleDisplay " + prefix + "_toggleDisplay" + iUN ;
                current_Btn.innerHTML = "OFF";
                current_Btn.title = "click to turn the icon's display on.";
                iconDisplay = "hidden";
            }else
            {
                tBtn.style.visibility = "visible";
                current_Btn.setAttribute("onclick","minorButtons({'action':'changeDisplayIcon','objectName':'" + objectName + "','toggle':'visible'})");
                current_Btn.className = "well btn-success " + prefix + "_toggleDisplay " + prefix + "_toggleDisplay" + iUN ;
                current_Btn.innerHTML = "ON";
                current_Btn.title = "click to turn the icon's display off.";

                iconDisplay = "visible";
            }


        }//end changeDisplayIcon

        var groupButtonDisplay = function()
        {
			/****************************************** Sample Code *********************************************
			window['mIICol'] = new masterButtons({varName:'mIICol',home:'.mIList_ListArea1',type:'buttonGroup'});
            mIICol.setPrefix('mIICol');
            mIICol.setLabels(['Default','Black']);
            mIICol.setTitles(['Default colors icons white','Color icons black.']);
            mIICol.setGroupLabel('icon color?');
			mIICol.setCustomClass(["ui-icon-notification ui-btn ui-btn-icon-notext ui-shadow ui-btn-inline","ui-icon-mail ui-btn ui-btn-icon-notext ui-shadow ui-btn-inline"]);
			mIICol.setCasing();
            mIICol.display();

			//use the event id function
			var event_id_array = mIICol.get_event_ids();
			var targetElement = document.getElementById(event_id_array[0]);
			targetElement.onclick = function(){alert("id additions work")};
			******************************************************************************************************/

			if(labels == undefined || labels == [] || labels[0] == "")
            {
                    alert("button needs a label, \n add an array of labels to \n the setLabels method. ");
					return;
			}

            //button prep
            //this one originally used an id.  but now it doesn't matter
            var homeCont = (/*stringType == "class"*/document.getElementById(home)) ?document.getElementById(home) : document.getElementsByClassName(home)[0];//"option1"

            //clear the stage
			if(clearHome == "true"){
				homeCont.innerHTML = "";
            }

			if(casing != "false"){

				var newObj_casing = document.createElement('div');
				newObj_casing.id = prefix + "_TCasing" + iUN + "_" + i;
				newObj_casing.className = prefix + "_TCasing" + iUN + "_" + i + " " + prefix + "_TCasing "  + prefix + "_TCasing" + i + " TCasing " + add_custom_class;

			}//end if casing


            var groupContainer = document.createElement('div');
            groupContainer.className = "btn-group " + prefix + "_groupCont " + prefix + "_groupCont" + iUN;



            if(labelText != "")
            {
                var labelText = document.createElement('div');
                labelText.innerHTML = "<h4>" + groupLabelText + "</h4>";
                labelText.className = prefix + "_labelText labelText " + prefix + "_labelText" + iUN;

				if(casing != "false"){
					newObj_casing.appendChild(labelText);
				}else{
					homeCont.appendChild(labelText);
				}

            }

            //use labels array to determine how many buttons to set
            //if the titles array is used, use it along with the labels if not use a conditional operator for blank strings
            var lengthVariable = labels.length || 1;

            for(var i=0; i < lengthVariable; i++)
            {
                var newBtn = document.createElement('button');
                newBtn.type = "button";

				var add_custom_class = (custom_class.length > 1) ? " " + custom_class[i] + " " :(custom_class.length == 1) ? " " + custom_class[0] + " " : "";

                //repeated in chooseButton for statement
                /*newBtn.className = "btn btn-primary " + prefix + "_primary " + prefix + "_primary" + i + " "
                + prefix + "_primary" + iUN + " " + prefix + "_btn_group" + iUN + "_" + i + " ";*/

                newBtn.className = "btn " + prefix + "_btn_group " + prefix + "_btn_group" + i + " "
                + prefix + "_btn_group" + iUN + " " + prefix + "_btn_group" + iUN + "_" + i + " " + add_custom_class;

                newBtn.id = prefix + "_btn_group" + iUN + "_" + i;
				event_ids.push(newBtn.id);

                //here is the only place where capital letters are needed
                newBtn.innerHTML = labels[i] || "";
                if(labels[i] == undefined || labels == []  || labels[i] == "")
                {
                    alert("button needs a label, \n add an array of labels to \n the setLabels method. ");
					return;
                }else
                {
                    newBtn.setAttribute('data-value',labels[i]);
                    //newBtn.setAttribute('onclick',"minorButtons({'action':'chooseButton','objectName':'" + objectName + "'})");
					newBtn.addEventListener('click',function(){chooseButton();});
                    newBtn.title = titles[i] || "";

                    //sets start/default selection
                    if(labels[i].toLowerCase()  == selectedButton.toLowerCase() )
                    {
						newBtn.className += " active ";
						currentValue = selectedButton;

					}

                }//end if



                groupContainer.appendChild(newBtn);

				if(casing != "false"){

					newObj_casing.appendChild(groupContainer);
					homeCont.appendChild(newObj_casing);
				}else{

					homeCont.appendChild(groupContainer);
				}

            }//end for

            var clearer = document.createElement('div');
            clearer.className = "clr";
            homeCont.appendChild(clearer);

			//if selectedButton is still empty
			if(labels[0] != undefined && selectedButton == "")
			{
				selectedButton = labels[0];
				currentValue = selectedButton;
			}


        }//end groupButtonDisplay


        this.chooseButton = function(){chooseButton();}
		var chooseButton = function()
        {
            var e = event || window.event;
            //then activates that target
            var current_Btn = e.srcElement;


            var groupStr = prefix + "_btn_group" + iUN;
           var buttonGroup = document.getElementsByClassName(groupStr);
           for(var i = 0; i < buttonGroup.length; i++)
           {
                var modBtn = document.getElementsByClassName(groupStr)[i];
               /*modBtn.className = "btn btn-primary " + prefix + "_primary " + prefix + "_primary" + i + " "
                + prefix + "_primary" + iUN + " " + prefix + "_btn_group" + iUN + "_" + i + " ";*/

				var add_custom_class = (custom_class.length > 1) ? " " + custom_class[i] + " " :(custom_class.length == 1) ? " " + custom_class[0] + " " : "";

                modBtn.className = "btn " + prefix + "_btn_group " + prefix + "_btn_group" + i + " "
                + prefix + "_btn_group" + iUN + " " + prefix + "_btn_group" + iUN + "_" + i + " " + " " + add_custom_class;
            }//end for

            current_Btn.className += " active ";
            selectedButton = current_Btn.dataset.value;
            selectedButtonObject = {'btn':current_Btn,'value':current_Btn.dataset.value};

			currentValue = selectedButton;

        }//end chooseButton



        var tabContentDisplay = function(nbr)
        {
		/********************************* Sample Code *******************************************
			window['mIOt'] = new masterButtons({varName:'mIOt',home:'.menu_items_modal',type:'tabs'});
            mIOt.setPrefix('mIOt');
            mIOt.setLabels(['option 1','option 2']);
            mIOt.display();

			add 'pills' to change tabs to pills
			//bootstrap not JQueryMobile
		*******************************************************************************************/


            /*
            <div class="menu_options_box container">
                <ul class="nav nav-tabs"></ul>
                <div class="tab-content"></div>
            </div>
            */

            //alert("data object is " + dataObject);
                //mcust_option1 menu_custom_option
                //               <ul class="nav nav-tabs mcust_List"></ul>
                                                    //<div class="mcust_tab-content"></div>

				if(labels == undefined || labels == [] || labels[0] == "")
                {
                    newBtn.title = "tab needs a label, \n add single string or an array of labels to \n the setLabels method. ";
					return;
                }//end if

                var bigDaddy = (/*stringType == "class"*/document.getElementById(home)) ? document.getElementById(home) : document.getElementsByClassName(home)[0];
                var listEl = document.createElement('ul');
                var listStr = prefix + "_List";
                listEl.className = "nav nav-" + type + " " + prefix + "_List " + prefix + "_List" + iUN;

                var contentEl = document.createElement('div');
                var contentStr = prefix + "_tab-content";//

                contentEl.className = contentStr;


                //clear the parent node data
				if(clearHome == "true"){
					bigDaddy.innerHTML = "";
				}

                bigDaddy.appendChild(listEl);
                bigDaddy.appendChild(contentEl);

                var listTarget = document.getElementsByClassName(listStr)[0];
                var contentTarget = document.getElementsByClassName(contentStr)[0];

            var lengthVariable = labels.length || 1;


            for(var i=0;i<lengthVariable;i++)
            {
              var optionId = prefix + "_option" + i;
              var tabId = prefix + "_option_tab" + i;

                //tab links
                var newListObj = document.createElement('li');
                newListObj.className = prefix + "_tab_line " + i + " tab_line " + prefix + "_tab_line "
                + prefix + "_tab_line" + iUN + "_" + i + " " + prefix + "_tab_line" + iUN + " ";//also in switchTabs

                if(i == 0 && type == "tabs"){/**/newListObj.className += " active "}
                listTarget.appendChild(newListObj);

                var newLinkObj = document.createElement('a');
                newLinkObj.id = tabId;
                newLinkObj.setAttribute('data-toggle','tab');
                newLinkObj.setAttribute('href',optionId);
                //newLinkObj.setAttribute('onclick','switchTabs()');//depreciated
                newLinkObj.setAttribute('onclick',"minorButtons({'action':'switchTabs','objectName':'" + objectName + "'})");
                newLinkObj.setAttribute('data-option',optionId);
                newLinkObj.setAttribute('data-tab',tabId);
                var tabText = labels[i] || "option " + (i+1);
                newLinkObj.innerHTML = tabText;
                newListObj.appendChild(newLinkObj);


                //needs a matching class
                //tab content area
                var newTabObj = document.createElement('div');
                newTabObj.id = optionId;
                newTabObj.className = prefix + "_tab-pane" + i + " tab-pane " + prefix + "_tab-pane tCG "
                + prefix + "_tab-pane" + iUN + "_" + i + " " + prefix + "_tab-pane" + iUN + " " ;//also in switchTabs

                if(i == 0){/**/ newTabObj.className += " active ";}
                contentTarget.appendChild(newTabObj);

                if(i == 0){/**/ newTabObj.style.display = "block";}
                else{newTabObj.style.display = "none";}


            }//end for

        }//end tabContentDisplay


        this.switchTabs = function()
        {
            var e = event || window.event;
            var current_tab = e.srcElement;
            var activeLink = current_tab.dataset.option;
            var activeTab = current_tab.dataset.tab;
            var tabGroupClass = prefix + "_tab-pane" ;// + iUN
            var tabGroup = document.getElementsByClassName(tabGroupClass);// too broad 'tCG'

            for(var i=0; i < tabGroup.length; i++)
            {
                /*bugfix - getting element by classname and display = none was
                doing somethingstrange blanking out the entire modal window
                so I switched to using id's here*/


                var optionStr = prefix + "_option" + i;//content area
                var tabStr = prefix + "_option_tab" + i;//tab area

                var prepDisplay = document.getElementById(optionStr);
                prepDisplay.className = prefix + "_tab-pane" + i + " tab-pane " + prefix + "_tab-pane tCG "
                + prefix + "_tab-pane" + iUN + "_" + i + " " + prefix + "_tab-pane" + iUN + " " ;
                prepDisplay.style.display = "none";

                var prepTab = document.getElementById(tabStr);
                prepTab.className = prefix + "_tab_line" + i + " tab_line " + prefix + "_tab_line "
                + prefix + "_tab_line" + iUN + "_" + i + " " + prefix + "_tab_line" + iUN + "_";
                prepTab.style.border = "none";

            }//end for

            var setDisplay = document.getElementById(activeLink);
            setDisplay.className = prefix + "_tab-pane" + i + " tab-pane " + prefix + "_tab-pane tCG active "
            + prefix + "_tab-pane" + iUN + "_" + i + " " + prefix + "_tab-pane" + iUN + "_";
            setDisplay.style.display = "block";

            var setTab = document.getElementById(activeTab);
            setTab.className += " active ";
            setTab.style.border = "1px solid #ccc";



        }//end switchTabs


        var tab_reset = function()
        {

            var tabGroupClass = prefix + "_tab-pane" ;// + iUN
            var tabGroup = document.getElementsByClassName(tabGroupClass);// too broad 'tCG'

            for(var i=0; i < tabGroup.length; i++)
            {
                var optionStr = prefix + "_option" + i;//content area
                var tabStr = prefix + "_option_tab" + i;//tab area

               if(i == 0)
               {
                    var setDisplay = document.getElementById(optionStr);
                    setDisplay.className = prefix + "_tab-pane" + i + " tab-pane " + prefix + "_tab-pane tCG active "
                    + prefix + "_tab-pane" + iUN + "_" + i + " " + prefix + "_tab-pane" + iUN + "_";
                    setDisplay.style.display = "block";

                    var setTab = document.getElementById(tabStr);
                    setTab.className += " active ";
                    setTab.style.border = "1px solid #ccc";
                }//end if
                else
                {
                    var prepDisplay = document.getElementById(optionStr);
                    prepDisplay.className = prefix + "_tab-pane" + i + " tab-pane " + prefix + "_tab-pane tCG "
                    + prefix + "_tab-pane" + iUN + "_" + i + " " + prefix + "_tab-pane" + iUN + " " ;
                    prepDisplay.style.display = "none";

                    var prepTab = document.getElementById(tabStr);
                    prepTab.className = prefix + "_tab_line" + i + " tab_line " + prefix + "_tab_line "
                    + prefix + "_tab_line" + iUN + "_" + i + " " + prefix + "_tab_line" + iUN + "_";
                    prepTab.style.border = "none";

                }//end else

            }//end for


        }//end tab_reset


        var listContentDisplay = function(nbr)
        {
            /**************************************  Sample Code ****************************************
			window['mIList'] = new masterButtons({varName:'mIList',home:'.mIOt_tab-pane1',type:'list'});
            mIList.setPrefix('mIList');
            mIList.setListNumber(4);
			mIList.setCustomClass(["arc_select"]);
			mIList.setInputAttributes({"placeholder":"enter a message title"});
            mIList.display();

			var event_id = mIList.get_event_ids();
			var targetElement = document.getElementById(fyi_event_id[0]);
			targetElement.oninput = function(){
			}
			********************************************************************************************/

            //alert("data object is " + dataObject);
			//mcust_option1 menu_custom_option
			var list_el = (type == "ul") ? "ul" : (type == "ol") ? "ol" : (type == "li") ? "li" : "div";

			var bigDaddy = (/*stringType == "class"*/document.getElementById(home)) ? document.getElementById(home) : document.getElementsByClassName(home)[0];
			//clears container
			if(clearHome == "true"){
				bigDaddy.innerHTML = "";
			}

			var add_custom_class = (custom_class.length == 1) ? " " + custom_class[0] + " " : " ";

            for(var i=0;i < listNumber; i++)
            {
                var newObj = document.createElement(list_el);

                newObj.id = prefix + "_ListArea" + "_" + i;// old id prefix + "_ListArea" + iUN + "_" + i;

				event_ids.push(newObj.id);

				newObj.className = prefix + "_ListArea" + iUN + "_" + i + " " + prefix + "_ListArea "  + prefix + "_ListArea" + i + " ListArea " + add_custom_class;

				//helps read setup setInputAttributes json parameters
				for(var x = 0; x < obj_attributes.length; x++)
				{
					var pNameAry = Object.getOwnPropertyNames(obj_attributes[x]);
					var pName = pNameAry[0];
					newObj.setAttribute(pName,obj_attributes[x][pName]);
					//console.log(newObj);

				}//end for

				if(fill_content != ""){newObj.innerHTML = fill_content;}

                bigDaddy.appendChild(newObj);
            }//end for

        }//end listContentDisplay


        var textContentDisplay = function()
        {
			/************************************* Sample Code ******************************************
			window['exTxt'] = new masterButtons({varName:'exTxt',home:'.mIList_ListArea2',type:'text_box'});
			exTxt.setLabels(['Other options:']);
			exTxt.setTextTag('h4');
			exTxt.setPrefix('exTxt');
			exTxt.display();

			var event_id = exTxt.get_event_ids();
			var targetElement = document.getElementById(fyi_event_id[0]);
			targetElement.oninput = function(){
			}
			*********************************************************************************************/

            //alert("data object is " + dataObject);
            //gets container

			if(labels == undefined || labels == [] || labels[0] == "")
            {
                    alert("use the setLabels method to set the text for your title or paragraph area.\n use the setTitle method to set the title for your text element.");
					return;
			}


               var bigDaddy = (/*stringType == "class"*/document.getElementById(home)) ? document.getElementById(home) : document.getElementsByClassName(home)[0];
                //clears container
				if(clearHome == "true"){
					bigDaddy.innerHTML = "";
                }

                for(var i=0;i < labels.length; i++)
                {
                    var newObj = document.createElement(text_tag);
                    newObj.className = prefix + "_TTag" + iUN + "_" + i + " " + prefix + "_TTag "  + prefix + "_TTag" + i + " TTag ";
                    newObj.id = prefix + "_TTag" + iUN + "_" + i;

                    if(labels[i] == undefined || labels[i] == "")
                    {
                        alert("use the setLabels method to set the text for your title or paragraph area.\n use the setTitle method to set the title for your text element.");
                    }else
                    {
                        newObj.innerHTML = labels[i];
                        newObj.title = (titles[i] != undefined) ? titles[i] : "";
                        bigDaddy.appendChild(newObj);
                    }//end else
                }//end for

        }//end textContentDisplay


        var labelBoxDisplay = function()
        {

			/********************************  Sample Code  *****************************************
			window['exTxt2'] = new masterButtons({varName:'exTxt2',home:'.mIList_ListArea3',type:'label_box'});
            exTxt2.setLabels(['Link:']);
            exTxt2.setTextTag('h4');
            exTxt2.setPrefix('exTxt2');
            exTxt2.display();
			***************************************************************************************/

            //alert("data object is " + dataObject);
            //gets container
			if(labels == undefined || labels == [] || labels[0] == "")
            {
                    alert("use the setLabels method to set the text for your title or paragraph area.\n use the setTitle method to set the title for your text element.");
					return;
			}

               var bigDaddy = (/*stringType == "class"*/document.getElementById(home)) ? document.getElementById(home) : document.getElementsByClassName(home)[0];
                //clears container
				if(clearHome == "true"){
					bigDaddy.innerHTML = "";
				}

                for(var i=0;i < labels.length; i++)
                {
                    var newTag = document.createElement(text_tag);
                    newTag.className = prefix + "_LBTag" + iUN + "_" + i + " " + prefix + "_LBTag "  + prefix + "_LBTag" + i + " LBTag ";
                    newTag.id = prefix + "_LBTag" + "_" + i;

                    var newLBox = document.createElement('div');
                    newLBox.className = prefix + "_LBox" + iUN + "_" + i + " " + prefix + "_LBox "  + prefix + "_LBox" + i + " LBox ";
                    newLBox.id = prefix + "_LBox" + "_" + i;

					var newClr = document.createElement('div');
                    newClr.className = prefix + "_Clear" + iUN + "_" + i + " " + prefix + "_Clear "  + prefix + "_Clear" + i + " Clear clear clr";
                    newClr.id = prefix + "_Clear" + "_" + i;

					if(fill_content != ""){newLBox.innerHTML = fill_content;}

                    if(labels[i] == undefined || labels[i] == "")
                    {
                        alert("use the setLabels method to set the text for your title or paragraph area.\n use the setTitle method to set the title for your text element.");
                    }else
                    {
                        newTag.innerHTML = labels[i];
                        newTag.title = (titles[i] != undefined) ? titles[i] : "";
                        bigDaddy.appendChild(newTag);
                        bigDaddy.appendChild(newLBox);
						if(set_clear = "true"){bigDaddy.appendChild(newClr);}

                    }//end else
                }//end for



        }//end labelBoxDisplay

		var tagDisplay = function()
        {

			/********************************  Sample Code  *****************************************
			window['exTxt2'] = new masterButtons({varName:'exTxt2',home:'mIList_ListArea3',type:'tag'});
			exTxt2.setTextTag('h4');
            exTxt2.setPrefix('exTxt2');
			exTxt2.setCustomClass(["clr clear"]);
			exTxt2.setContent('text content');
			exTxt2.clearHome("false");
            exTxt2.display();
			***************************************************************************************/

            //alert("data object is " + dataObject);
            //gets container
               var bigDaddy = (/*stringType == "class"*/document.getElementById(home)) ? document.getElementById(home) : document.getElementsByClassName(home)[0];
                //clears container
				if(clearHome == "true"){
					bigDaddy.innerHTML = "";
				}

				var add_custom_class = (custom_class.length == 1) ? " " + custom_class[0] + " " : "";

				var newTag = document.createElement(text_tag);
				newTag.id = prefix + "_TDTag" + "_" + i;

				event_ids.push(newTag.id);

				newTag.className = prefix + "_TDTag" + iUN + "_" + i + " " + prefix + "_TDTag "  + prefix + "_LBTag" + i + " LBTag " + add_custom_class;

				if(fill_content != ""){newTag.innerHTML = fill_content;}

        for(var x = 0; x < obj_attributes.length; x++)
        {
          var pNameAry = Object.getOwnPropertyNames(obj_attributes[x]);
          var pName = pNameAry[0];
          newTag.setAttribute(pName,obj_attributes[x][pName]);
          //console.log(newObj);

        }//end for


        bigDaddy.appendChild(newTag);


        }//end tagDisplay



        //this is split into two parts just in case the container has to be filled with something else and erases its
        //contents before it fills it.
        var moveElements = function()
        {
            moveType = "contents";
            //this is where its coming from
            //var tarEl = prepElementStringType(move_target_str);//tarEl = target elements
            move_target = move_target_str;//tarEl.target;
            //move_element_type = tarEl.type;

            //locates the focus/target of the move
            var targetCont = (/*move_element_type == "class"*/ document.getElementById(move_target)) ? document.getElementById(move_target) : document.getElementsByClassName(move_target)[0];

            //stores the contents here
            target_contents = targetCont.innerHTML;

			//blank out the Original location?
			targetCont.innerHTML = "";

        }//end moveElements

        var moveElement = function()
        {
            moveType = "element";
            //this is where its coming from
            //var tarEl = prepElementStringType(move_target_str);//tarEl = target elements
            move_target = move_target_str;//tarEl.target;
            //move_element_type = tarEl.type;

            //locates the focus/target of the move
            var targetCont = (/*move_element_type == "class"*/ document.getElementById(move_target)) ? document.getElementById(move_target) :  document.getElementsByClassName(move_target)[0];

            //stores the contents here
            target_contents = targetCont;
            //targetCont.cloneNode(true);

        }//end moveElement


        this.move = function(str)
        {
            //home and bigDaddy is where its going
            var bigDaddy = (/*stringType == "class"*/document.getElementById(home)) ? document.getElementById(home) : document.getElementsByClassName(home)[0];
            //also the home may not exist yet when you call the moveElement section
            var modifier = str || "";
            //moves the elements

            switch(moveType)
            {
                case "contents":
                    if(modifier == "add")
                    {
                        bigDaddy.innerHTML += target_contents;
                    }else
                    {
                        bigDaddy.innerHTML = target_contents;
                    }
                break;

                case "element":
                    if(modifier == "add")
                    {
                        bigDaddy.appendChild(target_contents);
                    }else
                    {
                        bigDaddy.innerHTML = "";
                        bigDaddy.appendChild(target_contents);
                    }
                break;

            }

            //destroy the evidence
            //targetCont.innerHTML = "";
             //no need to do any erasing
        }//end move

        this.reset = function()
        {
            switch(type)
            {

                case "buttongroup":
                    //button reset
                    var setting = "";

                    if(start != "" && start != undefined)
                    {
                        setting = start;
                    }else
                    {
                        setting = labels[0];
                    }
                    //set button classname to initial setting
                    for(var i = 0; i < labels.length; i++)
                    {
                        var groupClass = prefix + "_btn_group";
                        var buttonGroup = document.getElementsByClassName(groupClass);
                        var targBtn = document.getElementsByClassName(groupClass)[i];
                        targBtn.className = "btn " + prefix + "_btn_group " + prefix + "_btn_group" + i + " "
                        + prefix + "_btn_group" + iUN + " " + prefix + "_btn_group" + iUN + "_" + i + " ";
                        if(targBtn.dataset.value == setting)
                        {
                            targBtn.className += " active ";
                        }//end if



                    }//end for

                break;

                case "tabs":

                tab_reset();

                break;

                case "pills":

                tab_reset();

                break;

            }
        }//end reset

		//TODO:170 Needs a reset
		var create_text_input = function()
		{
			/************************************* Sample Code ******************************************
			window['exTxt'] = new masterButtons({varName:'exTxt',home:'.mIList_ListArea2',type:'text'});
			exTxt.setLabels(['Title:']);
			exTxt.setTitles(['Message title']);
			exTxt.setPlaceholders(['Enter a Message title']);//can manage for multiple entries
			exTxt.setPrefix('exTxt');
			exTxt.setText('Anything');
			testTxt.setInputAttributes({"placeholder":"enter a message title"});//another way to set placeholder - single entry for now
			exTxt.setInputAttributes({"maxlength":10});
			exTxt.setInputAttributes({"required":true});
			exTxt.display();

			var event_id = exTxt.get_event_ids();
			var targetElement = document.getElementById(fyi_event_id[0]);
			targetElement.oninput = function(){
			}

			*********************************************************************************************/

			 //alert("data object is " + dataObject);
            //gets container
               var bigDaddy = (/*stringType == "class"*/document.getElementById(home)) ? document.getElementById(home) : document.getElementsByClassName(home)[0];
                //clears container
				if(clearHome == "true"){
					bigDaddy.innerHTML = "";
				}

                for(var i=0; i < labels.length; i++)
                {

                    if(labels[i] == undefined)
                    {
						//deprecated
                        alert("use the setLabels method to set the text for your title or paragraph area.\n use the setTitle method to set the title for your text element.");
                    }else
                    {
						var add_custom_class = (custom_class.length > 1) ? " " + custom_class[i] + " " :(custom_class.length == 1) ? " " + custom_class[0] + " " : "";

						//casing
						if(casing != "false"){

							var newObj_casing = document.createElement('div');
							newObj_casing.id = prefix + "_TCasing" + iUN + "_" + i;
							newObj_casing.className = prefix + "_TCasing" + iUN + "_" + i + " " + prefix + "_TCasing "  + prefix + "_TCasing" + i + " TCasing " + add_custom_class;

						}//end if casing




						var newObj_label = document.createElement('label');
						newObj_label.id = prefix + "_TLabel" + iUN + "_" + i;

						if(has_labels == "true"){

						newObj_label.className = prefix + "_TLabel" + iUN + "_" + i + " " + prefix + "_TLabel "  + prefix + "_TLabel" + i + " TLabel " + add_custom_class;
						newObj_label.setAttribute("for",prefix + "_TInput" + iUN + "_" + i);
						newObj_label.innerHTML = labels[i];
						newObj_label.title = (titles[i] != undefined) ? titles[i] : "";

						}else{
						newObj_label.style.display = "none";
						}


						var newObj_txt_cont = document.createElement('div');
						newObj_txt_cont.id = prefix + "_TCont" + iUN + "_" + i;
						newObj_txt_cont.className = prefix + "_TCont" + iUN + "_" + i + " " + prefix + "_TCont "  + prefix + "_TCont" + i + " TCont " + add_custom_class;


							var newObj_input = document.createElement('input');
							newObj_input.id = (id_type == "custom") ? custom_id :prefix + "_TInput" + iUN + "_" + i;

							event_ids.push(newObj_input.id);

							newObj_input.className = prefix + "_TInput" + iUN + "_" + i + " " + prefix + "_TInput "  + prefix + "_TInput" + i + " TInput " + add_custom_class;
							newObj_input.type = "text";

							var newPlace = (placeholders[i] != undefined) ? placeholders[i] : "";

							//newObj_label.type = () ? "tel" : "";


							if(newPlace != ""){
								newObj_input.setAttribute("placeholder",newPlace);
							}

							if(inner_html != ""){
								newObj_input.value = inner_html;
							}

							//helps read setup setInputAttributes json parameters
							for(var x = 0; x < obj_attributes.length; x++)
							{
								var pNameAry = Object.getOwnPropertyNames(obj_attributes[x]);
								var pName = pNameAry[0];
								newObj_input.setAttribute(pName,obj_attributes[x][pName]);
								//console.log(newObj_input);

							}//end for

							newObj_input.title = (titles[i] != undefined) ? titles[i] : "";

							var newObj_txt_tally = document.createElement('div');
							newObj_txt_tally.id = prefix + "_TTly" + iUN + "_" + i;
							newObj_txt_tally.className = prefix + "_TTly" + iUN + "_" + i + " " + prefix + "_TTly "  + prefix + "_TTly" + i + " TTly " + add_custom_class;

							var ch_lim = (newObj_input.attributes.maxlength != undefined) ? newObj_input.attributes.maxlength.value : 25;

							data_check_array = data_check_array.concat({"msg_id":newObj_txt_tally.id,"input_id":newObj_input.id,"char_limit":ch_lim,"type":type});

							newObj_input.oninput = function(){
								var ch_lim = (newObj_input.attributes.maxlength != undefined) ? newObj_input.attributes.maxlength.value : 25;

								var in_id =  newObj_input.id;
								var ms_id = newObj_txt_tally.id;

								dataCheck({"msg_id":ms_id,"input_id":in_id,"char_limit":ch_lim,"type":type});

								extractData(newObj_input.id,type);
							};

						newObj_txt_cont.appendChild(newObj_input);
						newObj_txt_cont.appendChild(newObj_txt_tally);

						if(casing != "false"){
							newObj_casing.appendChild(newObj_label);
							newObj_casing.appendChild(newObj_txt_cont);
							bigDaddy.appendChild(newObj_casing);
						}else{
							bigDaddy.appendChild(newObj_label);
							bigDaddy.appendChild(newObj_txt_cont);
						}

                    }//end else

					extractData(newObj_input.id,type);

                }//end for




		}//end create_text_input


		var create_textarea = function()
		{
			/************************************* Sample Code ******************************************
			window['exTxt'] = new masterButtons({varName:'exTxt',home:'.mIList_ListArea2',type:'textarea'});
			exTxt.setLabels(['Title:']);
			exTxt.setTitles(['Message title']);
			exTxt.setPlaceholders(['Enter a Message title']);
			exTxt.setPrefix('exTxt');
			exTxt.setCustomClass(["arc_select"]);
			exTxt.setInputAttributes({"required":true});
			exTxt.setCasing();
			exTxt.clearHome("false");
			exTxt.display();

			var event_id = exTxt.get_event_ids();
			var targetElement = document.getElementById(fyi_event_id[0]);
			targetElement.oninput = function(){
			}
			*********************************************************************************************/

			 //alert("data object is " + dataObject);
            //gets container
               var bigDaddy = (/*stringType == "class"*/document.getElementById(home)) ? document.getElementById(home) : document.getElementsByClassName(home)[0];
                //clears container
				if(clearHome == "true"){
					bigDaddy.innerHTML = "";
				}

                for(var i=0;i < labels.length; i++)
                {

                    if(labels[i] == undefined)
                    {
						//deprecated
                        alert("use the setLabels method to set the text for your title or paragraph area.\n use the setTitle method to set the title for your text element.");
                    }else
                    {
						var add_custom_class = (custom_class.length > 1) ? " " + custom_class[i] + " " :(custom_class.length == 1) ? " " + custom_class[0] + " " : "";

						if(casing != "false"){

							var newObj_casing = document.createElement('div');
							newObj_casing.id = prefix + "_TCasing" + iUN + "_" + i;
							newObj_casing.className = prefix + "_TCasing" + iUN + "_" + i + " " + prefix + "_TCasing "  + prefix + "_TCasing" + i + " TCasing " + add_custom_class;

						}//end if casing



						var newObj_label = document.createElement('label');
						newObj_label.id = prefix + "_TAreaLabel" + iUN + "_" + i;

						if(has_labels == "true"){

						newObj_label.className = prefix + "_TAreaLabel" + iUN + "_" + i + " " + prefix + "_TAreaLabel "  + prefix + "_TAreaLabel" + i + " TAreaLabel " + add_custom_class;
						newObj_label.setAttribute("for",prefix + "_TArea" + iUN + "_" + i);
						newObj_label.innerHTML = labels[i];
						newObj_label.title = (titles[i] != undefined) ? titles[i] : "";

						}else{newObj_label.style.display = "none";}

						var newObj_txt_cont = document.createElement('div');
						newObj_txt_cont.id = prefix + "_TAreaCont" + iUN + "_" + i;
						newObj_txt_cont.className = prefix + "_TAreaCont" + iUN + "_" + i + " " + prefix + "_TAreaCont "  + prefix + "_TAreaCont" + i + " TAreaCont " + add_custom_class;



							var newObj_textarea = document.createElement('textarea');
							newObj_textarea.id = (id_type == "custom") ? custom_id : prefix + "_TArea" + iUN + "_" + i;


							event_ids.push(newObj_textarea.id);

							newObj_textarea.className = prefix + "_TArea" + iUN + "_" + i + " " + prefix + "_TArea "  + prefix + "_TArea" + i + " TArea " + add_custom_class;

							var newPlace = (placeholders[i] != undefined) ? placeholders[i] : "";
							newObj_textarea.setAttribute("placeholder",newPlace);
							newObj_textarea.title = (titles[i] != undefined) ? titles[i] : "";

              if(inner_html != ""){
								newObj_textarea.value = inner_html;
							}

							//helps read setup setInputAttributes json parameters
							for(var x = 0; x < obj_attributes.length; x++)
							{
								var pNameAry = Object.getOwnPropertyNames(obj_attributes[x]);
								var pName = pNameAry[0];
								newObj_textarea.setAttribute(pName,obj_attributes[x][pName]);
								//console.log(newObj_textarea);

							}//end for

							var newObj_txt_tally = document.createElement('div');
							newObj_txt_tally.id = prefix + "_TAreaTly" + iUN + "_" + i;
							newObj_txt_tally.className = prefix + "_TAreaTly" + iUN + "_" + i + " " + prefix + "_TAreaTly "  + prefix + "_TAreaTly" + i + " TAreaTly " +  add_custom_class;

							var ch_lim = newObj_textarea.attributes.maxlength.value || "";

							data_check_array = data_check_array.concat({"msg_id":newObj_txt_tally.id,"input_id":newObj_textarea.id,"char_limit":ch_lim,"type":type});

							//msg_id input_id char_limit
							newObj_textarea.oninput = function(){
								var ch_lim = newObj_textarea.attributes.maxlength.value || "";
								var in_id =  newObj_textarea.id;
								var ms_id = newObj_txt_tally.id;

								dataCheck({"msg_id":ms_id,"input_id":in_id,"char_limit":ch_lim,"type":type});

								extractData(newObj_textarea.id,type);
							};


						newObj_txt_cont.appendChild(newObj_textarea);
						newObj_txt_cont.appendChild(newObj_txt_tally);

						if(casing != "false"){
							newObj_casing.appendChild(newObj_label);
							newObj_casing.appendChild(newObj_txt_cont);
							bigDaddy.appendChild(newObj_casing);
						}else{
							bigDaddy.appendChild(newObj_label);
							bigDaddy.appendChild(newObj_txt_cont);
						}

                    }//end else

					extractData(newObj_textarea.id,type);
                }//end for


		}//end create_textarea

		var create_select = function()
		{
			/************************************* Sample Code ******************************************
			window['exTxt'] = new masterButtons({varName:'exTxt',home:'.mIList_ListArea2',type:'text'});
			exTxt.setLabels(['Title:']);
			exTxt.setTitles(['Message title']);
			exTxt.setSelectOptions(['phone','email','name','notification','web address']);
			exTxt.setDefault('notification');//works
			exTxt.setPlaceholders(['Enter a Message title']);//can manage for multiple entries
			exTxt.setPrefix('exTxt');
			exTxt.setText('Anything');
			exTxt.setCustomClass(["arc_select"]);
			exTxt.setInputAttributes({"placeholder":"enter a message title"});//another way to set placeholder - single entry for now
			exTxt.setInputAttributes({"maxlength":10});
			exTxt.setInputAttributes({"required":true});
			exTxt.clearHome("false");
			exTxt.setCasing();
			exTxt.display();

			var event_id = exTxt.get_event_ids();
			var targetElement = document.getElementById(fyi_event_id[0]);
			targetElement.oninput = function(){
			}

			*********************************************************************************************/

			 //alert("data object is " + dataObject);
            //gets container
			var bigDaddy = (/*stringType == "class"*/document.getElementById(home)) ? document.getElementById(home) : document.getElementsByClassName(home)[0];
			//clears container
			if(clearHome == "true"){
               bigDaddy.innerHTML = "";
            }
                for(var i=0; i < labels.length; i++)
                {

                    if(labels[i] == undefined)
                    {
						//deprecated
                        alert("use the setLabels method to set the text for your title or paragraph area.\n use the setTitle method to set the title for your text element.");
                    }else
                    {
						if(casing != "false"){

							var newObj_casing = document.createElement('div');
							newObj_casing.id = prefix + "_TCasing" + iUN + "_" + i;
							newObj_casing.className = prefix + "_TCasing" + iUN + "_" + i + " " + prefix + "_TCasing "  + prefix + "_TCasing" + i + " TCasing " + add_custom_class;

						}//end if casing



						var newObj_label = document.createElement('label');
						newObj_label.id = prefix + "_SLabel" + iUN + "_" + i;

						if(has_labels == "true"){

						newObj_label.className = prefix + "_SLabel" + iUN + "_" + i + " " + prefix + "_SLabel "  + prefix + "_SLabel" + i + " SLabel ";
						newObj_label.setAttribute("for",prefix + "_TInput" + iUN + "_" + i);
						newObj_label.innerHTML = labels[i];
						newObj_label.title = (titles[i] != undefined) ? titles[i] : "";

						}else{newObj_label.style.display = "none";}

						var newObj_sel_cont = document.createElement('div');
						newObj_sel_cont.id = prefix + "_SCont" + iUN + "_" + i;
						newObj_sel_cont.className = prefix + "_SCont" + iUN + "_" + i + " " + prefix + "_SCont "  + prefix + "_SCont" + i + " SCont ";

						var add_custom_class = (custom_class.length > 1) ? " " + custom_class[i] + " " :(custom_class.length == 1) ? " " + custom_class[0] + " " : "";

							var newObj_input = document.createElement('select');
							newObj_input.id = (id_type == "custom") ? custom_id :prefix + "_SInput" + iUN + "_" + i;

							event_ids.push(newObj_input.id);


							newObj_input.className = prefix + "_Input" + iUN + "_" + i + " " + prefix + "_CInput "  + prefix + "_CInput" + i + " CInput " + add_custom_class;
							newObj_input.type = "text";

							if(type == "slider")
							{
								newObj_input.setAttribute("data-role","slider")

							}

							newObj_input.title = (titles[i] != undefined) ? titles[i] : "";

							if(custom_select != "false"){


								var newObj_input2 = document.createElement('input');
								newObj_input2.id = (id_type == "custom") ? custom_id : prefix + "_CInput" + iUN + "_" + i;

								event_ids.push(newObj_input2.id);
								custom_input_id = newObj_input.id;
								custom_select_id = newObj_input2.id;

								//manage the display
								newObj_input.style.display = "block";
								newObj_input2.style.display = "none";

								newObj_input2.className = prefix + "_Input" + iUN + "_" + i + " " + prefix + "_CInput "  + prefix + "_CInput" + i + " CInput " + add_custom_class;
								newObj_input2.type = "text";


							newObj_input2.title = (titles[i] != undefined) ? titles[i] : "";

							}//end if

							var newPlace = (placeholders[i] != undefined) ? placeholders[i] : "";

							if(newPlace != ""){
								newObj_input.setAttribute("placeholder",newPlace);

								if(custom_select != "false"){
								newObj_input2.setAttribute("placeholder",newPlace);
								}
							}

							if(inner_html != ""){
								newObj_input.value = inner_html;
							}

							//helps read setup setInputAttributes json parameters
							for(var x = 0; x < obj_attributes.length; x++)
							{
								var pNameAry = Object.getOwnPropertyNames(obj_attributes[x]);
								var pName = pNameAry[0];
								newObj_input.setAttribute(pName,obj_attributes[x][pName]);
								//console.log(newObj_input);

								if(custom_select != "false")
								{
									newObj_input2.setAttribute(pName,obj_attributes[x][pName]);
								}//end if

							}//end for


							var newObj_sel_tally = document.createElement('div');
							newObj_sel_tally.id = prefix + "_STly" + iUN + "_" + i;
							newObj_sel_tally.className = prefix + "_STly" + iUN + "_" + i + " " + prefix + "_STly "  + prefix + "_STly" + i + " STly ";
							newObj_sel_tally.style.display = "none";


							var ch_lim = newObj_input.attributes.maxlength.value || "";

							data_check_array = data_check_array.concat({"msg_id":newObj_sel_tally.id,"input_id":newObj_input.id,"char_limit":ch_lim,"type":"text"});

							var listener_items = (type == "select") ? 'input' : 'change';
							//msg_id input_id char_limit


								//newObj_input.oninput = function(){


								var selectProcess = function(){
									var ch_lim = newObj_input.attributes.maxlength.value || "";
									var in_id =  newObj_input.id;
									var ms_id = newObj_sel_tally.id;
									newObj_sel_tally.style.display = "none";


									var theIndex = newObj_input.selectedIndex;
									var inputValue = newObj_input[theIndex].value;
									if(inputValue == custom_select_str)
									{
										newObj_input.style.display = "none";
										newObj_input2.style.display = "block";
										newObj_input2.focus();
									}//end if

									dataCheck({"msg_id":ms_id,"input_id":in_id,"char_limit":ch_lim,"type":"text"});

									extractData(newObj_input.id,type);
								};

							if(type == "select"){
								newObj_input.oninput = function()
								{
									selectProcess();
								}
							}else{
								newObj_input.onchange = function()
								{
									selectProcess();
								}
							}
							//to apply additional events externally i had to use jquery
							////ex. $("#"+accSlide_id).change(function(){});


							if(custom_select != "false"){

								var ch_lim = newObj_input.attributes.maxlength.value || "";

								//this isn't another dataCheck its an array i can pass to an
								//external data checker
								data_check_array = data_check_array.concat({"msg_id":newObj_sel_tally.id,"input_id":newObj_input2.id,"char_limit":ch_lim,"type":"text"});

								//msg_id input_id char_limit
								//newObj_input2.oninput = function(){



								var selectProcess2 = function(){
									var ch_lim = newObj_input.attributes.maxlength.value || "";
									var in_id =  newObj_input2.id;
									var ms_id = newObj_sel_tally.id;

									newObj_sel_tally.style.display = "block";


									dataCheck({"msg_id":ms_id,"input_id":in_id,"char_limit":ch_lim,"type":"text"});

									extractData(newObj_input2.id,"text");
								};

								newObj_input2.oninput = function()
								{
									selectProcess2();
								}



								newObj_input2.onblur = function()
									{
										if(newObj_input2.value == ""){

											newObj_input.selectedIndex = 0;
											newObj_input.value = select_options[0];

											newObj_input.style.display = "block";
											newObj_input2.style.display = "none";
											newObj_sel_tally.style.display = "none";


											extractData(newObj_input.id,"text");
										}
									};
							}//end if

							var options_count = (type == "slider") ? 2 : select_options.length;//accomodation for sliders
							var default_index = -1;
							var input_value = "default";

							for(var s = 0;s < options_count;s++){

								var new_option = document.createElement('option');
								new_option.id = prefix + "_SOption" + iUN + "_" + s;
								new_option.className = prefix + "_SOption" + iUN + "_" + s + " " + prefix + "_SOption "  + prefix + "_SOption" + s + " SOption ";
								new_option.innerHTML = select_options[s];
								new_option.value = select_options[s];

								newObj_input.appendChild(new_option);

								if(default_setting != "" && default_setting == select_options[s]){
									newObj_input.selectedIndex = s;
									default_index = s;
								}//end if

								//create the custom option
								if(custom_select != "false" && s == select_options.length - 1)
								{
									//console.info("we in here");

									var new_option = document.createElement('option');
									new_option.id = prefix + "_SOption" + iUN + "_" + s;
									new_option.className = prefix + "_SOption" + iUN + "_" + s + " " + prefix + "_SOption "  + prefix + "_SOption" + s + " SOption ";
									new_option.innerHTML = custom_select_str;
									new_option.value = custom_select_str;

									newObj_input.appendChild(new_option);

									if(default_setting != "" && default_index == -1){
										input_value = "custom";
										newObj_input.selectedIndex = s;//should be custom
										//and add the value to the other input
										newObj_input2.value = default_setting;

										//put the other input on display
										newObj_input.style.display = "none";
										newObj_input2.style.display = "block";

									}

									//selecting the custom option - li 1400
									//if(inputValue
									/*new_option.onclick = function()
									{
										//doesn't work - seems no click option
										newObj_input.style.display = "none";
										newObj_input2.style.display = "block";
									};*/

								}//


							}//end for

						newObj_sel_cont.appendChild(newObj_input);
						if(custom_select != "false"){
							newObj_sel_cont.appendChild(newObj_input2);
						}
						newObj_sel_cont.appendChild(newObj_sel_tally);

						if(casing != "false"){
							newObj_casing.appendChild(newObj_label);
							newObj_casing.appendChild(newObj_sel_cont);
							bigDaddy.appendChild(newObj_casing);
						}else{
							bigDaddy.appendChild(newObj_label);
							bigDaddy.appendChild(newObj_sel_cont);
						}//end if

						if(type == "slider")
						{
							var slider_id_str = "#" + newObj_input.id;
							$(slider_id_str).slider();
							$(slider_id_str).slider('refresh');
						}

                    }//end else
					if(input_value == "custom"){
						//code to help show custom value in edit mode
						extractData(newObj_input2.id,type);
					}else{
						extractData(newObj_input.id,type);
					}

                }//end for




		}//end create_select

		var toggleSelectDisplay = function()
		{
			custom_input_id;
			custom_select_id;
			/*if()
			{

			}else
			{

			}*/

		}

        this.display = function()
        {
                //var discovery = prepElementStringType(homeStr);
                //stringType = discovery.type;
                //home = discovery.target;

                prepStartString();

                switch(type)
                {
                    case "iconbox":
                        iconBoxDisplay();
                    break;

                    case "buttongroup":
                        groupButtonDisplay();
                    break;

                    case "tabs":
                        tabContentDisplay();
                    break;

                    case "pills":
                        tabContentDisplay();
                    break;

                    case "list":
          					case "ul":
          					case "ol":
          					case "li":
                        listContentDisplay();
                    break;

                    case "text_box":
                        textContentDisplay();
                    break;

                    case "move_element":
                        moveElement();
                    break;

                    case "move_contents":
                        moveElements();
                    break;

                    case "label_box":
                        labelBoxDisplay();
                    break;

            				case "tag":
                        tagDisplay();
                    break;

          					case "text":
          					case "phone":
          					case "checkbox":
          					case "url":

          						create_text_input();
          					break;

          					case "select":
          					case "slider":
          						create_select();
          					break;


          					case "textarea":
          						create_textarea();
          					break;


            }//end switch

        }//end display


		var dataCheck = function(objStr)
		{
			//sample
			//dataCheck({"msg_id":ms_id,"input_id":in_id,"char_limit":ch_lim});

			//msg_id input_id char_limit

			var objType = objStr.type;

			if(objType != "notification")
			{
				//message container id string
				var msg_id_str = objStr.msg_id;

				//message container
				var msgCont = document.getElementById(msg_id_str);//

				//input element id string
				var input_id_str = objStr.input_id;



				//input element
				var inputEl = document.getElementById(input_id_str);

				if(objType == "select")
				{
					var theIndex = inputEl.selectedIndex;
					var inputValue = inputEl[theIndex].value;
					inputEl.value = inputValue;
					console.log("input value = "+ inputEl[theIndex].value);
				}

				var inputTxt = inputEl.value;//

				//get the input text length
				inputTxtLength = inputTxt.length;

				//create the msg string for character limit
				var char_limit = objStr.char_limit || -1;


				var char_rem = char_limit - inputTxtLength;
				if(char_rem < 0){char_rem = 0; inputEl.value = inputTxt.substr(0,char_limit);}

				msgStr = "<h7>remaining " + char_rem + "/" + char_limit + "</h7>" ;
				/*
				//TODO:190 modify the target element to have a h7 childNode with an id
				so I can refernce it here and just use text for its innerHTML
				*/

				if(char_rem < 6){msgCont.style.color = "red";}else{msgCont.style.color = "green";}
				msgCont.innerHTML = msgStr;

				/*if(changeObj[objStr].btn == "text"){*/

				var lowerStr = 	inputTxt.toLowerCase();

					var isString = checkStringForArray({'string':lowerStr,'array':forbidList});

					if(isString != -1)
					{
						var currentClass = inputEl.className;

						if(currentClass.indexOf(" valid") != -1)
						{
							var modifiedClass = currentClass.replace("valid","invalid");
							inputEl.className = modifiedClass;
						}
						else{
							//then check for the word invalid so its not repeated
							//if its not there "== -1" put it there
							if(currentClass.indexOf(" invalid") == -1)
							{
								inputEl.className += " invalid ";
							}

						}
						/*i only have to change it here. I don't have to
						change it back because it is set above*/

						var invalidStr = "invalid entry. protected sequence.";
						msgCont.innerHTML = "<h7>" + invalidStr + "</h7>"
						msgCont.style.color = "red";
						//inputEl.dataset.validation = "invalid";
						//inputEl.validity.valid = false;
						inputEl.setCustomValidity(invalidStr);

					}//end if
					else
					{
						var currentClass = inputEl.className;

						if(currentClass.indexOf(" invalid") != -1)
						{
							var modifiedClass = currentClass.replace("invalid","valid");
							inputEl.className = modifiedClass;
						}
						else{
							//then check for the word valid so its not repeated
							//if its not there "== -1" put it there
							if(currentClass.indexOf(" valid") == -1)
							{
								inputEl.className += " valid ";
							}

						}
						inputEl.setCustomValidity("");
					}//end else




				/*}//end if changeObj*/




				if(objType == "phone" && inputEl.validity.valid != false)
				{
								//12a a3 (202)
					/*i moved this down because even if it passes the forbidden characters
					if it doesn't have enough numbers it has to be set to invalid.*/
					//var reggie = new RegExp("/\d/g");
					//var phoneNbr0 = inputTxt.match(reggie);//doesn't work
					//var phoneNbr1 = inputTxt.match(/[0-9]*/g);//works - matches any number
					//var phoneNbr1 = target_value.match(/[^0-9]*/g);//works - matches any letter
					//works - matches " " + "ui-icon-wordpress" + " "
					//var phoneNbr1 = target_value.match(/ui-icon-[^0-9]*\s/g);
					//var phoneNbr2 = inputTxt.match("\d{1}");//doesn't work
					//var phoneNbr3 = inputTxt.replace(/[^0-9]/g,'');//works


					var phoneNbr = inputTxt.replace(/[^0-9]/g,'');//works
					phoneNbr = phoneNbr.toString();

					if(phoneNbr.length < 10 && inputTxt != "" )
					{
						//invalidate it
						inputEl.setCustomValidity(invalidStr);
						var currentClass = inputEl.className;
						var modifiedClass = currentClass.replace("valid","invalid");
						inputEl.className = modifiedClass;

					}
					else if(phoneNbr.length >= 10 || inputTxt == "" ){
						//validate it
						inputEl.setCustomValidity("");
						var currentClass = inputEl.className;
						var modifiedClass = currentClass.replace("invalid","valid");
						inputEl.className = modifiedClass;

						formatPhone(input_id_str)
					}

				}//end if objStr phone



				var validity1 = inputEl.checkValidity();
				var validity2 = inputEl.validity.valid;


			}//end if !notification

			/*
			var readyForm = finalTest();
			//if the form end up being ready give them the go btn
			if(readyForm == true)
			{
				giveItAGo();
			}else{

				takeItBack();
			}

			compareSave();
			*/

		}//dataCheck

		var formatPhone = function(idStr)
		{
			//ulitimately this will work with international numbers
			//us numbers for now
			//can read time zone or country?
			var inputEl = document.getElementById(idStr);
			var inputTxt = inputEl.value;//

			var phoneNbr = inputTxt.replace(/[^0-9]/g,'');//works
				phoneNbr = phoneNbr.toString();


				if(phoneNbr.length == 10)
				{
					phoneArray = new Array();
					phoneArray[0] = phoneNbr.substr(0,3);
					phoneArray[1] = phoneNbr.substr(3,3);
					phoneArray[2] = phoneNbr.substr(6);

					var new_nbr = "(" + phoneArray[0] + ")" + " " + phoneArray[1] + " - " + phoneArray[2];

					inputEl.value = new_nbr;
				}
				else if(phoneNbr.length > 10)
				{
					phoneArray = new Array();
					phoneArray[0] = phoneNbr.substr(0,1);
					phoneArray[1] = phoneNbr.substr(1,3);
					phoneArray[2] = phoneNbr.substr(4,3);
					phoneArray[3] = phoneNbr.substr(7);

					var new_nbr = phoneArray[0] + " (" + phoneArray[1] + ")" + " " + phoneArray[2] + " - " + phoneArray[3];

					inputEl.value = new_nbr;
				}


		}//formatPhone

		var finalTest = function()
		{
			//is one identifier (picture/text) and one contact ready to submit
			readyId = false;
			readyContact = false;
			readyPassword = false;

			valid_picture = false;
			valid_text = false;
			valid_phone = false;
			valid_email = false;
			valid_password = false;


			for(var i = 0;i<event_ids.length; i++)
			{


				var inputEl = document.getElementById(event_ids[i]);
				var inputStr = inputEl.type;
				if(inputStr == "picture" || inputStr == "text" || inputStr == "image" )
				{

					if(inputEl != null && inputEl != undefined)
					{
						var inputTxt = inputEl.value;//

						if(inputTxt != "" && inputEl.validity.valid != false){
							readyId = true;
						}

						//if it exists is it valid "" or not
						if(inputStr == "picture" ||  inputStr == "image"){
							valid_picture = (inputEl.validity.valid != false) ? true : false;
						}
						if(inputStr == "text"){
							valid_text = (inputEl.validity.valid != false) ? true : false;
						}

					}//end not null or undefined
					else
					{
						//if it doesn't exist - it may not be ready but at least its valid
						if(inputStr == "picture" ||  inputStr == "image"){
							valid_picture = true;
						}
						if(inputStr == "text"){
							valid_text = true;
						}

					}//end else
				}

				if(inputStr == "email" || inputStr == "phone" )
				{

					if(inputEl != null && inputEl != undefined)
					{
						var inputTxt = inputEl.value;//

						if(inputTxt != "" && inputEl.validity.valid != false){
							readyContact = true;
						}

						//if it exists is it valid "" or not
						if(inputStr == "phone"){
							valid_phone = (inputEl.validity.valid != false) ? true : false;
						}
						if(inputStr == "email"){
							valid_email = (inputEl.validity.valid != false) ? true : false;
						}

					}//end not null or undefined
					else
					{
						//if it doesn't exist - it may not be ready but at least its valid
						if(inputStr == "phone"){
							valid_phone = true;
						}
						if(inputStr == "email"){
							valid_email = true;
						}

					}//end else


				}

				if(inputStr == "notification" )
				{
					if(document.getElementById("us_msg_slider_Select"))
					{
						var msgSel = document.getElementById("us_msg_slider_Select");
						var selectedOption = document.getElementsByClassName("msg_slider")[msgSel.selectedIndex];
						if(selectedOption.value == "allow"){readyContact = true;}

					}//end if
				}


				if(inputStr == "password" )
				{
					if(inputEl != null && inputEl != undefined)
					{
						var inputTxt = inputEl.value;//

						if(inputTxt != "" && inputEl.validity.valid != false){
							readyPassword = true;
						}

						//if it exists is it valid "" or not
						if(inputStr == "password"){
							valid_password = (inputEl.validity.valid != false) ? true : false;
						}

					}//end not null or undefined
					else
					{
						//if it doesn't exist - it may not be ready but at least its valid
						if(inputStr == "password"){
							valid_password = true;
						}

					}//end else


				}

			}//end for


			var isReady = (readyId == true && readyContact == true) ? true : false;
			isValid = (valid_picture == true && valid_text == true && valid_phone == true
			&& valid_email == true && valid_password == true) ? true : false;
			if(isReady == true && isValid == true)
			{
				return true;
			}
			else
			{
				return false;
			}


		}//end finalTest

		var giveItAGo = function()
		{
			//alert(document.getElementById("us_sel_go_btn"));
			if(!document.getElementById("us_sel_go_btn"))
			{

				var targContain = document.getElementById("simple_connect_Cont");
				//depreciated go btn - maybe at the end as a submit
				var goEl = document.createElement('button');
				goEl.id = "us_sel_go_btn";
				goEl.className = "us_sel_go_btn ui-btn ui-icon-check ui-btn-icon-left ui-btn-icon-notext";
				//goEl.setAttribute("onclick","onScreen()");
				goEl.setAttribute("onclick","setItOff()");
				goEl.innerHTML = "<h4>OK</h4>";
				goEl.title = "make contact";


				targContain.appendChild(goEl);/**/
			}

		}//end giveItAGo

		var extractData = function(dId,in_type)
		{
			var targ_el = document.getElementById(dId);
			//event_ids
			selectValue = targ_el.value;
			currentValue = selectValue;
		}//end extractData

		var extractData3 = function(dId,in_type)
		{
			//mainly used to get the slider up to date
			//to attach an additional function to the slider i had to use jquery
			//ex. $("#"+accSlide_id).change(function(){});
			var data_values = [];
			for(var u = 0; u < event_ids.length; u++){
				var cur_id = event_ids[u]
				var targ_el = document.getElementById(cur_id);
				//event_ids
				selectValue = targ_el.value;
				data_values = data_values.concat(selectValue);
			}
			return data_values;
		}//end extractData

		var extractData2 = function(dId,in_type)
		{
			var targ_el = document.getElementById(dId);
			//event_ids

			switch(in_type)
			{
				case "select":
				case "slider":
					var select_ndx = targ_el.selectedIndex;
					var optClass_Str = prefix + "_SOption"
					var selectOption = document.getElementsByClassName(optClass_Str)[select_ndx];
					var selectValue = selectOption.value;
					//console.log("selected value - long way",selectValue);
					//console.log("target id value ",targ_el.value);//theyre the same

					currentValue = selectValue;
				break;

				case "textarea":
				case "text":
				case "phone":
					selectValue = targ_el.value;
					currentValue = selectValue;
				break;

				case "checkbox":
					selectValue = targ_el.value;
					currentValue = selectValue;
				break;

			}//end swith
		}//end extractData

		this.getCurrentValue = function(){return currentValue;}
		this.getCurrentValue2 = function(){return extractData3();}


    }//end masterButtons


    function minorButtons(objStr)
    {
        //alert("minor buttons running");
        var e = event || window.event;
        //then activates that target
        var current_Btn = e.srcElement;

        var action = objStr.action;
        var objectName = objStr.objectName;

        switch(action)
        {
            case "showCaseIcon":
                window[objectName].showCaseIcon();
            break;

            case "chooseButton":
                window[objectName].chooseButton();
                 //window[objectName].getSelectedButton();//works
            break;

            case "switchTabs":
                window[objectName].switchTabs();
                 //window[objectName].getSelectedButton();//works
            break;

            case "changeDisplayIcon":
                var toggle = objStr.toggle;
                window[objectName].changeDisplayIcon(toggle);
                 //window[objectName].getSelectedButton();//works
            break;



        }

    }//end minorButtons

	function validityCheck(objAry)
	{
		/********  sample use *********

		var event_id_array = uNote.get_event_ids();
		var targetElement = document.getElementById(event_id_array[0]);
		targetElement.onclick = function(){

		targetElement.onclick = function(){

			var form_id_Ary = [];
				//alert("id additions work")
				//check group for validity
				form_id_Ary.push(testTxt.get_event_ids().join());
				form_id_Ary.push(testTag.get_event_ids().join());
				form_id_Ary.push(txAre.get_event_ids().join());
				console.log(form_id_Ary);

				var isReady = validityCheck(form_id_Ary);

				if(isReady == true)
				{
				...

		********  sample use *********/

		var id_Array = objAry;
		var readyForm = true;

		for(var r = 0; r < id_Array.length; r++)
		{
			var targEl = document.getElementById(id_Array[r]);
			targEl.checkValidity();
			targEl.validity.valid;

			if(targEl.checkValidity() == false || targEl.validity.valid == false){readyForm = "invalid"; return readyForm;}

			if(targEl.dataset.required == "true" && targEl.style.display != "none")
			{
				if(targEl.value == ""){readyForm = "incomplete"; return readyForm;}
			}

		}//end for

		return readyForm;


	}//end validityCheck


    /*
                //this are public and vars are private

                var testVariable1 = "Success Var";
                this.testVariable1 = "not the same as var";
                this.testVariable2 = "Success this";
                var hideAway = "quick hide!";

                var getPrivate1 = function(){return hideAway;}

                this.getPrivate2 = function(){return getPrivate1();}


                //object oriented javascript test
                var miko = new masterButtons();
                var t1 = miko.testVariable1;
                var t2 = miko.testVariable2;
                //var gp1 = miko.getPrivate1(); //calling private functions result in errors and breaks
                miko.testVariable1 = "too much";
                var t3 = miko.testVariable1;

                var gp2 = miko.getPrivate2();


                // object properties
                var objectName = obj.name;
                this.objectName = objectName;
                function someThing()
                {return "" + this.objectname;}//doesn't work

                this.getObjectName = function(){return someThing();}


                //public script
                 var miko = new masterButtons({name:'miko'});
                var oN = miko.getObjectName();//returns undefined

                        gBut.groupButtonDisplay();
        gBut.home;
        gBut.setHome('homie');
        gBut.home;// returned summat??
        gBut.home = "summat";
        gBut.home;//returned summat
        var wh = gBut.getHome();//this was correct with homie and summat



    */

               /*****************      radio btn experiment     ********************/

           //option naming scheme for option id is form field "jform" + "form name" + index# - ex. jform_display_icon0

           //gets the form's name
            //var bVTest = document.getElementsByClassName('display_icon')[0];
            //bVTest.elements[0].checked = "checked";
            //var tval = bVTest.elements[0].value;//calls the option element node 0
            //var tC = bVTest.elements[0].checked;//tests for checked or not

            //var jF = document.getElementById('jform_display_icon0');//equivalent to calling the option element
            //var tC2 = jF.checked;//tests for checked
            //var tVal2 = jF.value;//contains value
            //var tClass = jF.labels[0].className;//usefull for class name changes on the label element.

            //jF.labels[0].className = "btn active btn-success";// "btn" or "active btn-success/active btn-danger"
            //var jFT = document.getElementById('jform_display_icon0').labels[0].innerText;



             /*****************      end radio btn experiment     ********************/
