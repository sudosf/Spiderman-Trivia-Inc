import HomeComponent from "../components/main/Home.js";
import QuizComponent from "../components/main/quiz.js";
import NotFoundComponent from "../components/main/404.js";
import CallbackComponent from "../components/main/callback.js";
import LogoutComponent from "../components/main/logout.js";
import { appData } from "../common/appData.js";
import { Links, Scripts } from "../common/constants.js";

const routes = {
  '' : {component : HomeComponent,script : 'js/index.js'},
  'home' : {component : HomeComponent,script : 'js/index.js'},
  'quiz' : {component : QuizComponent,script : 'js/questions.js'},
  '404': {component : NotFoundComponent,script : 'js/index.js'},
  'callback': {component : CallbackComponent,script : 'js/callback.js'},
  'logout': {component : LogoutComponent,script : 'js/signout.js'},
};



document.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() === 'img' ||event.target.tagName.toLowerCase() === 'p') {
        event.preventDefault();
        const parentElement = event.target?.parentElement;
      if (parentElement.tagName.toLowerCase()==='a' && parentElement?.href) {

        const path = new URL(parentElement.href).pathname.slice(1);
        const subjectId = parentElement?.href?.split('#')[1]?.split('-')[0];
        const subjectName = parentElement?.href?.split('#')[1]?.split('-')[1];
        
        if (subjectId && subjectName) {
          appData.updateSubjectId(subjectId);
          appData.setSubjectName(subjectName);
        }
        
        navigate(path);
      }
    }else if(event.target.tagName.toLowerCase() === 'a'){
      event.preventDefault();
      if(event.target.href.includes('theme')){
        event.preventDefault();
        return;
      }
      const path = new URL(event.target.href).pathname.slice(1);
      navigate(path);
    }
  });


const navigate = async (path) => {

  if(path.includes('api/auth/github')){
    const content = await (typeof LogoutComponent === 'function' ? route() : fetch(path).then(data => data.text()));
    document.getElementById('main-page').innerHTML = content;
    window.location.replace(`${Links.serverBaseURL}/auth/github`);
  }

  const componentPath = routes[path.split('#')[0]]?.component;
  const route = componentPath || NotFoundComponent;
  const content = await (typeof route === 'function' ? route() : fetch(path).then(data => data.text()));

  const componentElement = document.getElementById('main-page');

  document.getElementById('main-page').innerHTML = content;
  addScripts(componentElement);
};


window.addEventListener('popstate', handlePopState);

function handlePopState(event) {
  const path = window.location.pathname.slice(1);
  navigate(path);
}

window.addEventListener('DOMContentLoaded', () => navigate(window.location.pathname.slice(1)));

window.onload = function(){

  navigate(window.location.pathname.slice(1))
}
window.addEventListener('hashchange', function(event) {
  console.log('loading...')
  navigate(window.location.pathname.slice(1))
});

function addScripts(componentElement){
  Scripts.forEach(src=>{
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.type ="module";
    componentElement.appendChild(script);
  })

}