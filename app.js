const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

var j;

class Quiz
{
	constructor(type, questions, results)
	{
		this.type = type;
		this.questions = questions;
		this.results = results;
		this.score = 0;
		this.result = 0;
		this.current = 0;
	}

	Click(index)
	{
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

const results = 
[
	new Result("Попробуй еще раз", 0),
	new Result("Отлично, вот основной подарок: https://hbs37.github.io/HBStas/", 8),
];

const questions = 
[
	new Question("Как звали кота, который трагически погиб?", 
	[
		new Answer("Анатолий", 0),
		new Answer("Василий", 1),
		new Answer("Михаил", 0),
		new Answer("Лёня", 0)
	]),

	new Question("В каком году сын пошёл в первый класс?", 
	[
		new Answer("2009", 0),
		new Answer("2010", 0),
		new Answer("2011", 1),
		new Answer("2012", 0)
	]),

	new Question("Любимый бренд одежды?", 
	[
		new Answer("Gucci", 0),
		new Answer("G-Star", 1),
		new Answer("Lacoste", 0),
		new Answer("Ralph Lauren", 0)
	]),

	new Question("Название самого большого растения в доме?", 
	[
		new Answer("Филодендрон", 1),
		new Answer("Замиокулькас", 0),
		new Answer("Антуриум", 0),
		new Answer("Драцена", 0)
	]),

	new Question("Марка купленного внедорожника, который сломался?", 
	[
		new Answer("Mercedes", 0),
		new Answer("Jeep", 1),
		new Answer("Audi", 0),
		new Answer("Mini-cooper", 0)
	]),

	new Question("Что можешь есть всегда и в любом виде?", 
	[
		new Answer("Макароны", 0),
		new Answer("Котлеты", 0),
		new Answer("Картошку", 1),
		new Answer("Бургеры", 0)
	]),
   new Question("Каким видом спорта занимался?", 
	[
		new Answer("Ай-кидо", 0),
		new Answer("Бадминтон", 1),
		new Answer("Бокс", 0),
		new Answer("Футбол", 0)
	]),
   new Question("Любимый алкогольный напиток?", 
	[
		new Answer("Пиво", 0),
		new Answer("Вино", 1),
		new Answer("Коньяк", 0),
		new Answer("Шампанское", 0)
	]),
   new Question(" Место работы перед Кровать.ru?", 
	[
		new Answer("Топ-сантехника", 1),
		new Answer("Фрилансер", 0),
		new Answer("Веб-разработка", 0),
		new Answer("Сварщик", 0)
	]),
   new Question("В каком универе учился?", 
	[
		new Answer("РИТ", 0),
		new Answer("НИУ", 0),
		new Answer("РУТ", 0),
		new Answer("МИИТ", 1)
	])
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	if(quiz.current < quiz.questions.length) 
	{
		headElem.innerHTML = quiz.questions[quiz.current].text;
		buttonsElem.innerHTML = "";
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		Init();
	}
	else
	{
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init()
{
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	let correct = quiz.Click(index);

	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		btns[index].className = "button button_correct";
	}
	setTimeout(Update, 1000);
}
