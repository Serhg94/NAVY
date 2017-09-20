	var MyField = [
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
	];
	
	var EnemyField = [
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
	];
	
	var action_type=0;
	var first_shot = [-1, -1];
	var last_shot = [-1, -1];
	var wins = 0;
	var losts = 0;
	
	
	function start_game() {
		clear_field();
		place_ship();
		action_type=1;
	}
	
	
	function place_ship() {
		set_ship(4, MyField); set_ship(4, EnemyField);
		set_ship(3, MyField); set_ship(3, EnemyField);
		set_ship(3, MyField); set_ship(3, EnemyField);
		set_ship(2, MyField); set_ship(2, EnemyField);
		set_ship(2, MyField); set_ship(2, EnemyField);
		set_ship(2, MyField); set_ship(2, EnemyField);
		set_ship(1, MyField); set_ship(1, EnemyField);
		set_ship(1, MyField); set_ship(1, EnemyField);
		set_ship(1, MyField); set_ship(1, EnemyField);
		set_ship(1, MyField); set_ship(1, EnemyField);
	}
	
	
	function set_ship(lenght_of_board, table) { //ставит корабль заданной длинны на заданное поле
		var seted = false;
		while ( seted != true ) { 			//случайно ставит корабль на поле
			var choice = random(1);			//мешают соседи - ставит в другое случайное место, пока не встанет
			var busy = false;
			var x, y;
			if (choice == 1) {
				x = random(9-lenght_of_board);
				y = random(9);
			}
			else {
				x = random(9);
				y = random(9-lenght_of_board);
			}
			for (var i=0; i<lenght_of_board; i++) {
				var x1, x2, x3, y1, y2, y3;
				if (choice == 1) {
					 x1 = x+i-1;  x2 = x+i;  x3 = x+i+1; //случайно выбираем - горизонтально или вертикально
					 y1 = y-1;  y2 = y;  y3 = y+1; 
					if (x2 < 0) {busy = true; break;}
				}
				else {
					 x1 = x-1;  x2 = x;  x3 = x+1;
					 y1 = y+i-1;  y2 = y+i;  y3 = y+i+1;
					if (y2 < 0) {busy = true; break;}
				}
				if (x1 < 0) x1 = x2; //куча if - следит, чтобы полученные ячейки-соседи не вылезали за границы таблицы
				if (x3 > 9) x3 = x2;
				if (y1 < 0) y1 = y2; 
				if (y3 > 9) y3 = y2;
				if (!(
				(table[x1][y3]==0)&&(table[x2][y3]==0)&&(table[x3][y3]==0)&&

				(table[x1][y2]==0)&&(table[x2][y2]==0)&&(table[x3][y2]==0)&&
				
				(table[x1][y1]==0)&&(table[x2][y1]==0)&&(table[x3][y1]==0)))
					{busy = true; break;}
			}
			if (busy == false) {
				for (var i=0; i<lenght_of_board; i++) 
					if (choice == 1) table[x+i][y] = 1;
					else table[x][y+i] = 1;
				seted = true;
			}
		}
		refresh_view();
	}
	
	
	function str(el) {
		return el ? (el.id || el.nodeName) : 'null';
	}
	
	
	function random(n) {
		return Math.floor( Math.random( ) * (n+1) );
	}
	
	
	function clear_field() {
		for (var i=0; i<10; i++)
			for (var j=0; j<10; j++){
				MyField[i][j] = 0;
				EnemyField[i][j] = 0;
			}
		first_shot = [-1, -1];
		last_shot = [-1, -1];
		refresh_view();
	}
	
	
	function refresh_view() { //рисует вид по состоянию модели
		for (var i=0; i<10; i++)
			for (var j=0; j<10; j++){
				if (MyField[i][j]==0) document.getElementById("m"+i+j).setAttribute("bgcolor","");
				if (MyField[i][j]==1) document.getElementById("m"+i+j).setAttribute("bgcolor","green");
				if (MyField[i][j]==2) document.getElementById("m"+i+j).setAttribute("bgcolor","blue");
				if (MyField[i][j]==3) document.getElementById("m"+i+j).setAttribute("bgcolor","red");
				if (MyField[i][j]==4) document.getElementById("m"+i+j).setAttribute("bgcolor","black");
				if (EnemyField[i][j]==0) document.getElementById("e"+i+j).setAttribute("bgcolor","");
				if (EnemyField[i][j]==2) document.getElementById("e"+i+j).setAttribute("bgcolor","blue");
				if (EnemyField[i][j]==3) document.getElementById("e"+i+j).setAttribute("bgcolor","red");
				if (EnemyField[i][j]==4) document.getElementById("e"+i+j).setAttribute("bgcolor","black");
			}
	}
	
	
	function choise_actoin (field, this_act_type, x, y) {
		if ((field == "m")){
			
		}
		if ((field == "e")){
			if (action_type == 1) my_strike(x, y);
		}	
		refresh_view();		
	}
	 
	 
	function my_strike(x, y) {
		if (EnemyField[x][y] == 1) {
			if (check_alive(EnemyField, x, y, x, y))
				{EnemyField[x][y] = 3;}
			else {
				kill_ship(EnemyField, x, y, x, y);
				check_win(EnemyField);
			}
		}
		else {
			if (EnemyField[x][y] == 0) {
				EnemyField[x][y] = 2;
				enemy_strike();
			}
		}
	}
	 
	 
	function enemy_strike() {
		var shot_complete = 0;
		action_type = 0;
		var x; var y; var count_setted_cell = 0;
		if (first_shot[0]!=-1) { //вычисляем добивание
			if ((last_shot[0]==first_shot[0])&&(last_shot[1]==first_shot[1])) {
				var x1 = first_shot[0]-1; var x2 = parseInt(first_shot[0]); var x3 = parseInt(first_shot[0])+1;
				var y1 = first_shot[1]-1; var y2 = parseInt(first_shot[1]); var y3 = parseInt(first_shot[1])+1;
				if (x1 < 0) x1 = x2;
				if (x3 > 9) x3 = x2;
				if (y1 < 0) y1 = y2; 
				if (y3 > 9) y3 = y2;		
				switch (random(3)) {
					case 0: x = x1; y = y2; break;
					case 1: x = x3; y = y2; break;	
					case 2: x = x2; y = y1; break;
					case 3: x = x2; y = y3; break;
				}
			}
			else {
				if (last_shot[0]==first_shot[0]) {
					x = last_shot[0];
					var diva = (last_shot[1]-first_shot[1])/Math.abs(last_shot[1]-first_shot[1]);
					if (random(1)==1) y = last_shot[1]+diva;
						else y = first_shot[1]-diva;
				}
				else {
					y = last_shot[1];
					var diva = (last_shot[0]-first_shot[0])/Math.abs(last_shot[0]-first_shot[0]);
					if (random(1)==1) x = last_shot[0]+diva;
						else x = first_shot[0]-diva;
				}
				if (x < 0) x = 0; if (x > 9) x = 9; if (y < 0) y = 0; if (y > 9) y = 9;
			}
		}
		else {		//выбираем рандомные координаты, если некого добивать
			for (var i=0; i<Math.abs(difficult.value); i++) {
				x = random(9); 					//сложность = количество попыток компьютера стрелять
				y = random(9);
				if (((difficult.value > 0)&&(MyField[x][y] == 1))||((difficult.value < 0)&&(MyField[x][y] == 0))) break;
			}
		}
		if (MyField[x][y] == 1) {   //стреляем
			MyField[x][y] = 3;   count_setted_cell = 1;
			if (first_shot[0] == -1) {
				first_shot[0] = x;
				first_shot[1] = y;
			}
			if (!check_alive(MyField, x, y, x, y)) {
				kill_ship(MyField, x, y, x, y);
				if (check_win(MyField)) return;
				first_shot[0] = first_shot[1] = last_shot[0] = last_shot[1] = -1;
			}
		}
		if (MyField[x][y] == 3) {
			last_shot[0] = x;
			last_shot[1] = y;
		}
		if (MyField[x][y] == 0) {
			MyField[x][y] = 2;	 count_setted_cell = 1;
			shot_complete = 1;
		}
		refresh_view();
		if (shot_complete == 1) action_type = 1;    //задержка между попаданиями компьютера
		if ((shot_complete != 1)&&(count_setted_cell == 1)) setTimeout("enemy_strike()", 1200);
		else if (shot_complete != 1) enemy_strike();
	}
	
	
	function check_win(table) {
		var flag = 1;
		for (var i=0; i<10; i++)
			for (var j=0; j<10; j++)
				if (table[i][j] == 1) flag = 0;
		if (flag == 1) {
			refresh_view();
			if (table == MyField) {
				document.body.background = 'style/img/lost.jpg';
				alert("You lose...");
				losts++;
				document.getElementById("losts").innerHTML = losts;
			}
			else {
				document.body.background = 'style/img/win.jpg';
				alert("You WIN!!!");
				wins++;
				document.getElementById("wins").innerHTML = wins;
			}
			action_type = 0;
			clear_field();
			return true;
		}
		return false;
	}
	
	
	function kill_ship(table, x, y, x0, y0) {
		var x1 = x-1; var x2 = parseInt(x); var x3 = parseInt(x)+1;
		var y1 = y-1; var y2 = parseInt(y); var y3 = parseInt(y)+1;
		if (x1 < 0) x1 = x2;
		if (x3 > 9) x3 = x2;
		if (y1 < 0) y1 = y2; 
		if (y3 > 9) y3 = y2;		
		table[x][y] = 4;
		//поле промахов вокруг уничтоженного
		if ((table[x1][y3] != 3)&&(table[x1][y3] != 4)) table[x1][y3] = 2;
		if ((table[x2][y3] != 3)&&(table[x2][y3] != 4)) table[x2][y3] = 2;
		if ((table[x3][y3] != 3)&&(table[x3][y3] != 4)) table[x3][y3] = 2;
		if ((table[x1][y2] != 3)&&(table[x1][y2] != 4)) table[x1][y2] = 2;
		if ((table[x3][y2] != 3)&&(table[x3][y2] != 4)) table[x3][y2] = 2;
		if ((table[x1][y1] != 3)&&(table[x1][y1] != 4)) table[x1][y1] = 2;
		if ((table[x2][y1] != 3)&&(table[x2][y1] != 4)) table[x2][y1] = 2;
		if ((table[x3][y1] != 3)&&(table[x3][y1] != 4)) table[x3][y1] = 2;
		
		if ((table[x2][y3]==3)&&((x2!=x0)||(y3!=y0))) kill_ship(table, x2, y3, x, y);
		if ((table[x1][y2]==3)&&((x1!=x0)||(y2!=y0))) kill_ship(table, x1, y2, x, y);
		if ((table[x3][y2]==3)&&((x3!=x0)||(y2!=y0))) kill_ship(table, x3, y2, x, y);
		if ((table[x2][y1]==3)&&((x2!=x0)||(y1!=y0))) kill_ship(table, x2, y1, x, y);
		return true;
	}
	
	
	function check_alive(table, x, y, x0, y0) { //нулевые - координаты откуда пришли
		var x1 = x-1; var x2 = parseInt(x); var x3 = 1+parseInt(x);
		var y1 = y-1; var y2 = parseInt(y); var y3 = 1+parseInt(y); 
		if (x1 < 0) x1 = x2;
		if (x3 > 9) x3 = x2;   
		if (y1 < 0) y1 = y2; 
		if (y3 > 9) y3 = y2;
		//рекурсией проверяем остались ли живые клетки у этого корабля
		if ((table[x][y]==1)&&((x!=x0)||(y!=y0))) 
			return true;
		
		if (((table[x2][y3]!=0)&&(table[x2][y3]!=2))&&((x2!=x0)||(y3!=y0))&&((x2!=x)||(y3!=y))) //право
			if (check_alive(table, x2, y3, x, y)) 
				return true;
		if (((table[x1][y2]!=0)&&(table[x1][y2]!=2))&&((x1!=x0)||(y2!=y0))&&((x1!=x)||(y2!=y))) //верх
			if (check_alive(table, x1, y2, x, y)) 
				return true;
		if (((table[x3][y2]!=0)&&(table[x3][y2]!=2))&&((x3!=x0)||(y2!=y0))&&((x3!=x)||(y2!=y))) //низ
			if (check_alive(table, x3, y2, x, y)) 
				return true;
		if (((table[x2][y1]!=0)&&(table[x2][y1]!=2))&&((x2!=x0)||(y1!=y0))&&((x2!=x)||(y1!=y))) //лево
			if (check_alive(table, x2, y1, x, y)) 
				return true;
			
		return false;
	}
	
	
	function handler(e) {
		e = e || event;
		switch (e.type) {
		case "mouseover":
			
			break;
		case "mouseout":
			
			break;
		case "click":
			if ((str(e.target)[0] == "e") || (str(e.target)[0] == "m"))
				choise_actoin (str(e.target)[0],3,str(e.target)[1],str(e.target)[2]);
			break;
		}
}







