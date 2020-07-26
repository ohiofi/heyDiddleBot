<?php

$consumer_key = "xxx";
$consumer_secret = "xxx";
$access_key = "xxx";
$access_secret = "xxx";
require_once('twitteroauth.php');// Use the twitteroauth library
$twitter = new TwitterOAuth ($consumer_key ,$consumer_secret , $access_key , $access_secret );// Connect to Twitter using TwitterOAuth library

$randomReply = array();// Create a new array called randomReply
$newTweetCount = 0;// Set the tweets count to zero
$lastTweetScreenName = NULL;

$myUserInfo = $twitter->get('account/verify_credentials');// Get ShouldBot's info
$myLastTweet = $twitter->get('statuses/user_timeline', array('user_id' => $myUserInfo->id_str, 'count' => 1));// Use ShouldBot's info to get ShouldBot's last tweet

$rhymes = array(
  array("mail","whale","jail","sail","kale","ale","hail","nail","pail","rail","tail","tale","veil","Yale"),
  array("brain","Spain","chain","crane","cane","stain","pane","plane","drain","strain","rain","terrain","Great Dane","mane"),
  array("cake","lake","stake","brake","snake","rake"),
  array("ball","mall","hall","phone call","cannonball","fireball","goofball","nightfall","pitfall","racquetball","waterfall"),
  array("bear","millionaire","chocolate Éclair","black bear","multimillionaire","cinnamon bear","grizzly bear","teddy bear","polar bear","arctic hare","air","hair","mare","pear","pair","chair","square"),
  array("clam","cam","dam","ram","lamb","graham","sham","tram","exam","madame","program","jam","telegram","yam"),
  array("can","clan","fan","man","Iran","scan","Japan","plan","Sudan","LAN","pan"),
  array("bank","blank","prank","tank"),
  array("cap","lap","map","rap","trap"),
  array("cash","hash","lash","mash","ash"),
  array("bat","cat","rat","hat","animal fat"),
  array("Beyoncé","bay","hay","clay","play","sleigh","spray","stray","tray","display","essay","fillet","highway","résumé","stairway","bouquet","padre","valet","Will Forte","USA","ballet","buffet","fiancé","subway","Norway"),
  array("jaw","claw","straw","slaw","saw","paw","gaping maw","Utah","flaw","law","shaw","outlaw"),
  array("bed","bread","head","shed","spread","thread","thoroughbred","bed","head","sled","thoroughbred","bread","shed"),
  array("flee","knee","tree","key","ski","pea","bee","algae","army","sea","debris","tv","referee","Tennessee", "bourgeoisie","CD","DVD"),
  array("bell","Adele","hotel","smell","cell","well","shell","gel"),
  array("jet","net","pet","vet","brunette","coronet","moist towelette","cigarette","cadet"),
  array("chest","nest","vest","guest","test","pest"),
  array("eye","fly","fry","guy","pie","spy","tie"),
  array("kite","night","knight","fight","sprite","fright","height","bite"),
  array("vine","spine","nine","fine","mine","resign","line","pine","spine","wine"),
  array("log","fog","frog","hog","bog","cog","dog","grog","blog")
  );
$adj = array("fluffy","big","fat","dumb","stupid","ugly","unappealing","tall","short","pleasant","cute","smelly","stinky","annoying","fun","short","small","athletic","nerdy","smart","invisible","tall","short","fat","pudgy","ugly","skinny","ratchet","tan","cool","gnarly","scrawny","chubby","thug","pale","gucci","gangsta","short","ghetto","colossal","squishy","cute","fluffy","smart","invisible","vexed","heartbroken","scared","depressed","sly","sneaky","obsessed","possessed","interested","fearful","shy","proud","abandoned","altruistic","bite-sized","dizzy","clear-cut","elliptical","clumsy","crazy","funny","skinny","tall","smart","young","nervous","fast","smart","invisible","fat","annoying","dumb","ugly","fat","stupid","mean","annoying","stupid","dumb","ugly","short","awesome","ugly","unappealing","ugly","loser","pretty","cute","attractive","unattractive","nerd","geek","popular","smart","dumb","idiot","funny", "smart", "cool", "fast","soft","funny","pretty","ugly","stupid", "yellow", "red", "blue", "green", "white", "black", "gray", "magenta", "orange", "purple", "indigo", "soft", "calm", "furious", "excited", "happy", "anxious", "embarrassed","funny","dumb","disgusting","unattractive","attractive","dumb","crippled","fast","oversized","lovely","gross","crazy","funky","loser","rested","weirdo","rusty","funny","booger eater","deformed", "nonfunctional","do do dunderhead","booger eating crum-bum","ugly","weird","sad","humongous","funny","disgusting","ugly","enormous","weird","stupid","pretty","hideous","bland","random","dumb","microscopic","oblivious","touchy","twitchy","depressed","orange","blue","lime green","black","purple","white","indigo","turquoise","gigantic","dark","tiny","bright","creepy","tall","pale","small","tame","strong","fast","aggressive","shy","outgoing","sunny", "tall", "hairy","ugly","fat","thug","gangsta","tiny","huge","intelligent","rebellious","strong","courageous","quiet","friendly","imaginative","shy","friendly","kind","tyrannical","funny","observant","cowardly","dull","obedient","mysterious","vulgar","mystical","mature","immature","dense","predictable","scrawny","dumb","tiny","beautiful","one eyed","redneck","short","fat","skinny","thin","wide","beautiful","dirty","poor","dark","dangerous","black","paranoid","confused","excited","bouncy","faceless","dishonest","speechless","lonely","peaceful","inappropriate","round", "fuzzy", "sharp", "dirty", "ugly", "mentally unstable", "robotic", "obese", "overweight", "evil", "annoying", "multi-headed","big headed","hillbilly", "dinosaur-armed","big nosed","thug","gucci","short","lame","pretty","disgusting","ugly","cute","fluffy","sweet","short","ugly","grouchy","fat","skinny","chunky","smelly","dirty","lame","pitiful","ugly","flat","giant","puking");
$animal = array("unicorn","raven","sparrow","scorpion","coyote","eagle","owl","lizard","zebra","duck","kitten","unicorn","raven","sparrow","scorpion","coyote","eagle","owl","lizard","zebra","duck","kitten","unicorn","puppies",
"kittens","horses","bunnies","zebras","dog","dragon","unicorn","snake","kitten","shark","dolphin","drop bear","leopard","bear","sting ray","kangaroo","owl","lizard","fish","rat","cheetah","cow","sheep","chicken","cheetah",
"cow","cheetah","dog","cat","zebra","fish","rat","cow","sheep","chicken","wolf","scorpion","crocodile","alligator","cat","dog","lizard","queko","mice","turkey","squirrel","deer","wolf","narhwal","tropical shrimp",
"monkey","chicken","tiger","dog", "horse", "cheetah", "leopard", "giraffe", "rabbit","horse","giraffe","zebra","cat","bear", "fish", "wolf", "fox", "cow", "calf", "horse", "foal", "frog", "clownfish", "pufferfish", "shrimp",
"crab","tiger","chicken","horse","mule","cricket","bush baby","blobfish","sloth","cyclops","dragon","zombie","dragon","lizard","human","tiger","lion","komono dragon","zombie","snake","wolf","lizard","dragon","velociraptor","snake",
"zombie","tiger","tyrannosaurus rex","spider","scorpion","grizzly bear","frog","turtle","weasel","duck","kitten","chicken","peacock","toucan","troll","hippocampus","hydra","phoenix","gorgon","meerkat","owl","giraffe","arctic seal","alligator","chicken",
"owl","scorpion","coyote","eagle","snake","lizard","lion","goldfish","dog","elephant","tiger","panda","camel","jellyfish","rabbit","mouse","bird","deer","rabbit","elk","pig","cow","bull","groundhog","uniduck",
"pizzaduck", "crab", "cat", "tiger", "lion", "bear","unicorn","duck","kitten","horse","megalodon","pegasus","crab","spider","chicken","pig","ant","dragon","mermaid","owl","shark","dodo","raccoon","flamingo","yeti",
"bigfoot","ogre","werewolf","vampire","dragon","cerberus","dog","lion","tiger","monkey","lizard","newt","koala","tapir","chicken","horse","pig","puppy","mouse","wild dog","wild cat","bear","duck","kitten","dragon",
"turtle","duck","minotaur","loch ness monster","alien","bat","rat","chicken","sloth", "clown fish", "gazelle", "peacock", "camel", "elephant", "ostrich","shark","geese","duck","bat","pig","tiger","elephant","mink","tiger","cougar",
"bat","bear","fish","stingray","rabbit");
$synonymsForFun = array("sport","fun","play","a joke","joy","cheer","a game","mirth","a romp","a sight","nonsense","a treat","absurdity","enjoyment","a pastime","a blast","buffoonery","clowning","festivity","tomfoolery","foolery","horseplay","playfulness","highjinks","joking","drivel","baloney","babble","diddle","folly","foolishness","gibberish","madness","rubbish","silliness","stupidity","balderdash","bananas","craziness","giddiness","hogwash","hooey","jest","poppycock","tripe","a goof","goofiness","applesauce","a farce","idiocy","daftness","illogicalness","insanity","madness","lunacy","horse feathers","mish mash","malarky","monkey business","antics","clowning around","absurdness","a prank","mischief","monkeyshine","piffle","a delight","regalement","hilarity","hoopla","comedy","a schtick","satire","humor","slapstick","a scene","a display","a spectacle","a show");
$synonymsForLaughed = array("laughed","chuckled","giggled","grinned","LOL'd","ROFL'd","howled","snickered","snorted","chortled","cracked up","smirked","cackled","guffawed","smiled","was amused","was delighted","was happy","was pleased","beamed","died laughing","was entertained","was tickled");

shuffle($rhymes);
$rhymeSet1=$rhymes[0];
$rhymeSet2=$rhymes[1];
shuffle($rhymeSet1);
shuffle($rhymeSet2);
shuffle($adj);
shuffle($animal);
shuffle($synonymsForFun);
shuffle($synonymsForLaughed);

$tweet1 = "Hey ".$rhymeSet1[0]." ".$rhymeSet1[0].", the ".$animal[0]." & the ".$rhymeSet1[1].", the ".$animal[1]." jumped over the ".$rhymeSet2[0].". The ".$adj[0]." ".$animal[2]." ".$synonymsForLaughed[0].", to see such ".$synonymsForFun[0]." & the ".$animal[3]." ran away with the ".$rhymeSet2[1].".";

// don't sleep for 20 seconds
//sleep(20);
if(strlen($tweet1) > 280)// If tweet is already too long, shorten it.
  $tweet1 = substr($tweet1, 0, 280);
$twitter->post('statuses/update', array('status' => $tweet1));// Post tweet
$newTweetCount++;// Add one to output counter
echo "<br/>";echo $newTweetCount." ".$tweet1."\n";echo "<br/>";// If bot is run manually, user will see the final tweet.

// sleep for 2 seconds
//sleep(2);
//$myLastTweet = $twitter->get('statuses/user_timeline', array('user_id' => $myUserInfo->id_str, 'count' => 1));// Use ShouldBot's info to get ShouldBot's last tweet


//if(strlen($tweet2) > 140)// If tweet is already too long, shorten it.
  //$tweet1 = substr($tweet2, 0, 140);
//$twitter->post('statuses/update', array('status' => $tweet2,'in_reply_to_status_id' => $myLastTweet[0]->id_str));// Post tweet
//$newTweetCount++;// Add one to output counter
//echo "<br/>";echo $newTweetCount." ".$tweet2."\n";echo "<br/>";// If bot is run manually, user will see the final tweet.
?>
