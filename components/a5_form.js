function a5_form(id)
{
	this.id=id;
	this.viewName=null; // will be set by the parser.
	this.name='a5_form';
	this.childType='unordered';
	this.childsAllowed=['a5_input','a5_textarea'];
	this.keys={};
	this.keyPath=[];
	this.children=[];
	this.attributeDefinitions=[];
	this.attributes={}; 
    this.model=null;
}

a5_form.prototype=new App5Component();

/*** mix-in for data binding */

a5_form.prototype.setModel=function(model) {
	if (this.model !=null) this.model.removeListener(this);
	this.model=model;
	this.model.addListener(this);
	for (var i=0;i<this.children.length;i++) {
		this.children[i].update();
	}

}

a5_form.prototype.getKeys=function () {
	if (this.subid !=null) {
		return this.getParentObject().getKeys();
	}
	else return this.keys;
}


a5_form.prototype.setKeys=function(keys) {
	this.keys=keys;
	for (var i=0;i<this.children.length;i++) {
		this.children[i].update();
	}
}

a5_form.prototype.getModelValueFor=function (shortId) {
	var keys=this.getKeys();
	if (keys==null) return null;
	var key=keys[shortId];
	console.log(" key ="+key)
	if (key!=null && this.model != null) {
		return App5.wrapModel(this.model).getValueForPath(this.getKeyPath(key));
	}
	return null;
}

a5_form.prototype.setModelValueFor=function (shortId,value) {
	var keys=this.getKeys();
	var key=keys[shortId];
	if (key!=null && this.model != null) {
		App5.wrapModel(this.model).setValueForPath(this.getKeyPath(key),value);
	}
}



a5_form.prototype.render=function(arr) {
	arr.push('<div style="padding-top:10px;padding-bottom:10px">')
	var width=this.getAreaObject().getInnerWidth()-40;
	arr.push('<fieldset '+App5.writeId(this)+' style="width:'+width+'px">');
	this.renderContents(arr);
	arr.push('</fieldset></div>');
}

a5_form.prototype.renderContents=function(arr) {
	for (var i=0;i<this.children.length;i++) {
		this.children[i].render(arr);
	}
}

a5_form.prototype.update=function () {
	if (App5.$(this).get(0)) {
		var el=App5.$(this);
		var arr=[];
		this.renderContents(arr);
		el.html(arr.join(''));
	}
}
