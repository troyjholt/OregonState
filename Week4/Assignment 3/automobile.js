function Automobile(year, make, model, type)
{
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
    this.logme = function logme(thing)//bool (ex. true or false ;) )
    {
        if (thing == true)
        {
            console.log(this.year + ' ' + this.make + ' ' + this.model + ' ' + this.type);
        }
        else
        {
            console.log(this.year + ' ' + this.make + ' ' + this.model);
        }
        return;
    };
}

var automobiles = [
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
];

/*This function sorts arrays using an arbitrary comparator. You pass it a
 * comparator and an array of objects appropriate for that comparator and
 * it will return a new array which is sorted with the largest object in 
 * index 0 and the smallest in the last index*/
function sortArr(comparator, array)
{
    var ret = array;
    var comp = comparator;
    for (var i = 0; i < ret.length; i++)
    {
        for (j = 0; j < (ret.length - 1); j++)
        {
            var holder;
            if (comp(ret[j], ret[j + 1]) == true)
            {
                // do nothing
            }

            else
            {
                holder = ret[j];
                ret[j] = ret[j + 1];
                ret[j + 1] = holder;
            }
        }
    }
    return ret;
   //return array.sort(comparator).reverse();
}

/*A comparator takes two arguments and uses some algorithm to compare them.
 * If the first argument is larger or greater than the 2nd it returns true,
 * otherwise it returns false. Here is an example that works on integers*/
function exComparator(int1, int2)
{
    if (int1 > int2)
    {
        return true;
    } else
    {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules 
 * then the order of those 'tied' cars is not specified and either can come
 * first*/

/*This compares two automobiles based on their year. Newer cars are "greater"
 * than older cars.*/
function yearComparator(auto1, auto2)
{
    if (auto1.year > auto2.year)
    {
        return true;
    }

    else
    {
        return false;
    }
}

/*This compares two automobiles based on their make. It should be case
 * insensitive and makes which are alphabetically earlier in the alphabet 
 * are "greater" than ones that come later (from A-Z).*/
function makeComparator(auto1, auto2)
{
    if (auto1.make < auto2.make)
    {
        return true;
    }

    else
    {
        return false;
    }
}

/*This compares two automobiles based on their type. The ordering from 
 * "greatest" to "least" is as follows: roadster, pickup, suv, wagon, 
 * (types not otherwise listed). It should be case insensitive. If two 
 * cars are of equal type then the newest one by model year should be 
 * considered "greater".*/
function typeComparator(auto1, auto2)
{
    var car1;
    var car2;

    if (auto1.type.toLowerCase() == "roadster")
    {
        car1 = 0;
    }

    else if (auto1.type.toLowerCase() == "pickup")
    {
        car1 = 1;
    }

    else if (auto1.type.toLowerCase() == "suv")
    {
        car1 = 2;
    }

    else if (auto1.type.toLowerCase() == "wagon")
    {
        car1 = 3;
    }

    else if (auto1.type.toLowerCase() == "sedan")
    {
        car1 = 4;
    }

    else
    {
        car1 = 5;
    }

    if (auto2.type.toLowerCase() == "roadster")
    {
        car2 = 0;
    }

    else if (auto2.type.toLowerCase() == "pickup")
    {
        car2 = 1;
    }

    else if (auto2.type.toLowerCase() == "suv")
    {
        car2 = 2;
    }

    else if (auto2.type.toLowerCase() == "wagon")
    {
        car2 = 3;
    }

    else if (auto2.type.toLowerCase() == "sedan")
    {
        car2 = 4;
    }

    else
    {
        car2 = 5;
    }

    if (car1 < car2)
    {
        return true;
    }

    else if (car1 > car2)
    {
        return false;
    }

    else
    {
        if (auto1.year > auto2.year)
        {
            return true;
        }

        else if (auto1.year < auto2.year)
        {
            return false;
        }

        else
        {
            return true;
        }
    }
}

/*Your program should output the following to the console.log, including
 * the opening and closing 5 stars. All values in parenthesis should be 
 * replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function 
should be added to the Automobile class and accept a single boolean argument. If 
the argument is 'true' then it prints "year make model type" with the year, make, 
model and type being the values appropriate for the automobile. If the argument is 
'false' then the type is ommited and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */

console.log("*****");
var array = [];
console.log("The cars sorted by year are:");
array = sortArr(yearComparator, automobiles);
for (var k = 0; k < array.length; k++)
{
    //console.log("this is a test")
    array[k].logme(true);
}

console.log(" ");

console.log("The cars sorted by make are:");
array = sortArr(makeComparator, automobiles);
for (var k = 0; k < array.length; k++)
{
    //console.log("this is a test")
    array[k].logme(true);
}
console.log(" ");

console.log("The cars sorted by type are:");
array = sortArr(typeComparator, automobiles);
for (var k = 0; k < array.length; k++)
{
    //console.log("this is a test")
    array[k].logme(true);
}
console.log("*****");