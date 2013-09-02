function getRealTags(tags) {       //获得一个符合规范的标签数组,传入参数数组不能为['']或['\n\t\s']
	tags = tags.join(",");
	tags = tags.match(/([^,]+)(?!.*,\1(,|$))/ig);   //去除重复标签
	console.log(tags);
	var i = 0;
	while (tags[i]) {
		if (tags[i] == 0 && !(/0/i).test(tags[i]))
			tags.splice(i, 1);
		else 
			i++;
	}
	console.log(tags);
	return tags;
}

module.exports = getRealTags;