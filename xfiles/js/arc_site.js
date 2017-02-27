//alert("arc script running!");
//TODO:150 learn tasks
//NOTE:80 business portfolio site - a business card is like a mini portfolio this one expands

	function acr_setTheStage()
	{
		//prep the popup
		arc_create_panel({"home":"popup_holder","panel_name":"arc_panel","popup_name":"arc_popup"});

		//help the design view
		var btn_ancestor = get_ancestor("arc_stage",3);
		btn_ancestor.style.padding = "0 10px";

		//set click actions
		//mobile back btn fix

		//arc_innerPanel
		$(".arc_my_info").click(function(){
				var in_progress = (document.getElementById("arc_panel_main_content") && document.getElementById("arc_panel_main_content").innerHTML != "") ? "true" : "false";
			//clear the display
			if(in_progress == "false"){
				//fixes the mobile back btn issue
				$("#arc_panel_main_content").html("");
				//populate the display info form creator
				var iFC = new create_form({"display_data":"info"});//class - needs extend classes
				iFC.getMyInfo();//custom - needs to be a prototype
			}//end if
			//open the display
			$('#arc_popup').popup();
			$('#arc_popup').popup('open');

		});

		$(".arc_my_group").click(function(){
			//clear the display
				var in_progress = (document.getElementById("arc_panel_main_content") && document.getElementById("arc_panel_main_content").innerHTML != "") ? "true" : "false";
			if(in_progress == "false"){
				$("#arc_panel_main_content").html("");
				//populate the display info form creator
				var iFC = new create_form({"display_data":"group"});//class - needs extend classes
				iFC.getMyInfo();//custom - needs to be a prototype
			}
			//open the display
			$('#arc_popup').popup();
			$('#arc_popup').popup('open');

		});

		$(".arc_my_media").click(function(){
			//clear the display
				var in_progress = (document.getElementById("arc_panel_main_content") && document.getElementById("arc_panel_main_content").innerHTML != "") ? "true" : "false";
			if(in_progress == "false"){
				$("#arc_panel_main_content").html("");
				//populate the display info form creator
				var iFC = new create_form({"display_data":"media"});//class - needs extend classes
				iFC.getMyInfo();//custom - needs to be a prototype
			}

			//open the display
			$('#arc_popup').popup();
			$('#arc_popup').popup('open');

		});

	}//end acr_setTheStage

	function arc_create_panel(obj)
	{
		//creates a popup panel
		var home = obj.home;
		var pop_name = obj.popup_name;
		var pan_name = obj.panel_name;

		var modal_target = (document.getElementById(home)) ? document.getElementById(home) : document.getElementsByClassName(home)[0];

			var arc_popup = document.createElement('div');
			arc_popup.id = "arc_popup";//pop_name
			arc_popup.className = "arc_popup";
			arc_popup.dataset.role = "popup";
			arc_popup.setAttribute("data-overlay-theme","b");
			arc_popup.dataset.theme = "a";
			arc_popup.setAttribute("data-dismissible","false");
			//arc_popup.setAttribute("data-history","false");

				var arc_panel = document.createElement('div');
				arc_panel.id = "arc_panel";//pan_name
				arc_panel.className = "arc_panel ";//pan_name
				arc_panel.dataset.role = "panel";
				arc_panel.dataset.position = "right";
				arc_panel.dataset.display = "overlay";
				arc_panel.dataset.theme = "a";
				arc_panel.setAttribute("data-position-fixed","false");
				arc_panel.setAttribute("data-dismissible","false");
				arc_panel.setAttribute("data-swipe-close","false");
				//arc_panel.setAttribute("data-history","false");

					var arc_panel_close = document.createElement('a');
					arc_panel_close.id = "arc_panel_close"
					arc_panel_close.setAttribute("href","#");
					//arc_panel_close.onclick = alight_panel_reset;

					arc_panel_close.dataset.rel = "close";
					arc_panel_close.dataset.ajax = "false";
					arc_panel_close.className = "arc_panel_btn ui-btn ui-btn-right ui-btn-inline ui-shadow"
					+ " ui-corner-all ui-mini ui-icon-delete ui-btn-icon-right ui-btn-icon-notext";
					arc_panel_close.innerHTML = "cancel";
					arc_panel_close.onclick  = function(){

						clear_element("arc_innerPanel");

					};




					var arc_panel_inner = document.createElement('div');
					arc_panel_inner.id="arc_innerPanel";
					arc_panel_inner.className = "ui-panel-inner";

				arc_panel.appendChild(arc_panel_close);
				//arc_panel.appendChild(arc_panel_refresh);//moved to prep_CoordViewer3()
				arc_panel.appendChild(arc_panel_inner);

			arc_popup.appendChild(arc_panel);

			$("#arc_panel").panel();


		/*********************  The rest of the inner popup panel **********************/
		var pUS_closeBtn =  document.createElement('a');
				pUS_closeBtn.id = "pUS_closeBtn";
				pUS_closeBtn.setAttribute("href","#");
				pUS_closeBtn.dataset.rel = "back";
				pUS_closeBtn.className = "ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right";
				//pUS_closeBtn.onclick = user_reset;
				pUS_closeBtn.title = "cancel";
				pUS_closeBtn.innerHTML = "close";
				pUS_closeBtn.onclick = function(){

					clear_element("arc_heading");
					clear_element("arc_panel_main_content");

				};

				var arc_panel_main = document.createElement('div');
				arc_panel_main.id = "arc_panel_main";
				arc_panel_main.setAttribute("role","main");
				arc_panel_main.className = "ui-content ";

					var arc_heading  = document.createElement('h4');
					arc_heading.id = "arc_heading";
					arc_heading.className = "arc_heading ";
					//arc_heading.innerHTML = "info manager:";//outside of create_form (to set dynamically here)

					var arc_panel_main_content = document.createElement('div');
					arc_panel_main_content.id = "arc_panel_main_content";
					arc_panel_main_content.className = "arc_panel_main_content ui-grid-a";

						//content area

					//arc_panel_main_content.appendChild();

					var arc_panel_infoBox = document.createElement('div');
					arc_panel_infoBox.id = "arc_panel_infoBox";
					arc_panel_infoBox.className = "arc_panel_infoBox";

						var arc_panel_infoBtn = document.createElement('div');
						arc_panel_infoBtn.id = "arc_panel_infoBtn";
						arc_panel_infoBtn.setAttribute("href","#");
						arc_panel_infoBtn.className = "arc_panel_infoBtn ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-info ui-btn-icon-notext";
						arc_panel_infoBtn.title = "help info";
						arc_panel_infoBtn.onclick = function(){arc_toggleDisplay({"id":"arc_infoBox"});arc_toggleDisplay({"id":"arc_panel_infoBtn"});};
						arc_panel_infoBtn.innerHTML = "info";
						arc_panel_infoBtn.style.display = "block";



					arc_panel_infoBox.appendChild(arc_panel_infoBtn);


					var arc_panel_infoCont = document.createElement('div');
					arc_panel_infoCont.id = "arc_panel_infoCont";
					arc_panel_infoCont.className = "arc_panel_infoCont";

						var arc_infoBox = document.createElement('div');
						arc_infoBox.id = "arc_infoBox";
						arc_infoBox.className = "arc_infoBox";
						arc_infoBox.style.display = "none";

							var arc_info_close_btn = document.createElement('a');
							arc_info_close_btn.id = "arc_info_close_btn";
							arc_info_close_btn.setAttribute("href","#");
							arc_info_close_btn.className = "arc_info_close_btn  ui-btn ui-corner-all ui-alt-icon ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right";
							arc_info_close_btn.onclick = function(){arc_toggleDisplay({"id":"arc_infoBox"});arc_toggleDisplay({"id":"arc_panel_infoBtn"});};

							var main_arc_info = document.createElement('div');
							main_arc_info.id = "main_arc_info";
							main_arc_info.className = "main_arc_info";
							main_arc_info.innerHTML = "<p>You don't have to be registered to start exchanging information. If you are a brand new user click the guest icon.</p>";

						arc_infoBox.appendChild(arc_info_close_btn);
						arc_infoBox.appendChild(main_arc_info);


					arc_panel_infoCont.appendChild(arc_infoBox);

				arc_panel_main.appendChild(arc_heading);
				arc_panel_main.appendChild(arc_panel_main_content);
				arc_panel_main.appendChild(arc_panel_infoBox);
				arc_panel_main.appendChild(arc_panel_infoCont);

			arc_popup.appendChild(pUS_closeBtn);
			arc_popup.appendChild(arc_panel_main);


		modal_target.appendChild(arc_popup);

		//$("#arc_popup").popup();

	}//end arc_create_panel

	function	clear_element(hm_str)
	{
		var home = hm_str;
		var targ_el = (document.getElementById(home)) ? document.getElementById(home) : document.getElementsByClassName(home)[0];

		targ_el.innerHTML = "";


	}//end clear_element


	function arc_toggleDisplay(obj)
	{
		var disp_id = obj.id;
		var targ_el = (document.getElementById(disp_id)) ? document.getElementById(disp_id) : document.getElementsByClassName(disp_id)[0];

		targ_el.style.display = (targ_el.style.display == "none") ? "block" : "none";

	}//end arc_toggleDisplay

	//TODO:140 add titles to all btns

	function create_form(obj)
	{
		console.info("contact creator created.");
		var obj_elements = {};

		var display_data = (obj != undefined && obj.display_data != undefined) ? obj.display_data : "info";
		var catSel;//category selector
		var typeSel;//type selector
		var dataInp;//data entry point
		var otherInp;
		var tNoteBtn;//notification test btn
		var accSlide;//access slider
		var clrTag;
		var clrTag2;
		var default_icon = (display_data == "group") ? "group" :(display_data == "media") ? "share" : "heart";

		var default_heading  = (display_data == "group") ? "community manager:" :(display_data == "media") ? "media manager:" : "info manager:";
		var display_view = "folder";//or "list"



		var my_info = "";
		var chk_info = "";

		var info_category_arry = ['email','e-commerce','favorite apps','name','notification','phone','profile image',"social community",'web address'];
		var media_category_arry = ['article','blog','picture','music','social network','video','website'];
		var group_category_arry = ['business','family','friend','online','project','education','team','social','spiritual','work'];

		var bigDaddy = $("#arc_panel_main_content")[0];

		var contact_info_creator = document.createElement('div');
		contact_info_creator.id = "contact_info_creator";
		contact_info_creator.className = "contact_info_creator";
		//contact_info_creator.setAttribute("href","#");
		//contact_info_creator.onclick = function(){};

			var contact_type_selector = document.createElement('div');
			contact_type_selector.id = "contact_type_selector";
			contact_type_selector.className = "contact_type_selector";
			//contact_type_selector.setAttribute("href","#");
			//contact_type_selector.onclick = function(){};

			var form_ctrls = document.createElement('div');
			form_ctrls.id = "form_ctrls";
			form_ctrls.className = "form_ctrls";
			//form_ctrls.setAttribute("href","#");
			//form_ctrls.onclick = function(){};

				var arc_add_info = document.createElement('button');
				arc_add_info.id = "arc_add_info";
				arc_add_info.className = "arc_add_info form_btns ui-btn ui-icon-plus ui-btn-icon-notext ui-btn-icon-right ui-shadow";
				arc_add_info.setAttribute("href","#arc_panel");
				arc_add_info.dataset.view = "info";
				arc_add_info.onclick = function(){
					get_info_form({"mod":"make","view":this.dataset.view});
				};
				//arc_add_info.appendChild();

				var arc_info_list = document.createElement('button');
				arc_info_list.id = "arc_info_list";
				arc_info_list.className = "arc_info_list form_btns list_btns ui-btn ui-icon-contact ui-btn-icon-notext ui-btn-icon-right ui-shadow";
				arc_info_list.title = "show info manager";
				//arc_info_list.setAttribute("href","#");

				//initial display
				if(display_data == "info"){
					document.getElementById('arc_heading').innerHTML = "info manager:"
					arc_info_list.style.display = "none";
				}//end if

				arc_info_list.onclick = function(){

					change_display("info");

				};
				//arc_info_list.appendChild();

				var arc_media_list = document.createElement('button');
				arc_media_list.id = "arc_media_list";
				arc_media_list.className = "arc_media_list form_btns list_btns ui-btn ui-icon-share ui-btn-icon-notext ui-btn-icon-right ui-shadow";
				arc_media_list.title = "show media manager";
				//arc_media_list.setAttribute("href","#");

				if(display_data == "media"){
					document.getElementById('arc_heading').innerHTML = "media manager:";
					arc_media_list.style.display = "none";
				}//end if

				arc_media_list.onclick = function(){

					change_display("media");

				};
				//arc_media_list.appendChild();

				var arc_group_list = document.createElement('button');
				arc_group_list.id = "arc_group_list";
				arc_group_list.className = "arc_group_list form_btns list_btns ui-btn ui-icon-group ui-btn-icon-notext ui-btn-icon-right ui-shadow";
				arc_group_list.title = "show community manager";
				//arc_group_list.setAttribute("href","#");
				if(display_data == "group"){
					document.getElementById('arc_heading').innerHTML = "community manager:";
					arc_group_list.style.display = "none";
				}//end if

				arc_group_list.onclick = function(){

					change_display("group");

				};
				//arc

				//console container
				var arc_console_ctrl = document.createElement('div');
				arc_console_ctrl.id = "arc_console_ctrl";
				arc_console_ctrl.className = "arc_console_ctrl";
				//arc_console_ctrl.setAttribute("href","#");

						var arc_view_more = document.createElement('button');
						arc_view_more.id = "arc_view_more";
						arc_view_more.className = "arc_view_more console_btns ui-btn ui-icon-eye ui-corner-all ui-mini ui-btn-icon-notext ui-btn-icon-right ui-shadow";
						//arc_view_more.setAttribute("href","#");
						arc_view_more.dataset.view = 1;
						arc_view_more.onclick = function(){
							switch_list_view(this);
						};
						//arc_view_more.appendChild();

						var arc_view_fldr = document.createElement('button');
						arc_view_fldr.id = "arc_view_fldr";
						arc_view_fldr.className = "arc_view_fldr console_btns ui-btn ui-icon-folder ui-corner-all ui-mini ui-btn-icon-notext ui-btn-icon-right ui-shadow";
						//arc_view_fldr.setAttribute("href","#");
						arc_view_fldr.dataset.view = 1;
						if(display_data == "info"){
							arc_view_fldr.style.display = "none";
						}
						arc_view_fldr.onclick = function(){
							display_view = "folder";
							display_my_info(my_info);

						};
						//arc_view_fldr.appendChild();

						var arc_view_list = document.createElement('button');
						arc_view_list.id = "arc_view_list";
						arc_view_list.className = "arc_view_list console_btns ui-btn ui-icon-bullets ui-corner-all ui-mini ui-btn-icon-notext ui-btn-icon-right ui-shadow";
						//arc_view_list.setAttribute("href","#");
						arc_view_list.dataset.view = 1;
						if(display_data == "info"){
							arc_view_list.style.display = "none";
						}
						arc_view_list.onclick = function(){
							display_view = "list";
							display_my_info(my_info);

						};
						//arc_view_list.appendChild();

				arc_console_ctrl.appendChild(arc_view_more);
				arc_console_ctrl.appendChild(arc_view_fldr);
				arc_console_ctrl.appendChild(arc_view_list);


				var form_ctrls_span = document.createElement('div');
				form_ctrls_span.id = "form_ctrls_span";
				form_ctrls_span.className = "form_ctrls_span clr";

			form_ctrls.appendChild(arc_info_list);
			form_ctrls.appendChild(arc_media_list);
			form_ctrls.appendChild(arc_group_list);
			form_ctrls.appendChild(arc_console_ctrl);
			form_ctrls.appendChild(arc_add_info);
			form_ctrls.appendChild(form_ctrls_span);

			var arc_display = document.createElement('div');
			arc_display.id = "arc_display";
			arc_display.className = "arc_display";//test_red
			//arc_display.setAttribute("href","#");
			//arc_display.onclick = function(){};
			//arc_display.appendChild();

			var form_display_span = document.createElement('div');
			form_display_span.id = "form_display_span";
			form_display_span.className = "form_display_span clr";

		//contact_info_creator.appendChild(contact_type_selector);
		contact_info_creator.appendChild(form_ctrls);
		contact_info_creator.appendChild(arc_display);
		//contact_info_creator.appendChild(form_display_span);

		bigDaddy.appendChild(contact_info_creator);

		var change_display = function(dd)
		{
			display_data = dd;
			display_view = "folder";
			var info_style_display = "inline-block";
			var media_style_display = "inline-block";
			var group_style_display = "inline-block";
			var add_btn = document.getElementById("arc_add_info");

			switch(display_data){
				case "info":

					info_style_display = "none";
					default_icon =  "heart";
					default_heading = "info manager:";
					var console_btns = "false";
					add_btn.dataset.view = "info";

				break;

				case "media":
					media_style_display = "none";
					default_icon =  "share";
					default_heading = "media manager:";
					var console_btns = "true";
					add_btn.dataset.view = "media";

				break;

				case "group":
					group_style_display = "none";
					default_icon =  "group";
					default_heading = "community manager:";
					var console_btns = "true";
					add_btn.dataset.view = "group";

					//update btn display





				break;

			}//end switch

			document.getElementById('arc_heading').innerHTML = default_heading;
			document.getElementById('arc_info_list').style.display = info_style_display;
			document.getElementById('arc_media_list').style.display = media_style_display;
			document.getElementById('arc_group_list').style.display = group_style_display;
			if(console_btns == "true"){
				document.getElementById('arc_view_fldr').style.display = "inline-block";
				document.getElementById('arc_view_list').style.display = "inline-block";
			}else{
				document.getElementById('arc_view_fldr').style.display = "none";
				document.getElementById('arc_view_list').style.display = "none";
			}//end else
			getMyInfo();

		}//end change_display

		//custom function
		this.getMyInfo = function(){getMyInfo();}

		//custom function
		var getMyInfo = function(actn)
		{
			//
			var action = actn || "none";
			wait_a_minute("show","loading data...")//loading screen;
			var myData = {};
			var form_token = FORM_TOKEN;


			var urlMod = "getMyInfo";//put controller.php method call here

			var ctrl_Url = "index.php?option=com_arc&task=" + urlMod + "&format=raw&" + form_token + "=1";//this works

			switch(display_data)
			{
				case "info":
					myData.display_data ="info";
				break;

				case "media":
					myData.display_data = "media";
				break;

				case "group":
					myData.display_data = (action != "none") ? "info" : "group";
				break;
			}


			$(document).ready(function()
			{
			   //alert("getMenuData running!");
			   $.ajax(
			   {

				url:ctrl_Url,
				/*data:{'userData':userData},*/
				data:myData,
				//data:userData,
				type:'POST',
				   success:function(result,textStatus,xhr)
				   {
					   console.log("scan textStatus = " + textStatus);
					   console.log("scan xhr  = " + xhr);
					   console.info("scan xhr status = " + xhr.status);

					   //alert("Ajax test result data = " + result);//string
						console.log("Ajax test result data = " + result);//string
						//var makeMenu = new menuMaker(result);
						//makeMenu.display();

						//if upload is successful

						//change the upload icon to successful
						//if(result.indexOf("invalid token") == -1)
						if(result != "Invalid Token" && result.indexOf("unregistered user") == -1  &&  result.indexOf(">Your session has expired") == -1)
						{
							if(result.indexOf("<!doctype html>") == -1)
							{
								//blank the display
								if(action == "none")
								{
									var display_el = document.getElementById("arc_display");
									display_el.innerHTML = "";
								}

								if(result != "[]")
								{

									if(action == "none"){
										var my_info_str = result;

										//var my_info = JSON.parse(my_info_str);
										my_info = JSON.parse(my_info_str);

										console.log("my info = ",my_info);


											display_my_info(my_info,action);
									}
									else{
										var chk_info_str = result;

										//var my_info = JSON.parse(my_info_str);
										chk_info = JSON.parse(chk_info_str);

										console.log("my info = ",my_info);
										display_my_info(chk_info,action);
									}//end else

								}else{
									console.warn("string is empty");
									wait_a_minute("hide");
								}


							}
							else{
								//this comes up if the entire page's html comes back in the request
								alert("Give me moment...  Resubmit your entry by  \n pressing the go button again.");

								//$.mobile.loading("hide");
							}//end else
						}else if(result.indexOf("unregistered user") != -1)
						{
							alert("please login or register to enjoy these features. logging in or registering is easy.");

							window.location.replace(ALIGHTHOME);

						}else
						{
								alert("Its not you... its me. \n Your session timer has expired. \n Please reset the page and give \n \"us\" a little more time.")

								window.location.replace(SITEURL);
						}

						//hide

					}

				})
			})//end ajax

		}//end getMyInfo

		var switch_list_view = function(obj)
		{
				var view_btn = obj;
				var view = parseInt(view_btn.dataset.view);
				var init_view_var = "view1"
				var cur_view_var = "view" + view;
				var nxt_view_var = "view" + (view + 1);

				//current view
				var cur_view_ary = document.getElementsByClassName(cur_view_var);

				switch_display(cur_view_ary,"none");

				if(document.getElementsByClassName(nxt_view_var)[0])
				{
					var nxt_view_ary = document.getElementsByClassName(nxt_view_var);
					switch_display(nxt_view_ary,"inline-block");
					view_btn.dataset.view = view + 1;
				}else{
					var init_view_ary = document.getElementsByClassName(init_view_var);
					switch_display(init_view_ary,"inline-block");
					view_btn.dataset.view = 1;
				}


		}//end switch_list_view

		var switch_display = function(arr,attrib)
		{
			var ary_els = arr;
			for(var d = 0; d < ary_els.length; d++)
			{
				ary_els[d].style.display = attrib;
			}

		}//end switch_display

		var colap_cont;

		//custom function
		var display_my_info = function(iObj,actn)
		{
			var result_obj = iObj;
			var action = actn || "none";
			var check_mode = (action != "none") ? "true" : "false";
			var display_home = (check_mode == "false") ? "arc_display" : "fish_content";

			var display_el = (document.getElementById(display_home)) ? document.getElementById(display_home) : document.getElementsByClassName(display_home)[0];
			display_el.innerHTML = "";

			//create an icon object
			//var icon_obj = {"name":"user","phone":"phone","notification":"notification","web address":"wordpress","email":"mail"};

			//break up the data into categories
			var my_info_data_object = {};
			var my_info_data_abc = {};
			//creates an array of arrays using the categories as keys
			for(var i = 0; i < result_obj.length; i++)
			{
				var obj_category = result_obj[i].category;
				var obj_input = result_obj[i].desc_data;
				var first_char = obj_input.charAt(0);
				first_char = first_char.toLowerCase();

				console.log("firsty",first_char);
				//console.log("fun with strings",obj_input.substr(0,1));
				//console.log("string cheese",obj_input.charAt(0));

				//if the category is new add it as an object property
				if(my_info_data_object[obj_category] == undefined){my_info_data_object[obj_category] = [];}

				//then take the item and add it to the properties array
				my_info_data_object[obj_category] = my_info_data_object[obj_category].concat(result_obj[i]);

				if(my_info_data_abc[first_char] == undefined){my_info_data_abc[first_char] = [];}
				//then take the item and add it to the properties array
				my_info_data_abc[first_char] = my_info_data_abc[first_char].concat(result_obj[i]);

			}//end for
			obj_elements.my_info_data_object = my_info_data_object;
			obj_elements.my_info_data_abc = my_info_data_abc;


			console.log("my_info_data_object = ",my_info_data_object);


			//create main collapsible

			//collapsible set
			if(display_view == "folder" || action != "none"){

			obj_elements.colap_cont = new masterButtons({varName:'colap_cont',home:display_home,type:'list'});
            obj_elements.colap_cont.setPrefix('colap_cont');
            obj_elements.colap_cont.setListNumber(1);
			obj_elements.colap_cont.setInputAttributes({"data-role":"collapsibleset"});
			obj_elements.colap_cont.setInputAttributes({"data-inset":"true"});
			obj_elements.colap_cont.setInputAttributes({"data-theme":"a"});
			//obj_elements.colap_cont.setInputAttributes({"data-content-theme":"b"});
            obj_elements.colap_cont.display();

			//get the sets id
			var colap_cont_id_ary = obj_elements.colap_cont.get_event_ids();
			var collapsible_sets_id = colap_cont_id_ary[0]

		}//end if


			if(display_view != "folder" && action == "none"){
					//ul if it isn't a folder this will run 1 ul for all the list items
					var ul_name = "ul_" + d;
					obj_elements[ul_name] = new masterButtons({varName:ul_name,home:display_home,type:'ul'});
					obj_elements[ul_name].setPrefix(ul_name);
					obj_elements[ul_name].setListNumber(1);
					obj_elements[ul_name].setInputAttributes({"data-role":"listview"});
					obj_elements[ul_name].setInputAttributes({"data-filter":"true"});
					obj_elements[ul_name].setInputAttributes({"data-filter-placeholder":"filter title, date, tag, name..."});
					obj_elements[ul_name].setInputAttributes({"data-autodividers":"true"});
					//obj_elements[ul_name].setInputAttributes({"data-autodividersSelector":"true"});
					obj_elements[ul_name].setCustomClass(["ul_display_list"]);
					obj_elements[ul_name].setInputAttributes({"data-filter-theme":"a"});
					obj_elements[ul_name].setInputAttributes({"data-divider-theme":"a"});
					obj_elements[ul_name].clearHome("false");
					obj_elements[ul_name].display();

					var ul_id_ary = obj_elements[ul_name].get_event_ids();
					var ul_id = ul_id_ary[0];
			}//end if


			if(display_view == "folder" || action != "none"){
			var my_info_data_key_array = Object.keys(my_info_data_object);//used to count category titles
			}else{
				var my_info_data_key_array = Object.keys(my_info_data_abc);
				console.log("early  abc = ", my_info_data_key_array);
				my_info_data_key_array = my_info_data_key_array.sort();
				console.log("sort  abc = ", my_info_data_key_array);
			}
			//DONE:70 fix abc key sort


			console.log("key array = ",my_info_data_key_array);
			//now devide it up
			obj_elements.my_info_data_key_array = my_info_data_key_array;


			for(var d = 0; d < my_info_data_key_array.length; d++)
			{

				if(display_view == "folder" || action != "none"){

				//create collapsible
				//1st collapsible
				var col_name = "clps_" + d;
				var col_icon = icon_finder(my_info_data_key_array[d]);

				obj_elements[col_name] = new masterButtons({varName:col_name,home:collapsible_sets_id,type:'list'});
				obj_elements[col_name].setPrefix(col_name);
				obj_elements[col_name].setListNumber(1);
				//obj_elements[col_name].setInputAttributes({"data-collapsed-icon":icon_obj[my_info_data_key_array[d]]});
				obj_elements[col_name].setInputAttributes({"data-collapsed-icon":col_icon});
				//obj_elements.colap_1.setInputAttributes({"data-expanded-icon":"minus"});
				obj_elements[col_name].setInputAttributes({"data-iconpos":"right"});
				obj_elements[col_name].setInputAttributes({"data-role":"collapsible"});
				obj_elements[col_name].clearHome("false");
				obj_elements[col_name].display();

				var colap_id_ary = obj_elements[col_name].get_event_ids();
				var collapsible_id = colap_id_ary[0]

				//collapsible header
				var h2_name = "h2_" + d;
				obj_elements[h2_name] = new masterButtons({varName:h2_name,home:collapsible_id,type:'tag'});
				obj_elements[h2_name].setTextTag('h2');
				obj_elements[h2_name].setPrefix(h2_name);
				obj_elements[h2_name].setContent(my_info_data_key_array[d]);
				obj_elements[h2_name].clearHome("false");
				obj_elements[h2_name].display();

				display_home = collapsible_id;

				}//end if


				if(display_view == "folder" || action != "none"){

						//ul - original "folder" ul runs with each category
						var ul_name = "ul_" + d;
						obj_elements[ul_name] = new masterButtons({varName:ul_name,home:display_home,type:'ul'});
						obj_elements[ul_name].setPrefix(ul_name);
						obj_elements[ul_name].setListNumber(1);
						obj_elements[ul_name].setInputAttributes({"data-role":"listview"});
						obj_elements[ul_name].setInputAttributes({"data-filter":"true"});
						obj_elements[ul_name].setInputAttributes({"data-filter-placeholder":"filter title, date, tag, name..."});
						if(display_view != "folder" && action == "none"){
								obj_elements[ul_name].setInputAttributes({"data-autodividers":"true"});
								//obj_elements[ul_name].setInputAttributes({"data-autodividersSelector":"true"});
						}//end if
						obj_elements[ul_name].setInputAttributes({"data-filter-theme":"a"});
						obj_elements[ul_name].setInputAttributes({"data-divider-theme":"b"});
						obj_elements[ul_name].clearHome("false");
						obj_elements[ul_name].display();

						var ul_id_ary = obj_elements[ul_name].get_event_ids();
						var ul_id = ul_id_ary[0];
					}//end if

				if(display_view == "folder" || action != "none"){

						var category_array = my_info_data_object[my_info_data_key_array[d]];

				}else{
							//if its not a folder use the abc data
							var category_array = my_info_data_abc[my_info_data_key_array[d]];
				}


				for(var x = 0; x < category_array.length; x++)
				{

					var curr_category = category_array[x].category;
					var myIn_id = category_array[x].id || "";
					var myIn_user_id = category_array[x].user_id || "";
					var empty_text = "";//"empty"
					var myIn_core = (category_array[x].core_data != undefined && category_array[x].core_data != "") ? category_array[x].core_data : empty_text;//*need
					var myIn_desc = (category_array[x].desc_data != undefined && category_array[x].desc_data != "") ? category_array[x].desc_data : empty_text;
					var myIn_other = (category_array[x].other_data != undefined && category_array[x].other_data != "") ? category_array[x].other_data : empty_text;
					var alt_icon = icon_finder(my_info_data_key_array[d]);
					var myIn_icon = category_array[x].picture || alt_icon;//*need
					var no_disc = (category_array[x].picture == "") ? "" : "ui-nodisc-icon";
					var myIn_created = category_array[x].created || "";
					var my_date = new Date(myIn_created);
					var slash_date = my_date.toLocaleString();
					var abbrev_date = my_date.toString();
					var myIn_modified = category_array[x].modified || "";
					var myIn_extra = category_array[x].extra || "";
					var myIn_json = JSON.stringify(category_array[x]);//*need
					var myIn_pNbr = category_array[x].published || "0";
					console.log("myIn_pNbr = ",myIn_pNbr);
					var myIn_published = (myIn_pNbr == "0") ? "unpublished" : "published";

					switch(curr_category){

						//standar display section
						case "favorite apps":
						case "email":
						case "notification":
						case "name":
						case "phone":
						case "social community":
						//whatever isn't good goes up here
							data1 = myIn_core;
							data2 = myIn_desc;
							data3 = myIn_other;
							//DONE:10 add social community to standard display section
						break;
					/*# 	case "apps":
					//# 	case "article":
					//# 	case "blog":
					//# 	case "picture":
					//## 	case "music":
					//# 	case "social network":
					//# 	case "video":
					//# 	case "website":*/

					//dynamic display section
						default:
							data1 = myIn_desc;
							data2 = myIn_core;
							data3 = myIn_other;
						break;
						}


					var li_name = "li_" + d + "_" + x;
					obj_elements[li_name] = new masterButtons({varName:li_name,home:ul_id_ary,type:'li'});
					obj_elements[li_name].setPrefix(li_name);
					obj_elements[li_name].setListNumber(1);
					obj_elements[li_name].setCustomClass(["arc_" + myIn_published + " "]);
					//obj_elements[li_name].setContent();//category_array[x].core_data
					obj_elements[li_name].clearHome("false");
					obj_elements[li_name].display();

					var li_id_ary = obj_elements[li_name].get_event_ids();
					var li_id = li_id_ary[0];

					//create 4 elements 2 for icons 1 for text
					//icon container
					var iName = "my_info_icon" + d + "_" + x;

					var my_info_icon = new masterButtons({varName:iName,home:li_id,type:'tag'});
					my_info_icon.setTextTag('a');
					my_info_icon.setPrefix(iName);
					//my_info_icon.setContent('change');
					my_info_icon.setCustomClass(["my_info my_info_icon info_dot ui-btn ui-icon-" + myIn_icon + " ui-btn-icon-notext ui-shadow " + no_disc + " ui-corner-all ui-mini "]);
					my_info_icon.clearHome("false");
					my_info_icon.display();

					var mII_ary = my_info_icon.get_event_ids();
					var mII_id = mII_ary[0];


					//text container
					var tName1 = "my_info_text1" + d + "_" + x;

					var my_info_text1 = new masterButtons({varName:tName1,home:li_id,type:'tag'});
					my_info_text1.setTextTag('p');
					my_info_text1.setPrefix(tName1);
					my_info_text1.setContent(data1);
					//my_info_text.setContent(myIn_core + " " + myIn_desc);//works as a filter
					my_info_text1.setCustomClass(["my_info my_info_text my_info_text1 view1"]);
					my_info_text1.clearHome("false");
					my_info_text1.display();

					var mIT1_ary = my_info_text1.get_event_ids();
					var mIT1_id = mIT1_ary[0];//my_info_text

					var mIT1_el = document.getElementById(mIT1_id);
					mIT1_el.style.display = "inline-block";

					var tName2 = "my_info_text2" + d + "_" + x;
					var my_info_text2 = new masterButtons({varName:tName2,home:li_id,type:'tag'});
					my_info_text2.setTextTag('p');
					my_info_text2.setPrefix(tName2);
					my_info_text2.setContent(data2);
					//my_info_text.setContent(myIn_core + " " + myIn_desc);//works as a filter
					my_info_text2.setCustomClass(["my_info my_info_text my_info_text2 view2"]);
					my_info_text2.clearHome("false");
					my_info_text2.display();

					var mIT2_ary = my_info_text2.get_event_ids();
					var mIT2_id = mIT2_ary[0];//my_info_text
					var mIT2_el = document.getElementById(mIT2_id);
					mIT2_el.style.display = "none";

					//myIn_published is here
					var tName3 = "my_info_text3" + d + "_" + x;
					var my_info_text3 = new masterButtons({varName:tName3,home:li_id,type:'tag'});
					my_info_text3.setTextTag('p');
					my_info_text3.setPrefix(tName3);
					my_info_text3.setContent(myIn_published);
					//my_info_text.setContent(myIn_core + " " + myIn_desc);//works as a filter
					my_info_text3.setCustomClass(["my_info my_info_text my_info_text3 view3 "]);
					my_info_text3.clearHome("false");
					my_info_text3.display();

					var mIT3_ary = my_info_text3.get_event_ids();
					var mIT3_id = mIT3_ary[0];//my_info_text
					var mIT3_el = document.getElementById(mIT3_id);
					mIT3_el.style.display = "none";

					//date
					var tName4 = "my_info_text4" + d + "_" + x;
					var my_info_text4 = new masterButtons({varName:tName4,home:li_id,type:'tag'});
					my_info_text4.setTextTag('p');
					my_info_text4.setPrefix(tName4);
					my_info_text4.setContent(slash_date);
					//my_info_text.setContent(myIn_core + " " + myIn_desc);//works as a filter
					my_info_text4.setCustomClass(["my_info my_info_text my_info_text4 view4"]);
					my_info_text4.clearHome("false");
					my_info_text4.display();

					var mIT4_ary = my_info_text4.get_event_ids();
					var mIT4_id = mIT4_ary[0];//my_info_text

					var mIT4_el = document.getElementById(mIT4_id);
					mIT4_el.style.display = "none";

					var tName5 = "my_info_text5" + d + "_" + x;
					var my_info_text5 = new masterButtons({varName:tName5,home:li_id,type:'tag'});
					my_info_text5.setTextTag('p');
					my_info_text5.setPrefix(tName5);
					my_info_text5.setContent(abbrev_date);
					//my_info_text.setContent(myIn_core + " " + myIn_desc);//works as a filter
					my_info_text5.setCustomClass(["my_info my_info_text my_info_text5 view5"]);
					my_info_text5.clearHome("false");
					my_info_text5.display();

					var mIT5_ary = my_info_text5.get_event_ids();
					var mIT5_id = mIT5_ary[0];//my_info_text

					var mIT5_el = document.getElementById(mIT5_id);
					mIT5_el.style.display = "none";

				if(check_mode == "false")
				{
					//delete btn
					var dName = "my_info_delete" + d + "_" + x;
					my_info_delete = new masterButtons({varName:dName,home:li_id,type:'tag'});
					my_info_delete.setTextTag('button');
					my_info_delete.setPrefix(dName);
					//my_info_delete.setContent('change');
					my_info_delete.setInputAttributes({"href":"#"});
					my_info_delete.setCustomClass(["my_info my_info_delete info_dot ui-btn ui-icon-delete ui-btn-icon-notext ui-shadow ui-corner-all ui-mini"]);
					my_info_delete.clearHome("false");
					my_info_delete.display();

					var mID_ary = my_info_delete.get_event_ids();
					var mID_id = mID_ary[0];

					//obj_elements[eName] = document.getElementById(mIE_id);
					document.getElementById(mID_id).dataset.info_json = myIn_json;
					document.getElementById(mID_id).addEventListener("click",function()
					{
						var info_json = JSON.parse(this.dataset.info_json);
						//
						var confirm_delete = confirm("are you sure you want to delete: \n \n " +  info_json.core_data + " \n \n " +  info_json.desc_data );

						if(confirm_delete == true)
						{
							//console.log("data-info_json = ",this.dataset.info_json);
							makeContact({"mod":"delete","info_json":this.dataset.info_json});

						}//end if

					})//end click


					//edit btn
					var eName = "my_info_edit" + d + "_" + x;
					my_info_edit = new masterButtons({varName:eName,home:li_id,type:'tag'});
					my_info_edit.setTextTag('button');
					my_info_edit.setPrefix(eName);
					my_info_edit.setInputAttributes({"href":"#"});
					//my_info_edit.setContent('change');
					my_info_edit.setCustomClass(["my_info my_info_edit info_dot ui-btn ui-icon-edit ui-btn-icon-notext ui-shadow ui-corner-all ui-mini"]);
					my_info_edit.clearHome("false");
					my_info_edit.display();

					var mIE_ary = my_info_edit.get_event_ids();
					var mIE_id = mIE_ary[0];

					//obj_elements[eName] = document.getElementById(mIE_id);
					document.getElementById(mIE_id).dataset.info_json = myIn_json;
					document.getElementById(mIE_id).addEventListener("click",function()
					{
						//alert(this.id + " \n " + this.dataset.info_json);
						var add_btn = document.getElementById("arc_add_info");
						var t_view = add_btn.dataset.view;
						get_info_form({"mod":"edit","data":this.dataset.info_json,"view":t_view});

					})//end click
				}
				else
				{
					//else of if check_mode == "false"
					//this creates a checkbox in place of the delete and edit btns in the associate info view
					//check box

					obj_elements.arc_info_chk = new masterButtons({varName:'arc_info_chk',home:li_id,type:"checkbox"});
					obj_elements.arc_info_chk.setLabels();
					obj_elements.arc_info_chk.setPrefix('arc_info_chk');
					obj_elements.arc_info_chk.setInputAttributes({"type":"checkbox"});
					if(myIn_published == "unpublished")
					{
						obj_elements.arc_info_chk.setInputAttributes({"disabled":"true"});
					}
					obj_elements.arc_info_chk.setCustomClass(["arc_info_chk " + myIn_published]);
					obj_elements.arc_info_chk.clearHome("false");

					//remember this only runs in group mode after forms are open - 2nd run similar view
					//data_store is set by this time. blank or not

					var collected_data = obj_elements["data_store"];
					if(collected_data != ""){
						collected_data = collected_data.split(",");
						//check to see if the id is already present
						var is_in_array = valueChecker({"array":collected_data,"string":myIn_id,"mod":"index","type":"sna","action":"match"});
						if(is_in_array[0] != -1)
						{
							obj_elements.arc_info_chk.setInputAttributes({"checked":"true"});
						}
					}//end if

					//obj_elements.arc_info_chk.setCasing();
					obj_elements.arc_info_chk.display();

					var arc_info_chk_ary = obj_elements.arc_info_chk.get_event_ids();
					var arc_info_chk_id = arc_info_chk_ary[0];
					//i need a unique value to store the id as (encapsulated) data
					var iUN = Math.round(Math.random() * 10000);
					var unique_str = "check_value_" + iUN;
					obj_elements[unique_str] = myIn_id;

					var info_chk_element = document.getElementById(arc_info_chk_id);
					info_chk_element.dataset.check_ref = unique_str;

					info_chk_element.onclick = function()
					{
						var check_str = this.dataset.check_ref;
						var id_value = obj_elements[check_str];
						//var collection_plate = document.getElementsByClassName("assoc_icon")[0];
						//var store_nbr = collection_plate.dataset.store_nbr;
						//var store_str = "store_" + store_nbr;
						//start with db data held in data_store
						//this is code for first run
						if(obj_elements["temp_store"] == "none"){obj_elements["temp_store"] = obj_elements["data_store"];}
						var collection_data = obj_elements["temp_store"];
						//save to temp_store in case of cancel after modifications

						//all the variables equal "8" the last iterated value
						console.log("myIn_id var = ",id_value);
						//test to see
						if(this.checked == true)
						{
							//console.log("this check is true ", this.checked);
							//get the data object
							if(collection_data != "")
							{
									//turn the string into an array
									collection_data = collection_data.split(",");

									//check to see if the id is already present
									var is_in_array = valueChecker({"array":collection_data,"string":id_value,"mod":"index","type":"sna","action":"match"});
									console.log("temp check present" , is_in_array);
									//if not add it
									if(is_in_array[0] == -1)
									{
										//if its not there put it there - if it is do nothing
										collection_data = collection_data.concat(id_value);
										obj_elements["temp_store"] = collection_data.join();
										console.log("new store data = ",obj_elements["temp_store"]);
									}

							}else
							{
								obj_elements["temp_store"] = "" + id_value + "";
								console.log("new store data = ",obj_elements["temp_store"]);
							}

						}else
						{
							//see if the dataset is empty
							if(collection_data != "")
							{
								//turn the string into an array
								collection_data = collection_data.split(",");

								//check to see if the id is already present
								var is_in_array = valueChecker({"array":collection_data,"string":id_value,"mod":"index","type":"sna","action":"match"});
								console.log("temp check present2" , is_in_array[0]);
								//if not add it
								//DONE:40 update value checker for array inconsistency
								if(is_in_array[0] != -1)
								{
									//if it is there take it out
									collection_data.splice(is_in_array[0],1);
									obj_elements["temp_store"] = collection_data.join();
									console.log("new store data = ",obj_elements["temp_store"]);
								}//end if is in array


							}//end see if its emtpy - if it is do nothing

							//console.log("this check is false ", this.checked);
						}//end else this.checked = true
					}//end onclick
					//DONE:60 needs a go btn and a cancel btn with a temp_store instead of temp_store right away
					//DONE:30 check box cursor:pointer
					//DONE:0 disable unpublished list item
					//class assoc_icon

					//DONE:50 save assoc info - edit assoc info
					/*
					if(mod == "edit"){

						if(obj_data.picture != "" && default_icon != obj_data.picture){
							icon_checkbox_element.checked = true;
						}else{
							icon_checkbox_element.checked = false;
						}

					}else{
						icon_checkbox_element.checked = true;
					}
					*/

				}//end else line @1067

				var jqm_info_chk_id = "#" + arc_info_chk_id
				$(jqm_info_chk_id).checkboxradio();


						//document.getElementById(mIE_id).addEventListener("click",function()//works


						//this works but its unneccessary
						/*
						var a_name = "a_" + d;
						obj_elements[a_name] = new masterButtons({varName:a_name,home:li_id,type:'tag'});
						obj_elements[a_name].setTextTag('a');
						obj_elements[a_name].setPrefix(a_name);
						obj_elements[a_name].setContent(my_info_data_key_array[d]);
						obj_elements[a_name].clearHome("false");
						obj_elements[a_name].display();
						*/




				}//end li for
				//initiate list view
				var ul_id_str = "#" + ul_id;
				$(ul_id_str).listview();
				$(ul_id_str).listview("refresh")

				//initiate collapsible
				if(display_view == "folder" || action != "none"){
						var col_id_str = "#" + collapsible_id;
						$(col_id_str).collapsible();
				}//end if

			}//end collapsible for


			/*
			for(var x = 0; x < obj_attributes.length; x++)
			{
				var pNameAry = Object.getOwnPropertyNames(obj_attributes[x]);
				var pName = pNameAry[0];
				newObj_input.setAttribute(pName,obj_attributes[x][pName]);
				//console.log(newObj_input);

			}//end for
			*/

			if(display_view == "folder" || action != "none"){

					var col_set_id_str = "#" + collapsible_sets_id;
					$(col_set_id_str).collapsibleset();

		}//end if

			wait_a_minute("hide");


		}//end display_my_info


		var display_test = function()
		{
			//test collapsible

			//collapsible set
			obj_elements.colap_cont = new masterButtons({varName:'colap_cont',home:'arc_display',type:'list'});
            obj_elements.colap_cont.setPrefix('colap_cont');
            obj_elements.colap_cont.setListNumber(1);
			obj_elements.colap_cont.setInputAttributes({"data-role":"collapsibleset"});
			obj_elements.colap_cont.setInputAttributes({"data-inset":"true"});
			obj_elements.colap_cont.setInputAttributes({"data-theme":"a"});
			obj_elements.colap_cont.setInputAttributes({"data-content-theme":"b"});
            obj_elements.colap_cont.display();

			var colap_cont_id_ary = obj_elements.colap_cont.get_event_ids();
			colap_cont_id_ary[0]

			//1st collapsible
			obj_elements.colap_1 = new masterButtons({varName:'colap_1',home:colap_cont_id_ary[0],type:'list'});
            obj_elements.colap_1.setPrefix('colap_1');
            obj_elements.colap_1.setListNumber(1);
			obj_elements.colap_1.setInputAttributes({"data-collapsed-icon":"phone"});
			//obj_elements.colap_1.setInputAttributes({"data-expanded-icon":"minus"});
			obj_elements.colap_1.setInputAttributes({"data-iconpos":"right"});
			obj_elements.colap_1.setInputAttributes({"data-role":"collapsible"});
            obj_elements.colap_1.display();

			var colap_1_id_ary = obj_elements.colap_1.get_event_ids();
			colap_1_id_ary[0]

			//collapsible header
			obj_elements.h2_1 = new masterButtons({varName:'h2_1',home:colap_1_id_ary[0],type:'tag'});
			obj_elements.h2_1.setTextTag('h2');
            obj_elements.h2_1.setPrefix('h2_1');
			obj_elements.h2_1.setContent('collapsible label');
			obj_elements.h2_1.clearHome("false");
            obj_elements.h2_1.display();

			var h2_id_ary = obj_elements.h2_1.get_event_ids();
			h2_id_ary[0]

			obj_elements.ul1 = new masterButtons({varName:'ul1',home:colap_1_id_ary[0],type:'ul'});
            obj_elements.ul1.setPrefix('ul1');
            obj_elements.ul1.setListNumber(1);
			obj_elements.ul1.setInputAttributes({"data-role":"listview"});
			obj_elements.ul1.setInputAttributes({"data-filter":"true"});
			obj_elements.ul1.setInputAttributes({"data-filter-theme":"a"});
			obj_elements.ul1.setInputAttributes({"data-divider-theme":"b"});
			obj_elements.ul1.clearHome("false");
            obj_elements.ul1.display();

			var ul1_id_ary = obj_elements.ul1.get_event_ids();


			obj_elements.li1 = new masterButtons({varName:'li1',home:ul1_id_ary[0],type:'li'});
            obj_elements.li1.setPrefix('li1');
            obj_elements.li1.setListNumber(3);
			obj_elements.li1.setInputAttributes({"data-role":"listview"});
			obj_elements.li1.setInputAttributes({"data-filter":"true"});
			obj_elements.li1.setInputAttributes({"data-filter-theme":"a"});
			obj_elements.li1.setInputAttributes({"data-divider-theme":"b"});
			obj_elements.li1.clearHome("false");
            obj_elements.li1.display();

			var col_id_str = "#" + colap_1_id_ary[0];
			var col_set_id_str = "#" + colap_cont_id_ary[0];
			$(col_id_str).collapsible();//this may be a push/concat array i loop through

			//code to try to control the collapsible's icons - partly works poorly
			/*
			var h2_id = h2_id_ary[0];
			var h2_el = document.getElementById(h2_id);
			var a_el = h2_el.firstChild;
			var a_el_className = a_el.className;
			var new_a_el_className = a_el_className.replace("ui-icon-plus","ui-icon-phone");
			a_el.className = new_a_el_className;
			*/

			$(col_set_id_str).collapsibleset();

			wait_a_minute("hide");


		}//end display_test


		var get_info_form = function(obj)
		{

			var mod = obj.mod;
			var view = obj.view;
			var other = "";

			var bigDaddy = document.getElementById("arc_innerPanel");//arc_display
			//clear the stage
			bigDaddy.innerHTML = "";


				var contact_form_heading  = document.createElement('h4');
				contact_form_heading.id = "contact_form_heading";
				contact_form_heading.className = "contact_form_heading arc_heading ";
				contact_form_heading.innerHTML = "add info:";



				var contact_form_cont = document.createElement('form');
				contact_form_cont.id = "contact_form_cont";
				contact_form_cont.className = "contact_form_cont";//test_brown
				//contact_form_cont.setAttribute("href","#");
				//contact_form_cont.onclick = function(){};


					var contact_form_backStage = document.createElement('div');
					contact_form_backStage.id = "contact_form_backStage";
					contact_form_backStage.className = "contact_form_backStage ";

					var contact_form_select_cont = document.createElement('div');
					contact_form_select_cont.id = "contact_form_select_cont";
					contact_form_select_cont.className = "contact_form_select_cont ";

						var contact_form_select_icon_cont = document.createElement('div');
						contact_form_select_icon_cont.id = "contact_form_select_icon_cont";
						contact_form_select_icon_cont.className = "contact_form_select_icon_cont ";

							var contact_form_slider_cont = document.createElement('div');
							contact_form_slider_cont.id = "contact_form_slider_cont";
							contact_form_slider_cont.className = "contact_form_slider_cont ";

							var contact_form_select_icon = document.createElement('div');
							contact_form_select_icon.id = "contact_form_select_icon";
							contact_form_select_icon.className = "contact_form_select_icon  SIcon ui-btn ui-icon-bullets ui-btn-icon-notext ui-corner-all ui-shadow";
							//contact_form_select_icon.style.display = "none";//why none?
							//oh - originally the select element had "" as its first element
							contact_form_select_icon.style.cursor = "default";

					contact_form_select_icon_cont.appendChild(contact_form_slider_cont);
					contact_form_select_icon_cont.appendChild(contact_form_select_icon);

						var contact_form_select = document.createElement('div');
						contact_form_select.id = "contact_form_select";
						contact_form_select.className = "contact_form_select form_input_cont";//test_pink
						//contact_form_cont.setAttribute("href","#");
						//contact_form_cont.onclick = function(){};



					contact_form_select_cont.appendChild(contact_form_select_icon_cont);
					contact_form_select_cont.appendChild(contact_form_select);

					var contact_form_hr = document.createElement('hr');
					contact_form_hr.id = "contact_form_hr";
					contact_form_hr.className = "contact_form_hr hr_90";

					var contact_form_text = document.createElement('div');
					contact_form_text.id = "contact_form_text";
					contact_form_text.className = "contact_form_text form_input_cont";
					//contact_form_text.setAttribute("href","#");
					//contact_form_text.onclick = function(){};

				contact_form_cont.appendChild(contact_form_backStage);
				contact_form_cont.appendChild(contact_form_select_cont);
				contact_form_cont.appendChild(contact_form_hr);
				contact_form_cont.appendChild(contact_form_text);

			//add new nodes
			bigDaddy.appendChild(contact_form_heading);
			bigDaddy.appendChild(contact_form_cont);






					//fill the contact form
					catSel = new masterButtons({varName:'catSel',home:'contact_form_select',type:'select'});
					switch(display_data){

						 case "info":
						 		catSel.setLabels(['info category "my":']);
							break;

							case "media":
								catSel.setLabels(['media category:']);
							break;

							case "group":
								catSel.setLabels(['community category:']);
							break;

					}//end switch

					catSel.setTitles(['select title']);
					switch(display_data){
						case "info":
							catSel.setSelectOptions(info_category_arry);
						break;

						case "media":
							catSel.setSelectOptions(media_category_arry);
						break;

						case "group":
							catSel.setSelectOptions(group_category_arry);
						break;
					}//end switch

					if(mod == "edit")
					{	var data = JSON.parse(obj.data);
						var category = data.category;
						catSel.setDefault(category);//works
						catSel.setInputAttributes({"disabled":true});
						other = obj;
					}
					catSel.setPrefix('catSel');
					catSel.setInputAttributes({"maxlength":25});
					catSel.setCustomClass(["arc_select db_category"]);
					if(display_data != "info")
					{
						catSel.setCustomSelect();
					}
					//catSel.setText("what is this");//sets initial text
					//catSel.setInputAttributes({"required":true});
					catSel.setInputAttributes({"placeholder":"select results"});
					catSel.display();

					//TODO:130 make switchabel categories without switching views.

					var sel_id_str = catSel.get_event_ids();

					if(sel_id_str.indexOf(",") != -1)
					{
						var sel_id_ary = sel_id_str.split(",");
						obj_elements.select_id = sel_id_ary[0];
						sel_id = obj_elements.select_id;
					}else
					{

					}

					var sel_id =  (typeof(sel_id_str) == "object") ? sel_id_str[0] : sel_id_str;
					obj_elements.select_id = sel_id_str[0];



					console.log("sel ids = " + sel_id);
					var sel_el =  document.getElementById(sel_id);

					//set the edit value before customizing display



					set_Icon_id(sel_id,contact_form_select_icon.id)



					sel_el.onchange = function(){

						set_Icon_id(sel_id,contact_form_select_icon.id);
						form_display(sel_id,contact_form_text.id);

					}//end onchange

					form_display(sel_id,contact_form_text.id,other);

					$("#arc_panel").panel('open');

		}//end get_info_form

		var set_Icon_id = function(in_id,ic_id)
		{
			var input_id = in_id;
			input_el = document.getElementById(input_id);
			var icon_id = ic_id;
			icon_el = document.getElementById(icon_id);

			var in_value = input_el.value;
			if(in_value != ""){
			//var in_icon_name = (in_value == "phone") ? "phone" : (in_value == "email") ? "mail" : (in_value == "notification") ? "notification" : "bars";
			var in_icon_name = icon_finder(in_value);

			in_icon_class_str =  "ui-btn ui-icon-" + in_icon_name + " ui-btn-icon-notext ui-corner-all ui-shadow";

			var oldClass = icon_el.className;
			var newClassArry = oldClass.split("ui-btn");
			var newClass = newClassArry[0] + in_icon_class_str;
			icon_el.className = newClass;

			icon_el.style.display = "block";

			}else{
				icon_el.style.display = "none";
			}

		}//end set_Icon_id

		//TODO:120 -w trace function set_info_stage
		var set_info_stage = function(in_id,s_id)
		{
			var input_id = in_id;
			var input_el = document.getElementById(input_id);
			var stage_id = s_id;
			var stage_el = document.getElementById(stage_id);

			var in_value = input_el.value;

			switch(in_value)
			{
				case "phone":

					form_display(stage_id);

				break;

				default:
					stage_el.innerHTML = "";
				break;

			}//end switch


		}//end set_Icon_id

		var form_display = function(inId,sId,tObj)
		{
			var mod = (tObj != undefined) ? tObj.mod : "make";
			var trans_obj = tObj;
			var web_icon = "false";
			var more_info = "false";
			var preview_section = "false";
			var unique_class = "";
			if(mod == "edit")
			{
				var obj_data = JSON.parse(tObj.data);
			}
			var input_id = inId;
			var input_el = document.getElementById(input_id);
			var stage_id = sId;
			var stage_el = document.getElementById(stage_id);
			stage_el.innerHTML = "";

			/*i made changed in_value into cat_value up here so i wouldn't have to go through
			the lower parts of code below the category switching and change every in_value to cat_value
			This way also has the added benefit of filtering out any customized entries and adding them
			to a catchall the fits most of the data of their display type. (display_data)
			*/

			var cat_value = input_el.value;

			switch(display_data)
			{
				case "info":
					var is_in_array = valueChecker({"array":info_category_arry,"string":cat_value,"mod":"index","type":"sna"});
					var in_value = (is_in_array[0] == -1) ? "info": cat_value;
				break;

				case "media":
					var is_in_array = valueChecker({"array":media_category_arry,"string":cat_value,"mod":"index","type":"sna"});
					var in_value = (is_in_array[0] == -1) ? "media": cat_value;
				break;

				case "group":
					var is_in_array = valueChecker({"array":group_category_arry,"string":cat_value,"mod":"index","type":"sna"});
					var in_value = (is_in_array[0] == -1) ? "group": cat_value;
				break;

			}//end switch


			switch(in_value)
			{
				case "favorite apps":
				case "social community":

					//type selector
					var typeInputType = 'text';
					var typeLabel = 'how to find you?';
					var typeTitle = 'search info <small>(how to find you)</small>:';
					var typeSelectOptions = "";
					var typeMaxLength = 25;
					var typeTypeAttr = "text";
					var typePlaceholder = "uname/number/link";
					var typeInfoText = "";
					var typeRequired = "true";
					var typeCustomize = "false";

					//input
					var inputInputType = 'text';
					var inputLabel = (in_value == "social community") ? "community's name:" : "app's name:";
					var inputTitle = (in_value == "social community") ? "community's name:" : "app's name:";
					var inputMaxLength = 30;
					var inputTypeAttr = "text";
					var inputPlaceholder = "enter the " + cat_value + " name";
					var inputRequired = "true";
					var inputCustomize = "false";

					//other data
					var otherInputType = 'text';
					var otherLabel = "url link*<small>(optional)</small>";
					var otherTitle = "url link*<small>(optional)</small>";
					var otherMaxLength = 90;
					var otherTypeAttr = "text";
					var otherPlaceholder = (cat_value == "social community") ? "enter the community's url..." : "enter the app's url...";
					var otherAutoComplete = "";
					var otherRequired = "false";
					var otherCustomize = "false";

					default_icon = "heart";
					web_icon = "true";
					more_info = "true";
					unique_class = "";

				break;

				case "phone":

					//type selector
					var typeInputType = 'select';
					var typeLabel = 'phone type:';
					var typeTitle = 'phone type';
					var typeSelectOptions = ['mobile','home','work','office'];
					var typeMaxLength = 25;
					var typeTypeAttr = "text";
					var typePlaceholder = "customize phone type";
					var typeRequired = "true";
					var typeCustomize = "true";//formerly false
					var typeInfoText = "You can create as many phone numbers as you like and assign them to different contacts.";

					//input
					var inputInputType = 'phone';
					var inputLabel = 'phone number:';
					var inputTitle = 'phone input';
					var inputMaxLength = 25;
					var inputTypeAttr = "tel";
					var inputPlaceholder = "enter a phone number";
					var inputAutoComplete = "tel";
					var inputRequired = "true";
					var inputCustomize = "true";

					default_icon = "phone";
					unique_class = "";
					//web_icon = "false";

				break;

				case "e-commerce":

					//type selector
					var typeInputType = 'select';
					var typeLabel = 'commerce type:';
					var typeTitle = 'commerce type:';
					var typeSelectOptions = ['online payments','online shopping'];
					var typeMaxLength = 25;
					var typeTypeAttr = "text";
					var typePlaceholder = "customize name type";
					var typeInfoText = "";
					var typeRequired = "true";
					var typeCustomize = "true";//formerly false

					//input
					var inputInputType = 'text';
					var inputLabel = 'web address:';
					var inputTitle = 'web address:';
					var inputMaxLength = 90;
					var inputTypeAttr = "url";
					var inputPlaceholder = "http:// or https://";
					var inputRequired = "true";
					var inputCustomize = "true";

					default_icon = "shop";
					web_icon = "true";
					unique_class = "";

				break;

				case "email":

					//type selector
					var typeInputType = 'select';
					var typeLabel = 'email type:';
					var typeTitle = 'email type';
					var typeSelectOptions = ['business','office','work','personal','hobby','website','contact us'];
					var typeMaxLength = 25;
					var typeTypeAttr = "text";
					var typePlaceholder = "customize email type";
					var typeInfoText = "";
					var typeRequired = "true";
					var typeCustomize = "true";//formerly false

					//input
					var inputInputType = 'text';
					var inputLabel = 'email address:';
					var inputTitle = 'email address';
					var inputMaxLength = 90;
					var inputTypeAttr = "email";
					var inputPlaceholder = "enter an email address";
					var inputAutoComplete = "email";
					var inputRequired = "true";
					var inputCustomize = "true";

					default_icon = "mail";
					web_icon = "true";
					unique_class = "";

				break;

				case "name":

					//type selector
					var typeInputType = 'select';
					var typeLabel = 'name type:';
					var typeTitle = 'name type';
					var typeSelectOptions = ['standard','professional with title','username','alias','first','last','nickname'];
					var typeMaxLength = 25;
					var typeTypeAttr = "text";
					var typePlaceholder = "customize name type";
					var typeInfoText = "";
					var typeRequired = "true";
					var typeCustomize = "false";

					//input
					var inputInputType = 'text';
					var inputLabel = 'name/username/alias:';
					var inputTitle = 'name/username/alias:';
					var inputMaxLength = 25;
					var inputTypeAttr = "text";
					var inputPlaceholder = "enter your name";
					var inputAutoComplete = "name";
					var inputRequired = "true";
					var inputCustomize = "true";

					default_icon = "user";
					unique_class = "";
					//web_icon = "false";

				break;

				case "web address":
				case "profile image":

					//type selector
					var typeInputType = (cat_value == "web address") ? 'select' : 'text';
					var typeLabel = (cat_value == "web address") ? 'web address type:' : 'title or describe image:';
					var typeTitle = (cat_value == "web address") ? 'web address type:' : 'title or describe image:';
					var typeSelectOptions = ['blog','business','company','personal','portfolio','project'];
					var typeMaxLength = 30;
					var typeTypeAttr = "text";
					var typePlaceholder = (cat_value == "web address") ? "customize name type" : "title or description...";
					var typeInfoText = "";
					var typeRequired = "true";
					var typeCustomize = "true";//formerly false

					//input
					var inputInputType = 'text';
					var inputLabel = (cat_value == "web address") ? 'web address:' : 'image url';
					var inputTitle = (cat_value == "web address") ? 'web address:' : 'image url';
					var inputMaxLength = 200;
					var inputTypeAttr = "url";
					var inputPlaceholder = (cat_value == "web address") ? "http:// https:// ..." : "https:// only...";
					var inputRequired = "true";
					var inputCustomize = "true";

					if(cat_value == "web address test")
					{
					default_icon = "wifi";
					web_icon = "true";
					unique_class = "";
					}else
					{
						default_icon = "camera";
						web_icon = "false";
						preview_section = "true"
						unique_class = "web_preview";
					}
					//DONE:20 have the ability to add custom classes from here

				break;

				case "notification":

					//type selector
					var typeInputType = 'select';
					var typeLabel = 'device type:';
					var typeTitle = 'device type:';
					var typeSelectOptions = ['mobile','tablet','laptop','desktop','wearable'];
					var typeMaxLength = 25;
					var typeTypeAttr = "text";
					var typePlaceholder = "customize device type";
					var typeInfoText = "";
					var typeRequired = "true";
					var typeCustomize = "true";


					//input
					var inputInputType = 'text';
					var inputLabel = 'device title:';
					var inputTitle = 'device title:';
					var inputMaxLength = 30;
					var inputPlaceholder = "name this device";
					var inputRequired = "true";
					var inputCustomize = "false";

					default_icon = "notification";
					unique_class = "";
					//web_icon = "false";

				break;

				case 'article':
				case 'blog':
				case 'picture':
				case 'music':
				case 'social network':
				case 'video':
				case 'website':
				case 'media':

					//type selector
					var typeInputType = 'text';
					var typeLabel = in_value + ' info?';
					var typeTitle = 'describe the ' + cat_value + ':';
					var typeSelectOptions = "";
					var typeMaxLength = 25;
					var typeTypeAttr = "text";
					var typePlaceholder = "Title or description...";
					var typeInfoText = "";
					var typeRequired = "true";
					var typeCustomize = "false";

					//input
					var inputInputType = 'text';
					var inputLabel = in_value + ' url?';
					var inputTitle = in_value + ' url?';
					var inputMaxLength = 90;
					var inputTypeAttr = "text";
					var inputPlaceholder = "enter the " + cat_value + " url";
					var inputRequired = "true";
					var inputCustomize = "false";

					default_icon = "wifi";
					web_icon = "true";
					unique_class = "";

				break;

				default:

					//type selector
					var typeInputType = 'text';
					var typeLabel = 'community title?';
					var typeTitle = 'community title?';
					var typeSelectOptions = "";
					var typeMaxLength = 25;
					var typeTypeAttr = "text";
					var typePlaceholder = "Title or description...";
					var typeInfoText = "";
					var typeRequired = "true";
					var typeCustomize = "false";

					//input
					var inputInputType = 'text';
					var inputLabel = 'community url?';
					var inputTitle = 'community url?';
					var inputMaxLength = 90;
					var inputTypeAttr = "text";
					var inputPlaceholder = "enter url...";
					var inputRequired = "false";
					var inputCustomize = "false";

					//other data
					var otherInputType = 'textarea';
					var otherLabel = "other info*<small>(optional)</small>";
					var otherTitle = "other info*<small>(optional)</small>";
					var otherMaxLength = 120;
					var otherTypeAttr = "text";
					var otherPlaceholder = "any other details?";
					var otherAutoComplete = "";
					var otherRequired = "false";
					var otherCustomize = "false";

					default_icon = "group";
					web_icon = "true";
					more_info = "true";
					unique_class = "";


				break;

			}//end switch

			var arc_info_type = document.createElement('div');
			arc_info_type.id = "arc_info_type";
			arc_info_type.className = "arc_info_type info_booth";//test_orange

			var arc_info_hr = document.createElement('hr');
			arc_info_hr.className = "arc_info_hr hr_90";

			var arc_info_core = document.createElement('div');
			arc_info_core.id = "arc_info_core";
			arc_info_core.className = "arc_info_core info_booth";//test_orange

			var arc_info_other = document.createElement('div');
			arc_info_other.id = "arc_info_other";
			arc_info_other.className = "arc_info_other info_booth";//test_orange

			var arc_info_preview = document.createElement('div');
			arc_info_preview.id = "arc_info_preview";
			arc_info_preview.className = "arc_info_preview info_booth";//test_orange

			var arc_go_cont = document.createElement('div');
			arc_go_cont.id = "arc_go_cont";
			arc_go_cont.className = "arc_go_cont info_booth"; //test_green

			stage_el.appendChild(arc_info_type);
			//stage_el.appendChild(arc_info_hr);
			stage_el.appendChild(arc_info_core);
			if(more_info == "true")
			{
				stage_el.appendChild(arc_info_other);
			}
			if(preview_section == "true")
			{
				stage_el.appendChild(arc_info_preview);
			}
			//stage_el.appendChild(arc_info_hr);
			stage_el.appendChild(arc_go_cont);

			createCancelBtn();


			//sets master on off toggle switch
			accSlide = new masterButtons({varName:'accSlide',home:"contact_form_slider_cont",type:"slider"});
			accSlide.setLabels(["master access:"]);
			accSlide.setTitles(["master access"]);
			accSlide.setPrefix('accSlide');
			accSlide.setSelectOptions(['deny','allow']);//(['formerly','this']);
			if(mod == "edit"){
				var slide_value = (obj_data.published == "1") ? "allow" : "deny";
				accSlide.setDefault(slide_value);
			}else{
				accSlide.setDefault('allow');
			}
			accSlide.setInputAttributes({"maxlength":15});
			accSlide.setInputAttributes({"type":"text"});
			accSlide.setCustomClass(["arc_slider"]);
			accSlide.setCustomSelect();//adds a custom option to an input select menu
			//accSlide.setText("what is this");//sets initial text
			//accSlide.setInputAttributes({"required":true});
			//accSlide.clearHome("false");//important for multiple elements
			accSlide.setInputAttributes({"placeholder":typePlaceholder});
			accSlide.display();

			var accSlide_id_array = accSlide.get_event_ids();
			var accSlide_id = accSlide_id_array[0];


				$("#"+accSlide_id).change(function()
				{
					if(in_value == "notification" && mod == "edit")
					{
						//do nothing

					}else{
						checkChange({"mode":"validate","more_info":more_info},trans_obj);
						console.log("get current valuel = ",accSlide.getCurrentValue2())
					}//end if


				})//end onchange

			clrTag = new masterButtons({varName:'clrTag',home:'contact_form_slider_cont',type:'tag'});
			clrTag.setTextTag('div');
            clrTag.setPrefix('clrTag');
			clrTag.setCustomClass(["clr clear"]);
			clrTag.clearHome("false");
            clrTag.display();

			clrTag2 = new masterButtons({varName:'clrTag2',home:'contact_form_select_icon_cont',type:'tag'});
			clrTag2.setTextTag('div');
            clrTag2.setPrefix('clrTag2');
			clrTag2.setCustomClass(["clr clear"]);
			clrTag2.clearHome("false");
            clrTag2.display();

			//data1
			typeSel = new masterButtons({varName:'typeSel',home:arc_info_type.id,type:typeInputType});
			typeSel.setLabels([typeLabel]);
			typeSel.setTitles([typeTitle]);
			typeSel.setPrefix('typeSel');
			if(typeSelectOptions != undefined && typeSelectOptions != "")
			{
				typeSel.setSelectOptions(typeSelectOptions);//(['formerly','this']);
			}
			typeSel.setInputAttributes({"maxlength":typeMaxLength});
			typeSel.setInputAttributes({"type":typeTypeAttr});
			typeSel.setInputAttributes({"data-required":typeRequired});
			if(mod == "edit"){
				if(typeInputType == "select")
				{
					typeSel.setDefault(obj_data.desc_data);
				}else{
					typeSel.setText(obj_data.desc_data);//sets initial text
				}//end else

			}
			typeSel.setCustomClass(["arc_select db_type borderline " + unique_class]);
			if(typeInputType == "select" && typeCustomize == "true")
			{
				typeSel.setCustomSelect();//adds a custom option to an input select menu
			}
			//typeSel.setText("what is this");//sets initial text
			//typeSel.setInputAttributes({"required":true});
			if(web_icon == "true"){
				//sets casing to prep for the suggested icon container
				typeSel.setCasing();
			}
			typeSel.clearHome("false");//important for multiple elements
			typeSel.setInputAttributes({"placeholder":typePlaceholder});
			if(mod == "edit" && in_value == "notification"){
				//disable the input
				typeSel.setInputAttributes({"disabled":true});
			}//end if
			typeSel.display();

			var typeSel_id_array = typeSel.get_event_ids();

			for(var c = 0; c < typeSel_id_array.length; c++){

				var typeSelElement = document.getElementById(typeSel_id_array[c]);
				typeSelElement.addEventListener("focus",function(){typeSelElement.select();});

				typeSelElement.addEventListener("input",function()
				{
					if(in_value == "notification" && mod == "edit")
					{
						//do nothing

					}else{
						checkChange({"mode":"validate","more_info":more_info},trans_obj);
					}//end if


				})//end onchange
				//needs another listner for switch back bugfix where no check occurs
				typeSelElement.addEventListener("blur",function()
				{
					if(in_value == "notification" && mod == "edit")
					{
						//do nothing

					}else{
						checkChange({"mode":"validate","more_info":more_info},trans_obj);
					}//end if


				})//end onchange
			}//end for

			//section for suggested icon;
			if(web_icon == "true"){

				//icon side menu
				obj_elements.sug_icon_cont = new masterButtons({varName:'sug_icon_cont',home:arc_info_type.id,type:'tag'});
				obj_elements.sug_icon_cont.setTextTag('div');
				obj_elements.sug_icon_cont.setPrefix('sug_icon_cont');
				//obj_elements.sug_icon_cont.setContent('collapsible label');
				obj_elements.sug_icon_cont.setCustomClass(["sug_icon_cont side_car"]);
				obj_elements.sug_icon_cont.clearHome("false");
				obj_elements.sug_icon_cont.display();

				var sug_icon_cont_ary = obj_elements.sug_icon_cont.get_event_ids();
				var sug_icon_cont_id = sug_icon_cont_ary[0];

				//sets the displayed icon
				obj_elements.sug_icon = new masterButtons({varName:'sug_icon',home:sug_icon_cont_id,type:'tag'});
				obj_elements.sug_icon.setTextTag('div');
				obj_elements.sug_icon.setPrefix('sug_icon');
				//obj_elements.sug_icon.setInputAttributes({"data-icon_value":default_icon});
				//obj_elements.sug_icon.setContent('collapsible label');
				if(mod == "edit")
				{
					obj_elements.sug_icon.setCustomClass(["sug_icon ui-btn ui-icon-" + obj_data.picture + " ui-btn-icon-notext ui-corner-all ui-shadow ui-nodisc-icon "]);
				}else{
				obj_elements.sug_icon.setCustomClass(["sug_icon ui-btn ui-icon-" + default_icon + " ui-btn-icon-notext ui-corner-all ui-shadow ui-nodisc-icon "]);
				}
				obj_elements.sug_icon.clearHome("false");
				obj_elements.sug_icon.display();

				var sug_icon_ary = obj_elements.sug_icon.get_event_ids();
				var sug_icon_id = sug_icon_ary[0];
				var sug_icon_element = document.getElementById(sug_icon_id);
				sug_icon_element.dataset.icon_value = (mod == "edit" && obj_data.picture != undefined && obj_data.picture != "") ? obj_data.picture : default_icon;

				//no pointer
				sug_icon_element.style.cursor = "default";

				obj_elements.sug_icon_chk = new masterButtons({varName:'sug_icon_chk',home:sug_icon_cont_id,type:inputInputType});
				obj_elements.sug_icon_chk.setLabels();
				obj_elements.sug_icon_chk.setPrefix('sug_icon_chk');
				obj_elements.sug_icon_chk.setInputAttributes({"type":"checkbox"});
				obj_elements.sug_icon_chk.setCustomClass(["sug_icon_chk"]);
				obj_elements.sug_icon_chk.clearHome("false");
				//obj_elements.sug_icon_chk.setCasing();
				obj_elements.sug_icon_chk.display();

				var sug_icon_chk_ary = obj_elements.sug_icon_chk.get_event_ids();
				var sug_icon_chk_id = sug_icon_chk_ary[0];
				var icon_checkbox_element = document.getElementById(sug_icon_chk_id);

				if(mod == "edit"){

					if(obj_data.picture != "" && default_icon != obj_data.picture){
						icon_checkbox_element.checked = true;
					}else{
						icon_checkbox_element.checked = false;
					}

				}else{
					icon_checkbox_element.checked = true;
				}

				var accSlide_id_array = accSlide.get_event_ids();
			var accSlide_id = accSlide_id_array[0];


			//obj_elements.accSlide =  document.getElementById(sug_icon_chk_id)
			var sug_icon_chkElement = document.getElementById(sug_icon_chk_id);
				sug_icon_chkElement.addEventListener("click", function()
				{
					if(in_value == "notification" && mod == "edit")
					{
						//do nothing

					}else{

						//check for icon updates
						if(web_icon == "true"){
						var icon_set = (in_value != "email") ? "social" : "mail"
						update_web_icon({"input_id":dataInp_id,"icon_id":sug_icon_id,"change_id":chng_cont_id,"icon_set":icon_set});

						//then validate
						checkChange({"mode":"validate","more_info":more_info},trans_obj);
						}

					}//end if


				})//end onchange


				var jqm_sug_icon_chk_id = "#" + sug_icon_chk_id
				$(jqm_sug_icon_chk_id).checkboxradio();


				obj_elements.chng_cont = new masterButtons({varName:'chng_cont',home:sug_icon_cont_id,type:'tag'});
				obj_elements.chng_cont.setTextTag('div');
				obj_elements.chng_cont.setPrefix('chng_cont');
				//obj_elements.chng_cont.setContent('collapsible label');
				obj_elements.chng_cont.setCustomClass(["chng_cont"]);
				obj_elements.chng_cont.clearHome("false");
				obj_elements.chng_cont.display();

				var chng_cont_ary = obj_elements.chng_cont.get_event_ids();
				var chng_cont_id = chng_cont_ary[0];

				var changeCont = document.getElementById(chng_cont_id);
				changeCont.style.display = "none";

				obj_elements.chng_img1 = new masterButtons({varName:'chng_img1',home:chng_cont_id,type:'tag'});
				obj_elements.chng_img1.setTextTag('a');
				obj_elements.chng_img1.setPrefix('chng_img1');
				obj_elements.chng_img1.setContent('change');
				obj_elements.chng_img1.setCustomClass(["chng_img  ui-btn ui-icon-carat-l ui-btn-icon-notext ui-shadow ui-nodisc-icon ui-alt-icon "]);
				obj_elements.chng_img1.clearHome("false");
				obj_elements.chng_img1.display();

				var chng_img1_ary = obj_elements.chng_img1.get_event_ids();
				var chng_img1_id = chng_img1_ary[0];

				var changeElement1 = document.getElementById(chng_img1_id);

				changeElement1.addEventListener("click",function()
				{
					icon_switcher(sug_icon_id,"prev");

				})//end click

				obj_elements.chng_img2 = new masterButtons({varName:'chng_img2',home:chng_cont_id,type:'tag'});
				obj_elements.chng_img2.setTextTag('a');
				obj_elements.chng_img2.setPrefix('chng_img2');
				obj_elements.chng_img2.setContent('change');
				obj_elements.chng_img2.setCustomClass(["chng_img  ui-btn ui-icon-carat-r ui-btn-icon-notext ui-shadow ui-nodisc-icon ui-alt-icon "]);
				obj_elements.chng_img2.clearHome("false");
				obj_elements.chng_img2.display();

				var chng_img2_ary = obj_elements.chng_img2.get_event_ids();
				var chng_img2_id = chng_img2_ary[0];

				var changeElement2 = document.getElementById(chng_img2_id);

				changeElement2.addEventListener("click",function()
				{
					icon_switcher(sug_icon_id,"next");

				})//end click

			}//end if web_icon

			//data2
			dataInp = new masterButtons({varName:'dataInp',home:arc_info_core.id,type:inputInputType});
			dataInp.setLabels([inputLabel]);
			dataInp.setTitles([inputTitle]);
			dataInp.setPrefix('dataInp');
			dataInp.setInputAttributes({"maxlength":inputMaxLength});
			dataInp.setInputAttributes({"type":inputTypeAttr});
			if(mod == "edit" && in_value == "notification"){
				//disable the input
				dataInp.setInputAttributes({"disabled":true});
			}//end if
			if(inputInputType == "select" && inputCustomize == "true")
			{
				dataInp.setCustomSelect();//adds a custom option to an input select menu
			}
			dataInp.setInputAttributes({"data-required":inputRequired});
			dataInp.setCustomClass(["arc_input db_input borderline " + unique_class]);
			if(mod == "edit"){
				dataInp.setText(obj_data.core_data);//sets initial text
			}
			//dataInp.setInputAttributes({"required":true});
			//dataInp.clearHome("false");
			if(inputAutoComplete != undefined && inputAutoComplete != ""){
			dataInp.setInputAttributes({"autocomplete":inputAutoComplete});
			dataInp.setInputAttributes({"name":inputAutoComplete});
			/*a combination of name="email" & autocomplete="email" seems to work for email & tel*/
			}
			dataInp.setInputAttributes({"placeholder":inputPlaceholder});
			if(display_data == "group"){
				//sets casing to prep for the suggested icon container
				dataInp.setCasing();
			}
			//
			dataInp.display();



			var dataInp_id_array = dataInp.get_event_ids();
			var dataInp_id = dataInp_id_array[0];

			//why do i have a for loop here?
			//for(var c = 0; c < dataInp_id_array.length; c++){

				var dataInpElement = document.getElementById(dataInp_id);
				dataInpElement.addEventListener("focus",function(){dataInpElement.select();})

				dataInpElement.addEventListener("input",function()
				{
					if(in_value == "notification" && mod == "edit")
					{
						//do nothing
					}else{

						if(web_icon == "true"){
							var icon_set = (in_value != "email") ? "social" : "mail"
							update_web_icon({"input_id":dataInp_id,"icon_id":sug_icon_id,"change_id":chng_cont_id,"icon_set":icon_set});
						}

						checkChange({"mode":"validate","more_info":more_info},trans_obj);
						if(preview_section == "true"){
							display_preview_image(this.id,this.value);
						}
					}//end else



				})//end input

			//}//end for


			if(display_data == "group"){
				//side menu area
				obj_elements.assoc_info_cont = new masterButtons({varName:'assoc_info_cont',home:arc_info_core.id,type:'tag'});
				obj_elements.assoc_info_cont.setTextTag('div');
				obj_elements.assoc_info_cont.setPrefix('assoc_info_cont');
				//obj_elements.assoc_info_cont.setContent('collapsible label');
				obj_elements.assoc_info_cont.setCustomClass(["assoc_info_cont side_car"]);
				obj_elements.assoc_info_cont.clearHome("false");
				obj_elements.assoc_info_cont.display();

				var assoc_info_cont_ary = obj_elements.assoc_info_cont.get_event_ids();
				var assoc_info_cont_id = assoc_info_cont_ary[0];

				//sets the displayed icon
				obj_elements.assoc_icon = new masterButtons({varName:'assoc_icon',home:assoc_info_cont_id,type:'tag'});
				obj_elements.assoc_icon.setTextTag('button');
				obj_elements.assoc_icon.setPrefix('assoc_icon');
				//obj_elements.assoc_icon.setInputAttributes({"data-icon_value":default_icon});
				obj_elements.assoc_icon.setInputAttributes({"href":"#"});
				if(mod == "edit"){
					obj_elements.assoc_icon.setInputAttributes({"data-assoc":obj_data.info_ids});
				}else{
					obj_elements.assoc_icon.setInputAttributes({"data-info_ids":""});
				}
				//obj_elements.assoc_icon.setContent('collapsible label');
				obj_elements.assoc_icon.setCustomClass(["assoc_icon ui-btn ui-icon-contact_chk ui-btn-icon-notext ui-corner-all ui-shadow ui-nodisc-icon "]);
				obj_elements.assoc_icon.clearHome("false");
				obj_elements.assoc_icon.display();

				var assoc_icon_ary = obj_elements.assoc_icon.get_event_ids();

				var assoc_icon_id = assoc_icon_ary[0];
				var assoc_icon_element = document.getElementById(assoc_icon_id);

				//obj_elements["change_shuttle"] = []; //create_light_box can pass this data
				//obj_elements["change_shuttle"] = [{"mode":"validate","more_info":more_info},trans_obj];

				//try data set here
				if(mod == "edit"){
					//populate class property with db data
					obj_elements["data_store"] = obj_data.info_ids;
					obj_elements["temp_store"] = "none";
					//assoc_icon_element.setAttribute("data-store_nbr",obj_data.id);
				}else{
					//or else prep data_store variable
					obj_elements["data_store"] = "";
					obj_elements["temp_store"] = "none";
					//assoc_icon_element.setAttribute("data-store_nbr",obj_data.id);
				}
				//then do click event
				assoc_icon_element.onclick = function(e)
				{
					//this helps the button to not go haywire when its clicked
						e.preventDefault();
						console.info("hold up wait a minute.");
						create_light_box({home:'contact_form_backStage',animate:"off",shuttle:{"mode":"validate","more_info":more_info},trans:trans_obj});
						getMyInfo("checks");

				};//end function onclick
			}//end if display_data == group

			if(more_info == "true")
			{


				//data3
				otherInp = new masterButtons({varName:'otherInp',home:arc_info_other.id,type:otherInputType});
				otherInp.setLabels([otherLabel]);
				otherInp.setTitles([otherTitle]);
				otherInp.setPrefix('otherInp');
				otherInp.setInputAttributes({"maxlength":otherMaxLength});
				otherInp.setInputAttributes({"type":otherTypeAttr});
				if(mod == "edit" && in_value == "notification"){
					//disable the input
					otherInp.setInputAttributes({"disabled":true});
				}//end if
				otherInp.setInputAttributes({"data-required":otherRequired});
				otherInp.setCustomClass(["arc_input db_input borderline " + unique_class]);
				otherInp.clearHome("false");
				if(mod == "edit"){
					otherInp.setText(obj_data.other_data);//sets initial text
				}
				if(otherInputType == "select" && otherCustomize == "true")
				{
					otherInp.setCustomSelect();//adds a custom option to an input select menu
				}
				//otherInp.setInputAttributes({"required":true});
				//otherInp.clearHome("false");
				if(otherAutoComplete != undefined && otherAutoComplete != ""){
				otherInp.setInputAttributes({"autocomplete":otherAutoComplete});
				otherInp.setInputAttributes({"name":otherAutoComplete});
				/*a combination of name="email" & autocomplete="email" seems to work for email & tel*/
				}
				otherInp.setInputAttributes({"placeholder":otherPlaceholder});
				otherInp.setCasing();
				otherInp.display();

				var otherInp_id_array = otherInp.get_event_ids();
				var otherInp_id = otherInp_id_array[0];

				for(var c = 0; c < otherInp_id_array.length; c++){

					var otherInpElement = document.getElementById(otherInp_id);
					otherInpElement.addEventListener("focus",function(){otherInpElement.select();})

					otherInpElement.addEventListener("input",function()
					{
						if(in_value == "notification" && mod == "edit")
						{
							//do nothing
						}else{
							checkChange({"mode":"validate","more_info":more_info},trans_obj);
						}//end else


					})//end onchange

				}//end for
			}
			//TODO:160 if empty fill apps with a link to the play store or ios store social com - link url

			//sample section
			if(preview_section == "true")
			{
				obj_elements.previewBox  = new masterButtons({varName:'previewBox',home:'arc_info_preview',type:'tag'});
				obj_elements.previewBox .setTextTag('div');
				obj_elements.previewBox .setPrefix('previewBox');
				obj_elements.previewBox .setCustomClass(["previewBox"]);
				obj_elements.previewBox .clearHome("false");
				obj_elements.previewBox .display();

				var previewBox_id_array = obj_elements.previewBox.get_event_ids();
				var previewBoxElement = document.getElementById(previewBox_id_array[0]);
				previewBoxElement.click = function()
				{
					//document.getElementById("contact_form_backStage").innerHTML = "";
				}//end on click

				//if edit mode run the preview_section
				if(mod == "edit"){
					display_preview_image(dataInp_id);
				}

			}//end preview_section


			//if notification btns
			if(in_value == "notification"){
				tNoteBtn = new masterButtons({varName:'tNoteBtn',home:arc_info_core.id,type:'buttonGroup'});
				tNoteBtn.setPrefix('tNoteBtn');
				tNoteBtn.setLabels(['test','refresh']);
				tNoteBtn.setTitles(['test device notification','refresh notification']);
				//tNoteBtn.setGroupLabel('notification test');
				tNoteBtn.setCustomClass(["ui-icon-notification ui-btn ui-shadow ui-btn-inline ui-btn-icon-left","ui-icon-refresh ui-btn ui-shadow ui-btn-inline ui-btn-icon-left " + unique_class]);// ui-btn-icon-notext
				tNoteBtn.clearHome("false");
				tNoteBtn.setCasing();
				tNoteBtn.display();

				var tNoteBtn_id_array = tNoteBtn.get_event_ids();
				var tNoteBtnElement = document.getElementById(tNoteBtn_id_array[0]);
				tNoteBtnElement.addEventListener("click",function()
				{
					if(mod == "edit")
					{
						testNote(obj_data.extra);
					}else{
						testNote();
					}

				})//end onchange

				//btns need events
			}//end if

			set_arc_info(typeInfoText);

		}//end form_display


		var create_light_box = function(obj)
		{
			var home_str = obj.home;
			var animation_state = obj.animate || "on";

						if(!document.getElementsByClassName("liteBox")[0])
						{
							obj_elements.liteBox  = new masterButtons({varName:'liteBox',home:home_str,type:'tag'});
							obj_elements.liteBox .setTextTag('div');
				      obj_elements.liteBox .setPrefix('liteBox');

							if(animation_state == "on")
							{
								obj_elements.liteBox .setCustomClass(["liteBox bright"]);
							}else
							{
								obj_elements.liteBox .setCustomClass(["liteBox popup"]);
							}

							obj_elements.liteBox .clearHome("false");
				      obj_elements.liteBox .display();

							var liteBox_id_array = obj_elements.liteBox.get_event_ids();
							var liteBoxElement = document.getElementById(liteBox_id_array[0]);
							liteBoxElement.ondblclick = function()
							{
								//document.getElementById("contact_form_backStage").innerHTML = "";
							}

							obj_elements.fish_eye = new masterButtons({varName:'fish_eye',home:'liteBox',type:'tag'});
							obj_elements.fish_eye.setTextTag('button');
							obj_elements.fish_eye.setPrefix('fish_eye');
							//obj_elements.fish_eye.setInputAttributes({"href":"#"});
							obj_elements.fish_eye.setInputAttributes({"title":"cancel"});
							obj_elements.fish_eye.setContent("<h4>Cancel</h4>");
							obj_elements.fish_eye.setCustomClass(["fish_eye ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right"]);
							obj_elements.fish_eye.clearHome("false");
							obj_elements.fish_eye.display();

							var fish_eye_id_array = obj_elements.fish_eye.get_event_ids();
							var fishEyeElement = document.getElementById(fish_eye_id_array[0]);
							fishEyeElement.onclick = function(e)
							{
								e.preventDefault();
								obj_elements["temp_store"] = "none";
								document.getElementById("contact_form_backStage").innerHTML = "";

							}//end fishCancelElement.onclick

							obj_elements.fishBowl = new masterButtons({varName:'fishBowl',home:'liteBox',type:'tag'});
							obj_elements.fishBowl.setTextTag('div');
				      obj_elements.fishBowl.setPrefix('fishBowl');
							obj_elements.fishBowl.setCustomClass(["fishBowl"]);
							obj_elements.fishBowl.clearHome("false");
				      obj_elements.fishBowl.display();

							//fishbowl content
							obj_elements.fish_content = new masterButtons({varName:'fish_content',home:'fishBowl',type:'tag'});
							obj_elements.fish_content.setTextTag('div');
				      obj_elements.fish_content.setPrefix('fish_content');
							obj_elements.fish_content.setCustomClass(["fish_content"]);
							obj_elements.fish_content.clearHome("false");
				      obj_elements.fish_content.display();
							//fishbowl confirm
							obj_elements.fish_controls = new masterButtons({varName:'fish_controls',home:'fishBowl',type:'tag'});
							obj_elements.fish_controls.setTextTag('div');
							obj_elements.fish_controls.setPrefix('fish_controls');
							obj_elements.fish_controls.setCustomClass(["fish_controls"]);
							obj_elements.fish_controls.clearHome("false");
							obj_elements.fish_controls.display();

							//fishBowl
							obj_elements.fish_confirm = new masterButtons({varName:'fish_confirm',home:'fish_controls',type:'tag'});
							obj_elements.fish_confirm.setTextTag('button');
							obj_elements.fish_confirm.setPrefix('fish_confirm');
							//obj_elements.fish_confirm.setInputAttributes({"href":"#"});
							obj_elements.fish_confirm.setInputAttributes({"title":"submit"});
							obj_elements.fish_confirm.setContent("<h4>OK</h4>");
							obj_elements.fish_confirm.setCustomClass(["fish_confirm ui-btn ui-icon-check ui-btn-icon-left ui-btn-icon-notext"]);
							obj_elements.fish_confirm.clearHome("false");
							obj_elements.fish_confirm.display();

							var fish_confirm_id_array = obj_elements.fish_confirm.get_event_ids();
							var fishConfirmElement = document.getElementById(fish_confirm_id_array[0]);
							fishConfirmElement.onclick = function(e)
							{
								e.preventDefault();
								obj_elements["data_store"] = obj_elements["temp_store"];
								obj_elements["temp_store"] = "none";
								document.getElementById("contact_form_backStage").innerHTML = "";


								checkChange(obj.shuttle,obj.trans);

							}//end fishConfirmElement.onclick

							obj_elements.fish_cancel = new masterButtons({varName:'fish_cancel',home:'fish_controls',type:'tag'});
							obj_elements.fish_cancel.setTextTag('button');
							obj_elements.fish_cancel.setPrefix('fish_cancel');
							//obj_elements.fish_cancel.setInputAttributes({"href":"#"});
							obj_elements.fish_cancel.setInputAttributes({"title":"cancel"});
							obj_elements.fish_cancel.setContent("<h4>Cancel</h4>");
							obj_elements.fish_cancel.setCustomClass(["fish_cancel ui-btn ui-icon-delete ui-btn-icon-left ui-btn-icon-notext"]);
							obj_elements.fish_cancel.clearHome("false");
							obj_elements.fish_cancel.display();

							var fish_cancel_id_array = obj_elements.fish_cancel.get_event_ids();
							var fishCancelElement = document.getElementById(fish_cancel_id_array[0]);
							fishCancelElement.onclick = function(e)
							{
								e.preventDefault();
								obj_elements["temp_store"] = "none";
								document.getElementById("contact_form_backStage").innerHTML = "";

							}//end fishCancelElement.onclick


						}//if !document...

		}//end create_light_box

		var display_preview_image = function(id){

			var targetElement = document.getElementById(id);
			var targetValue = targetElement.value;
			if(targetValue.indexOf("http") != -1 && targetValue.indexOf("https") == -1)
			{
				var new_Value = targetValue.replace("http","https");
				targetElement.value = new_Value;
			}else {
				//var new_Value = targetValue;
			}

			//preview image container
			if(!document.getElementsByClassName("prev_cont")[0])
			{
			prev_cont = new masterButtons({varName:'prev_cont',home:'previewBox',type:'tag'});
			prev_cont.setTextTag('div');
			prev_cont.setPrefix('prev_cont');
			//prev_cont.setInputAttributes({"href":"#"});
			prev_cont.setInputAttributes({"title":"image preview"});
			//prev_cont.setContent();
			prev_cont.setCustomClass(["prev_cont"]);
			prev_cont.clearHome("false");
			prev_cont.display();

			prev_img = new masterButtons({varName:'prev_img',home:'prev_cont',type:'tag'});
			prev_img.setTextTag('img');
			prev_img.setPrefix('prev_img');
			//prev_img.setInputAttributes({"href":"#"});
			prev_img.setInputAttributes({"title":"image preview"});
			//prev_img.setContent();
			prev_img.setCustomClass(["prev_img"]);
			prev_img.clearHome("false");
			prev_img.display();

			var prev_img_id_array = prev_img.get_event_ids();
			obj_elements.prev_imgElement = document.getElementById(prev_img_id_array[0]);
			}
			try{
			obj_elements.prev_imgElement.onerror = function(){
				obj_elements.prev_imgElement.src = ARC_IMG_URL + "flame.png";
				obj_elements.prev_imgElement.style.backgroundColor = "red";
			}
			obj_elements.prev_imgElement.onload = function(){
				obj_elements.prev_imgElement.style.backgroundColor = "none";
			}

			obj_elements.prev_imgElement.src = targetElement.value;
			}catch(err){}


			//preview image

			//dynamic src

		}//end display_preview_image

		var checkChange = function(mob,tObj)
		{
			var mode = mob.mode;
			var more_info = mob.more_info
			//mod is edit or make passed from form_display

			var form_id_Ary = [];

			typeSel.runDataCheck();
			dataInp.runDataCheck();

				//check group for validity
				form_id_Ary = form_id_Ary.concat(typeSel.get_event_ids());
				form_id_Ary = form_id_Ary.concat(dataInp.get_event_ids());
				//add new data objects here to be part of validation process
				if(otherInp != undefined && more_info == "true"){
					form_id_Ary = form_id_Ary.concat(otherInp.get_event_ids());
				}

				console.log(form_id_Ary);

				var isReady = validityCheck(form_id_Ary);

				if(isReady == true)
				{
					arc_giveItAGo({"ready":"yes","more_info":more_info},tObj);
				}else{

					arc_giveItAGo({"ready":"no","more_info":more_info},tObj);
				}

				if(mode == "submit" && isReady == true)
				{
					//upload data
					makeContact(tObj);

				}

		}//end checkChange

		var update_web_icon = function(wiObj)
		{
			var input_id = wiObj.input_id;
			var icon_id = wiObj.icon_id;
			var change_container_id = wiObj.change_id;//contains the switch btns
			var change_container = document.getElementById(change_container_id);
			var icon_set = wiObj.icon_set || "social";

			var target_input = document.getElementById(input_id);
			var target_value = target_input.value;

			var target_icon = document.getElementById(icon_id);
			var target_icon_className = target_icon.className;
			console.log("class string = ",target_icon_className);
			//remove old jqm icon
			var icon_match = target_icon_className.match(/ui-icon-[^0-9 \s]*/g,' ');// \s{0}
			var mod_icon_class = target_icon_className.replace(/ui-icon-[^0-9 \s]*/g,' ');///ui-icon-[^0-9]*/g
			console.log("match string = ",icon_match);
			console.log("class string = ",mod_icon_class);

			//get new jqm icons
			var icon_values = icon_finder(target_value,icon_set);

			if(icon_values != "none")
			{
				//form new icon_str
				var new_icon_class = mod_icon_class + " ui-icon-" + icon_values[0] + " ";
				//update the targets classname
				target_icon.className = new_icon_class;
				target_icon.dataset.icon_value = icon_values[0];
				target_icon.dataset.icon_set = icon_values.join();
				console.log("icon set ",target_icon);

				if(icon_values.length > 1)
				{
					change_container.style.display = "block";
					icon_switcher(icon_id);
				}else
				{
					change_container.style.display = "none";
				}

			}else
			{
				//if its not there it needs to go back to blank
				var new_icon_class = mod_icon_class + " ui-icon-" + default_icon;
				//update the targets classname
				target_icon.className = new_icon_class;
				target_icon.dataset.icon_value = default_icon;

				change_container.style.display = "none";
			}//end else

			//https://happynotification.org/phone
			//https://facebook.com/wordpress/twitter
			//https://drive.google.com/folderview

		}//end update_web_icon

		var icon_switcher = function(icnID,dir)
		{
			var icon_id = icnID;
			var target_icon = document.getElementById(icon_id);
			var direction = dir;

			//get the current value
			var icon_value = target_icon.dataset.icon_value;

			//get the icon set
			var icon_set = target_icon.dataset.icon_set;
			var i_set_array = icon_set.split(",");
			console.log("icon set array = ",i_set_array);

			var current_index_array = valueChecker({"array":i_set_array,"string":icon_value,"mod":"index","type":"sna"});
			current_index = current_index_array[0]

			var switch_index = current_index;


			if(direction == "next" && current_index < i_set_array.length - 1)
			{
				switch_index = current_index + 1;
			}

			if(direction != "next" && current_index > 0)
			{
				switch_index = current_index - 1;
			}



			if(switch_index != current_index)
			{
				var target_icon_className = target_icon.className;
				var mod_icon_class = target_icon_className.replace(/ui-icon-[^0-9 \s]*/g,' ');
				//form a new class
				var new_icon_class = mod_icon_class + " ui-icon-" + i_set_array[switch_index] + " ";

				//update the targets classname
				target_icon.className = new_icon_class;
				target_icon.dataset.icon_value = i_set_array[switch_index];
				console.log("updated icon value ",target_icon);
			}

		}//end icon_switcher



		var arc_giveItAGo = function(gOb,tObj)
		{
			//mod is edit or make passed from form_display
			//TODO:80 enter key go btn
			if(gOb.ready == "yes")
			{
				//if the btns not there make it
				if(!document.getElementById("arc_go_btn"))
				{

					var targContain = document.getElementById("arc_go_cont");
					var canEl = document.getElementById("arc_can_btn");
					var goEl = document.createElement('a');
					goEl.id = "arc_go_btn";
					goEl.className = "arc_go_btn ui-btn ui-icon-check ui-btn-icon-left ui-btn-icon-notext";
					goEl.setAttribute("href","#");
					//goEl.setAttribute("onclick","setItOff()");
					goEl.innerHTML = "<h4>OK</h4>";
					goEl.title = "make contact";
					goEl.addEventListener("click",function(){
						checkChange({"mode":"submit","more_info":gOb.more_info},tObj);
					});


					targContain.insertBefore(goEl,canEl);/**/
				}

			}else
			{
				//if the btn is there get rid of it
				if(document.getElementById("arc_go_btn"))
				{
					var goEl = document.getElementById("arc_go_btn");
					var goPar = goEl.parentNode;
					goPar.removeChild(goEl);

				}//end if

			}
		}//end arc_giveItAGo

		var set_arc_info = function(msg)
		{

			var info_id = "main_arc_info"
			var info_stage = document.getElementById(info_id);
			var info_msg = msg;

			info_stage.innerHTML = "";
			if(msg == "clear"){
				return;
			}
			var arc_info = document.createElement('p');
			arc_info.id = "arc_info";
			arc_info.className = "arc_info";
			arc_info.innerHTML = info_msg;

			info_stage.appendChild(arc_info);
		}

		var validityCheck = function(objAry)
		{
			/********  sample use *********

			var event_id_array = uNote.get_event_ids();
			var targetElement = document.getElementById(event_id_array[0]);
			targetElement.onclick = function(){

			targetElement.onclick = function(){

				var form_id_Ary = [];
					//alert("id additions work")
					//check group for validity
					form_id_Ary.push(dataInp.get_event_ids().join());
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

		var createCancelBtn = function()
		{

				var goPar = document.getElementById("arc_go_cont");

				var canEl = document.createElement('a');
				canEl.id = "arc_can_btn";
				canEl.className = "arc_can_btn ui-btn";
				canEl.href = "";//helps the page not jump when the element isn't centered
				canEl.onclick = function(){
					$("#arc_panel").panel('close');
				};//end onclick

				canEl.innerHTML = "<h4>Cancel</h4>";
				canEl.title = "cancel";

				goPar.appendChild(canEl);



		}//createCancelBtn


		var testNote = function (sObj)
		{
			//get token from default's pseudo-Constant (php)
			var form_token = FORM_TOKEN;


			//compile all notification data into an object
			var noteString = {};

			noteString.endpoint = (sObj != undefined && sObj != "") ? sObj : sessionStorage.token_endpoint;
			noteString.tag = "Test_note";
			noteString.title = "Test Note title";
			noteString.body = "this is only a test.";

			noteString.icon = ARC_IMG_URL + "flame.png";


			console.log("noteString = " + noteString);
			console.log(noteString);
			/********************************************************
			$msg = array();
				if(isset($oData->message)){$msg['message'] = $oData->message;}
				if(isset($oData->title)){$msg['title'] = $oData->title;}
				if(isset($oData->subtitle)){$msg['subtitle'] = $oData->subtitle;}
				if(isset($oData->tickerText)){$msg['tickerText'] = $oData->tickerText;}
				if(isset($oData->vibrate)){$msg['vibrate'] = $oData->vibrate;}
				if(isset($oData->sound)){$msg['sound'] = $oData->sound;}
				if(isset($oData->largeIcon)){$msg['largeIcon'] = $oData->largeIcon;}
				if(isset($oData->smallIcon)){$msg['smallIcon'] = $oData->smallIcon;}
				if(isset($oData->icon)){$msg['icon'] = $oData->icon;}
				if(isset($oData->tag)){$msg['tag'] = $oData->tag;}
				if(isset($oData->body)){$msg['body'] = $oData->body;}
			********************************************************/




			//convert the noteString object's data into a string
			var noteData = {};
			noteData.note_str = JSON.stringify(noteString);// noteString
			console.log("noteData = " + noteData);
			console.log(noteData);

			//~ dependency alert ~ requires aliintro component to function
			var ctrl_Url = "index.php?option=com_aliintro&task=sendNote&format=raw&" + form_token + "=1";
			var mStr = "any kind of thing."

			$(document).ready(function()
			{
			   //alert("getMenuData running!");
			   $.ajax(
			   {

				url:ctrl_Url,
				data:noteData,
				type:'POST',
				   success:function(result)
				   {

						if(result != "Invalid Token" && result.indexOf("<!doctype html>") == -1)
						{
							alert(result);
							console.info("note result")
							console.log(result);
							var resultObj = {};

							//try{}
							//catch(e){}

							var resultObj =	JSON.parse(result);
							console.log("result obj success = " + resultObj.success);


							if(resultObj.success != undefined && resultObj.success == 1){
							alert("your message was successfully sent.");
							}//end if

						}else if(result.indexOf("<!doctype html>") != -1){
								//this comes up if the entire page's html comes back in the request
								alert("Give me moment...  Resubmit your entry by  \n pressing the go button again.");

						}else{
							console.log("trouble sending notification/message");

							alert("Its not you... its me. \n Your session timer has expired. \n Please reset the page and give \n \"us\" a little more time.")

							window.location.replace(SITEURL);


						}//end else

					}//end success

				})
			})//end ajax

		}//end testNote

		var extractData = function(dId,in_type)
		{
			var catgor_el = document.getElementById(dId);

			switch(in_type)
			{
				case "select":
					var catgor_ndx = catgor_el.selectedIndex;
					var catOpt = document.getElementsByClassName("catSel_SOption")[catty.selectedIndex];
					catVal = catOpt.value;

					return catVal;
				break;

				case "slider":
					var catgor_ndx = catgor_el.selectedIndex;
					var catOpt = document.getElementsByClassName("catSel_SOption")[catty.selectedIndex];
					catVal = catOpt.value;

					return catVal;
				break;
			}//end swith
		}//end extractData

		var makeContact = function(tObj)
		{
			//called from default in views > cnxs > tmpl > default
			//ajax calls getFakeData in cnx controller.php

			//alert("module id = " + mId);
			/*
			var catSel;//category selector
			var typeSel;//type selector
			var dataInp;//data entry point
			var tNoteBtn;//notification test btn - value for production not needed
			var accSlide;//access slider
			*/
			var uploadData = {};
			var arc_input = {};


			if(typeof(tObj) == "object"){
				var mod = tObj.mod || "make";
			}else{
				var mod = mod || "make";
			}

			arc_input.mod = mod;//extranous - its already set to go to the edit task below "editMyInfo"

			if(mod == "edit")
			{
				var obj_data = JSON.parse(tObj.data);
				arc_input.data_id = obj_data.id;
				arc_input.data_str = tObj.data;
			}

			var display_txt = (mod == "make") ? "uploading data..." : "updating data..."
			wait_a_minute("show",display_txt)


			if(mod != "delete"){

				var input_id = obj_elements.select_id;
				var input_el = document.getElementById(input_id);
				var in_value = input_el.value;


				var cat_id_array = catSel.get_event_ids();
				var catSel_idStr = cat_id_array[0];

				console.log("catSel_idStr",catSel_idStr);

				var arc_slide = accSlide.getCurrentValue2();

				arc_input.published = (arc_slide[0] == "allow") ? 1 : 0;
				console.log("arc_slide = ",arc_slide);

				var arc_category = catSel.getCurrentValue();
				arc_input.category = arc_category;
				console.log("arc_category = ",arc_category);


				//APP TYPE AND INPUT ARE SWITCHED SO I CAN GET THE ICON ON USER INPUT AND
				//DISPLAY THE INFO WHILE USING THE APP ICON INSTEAD OF THE TEXT IN THE MY INFO UI
				//maybe not
				var arc_type = typeSel.getCurrentValue();
				//var arc_type = (in_value != "favorite apps") ? typeSel.getCurrentValue() : dataInp.getCurrentValue();
				arc_input.desc_data = arc_type;
				console.log("arc_type = ",arc_type);

				var arc_data = dataInp.getCurrentValue();
				//var arc_data = (in_value != "favorite apps") ? dataInp.getCurrentValue() : typeSel.getCurrentValue();
				arc_input.core_data = arc_data;
				console.log("arc_data = ",arc_data);

				if(otherInp != undefined)
				{
					var arc_oData = otherInp.getCurrentValue();
					//var arc_data = (in_value != "favorite apps") ? dataInp.getCurrentValue() : typeSel.getCurrentValue();
					arc_input.other_data = arc_oData;
					console.log("arc_oData = ",arc_oData);
				}//end if

				if(arc_category == "notification"){
					var arc_note = sessionStorage.token_endpoint;
					arc_input.extra = arc_note;
					console.log("arc_data = ",arc_note);
				}//end if

				switch(arc_category)
				{
					case "name":
					case "notification":
					case "phone":
					case "profile image":
					break;

					default:
					//'article','blog','picture','music','social network','video','website'
					//get checked id & check element
					var sug_icon_chk_ary = obj_elements.sug_icon_chk.get_event_ids();
					var sug_icon_chk_id = sug_icon_chk_ary[0];

					var check_box_el = document.getElementById(sug_icon_chk_id);
					var is_checked = check_box_el.checked;

					if(is_checked == true)
					{
						//get the value of suggested icon
						var sug_icon_ary = obj_elements.sug_icon.get_event_ids();
						var sug_icon_id = sug_icon_ary[0];

						var icon_element = document.getElementById(sug_icon_id);
						var icon_value = icon_element.dataset.icon_value;
						arc_input.picture = icon_value;

					}//end if
					break;

				}//end switch


				if(display_data == "group")
				{
					arc_input.info_ids = obj_elements["data_store"];

				}//end if


				var dt = new Date();
				var arc_time = dt.getTime();
				arc_input.modified = arc_time;

			}else{
				var info_json_str = tObj.info_json;
				var info_json = JSON.parse(info_json_str);
				arc_input.id = info_json.id;

			}
			console.log("arc_input = ",arc_input);

			uploadData.arc_input = JSON.stringify(arc_input);
			uploadData.display_data = display_data;
			console.log("uploadData = ",uploadData);
			/*if(arc_category == "notification"){
				var arc_tNote = tNoteBtn.getCurrentValue();
				console.log("arc_tNote = ",arc_tNote);
			}//end if*/


				var form_token = FORM_TOKEN;


				var urlMod = (mod == "make") ? "addMyInfo" : (mod == "edit") ? "editMyInfo" : (mod == "delete") ? "deleteMyInfo" : "";//put controller.php method call here

				var ctrl_Url = "index.php?option=com_arc&task=" + urlMod + "&format=raw&" + form_token + "=1";//this works



				$(document).ready(function()
				{
				   //alert("getMenuData running!");
				   $.ajax(
				   {

					url:ctrl_Url,
					/*data:{'userData':userData},*/
					data:uploadData,
					//data:userData,
					type:'POST',
					   success:function(result,textStatus,xhr)
					   {
						   console.log("scan textStatus = " + textStatus);
						   console.log("scan xhr  = " + xhr);
						   console.info("scan xhr status = " + xhr.status);

						   //alert("Ajax test result data = " + result);//string
							console.log("Ajax test result data = " + result);//string
							//var makeMenu = new menuMaker(result);
							//makeMenu.display();

							//if upload is successful

							//change the upload icon to successful
							//if(result.indexOf("invalid token") == -1)
							if(result != "Invalid Token")
							{
								if(result.indexOf("<!doctype html>") == -1 && result.indexOf("upload failed") == -1)
								{
									if(result.indexOf("duplicate entry") != -1)
									{
										alert("a notification data record is already saved for this device.");
									}
									wait_a_minute("hide");
									//clear the data close the window
									//var input_cls_btn = document.getElementById("arc_panel_close");
									//input_cls_btn.click();
									if(mod != "delete"){
										$("#arc_panel").panel("close");
									}//end if
									//arc_panel_close.click();//does work -  don't know why
									getMyInfo();

								}
								else{
									//this comes up if the entire page's html comes back in the request
									alert("Give me moment...  Resubmit your entry by  \n pressing the go button again.");

									//$.mobile.loading("hide");
								}//end else
							}else
							{
									alert("Its not you... its me. \n Your session timer has expired. \n Please reset the page and give \n \"us\" a little more time.")

									window.location.replace(SITEURL);
							}

							//hide

						}

					})
				})//end ajax

		}//end makeContact

		var icon_finder = function(tStr,set)
		{
			var target_string = tStr.toLowerCase();

			var icon_set = set || "default";

			var jqm_icons =
			{
				"e-commerce":"shop",
				"email":"mail",
				"music":"audio",
				"name":"user",
				"notification":"notification",
				"phone":"phone",
				"picture":"camera",
				"profile image":"camera",
				"video":"video",
				"website":"wifi",
				"web address":"wifi"
			};

			var social_icons =
			{
				"chrome":"chrome",
				"drive":"drive",
				"facebook":"facebook",
				"github":"github",
				"google":"google",
				"google plus":"google_plus",
				"googleplus":"google_plus",
				"plus.google":"google_plus",
				"google+":"google_plus",
				"hangouts":"hangouts",
				"instagram":"instagram",
				"linkedin":"linkedin",
				"paypal":"paypal",
				"slack":"slack",
				"twitter":"twitter",
				"wordpress":"wordpress",
				"youtube":"youtube",
				"youtu.be":"youtube",
				"whatsapp":"whatsapp",
				//TODO:100 -w get codepen icon
				//TODO:110 -w get freecodecamp icon
			};//end social_icons

			var mail_icons =
			{
				"gmail":"gmail"
			};//end mail_icons

			switch(icon_set)
			{
				case "social":
					var iconObj = social_icons;
				break;

				case "mail":
					var iconObj = mail_icons;
				break;

				default:
					var iconObj = jqm_icons;
				break;
			}


			//create an array of title keys
			var icon_keys = Object.keys(iconObj);

			var return_value = valueChecker({"array":icon_keys,"string":target_string,"mod":"string","type":"ans"});

			var icon_values = [];
			if(return_value[0] != "none")
			{
				for(var u = 0; u < return_value.length; u++)
				{

					icon_values = icon_values.concat(iconObj[return_value[u]]);

				}//end for

			}else
			{
				icon_values = icon_values.concat("none");
			}//end else

		return icon_values;

		}//end iconFinder

		var valueChecker = function(sObj)
		{
			/*
			if found returns an array of string or index values

			example use:
			var isString =  valueChecker({"array":icon_keys,"string":target_string,"mod":"string","type":"ans"});
			if(isString[0] == -1)

			ans = array in string - (was checkStringForArray2) checkStringForArray2
			sna = string in array - (was check array for string)
			*/

			var testString = sObj.string;
			var testArray = sObj.array;
			var modifier = sObj.mod || "index";//other value is name
			var type = sObj.type || "ans";
			var strIndx = [];
			var action = (sObj.action != undefined && sObj.action == "match") ? "match" : "compare";


			strIndx[0] = (modifier == "index") ? -1 : "none";

			for(var i = 0; i < testArray.length; i++)
			{
				var targetString = (type == "ans") ? testString : testArray[i];//
				var testValue = (type == "ans") ? testArray[i] : testString;
				var is_present = "false";

				//does the string - (usually long) have any of the array values
				//"https://youtube.com/#*(&$)*&*(*)whatever".indexof("youtube")

				if(action == "compare")
				{
					if(targetString.indexOf(testValue) != -1)
					{
						var is_present = "true";
					}
				}else
				{
					if(targetString == testValue)
					{
						var is_present = "true";
					}
				}//end else

				if(is_present == "true")
				{
					if(modifier == "index")
					{
						if(strIndx[0] == -1)
						{

							strIndx = [];
							strIndx = strIndx.concat(i);

						}else
						{
							strIndx = strIndx.concat(i);
						}//end else


					}else{

						if(strIndx[0] == "none")
						{
							strIndx = [];
							strIndx = strIndx.concat(testArray[i]);

						}else
						{
							strIndx = strIndx.concat(testArray[i]);
						}//end else

					}//end else modifier

				}//end if targetString

			}//end for

			return strIndx;

		}//valueChecker

	}//end create_form


	function wait_a_minute(mod,txt)
	{
		//global scope function

		var modify = mod || "show";
		var display_txt = txt || "Uploading Data...";

		if(modify == "show"){
			$.mobile.loading("show",{theme:"a",textVisible:true,"text":"loading...",
			html:"<div class='L7loader'><img id='L7img' class='L7img' src='"
			+ COMP_IMG_URL + "cloud.gif' /><p id='loaderMsg'>" + display_txt + "</p></div>"});
			document.ondblclick = function(){$.mobile.loading("hide");}
		}else{

			$.mobile.loading("hide");
		}

	}//end wait_a_minute

	function get_ancestor(objStr,nbr)
	{
		//sample code:
		//var btn_ancestor = get_ancestor("arc_cnxs",3);
		//btn_ancestor.style.padding = "5px";

		var focus_element  = (typeof(objStr) == "object") ? objStr : (document.getElementById(objStr)) ? document.getElementById(objStr) : document.getElementsByClassName(objStr)[0];

		var newParent = focus_element;

		var target_ancestor = "";

		var generations = nbr;

		for(var i = 0; i < generations; i++)
		{
			target_ancestor = newParent.parentNode;
			newParent = target_ancestor;
		}//end for

		return target_ancestor;

	}//end get_ancestor

	function clearSelection() {
		//sample code for later
		//sites:
		//http://stackoverflow.com/questions/6562727/is-there-a-function-to-deselect-all-text-using-javascript
		//http://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse/40734974#40734974

	    if ( document.selection ) {
	        document.selection.empty();
	    } else if ( window.getSelection ) {
	        window.getSelection().removeAllRanges();
	    }
	}//end clear selection
