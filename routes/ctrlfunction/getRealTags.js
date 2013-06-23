function getRealTags(tags) {       //获得一个符合规范的标签数组
	for (var i = 0; i < tags.length; i++) {      //去除零宽字符
		if (!tags[i] && !tags[i].length) {
			tags.splice(i, 1);
			tags.length--;
			i--;
		}
	}
	tags = tags.join(",");
	tags = tags.match(/([^,]+)(?!.*,\1(,|$))/ig);   //去除重复标签
	return tags;
}

module.exports = getRealTags;
