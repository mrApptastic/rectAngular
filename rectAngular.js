var rectAngular = function (elem, width, height) {
	var rect = this;
	rect.area = document.getElementById(elem);
	rect.ctxt = rect.area.getContext("2d");
	rect.draw = {
		"x1" : null,
		"y1" : null,
		"x2" : null,
		"y2" : null,
		"tx" : null,
		"ty" : null,
		"left" : 1000,
		"score" : 0
	};
	rect.ball = {
		"x" : 20,
		"y" : 20,
		"w" : 20,
		"mx" : true, 
		"my" : true,
		"speed" : 1,
		"step" : 1,
		"count" : 0
	};
	rect.set = {
		draw : null,
		ball : null
	};
	rect.init = function () {
		/* Clear Animation (If any) */
		if (rect.anima) {
			clearInterval(rect.anima);
		}
		/* Save Base Rect Settings */
		if (!rect.set.draw) {
			rect.set.draw = JSON.stringify(rect.draw);
		}
		/* Save Base Ball Settings */
		if (!rect.set.ball) {
			rect.set.ball = JSON.stringify(rect.ball);
		}
		rect.area.width = width ? width : window.innerWidth;
		rect.area.height = height ? height : window.innerHeight;
		rect.area.style.cursor = "none";
		rect.ctxt.fillStyle = "DodgerBlue";
		rect.anima = setInterval(rect.paint, 1);
	};
	rect.area.onclick = function (e) {
		var x = e.pageX - (rect.area.getBoundingClientRect().left + window.scrollX);
		var y = e.pageY - (rect.area.getBoundingClientRect().top + window.scrollY);
		/* No Clicks */
		if (!rect.draw.x1 && !rect.draw.y1 && !rect.draw.x1 && !rect.draw.y1) {			
			rect.draw.x1 = x;
			rect.draw.y1 = y;
		}
		/* One Click */
		else if (rect.draw.x1 && rect.draw.y1 && !rect.draw.x2 && !rect.draw.y2) {
			rect.draw.x2 = x;
			rect.draw.y2 = y;
		}
		/* Two Clicks */
		else if (rect.draw.x1 && rect.draw.y1 && rect.draw.x2 && rect.draw.y2) {
			rect.draw.x1 = x;
			rect.draw.y1 = y;
			rect.draw.x2 = null;
			rect.draw.y2 = null;
		}
	};
	rect.area.onmousemove = function (e) {
		rect.draw.tx = e.pageX - (rect.area.getBoundingClientRect().left + window.scrollX);
		rect.draw.ty = e.pageY - (rect.area.getBoundingClientRect().top + window.scrollY);
	};
	rect.paint = function () {
		/* Clear Canvas */
		rect.ctxt.clearRect(0, 0, window.innerWidth, window.innerHeight);
		
		/* Draw Rect (Mouse) */
		if (rect.draw.tx && rect.draw.ty) {
			if (!rect.draw.x1 && !rect.draw.y1 && !rect.draw.x1 && !rect.draw.y1) {			
				rect.ctxt.fillRect(rect.draw.tx, rect.draw.ty, 5, 5);
			}
			else if (rect.draw.x1 && rect.draw.y1 && !rect.draw.x2 && !rect.draw.y2) {
				rect.ctxt.fillRect(rect.draw.x1, rect.draw.y1, -(rect.draw.x1 - rect.draw.tx), -(rect.draw.y1 - rect.draw.ty));
			}
			else if (rect.draw.x1 && rect.draw.y1 && rect.draw.x2 && rect.draw.y2) {
				rect.ctxt.fillRect(rect.draw.tx, rect.draw.ty, 5, 5);
				rect.ctxt.fillRect(rect.draw.x1, rect.draw.y1, -(rect.draw.x1 - rect.draw.x2), -(rect.draw.y1 - rect.draw.y2));
			}
		}
		/* Draw Rect (Touch) */
		else {
			if (rect.draw.x1 && rect.draw.y1 && !rect.draw.x2 && !rect.draw.y2) {
				rect.ctxt.fillRect(rect.draw.x1, rect.draw.y1, 5, 5);
			}
			else if (rect.draw.x1 && rect.draw.y1 && rect.draw.x2 && rect.draw.y2) {
				rect.ctxt.fillRect(rect.draw.x1, rect.draw.y1, -(rect.draw.x1 - rect.draw.x2), -(rect.draw.y1 - rect.draw.y2));
			}
		}
		
		/* Draw Ball */
		if (rect.ball.count % rect.ball.speed === 0) {
			/* 7 */
			if (!rect.ball.mx && !rect.ball.my) {
				rect.ball.x -= rect.ball.step;
				rect.ball.y -= rect.ball.step;
			}
			/* 9 */
			else if (rect.ball.mx && !rect.ball.my) {
				rect.ball.x += rect.ball.step;
				rect.ball.y -= rect.ball.step;
			}
			/* 1 */
			else if (!rect.ball.mx && rect.ball.my) {
				rect.ball.x -= rect.ball.step;
				rect.ball.y += rect.ball.step;
			}	
			/* 3 */
			else {
				rect.ball.x += rect.ball.step;
				rect.ball.y += rect.ball.step;
			}				
		}
		
		rect.ctxt.beginPath();
		rect.ctxt.arc(rect.ball.x, rect.ball.y, rect.ball.w, 0, 2 * Math.PI);
		rect.ctxt.closePath();
		rect.ctxt.fill();
		
		/* Check for Collision */
		if (rect.draw.x1 && rect.draw.y1 && rect.draw.x2 && rect.draw.y2) {
			let x_1 = rect.draw.x1 > rect.draw.x2 ? rect.draw.x2 : rect.draw.x1;
			let x_2 = rect.draw.x1 > rect.draw.x2 ? rect.draw.x1 : rect.draw.x2;
			let y_1 = rect.draw.y1 > rect.draw.y2 ? rect.draw.y2 : rect.draw.y1;
			let y_2 = rect.draw.y1 > rect.draw.y2 ? rect.draw.y1 : rect.draw.y2;
			/*
			console.log({
				bx : rect.ball.x,
				by : rect.ball.y,
				x1 : x_1,
				x2 : x_2,
				y1 : y_1,
				y2 : y_2
				
			});
			*/
			/* 7 */

			
			/* 3 */
			if (rect.ball.mx && rect.ball.my) {
				let mx_1 = x_1 - rect.ball.w;
				let mx_2 = x_2 - rect.ball.w;
				let my_1 = y_1 - rect.ball.w;
				let my_2 = y_2 - rect.ball.w;
				/*
				console.log({
				bx : rect.ball.x,
				by : rect.ball.y,
				x1 : mx_1,
				x2 : mx_2,
				y1 : my_1,
				y2 : my_2,
				
				});
				*/
				if (mx_1 <= rect.ball.x && mx_2 >= rect.ball.x && my_1 <= rect.ball.y && my_2 >= rect.ball.y) {
					let fromX = rect.ball.x - mx_1;
					let fromY = rect.ball.y - my_1;
					if (fromX > fromY) {
						rect.ball.my = false;
					}
					else {
						rect.ball.mx = false;
					}
				}
			}
		}
		
		
		/* Check for Ball Overflow */
		if (rect.ball.x < 0 || rect.ball.y < 0 || rect.ball.x > rect.area.width || rect.ball.y > rect.area.height) {
			clearInterval(rect.anima);
			rect.draw = JSON.parse(rect.set.draw);
			rect.ball = JSON.parse(rect.set.ball);
			rect.init();
		}
		
		rect.ball.count++;
	};
	rect.init();
};