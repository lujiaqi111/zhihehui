;
(function(undefined) {
	var _global;
	//工具函数
	//配置合并
	function extend(def, opt, override) {
		for(var k in opt) {
			if(opt.hasOwnProperty(k) && (!def.hasOwnProperty(k) || override)) {
				def[k] = opt[k]
			}
		}
		return def;
	}
	//日期格式化
	function formartDate(y, m, d, symbol) {
		symbol = symbol || '-';
		m = (m.toString())[1] ? m : '0' + m;
		d = (d.toString())[1] ? d : '0' + d;
		return y + symbol + m + symbol + d
	}

	function Schedule(opt) {
		var def = {},
			opt = extend(def, opt, true),
			curDate = opt.date ? new Date(opt.date) : new Date(),
			year = opt.selectYear || curDate.getFullYear(),
			month = opt.selectMonth || curDate.getMonth(),
			day =opt.selectday ||  curDate.getDate(),
			currentYear = curDate.getFullYear(),
			currentMonth = curDate.getMonth(),
			currentDay = curDate.getDate(),
			selectedDate = '',
			//缺勤
			qqDate = opt.qqDate || "",
			zcDate = opt.zcDate || "",
			el = document.querySelector(opt.el) || document.querySelector('body'),
			_this = this;
			console.log(JSON.stringify(opt));
		var bindEvent = function() {
//			if(el.dataset['cc']){
				console.log(JSON.stringify(el))
				el.addEventListener('click', function(e) {
					switch(e.target.id) {
						case 'nextMonth':
							_this.nextMonthFun();
							break;
						case 'nextYear':
							_this.nextYearFun();
							break;
						case 'prevMonth':
							_this.prevMonthFun();
							break;
						case 'prevYear':
							_this.prevYearFun();
							break;
						default:
							break;
					};
					if(e.target.className.indexOf('currentDate') > -1) {
						opt.clickCb && opt.clickCb(year, month + 1, e.target.innerHTML,e.target);
						selectedDate = e.target.title;
						day = e.target.innerHTML;
						render();
						$('.schedule-bd li').on('tap',function(){
							var nowDate = $(this).attr('nowDate');
							$.ajax({
											type:"post",
											url:ajaxUrlPath+"/mobile/userPunch/punchRecord",
											data:{
												userId:localStorage.getItem('memberId'),
												date:nowDate
											},
											success:function(data){
												if(data.code==0){
													var html = '';
													for (var i = 0; i < data.result.length; i++) {
														html += '<li>'+(i+1)+'.'+data.result[i].punchDate+'  '+data.result[i].address+'  '+data.result[i].memo+'</li>'
													}
													console.log(html);
													$('.index_frame_list').html(html);
												}
							},
						})
						})
					}
				}, false)
//				el.dataset['cc']=1;
//			}
		}
		var init = function() {
			var scheduleHd = '<div class="schedule-hd">' +
				'<div style="width: 50px; text-align: right;">' +
				'<span class="arrow icon iconfont icon-112leftarrowhead" id="prevMonth"></span>' +
				'</div>' +
				'<div class="today">' + year + "年" + (month + 1) + "月" + '</div>' +
				'<div style="width: 50px; text-align: left;">' +
				'<span class="arrow icon iconfont icon-111arrowheadright" id="nextMonth"></span>' +
				'</div>' +
				'</div>'
			var scheduleWeek = '<ul class="week-ul ul-box clearfix">' +
				'<li>日</li>' +
				'<li>一</li>' +
				'<li>二</li>' +
				'<li>三</li>' +
				'<li>四</li>' +
				'<li>五</li>' +
				'<li>六</li>' +
				'</ul>'
			var scheduleBd = '<ul class="schedule-bd ul-box clearfix" ></ul>';
			el.innerHTML = scheduleHd + scheduleWeek + scheduleBd;
			bindEvent();
			render();
		}
		var render = function() {
			var fullDay = new Date(year, month + 1, 0).getDate(), //当月总天数
				startWeek = new Date(year, month, 1).getDay(), //当月第一天是周几
				total = (fullDay + startWeek) % 7 == 0 ? (fullDay + startWeek) : fullDay + startWeek + (7 - (fullDay + startWeek) % 7), //元素总个数
				lastMonthDay = new Date(year, month, 0).getDate(), //上月最后一天
				eleTemp = [];
				// console.log(startWeek+','+fullDay);
			for(var i = 0; i < total; i++) {
				if(i < startWeek) {
					var nowDate = formartDate(year, month, ((lastMonthDay - startWeek) + 1 + i), '-');
					var addClass = '';
					
					eleTemp.push('<li class="other-month"><span class="dayStyle ' + addClass + '">' + (lastMonthDay - startWeek + 1 + i) + '</span></li>')
				} else if(i < (startWeek + fullDay)) {
					var nowDate = formartDate(year, month + 1, (i + 1 - startWeek), '-');
					var addClass = '';
					var Morning = '';
					var Afternoon = '';
					//					selectedDate == nowDate && (addClass = 'selected-style');
					for(var j = 0; j < zcDate.length; j++) {
						// console.log(zcDate[j].time+','+nowDate);
						if(zcDate[j].time == nowDate){
							addClass = 'zc_day', Morning = zcDate[j].Morning, Afternoon = zcDate[j].Afternoon
						}
						// zcDate[j].time == nowDate && ();
					}
					for(var z = 0; z < qqDate.length; z++) {
						if(qqDate[z].time == nowDate){
							addClass = 'qq-style', Morning = qqDate[z].Morning, Afternoon = qqDate[z].Afternoon
						}
						// qqDate[z].time == nowDate && (addClass = 'qq-style', Morning = qqDate[z].Morning, Afternoon = qqDate[z].Afternoon);
					
					}
					//					formartDate(currentYear,currentMonth+1,currentDay,'-') == nowDate && (addClass = 'today-flag');
					eleTemp.push('<li class="current-month" nowDate="'+nowDate+'" ><span  class="currentDate dayStyle ' + addClass + '">' + (i + 1 - startWeek) + '</span></li>')
				} else {
					eleTemp.push('<li class="other-month" nowDate="'+nowDate+'" ><span class="dayStyle">' + (i + 1 - (startWeek + fullDay)) + '</span></li>')
				}
			}
			el.querySelector('.schedule-bd').innerHTML = eleTemp.join('');
			el.querySelector('.today').innerHTML = year + "年" + (month + 1) + "月";
		};
		this.nextMonthFun = function() {
				if(month + 1 > 11) {
					year += 1;
					month = 0;
				} else {
					month += 1;
				}
				render();
				opt.nextMonthCb && opt.nextMonthCb(year, month + 1, day);
			},
			this.nextYearFun = function() {
				year += 1;
				render();
				opt.nextYeayCb && opt.nextYeayCb(year, month + 1, day);
			},
			this.prevMonthFun = function() {
				if(month - 1 < 0) {
					year -= 1;
					month = 11;
				} else {
					month -= 1;
				}
				render();
				opt.prevMonthCb && opt.prevMonthCb(year, month + 1, day);
			},
			this.prevYearFun = function() {
				year -= 1;
				render();
				opt.prevYearCb && opt.prevYearCb(year, month + 1, day);
			}
		init();
	}
	//将插件暴露给全局对象
	_global = (function() {
		return this || (0, eval)('this')
	}());
	if(typeof module !== 'undefined' && module.exports) {
		module.exports = Schedule;
	} else if(typeof define === "function" && define.amd) {
		define(function() {
			return Schedule;
		})
	} else {
		!('Schedule' in _global) && (_global.Schedule = Schedule);
	}
	
	

}());
