let canvas = document.elementGetById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
// dando o tamanho da snake
snake[0] = {
	x: 8 * box ,
	y: 8 * box
}
let direction = 'right';
let food = {
	//floor retira a parte flutuante do random, ramdom sempre retorna um número a aletório até 1, até 16 que foi o que está escrito e o tamanho do box, para não ultrapassar o canvas
	x: Math.floor(Math.random() * 15 + 1) * box,
	y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
	context.fillStyle = "lightgreen";
	context.fillRect(0,0,16 * box,16 * box);
}

function criarCobrinha(){
	for(i=0; i < snake.length;i++){
		context.fillStyle = "green";
		context.fillRect(snake[i].x,snake[i].y,box,box);
	}
}

function drawFood(){
	context.fillStyle = "red";
	context.fillRect(food.x,food.y,box,box);
}

document.addEventListener('keydown',update);

function update(event){//37 direita,38,39,40 só muda se não for contrario,
	if(event.keyCode == 37 && direction != 'right') direction = "left";// && é para não deixar pessoa colocar sentido oposto ao digitado anteriormente
	if(event.keyCode == 38 && direction != 'down') direction = "up";
	if(event.keyCode == 39 && direction != 'left') direction = "right";
	if(event.keyCode == 40 && direction != 'up') direction = "down";

}

function iniciarJogo(){
	// lógica, plano cartesiano, 0 de x e 0 de y, quando chegar em 0 tanto no x quanto no y ele volta em 15 que é do outro lado, pois o quadrado é de 16 X 16
	//e modo contrario quando chegar no 16
	if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
	if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
	if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
	if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

	// ver se cada coordenada se choca com o i, o i é o corpo da cobrinha
	for(i = 1;i < snake.length;i++){
		if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
			clearInterval(jogo);
			alert('Gamer Over :(');
		}
	}

	criarBG();
	criarCobrinha();
	drawFood();

	// ponto de partida
	let snakeX = snake[0].x; 
	let snakeY = snake[0].y;

	if(direction == 'right') snakeX += box;
	if(direction == 'left') snakeX -= box;
	if(direction == 'top') snakeY -= box;
	if(direction == 'down') snakeY += box;

	para cobrinha comer o alimento
	if(snakeX != food.x || snakY != food.y){
		snake.pop();
	}else{
		food.x = Math.floor(Math.random() * 15 + 1) * box;
		food.x = Math.floor(Math.random() * 15 + 1) * box;
	}

	snake.pop();//retira o ultimo elemento do array
	
	//adiciona um elemento, acrescenta a frente
	let newHead = {
		x: snakeX,
		y: snakeY
	}
	snake.unshift(newHead);
}

//set interval, uma função de tempo
//acada 100 milisegundos ele atualiza o jogo para não travar
let jogo = setInterval(iniciarJogo, 100);