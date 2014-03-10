/*
 * jQuery zzimdakToolTip - Development (Full) version
 *
 * Copyright (c) 2014 Kang, Shin-lib.
 * http://sourcetree.me
 */

(function($){
	$.extend({
		ZTooltip: function(options){
			//# 최종 설정값
			var settings = {};

			//# 기본 설정값
			var defaults = {
				css: 'tooltip',
				data: null
			};

			//# 최종 설정값에 값 입력
			settings = $.extend({}, defaults, options);

			//# 클릭 이벤트 바인딩 처리
			$('*').bind('click', function(e){
				e.stopPropagation();
				if($(e.target).hasClass(settings.css)!=true) removeTools();
				else getTools($(this));
			});

			//# 툴팁 호출
			var getTools = function(_obj){
				if(settings.data==null) return false;
				removeTools();

				var position = $(_obj).position();
				var menus = $('<ul />');

				$.each(settings.data, function(dataTEXT, dataURL){
					var matches = dataURL.match(/({[0-9a-z]+})/gi);
					if(matches==null) return true;

					for(var i in matches){
						if(i.match(/[^0-9]/gi)!=null) continue;
						dataURL = dataURL.replace(matches[i], $(_obj).data(matches[i].replace(/\{(.*)\}/gi, '$1')));
					}

					$('<li />').append($('<a />').attr({'href':dataURL}).text(dataTEXT)).appendTo($(menus));
				});

				$('<div />').addClass(settings.css).css({top:position.top, left:position.left+$(_obj).width()}).append($(menus)).appendTo($('body')).find('*').addClass(settings.css);
			};

			//# 툴팁 삭제
			var removeTools = function(){
				$('div.'+settings.css).remove();
			};
		}
	});
})(jQuery);