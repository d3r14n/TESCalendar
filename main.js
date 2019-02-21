var now = new Date(); //Actual Date
var tYear = now.getFullYear().toString(); //This Year
var tMonth = now.getMonth().toString(); //This Month
var tOday = now.getDate().toString(); //Today (Number of the day)
var firstDayOfThisMonth = new Date(tYear, tMonth, 1).getDay(); //If the month starts in a Monday, Sunday, etc.

var actualCalendarMonth = tMonth; //The month in the calendar

document.getElementById('cloth').addEventListener("click", closeDescription); //Click in the screen to close the description of the festivity
document.getElementById('prevM').addEventListener("click", function(){moveCalendar(-1)}); //Moves the calender to the left
document.getElementById('nextM').addEventListener("click", function(){moveCalendar(1)}); //Moves the calendar to the right

function createCalendar(firstWeekDay, cMonth, cYear, activeDay=null)
{
	calendar = ""; //Here we're gonna put all the content of the calendar
	if (firstWeekDay == 0)
	{
		calendar += "<li></li><li></li><li></li><li></li><li></li><li></li>"; //If the month starts in Sunday, we put all the empty days of the Calendar
	}
	else
	{
		for (i = 1; i < firstWeekDay; i++)
		{
			calendar += "<li></li>"; //Depending of the starting day of the month, we put some empty days
		}
	}
	mI = getMonthInitials(cMonth); //We search for the initials of the month

	document.getElementById('monthName').innerHTML = "<p>"+festivity[mI].monthName+"</p><br><span style='font-size:18px'>5E"+cYear+"</span>"; //We put in the calendar the name of the month
	document.getElementById('monthBanner').style.backgroundImage = "url('img/bg/"+mI+".jpg')"; //We put the image corresponding to the month

	for (d = 1; d <= festivity[mI].numberOfDays; d++)
	{
		if (activeDay != null && activeDay == d)
		{
			if (festivity[mI]["d"+d] != null)
			{
				calendar += "<li class='active event tooltip'><p>"+d+"</p><span class='tooltiptext'>"+festivity[mI]["d"+d].name+"</span></li>"; //If is the actual day and there's an event
			}
			else
			{
				calendar += "<li class='active'><p>"+d+"</p></li>"; //If is the actual day
			}
		}
		else
		{
			if (festivity[mI]["d"+d] != null)
			{
				calendar += "<li class='event tooltip'><p>"+d+"</p><span class='tooltiptext'>"+festivity[mI]["d"+d].name+"</span></li>"; //if there's an event
			}
			else
			{
				calendar += "<li><p>"+d+"</p></li>"; //A normal day
			}
		}
	}

	document.getElementById('calendarDays').innerHTML = calendar; //We put the content in the calendar
}

function moveCalendar(move)
{
	actualCalendarMonth = (parseInt(actualCalendarMonth) + move).toString(); //We move the number of the actual month showing in the calendar

	if(actualCalendarMonth < 0)
	{
		actualCalendarMonth = 0; //The calendar mustn't be less than 0 (JAN)
	}
	if (actualCalendarMonth > 11)
	{
		actualCalendarMonth = 11 //The calendar mustn't be greater than 11 (DEC)
	}

	if (actualCalendarMonth <= 0)
	{
		document.getElementById('prevM').style.display = "none"; //Don't display the arrow
	}
	else
	{
		document.getElementById('prevM').style.display = "block"; //Display the arrow
	}
	if(actualCalendarMonth >= 11)
	{
		document.getElementById('nextM').style.display = "none"; //Don't display the arrow
	}
	else
	{
		document.getElementById('nextM').style.display = "block"; //Display the arrow
	}

	if(actualCalendarMonth == tMonth)
	{
		createCalendar(firstDayOfThisMonth, tMonth, tYear, tOday); //If the month is the same we're in. We mark the day we're today
	}
	else
	{
		createCalendar(new Date(tYear, actualCalendarMonth, 1).getDay(), actualCalendarMonth, tYear); //If not, we show the month.
	}

	eventsInThisMonth = document.getElementsByClassName("event"); //We search for the events in the month

	for (eM = 0; eM < eventsInThisMonth.length; eM++)
	{
		eventsInThisMonth[eM].addEventListener("click", function()
		{
			showDescription(this); //And put the function to show their descriptions
		})
	}
}

function showDescription(day)
{
	mN = String(document.getElementById("monthName").firstChild.innerHTML); //Name of the month
	monthI = getMonthInitials(mN); //Initials of the month

	dayNum = day.firstChild.innerHTML; //Number of the day
	dayName = day.lastChild.innerHTML; //Name of the festivity of the day

	//We put the name of the festivity and the description of the day
	eDescription = "<h1>" + dayName + "</h1>";
	eDescription += "<p>" + getDescription(dayNum, monthI) + "</p>"; //Here we search the description using as parameters the number of the day and the month initials

	document.getElementById('eventDescription').innerHTML = eDescription; //We write in the description div the info we just search for

	//We show the description on the screen
	document.getElementById('eventDescription').style.display = "block";
	document.getElementById('cloth').style.display = "block";
}

function closeDescription()
{
	//We make transparent the description
	document.getElementById('eventDescription').style.display = "none";
	document.getElementById('cloth').style.display = "none";
}

function getDescription(dayNumber, monthInitials)
{
	return festivity[monthInitials]["d" + dayNumber].description; //Search the description inthe festivity object, we need to search first the month, then the day, the we hace the description property.
}

//Using the name or number of the month (starting with 0), we can return the initials using a switch
function getMonthInitials(month)
{
	switch(month)
	{
		case "Morning Star":
		case "0":
			return "MS";
		break;

		case "Sun's Dawn":
		case "1":
			return "SD";
		break;

		case "First Seed":
		case "2":
			return "FS";
		break;

		case "Rain's Hand":
		case "3":
			return "RH";
		break;

		case "Second Seed":
		case "4":
			return "SS";
		break;

		case "Midyear":
		case "5":
			return "MY";
		break;

		case "Sun's Height":
		case "6":
			return "SH";
		break;

		case "Last Seed":
		case "7":
			return "LS";
		break;

		case "Heartfire":
		case "8":
			return "HF";
		break;

		case "Frostfall":
		case "9":
			return "FF";
		break;

		case "Sun's Dusk":
		case "10":
			return "DS";
		break;

		case "Evening Star":
		case "11":
			return "ES";
		break;

		default:
			return 0; //Error
		break;
	}
}

//The object festivity has all the months. We can access to them via their initials, the we can hace it's name, the number of days it has and the days that have a festivity within. The day holds the name of the event and the description.
var festivity =
{
	MS:
	{
		monthName: "Morning Star",
		numberOfDays: 31,
		d1:
		{
			name: "New Life Festival",
			description: "Today the people of Nirn are having the New Life Festival in celebration of a new year. The Emperor has ordered yet another tax increase in his New Life Address, and there is much grumbling about this. Still, despite financial difficulties, the New Life tradition of free ale at all the taverns in the cities continues. The people of Nirn certainly know how to hold a celebration. In Daggerfall, this is the Summoning Day for Clavicus Vile."
		},
		d2:
		{
			name: "Scour Day",
			description: "Scour Day is a celebration held in most High Rock villages on the day after New Life. It was once the day one cleans up after New Life, but has changed into a party of its own."
		},
		d12:
		{
			name: "Ovank'a",
			description: "Ovank'a is the day the people of the Alik'r Desert offer prayers to Stendarr in the hopes of a mild and merciful year. It is considered very holy."
		},
		d13:
		{
			name: "Meridia's Summoning Day",
			description: "In Daggerfall, this is the Summoning Day for Meridia."
		},
		d15:
		{
			name: "South Winds Prayer",
			description: "The 15th of Morning Star is a holiday taken very seriously in Nirn, where they call it South Wind's Prayer, a plea by all the religions of Tamriel for a good planting season. Citizens with every affliction known in Tamriel flock to services in the cities's temples, as the clergy is known to perform free healings on this day. Only some will be judged worthy of this service, but few can afford the temples usual price..."
		},
		d16:
		{
			name: "Day of Lights",
			description: "The Day of Lights is celebrated as a holy day by most villages in Hammerfell on the Iliac Bay. It is a prayer for a good farming and fishing year, and is taken very seriously.\nA possibly unrelated Festival of Lights is a tradition in the Skyrim city of Dawnstar. Little candies are given out to celebrate."
		},
		d18:
		{
			name: "Waking Day",
			description: "The people in Yeorth Burrowland invented Waking Day in prehistoric times to wake the spirits of nature after a long, cold winter. It has evolved into a sort of orgiastic celebration of the end of winter."
		}
	},
	SD:
	{
		monthName: "Sun's Dawn",
		numberOfDays: 28,
		d2:
		{
			name: "Mad Pelagius",
			description: "Mad Pelagius is a silly little tradition in High Rock in a mock memorial to Pelagius Septim III, one of the maddest emperors in recent history. He died about 350 years ago, so the Septims since have taken it with good humor. In Daggerfall this is the Summoning Day for Sheogorath."
		},
		d5:
		{
			name: "Othroktide",
			description: "The people of Dwynnen have a huge party to celebrate Othroktide, the day when Baron Othrok took Dwynnen from the undead forces who claimed it in the Battle of Wightmoor."
		},
		d8:
		{
			name: "Day of Release",
			description: "The people of Glenumbra may be the only people to remember or care about the battle between Aiden Direnni and the Alessian Army in the first era. They celebrate it vigorously on the Day of Release."
		},
		d13:
		{
			name: "Feast of the Dead",
			description: "Celebrated in the Skyrim city of Windhelm. During the feast, the names of the Five Hundred Companions of Ysgramor are recited."
		},
		d16:
		{
			name: "Heart's Day",
			description: "Today is the 16th of Sun's Dawn, a holiday celebrated all over Tamriel as Heart's Day. It seems that in every house, the Legend of the Lovers is being sung for the younger generation. In honor of these Lovers, Polydor and Eloisa, the inns of the city offer a free room for visitors. If such kindness had been given the Lovers, it is said, it would always be springtime in the world. In Daggerfall, this is the Summoning Day for Sanguine."
		},
		d27:
		{
			name: "Perserverance Day",
			description: "Perserverance Day is quite a party in Ykalon. It was originally held as a solemn memorial to those killed in battle while resisting the Camoran Usurper, but has since become a boisterous festival."
		},
		d28:
		{
			name: "Aduros Nau",
			description: "The villages in the Bantha celebrate the baser urges that come with Springtide on Aduros Nau. The traditions vary from village to village, but none of them are for the overly virtuous."
		}
	},
	FS:
	{
		monthName: "First Seed",
		numberOfDays: 31,
		d5:
		{
			name: "Hermaeus Mora's Summoning Day",
			description: "In Daggerfall, this is the Summoning Day for Hermaeus Mora."
		},
		d7:
		{
			name: "First Planting",
			description: "On the 7th of First Seed every year, the people of Nirn celebrate First Planting, symbolically sowing the seeds for the autumn harvest. It is a festival of fresh beginnings, both for the crops and for the men and women of the city. Neighbors are reconciled in their disputes, resolutions are formed, bad habits dropped, the diseased cured. The clerics at the temples run a free clinic all day long to cure people of poisoning, different diseases, paralysis, and the other banes found in the world of Tamriel."
		},
		d9:
		{
			name: "Day of Waiting",
			description: "The Day of Waiting is a very old holy day among certain settlements in the Dragontail Mountains. Every year at that time, a dragon is supposed to come out of the desert and devour the wicked, so everyone locks themselves up inside."
		},
		d21:
		{
			name: "Hogithum",
			description: "In Daggerfall, this is the Summoning Day for Azura."
		},
		d25:
		{
			name: "Flower Day",
			description: "Flower Day is another of the frivolous celebrations of High Rock. Children pick the new flowers of spring while older Bretons, cooped up all winter, come out to welcome the season with dancing and singing."
		},
		d26:
		{
			name: "Festival of Blades",
			description: "During the Festival of Blades, the people of the Alik'r Desert celebrate the victor of the first Redguard over a race of giant goblins. The story is considered a myth by most scholars, but the holiday is still very popular in the desert."
		}
	},
	RH:
	{
		monthName: "Rain's Hand",
		numberOfDays: 30,
		d1:
		{
			name: "Gardtide",
			description: "On Gardtide, the people of Tamarilyn Point hold a festival to honor Druagaa, the old goddess of flowers. Worship of the goddess is all but dead, but the celebration is always a great success."
		},
		d9:
		{
			name: "Peryite's Summoning Day",
			description: "In Daggerfall, this is the Summoning Day for Peryite."
		},
		d13:
		{
			name: "Day of the Dead",
			description: "The Day of the Dead is one of the more peculiar holidays of Daggerfall. The superstitious say that the dead rise on this holiday to wreak vengeance on the living. It is a fact that King Lysandus' spectre began its haunting on the Day of the Dead, 3E 404."
		},
		d20:
		{
			name: "Day of Shame",
			description: "All along the seaside of Hammerfell, no one leaves their houses on the Day of Shame. It is said that the Crimson Ship, a vessel filled with victims of the Knahaten Plague who were refused refuge hundreds of years ago, will return on this day."
		},
		d28:
		{
			name: "Jester's Day",
			description: "Be warned that today is Jester's Day in the city of Nirn, and pranks are being set up from one end of town to the other. It is as if a spell has been cast over the community, for even the most taciturn and dignified councilman might attempt to play a joke on his relative. The Thieves Guild finds particular attention as everyone looks for pickpockets in particular."
		}
	},
	SS:
	{
		monthName: "Second Seed",
		numberOfDays: 31,
		d7:
		{
			name: "Second Planting",
			description: "The celebration of Second Planting is in full glory this day. It is a holiday with traditions similar to First Planting, improvements on the first seeding symbolically to suggest improvements on the soul. The free clinics of the temples are open for the second and last time this year, offering cures for those suffering from any kind of disease or affliction. Because peace and not conflict is stressed at this time, battle injuries are healed only at full price."
		},
		d9:
		{
			name: "Marukh's Day",
			description: "Marukh's Day is only observed by certain communities in Skeffington Wood. By comparing themselves to the virtuous prophet Marukh, the people of Skeffington Wood pray for the strength to resist temptation. In Daggerfall, this is the Summoning Day for Namira."
		},
		d20:
		{
			name: "Fire Festival",
			description: "The Fire Festival in Northmoor is one of the most attended celebrations in High Rock. It began as a pompous display of magic and military strength in ancient days and has become quite a festival."
		},
		d30:
		{
			name: "Fishing Day",
			description: "Fishing Day is a big celebration for the Bretons who live off the bounty of the Iliac Bay. They are not a usually flamboyant people, but on Fishing Day, they make so much noise, fish have been scared away for weeks."
		}
	},
	MY:
	{
		monthName: "Midyear",
		numberOfDays: 30,
		d1:
		{
			name: "Drigh R'Zimb",
			description: "The festival of Drigh R'Zimb, held in the hottest time of year in Abibon-Gora, is a jubilation held for the sun Daibethe itself. Scholars do not know how long Drigh R'Zimb has been held, but it is possible the Redguards brought the festival with them when they came in the first era."
		},
		d5:
		{
			name: "Hircine's Summoning Day",
			description: "In Daggerfall, this is the Summoning Day for Hircine."
		},
		d16:
		{
			name: "Mid Year Celebration",
			description: "Today is the 16th of Mid Year, the traditional day for the Mid Year Celebration. Perhaps to alleviate the annual news of the Emperor's latest tax increase, the cities temples offer blessings for only half the donation they usually suggest. Many so blessed feel confident enough to enter the (dangerous) dungeons when they are not fully prepared, so this joyous festival has often been known to turn suddenly into a day of defeat and tragedy."
		},
		d23:
		{
			name: "Dancing Day",
			description: "Dancing Day is a time-honored holiday in Daggerfall. Who started it is questionable, but the Red Prince Atryck popularized it in the second era. It is an occasion of great pomp and merriment for all the people of Daggerfall, from the nobles down."
		},
		d24:
		{
			name: "Tibedetha",
			description: "Tibedetha is middle Tamrielic for \"Tibers Day.\" It is not surprising that the lorddom of Alcaire celebrates its most famous native with a great party. Historically, Tiber Septim never returned once to his beloved birthplace."
		}
	},
	SH:
	{
		monthName: "Sun's Height",
		numberOfDays: 31,
		d10:
		{
			name: "Merchant's Festival",
			description: "The bargain shoppers of the known world are out in force today and it is little wonder, for the 10th of Sun's Height is a holiday called the Merchants' Festival. Every marketplace and equipment store has dropped their prices to at least half. The only shop not being patronized today is the Mages Guild, where prices are as exorbitant as usual. Most citizens in need of a magical item are waiting two months for the celebration of Tales and Tallows when prices will be more reasonable... In Daggerfall, this is the Summoning day for Vaernima."
		},
		d12:
		{
			name: "Divad Etep't",
			description: "During Divat Etep't, the people of Antiphyllos mourn the death of one of the greatest of the early Redguard heroes, Divat, son of Frandar of the Hel Ansei. His deeds are questioned by historians, but his tomb in Antiphyllos is almost certainly genuine."
		},
		d20:
		{
			name: "Sun's Rest",
			description: "You will have to wait until tomorrow if you are planning on making any equipment purchases, for all stores are closed in observance of Sun's Rest. Of course, the temples, taverns, and Mages Guild in the (city) are still open their regular hours, but most citizens chose to devote this day to relaxation, not commerce or prayer. This is not a convenient arrangement for all, but the Merchants' Guild heavily fines any shop that stays open, so everyone complies."
		},
		d29:
		{
			name: "Fiery Night",
			description: "Few besides the natives of the Alik'r Desert would venture out on the hottest day of the year, Fiery Night. It's a lively celebration with a meaning lost in antiquity."
		}
	},
	LS:
	{
		monthName: "Last Seed",
		numberOfDays: 31,
		d2:
		{
			name: "Maiden Katrica",
			description: "On the day of Maiden Katrica, the people of Ayasofya show their appreciation for the warrior that saved their county with the biggest party of the year."
		},
		d11:
		{
			name: "Koomu Alezer'i",
			description: "Koomu Alezer'i means simply \"We Acknowledge\" in old Redguard, and it has been a tradition in Sentinel for thousands of years. No matter the harvest, the people of Sentinel solemnly thank the gods for their bounty, and pray to be worthy of the graces of the gods."
		},
		d14:
		{
			name: "Feat of the Tiger",
			description: "The Feast of the Tiger in the Bantha rainforest is like other holidays in praise of a bountiful harvest. It is not, however, a solemn occasion for introspection and thanksgiving, but a great celebration and festival from village to village."
		},
		d21:
		{
			name: "Appreciation Day",
			description: "Appreciation Day in Anticlere is an ancient holiday of thanksgiving for a bountiful harvest for the people of Anticlere. It is considered a holy and contemplative day, devoted to Mara, the goddess-protector of Anticlere."
		},
		d27:
		{
			name: "Harvest's End",
			description: "Perhaps no other festival fires the spirit of cityName as much as the one held today, Harvest's End. The work of the year is over, the seeding, sowing, and reaping. Now is the time to celebrate and enjoy the fruits of the harvest, and even visitors to regionName are invited to join the farmers. The taverns offer free drinks all day long, an extravagance before the economy of the coming winter months. Underfed farm hands gorging themselves and then getting sick in the town square are the most common sights of the celebration of Harvest's End.\nThis day in 3E 433 marked the beginning of the Oblivion Crisis."
		}
	},
	HF:
	{
		monthName: "Heartfire",
		numberOfDays: 30,
		d3:
		{
			name: "Tales and Tallows",
			description: "No other holiday divides the people of cityName like the 3rd of Hearth Fire. A few of the oldest, more superstitious men and women do not speak all day long for fear that the evil spirits of the dead will enter their bodies. Most citizens enjoy the holiday, calling it Tales and Tallows, but even the most lighthearted avoid the dark streets of cityName, for everyone knows the dead do walk tonight. Only the Mages Guild completely thrives on this day. In celebration of the oldest magical science, necromancy, all magical items are half price today."
		},
		d6:
		{
			name: "Khurat",
			description: "Every town and fellowship in the Wrothgarian Mountains celebrates Khurat, the day when the finest young scholars are accepted into the various priesthoods. Even those people without children of age go to pray for the wisdom and benevolence of the clergy."
		},
		d8:
		{
			name: "Nocturnal's Summoning Day",
			description: "In Daggerfall, this is the Summoning Day for Nocturnal."
		},
		d12:
		{
			name: "Riglametha",
			description: "Riglametha is celebrated on the twelfth of Hearth Fire every year in Lainlyn as a celebration of Lainlyns many blessings. Pageants are held on such themes as the Ghraewaj, when the daedra worshippers in Lainlyn were changed to harpies for their blasphemy."
		},
		d19:
		{
			name: "Children's Day",
			description: "Children's Day in Betony is a festive occasion with a grim history. All know though few choose to recall that Children's Day began as a memorial to the dozens of children in Betony who were stolen from their homes by vampires one night never to be seen again. This happened over a hundred years ago, and the holiday has since become a celebration of youth."
		}
	},
	FF:
	{
		monthName: "Frostfall",
		numberOfDays: 31,
		d5:
		{
			name: "Dirij Tereur",
			description: "The fifth of Frost Fall marks Dirij Tereur for the people of the Alik'r Desert. It is a sacred day honoring Frandar Hund, the traditional spiritual leader of the Redguards who led them to Hammerfell in the first era. Stories are read from Hund's Book of Circles, and the temples in the region are filled to capacity."
		},
		d8:
		{
			name: "Malacath's Summoning Day",
			description: "In Daggerfall, this is the Summoning Day for Malacath."
		},
		d13:
		{
			name: "Witches Festival",
			description: "Today is the 13th of Frostfall, known throughout Tamriel as the Witches' Festival when the forces of sorcery and religion clash. The Mages Guild gets most of the business since weapons and items are evaluated for their mystic potential free of charge and magic spells are one half their usual price. Demonologists, conjurors, lamias, warlocks, and thaumaturgists meet in the wilderness outside (the city), and the creatures created or summoned there may plague Tamriel for eons. Most wise men choose not to wander this night. In Daggerfall, this is the Summoning Day for Mephala."
		},
		d23:
		{
			name: "Broken Diamonds",
			description: "On the 23rd of Frost Fall in the 121st year of the third era, the empress Kintyra Septim II met her death in the imperial dungeons in Glenpoint on the orders of her cousin and usurper Uriel III. Her death is remembered in Glenpoint as the day called Broken Diamonds. It is a day of silent prayer for the wisdom and benevolence of the imperial family of Tamriel."
		},
		d30:
		{
			name: "Emperor's Day",
			description: "Once the 30th of Frostfall, the Emperor's Birthday, was the most popular holiday of the year. Great traveling carnivals entertained the masses, while the aristocracy of cityName enjoyed the annual Goblin Chase on horseback. Recently, these traditions have fallen into neglect. It has been decades since there was a big carnival in cityName and longer still since a regentTitle of the cityName sponsered [sic] a Goblin Chase.\nIn 4E 171, the Great War began on this day when then-Emperor Titus Mede II rejected a Thalmor ultimatum."
		}
	},
	DS:
	{
		monthName: "Sun's Dusk",
		numberOfDays: 30,
		d2:
		{
			name: "Gauntlet",
			description: "In Daggerfall, this is the Summoning Day for Boethiah."
		},
		d3:
		{
			name: "Serpent's Dance",
			description: "The Serpents Dance in Satakalaam may or may not have begun as a serious religious holiday dedicated to a snake god, but in this day, it is a reason for a great street festival."
		},
		d8:
		{
			name: "Moon Festival",
			description: "On the 8th of Sun's Dusk, the Bretons of Glenumbra Moors hold the Moon Festival, a joyous holiday in honor of Secunda, goddess of the moon. Although the goddess has no active worshippers, the traditional celebration has continued through the ages as a time of feasting and merriment."
		},
		d18:
		{
			name: "Hal Anseilak",
			description: "Hel Anseilak, which means \"Communion with the Saints of the Sword\" in Old Redguard is the most serious of holy days for the people of Pothago. The ancient way of Hel Ansei is never practiced by modern Redguards, but its rich heritage is remembered and honored on this day."
		},
		d20:
		{
			name: "Warriors Festival",
			description: "Today is the 20th of Sun's Dusk, the Warriors Festival in cityName. Most all the local warriors, spellswords, and rogues come to the equipment stores and blacksmiths where all weapons are half price. Unfortunately, the low prices also tempt many an untrained boy to buy his first sword and the normally quiet cityName streets ring with amateur skirmishes. The regentTitle has pardoned most of these ruffians in the past, but has promised to be less merciful this year. In Daggerfall, this is the Summoning Day for Mehrunes Dagon."
		}
	},
	ES:
	{
		monthName: "Evening Star",
		numberOfDays: 31,
		d15:
		{
			name: "North Winds Prayer",
			description: "Today is the 15th of Evening Star, a holiday reverently observed by the temples as North Wind's Prayer. It is a thanksgiving to the Gods for a good harvest and a mild winter. Some years, like this one, the harvest was not particularly good and the winter unseasonally harsh in Nirn, but as the regentTitle is fond of saying, \"It could be much worse.\" The temples offer all their services blessing, curing, healing for half the donation usually requested."
		},
		d18:
		{
			name: "Baranth Do",
			description: "Baranth Do is celebrated on the 18th of Evening Star by the Redguards of the Alik'r Desert. Its meaning is \"Goodbye to the Beast of Last Year.\" Pageants featuring demonic representations of the old year are popular, and revelry to honor the new year is everywhere."
		},
		d20:
		{
			name: "Chil'a",
			description: "Chil'a, the blessing of the new year in the barony of Kairou, is both a sacred day and a festival. The archpriest and the baroness each consecrate the ashes of the old year in solemn ceremony, then street parades, balls, and tournaments conclude the event. In Daggerfall, this is the Summoning Day for Molag Bal."
		},
		d24:
		{
			name: "Chil'a*",
			description: "Local Iliac Bay New Year's festival on the 24th of Evening Star. It was probably moved from its original date to correspond with the notion of the year defined in Tamriel."
		},
		d25:
		{
			name: "Saturalia",
			description: "The New Life festival comes a few days early in Wayrest with Saturalia, traditionally held on the 25th of Evening Star. Originally a holiday for a long forgotten god of debauchery, it has become a time of gift giving, parties, and parading. Visitors are encouraged to participate."
		},
		d31:
		{
			name: "Old Life Festival",
			description: "On the last day of the year the Empire celebrates the holiday called Old Life. Many go to the temples to reflect on their past. Some go for more than this, for it is rumored that priests will as the last act of the year perform resurrections on beloved friends and family members free of the usual charge. Worshippers know better than to expect this philanthropy, but they arrive in a macabre procession with the recently deceased nevertheless. When ale flows free in all the taverns in all the cities of Tamriel."
		},
	}
};

createCalendar(firstDayOfThisMonth, tMonth, tYear, tOday); //We create the calendar using today date

var daysWithEvent = document.getElementsByClassName("event"); //All the elements with the event class

for (x = 0; x < daysWithEvent.length; x++)
{
	daysWithEvent[x].addEventListener("click", function()
	{
		showDescription(this); //Add a function to all the elements with the event class via eventListener
	})
}