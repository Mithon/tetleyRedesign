window.onload = function () {

    var s = Snap("#svg");

    var tea = Snap.select("#tea"),
    gt = Snap.select("#greenTea"),
    ht = Snap.select("#herbalTea"),
    rt = Snap.select("#redTea"),
    bt = Snap.select("#blackTea"),
    oMug = Snap.select("#outerMug"),
    teaTag = Snap.select("#teaTag"),
    gtBag = Snap.select("#gtBag"),
    mugTea = Snap.select("#mugTea");

    min = document.getElementById("minutes"),
    sec = document.getElementById("seconds");

    var initiated = false;
    var timerActive = false;

    function doubleDigit (num) {
        return num > 9 ? num.toString() : "0" + num.toString();
    }


    var sound = new Audio("../audio/glass-ping.wav");


    var time = new Date();
    hour = time.getHours();
    min.innerHTML = hour > 12 ? ( hour-12 > 9 ? hour-12 : "0" + (hour-12).toString() ): (hour > 9 ? hour : "0" + (hour).toString());
    sec.innerHTML = time.getMinutes() < 10 ? "0" + (time.getMinutes()).toString() : time.getMinutes();

    console.log(doubleDigit(6));


    function growHover (obj) {
        obj.hover(function(){
            obj.animate({ transform: 't0,0 s1.1' }, 100, mina.easeinout );
        }, function(){
            obj.animate({ transform: 't0,0 s1' }, 200, mina.easeinout );
        });
    }

    var initiate = function() {
        if (initiated == false) {
            var startTimer = setInterval(function () {clock.countdown()}, 1000);
            initiated = true;
        };
    };

    var clock = {
        minute : 0,
        second : 0,
        fullTime: 0,
        setTime : function(m, s) {
            min.innerHTML = doubleDigit(m);
            sec.innerHTML = doubleDigit(s);
            this.minute = m;
            this.second = s;
            initiate();
            timerActive = true;
        },
        countdown : function() {
            if (this.second != 0) {
                this.second--;
                changeColour();
            }
            else if (this.minute != 0)  {
                this.minute--;
                this.second = this.second + 59;
            }
            else {
                oMug.animate({ 'fill-opacity': '1' }, 300, mina.easeinout );
                if (timerActive == true)
                    sound.play();
                timerActive = false;
                return;
            }
            //console.log(this.minute.toString() + ":" + this.second.toString());
            this.setTime(this.minute, this.second);
        }
    };

    function changeColour (o) {
        var timeleft = clock.second + (clock.minute * 60);
        var leftover = 1-(timeleft/clock.fullTime);
        mugTea.animate({ 'fill-opacity': leftover.toString() }, 1000, mina.easeinout );
        //console.log(leftover.toString() + " and " + clock.fullTime);
    }

    mugTea.animate({ 'fill-opacity': '0.00' }, 10, mina.easeinout );

    function teaClick (m, s, colour) {
        oMug.animate({ 'fill-opacity': '1' }, 300, mina.easeinout);
        clock.setTime(m, s);
        setTimeout(function () {
            mugTea.animate({ 'fill-opacity': '0.00' }, 10, mina.easeinout );
            oMug.animate({ 'fill-opacity': '0.05' }, 400, mina.easeinout);
        }, 1000);
        clock.fullTime = (m* 60) + s;
        teaTag.animate({ 'fill': colour }, 1000, mina.easeinout );
    }

    gt.click(function(){teaClick(3, 0, '#ADD79D')});

    ht.click(function() {teaClick(1, 0, '#EDE7DD')});

    rt.click(function() {teaClick(5, 0, '#C9242A')});

    bt.click(function() {teaClick(4, 30, '#246DB6')});


    //Hover Effects

    oMug.hover(function(){
        if (timerActive = false)
        oMug.animate({ 'fill-opacity': '0.05' }, 200, mina.easeinout );
    }, function(){
        if (timerActive = false)
        oMug.animate({ 'fill-opacity': '1' }, 300, mina.easeinout );
    });

    growHover(gt);
    growHover(ht);
    growHover(rt);
    growHover(bt);

    var f = Snap.filter.shadow(10, 10, 4, 'black');
    gt.attr({filter: f});
}
