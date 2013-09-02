function getRealTags(tags) {       //获得一个符合规范的标签数组,传入参数数组不能为['']或['\n\t\s']
	var i = 0;
	while (tags[i]) {  //去空
		if (tags[i] == 0 && !(/0/i).test(tags[i]))
			tags.splice(i, 1);
		else 
			i++;
	}
	tags = tags.join(",");
	tags = tags.match(/([^,]+)(?!.*,\1(,|$))/ig) || [''];   //去除重复标签
	return tags;
}

module.exports = getRealTags;