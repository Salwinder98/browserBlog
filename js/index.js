import "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.js";
import "https://cdnjs.cloudflare.com/ajax/libs/marked/1.1.1/marked.js";
import "https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js";
import aPages from "../pages/index.js";

class Page {
    render(){
        console.log("render called on page");
    }
}

class Section extends Page{
    constructor(oOptions){
        super();
        this.oOptions = oOptions;
    }
    render(){
        $.get(`/pages/${this.oOptions.fname}`, (sMarkdown)=>{
            $(`#${this.oOptions.title}`).html(
                marked(sMarkdown)
            )
    
        })
    }
}

class Article extends Page{
    render(){
        for(let n = 0; n < aPages.length; n++){
            $("article").append(
                `<section id="${aPages[n].title}"></section>`
            );
            new Section(aPages[n]).render();
        }
    }
}

const sName = "Richard Hildred";

class Footer extends Page{
    render(){
        const yToday = new Date().getFullYear();
        $("footer").html(
            `&copy; ${yToday} ${sName}`
        );
    }
}

class Nav extends Page{
    render(){
        let sMenu = "";
        for(let n = 0; n < aPages.length; n++){
            sMenu += `<li><a href="#${aPages[n].title}">${aPages[n].title}</a></li>`;
        }

        $("nav").html(`
        <header class="header" id="header">
<div class="menu">
<nav class="nav">
<ul class="nav_links">
<!---logo-->
<li><a href="#" class="nav_single-link nav_logo"><img style="width:60px; margin-left:50px; margin-top:50px" src="Image/coffeeicon.png"></a></li>
<li><a href="#header" class="nav_single-link">HOME</a></li>
<li><a href="about.html" class="nav_single-link">ABOUT</a></li>
<li><a href="freedrink.html" class="nav_single-link">FREE DRINK</a></li>
<li><a href="#work" class="nav_single-link">WORK</a></li>
<li><a href="contactUS.html" class="nav_single-link">CONTACT</a></li>
</ul>
</nav>
 </div>
</header>

        `);
    }
}

class Portfolio extends Page{
    constructor(){
        super();
        this.header = new Page();
        this.nav = new Nav();
        this.article = new Article();
        this.footer = new Footer();
    }
    render(){
        this.header.render();
        this.nav.render();
        this.article.render();
        this.footer.render();
    }
}

$(document).ready(()=>{
    new Portfolio().render();
});

