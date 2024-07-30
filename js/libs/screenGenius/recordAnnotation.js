class recordAnnotationSG{constructor(){this.ctxR="";this.lineLastPoint="";this.imageObjR="";this.annoType="";this.annoEvents=false;this.anno_selectedColor="#ff0000";this.dragRecord="";this.rectR={};this.delta;this.docHeight=0;this.scrollableElement;this.extPrefix="SG_"}annotationsEventListeners=()=>{jQuery("."+this.extPrefix+"arrow-effects ."+this.extPrefix+"effect-child-options span").unbind("click");jQuery("."+this.extPrefix+"arrow-effects ."+this.extPrefix+"effect-child-options span").on("click",elm=>{let elem="body";jQuery("#"+this.extPrefix+"draw-recording-anno").css({"pointer-events":"none"});this.mouseAnnoEvents();let shape="";jQuery(".shape-highlight-mouse").remove();jQuery(".shape-highlight-click").remove();jQuery(".arrow-spotlight-outer").remove();jQuery(elem).unbind("mousemove");jQuery(elem).unbind("mousedown");jQuery(elem).unbind("mouseup");if(jQuery(elm.currentTarget).hasClass(this.extPrefix+"arrow-highlight-mouse")){shape='<div class="shape-highlight-mouse"></div>';jQuery(elem).append(shape);jQuery(elem).unbind("mousemove");jQuery(elem).on("mousemove",e=>{const bodyElement=document.body.getBoundingClientRect();const bodyLeft=Math.abs(bodyElement.left);const bodytop=Math.abs(Math.abs(bodyElement.top)-window.scrollY);let top=e.pageY-bodytop-15;let left=e.pageX-bodyLeft-15;jQuery(".shape-highlight-mouse").css({top:top,left:left})})}else if(jQuery(elm.currentTarget).hasClass(this.extPrefix+"arrow-highlight-click")){shape='<div class="shape-highlight-click"></div>';jQuery(elem).append(shape);jQuery(elem).unbind("mousemove");jQuery(elem).on("mousemove",e=>{const bodyElement=document.body.getBoundingClientRect();const bodyLeft=Math.abs(bodyElement.left);const bodytop=Math.abs(Math.abs(bodyElement.top)-window.scrollY);let top=e.pageY-bodytop-15;let left=e.pageX-bodyLeft-15;jQuery(".shape-highlight-click").css({top:top,left:left})});jQuery(elem).unbind("mousedown");jQuery(elem).on("mousedown",e=>{jQuery(".shape-highlight-click").show()});jQuery(elem).unbind("mouseup");jQuery(elem).on("mouseup",e=>{jQuery(".shape-highlight-click").hide()})}else if(jQuery(elm.currentTarget).hasClass(this.extPrefix+"arrow-spotlight")){shape='<div class="arrow-spotlight-outer"><div class="arrow-spotlight-cursor"></div></div>';jQuery(elem).append(shape);jQuery(elem).on("mousemove",e=>{const bodyElement=document.body.getBoundingClientRect();const bodyLeft=Math.abs(bodyElement.left);const bodytop=Math.abs(Math.abs(bodyElement.top)-window.scrollY);let top=e.pageY-bodytop-50;let left=e.pageX-bodyLeft-50;jQuery(".arrow-spotlight-cursor").css({top:top,left:left})})}});jQuery("."+this.extPrefix+"anno-effects ."+this.extPrefix+"effect-child-options span").unbind("click");jQuery("."+this.extPrefix+"anno-effects ."+this.extPrefix+"effect-child-options span").on("click",elem=>{if(jQuery(elem.currentTarget).hasClass(this.extPrefix+"anno-free-line")){this.drawRecordingAnnotation("Line")}else if(jQuery(elem.currentTarget).hasClass(this.extPrefix+"anno-reactangle")){this.drawRecordingAnnotation("Reactangle")}else{this.drawRecordingAnnotation("Arrow")}})};removeAnnotations=()=>{let c=document.getElementById(this.extPrefix+"draw-recording-anno");this.ctxR=c.getContext("2d");this.ctxR.beginPath();this.ctxR.clearRect(0,0,c.width,c.height);this.ctxR.beginPath();this.imageObjR.src=c.toDataURL("image/png",1)};removeArrowEvents=()=>{if(jQuery(".shape-highlight-mouse")){jQuery(".shape-highlight-mouse").remove()}if(jQuery(".shape-highlight-click")){jQuery(".shape-highlight-click").remove()}if(jQuery(".arrow-spotlight-outer")){jQuery(".arrow-spotlight-outer").remove()}};mouseAnnoEvents=()=>{let elem="body";jQuery(elem).unbind("mousemove");jQuery(elem).unbind("mousedown");jQuery(elem).unbind("mouseup");if(document.getElementById(this.extPrefix+"draw-recording-anno")){document.getElementById(this.extPrefix+"draw-recording-anno").removeEventListener("mousedown",this.mouseDownLine);document.getElementById(this.extPrefix+"draw-recording-anno").removeEventListener("mouseup",this.mouseUpLine);document.getElementById(this.extPrefix+"draw-recording-anno").removeEventListener("mousemove",this.mouseMoveLine)}this.annoEvents=false};getDocumentHeightAndScrollableElement=async()=>{var body=document.body;var html=document.documentElement;var documentHeight=Math.max(body.scrollHeight,body.offsetHeight,html.clientHeight,html.scrollHeight,html.offsetHeight);var scrollableElement=null;var maxScrollableHeight=0;var allElements=document.querySelectorAll("*");allElements.forEach(function(element){if(element.scrollHeight>element.clientHeight){var scrollableHeight=element.scrollHeight;var offsetTop=element.offsetTop;if(scrollableHeight+offsetTop>documentHeight){documentHeight=scrollableHeight+offsetTop}if(scrollableHeight>maxScrollableHeight){maxScrollableHeight=scrollableHeight;scrollableElement=element}}});return{height:documentHeight,scrollableElement:scrollableElement}};drawRecordingAnnotation=async type=>{let elem="body";this.removeArrowEvents();this.VideoDuration=type;let getDocHeight=await this.getDocumentHeightAndScrollableElement();this.docHeight=getDocHeight.height;this.scrollableElement=getDocHeight.scrollableElement;let ww=window.innerWidth;let hh=jQuery(document).height();let canVA=null;if(!document.getElementById(this.extPrefix+"draw-recording-anno")){let canHtml='<canvas id="'+this.extPrefix+'draw-recording-anno" height="'+hh+'" width="'+(ww-10)+'"></canvas>';jQuery(elem).append(canHtml);canVA=document.getElementById(this.extPrefix+"draw-recording-anno")}else{canVA=document.getElementById(this.extPrefix+"draw-recording-anno")}jQuery("#"+this.extPrefix+"draw-recording-anno").css({"pointer-events":"all"});if(!this.annoEvents){this.mouseAnnoEvents();canVA=document.getElementById(this.extPrefix+"draw-recording-anno");canVA.addEventListener("mousedown",this.mouseDownLine,false);canVA.addEventListener("mouseup",this.mouseUpLine,false);canVA.addEventListener("mousemove",this.mouseMoveLine,false);this.annoEvents=true}this.ctxR=canVA.getContext("2d");this.annoType=type;if(type=="Line"){canVA.addEventListener("mousedown",this.mouseDownLine,false);canVA.addEventListener("mouseup",this.mouseUpLine,false)}else if(type=="Reactangle"||type=="Arrow"){this.imageObjR=new Image;this.imageObjR.onload=()=>{this.ctxR.drawImage(this.imageObjR,0,0)};this.imageObjR.src=canVA.toDataURL("image/png",1)}};mouseDownLine=e=>{const bodyElement=document.body.getBoundingClientRect();const bodyLeft=Math.abs(bodyElement.left);const bodytop=Math.abs(Math.abs(bodyElement.top)-window.scrollY);this.rectR.startX=e.pageX-bodyLeft;this.rectR.startY=e.pageY-bodytop;if(this.annoType=="Line"){let highlightColor=this.anno_selectedColor;let c=document.getElementById(this.extPrefix+"draw-recording-anno");this.ctxR=c.getContext("2d");this.ctxR.globalCompositeOperation="multiply";this.ctxR.fillStyle=highlightColor;this.ctxR.strokeStyle=highlightColor;this.ctxR.lineWidth=0;this.lineLastPoint={x:e.pageX-bodyLeft,y:e.pageY-bodytop};c.onmousemove=this.mouseMoveLine}this.dragRecord=true};mouseMoveLine=e=>{if(this.dragRecord){const bodyElement=document.body.getBoundingClientRect();const bodyLeft=Math.abs(bodyElement.left);const bodytop=Math.abs(Math.abs(bodyElement.top)-window.scrollY);if(this.annoType=="Arrow"){this.rectR.w=e.pageX-bodyLeft;this.rectR.h=e.pageY-bodytop}else{this.rectR.w=e.pageX-bodyLeft-this.rectR.startX;this.rectR.h=e.pageY-bodytop-this.rectR.startY}if(this.annoType=="Line"){let highlightH=5;let currentPoint={x:e.pageX-bodyLeft,y:e.pageY-bodytop};let dist=this.distanceBetween(this.lineLastPoint,currentPoint);let angle=this.angleBetween(this.lineLastPoint,currentPoint);for(let i=0;i<dist;i+=3){let x=this.lineLastPoint.x+Math.sin(angle)*i-highlightH+5;let y=this.lineLastPoint.y+Math.cos(angle)*i-highlightH+5;this.ctxR.beginPath();this.ctxR.arc(x+highlightH/2,y+highlightH/2,highlightH,false,Math.PI*2,false);this.ctxR.closePath();this.ctxR.fill();this.ctxR.stroke()}this.lineLastPoint=currentPoint;this.drawRecordingAnnotation("Line")}else{this.drawRecordShape(this.annoType)}}};mouseUpLine=()=>{this.drawRecordingAnnotation(this.VideoDuration);this.dragRecord=false};distanceBetween=(point1,point2)=>{return Math.sqrt(Math.pow(point2.x-point1.x,2)+Math.pow(point2.y-point1.y,2))};angleBetween=(point1,point2)=>{return Math.atan2(point2.x-point1.x,point2.y-point1.y)};drawRecordShape=type=>{let canvA=document.getElementById(this.extPrefix+"draw-recording-anno");let fontOutline=this.anno_selectedColor;let fontOulineSize=8;if(this.rectR.w>0&&this.rectR.h>0){switch(type){case"Reactangle":this.ctxR.beginPath();this.ctxR.fillStyle="transparent";this.ctxR.clearRect(0,0,canvA.width,canvA.height);this.ctxR.filter="none";this.ctxR.drawImage(this.imageObjR,0,0);this.ctxR.strokeStyle=fontOutline;this.ctxR.lineWidth=fontOulineSize;this.ctxR.strokeRect(this.rectR.startX,this.rectR.startY,this.rectR.w,this.rectR.h);this.ctxR.stroke();this.ctxR.beginPath();break;case"Arrow":let headlen=32;let dx=this.rectR.startX-this.rectR.w;let dy=this.rectR.startY-this.rectR.h;let angle=Math.atan2(dy,dx);this.ctxR.beginPath();this.ctxR.fillStyle="transparent";this.ctxR.clearRect(0,0,canvA.width,canvA.height);this.ctxR.filter="none";this.ctxR.lineCap="round";this.ctxR.drawImage(this.imageObjR,0,0);this.ctxR.strokeStyle=fontOutline;this.ctxR.lineWidth=fontOulineSize;this.ctxR.moveTo(this.rectR.startX,this.rectR.startY);this.ctxR.lineTo(this.rectR.w,this.rectR.h);this.delta=Math.PI/6;for(let i=0;i<2;i++){this.ctxR.moveTo(this.rectR.w,this.rectR.h);let x=this.rectR.w+headlen*Math.cos(angle+this.delta);let y=this.rectR.h+headlen*Math.sin(angle+this.delta);this.ctxR.lineTo(x,y);this.delta*=-1}this.ctxR.stroke();break}}}}