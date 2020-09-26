import "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.js";
import "https://cdnjs.cloudflare.com/ajax/libs/marked/1.1.1/marked.js";
import "https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js";
import aPages from "../pages/index.js";

class Page {
    constructor(){
        this.sName = "Richard Hildred";
        const sBase = document.location.pathname;
        if(sBase[sBase.length - 1] == "/"){
            this.sBase = sBase.substr(0, sBase.length -1);
        }else{
            const sFile = '/' + document.location.pathname.split('/').pop();
            this.sBase = sBase.substr(0, sBase.length - sFile.length); 
        }
    }
    getImageSrc(sImage){
        if(sImage.match(/\:\/\//)){
            return sImage;
        }else{
            return this.sBase + sImage;
        }
    }
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

const sName = "Salwinder Kaur";

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
        
        
        <div id="content">
	<h3>About Chris Spooner</h3>
	
	<p>I earn a living by creating custom brands and logo designs from scratch, as well as designing and building high quality websites and blogs, but I also enjoy producing the odd t-shirt graphic, illustration or character design. I pride myself in having the nerdy skills to build top notch creations online, as well as being knowledgeable in the print side of design.</p>
	
	<h3>My latest work</h3>
	
	<p>I’m forever creating design work for both myself as personal projects and as a hired gun for clients from around the world. Here’s a few of my most recent works.</p>
	
	<div class="portfolio-item">
		<a href="#"><img src="Images/Port1.png" alt="View more info" /></a>
		<p class="btn"><a href="#">See more</a></p>
	</div>
	
	<div class="portfolio-item">
		<a href="#"><img src="images/portfolio-2.jpg" alt="View more info" /></a>
		<p class="btn"><a href="#">See more</a></p>
	</div>
	
	<div class="portfolio-item">
		<a href="#"><img src="images/portfolio-3.jpg" alt="View more info" /></a>
		<p class="btn"><a href="#">See more</a></p>
	</div>
	
	<div class="portfolio-item">
		<a href="#"><img src="images/portfolio-4.jpg" alt="View more info" /></a>
		<p class="btn"><a href="#">See more</a></p>
	</div>
	
</div>

<div class="container">
  <form action="action_page.php">

    <label for="fname">First Name</label>
    <input type="text" id="fname" name="firstname" placeholder="Your name..">

    <label for="lname">Last Name</label>
    <input type="text" id="lname" name="lastname" placeholder="Your last name..">

    <label for="country">Country</label>
    <select id="country" name="country">
      <option value="australia">Australia</option>
      <option value="canada">Canada</option>
      <option value="usa">USA</option>
    </select>

    <label for="subject">Subject</label>
    <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px"></textarea>

    <input type="submit" value="Submit">

  </form>
</div>

<div id="footer">
	<p id="copyright">&copy; Chris Spooner / SpoonGraphics (Please don’t steal my work)</p>
	<p id="back-top"><a href="#">Going up?</a></p>
</div>
        

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

