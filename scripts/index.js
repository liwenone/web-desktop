function $(id) {
	return document.getElementById(id);
}
function E(name) {
	return document.createElement(name);
}

var windows = [], all_data = [], games = [], aid_arr = [], index_count = 0;
var music_data = [], curr_music = {}, thread;

window.onload = function() {
	initAllData();
	initDesktop();
	initEvents();

	createWindow(all_data["tip"]);
	document.body.oncontextmenu = function(){return false;}
	document.body.ondragstart = function(){return false;}
	document.body.onselectstart = function() {return false;}
}

function initAllData() {
	all_data["tip"] = createData(400, 200, "tip", "提示", "tip", "tip");
	all_data["music"] = createData(300, 550, "music", "音乐", "music", "music");
	all_data["video"] = createData(500, 300, "video", "视频", "video", "video");
	all_data["document"] = createData(500, 300, "document", "文档", "document", "document");
	all_data["games"] = createData(743, 400, "game", "游戏实验室", "game", "game");
	all_data["20150803plane"] = createData(320, 568, "20150803plane", "飞机大战", "20150803plane", "20150803plane");
	all_data["20150805matching"] = createData(800, 500, "20150805matching", "找相同", "20150805matching", "20150805matching");
	all_data["20160121star"] = createData(480, 480, "20160121star", "简易消星星", "20160121star", "20160121star");
	all_data["20160126maplestory"] = createData(800, 600, "20160126maplestory", "冒险岛", "20160126maplestory", "20160126maplestory");


	games.push(createGameData("20150803plane", "飞机大战", "方向键控制，空格射击", "飞行射击"));
	games.push(createGameData("20150805matching", "找相同", "鼠标操作，点击翻转卡牌", "休闲娱乐"));
	games.push(createGameData("20160121star", "简易消星星", "鼠标操作", "休闲娱乐"));
	games.push(createGameData("20160126maplestory", "冒险岛", "仅支持webkit内核浏览器，键盘操作", "角色扮演"));

	music_data.push(createMusicData("Chenparty", "Chenparty", "Schnuffel", "02:44"));
	music_data.push(createMusicData("Pretty Boy","Pretty Boy", "M2M", "04:41"));
	music_data.push(createMusicData("The Day You Went Away","The Day You Went Away", "M2M", "03:42"));
	music_data.push(createMusicData("Apollo's Triumph","Apollo's Triumph", "Audiomachine", "02:37"));
	music_data.push(createMusicData("i promise you","i promise you", "Break My Fucking Sky", "02:59"));
	music_data.push(createMusicData("Pray","Pray", " Lunar", "03:55"));
	music_data.push(createMusicData("yanhuo", "烟火", "陈翔", "03:56"));
	music_data.push(createMusicData("fengzhijiyi", "风の记忆", "熊木杏里", "03:47"));
	music_data.push(createMusicData("wanglingxuqu", "亡灵序曲", "魔兽世界", "04:06"));
	music_data.push(createMusicData("qiannianlei","千年泪", "Tank", "04:20"));
	music_data.push(createMusicData("shengxiadeshengxia","剩下的盛夏", "TFBOYS 嘻游记", "04:14"));
	music_data.push(createMusicData("xiaoqingge", "小情歌", "苏打绿", "04:43"));
	music_data.push(createMusicData("houhuiwuqi", "后会无期", "徐良", "03:31"));
	music_data.push(createMusicData("qiushangbielian", "秋殇别恋", "牙牙乐", "04:37"));
	music_data.push(createMusicData("yongganai", "勇敢爱", "MI2", "04:16"));
}

function initDesktop() {
	var categories = [];
		categories.push(all_data["music"]);
		categories.push(all_data["video"]);
		categories.push(all_data["document"]);
		categories.push(all_data["games"]);
	for (var i in categories) {
		createCategory(categories[i]);
	}
	createTime();
}

function initEvents() {
	var is_drag = false;
	var mouse_start_x = 0, mouse_start_y = 0, head_start_x = 0, head_start_y = 0;
	var ele;
	addEventListener("mousemove", function(event) {
		if (is_drag) {
			var x = event.pageX;
			var y = event.pageY;
			var offset_x = x - mouse_start_x;
			var offset_y = y - mouse_start_y;

			ele.style.left = parseInt(head_start_x + offset_x) + "px";
			ele.style.top = parseInt(head_start_y + offset_y) + "px";
		}
	}, false);

	addEventListener("mousedown", function(event) {
		var x = event.pageX;
		var y = event.pageY;
		var is_down = false;
		var max_zindex = -1;
		var index = -1;
		for (var i in windows) {
			var parent_width = windows[i].window.offsetWidth;
			var parent_height = windows[i].window.offsetHeight;

			var child = windows[i].window.getElementsByTagName("div")[0];
			var child_x = child.getBoundingClientRect().left;
			var child_y = child.getBoundingClientRect().top;
			var child_width = child.offsetWidth;
			var child_height = child.offsetHeight;

			if (x > child_x && x < child_x + child_width - 60 && y > child_y && y < child_y + child_height) {
				is_down = true;
			}

			if (x > child_x && x < child_x + parent_width && y > child_y && y < child_y + parent_height) {
				if (max_zindex <  parseInt(windows[i].window.style.zIndex)) {
					max_zindex = parseInt(windows[i].window.style.zIndex);
					index = i;
					mouse_start_x = x;
					mouse_start_y = y;
					head_start_x = child_x;
					head_start_y = child_y;
				}
			}
		}

		if (index != -1) {
			if (is_down)ele = windows[index].window;
			focusWindow(windows[index].window.liwen_tag);
		}

		is_drag = is_down;
	}, false);

	addEventListener("mouseup", function(event) {
		is_drag = false;
	}, false);
}

function createData(width, height, icon, name, tag, src) {
	var data = {};
		data.width = width;
		data.height = height;
		data.icon = icon;
		data.name = name;
		data.tag = tag;
		data.src = src;
	return data;
}

function createMusicData(tag, name, singer, time) {
	var data = {};
		data.tag = tag;
		data.name = name;
		data.singer = singer;
		data.time = time;
	return data;
}

function createGameData(img, name, help, type) {
	var data = {};
		data.img = img;
		data.name = name;
		data.help = help;
		data.type = type;
	return data;
}

function createCategory(data) {
	var category_list = $("category-list");
	var li_category = E("li");
		li_category.className = "desktop-category";
		li_category.onclick = function() {
			createWindow(data);
		}
	var div_icon = E("div");
		div_icon.className = "desktop-category-icon";
		div_icon.style.backgroundImage = 'url("res/icon/' + data.icon + '.png")';
	var div_name = E("div");
		div_name.className = "desktop-category-name";
		div_name.innerHTML = data.name;

	category_list.appendChild(li_category);
	li_category.appendChild(div_icon);
	li_category.appendChild(div_name);
}

function focusWindow(tag) {
	windows[tag].window.style.zIndex = index_count++;
	windows[tag].window.style.display = "block";
}

function switchTasktab() {
	var list = $("tab-list").getElementsByTagName("li");
	if (list.length > 6) {
		for (var i in list) {
			list[i].className = "taskbar-tab-min";
		}
	} else {
		for (var i in list) {
			list[i].className = "taskbar-tab";
		}
	}
}

function createTasktab(data) {
	var tab_list = $("tab-list");
	var li_tab = E("li");
		li_tab.onclick = function() {
			if ((windows[data.tag].window.style.display == "block" || !windows[data.tag].window.style.display) && parseInt(windows[data.tag].window.style.zIndex) == index_count - 1) {
				windows[data.tag].window.style.display = "none";
			} else {
				focusWindow(data.tag);
			}
		}
		windows[data.tag].tab = li_tab;
	var div_icon = E("div");
		div_icon.className = "tab-icon";
		div_icon.style.backgroundImage = 'url("res/icon/' + data.icon + '.png")';
	var div_name = E("div");
		div_name.className = "tab-title";
		div_name.innerHTML = data.name;

	tab_list.appendChild(li_tab);
	li_tab.appendChild(div_icon);
	li_tab.appendChild(div_name);
	switchTasktab();
}

function createWindow(data) {
	if (windows[data.tag]) {
		focusWindow(data.tag);
		return;
	}
	createWindowFrame(data);
	createTasktab(data);
}

function createWindowFrame(data) {
	var my_window = E("div");
		my_window.className = "window";
		my_window.style.width = data.width + "px";
		my_window.style.height = (70 + data.height) + "px";
		my_window.style.zIndex = index_count++;
		my_window.liwen_tag = data.tag;
		windows[data.tag] = [];
		windows[data.tag].window = my_window;
		document.body.appendChild(my_window);

	var head = E("div");
		head.className = "window-head";
		my_window.appendChild(head);
	var head_wrapper = E("div");
		head_wrapper.className = "window-head-wrapper";
		head.appendChild(head_wrapper);
	var icon = E("div");
		icon.className = "window-icon";
		icon.style.backgroundImage = 'url("res/icon/' + data.icon + '.png")';
		head_wrapper.appendChild(icon);
	var title = E("div");
		title.className = "window-title";
		title.innerHTML = data.name;
		head_wrapper.appendChild(title);

	var buttons = E("div");
		buttons.className = "window-buttons";
		head.appendChild(buttons);

	var min_btn = E("div");
		min_btn.className = "min-button";
		buttons.appendChild(min_btn);
		min_btn.onclick = function() {
			my_window.style.display = "none";
		}
	var exit_btn = E("div");
		exit_btn.className = "exit-button";
		buttons.appendChild(exit_btn);

		exit_btn.onclick = function() {
			removeWindow(data.tag);
		}

	var body = E("div");
		body.className = "window-body";
		body.style.height = data.height + "px";
		my_window.appendChild(body);

	var body_content = E("iframe");
		body_content.className = "window-iframe";
		body_content.width = data.width + "px";
		body_content.height = data.height + "px";
		body_content.scrolling = "no";
	switch(data.tag) {
		case "tip":
			createTipContent(body);
			break;
		case "music":
			createMusicContent(body);
			break;
		case "video":
			createVideoContent(body);
			break;
		case "game":
			createGameContent(body);
			break;
		case "20150803plane":
		case "20150805matching":
		case "20160121star":
		case "20160126maplestory":
			body.appendChild(body_content);
			body_content.src = "games/" + data.src + "/index.html";
			break;
	}

	var bottom = E("div");
		bottom.className = "window-bottom";
		my_window.appendChild(bottom);
}

function createTipContent(body) {
	var tip = E("div");
		tip.className = "tip";
		body.appendChild(tip);
		tip.innerHTML = "<p>建议使用谷歌浏览器浏览</p><p>建议使用全屏浏览，谷歌浏览器和360浏览器默认按键为F11</p><p>QQ 1439080086</p>";
}

function createMusicContent(body) {
	var musci_player = E("div");
		musci_player.className = "music-player";
		body.appendChild(musci_player);
	var info = E("div");
		info.className = "music-info";
		musci_player.appendChild(info);
	var outline = E("div");
		outline.className = "outline";
		info.appendChild(outline);
	var circle = E("div");
		circle.className = "circle";
		outline.appendChild(circle);
	var progress_change = E("div");
		progress_change.className = "progress-change";
		progress_change.id = "progress_change";
		info.appendChild(progress_change);
	var progress = E("div");
		progress.className = "progress";
		progress_change.appendChild(progress);

	var line = E("div");
		line.className = "music-line";
		musci_player.appendChild(line);

	var wrapper = E("div");
		wrapper.className = "play-list-wrapper";
		musci_player.appendChild(wrapper);
	var list = E("ul");
		wrapper.appendChild(list);
	var audio = E("audio");
		audio.autoplay = "autoplay";
		wrapper.appendChild(audio);

	initPlayer(list, audio, progress);

	progress_change.onclick = function(event) {
		if (!curr_music.tag) return;
		var curr_point = event.pageX - progress_change.getBoundingClientRect().left;

		audio.currentTime = audio.duration * curr_point / 300;
	}

	audio.addEventListener("ended", function() {
		curr_music.item.style.backgroundColor = 'rgba(0, 0, 0, 0)';
		clearInterval(thread);
		var item_list = list.getElementsByTagName("li");
		var item = item_list[parseInt(Math.random() * item_list.length)];
		playSong(item, audio, progress);
	}, false);
}

function initPlayer(list, audio, progress) {
	for (var i in music_data) {
		var data = music_data[i];
			data.rank = parseInt(i) + 1;
		createMusicItem(data, list, audio, progress);
	}
}

function createMusicItem(data, list, audio, progress) {
	var item_li = E("li");
		item_li.onclick = function() {
			if (curr_music.tag == data.tag) return;
			if (curr_music.item) {
				curr_music.item.style.backgroundColor = 'rgba(0, 0, 0, 0)';
				clearInterval(thread);
			}
			playSong(item_li, audio, progress);
		}
		item_li.liwen_tag = data.tag;
		list.appendChild(item_li);

	var rank_div = E("div");
		rank_div.className = "rank";
		rank_div.innerHTML = data.rank;
		item_li.appendChild(rank_div);

	var info_wrapper_div = E("div");
		info_wrapper_div.className = "info-wrapper";
		item_li.appendChild(info_wrapper_div);
	var name_div = E("div");
		name_div.className = "name";
		name_div.innerHTML = data.name;
		info_wrapper_div.appendChild(name_div);

	var singer_div = E("div");
		singer_div.className = "singer";
		singer_div.innerHTML = data.singer;
		info_wrapper_div.appendChild(singer_div);

	var time_div = E("div");
		time_div.className = "time";
		time_div.innerHTML = data.time;
		item_li.appendChild(time_div);
}

function playSong(item, player, progress) {
	var tag = item.liwen_tag;
	player.src = "music/" + tag + ".mp3";
	player.play();

	curr_music.tag = tag;
	curr_music.item = item;
	item.style.backgroundColor = 'rgba(210,180,140,0.5)';

	thread = setInterval(function() {
		progress.style.width = parseInt((player.currentTime / player.duration) * 300) + "px";
	}, 333, false);
}

function createVideoContent(body) {

}

function createGameContent(body) {
	var content = E("div");
		content.className = "game-content";
		body.appendChild(content);
	var list = E("ul");
		list.className = "game-list";
		content.appendChild(list);

	for (var i in games) {
		createItem(list, games[i]);
	}
}

function createItem(list, item_data) {
	var item = E("li");
		item.className = "game-item";
		item.onclick = function() {
			createWindow(all_data[item_data.img]);
		}
		list.appendChild(item);
	var img = E("div");
		img.style.backgroundImage = 'url("res/game/' + item_data.img + '.jpg")';
		img.className = "game-image";
		item.appendChild(img);
	var des = E("div");
		des.className = "game-des";
		item.appendChild(des);
	var name = E("div");
		name.className = "game-name";
		name.innerHTML = item_data.name;
		des.appendChild(name);
	var help = E("div");
		help.className = "game-help";
		help.innerHTML = item_data.help;
		des.appendChild(help);
	var type = E("div");
		type.className = "game-type";
		type.innerHTML = item_data.type;
		item.appendChild(type);
}

function removeWindow(tag) {
	document.body.removeChild(windows[tag].window);
	$("tab-list").removeChild(windows[tag].tab);

	for (var i in windows) {
		if (windows[tag].window.liwen_tag == tag) {
			windows[tag] = null;
			windows.splice(i, 1);
			delete windows[tag];
			break;
		}
	}
	switchTasktab();
}

function createTime() {
	var taskbar_date = $("taskbar_date");

	var day_arr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var month_arr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	var my_date = new Date();

	var day = my_date.getDay();
	var date = my_date.getDate();
	var month = my_date.getMonth();
	var year = my_date.getFullYear();
	
	var hours = my_date.getHours();
		hours = hours > 9 ? hours : "0" + hours;
	var minutes = my_date.getMinutes();
		minutes = minutes > 9 ? minutes : "0" + minutes;

	taskbar_date.innerHTML = day_arr[day] + " " + month_arr[month] + " " + date + ", " + year + "   " + hours + ":" + minutes;

	setInterval(function() {
		var my_date = new Date();

		var day = my_date.getDay();
		var date = my_date.getDate();
		var month = my_date.getMonth();
		var year = my_date.getFullYear();
		
		var hours = my_date.getHours();
			hours = hours > 9 ? hours : "0" + hours;
		var minutes = my_date.getMinutes();
			minutes = minutes > 9 ? minutes : "0" + minutes;

		taskbar_date.innerHTML = day_arr[day] + " " + month_arr[month] + " " + date + ", " + year + "   " + hours + ":" + minutes;
	}, 1000, false);
}