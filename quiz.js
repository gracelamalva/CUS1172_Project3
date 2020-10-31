const appState = {
    current_view: 'intro',
    current_correct: 0,
    current_wrong: 0,
    current_question: 0,
    current_quiz : 0
}

document.addEventListener('DOMContentLoaded', () => {

    document.querySelector("#name_form").onsubmit = (e) => {
        e.preventDefault();
        handle_form(e);
    }
  //create_question_view()

  document.querySelector("#app_widget").onclick = (e) => {
      handle_vote(e)
  }
});


const handle_form = (e) => {
    
    let data = new FormData(e.target);

    let name = data.get("name");
    let quiz = data.get("quiz");
    
    
    console.log(name, quiz);

    alert('hello ' + name + " you chose " + quiz);


    if (quiz === "quiz_1"){
        create_question_view()
    }
    else if (quiz === "quiz_2"){
        create_question_view()
    }

}
const handle_vote = (e) => {
    console.log(e.target)
    let id = document.querySelector("#question-id").innerHTML;
    id = Number(id.split('')[1]);
    
  

    let correct_ans = questions[id].answer;
    

    // let user_answers = []
    
    if (e.target.dataset.vote == "true" && correct_ans == "true"){
        appState.current_correct +=1;
        create_question_view()

    } else if (e.target.dataset.vote == "false" && correct_ans == "false"){
        
        appState.current_wrong +=1
        create_question_view()
    }

    if (appState.current_correct==10){
        alert("10 correct, Restart")
        appState.current_correct = 0;
        appState.current_wrong = 0;
        finish_quiz();
    }
    
}


const create_question_view = async () => {

    const data = await fetch ("https:/my-json-server.typicode.com/gracelamalva/CUS1172_Project3/questions/")
    const model = await data.json()

    for (let i = 0; i<model.length; i++){
        document.querySelector("#app_widget").innerHTML += render_widget(model[i], "#question_card");
    }

    //show one 
    //handle_vote
    //create_question_view
    // final question submit 
    //show results



    //const html_element = render_widget(model, '#question_view')
    //document.querySelector("#app_widget").innerHTML = html_element;
}

const finish_quiz = () => {
    create_question_scorecard_view();
}
const create_question_scorecard_view = () => {

    render_widget('#question-counter');
    //document.querySelector("#app_widget").innerHTML = html_element;
}
function handle_app_widget_event(e){
    console.log("button pressed");
    console.log(e.target, e.target.id);
    if (e.target.id == "button_next"){
        update_view("#view_two");
    } else if (e.target.id == "button_previous"){
        update_view("view_one")
    }
}

/*
function create_user_view (){
    if (appState.current_view == 'intro') {
        appState.current_view = "question_view";
       render_widget(model,'#question_view');
       } 
       if ((appState.current_view =='question_view') && (appState.current_question == last_question_index )) {
       appState.current_view = "results_view";
       render_widget(model,'#results_view');
       
       }
}

*/
function update_view (current_view){
    const html_element = render_widget({}, current_view)
    document.querySelector("#widget_view").innerHTML = html_element;
}


const render_widget = (model, view) => {
    template_source = document.querySelector(view).innerHTML;
   // console.log(template_source);
    let template = Handlebars.compile(template_source);
   // var html_widget_element = template({...model,...appState})

    //var html_widget_element = template(model)
    //return html_widget_element; 
    return template(model);
}

