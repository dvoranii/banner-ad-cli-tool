export const boilerplateHTML =
  () => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
   <meta charset="UTF-8">
   <meta name="ad.size" content="width=300,height=600">
   <meta name="viewport" content="width=device-width, initial-scale=1">

   <script type="text/javascript">var clickTag = "";</script>

   <style type="text/css">
       *, *::before, *::after {--bg: transparent; --t: 1s; --delay: 0s; --ease: ease;  --x: auto; --y: auto; --z: auto; --top: var(--y); --left: var(--x); --bottom: auto; --right: auto; --w: auto; --h: auto;}
       html, body, .frame {padding: 0; margin: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; top: 0; left: 0;}
       body {background: #222;}
       body::before, body::after {display: block; content: ""; flex: 2;}
       body::after {flex: 3;}
       img, div, span, svg {border: none; position: absolute; display: block; width: var(--w); height: var(--h); top: var(--top); left: var(--left); bottom: var(--bottom); right: var(--right); z-index: var(--z);}
       div, span {background: var(--bg)}
       .frame, .fade {transition: opacity var(--t) var(--delay) var(--ease)}
       [class^='scene'], [class*=' scene'], .fade {opacity: 0;}
       [data-scene="0"] .scene0, [data-scene="1"] .scene1, [data-scene="2"] .scene2, [data-scene="3"] .scene3, [data-scene="4"] .scene4, [data-scene="5"] .scene5, [data-scene="6"] .scene6, [data-scene="7"] .scene7, [data-scene="8"] .scene8, [data-scene="9"] .scene9,
       :is([data-scene="0"] .scene0, [data-scene="1"] .scene1, [data-scene="2"] .scene2, [data-scene="3"] .scene3, [data-scene="4"] .scene4, [data-scene="5"] .scene5, [data-scene="6"] .scene6, [data-scene="7"] .scene7, [data-scene="8"] .scene8, [data-scene="9"] .scene9) .fade:not([class^='scene'], [class*=' scene']) {opacity: 1}

       #canvas {display: block; margin: 0 auto; overflow: hidden; position:relative; flex: none; width: 100%; height: 100%; box-shadow: 0 0 160px rgba(0,0,0,0.3), 0 10px 30px rgba(0,0,0,0.3); background: var(--bg)}
       #canvas::after {content: ""; display: block; position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999999; transform: translateZ(1px); pointer-events: none; box-shadow: 0 0 0 1px var(--border, #000) inset;}

       /* --- Custom ad specific styles go here --- */

       #canvas {
           --bg: #000;
           --border: #000;
       }

   </style>

</head>
<body>
   <a id="canvas" href="javascript:window.open(window.clickTag)"
       data-frames="[0.001,1,1,0.1]"
       data-duration="15000"
       data-iterations="1"
       style="
           --bg: #000;
           --border: #000;
       "
   >
       <div class="frame scene1" style="--bg: red;">
           <!-- <img src="./assets/" alt=""> -->
       </div>
      
       <div class="frame scene2" style="--bg: blue;">
           <!-- <img src="./assets/" alt=""> -->
       </div>

       <div class="frame scene3" style="--bg: green;">
           <!-- <img src="./assets/" alt=""> -->
       </div>
   </a>

   <script>!function(){var s,y,m,b,o,l,i,c;function u(e){if(s=document.getElementById(e),window.top===window){var t=document.head.querySelector('meta[name="ad.size"]').content.split(",");s.style.width=parseInt(t[0].split("=")[1],10)+"px",s.style.height=parseInt(t[1].split("=")[1],10)+"px"}b=o=parseInt(s.getAttribute("data-iterations")),this.reScale(JSON.parse(s.getAttribute("data-frames")),parseInt(s.getAttribute("data-duration"))),i=m.length-1,this.animate()}u.prototype.reScale=function(t,e){l=o>0?e/o:e;var a=t.reduce(function(t,e){return t+e},0);m=t.map(function(t){return t/a*l})},u.prototype.goToFrame=function(e){this.pause(),b=0,i=e,s.setAttribute("data-scene",e)},u.prototype.next=function(){return++i!==m.length||(i=0,b--)?(s.setAttribute("data-scene",i),i):(b=o-1,i=-1)},u.prototype.animate=function(){-1!==this.next()&&(y=window.setTimeout(this.animate.bind(this),m[i]))},u.prototype.pause=function(){y&&clearTimeout(y)},c=function(){window.banner=new u("canvas"),document.body.setAttribute("class","loaded")},"loading"!==document.readyState?c():document.addEventListener("DOMContentLoaded",c)}();</script>
</body>
</html>`;
