    //alert('masterImage running');

    //console.log("snakes running");
    /********************************************************************************************************

    //dependencies
    JQuery
    JQueryMobile




    *********************************************************************************************************/

    function masterImage(mstrObj){
      //Image Tool Kit
      //console.log("in the pit");
      //properties
      //required

      if(mstrObj == undefined){alert("canvas object parameter is not defined."); return;}
      if(mstrObj.home == undefined){alert("canvas object needs \"home:'container id string'\"."); return;}
      var home = mstrObj.home;

      var iUN = mstrObj.iUN || Math.round(Math.random() * 10000);//see iUN get and set
      var canvas_type = mstrObj.type || "thumbnail";//NOTE may not need #remove
      var canvas_mode = mstrObj.mode || "default";//NOTE may not need #remove


      //at 100 x100 or 50 x50 the image is adjusted perfectly
      //100 x 80 the image is stretched
      //NOTE image 4:3 aspect ratio multiply by 3/4ths or .75
      var type_str = (canvas_mode != "default") ? canvas_type + "_" + action : canvas_type;

      //used to set the various canvas default dimensions (if they arent manually entered)
      switch(type_str)
      {
        case "thumbnail":
          var default_width = 50;
          var default_height =  50;
        break;

        case "profile":
          var default_width = 100;
          var default_height = 100;
        break;

        case "profile_edit":
          var default_width = 300;
          var default_height = 300;
        break;

        case "image":
          var default_width = 100;
          var default_height = 75;
        break;
      }//end switch




      var canvas_width = mstrObj.width || default_width;
      var canvas_height = mstrObj.height || default_height;


      //HTML generated variable
      //window['CANVAS_IMG_URL'] = "<?php echo JUri::root(); ?>components/com_arc/xfiles/images/";
      var img_default = window['ARC_IMG_URL'] + "flame.png";

      //properties
      var canvas = "";
      var context_obj = "";
      var action = mstrObj.action || "";
      var prefix = mstrObj.varName || "masImg";//get set
      var fill_content = "";
      //console.log(display);
      var custom_class = [];
      var add_to_class = "false";
      var custom_id = "";
      var id_type = "default";
      var first_run = "true";

      var img_url = (mstrObj != undefined && mstrObj.url != undefined) ? mstrObj.url : img_default;

    	//obj_globals
    	var src_x = 0;
    	var src_y = 5;
    	var img_w = 500;
    	var img_h = 500;
    	var can_x = 0;
    	var can_y = 0;
    	var can_w = canvas_width;
    	var can_h = canvas_height;

      //NOTE I don't need this. won't be saving this to local storage #remove
    	/*try{
    	if(localStorage != undefined && localStorage.canvas_tutorial != undefined && localStorage.canvas_tutorial != "")
    	{
    		var local_str = localStorage.canvas_tutorial;
    		var local_ary = local_str.split(",");
    		img_url = local_ary[0];
    		src_x = local_ary[1];
    		src_y = local_ary[2];
    		img_w = local_ary[3];
    		img_h = local_ary[4];
    		can_x = local_ary[5];
    		can_y = local_ary[6];
    		can_w = local_ary[7];
    		can_h = local_ary[8];
    	}//end if
    	}catch(e){
    		console.log("nope. reload failed.")
    	}*/

      var obj_els = {};
      var event_ids = [];


      //methods
      this.setContent = function(sC){fill_content = sC;}//
      this.get_event_ids = function(){return event_ids;}
      this.setCustomClass = function(clsAry,addPar){custom_class = clsAry; add_to_class = addPar || true;/*addPar is nothing yet*/}
      this.setCustomId = function(cId){custom_id = cId; id_type = "custom";}

      var image_object=new Image();


       var create_canvas = function(c_cont){

         var bigDaddy = (document.getElementById(c_cont)) ? document.getElementById(c_cont) : document.getElementsByClassName(c_cont)[0];
          //clears container
        //if(clearHome == "true"){}
          bigDaddy.innerHTML = "";

          /********************************  Sample Code  *****************************************

    			***************************************************************************************/

                //alert("data object is " + dataObject);
                //gets container


    				var add_custom_class = (custom_class.length == 1) ? " " + custom_class[0] + " " : "";

    				canvas = document.createElement("canvas");
    				canvas.id = prefix + "_ImgCanvas" + "_" + i;

    				event_ids.push(canvas.id);

    				canvas.className = prefix + "__ImgCanvas" + iUN + "_" + i + " " + prefix + "__ImgCanvas "  + prefix + "__ImgCanvas" + i + " _ImgCanvas " + add_custom_class;

    				if(fill_content != ""){canvas.innerHTML = fill_content;}

    				bigDaddy.appendChild(canvas);

            context_obj = canvas.getContext('2d');
            canvas.width = canvas_width;
            canvas.height = canvas_height;

       }//end create_preview

      var draw_me = function() {

          //console.log("draw running");

              if (canvas.getContext) {

                image_object.onload=function(){

                context_obj.drawImage(image_object, src_x, src_y, img_w, img_h, can_x, can_y, can_w, can_h);
                console.log("image_object",image_object);//try here

                }//end onload//


                image_object.src=img_url;
                console.log("image_object",image_object);//nothing to run yet here so its ""
                var dataURL = canvas.toDataURL("image/png");
                console.log("image_object height = ",image_object.height);
              }//end if


          }//end draw

          var canvas_editor = function()
          {



          }//end canvas_editor


          this.display = function(){
            switch(canvas_mode)
            {
              case "edit":
                //prep edit elements that add canvas
                canvas_editor();
                //draw it
                draw_me();
              break;

              default:
                create_canvas(home);
                draw_me();
              break;

            }//end switch
          }//end display


          /********************************   SCRAP SECTION BELOW   ****************************************/

          //NOTE i don't need this panel array - i will need a btn array in its place.
          var ctrl_ary = [
          {
          "label":"POSIION",
          "contents":"IP",
          "title":"Image Position",
          },
          {
          "label":"SCALE",
          "contents":"IS",
          "title":"Image Scale",
          },
          {
          "label":"BORDERS",
          "contents":"CB",
          "title":"Canvas Borders",
          },
          {
          "label":"BORDER SCALE",
          "contents":"CB",
          "title":"Canvas Border scale",
          },
          {
          "label":"BACKGROUND COLOR",
          "contents":"BC",
          "title":"Background Color",
          },
          {
          "label":"RESET",
          "contents":"RE",
          "title":"Reset All",
          }

    			]

        var control_panel = function(){

          //object properties//


          //local variables

          //jqm collapsible
          var home = document.getElementById(home);

          var edit_box = document.createElement("div");
          edit_box.id = "edit_box" + iUN;
          edit_box.className = "edit_box" + iUN + " edit_box";
          //collapsible set

          var ctrl_box = document.createElement("div");
          ctrl_box.id = "ctrl_box" + iUN;
          ctrl_box.className = "ctrl_box" + iUN + " ctrl_box";

          var test_nbr = 3;

          for(var x = 0; x < ctrl_ary.length ; x++){

            var ec_Nm = "edit_ctrl_btn" + x;
            var edit_ctrl_btn = document.createElement("div");
            edit_ctrl_btn.id = "edit_ctrl_btn" + iUN + "_" + x;
            edit_ctrl_btn.className = "edit_ctrl_btn" + iUN + "_"  + x + " edit_ctrl_btn" + x + " edit_ctrl_btn ";
            edit_ctrl_btn.dataset.nbr = x;
            edit_ctrl_btn.title = ctrl_ary[x].title;
            //edit_ctrl_btn.innerHTML = "<h5>" + ctrl_ary[x].label + "</h5>";
            obj_els[ec_Nm] = edit_ctrl_btn;

            //helps set up the correct call inside the event listener
            obj_els["contents" + x] = ctrl_ary[x].contents;


            obj_els[ec_Nm].addEventListener("click",function(){
              //i used this.dataset so it doesn't pass the updated x of the for loop
              //and everything ending up being on click of the last index nbr passed
              var sNbr = this.dataset.nbr;
              run_contents(obj_els["contents"+ sNbr]);
            })//end c_Nm

           ctrl_box.appendChild(edit_ctrl_btn);

          }//end for
          //$(".ctrl_cont").addClass("hibernate");
          //$(".col_label").removeClass("hide");
          edit_box.appendChild(ctrl_box);
          home.appendChild(edit_box);

        }//end control_panel



        var run_contents = function(str)
        {
          switch(str)
          {
            case "IS":
              display_sect(0);
    					add_image_input()
            break;

            case "POO":
              display_sect(1);
    					add_slider_input(1);
            break;

            case "DP":
              display_sect(2);
    					add_slider_input(2);
            break;

            case "CO":
              display_sect(3);
    					add_slider_input(3);
            break;

            case "TD":
              display_sect(4);
    					add_slider_input(4);
            break;

    				case "TS":
              display_sect(5);
    					add_save_btn(5);
            break;

    				case "RR":
              display_sect(6);
            break;

          }//end switch

        }//end run_contents

        var display_sect = function(nbr){

    			var add_class = (nbr != 0 && nbr != 5) ? " slider " : "";
            console.log("image section running");
            var home = document.getElementById("ctrl_cont" + nbr);//
          	home.innerHTML = "";//
           //title

    				var img_ctrl_text_cont = document.createElement("div");
            img_ctrl_text_cont.id = "img_ctrl_text_cont" + nbr;
            img_ctrl_text_cont.className = "img_ctrl_text_cont" + add_class + " img_ctrl_text_cont" + nbr;

    						var img_ctrl_title = document.createElement("div");
    						img_ctrl_title.id = "img_ctrl_title" + nbr;
    						img_ctrl_title.className = "img_ctrl_title img_ctrl_title" + nbr;//
    						img_ctrl_title.innerHTML = "<h6>" + ctrl_ary[nbr].title + "</h6>";

    					//text
    						var img_ctrl_text = document.createElement("div");
    						img_ctrl_text.id = "img_ctrl_text" + nbr;
    						img_ctrl_text.className = "img_ctrl_text img_ctrl_text" + nbr;//
    						img_ctrl_text.innerHTML = "<p>" + ctrl_ary[nbr].text + "</p>";


    				img_ctrl_text_cont.appendChild(img_ctrl_title);
    				img_ctrl_text_cont.appendChild(img_ctrl_text);


          //container
            var img_ctrl_cont = document.createElement("div");
            img_ctrl_cont.id = "img_ctrl_cont" + nbr;
            img_ctrl_cont.className = "img_ctrl_cont img_ctrl_cont" + nbr;//


    			home.appendChild(img_ctrl_text_cont);
          home.appendChild(img_ctrl_cont);

        }//end display_sect

    		var add_image_input = function()
    		{
    			var home = document.getElementById("img_ctrl_cont0");

    			//input
            var img_ctrl_input = document.createElement("input");
            img_ctrl_input.id = "img_ctrl_input";
            img_ctrl_input.className = "form-control img_ctrl_input";//
    				img_ctrl_input.setAttribute("placeholder","enter an image url...");
    				img_ctrl_input.type = "url";
    				img_ctrl_input.onfocus = function(){this.select();}
    				img_ctrl_input.onblur = function(){
    				img_url = (img_ctrl_input.value != undefined && img_ctrl_input.value != "") ? img_ctrl_input.value : img_default;
    					draw_me();
    				}//end on blur

    				var img_ctrl_reset = document.createElement("button");
            img_ctrl_reset.id = "img_ctrl_reset";
            img_ctrl_reset.className = " img_ctrl_reset pointer ready";//
    				img_ctrl_reset.innerText = "reset";
    			img_ctrl_reset.onclick = function(){
    				img_url = img_default;
    				src_x = 0;
    				src_y = 0;
    				img_w = 500;
    				img_h = 500;
    				can_x = 0;
    				can_y = 0;
    				can_w = 500;
    				can_h = 500;
    				draw_me(); }

    			var img_ctrl_example = document.createElement("button");
    img_ctrl_example.id = "img_ctrl_example";
    img_ctrl_example.className = " img_ctrl_example img_ctrl_reset pointer ready";//
    img_ctrl_example.innerText = "see my example";
    img_ctrl_example.onclick = function()
    {
    		img_url = "https://static.stereogum.com/uploads/2013/08/lauryn-hill.jpg";
    		src_x = 65;
    		src_y = 80;
    		img_w = 300;
    		img_h = 300;
    		can_x = 25;
    		can_y = 25;
    		can_w = 450;
    		can_h = 450;

    		draw_me();
    }//end example onclick

    			home.appendChild(img_ctrl_input);
    			home.appendChild(img_ctrl_reset);
    			home.appendChild(img_ctrl_example);
    		}//end add_image_input

    		var add_save_btn = function()
    		{
          //NOTE i don't need this save btn - #remove

    			var home = document.getElementById("img_ctrl_cont5");

    			        //btn
            var save_ctrl_btn = document.createElement("button");
            save_ctrl_btn.id = "save_ctrl_btn";
            save_ctrl_btn.className = "save_ctrl_btn ready";//
    				save_ctrl_btn.innerText = "save my image setup (localStorage)";
    				save_ctrl_btn.onclick = function(){

    				//test for local storage
    				if(ls_test() === true){
    				// available
    				draw_string = [img_url,src_x, src_y, img_w, img_h, can_x, can_y, can_w, can_h].join();
    				localStorage.canvas_tutorial = draw_string;

    				console.info("localStorage.canvas_tutorial");
    				console.log(localStorage.canvas_tutorial);
    				}else{
    					// unavailable
    					$('#save_ctrl_btn').removeClass('ready');
    					$('#save_ctrl_btn').addClass('not_ready');
    					$('#save_ctrl_btn').html("localStorage is not available");
    					$('#save_ctrl_btn').disabled();


    				}//end else

    			}//end on click

    			home.appendChild(save_ctrl_btn);
    			try{
    				if(localStorage != undefined && localStorage.canvas_tutorial != undefined && localStorage.canvas_tutorial != "")
    				{
    						 var clear_ctrl_btn = document.createElement("button");
    						clear_ctrl_btn.id = "save_ctrl_btn";
    						clear_ctrl_btn.className = "clear_ctrl_btn save_ctrl_btn ready";//
    						clear_ctrl_btn.innerText = "clear localStorage";
    						clear_ctrl_btn.onclick = function()
    						{
    							delete localStorage.canvas_tutorial;
    							img_url = img_default;
    							src_x = 0;
    							src_y = 0;
    							img_w = 500;
    							img_h = 500;
    							can_x = 0;
    							can_y = 0;
    							can_w = 500;
    							can_h = 500;
    							draw_me();
    						}
    					home.appendChild(clear_ctrl_btn);
    				}//end if
    			}catch(e){
    				console.log("nope no clear btn.");
    			}//end catch

    		}//end add_save_btn

    		 var ls_test = function(){
    			var test = 'test';
    			try {
    					localStorage.setItem(test, test);
    					localStorage.removeItem(test);
    								console.log("localStorage works");
    					return true;

    			} catch(e) {
    					console.log("localStorage fails");
    					return false;
    			}//end catch
    		}//end ls_test


    		var add_slider_input = function(nbr)
    		{
    			var home = document.getElementById("img_ctrl_cont"+nbr);
    			home.innerHTML = "";
    			var style = (nbr == 1 || nbr == 2) ? "goofy" : "default";
    			//tear down the whole neighborhood
    			// @ slider issue
    			//sliders with the same id were existing in different dropdowns
    			var the_neighborhood = 	document.getElementsByClassName("img_ctrl_cont");
    			for(var n = 0; n < the_neighborhood.length; n++)
    				{
    					the_neighborhood[n].innerHTML = "";
    				}

    			//SLIDER A
    				var sli_ctrl_contA = document.createElement("div");
    				sli_ctrl_contA.id = "sli_ctrl_contA";
    				sli_ctrl_contA.className = "sli_ctrl_contA";//

    					//input
    						var sli_ctrl_inputA = document.createElement("input");
    						sli_ctrl_inputA.id = "sli_ctrl_inputA";
    						sli_ctrl_inputA.className = "sli_ctrl_inputA";//
    						sli_ctrl_inputA.setAttribute("data-slider-id","sli_ctrl_inputA");//
    						sli_ctrl_inputA.setAttribute("data-slider-min","-500");//
    						sli_ctrl_inputA.setAttribute("data-slider-max","500");//
    						sli_ctrl_inputA.setAttribute("data-slider-step","1");//
    						var set_valA = slide_data("A",nbr);
    						var goof_A = set_valA * -1;//natural opposite effect
    						var ctrl_valA = (style == "goofy") ? goof_A : set_valA;
    						sli_ctrl_inputA.setAttribute("data-slider-value", ctrl_valA);//
    						//sli_ctrl_inputA.setAttribute("data-slider-handle","custom");//ninja stars section
    						sli_ctrl_inputA.type = "text";
    						sli_ctrl_inputA.onfocus = function(){this.select();}

    						sli_ctrl_inputA.onchange = function(){

    							//make regular and goofy foot (opposite) values
    							var val_regular_input =   sli_ctrl_inputA.value;
    							var val_goof_input =  sli_ctrl_inputA.value * -1;
    							var input_val = (style == "goofy") ? val_goof_input : val_regular_input;

    						sli_ctrl_boxA.value = input_val;//
    							slide_data("A",nbr,{"value" :	input_val, "val_oper": "add"});
    							//sliderA.setValue();
    							//src_x = sli_ctrl_inputA.value;
    							draw_me();
    						}//end on blur

    						var sli_ctrl_boxA = document.createElement("input");
    						sli_ctrl_boxA.id = "sli_ctrl_boxA";
    						sli_ctrl_boxA.className = " sli_ctrl_boxA";//
    						sli_ctrl_boxA.value = set_valA;//src_x;
    						sli_ctrl_boxA.type = "number";
    						sli_ctrl_boxA.onfocus = function(){this.select(); }
    						sli_ctrl_boxA.oninput = function(){
    						sli_ctrl_inputA.value = sli_ctrl_boxA.value;
    							slide_data("A",nbr,{"value" :	sli_ctrl_boxA.value, "val_oper": "add"});
    							//src_x = sli_ctrl_inputA.value;
    							sliderA.setValue();
    							draw_me();
    						}//end on oninput


    					sli_ctrl_contA.appendChild(sli_ctrl_inputA);
    					sli_ctrl_contA.appendChild(sli_ctrl_boxA);

    			//END SLIDER A

    			//SLIDER B
    				var sli_ctrl_contB = document.createElement("div");
    				sli_ctrl_contB.id = "sli_ctrl_contB";
    				sli_ctrl_contB.className = "sli_ctrl_contB";

    					//input
    						var sli_ctrl_inputB = document.createElement("input");
    						sli_ctrl_inputB.id = "sli_ctrl_inputB";
    						sli_ctrl_inputB.className = "sli_ctrl_inputB";//
    						sli_ctrl_inputB.setAttribute("data-slider-id","sli_ctrl_inputB");//
    						sli_ctrl_inputB.setAttribute("data-slider-min","-500");
    						sli_ctrl_inputB.setAttribute("data-slider-max","500");//
    						sli_ctrl_inputB.setAttribute("data-slider-step","1");//
    						var set_valB = slide_data("B",nbr);
    						var goof_B = set_valB * -1;//natural opposite effect
    						var ctrl_valB = (style == "goofy") ? goof_B : set_valB;
    						sli_ctrl_inputB.setAttribute("data-slider-value",ctrl_valB);
    						sli_ctrl_inputB.setAttribute("data-slider-orientation","vertical");
    						//sli_ctrl_inputB.setAttribute("data-slider-handle","custom");//ninja stars section
    						sli_ctrl_inputB.type = "text";
    						sli_ctrl_inputB.onfocus = function(){this.select();}
    						sli_ctrl_inputB.onchange = function(){

    							//make regular and goofy foot (opposite) values
    							var val_regular_input =   sli_ctrl_inputB.value;
    							var val_goof_input =  sli_ctrl_inputB.value * -1;
    							var input_val = (style == "goofy") ? val_goof_input : val_regular_input;

    						sli_ctrl_boxB.value = input_val;//
    							slide_data("B",nbr,{"value" :	input_val, "val_oper": "add"});
    							//sliderB.setValue();
    							//src_y = sli_ctrl_inputB.value;
    							draw_me();
    						}//end on blur
    	console.info("sli_ctrl_inputB");//
    			console.dir(sli_ctrl_inputB);

    						var sli_ctrl_boxB = document.createElement("input");
    						sli_ctrl_boxB.id = "sli_ctrl_boxB";
    						sli_ctrl_boxB.className = "sli_ctrl_boxB";//
    						sli_ctrl_boxB.value = set_valB;//src_y;
    						sli_ctrl_boxB.type = "number";
    						sli_ctrl_boxB.onfocus = function(){this.select(); }
    						sli_ctrl_boxB.oninput = function(){
    						sli_ctrl_inputB.value = sli_ctrl_boxB.value;
    						slide_data("B",nbr,{"value" : 	sli_ctrl_boxB.value, "val_oper": "add"});
    							//src_y = sli_ctrl_inputB.value;
    							sliderB.setValue();
    							draw_me();
    						}//end on oninput


    					sli_ctrl_contB.appendChild(sli_ctrl_inputB);
    					sli_ctrl_contB.appendChild(sli_ctrl_boxB);

    			home.appendChild(sli_ctrl_contA);
    			home.appendChild(sli_ctrl_contB);

    			var sliderA = new Slider('#sli_ctrl_inputA', {
    				formatter: function(value) {
    					return 'Current value: ' + value;
    				}
    			});//end new slider script
    			console.info("sliderA");
    			console.dir(sliderA);
    			//http://seiyria.com/bootstrap-slider/

    			var sliderB = new Slider('#sli_ctrl_inputB', {
    				formatter: function(value) {
    					return 'Current value: ' + value;
    				}
    			});//end new slider script
    			//http://seiyria.com/bootstrap-slider/

    			//END SLIDER B

    		}//end add_slider_input

    		var slide_data = function(ltr,nbr,obj)
    		{
    			//span_set2 view_span span3 view_span3
    			var slide_ltr = ltr;
    			var nbr = nbr;
    			var val = (obj != undefined && obj.value != undefined) ? obj.value : "";
    			var val_oper = (obj != undefined && obj.val_oper != undefined) ? obj.val_oper : "get_value";

    			var slide_id = ltr+nbr;
    			var span_id_str = "span" + slide_id;
    			var targetSpan = document.getElementById(span_id_str);

    			if(val != "" && val_oper == "add" || val_oper == "both"){
    				//A covers x and width
    				//B covers y and height
    				switch(slide_id)
    				{
    						case "A1":
    								src_x = val;
    								targetSpan.innerText = val;
    						break;
    						case "B1":
    								src_y = val;
    								targetSpan.innerText = val;
    						break;

    						case "A2":
    								img_w = val;
    								targetSpan.innerText = val;
    						break;
    						case "B2":
    								img_h = val;
    								targetSpan.innerText = val;
    						break;

    						case "A3":
    								can_x = val;
    								targetSpan.innerText = val;
    						break;
    						case "B3":
    								can_y = val;
    								targetSpan.innerText = val;
    						break;

    						case "A4":
    								can_w = val;
    								targetSpan.innerText = val;
    						break;
    						case "B4":
    								can_h = val;
    								targetSpan.innerText = val;
    						break;
    				}//end switch
    			}//end if

    			if(val_oper == "get_value" || val_oper == "both"){
    				switch(slide_id)
    				{
    						case "A1":
    							return src_x;
    						break;
    						case "B1":
    							return src_y;
    						break;
    						case "A2":
    								return img_w;
    						break;
    						case "B2":
    								return img_h;
    						break;
    						case "A3":
    							return can_x;
    						break;
    						case "B3":
    							return can_y;
    						break;

    						case "A4":
    							return can_w;
    						break;
    						case "B4":
    							return can_h;
    						break;
    				}//end switch
    			}//end if

    		}//end slide_dataA




      //this.draw_me = function(){ draw_me();  };



    }//end masterImage

    //use this area to run scripts
    window.onload = function(){
      //var canvas_exp = new masterImage();
      //canvas_exp.draw_me();
    }//end onload

    //NOTE i may not need this. #remove?
    function set_dimensions()
    {
      //console.log(document.body.clientHeight);
      var c_width = document.body.clientWidth;
      console.log(document.body.clientWidth);

      var canvas_el = document.getElementById("tutorial");
      var ctrl_el = document.getElementById("info_cont");
      //
    	var dyn_var = (document.body.clientWidth > 499) ? 2.7 : 1.2;
      var w_calc = parseInt(c_width) / dyn_var;
      //console.log(w_calc/10);//
      canvas_el.style.height = w_calc + "px";

      //ctrl_el.style.height = w_calc + "px";
    }//end set_dimensions

    //set_dimensions();
