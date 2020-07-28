const express = require('express');
const app = express();
require('dotenv').config();
let Twit = require('twit');
var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_KEY,
  access_token_secret:  process.env.ACCESS_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

// function followed(eventMsg){
//   var name = eventMsg.source.name;
//   var screenName = eventMsg.source.screen_name;
//   shuffle(rhymes);
//   console.log('.@'+screenName+'\nHey '+rhymes[0][0]+" "+rhymes[0][0]+", the "+screenName+" & the "+rhymes[0][1])
//   tweetIt('.@'+screenName+'\nHey '+rhymes[0][0]+" "+rhymes[0][0]+", the "+screenName+" & the "+rhymes[0][1])
// }
// let stream = T.stream('statuses/filter', { track: '@HeyDiddleBot' });
// stream.on('follow', followed);
// stream.on('error', twitterCallback);

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}

const rhymes = new Array(
  new Array("mail","whale","jail","sail","kale","ale","hail","nail","pail","rail","tail","tale","veil","Yale"),
  new Array("brain","Spain","chain","crane","cane","stain","pane","plane","drain","strain","rain","terrain","Great Dane","mane"),
  new Array("cake","lake","stake","brake","snake","rake"),
  new Array("ball","mall","hall","phone call","cannonball","fireball","goofball","nightfall","pitfall","racquetball","waterfall"),
  new Array("bear","millionaire","chocolate éclair","multimillionaire","arctic hare","air","hair","mare","pear","pair","chair","square"),
  new Array("clam","cam","dam","ram","lamb","graham","sham","tram","exam","madame","program","jam","telegram","yam"),
  new Array("can","clan","fan","man","Iran","scan","Japan","plan","Sudan","LAN","pan"),
  new Array("bank","blank","prank","tank"),
  new Array("cap","lap","map","rap","trap"),
  new Array("cash","hash","lash","mash","ash"),
  new Array("bat","cat","rat","hat","animal fat"),
  new Array("Beyoncé","bay","hay","clay","play","sleigh","spray","stray","tray","display","essay","fillet","highway","résumé","stairway","bouquet","padre","valet","Will Forte","USA","ballet","buffet","fiancé","subway","Norway"),
  new Array("jaw","claw","straw","slaw","saw","paw","gaping maw","Utah","flaw","law","shaw","outlaw"),
  new Array("bed","bread","head","shed","spread","thread","thoroughbred","bed","head","sled","thoroughbred","bread","shed"),
  new Array("flee","knee","tree","key","ski","pea","bee","algae","army","sea","debris","tv","referee","Tennessee", "bourgeoisie","CD","DVD"),
  new Array("bell","Adele","hotel","smell","cell","well","shell","gel"),
  new Array("jet","net","pet","vet","brunette","coronet","moist towelette","cigarette","cadet"),
  new Array("chest","nest","vest","guest","test","pest"),
  new Array("eye","fly","fry","guy","pie","spy","tie"),
  new Array("kite","night","knight","fight","sprite","fright","height","bite"),
  new Array("vine","spine","nine","fine","mine","resign","line","pine","spine","wine"),
  new Array("log","fog","frog","hog","bog","cog","dog","grog","blog"),
  new Array("dot","knot","pot","Scott","snot","yacht"),
  new Array("fawn","John","lawn","pawn","swan"),
  new Array("crew","glue","screw","shoe","stew","Sue","goo","dude","food","canoe","Peru","zoo"),
  new Array("crow","dough","hoe","snow","show","toe"),
  new Array("mom","bomb","palm","Guam","prom"),
  new Array("dad","Chad","lad","pad","plaid"),
  new Array("Shrek","check","deck","neck","tech","wreck"),
  new Array("tweet","beet","feet","heat","meat","seat","street","treat","wheat")
);

const adj = new Array("abandoned","aggressive","altruistic","annoying","anxious","athletic","attractive","awesome","beautiful","big","big headed","big nosed","bite-sized","black","bland","blue","booger eater","booger eating crum-bum","bouncy","bright","calm","chubby","chunky","clear-cut","clumsy","colossal","confused","cool","courageous","cowardly","crazy","creepy","crippled","cute","dangerous","dark","deformed","dense","depressed","dinosaur-armed","dirty","disgusting","dishonest","dizzy","do do dunderhead","dull","dumb","elliptical","embarrassed","enormous","evil","excited","faceless","fast","fat","fearful","flat","fluffy","friendly","fun","funky","funny","furious","fuzzy","gangsta","geek","ghetto","giant","gigantic","gnarly","gray","green","gross","grouchy","gucci","hairy","happy","heartbroken","hideous","hillbilly","huge","humongous","idiot","imaginative","immature","inappropriate","indigo","intelligent","interested","invisible","kind","lame","lime green","lonely","loser","lowkey","lovely","magenta","mature","mean","mentally unstable","microscopic","multi-headed","mysterious","mystical","nerd","nerdy","nervous","nonfunctional","obedient","obese","oblivious","observant","obsessed","on fleek","one eyed","orange","outgoing","oversized","overweight","pale","paranoid","peaceful","pitiful","pleasant","poor","popular","possessed","predictable","pretty","proud","pudgy","puking","purple","quiet","random","ratchet","rebellious","red","redneck","rested","robotic","round","rusty","sad","salty","savage","scared","scrawny","sharp","short","shy","skinny","sly","small","smart","smelly","sneaky","soft","speechless","squishy","stinky","strong","stupid","sunny","sweet","tall","tame","tan","thin","thug","tiny","touchy","turquoise","twitchy","tyrannical","ugly","unappealing","unattractive","vexed","vulgar","weird","weirdo","white","wide","yellow","young");

const animal = new Array("alien","alligator","ant","arctic seal","bat","bear","bigfoot","bird","blobfish","Bulbasaur","bull","bunnies","bush baby","calf","camel","cat","cerberus","Charizard","cheetah","chicken","clown fish","clownfish","cougar","cow","coyote","crab","cricket","crocodile","cyclops","deer","dodo","dog","dolphin","dragon","drop bear","duck","eagle","Eevee","elephant","elk","fish","flamingo","foal","fox","frog","gazelle","geese","giraffe","goldfish","gorgon","grizzly bear","groundhog","hippocampus","horse","horses","human","hydra","jellyfish","Jigglypuff","kangaroo","kitten","kittens","koala","komodo dragon","leopard","lion","lizard","loch ness monster","Magikarp","meerkat","megalodon","mermaid","mice","mink","minotaur","monkey","mouse","mule","narwhal","newt","ogre","ostrich","owl","panda","peacock","pegasus","phoenix","Pikachu","pig","pizzaduck","Pokémon","pufferfish","puppies","puppy","rabbit","raccoon","rat","raven","scorpion","shark","sheep","shrimp","sloth","snake","sparrow","spider","squirrel","Squirtle","sting ray","stingray","tapir","tiger","toucan","troll","tropical shrimp","turkey","turtle","tyrannosaurus rex","unicorn","uniduck","vampire","velociraptor","weasel","werewolf","wild cat","wild dog","wolf","yeti","zebra","zebras","zombie");

const synonymsForFun = new Array("sport","weird flex","fun","play","a joke","joy","cheer","a game","mirth","a romp","a sight","nonsense","a treat","absurdity","enjoyment","a pastime","a blast","buffoonery","clowning","festivity","tomfoolery","foolery","horseplay","playfulness","highjinks","joking","drivel","baloney","babble","diddle","folly","foolishness","gibberish","madness","rubbish","silliness","stupidity","balderdash","bananas","craziness","giddiness","hogwash","hooey","jest","poppycock","tripe","a goof","goofiness","applesauce","a farce","idiocy","daftness","illogicalness","insanity","madness","lunacy","horse feathers","mish mash","malarky","monkey business","antics","clowning around","absurdness","a prank","mischief","monkeyshine","piffle","a delight","regalement","hilarity","hoopla","comedy","a schtick","satire","humor","slapstick","a scene","a display","a spectacle","a show");

const synonymsForLaughed = new Array("laughed","chuckled","giggled","grinned","LOL'd","ROFL'd","howled","snickered","snorted","chortled","cracked up","smirked","cackled","guffawed","smiled","was amused","was delighted","was happy","was pleased","beamed","died laughing","was entertained","was tickled","said 'haha'");


function generateText(){
  shuffle(rhymes);
  const rhymeSet1=rhymes[0];
  const rhymeSet2=rhymes[1];
  shuffle(rhymeSet1);
  shuffle(rhymeSet2);
  shuffle(adj);
  shuffle(animal);
  shuffle(synonymsForFun);
  shuffle(synonymsForLaughed);

  return "Hey "+rhymeSet1[0]+" "+rhymeSet1[0]+
  ", the "+animal[0]+" & the "+rhymeSet1[1]+
  ", the "+animal[1]+" jumped over the "+rhymeSet2[0]+
  ". The "+adj[0]+" "+animal[2]+" "+synonymsForLaughed[0]+
  ", to see such "+synonymsForFun[0]+" & the "+animal[3]+
  " ran away with the "+rhymeSet2[1]+".";
}

function twitterCallback(err, data, response) {
  if(err){
    console.log("Oof. Error. "+err)
  } else {
    console.log("It worked.")
  }
}

function tweetIt(tweetText){
  let tweetObj = { status: tweetText };
  T.post('statuses/update', tweetObj, twitterCallback)
}

setInterval(()=>{
  tweetIt(generateText())
}, 1000*60*60*2); //ms*s*m*h

app.listen(
  process.env.PORT || 3000,
  ()=>console.log("bot running")
);
