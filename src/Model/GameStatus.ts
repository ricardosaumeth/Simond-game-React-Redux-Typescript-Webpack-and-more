/**
 * npm install --save-dev web-audio-api
 * npm install --save-dev @types/webaudioapi
 */

class GameStatus{
    //varible to populate the view
    //Used for Redux
    //Maybe delete them!!
    public isGameOn:boolean;
    //
    private lastPush:any;
    private sequence:number[];
    private tStepInd:number;
    private index:number;
    private count:number;
    private lock:boolean;
    private toHndlFl:any;
    private flHndl:any;
    private seqHndl:any;
    private toHndl:any;
    private toHndlSt:any;
    private currPush:any;
    private currOsc:any;
    private strict:boolean;
    private timeStep:any;
    private errNode:any;

    //Variables used to control the audio
    private audioCtx : any;
    private frequencies: number[];
    private ramp:number;
    private vol:number;
    private gainNodes:any;

    public constructor(){
       this.audioCtx = new window.AudioContext();
       this.isGameOn = false;
       this.strict = false;
       this.frequencies = [329.63,261.63,220,164.81];
       this.ramp = 0.05;
       this.vol = 0.5;

       var errOsc = this.audioCtx.createOscillator();
        errOsc.type = 'triangle';
        errOsc.frequency.value = 110;
        errOsc.start(0.0); //delay optional parameter is mandatory on Safari
        this.errNode = this.audioCtx.createGain();
        errOsc.connect(this.errNode);
        this.errNode.gain.value = 0;
        this.errNode.connect(this.audioCtx.destination);
       
       // create Oscillators
        var oscillators = this.frequencies.map((frq:any)=>{
            var osc = this.audioCtx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = frq;
            osc.start(0.0); //delay optional parameter is mandatory on Safari
            return osc;
        });
       
       this.gainNodes = oscillators.map((osc:any)=>{
           var g = this.audioCtx.createGain();
           osc.connect(g);
           g.connect(this.audioCtx.destination);
           g.gain.value = 0;
           return g;
        });

    }//end constructor

    public init = function() { 
        this.lastPush = document.getElementById('0');
        this.sequence = [];
        this.tStepInd = 0;
        this.index = 0;
        this.count = 0;
        this.lock = false; 
    };

    public resetTimers (){
        clearInterval(this.seqHndl);
        clearInterval(this.flHndl);
        clearTimeout(this.toHndl);
        clearTimeout(this.toHndlFl);
        clearTimeout(this.toHndlSt);
    }   

    public playGoodTone(num:number, self?:any){
      this.gainNodes[num].gain.linearRampToValueAtTime(
        this.vol, this.audioCtx.currentTime + this.ramp
        );
      this.currPush = document.getElementById(num.toString());
      this.currPush.classList.add('light');      
    };
    
    public stopGoodTones (){
        if(this.currPush)
            this.currPush.classList.remove('light'); 
        this.gainNodes.forEach((g:any) =>{
            g.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + this.ramp);
        });
        this.currPush = undefined;
        this.currOsc = undefined;
    }

    public stopErrTone (){
        this.errNode.gain.linearRampToValueAtTime(
            0, 
            this.audioCtx.currentTime 
            + this.ramp
        );
    }

    public flashMessage (msg:string, times:number){

        let counterDiv = document.getElementsByClassName('count')[0];
        counterDiv.innerHTML = msg;
        
        let self = this;

        const lf = function(){
            counterDiv.classList.add("led-off");
            self.toHndlFl = setTimeout(function(){
                counterDiv.classList.remove("led-off");
            },250);
        };
        let cnt = 0;
        lf();
       
        self.flHndl = setInterval(function(){
            lf();
            cnt++;
            if(cnt === times)
            clearInterval(self.flHndl);
        },500);   
    }
   
    public addStep(){
        this.timeStep = this.setTimeStep(this.count++);
        this.sequence.push(Math.floor(Math.random()*4));
        this.toHndl=setTimeout(this.playSequence(this),500);
    }

    public reset = function(){
        this.init();
        this.strict = false;
    }

    public startGame(){
        this.resetTimers();
        this.stopGoodTones();
        this.stopErrTone();
        this.flashMessage('--',1);
        this.init();
        this.addStep();
    }

    public setTimeStep(num:number){
      var tSteps = [1250 , 1000 , 750, 500 ];
      if (num < 4)
        return tSteps[0];
      if (num < 8)
        return tSteps[1];
      if (num < 12)
        return tSteps[2];
      return tSteps[3];
    }

    public playSequence(self?:any){
        if(this.isGameOn){
            var i = 0;
            this.index = 0;
            // repeat indefinitely if the user do not click the sequence of the panels showns  
            this.seqHndl = setInterval(()=>{
                this.displayCount();
                this.lock = true;
                this.playGoodTone(this.sequence[i], this);
                this.toHndl = setTimeout(this.stopGoodTones.bind(this),this.timeStep/2 - 10);
                i++;
                if(i === this.sequence.length){
                    clearInterval(this.seqHndl);
                    this.makePanelsClickable();
                    this.lock = false;
                    this.toHndl = setTimeout(this.notifyError.bind(this),5*this.timeStep);
                }
            },this.timeStep);
        }else{
            this.resetTimers();
            this.flashMessage("--", 1);
        }
    };

    public makePanelsClickable(){
        let counterDiv = document.getElementsByClassName('push');
        for(var i = 0; i < counterDiv.length; i++){
            counterDiv[i].classList.remove('unclickable');
            counterDiv[i].classList.add('clickable');
        }
    }

    public makePanelsUnClickable(){
        let counterDiv = document.getElementsByClassName('push');
        for(var i = 0; i < counterDiv.length; i++){
            counterDiv[i].classList.remove('clickable');
            counterDiv[i].classList.add('unclickable');
        }
    }
    
    public notifyError(pushObj?:string){
        this.lock = true;

        this.makePanelsUnClickable();
        this.playErrTone();
        if(pushObj){
            let addLightClass = document.getElementById(pushObj);
            addLightClass.classList.add('light');
        }
            
        this.toHndl = setTimeout(()=>{
            this.stopErrTone();
            if(pushObj){
                let removeLightClass = document.getElementById(pushObj);
                removeLightClass.classList.remove('light');
            }
            
            this.toHndlSt = setTimeout(()=>{
            if(this.strict)
                this.startGame();
            else
                this.playSequence();
            },1000);
        },1000);
        this.flashMessage('!!',2);
    };

    public playErrTone(){
      this.errNode.gain.linearRampToValueAtTime(this.vol, this.audioCtx.currentTime + this.ramp);
    };

    public displayCount(){
      var p = (this.count < 10) ? '0' : '';
      let counterDiv = document.getElementsByClassName('count')[0];
      counterDiv.innerHTML = p + this.count;
    }

    public pushColor(pushObj:string){
      if(!this.lock) {
        clearTimeout(this.toHndl);
        var pushNr = parseInt(pushObj);
        if( pushNr == this.sequence[this.index]
            && this.index < this.sequence.length){

          this.playGoodTone(pushNr);
          this.lastPush = document.getElementById(pushObj);
          this.index++;
          if(this.index < this.sequence.length){
            this.toHndl = setTimeout(this.notifyError.bind(this),5*this.timeStep);
          }else if (this.index == 20){
            this.makePanelsUnClickable();
            this.toHndl = setTimeout(this.notifyWin.bind(this),this.timeStep);
          }else{
            this.makePanelsUnClickable();
            this.addStep();
          }
        }else{
          this.makePanelsUnClickable();
          this.notifyError(pushObj);
        }
      }
    }

    public notifyWin(){
      var cnt = 0;
      var last = this.lastPush.attr('id');//Check this
      this.seqHndl = setInterval(()=>{
        this.playGoodTone(last);
        this.toHndl = setTimeout(this.stopGoodTones.bind(this),80);
        cnt++;
        if(cnt === 8){
          clearInterval(this.seqHndl);
        }
      },160);
      this.flashMessage('**',2);
    }

    public stopPropagation(){
        window.event.stopPropagation();
      if(!this.lock)
        this.stopGoodTones();
    }

    public stopGame(){
        this.resetTimers();
        this.reset();
        this.makePanelsUnClickable();
        let counterDiv = document.getElementsByClassName('count')[0];
        counterDiv.innerHTML = "--";
        counterDiv.classList.add("led-off");
    }

    public toggleStrict(){
        let stricMode = document.getElementById('mode-led');
        if(!this.strict){
            stricMode.classList.add('led-on');
        }else{
            stricMode.classList.remove('led-on');
        }
        this.strict = !this.strict;
    }
}

export default GameStatus;