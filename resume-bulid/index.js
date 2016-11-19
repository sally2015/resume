var fs = require('fs');
var path = require('path');

var tree = {
	"server": {
		"sub": {
			"bin":{
				"sub": {},
				"type": "folder"
			},
			"logs":{
				"sub": {},
				"type": "folder"
			},
			"public":{
				"sub": {},
				"type": "folder"
			},
			"routes":{
				"sub": {},
				"type": "folder"
			},
			"views":{
				"sub": {},
				"type": "folder"
			},
			"app.js":{
				"type": "file"
			}
		},
		"type":"folder"
	},
	"static": {
		"sub": {
			"config":{
				"sub": {},
				"type": "folder"
			},
			"js":{
				"sub": {},
				"type": "folder"
			},
			"modjs":{
				"sub": {
					"app":{
						"sub":{
							"common":{
								"sub": {},
								"type": "folder"
							},
							"page":{
								"sub": {},
								"type": "folder"
							}
						},
						"type":"folder"
					},
					"lib":{
						"sub":{},
						"type":"folder"
					}
				},
				"type": "folder"
			},
			"special":{
				"sub": {},
				"type": "folder"
			},
			"style":{
				"sub": {},
				"type": "folder"
			}
		},
		"type":"folder"
	},
	".gitignore":{
		"type":"file",
		"content":"node_modules"
	}
}
var filename = "resume-code";

var root = path.join(__dirname,'../',filename);

var lastRoot ;
var deepRoot;
fs.mkdirSync(root);
for( var attr in tree ){
	lastRoot = root;
	interval(attr,tree[attr],true)

}

function interval(attr, obj,button) {
	lastRoot = path.join(lastRoot, attr);
	
	if ( obj.sub && !isEmptyObject(obj.sub) ) {
		fs.mkdirSync(lastRoot);
		for( var name in obj.sub ){
			interval(name,obj.sub[name])

		}
		lastRoot = path.resolve(lastRoot + './../' )

	}else if ( obj.sub && isEmptyObject(obj.sub) && obj.type === 'folder' ) {
		fs.mkdirSync( lastRoot);
		lastRoot = path.resolve(lastRoot + './../' )

	}else if(!obj.sub && obj.type === 'file' ){
		var content = obj.content ? obj.content : "";
		console.log(content)
		fs.writeFileSync(lastRoot, content);
	}

}

function isEmptyObject ( obj ) {
    for ( var name in obj ) {
        return false;
    }
        return true;
   }