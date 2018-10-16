import { Component, OnInit, ContentChild, ViewChild } from '@angular/core';
import { DjikstraService } from './djikstra.service';
import { Router } from '@angular/router';
import { Trie } from './classes/trie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'client';
  searchInput: any;
  searchContent: string;
  sffxOptions: string[] = [];
  whichHover: string;
  whichClick: string = null;
  showSearchOutcome: boolean = false;
  showSearchOptions: boolean = false;
  contentHeight: string = '86%';
  upperShadow: string = '0px 4px 8px #000000';
  lowerShadow: string = '0px -4px 8px #000000';
  myTrie: Trie;
  Hover: any = {
    'about': 5,
    'eCommerce': 5,
    'uGame': 5,
    'draftChat': 5
  }
  constructor(
    private _djikstraService: DjikstraService,
    private _router: Router
    ){}

  ngOnInit(){
    let isMobile = this.detectmob();
    if(isMobile == true){
      this.contentHeight = '100%'
      this._router.navigate(['/mobile']);
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
    while(this.Hover[this.whichHover] > -40){
      this.Hover[this.whichHover] -=5;
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
    this.Hover[this.whichHover] = 5;
    this.whichHover = 'none';
    this._djikstraService.hoverLink.next('none');
  }
  detectmob() {
    if(window.innerWidth <= 992 && window.innerHeight <= 700) {
      return true;
    } else {
      return false;
    }
  }
  autoComplete(event){
    if(event.keyCode == 13 || this.searchInput.content == "" || this.searchInput.content == null){
      this.showSearchOptions = false;
      return;
    }
    let mySuffixes = this.myTrie.autoComplete(this.searchInput.content);
    this.sffxOptions = [];
    this.showSearchOutcome = false;
    let len = mySuffixes.length;
    let counter = 0;
    for(let i = 0; i<len; i++){
      if(counter<3){
        this.sffxOptions.push(this.searchInput.content + mySuffixes[i]);
      } else {
        break;
      }
      counter ++;
    }
    this.showSearchOptions = true;
  }
  contentClick(event){
    console.log("Here is the event: ", event);
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
      ["email", "<a href='mailto:rwaugh52@gmail.com'>rwaugh52@gmail.com</a>"], ["telephone", "<a href='tel:206-880-8954'>(206) 880-8954</a>"],
      ["linkedIn", "<a href='https://www.linkedin.com/in/rileywaugh/' target='_blank'>www.Linkedin.com/in/rileywaugh</a>"], ["phone number", "<a href='tel:206-880-8954'>(206) 880-8954</a>"],
      ["gitHub", "<a href='https://github.com/GIimmer' target='_blank'>github.com/GIimmer</a>"],  ["cellphone", "<a href='tel:206-880-8954'>(206) 880-8954</a>"],
      ["blog", "<a href='https://rileyturnspaige.wordpress.com/' target='_blank'>rileyturnspaige.wordpress.com</a>"], ['preferred memes', "<h4>Birb memes</h4>"],
      ["favorite cat", "<h4>Bagheera</h4><p>(A Maine Coon)</p>"], ["previous job", "<p>English Teacher for 6th, 8th, and 10th grade in Doan Thi Diem Vietnam!</p>"],
      ["favorite dessert", "<p>Brownies with chocolate chunks, or chocolate pb ice cream =P </p>"], ["best female", "<h4>Dani-Mac!</h4>"], ['unsurprising fact', '<p>I love the JRE</p>'],
      ["best project", "<h4>Draft-Chat</h4>"], ["most frequented website", "<h4>Reddit!</h4>"], ["most elevation gained on hike", "<h4>Mount Pugh</h4>"],
      ["favorite lift", "<h4>Deadlift!</h4>"], ["interesting thought", "<p>Somewhere out there; there are wild hamsters.</p>"], ['who are you?', "<h4>Riley</h4><p>pretty sure</p>"],
      ["interesting fact", "<p>Have you ever looked out from Rattlesnake Ledge? The Burj Khalifa is like that, but the top is six hundred feet higher. Plus 50. Oh and the bottom is just shy of a THOUSAND feet lower! 50. =O </p>"],
      ["worst sport (at)", "<h4>basketball</h4>"], ["best sport (at)", "<h4>tennis!</h4>"], ["greatest accomplishment", "<p>My successful return and 3.66 graduation following a miserable first semester in college</p>"], 
      ["favorite pop song", "<h4>Call Me Maybe</h4>"], ["favorite song", "<h4>Ghost Beach - Miracle (Trails and Ways cover)</h4>"], ["song that makes me happy-sad", "<h4>Porter Robinson & Madeon - Shelter</h4>"],
      ["greatest work accomplishment", "<p>Creating and deploying the Renew Physical Therapy website (which, two years later, has been changed).</p>"], ["hometown", "<h4>Edmonds</h4><p>(not so far huh?)</p>"],
      ["most cringy moment", "<p>That time with the pen and the nice older ladies. Urkh.</p>"], ["preferred method of contact", "<a href='mailto:rwaugh52@gmail.com'><h4>Gmail</h4></a>"],
      ["dislikes", "<p>Things touching my neck lightly, being cut off (without cause), Closed mindedness.</p>"], ['best photograph', "<img src='../assets/images/carKeek.jpg' class='w-75 shadow-lg'>"],
      ['likes', "<p>Almost everything including</p><ul class='list-unstyled'><li>&#149; People, esp. who are excited about something niche.</li><li>&#149; Learning</li><li>&#149; Programming!</li><li>&#149; The internet!</li>"],
      ['least original personal thought', "<p>'Boy do I love North Face and Pumpkin Spice Lattes'</p>"], ['which coding bootcamp?', '<h4>Coding dojo</h4>'],
      ['favorite thing about programming', '<p>A combination of the satisfaction of progressing through a difficult puzzle, and that of seeing something you built come to life</p>'],
      ['hobbies', '<p>My hobbies include hiking, programming (naturally), weightlifting, cafes, and when I have a job, things like tennis and eating!</p>'],
      ["what is this star-line thing?", "<p>That's actually memoized depth first search - each star is connected to all others, distance is weighted by d^2. Memoized for performance!</p>"],
      ['did I use a template?', "<h4>No</h4><p>Though I did use a plugin for the single page slow-scroll</p>"], ['preferred interview time', "<p>Midmornings, though I'm highly available as you might expect!</p>"],
      ["did I copy these algorithms from somewhere?", "<p>No, other than learning about what they were supposed to do; the Trie, DFS, and everything else was from my head</p>"],
      ['what did you study in college?', "<p>Poli-Sci Pre-Law</p>"],['where did you go to high school?', "<h4>Edmonds Woodway</h4>"],['joke', "<p>What do you call an anxious dinosaur?</p><h5>A Nervous Rex =D</h5>"],
      ['mom?', "<h4>Eileen!</h4>"], ['dad?', "<h4>Stephen!</h4>"], ['sisters?', "<h4>Allison and Maitlin!</h4>"], ['brothers?', "<h4>nah =/</h4>"], ['which stacks do you know?', "MEAN, python on Django, and C# on ASP.NET"],
      ['Which programming languages do you know?', "C#, Python, Java- and Typescript"], ['riley', "<p>Is my name!</p>"], ["what should I type?", "<p>You can find out about my contact information 'linkedin' 'email', hobbies, favorites, known languages...things like that"],
      ["availability", "<p>Every day, best around late morning and later afternoon</p>"], ["stars", "<p>Like on the homepage? That's actually memoized depth first search - each star is connected to all others, distance is weighted by d^2. Memoized for performance!</p>"],
      ['hello', "<h4>It's me..</h4>"]
    ]
    for(let option of optionList){
      this.myTrie.add(option[0], option[1]);
    }
  }
}