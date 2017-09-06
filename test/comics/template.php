<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
    <meta name="title" content="dinosaur comics">
    <meta name="description" content="this comic... might be the best comic?">
    <meta property="og:determiner" content="a" />
    <meta property="og:title" content="Dinosaur Comics!" />
    <meta property="og:description" content="<?=$page->title;?>"/>
    <meta property="og:type" content="website" />
    <meta property="og:image"
    content="http://www.qwantz.com/comics/comic2-<?=$page->original;?>.png" />
    <meta property="og:url"
        content="http://www.qwantz.com/index.php?comic=<?=$page->comic;?>" />
    <title>Dinosaur Comics - <?=$page->date;?> - awesome fun times!</title>
    <style type="text/css" id="debuggingCSS">
.am-root {
    transform: scale(.7);
    transform-origin: top left;
    width: 750px;
    margin: 0 auto;
}

.am-center, #blogpostheader {
    text-align: center;
}

#header ul {
    list-style: none;
}

#header li {
    float: left;
    margin: 0 .2em;
}

#header li.paddedbullet {
    display: none;
}

center > table tr:nth-child(1) > td:nth-child(2) img {
    width: 735px;
    height: 500px;
}


a[rel=prev], a[rel=next] {
    display: block;
    width: 100%;
    height: 350px;
    padding-top: 150px;
    background: #fff;
    color: #22d;
    text-decoration: none;
    font-size: 4rem;
    font-weight: bolder;
    transition: all .5s ease-out;
}

a[rel=prev]:hover, a[rel=next]:hover {
    background: #ddf;
    color: #222;
}

a[rel=prev]::after { content: '<'; }
a[rel=next]::after {content: '>'; }
    </style>
</head>

<body>
    <img class="pteranodon">
    <img class="rhamphorhynchus">
    <div id="header" class="am-root">
        <table border=0 cellpadding=1 cellspacing=1 width="740">
            <tr>
                <td align="middle" width="390"><a><img width=390 height=56 title="Dinosaur Comics!  I KNOW" class="logo"></a></td>
                <td
                    valign="middle" align="middle" width=350>
                    <ul class="topnav" style="text-align:middle;padding:0px;">
                        <li><a>about</a></li>
                        <li class="paddedbullet">&bull;</li>
                        <li><a>archive</a></li>
                        <li class="paddedbullet">&bull;</li>
                        <li><a href="mailto:ryan@qwantz.com?subject=<?=$page->contact;?>">contact</a></li>
                        <li
                            class="paddedbullet">&bull;</li>
                            <li><a>sexy exciting merch</a></li>
                            <li class="paddedbullet">&bull;</li>
                            <li><a>search</a></li>
                    </ul>
                    </td>
            </tr>
            <tr>
                <td colspan=2>
                    <div class="randomquote" style="padding-top:5px;">
                        <span class="white">
                            <a href="http://www.patreon.com/qwantz">
                                Read tomorrow's comic today!  IF YOU DARE!!
                            </a>
                            &#8211;
                        </span>
                        <img width=16 height=16
                        title="Utahraptor!  WHAT ARE YOU UP TO??">
                        <BR>
                        <img width=15 height=15
                        title="That T-Rex, always sayin' somethin'">
                        <span class="white">&#8211;</span>
                        <a href="#">
                            PERHAPS YOU'D LIKE&hellip; A RANDOM LINK?
                        </a>
                    </div>
                </td>
            </tr>
        </table>
        </div>
        <!-- <span class="rss-title"><?=$page->rss;?></span> -->
        <div class="headertext am-center am-root">Header Text</div>
        <center class="am-root">
            <table border=0 cellspacing=0 cellpadding=0
            style="padding-top:10px;z-index:2;position:relative;">
                <tr>
                    <td align="left" valign="bottom" width=100>
                        <div class="nohover">
                            <a <?=$page->prev;?> rel="prev"
                            title="Previous comic">
                                <div class="arrowholder">
                                    <div id="leftarrow"></div>
                                </div>
                            </a>
                        </div>
                    </td>
                    <td align="middle" valign="middle">
                        <img
                            title="<?=$page->title;?>"
                            <?=$page->src;?>
                            <?=$page->class;?>
                            <?=$page->style;?>
                        >
                    </td>
                    <td align="right" valign="bottom" width=100>
                        <div class="nohover">
                            <a title="Next comic" rel="next" <?=$page->next;?>">
                                <div class="arrowholder">
                                    <div id="rightarrow"></div>
                                </div>
                            </a>
                        </div>
                    </td>
                </tr>
            </table>
        </center>
        <div class="headertext">
        </div>
    </div>
    <div style="border:0px solid #ff0000;margin-left: auto; margin-right: auto;position:relative;width:740px;min-height:100px;padding:0px;margin-top:0px;margin-bottom:0px;" class="am-root">
        <table cellspacing=0 cellpadding=0 border=0>
            <tr>
                <td align="center">
                    <div class="sharebox">
                        <table cellspacing=2 cellpadding=2 border=0>
                            <tr>
                                <td align="center" colspan=6>RECOMMEND T-REX TO... THE INTERNET:</td>
                            </tr>
                            <tr>
                                <td align="center" valign="top">share</td>
                                <td align="center" valign="top">share</td>
                                <td align="center" valign="top">share</td>
                                <td align="center" valign="top">share</td>
                                <td align="center" valign="top">alike</td>
                            </tr>
                        </table>
                    </div>
                </td>
                <td align="center">
                    <a title="imagine if this comic was on a wall?  YOUR wall??"
                        target="_new">
                        <div class="merchad" style="background-image: url(print2.png);
							background-position:0px 0px;width:59px;"></div>
                    </a>
                </td>
                <td align="center">
                    <a title="WHAT IF THESE COMICS... COULD BURN">
                        <div class="merchad" style="background-image: url(bookad5.png);background-repeat:no-repeat;"></div>
                    </a>
                </td>
                <td align="center">
                    <div class="sharebox" style="float:right;">

                        <table cellspacing=2 cellpadding=1 border=0>
                            <tr>
                                <td colspan=2 align="center">
                                    WHOAH FEEDS:
                                </td>
                            </tr>
                            <tr>
                                <td align="left">
                                    <a><img class="feedicon" title="RSS stands for 'REALLY SUPER COMICS', it is a terrible acronym with many structural problems"> rss</a>
                                </td>
                                <td align="left">
                                    <a><img class="feedicon" title="T-Rex will post every time there is a new comic.  Is it... MAGIC??"> twitter</a>
                                </td>
                            </tr>
                            <tr>
                                <td align="left">
                                    <a><img class="feedicon" title="Tumblr what is your DEAL"> tumblr</a>
                                </td>
                                <td align="left">
                                    <a><img class="feedicon" title="You can also discuss the comic here if you want.  WITH OTHER PEOPLE. :0"> facebook</a>
                                </td>
                            </tr>
                            <tr>
                                <td align="left">
                                    <a><img class="feedicon" title="Google Plus, what happens when they release Google Plus Plus?"> gplus</a>
                                </td>
                                <td align="left">
                                    <a><img class="feedicon" title="The original non-RSS Dinosaur Comics feed!"> livejournal</a>
                            </tr>
                        </table>
                    </div>
                    </td>
            </tr>
        </table>
    </div>
    <div id="container" class="am-root">
<?php include($page->post); ?>
        <div id="sidebar">
            <div id="sidebarheader">Ads Woo</div>
            <noscript><map name="admap38564" id="admap38564"><area shape="rect" coords="0,0,160,600" title="" alt="" target="_blank" /></map>
                <table cellpadding="0" cellspacing="0" style="width:160px;border-style:none;background-color:#ffffff;">
                    <tr>
                        <td><img style="width:160px;height:600px;border-style:none;"
                                usemap="#admap38564" alt="" /></td>
                    </tr>
                    <tr>
                        <td style="background-color:#ffffff;" colspan="1">
                            <center><a style="font-size:10px;color:#00689d;text-decoration:none;line-height:1.2;font-weight:bold;font-family:Tahoma, verdana,arial,helvetica,sans-serif;text-transform: none;letter-spacing:normal;text-shadow:none;white-space:normal;word-spacing:normal;"
                                    target="_blank">Ads by Project Wonderful!  Your ad here, right now: $0</a></center>
                        </td>
                    </tr>
                </table>
            </noscript>
        </div>
        <div id="shirtad">
            <div id="shirtadheader">big ups and shouts out</div>
            <div class="padded">
                <div class="shoutoutleft">
                    <ul class="sidebarlinks">
                        <ul class="sidebarlinks">
                            <li>Some things you can do to be awesome:</li>
                            <li><a>&bull; check out our secret flickr keywords</a></li>
                            <li><a>&bull; see something adorable</a></li>
                            <li><a>&bull; stalk me on twitter</a> or <a>tumblr</a></li>
                            <li>haha okay so listen when i said "stalk" i was JUST JOKING</li>
                        </ul>
                        <ul class="sidebarlinks">
                            <li>Some things you can do to help others:</li>
                            <li><a>&bull; join our distributed computing team!</a></li>
                            <li><a>&bull; microloan with team webcomics!</a></li>
                        </ul>
                        <ul class="sidebarlinks">
                            <li>
                                <form action="http://www.ohnorobot.com/" method="get">Search Dinosaur Comics: <input type="text" size=20 name="s" class="sidebarlinks" style="border: 1px solid #aaa;width:85px; padding-left:3px;"
                                        name="search" placeholder="oh daaaaamn!"></input><input type="submit" class="tinysubmit"
                                        value="Go"><input type="hidden" name="comic" value="23"></form>
                            </li>
                        </ul>
                </div>
                <div class="shoutoutright">
                    <ul class="sidebarlinks">
                        <li>Some comics I would TOTALLY MARRY:</li>
                    </ul>
                    <ul class="sidebarlinksdash">
                        <li><a>a softer world</a></li>
                        <li><a>achewood</a></li>
                        <li><a>asp</a></li>
                        <li><a>bad machinery</a></li>
                        <li><a>blade diary</a></li>
                        <li><a>buttercup festival</a></li>
                        <li><a>cat and girl</a></li>
                        <li><a>copper</a></li>
                        <li><a>diesel sweeties</a></li>
                        <li><a>dresden codak</a></li>
                        <li><a>dr. mcninja</a></li>
                        <li><a>dumbing of age</a></li>
                        <li><a>exploding dog</a></li>
                        <li><a>feel afraid</a></li>
                        <li><a>great</a></li>
                        <li><a>gunnerkrigg court</a></li>
                        <li><a>gunshow</a></li>
                        <li><a>hark! a vagrant</a></li>
                        <li><a>mspa</a></li>
                        <li><a>moe</a></li>
                        <li><a>nedroid</a></li>
                        <li><a>nine planets</a></li>
                        <li><a>octopus pie</a></li>
                        <li><a>oc</a></li>
                        <li><a>penny arcade</a></li>
                        <li><a>questionable content</a></li>
                        <li><a>sam and fuzzy</a></li>
                        <li><a>sfam</a></li>
                        <li><a>the perry bible fellowship</a></li>
                        <li><a>three word phrase</a></li>
                        <li><a>tp4d</a></li>
                        <li><a>whispered apologies</a></li>
                        <li><a>wonderella</a></li>
                        <li><a>wondermark</a></li>
                        <li><a>xkcd</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div id="seasonfooterbg4">
        <div id="seasonfooter4">&nbsp;</div>
    </div>
    <div id="bgclouds">&nbsp;</div>
</body>
</html>
