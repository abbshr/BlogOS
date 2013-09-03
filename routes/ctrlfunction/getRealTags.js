function getRealTags(tags) {       //获得一个符合规范的标签数组,传入参数数组不能为['']或['\n\t\s']
	var i = 0,
	regexp = /,|，/;
	console.log(tags);
	while (tags[i]) {  //去空
		if (tags[i] == 0 && !(/0/i).test(tags[i]))
			tags.splice(i, 1);
		else 
			i++;
	}
	console.log(tags);
	tags = tags.join(",");
	tags = tags.match(/([^,]+)(?!.*,\1(,|$))/ig) || [''];   //去除重复标签
	console.log(tags);
	tags = String.prototype.split.call(tags, regexp, 5); //最多五个标签
	console.log(tags);
	return tags;
}

module.exports = getRealTags;