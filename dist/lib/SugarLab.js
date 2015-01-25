/*! ggj-puppies 24-01-2015 */
!function(a){a.TO_RADIANS=.0174532925,a.Game=function(b){var c=this,d=function(a){for(var b=a.keyCode,d=!1,e=0;e<c.keysDown.length;e++)c.keysDown[e]===b&&(d=!0);d||(c.keysDownLength.push(0),c.keysDown.push(b))},e=function(a){var b=a.keyCode;c.keysUpThisFrame.push(b);for(var d=0;d<c.keysDown.length;d++)c.keysDown[d]===b&&(c.keysDownLength.splice(d,1),c.keysDown.splice(d,1))},f=function(b){c.mouseLocation=new a.Vec2(b.clientX-c.canvas.offsetLeft,b.clientY-c.canvas.offsetTop)},g=function(a){c.mouseDownThisFrame+=2,c.mouseButton=a.button},h=function(){c.mouseUpThisFrame+=2,c.mouseButton=3};c.type="game",c.canvas=b.canvas,c.renderer=PIXI.autoDetectRenderer(c.canvas.width,c.canvas.height,{view:c.canvas,antialias:!1}),c.screenSize=new a.Vec2(c.canvas.width,c.canvas.height),c.screenLocation=new a.Vec2(c.canvas.offsetLeft,c.canvas.offsetTop),c.startTime=(new Date).getTime(),c.lastFrameTime=new Date,c.deltaTime=0,c.framesThisSecond=0,c.lastFrameAggregation=new Date,c.deltaBuffer=[1,1,1,1,1,1,1,1,1,1],c.keysDown=[],c.keysUpThisFrame=[],c.keysDownLength=[],c.mouseLocation=new a.Vec2(0,0),c.mouseButton=3,c.mouseDownThisFrame=0,c.mouseUpThisFrame=0,c.browserData=null,c.imageSrc=[],c.images=[],c.imagesLoaded=0,c.scenes={},c.currentScene={update:function(){},unload:function(){},draw:function(){}},c.queuedScene=null,c.queuedEntities=[],window.addEventListener("keydown",d.bind(c),!1),window.addEventListener("keyup",e.bind(c),!1),c.canvas.addEventListener("mousemove",f.bind(c),!1),c.canvas.addEventListener("mousedown",g.bind(c),!1),c.canvas.addEventListener("mouseup",h.bind(c),!1),c.browserData=window.mozRequestAnimationFrame?{name:"mozilla"}:window.webkitRequestAnimationFrame?{name:"webkit"}:{name:"ie"};var i=new Audio;c.browserData.oggSupport=i.canPlayType('audio/ogg; codecs="vorbis"'),c.browserData.mp3Support=i.canPlayType('audio/mpeg; codecs="mp3"'),c.browserData.wavSupport=i.canPlayType('audio/wav; codecs="wav"'),c.preferredSoundType="","probably"===c.browserData.oggSupport&&(c.preferredSoundType=".ogg"),"probably"===c.browserData.mp3Support&&(c.preferredSoundType=".mp3"),"probably"===c.browserData.wavSupport&&(c.preferredSoundType=".wav"),c.browserData.webAudioAPISupport=!1,void 0!==window.webkitAudioContext&&(c.browserData.webAudioAPISupport=!0,c.audioContext=new webkitAudioContext),c.addScene=function(a){return c.scenes[a.name]=a,a},c.getScene=function(a){return c.scenes[a]},c.transitionScene=function(a,b){c.queuedScene=c.getScene(a),b?c.queuedEntities=b:null,c.currentScene&&c.currentScene.unload()},c.isKeyDown=function(a){for(var b=0;b<c.keysDown.length;b++)if(c.keysDown[b]===a)return!0;return!1},c.onKeyDown=function(a){for(var b=0;b<c.keysDown.length;b++)if(c.keysDown[b]===a&&1===c.keysDownLength[b])return!0;return!1},c.onKeyUp=function(a){for(var b=0;b<c.keysUpThisFrame.length;b++)if(c.keysUpThisFrame[b]===a)return!0;return!1},c.isMouseDown=function(a){return 0===c.mouseButton&&"left"===a?!0:1===c.mouseButton&&"middle"===a?!0:2===c.mouseButton&&"right"===a},c.onMouseDown=function(a){return c.mouseDownThisFrame>0?0===c.mouseButton&&"left"===a?!0:1===c.mouseButton&&"middle"===a?!0:2===c.mouseButton&&"right"===a:!1},c.onMouseUp=function(){return c.mouseUpThisFrame>0},c.start=function(){c.loop(),"ie"===c.browserData.name&&window.setInterval(c.update,1e3/60)},c.fullscreen=function(){c.canvas.width=document.width,c.canvas.height=document.height,c.screenSize=new a.Vec2(c.canvas.width,c.canvas.height),c.screenLocation=new a.Vec2(0,0)},c.loop=function(){"mozilla"===c.browserData.name&&window.mozRequestAnimationFrame(c.update),"webkit"===c.browserData.name&&window.webkitRequestAnimationFrame(c.update)},c.update=function(){var a=new Date;c.deltaTime=(a-c.lastFrameTime)/1e3,c.lastFrameTime=a,c.deltaBuffer.shift(),c.deltaBuffer.push(c.deltaTime);for(var b=0,d=c.deltaBuffer.length,e=0;d>e;e+=1)b+=c.deltaBuffer[e];for(b/=d,c.framesThisSecond++,a-c.lastFrameAggregation>=1e3&&(c.fps=c.framesThisSecond,c.framesThisSecond=0,c.lastFrameAggregation=a),c.mouseDownThisFrame-=1,c.mouseUpThisFrame-=1,c.mouseDownThisFrame<0&&(c.mouseDownThisFrame=0),c.mouseUpThisFrame<0&&(c.mouseUpThisFrame=0),e=0;e<c.keysDownLength.length;e++)c.keysDownLength[e]++;c.ConnectionHandler.parseMessages(),c.currentScene.update(),c.currentScene.draw(c.sctx),c.queuedScene&&(c.currentScene=c.queuedScene,c.queuedScene=null,c.currentScene.ready(c.queuedEntities)),c.keysUpThisFrame=[],c.loop()},c.DTOHandler=function(){var b={},c={};return b.registerDTOType=function(a,b){c[a]={type:a,callback:b}},b.createDTO=function(b){return new a.DTO(b)},b.parseDTO=function(a){var b=JSON.parse(a);c[b.type].callback(b)},b}(),c.ConnectionHandler=function(){var a={},b=[],d=[];return a.createConnection=function(b){return d.push(io.connect(b)),d[d.length-1].on("data",a.receiveMessage),d[d.length-1]},a.receiveMessage=function(a){b.push(a)},a.parseMessages=function(){for(var a=0;a<b.length;a++)c.DTOHandler.parseDTO(b[a]);b=[]},a.sendMessage=function(a,b){d[a].emit("data",JSON.stringify(b))},a}()},a.DTO=function(a){return a.type=a.type||"",a.timestamp=new Date,a.origin=a.origin||"",a.handlerCallback=a.callback||function(){},a},a.AssetCollection=function(a,b,c){var d=this;this.path=a,this.assets={},this.assetLoadedCount=0,this.assetCount=0,this.images=[],this.sounds=[];var e=function(){d.assetLoadedCount++},f=function(){d.assetLoadedCount++},g=function(){d.assetCount+=d.assets.images.length,d.assetCount+=d.assets.sounds.length;for(var a=0;a<d.assets.images.length;a++)d.images.push(new Image),d.images[d.images.length-1].onload=e,d.images[d.images.length-1].src="res/"+d.assets.images[a],d.images[d.images.length-1].texture=PIXI.Texture.fromImage(d.images[d.images.length-1].src);for(a=0;a<d.assets.sounds.length;a++)d.sounds.push(new Audio),d.sounds[d.sounds.length-1].addEventListener("loadeddata",f),d.sounds[d.sounds.length-1].src="res/"+d.assets.sounds[a]+b.preferredSoundType};return this.load=function(){var a=this,b=new XMLHttpRequest;return a.images=[],b.onload=function(){a.assets=JSON.parse(this.responseText),g(),c()},b.open("get",a.path,!0),b.send(),a},this.getLoadedPercentage=function(){return 0!==d.assetCount?d.assetLoadedCount/d.assetCount*100:100},this.getImage=function(a){for(var b=0;b<d.images.length;b++)if(-1!==d.images[b].src.indexOf(a))return d.images[b];return null},this.getTexture=function(a){for(var b=0;b<d.images.length;b++)if(-1!==d.images[b].src.indexOf(a))return d.images[b].texture;return null},this.getSound=function(a){for(var b=0;b<d.sounds.length;b++)if(-1!==d.sounds[b].src.indexOf(a))return d.sounds[b];return null},this.load()},a.Vec2=function(b,c){var d=this;d.x=b,d.y=c,d.type="vec2",d.randomize=function(){return d.x=Math.floor(Math.random()*d.x),d.y=Math.floor(Math.random()*d.y),d},d.randomizeX=function(){return d.x=Math.floor(Math.random()*d.x+Math.random()*d.x),d},d.randomizeY=function(){return d.y=Math.floor(Math.random()*d.y+Math.random()*d.y),d},d.translate=function(a){return d.x+=a.x,d.y+=a.y,d},d.subtract=function(a){return d.x-=a.x,d.y-=a.y,d},d.getSubtracted=function(b){var c=d.x-b.x,e=d.y-b.y;return new a.Vec2(c,e)},d.normalize=function(){var a=d.magnitude();return d.x/=a,d.y/=a,d},d.getNormal=function(){var b=d.magnitude();return 0!==b?new a.Vec2(d.x/b,d.y/b):new a.Vec2(0,0)},d.scale=function(a){return d.x*=a,d.y*=a,d},d.getScaled=function(b){return new a.Vec2(d.x*b,d.y*b)},d.translateAlongRotation=function(a,b){var c=a*Math.cos(b*Math.PI/180),e=a*Math.sin(b*Math.PI/180);return d.x+=c,d.y+=e,d},d.rotate=function(a,b){var c=Math.cos(.0174532925*b),e=Math.sin(.0174532925*b),f=d.x-a.x,g=d.y-a.y,h=f*c-g*e,i=f*e+g*c,j=h+a.x,k=i+a.y;return d.x=j,d.y=k,d},d.getRotated=function(b,c){var e=Math.cos(.0174532925*c),f=Math.sin(.0174532925*c),g=d.x-b.x,h=d.y-b.y,i=g*e-h*f,j=g*f+h*e,k=i+b.x,l=j+b.y;return new a.Vec2(k,l)},d.getTranslated=function(b){var c=b.x+d.x,e=b.y+d.y;return new a.Vec2(c,e)},d.getTranslatedAlongRotation=function(b,c){var e=b*Math.cos(c*Math.PI/180),f=b*Math.sin(c*Math.PI/180),g=e+d.x,h=f+d.y;return new a.Vec2(g,h)},d.getDirectionVector=function(b){return new a.Vec2(b.x-d.x,b.y-d.y).normalize()},d.distance=function(a){return Math.sqrt((a.x-d.x)*(a.x-d.x)+(a.y-d.y)*(a.y-d.y))},d.equals=function(a){return d.x===a.x&&d.y===a.y},d.magnitude=function(){return Math.sqrt(d.x*d.x+d.y*d.y)},d.clone=function(){return new a.Vec2(d.x,d.y)},d.angleBetween=function(b){var c=180*Math.atan2(d.y-b.y,d.x-b.x)/Math.PI;return a.wrapAngle(c)}},a.Vec2.fromPolar=function(b,c){return new a.Vec2(b*Math.cos(c*a.TO_RADIANS),b*Math.sin(c*a.TO_RADIANS))},a.Line=function(b,c){var d=this;d.type="line",d.p1=b,d.p2=c,d.intersects=function(b){var c=(b.p2.y-b.p1.y)*(d.p2.x-d.p1.x)-(b.p2.x-b.p1.x)*(d.p2.y-d.p1.y);if(0===c)return!1;var e=(b.p2.x-b.p1.x)*(d.p1.y-b.p1.y)-(b.p2.y-b.p1.y)*(d.p1.x-b.p1.x),f=(d.p2.x-this.p1.x)*(d.p1.y-b.p1.y)-(d.p2.y-d.p1.y)*(d.p1.x-b.p1.x),g=e/c,h=f/c;if(g>=0&&1>=g&&h>=0&&1>=h){var i=d.p1.x+g*(d.p2.x-d.p1.x),j=d.p1.y+g*(d.p2.y-d.p1.y);return new a.Vec2(i,j)}return!1},d.translate=function(a){d.p1.translate(a),d.p2.translate(a)},d.getTranslated=function(b){return new a.Line(d.p1.getTranslated(b),d.p2.getTranslated(b))},d.clone=function(){return new a.Line(d.p1.clone(),d.p2.clone())},d.draw=function(a,b,c){c.save(),c.lineWidth=b,c.strokeStyle=a,c.moveTo(d.p1.x+.5,d.p1.y+.5),c.lineTo(d.p2.x+.5,d.p2.y+.5),c.stroke(),c.restore()}},a.Rect=function(b,c){var d=this;d.type="rect",d.location=b.clone(),d.size=c.clone(),d.color="black",d.vec2s=[new a.Vec2(b.x,b.y),new a.Vec2(b.x+c.x,b.y),new a.Vec2(b.x+c.x,b.y+c.y),new a.Vec2(b.x,b.y+c.y)],d.lines=[new a.Line(d.vec2s[0],d.vec2s[1]),new a.Line(d.vec2s[1],d.vec2s[2]),new a.Line(d.vec2s[2],d.vec2s[3]),new a.Line(d.vec2s[3],d.vec2s[0])],d.origin=new a.Vec2(d.location.x+d.size.x/2,d.location.y+d.size.y/2),d.localOrigin=d.size.getScaled(.5),d.draw=function(a){var b=a.sctx,c=a.fillColor||"Black",e=a.lineColor||"Black",f=a.lineWidth||1;b.save(),b.beginPath(),b.strokeStyle=e,b.lineWidth=f,b.fillStyle=c,b.fillRect(d.location.x,d.location.y,d.size.x,d.size.y),b.strokeRect(d.location.x,d.location.y,d.size.x,d.size.y),b.restore()},d.intersects=function(a){return!(d.location.x>a.location.x+a.size.x||d.location.x+d.size.x<a.location.x||d.location.y>a.location.y+a.size.y||d.location.y+d.size.y<a.location.y)},d.translate=function(b){d.location.translate(b),d.origin.translate(b),d.vec2s=[new a.Vec2(d.location.x,d.location.y),new a.Vec2(d.location.x+d.size.x,d.location.y),new a.Vec2(d.location.x+d.size.x,d.location.y+d.size.y),new a.Vec2(d.location.x,d.location.y+d.size.y)],d.lines=[new a.Line(d.vec2s[0],d.vec2s[1]),new a.Line(d.vec2s[1],d.vec2s[2]),new a.Line(d.vec2s[2],d.vec2s[3]),new a.Line(d.vec2s[3],d.vec2s[0])]},d.setLocation=function(b){d.location=b.clone(),d.origin=new a.Vec2(d.location.x+d.size.x/2,d.location.y+d.size.y/2),d.vec2s=[new a.Vec2(d.location.x,d.location.y),new a.Vec2(d.location.x+d.size.x,d.location.y),new a.Vec2(d.location.x+d.size.x,d.location.y+d.size.y),new a.Vec2(d.location.x,d.location.y+d.size.y)],d.lines=[new a.Line(d.vec2s[0],d.vec2s[1]),new a.Line(d.vec2s[1],d.vec2s[2]),new a.Line(d.vec2s[2],d.vec2s[3]),new a.Line(d.vec2s[3],d.vec2s[0])]},d.setOrigin=function(a){var b=a.getTranslated(d.origin);d.translate(b.scale(-1))},d.equals=function(a){for(var b=0;b<d.vec2s.length;b++)if(!d.vec2s[b].equals(a.vec2s[b]))return!1;return!0},d.clone=function(){return new a.Rect(d.location.clone(),d.size.clone())}},a.Polygon=function(b,c,d){var e=this;e.type="polygon",e.location=b.clone(),e.rotation=0,e.origin=c.clone(),e.structureOrigin=c.clone(),e.color="black",e.width=2,e.structureVec2s=d.slice(),e.vec2s=e.structureVec2s.slice(),e.update(),e.update=function(){for(var b=0;b<e.vec2s.length;b++){var c=e.structureVec2s[b].getRotated(e.structureOrigin,e.rotation);c.translate(e.location),e.vec2s[b]=c.clone()}for(e.origin=e.structureOrigin.getTranslated(e.location),e.lines=[],b=0;b<e.vec2s.length;b++)b!=e.vec2s.length-1?e.lines.push(new a.Line(e.vec2s[b],e.vec2s[b+1])):e.lines.push(new a.Line(e.vec2s[b],e.vec2s[0]))},e.draw=function(a){a.save(),a.strokeStyle=e.color,a.lineWidth=e.width,a.beginPath(),a.moveTo(e.vec2s[0].x,e.vec2s[0].y);for(var b=1;b<e.vec2s.length;b++)a.lineTo(e.vec2s[b].x,e.vec2s[b].y);a.closePath(),a.stroke(),a.restore()},e.translate=function(a){e.location.x+=a.x,e.location.y+=a.y,e.update()},e.translateTo=function(a){e.location=a.clone(),e.update()},e.rotate=function(a){for(e.rotation+=a;e.rotation>360||e.rotation<0;)e.rotation>360&&(e.rotation-=360),e.rotation<0&&(e.rotation+=360);e.update()},e.rotateTo=function(a){for(e.rotation=a;e.rotation>360||e.rotation<0;)e.rotation>360&&(e.rotation-=360),e.rotation<0&&(e.rotation+=360);e.update()},e.intersects=function(a){for(var b=0;b<e.lines.length;b++)for(i2=0;i2<a.lines.length;i2++){var c=e.lines[b].intersects(a.lines[i2]);if(0!=c)return c}return!1}},a.Circle=function(b,c){var d=this;d.type="circle",d.origin=b.clone(),d.radius=c,d.diameter=2*d.radius,d.area=Math.PI*d.radius*d.radius,d.translate=function(a){d.origin.translate(a)},d.translateAlongRotation=function(a){d.origin.translateAlongRotation(a)},d.translateTo=function(a){d.origin.translateTo(a)},d.intersects=function(a){var b=d.origin.distance(a.origin),c=d.radius+a.radius;return c>=b},d.intersectsRectangle=function(b){var c=new a.Vec2(Math.abs(d.origin.x-b.origin.x),Math.abs(d.origin.y-b.origin.y)),e=Math.pow(c.x-b.size.x/2,2)+Math.pow(c.y-b.size.y/2,2);return c.x>b.size.x/2+d.radius?!1:c.y>b.size.y/2+d.radius?!1:c.x<=b.size.x/2?!0:c.y<=b.size.y/2?!0:e<=Math.pow(d.radius,2)},d.draw=function(a){var b=a.sctx,c=a.lineWidth||1,e=a.fillColor||"Black",f=a.lineColor||"Black";b.save(),b.beginPath(),b.arc(d.origin.x,d.origin.y,d.radius,0,2*Math.PI,!1),b.strokeStyle=f,b.lineWidth=c,b.fillStyle=e,b.stroke(),b.restore()}},a.Node=function(b,c){var d=this;d.type="node",d.neighbors=[],d.rect=new a.Rect(b,new a.Vec2(c,c)),d.pathable=!0,d.heuristic=function(a){return d.rect.origin.distance(a.rect.origin)}},a.NodeMap=function(b,c,d){var e=this;e.nodes=[],e.tag="nodemap",e.type="nodemap";for(var f=0;c>f;f++)for(var g=0;b>g;g++)e.nodes.push(new a.Node(new a.Vec2(g*d,f*d),d));for(var h=this.nodes,i=0;i<h.length;i++){var j=h[i];this.getNode(j.rect.origin.getTranslated(new a.Vec2(0,d)))&&j.neighbors.push(this.getNode(j.rect.origin.getTranslated(new a.Vec2(0,d)))),this.getNode(j.rect.origin.getTranslated(new a.Vec2(0,-d)))&&j.neighbors.push(this.getNode(j.rect.origin.getTranslated(new a.Vec2(0,-d)))),this.getNode(j.rect.origin.getTranslated(new a.Vec2(d,0)))&&j.neighbors.push(this.getNode(j.rect.origin.getTranslated(new a.Vec2(d,0)))),this.getNode(j.rect.origin.getTranslated(new a.Vec2(-d,0)))&&j.neighbors.push(this.getNode(j.rect.origin.getTranslated(new a.Vec2(-d,0))))}e.translate=function(a){for(var b=e.nodes,c=0;c<b.length;c++)e.nodes[c].rect.origin.translate(a)},e.getNode=function(b){for(var c=new a.Rect(b.clone(),new a.Vec2(1,1)),d=e.nodes,f=0;f<d.length;f++)if(d[f].rect.intersects(c))return d[f];return!1},e.findPath=function(a,b){var c=e.getNode(a);c.parent_index=-1;for(var d=e.getNode(b),f=[],g=[],h=0;h<e.nodes.length;h++)e.nodes[h].pathable===!1&&g.push(e.nodes[h]);c.rect.origin.distance(d.rect.origin);for(f.push(c);f.length>0;){var i=f[0].f,j=0;for(h=1;h<f.length;h++)f[h].f<i&&(i=f[h].f,j=h);var k=f[j];if(k===d){for(var l=[d];-1!==k.parent_index;)k=g[k.parent_index],l.unshift(k);return l}for(f.splice(j,1),g.push(k),h=0;h<k.neighbors.length;h++)-1===g.indexOf(k.neighbors[h])&&-1===f.indexOf(k.neighbors[h])&&(k.neighbors[h].g=k.g+Math.floor(Math.sqrt(Math.pow(k.neighbors[h].rect.origin.x-k.rect.origin.x,2)+Math.pow(k.neighbors[h].rect.origin.y-k.rect.origin.y,2))),k.neighbors[h].h=k.neighbors[h].rect.origin.distance(d.rect.origin),k.neighbors[h].f=k.neighbors[h].g+k.neighbors[h].h,k.neighbors[h].parent_index=g.length-1,f.push(k.neighbors[h]))}return!1}},a.Scene=function(a,b,c,d){var e=this,f=function(){e.entities=[],e.tags={},e.isBeingDestroyed=!1,e.entityCount=0};e.type="scene",e.name=a,e.game=d,e.stage=new PIXI.Stage(16777215),e.entities=[],e.ready=c,e.tags={},e.isBeingDestroyed=!1,e.entityCount=0,e.startTime=new Date,e.time=0;for(var g=0;g<b.length;g++)e.addEntity(b[g]);return e.draw=function(){e.entities;e.game.renderer.render(e.stage)},e.update=function(){var a=e.entities;e.time=new Date-e.startTime;for(var b=0;b<a.length;b++){if(e.isBeingDestroyed){f();break}a[b].update()}e.isBeingDestroyed&&f()},e.addEntity=function(a){var b=e.entities;b.push(a),a.sprite?e.stage.addChild(a.sprite):null,a.entityID=a.entityID?a.entityID:e.entityCount,e.entityCount++;var c=a.tag;if(void 0!==c&&null!==c){var d=e.tags[c];(null===d||void 0===d)&&(e.tags[c]=[],d=e.tags[c]),d.push(a)}return a.zIndex||0===a.zIndex?null:a.zIndex=0,e.entities.sort(function(a,b){return a.zIndex===b.zIndex?0:a.zIndex>b.zIndex?1:-1}),a},e.getEntitiesByTag=function(a){var b=e.tags[a];return void 0!==b&&null!==b?b:[]},e.getEntityByID=function(a){for(var b=e.entities,c={},d=0;d<b.length;d++)if(c=b[d],c.entityID===a)return c;return!1},e.removeEntity=function(a){var b=e.entities;a.sprite?e.stage.removeChild(a.sprite):null;for(var c=0;c<b.length;c++)b[c].entityID===a.entityID&&b.splice(c,1);if(a.tag){var d=e.tags[a.tag].indexOf(a);e.tags[a.tag].splice(d,1)}for(var f in a)a[f]=null},e.unload=function(){e.isBeingDestroyed=!0},e},a.Animation=function(b){var c=this;c.type="animation",c.name=b.name,c.playTime=b.playTime,c.sourceImage=b.sourceImage,c.frameSize=b.frameSize.clone(),c.sourceRect=b.sourceRect.clone(),c.frameCount=b.frameCount,c.frames=[],c.frameStartTimes=[],c.curFrame={},c.isPlaying=!1,c.timePerFrame=0,c.totalTimeRunning=0;for(var d=c.sourceRect.size.x/c.frameSize.x,e=c.sourceRect.size.y/c.frameSize.y,f=0;d>f;f++)for(var g=0;e>g;g++)c.frames.length<c.frameCount&&c.frames.push(new a.Rect(new a.Vec2(f*c.frameSize.x,g*c.frameSize.y),c.frameSize));c.curFrame=c.frames[0],c.timePerFrame=c.playTime/c.frameCount;for(var h=0;h<c.frameCount;h++)c.frameStartTimes.push(h*c.timePerFrame);c.play=function(a){c.isPlaying?void 0!==a&&a&&(c.curFrame=c.frames[0],c.totalTimeRunning=0):(c.curFrame=c.frames[0],c.totalTimeRunning=0,c.isPlaying=!0)},c.update=function(a){if(c.isPlaying){c.totalTimeRunning+=a;for(var b=0;b<c.frameStartTimes.length;b++)c.totalTimeRunning>=c.frameStartTimes[b]&&(c.curFrame=c.frames[b]);c.totalTimeRunning>=c.playTime&&(c.isPlaying=!1)}}},a.Animator=function(a,b){var c=this;c.type="animator",c.animations=b,c.game=a,c.currentAnimation=null,c.addAnimation=function(a){c.animations[a.name]=a},c.playAnimation=function(a){var b=c.animations[a];c.currentAnimation?a!==c.currentAnimation.name?(b.play(!0),c.currentAnimation=b):a!==c.currentAnimation.name||b.isPlaying||(b.play(!0),c.currentAnimation=b):(b.play(!0),c.currentAnimation=b)},c.getCurrentFrame=function(){return void 0!==c.currentAnimation&&null!==c.currentAnimation?c.currentAnimation.curFrame:null},c.draw=function(a,b){var d=c.currentAnimation;return void 0!==d&&null!==d?(c.game.sctx.save(),c.game.sctx.translate(a.x,a.y),c.game.sctx.rotate(b*TO_RADIANS),c.game.sctx.drawImage(d.sourceImage,d.curFrame.location.x,d.curFrame.location.y,d.frameSize,d.frameSize,-d.frameSize/2,-d.frameSize/2,d.frameSize,d.frameSize),c.game.sctx.restore(),!0):!1},c.update=function(){c.currentAnimation.update(a.deltaTime)}},a.Particle=function(a,b,c,d,e){var f=this;f.type="particle",f.location=a.clone(),f.velocity=b.clone(),f.ttl=c,f.initialTTL=c,f.rotation=d,f.rotationVelocity=e,f.alpha=1,f.update=function(a){f.location.translate(f.velocity.getScaled(a)),f.rotation+=f.rotationVelocity*a,f.ttl-=a,f.alpha=f.ttl/f.initialTTL}},a.ParticleGen=function(b,c,d,e,f,g,h,i,j,k,l,m){var n=this;n.type="particlegen",n.location=b.clone(),n.genInterval=d,n.image=c,n.baseVelocity=e.clone(),n.baseTTL=g,n.baseRotation=i,n.baseRotationVelocity=k,n.velocityVariance=f.clone(),n.ttlVariance=h,n.rotationVariance=j,n.rotationVelocityVariance=l,n.drag=m,n.particles=[],n.isGenerating=!1,n.timeToParticle=0,n.start=function(){n.isGenerating=!0},n.stop=function(){n.isGenerating=!1},n.update=function(b){if(n.timeToParticle-=b,n.timeToParticle<=0){var c=this.baseVelocity.getTranslated(new a.Vec2(Math.random()*n.velocityVariance.x,Math.random()*n.velocityVariance.x)),d=n.baseTTL+Math.random()*n.ttlVariance,e=n.baseRotation+Math.random()*n.rotationVariance,f=n.baseRotationVelocity+Math.random()*n.rotationVelocityVariance;n.particles.push(new a.Particle(n.location,c,d,e,f)),n.timeToParticle=n.genInterval}for(var g=null,h=0;h<n.particles.length;h++)g=n.particles[h],g.update(b),g.ttl<=0&&n.particles.splice(n.particles.indexOf(g),1)},n.draw=function(b){for(var c=null,d=0;d<n.particles.length;d++)c=n.particles[d],a.drawRotatedImage(n.image,c.location,c.rotation,c.alpha,b)}},a.Label=function(b,c,d,e){var f=this;f.type="label",f.text=b,f.location=c.clone(),f.color=d,f.font=e,f.update=function(){},f.draw=function(b){a.drawText(f.text,f.location,f.color,f.font,b)}},a.AlertMessage=function(b,c,d,e,f){var g=this;g.type="alertmessage",g.message=b,g.location=c.clone(),g.ttl=d,g.initialTtl=d,g.moves=e,g.update=function(){g.ttl-=f.deltaTime,g.ttl<=0&&f.currentScene.removeEntity(g),g.moves&&g.location.translate(new a.Vec2(0,-100*f.deltaTime))},g.draw=function(b){b.save(),b.globalAlpha=g.ttl/(g.initialTtl-(g.initialTtl-.5)),a.drawText(g.message,g.location,"red","30px arial",b),b.restore()}},a.DOMModal=function(a,b,c,d,e){var f=this,g=c.x+e.screenLocation.x,h=c.y+e.screenLocation.y,i=d.x,j=d.y;f.type="dommodal",f.id="gameModal",f.modal=document.createElement("div"),f.modal.setAttribute("style","position: absolute; left: "+g+"px; top: "+h+"px; z-index: 1; width: "+i+"px; height: "+j+"px;"),f.modal.setAttribute("id",f.id),f.modal.setAttribute("class",b),f.modal.innerHTML=a,document.body.appendChild(f.modal),f.destroy=function(){document.body.removeChild(f.modal)}},a.Camera=function(b,c){var d=this;d.sctx=b,d.offset=c.clone(),d.drawImage=function(b){var c=d.sctx,e=d.offset,f=b.image,g=b.location,h=b.alpha||1,i=b.angle||0,j=b.drawOrigin?b.drawOrigin.clone():new a.Vec2(-f.width/2,-f.height/2),k=b.drawSource?b.drawSource.clone():new a.Rect(new a.Vec2(0,0),new a.Vec2(f.width,f.height)),l=g.getTranslated(e);c.save(),c.globalAlpha=h,c.translate(l.x,l.y),c.rotate(i*a.TO_RADIANS),c.drawImage(f,k.location.x,k.location.y,k.size.x,k.size.y,j.x,j.y,k.size.x,k.size.y),c.restore()},d.drawText=function(a){var b=d.sctx,c=d.offset,e=a.location,f=e.getTranslated(c),g=a.align||"left",h=a.font||"12px Arial",i=a.color||"red",j=a.text;b.save(),b.textAlign=g,b.font=h,b.fillStyle=i,b.fillText(j,f.x,f.y),b.restore()},d.drawCircle=function(a){var b=d.sctx,c=d.offset,e=a.lineWidth||1,f=a.fillColor||"Black",g=a.lineColor||"Black";b.save(),b.beginPath(),b.arc(a.origin.x+c.x,a.origin.y+c.y,a.radius,0,2*Math.PI,!1),b.strokeStyle=g,b.lineWidth=e,b.fillStyle=f,b.stroke(),b.restore()}},a.Loader=function(b){var c=this;c.assetCollection=b.assetCollection,c.loadCallback=b.loadCallback,c.screenSize=b.screenSize.clone(),c.textColor=b.textColor||"red",c.font=b.font||"12px Arial",c.barColor=b.barColor||"red",c.barHeight=b.barHeight||20,c.padding=b.padding||100,c.width=c.screenSize.x-2*c.padding,c.start=new a.Vec2(c.padding,c.screenSize.y/2),c.update=function(){100===c.assetCollection.getLoadedPercentage()&&c.loadCallback()},c.draw=function(){}},a.Tween=function(){},a.Tween.lerp=function(b,c,d){return d=a.clamp(d,0,1),b*(1-d)+c*d},a.Tween.quadIn=function(b,c){return c=a.clamp(c,0,1),b*c*c},a.Tween.quadInOut=function(b,c){return c=a.clamp(c,0,1),(c*=2)<1?.5*c*c*b:-.5*(--c*(c-2)-1)*b},a.Tween.quartOut=function(b,c){return c=a.clamp(c,0,1),(1- --c*c*c*c)*b},a.drawImage=function(a){var b=a.sctx,c=a.location,d=a.image;b.save(),b.translate(c.x,c.y),b.drawImage(d,-d.width/2,-d.height/2),b.restore()},a.drawRotatedImage=function(a,b,c,d,e){e.save(),e.globalAlpha=d,e.translate(b.x,b.y),e.rotate(c*TO_RADIANS),e.drawImage(a,-a.width/2,-a.height/2),e.restore()},a.randomVec2=function(a,b){return new Vec2(Math.floor(Math.random()*a),Math.floor(Math.random()*b))},a.drawText=function(a){var b=a.sctx,c=a.location,d=a.align||"left",e=a.font||"12px Arial",f=a.color||"red",g=a.text;b.save(),b.textAlign=d,b.font=e,b.fillStyle=f,b.fillText(g,c.x,c.y),b.restore()},a.drawTextCentered=function(a,b,c,d,e){e.save(),e.textAlign="center",e.font=d,e.fillStyle=c,e.fillText(a,b.x,b.y),e.restore()},a.drawLine=function(a){var b=a.sctx,c=a.start,d=a.end,e=a.lineWidth||2,f=a.color||"red";b.save(),b.strokeStyle=f,b.lineWidth=e,b.beginPath(),b.moveTo(c.x+.5,c.y+.5),b.lineTo(d.x+.5,d.y+.5),b.stroke(),b.restore()},a.getLines=function(a){for(var b=[],c=0;c<a.length;c++)c!=a.length-1?b.push(new Line(a[c],a[c+1])):b.push(new Line(a[c],a[0]));return b},a.getDirectionVector=function(a){return new Vec2(Math.cos(a*Math.PI/180),Math.sin(a*Math.PI/180))},a.clamp=function(a,b,c){return a=b>a?b:a,a=a>c?c:a},a.rotateLeftRight=function(a,b){return(a-b+360)%360>180?1:-1},a.rotationDistance=function(b,c){return Math.abs(a.wrapAngle(b)-a.wrapAngle(c))},a.wrapAngle=function(a){for(;0>a||a>360;)a>360?a-=360:0>a&&(a+=360);return a},a.sign=function(a){return"number"==typeof a?a?0>a?-1:1:a===a?0:0/0:0/0},a.decayToZero=function(a,b){return 0!==a&&(a=a>0?0>a-b?0:a-b:a+b>0?0:a+b),a}}(window.sugarLab=window.sugarLab||{});