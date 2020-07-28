const express = require('express');
const app = express();

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
  new Array("bear","millionaire","chocolate éclair","black bear","multimillionaire","cinnamon bear","grizzly bear","teddy bear","polar bear","arctic hare","air","hair","mare","pear","pair","chair","square"),
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
  new Array("log","fog","frog","hog","bog","cog","dog","grog","blog")
);

const adj = new Array("fluffy","big","fat","dumb","stupid","ugly","unappealing","tall","short","pleasant","cute","smelly","stinky","annoying","fun","short","small","athletic","nerdy","smart","invisible","tall","short","fat","pudgy","ugly","skinny","ratchet","tan","cool","gnarly","scrawny","chubby","thug","pale","gucci","gangsta","short","ghetto","colossal","squishy","cute","fluffy","smart","invisible","vexed","heartbroken","scared","depressed","sly","sneaky","obsessed","possessed","interested","fearful","shy","proud","abandoned","altruistic","bite-sized","dizzy","clear-cut","elliptical","clumsy","crazy","funny","skinny","tall","smart","young","nervous","fast","smart","invisible","fat","annoying","dumb","ugly","fat","stupid","mean","annoying","stupid","dumb","ugly","short","awesome","ugly","unappealing","ugly","loser","pretty","cute","attractive","unattractive","nerd","geek","popular","smart","dumb","idiot","funny", "smart", "cool", "fast","soft","funny","pretty","ugly","stupid", "yellow", "red", "blue", "green", "white", "black", "gray", "magenta", "orange", "purple", "indigo", "soft", "calm", "furious", "excited", "happy", "anxious", "embarrassed","funny","dumb","disgusting","unattractive","attractive","dumb","crippled","fast","oversized","lovely","gross","crazy","funky","loser","rested","weirdo","rusty","funny","booger eater","deformed", "nonfunctional","do do dunderhead","booger eating crum-bum","ugly","weird","sad","humongous","funny","disgusting","ugly","enormous","weird","stupid","pretty","hideous","bland","random","dumb","microscopic","oblivious","touchy","twitchy","depressed","orange","blue","lime green","black","purple","white","indigo","turquoise","gigantic","dark","tiny","bright","creepy","tall","pale","small","tame","strong","fast","aggressive","shy","outgoing","sunny", "tall", "hairy","ugly","fat","thug","gangsta","tiny","huge","intelligent","rebellious","strong","courageous","quiet","friendly","imaginative","shy","friendly","kind","tyrannical","funny","observant","cowardly","dull","obedient","mysterious","vulgar","mystical","mature","immature","dense","predictable","scrawny","dumb","tiny","beautiful","one eyed","redneck","short","fat","skinny","thin","wide","beautiful","dirty","poor","dark","dangerous","black","paranoid","confused","excited","bouncy","faceless","dishonest","speechless","lonely","peaceful","inappropriate","round", "fuzzy", "sharp", "dirty", "ugly", "mentally unstable", "robotic", "obese", "overweight", "evil", "annoying", "multi-headed","big headed","hillbilly", "dinosaur-armed","big nosed","thug","gucci","short","lame","pretty","disgusting","ugly","cute","fluffy","sweet","short","ugly","grouchy","fat","skinny","chunky","smelly","dirty","lame","pitiful","ugly","flat","giant","puking");

const animal = new Array("unicorn","raven","sparrow","scorpion","coyote","eagle","owl","lizard","zebra","duck","kitten","unicorn","raven","sparrow","scorpion","coyote","eagle","owl","lizard","zebra","duck","kitten","unicorn","puppies",
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

const synonymsForFun = new Array("sport","fun","play","a joke","joy","cheer","a game","mirth","a romp","a sight","nonsense","a treat","absurdity","enjoyment","a pastime","a blast","buffoonery","clowning","festivity","tomfoolery","foolery","horseplay","playfulness","highjinks","joking","drivel","baloney","babble","diddle","folly","foolishness","gibberish","madness","rubbish","silliness","stupidity","balderdash","bananas","craziness","giddiness","hogwash","hooey","jest","poppycock","tripe","a goof","goofiness","applesauce","a farce","idiocy","daftness","illogicalness","insanity","madness","lunacy","horse feathers","mish mash","malarky","monkey business","antics","clowning around","absurdness","a prank","mischief","monkeyshine","piffle","a delight","regalement","hilarity","hoopla","comedy","a schtick","satire","humor","slapstick","a scene","a display","a spectacle","a show");

const synonymsForLaughed = new Array("laughed","chuckled","giggled","grinned","LOL'd","ROFL'd","howled","snickered","snorted","chortled","cracked up","smirked","cackled","guffawed","smiled","was amused","was delighted","was happy","was pleased","beamed","died laughing","was entertained","was tickled");

shuffle(rhymes);
const rhymeSet1=rhymes[0];
const rhymeSet2=rhymes[1];
shuffle(rhymeSet1);
shuffle(rhymeSet2);
shuffle(adj);
shuffle(animal);
shuffle(synonymsForFun);
shuffle(synonymsForLaughed);

const tweet1 = "Hey "+rhymeSet1[0]+" "+rhymeSet1[0]+
", the "+animal[0]+" & the "+rhymeSet1[1]+
", the "+animal[1]+" jumped over the "+rhymeSet2[0]+
". The "+adj[0]+" "+animal[2]+" "+synonymsForLaughed[0]+
", to see such "+synonymsForFun[0]+" & the "+animal[3]+
" ran away with the "+rhymeSet2[1]+".";





app.listen(3000,()=>console.log(tweet1));
