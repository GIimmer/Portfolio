import { Component, OnInit, ContentChild, ViewChild } from '@angular/core';
import { DjikstraService } from './djikstra.service';
import { Router } from '@angular/router';
import { Trie } from './classes/trie';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'client';
  searchInput: any;
  searchContent: string;
  selectedSffx: number;
  sffxOptions: string[][] = [];
  whichHover: string;
  whichClick: string = null;
  showSearchOutcome: boolean = false;
  showSearchOptions: boolean = false;
  contentHeight: string = '86%';
  upperShadow: string = '0px 4px 8px #000000';
  lowerShadow: string = '0px -4px 8px #000000';
  myTrie: Trie;
  Hover: any = {
    'about':5,
    'userDash':5,
    'uGame':5,
    'draftChat':5
  }
  constructor(
    private _djikstraService: DjikstraService,
    private _router: Router
    ){}

  ngOnInit(){
    let isMobile = this.detectmob();
    if(isMobile == true){
      this.contentHeight = '100%';
      this._router.navigate(['/mobile']);
    } else {
      $(".infoTag").delay(2600).fadeOut().fadeIn();
    }
    this.searchInput = { content: "" };
    this.setUpTrie();
    this._djikstraService.upperShadow.subscribe((value)=> {
      this.upperShadow = value;
    });
    this._djikstraService.lowerShadow.subscribe((value)=> {
      this.lowerShadow = value;
    });
  }
  
  public hover(link: string){
    this.whichHover = link;
    this.animateTag();
    this._djikstraService.hoverLink.next(link);
  }
  animateTag(){
    while(this.Hover[this.whichHover] > -55){
      this.Hover[this.whichHover] -=1;
    }
    return;
  }

  public click(link: string){
    this.showSearchOptions = false;
    this.showSearchOutcome = false;
    if(this.whichClick == null){
      this.whichClick = link;
      this._djikstraService.clickLink.next(link);
    } else {
      this._router.navigate(['/' + link]);
    }
  }

  public unHover(){
    if(this.whichHover == 'about' || this.whichHover == 'userDash'){
      this.Hover[this.whichHover] =5;
    } else {
      this.Hover[this.whichHover] =5;
    }
    this.whichHover = 'none';
    this._djikstraService.hoverLink.next('none');
  }
  detectmob() {
    if(window.innerWidth <= 1225 || window.innerHeight <= 650) {
      return true;
    } else {
      return false;
    }
  }
  handleKeyUp(event){
    if((event.keyCode >= 37) && (event.keyCode <= 40)){
      this.handleArrow(event);
    } else {
      this.autoComplete(event)
    }
  }
  autoComplete(event){
    if(event.keyCode == 13 || this.searchInput.content == "" || this.searchInput.content == null){
      if(event.keyCode == 13){
        if(this.selectedSffx != undefined){
          this.checkResult(this.sffxOptions[this.selectedSffx][0]);
        } else {
          this.checkMyResult();
        }
      }
      this.selectedSffx = null;
      this.showSearchOptions = false;
      return;
    }
    let mySuffixes = this.myTrie.autoComplete(this.searchInput.content);
    this.sffxOptions = [];
    this.showSearchOutcome = false;
    let len = mySuffixes.length;
    let counter = 0;
    for(let i = 0; i<len; i++){
      if(counter<4){
        this.sffxOptions.push([this.searchInput.content + mySuffixes[i], '#e9e9e9']);
      } else {
        break;
      }
      counter ++;
    }
    this.showSearchOptions = true;
  }
  handleArrow(event){
    if(event.keyCode == 40){
      if(this.selectedSffx == undefined || this.selectedSffx == this.sffxOptions.length-1){
        this.sffxOptions[this.sffxOptions.length-1][1] = "#e9e9e9";
        this.selectedSffx = 0;
        this.sffxOptions[0][1] = "#cee2ff";
      } else {
        this.sffxOptions[this.selectedSffx][1] = "#e5e5e5";
        this.selectedSffx ++;
        this.sffxOptions[this.selectedSffx][1] = "#cee2ff";
      }
    } else if(event.keyCode == 38) {
      if(this.selectedSffx == undefined || this.selectedSffx == 0){
        this.sffxOptions[0][1] = "#e5e5e5";
        this.selectedSffx = this.sffxOptions.length-1;
        this.sffxOptions[this.selectedSffx][1] = "#cee2ff";
      } else {
        this.sffxOptions[this.selectedSffx][1] = "#e5e5e5";
        this.selectedSffx --;
        this.sffxOptions[this.selectedSffx][1] = "#cee2ff";
      }
    }
  }

  contentClick(event){
    this.showSearchOptions = false;
    this.showSearchOutcome = false;
  }
  resetDjikstra(){
    this.upperShadow = '0px 4px 6px #000000';
    this.lowerShadow = '0px -4px 6px #000000';
    this.whichClick = null;
  }
  checkMyResult(){
    this.showSearchOptions = false;
    let input = this.searchInput.content;
    let myResult = this.myTrie.contains(input);
    this.showSearchOutcome = true;
    this.searchContent = myResult;
  }
  checkResult(input: string){
    this.showSearchOptions = false;
    let myResult = this.myTrie.contains(input);
    this.showSearchOutcome = true;
    this.searchContent = myResult;
  }
  setUpTrie(){
    this.myTrie = new Trie;
    let optionList = [
      ["email", "<a href='mailto:rwaugh52@gmail.com'>rwaugh52@gmail.com</a>"], ["telephone", "<a href='tel:206-880-8954'>(206) 880-8954</a>"], ['resume', "<a href='../assets/RileyDeveloper.pdf' target='_blank'>My resume (PDF)</a>"],
      ['favorite thing about programming', "<p>A combination of the satisfaction of progressing through a difficult puzzle, and that of seeing something you've built come to life</p>"],
      ["linkedIn", "<a href='https://www.linkedin.com/in/rileywaugh/' target='_blank'>www.Linkedin.com/in/rileywaugh</a>"], ["phone number", "<a href='tel:206-880-8954'>(206) 880-8954</a>"],
      ["gitHub", "<a href='https://github.com/GIimmer' target='_blank'>github.com/GIimmer</a>"],  ["cellphone", "<a href='tel:206-880-8954'>(206) 880-8954</a>"],
      ["blog", "<a href='https://rileyturnspaige.wordpress.com/' target='_blank'>rileyturnspaige.wordpress.com</a>"], ['preferred memes', "<h4>Birb memes</h4>"],
      ["favorite cat", "<h4>Bagheera</h4><p>(A Maine Coon)</p>"], ["previous job", "<p>English Teacher for 6th, 8th, and 10th grade in Doan Thi Diem Vietnam!</p>"],
      ["favorite dessert", "<p>Brownies with chocolate chunks, or chocolate pb ice cream =P </p>"], ["best female", "<h4>Dani-Mac!</h4>"], ['unsurprising fact', '<p>I love the JRE</p>'],
      ["best project", "<h4>Draft-Chat</h4>"], ["most frequented website", "<h4>Reddit!</h4>"], ["most elevation gained on hike", "<h4>Mount Pugh</h4><p>(5200 feet, not...not that amazing. Will improve!)"],
      ["favorite lift", "<h4>Deadlift!</h4>"], ["interesting thought", "<p>Somewhere out there; there are wild hamsters.</p>"], ['who are you?', "<h4>Riley</h4><p>pretty sure</p>"],
      ["interesting fact", "<p>Have you ever looked out from Rattlesnake Ledge? The Burj Khalifa is like that, but the top is six hundred feet higher. Plus 50. Oh and the bottom is just shy of a THOUSAND feet lower! =O </p>"],
      ["worst sport (at)", "<h4>basketball</h4>"], ["best sport (at)", "<h4>tennis!</h4>"], ["greatest accomplishment", "<p>My successful return and 3.66 graduation following a miserable first semester in college</p>"], 
      ["favorite pop song", "<h4>Call Me Maybe</h4>"], ["favorite song", "<h4>Ghost Beach - Miracle (Trails and Ways cover)</h4>"], ["song that makes me happy-sad", "<h4>Porter Robinson & Madeon - Shelter</h4>"],
      ["greatest work accomplishment", "<p>Creating and deploying the Renew Physical Therapy website (which, two years later, has been changed).</p>"], ["hometown", "<h4>Edmonds</h4><p>(not so far huh?)</p>"],
      ["most cringy moment", "<p>That time with the pen and the nice older ladies. Urkh.</p>"], ["preferred method of contact", "<a href='mailto:rwaugh52@gmail.com'><h4>Gmail</h4></a>"],
      ["dislikes", "<p>Things touching my neck lightly, being cut off (without cause), Closed mindedness.</p>"], ['best photograph', "<img src='../assets/images/carkeek.jpg' class='w-75 shadow-lg'>"],
      ['likes', "<p>Almost everything including</p><ul class='list-unstyled'><li>&#149; People, esp. who are excited about something niche.</li><li>&#149; Learning</li><li>&#149; Programming!</li><li>&#149; The internet!</li>"],
      ['least original personal thought', "<p>'Boy do I love North Face and Pumpkin Spice Lattes'</p>"], ['which coding bootcamp?', '<h4>Coding dojo</h4>'], ['languages', "<p>I know C#, Python, Java- and TypeScript, and of course HTML, CSS, blah blah blah"],
      ['hobbies', '<p>My hobbies include hiking, programming (naturally), weightlifting, cafes, and when I have a job, things like VR and not eating frozen dinners!</p>'],
      ["what is this star-line thing?", "<p>That's actually memoized depth first search - each star is connected to all others, distance is weighted by d^2. Memoized for performance!</p>"],
      ['did I use a template?', "<h4>No</h4><p>Though I did use a plugin for the single page slow-scroll</p>"], ['preferred interview time', "<p>Midmornings, though I'm highly available as you might expect!</p>"],
      ["did I copy these algorithms from somewhere?", "<p>No, other than learning about what they were supposed to do; the Trie, DFS, and everything else were from my head</p>"],
      ['what did you study in college?', "<p>Poli-Sci Pre-Law</p>"],['where did you go to high school?', "<h4>Edmonds Woodway</h4>"],['joke', "<p>What do you call an anxious dinosaur?</p><h5>A Nervous Rex =D</h5>"],
      ['mom?', "<h4>Eileen!</h4>"], ['dad?', "<h4>Stephen!</h4>"], ['sisters?', "<h4>Allison and Maitlin!</h4>"], ['brothers?', "<h4>nah =/</h4>"], ['which stacks do you know?', "MEAN, python on Django, and C# on ASP.NET"],
      ['which programming languages do you know?', "C#, Python, Java- and Typescript"], ['riley', "<p>Is my name!</p>"], ["what should I type?", "<p>You can find out about my contact information 'linkedin' 'email', hobbies, favorites, known languages...things like that"],
      ["availability", "<p>Every day, best around late morning and later afternoon</p>"], ["stars", "<p>Like on the homepage? That's actually memoized depth first search - each star is connected to all others, distance between is weighted by d^2. Memoized for performance!</p>"],
      ['hello', "<h4>It's me..</h4>"], ['experience', "<p>I have been contracted to, and completed a complex PT website, am currently helping part-time with a startup (C#/MySQL/Angular) and have been an English Teacher in Vietnam!"],
      ['contact', "<p>I am best contacted via email, then phone: <br><span class='font-weight-bold'>Email - </span><a href='mailto:rwaugh52@gmail.com'>rwaugh52@gmail.com</a><br><span class='font-weight-bold'>Phone - </span><a href='tel:206-880-8954'>(206) 880-8954</a>"],
      ['trie', "<p>The 'Trie' data structure stores data for re<span class='font-weight-bold'>trie</span>val by travelling across shared prefixes before branching. This connection between inputs allows recursive autocompletion from the current node."],
      ['help', "<p>If you're not sure what to type I recommend things like 'favorite', 'contact', 'blog', 'joke' etc. <br>But if you need help from a dev with that new dev smell...let's talk!"], 
      ['python', "<p>A language which I am extremely familiar with; perhaps more so than any other. Loosely-typed, and great for data science. Pairs nicely with Django!"], ['javascript', "<p>Another language I'm very familiar with, as are most Coding Dojo graduates. Loosely-typed, language of the web!"],
      ['typescript', "<p>A language which deserves my respect (as it is the language of this site). Strictly-typed for better workflow!</p>"], ['c#', "<p>The strictly-typed language of well...Microsoft...but also many a Seattle company! Like learning to drive manual. Invites less ambiguity."],
      ['education', "<p><span class='font-weight-bold'>Coding Dojo</span><br> 14 Week Web Dev program - Triple 'Black belt'<br><br><span class='font-weight-bold'>Washington State University</span><br> Political Science - 3.66 GPA</p>"],
      ['secret', "<p>Click and drag amongst the stars..</p>"],
    ]
    for(let option of optionList){
      this.myTrie.add(option[0], option[1]);
    }
  }
}