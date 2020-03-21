class Canvas{
	constructor(){
		this.canvas = document.querySelector('.canvas');
		this.ctx = this.canvas.getContext("2d");
		this.color = document.querySelector('.color');
		this.line = document.querySelector('.line');
		this.delete = document.querySelector('.delete');
		this.clear = document.querySelector('.clear');
		this.displayWidth = this.canvas.clientWidth;
		this.displayHeight = this.canvas.clientHeight;

		this.paint = false;
		
		this.resize();
		this.canvas.addEventListener('mousedown', (e) => {this.initDraw(e)});
		this.canvas.addEventListener('mousemove', (e) => {this.drawing(e)});
		this.canvas.addEventListener('mouseup', (e) => {this.paint = false;});
		this.delete.addEventListener('click', (e) => {this.deleteDraw(e)});
		this.clear.addEventListener('click', (e)=> {this.color.value = '#ffffff'})
	}

	initDraw(e){
		this.ctx.beginPath();
		  this.ctx.moveTo(this.getMousePosition (e).x, this.getMousePosition (e).y);
		  this.paint = true;
	}

	drawing(e){
		if (this.paint) {
			this.ctx.lineJoin = 'round';
			this.ctx.strokeStyle = this.color.value;
			this.ctx.lineWidth = this.line.value;
			this.ctx.lineTo(this.getMousePosition (e).x, this.getMousePosition (e).y);
			   this.ctx.stroke();
		}else{
			console.log('не рисую')
		}
	}
	deleteDraw(e){
		if (this.canvas !== '') {
			setTimeout(()=>{
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.color.value = '#000000';},
				1000);
				//this.canvas.style.transform = 'translateX(800px)'
			this.canvas.classList.add('rotate');
			setTimeout(()=>{
				//this.canvas.style.transform = 'translateX(0)';
				this.canvas.classList.remove('rotate');
			}, 
				1000)
		}	
	}

	resize() {
		if (this.canvas.width != this.displayWidth ||
			this.canvas.height != this.displayHeight) {
			// подгоняем размер буфера отрисовки под размер HTML-элемента
			this.canvas.width = this.displayWidth;
			this.canvas.height = this.displayHeight;
			}
	}

	getMousePosition (e) {
		let rect = this.canvas.getBoundingClientRect();
		return {
			x: (e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width,
			y: (e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height
		};
	}
}

let canvas = new Canvas();
//canvas.resize()