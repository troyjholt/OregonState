var vehicle =
{
    type: "Train",
    wheels: "8",
    color: "black",
};

var vehicle2 =
{
    type: "Car",
    wheels: "4",
    color: "black"
};

var vehicle3 =
{
    type: "Car",
    wheels: "4",
    color: "black"
};

function deepEqual(x, y)
{
    if (typeof (x) == "object")
    {
        if (typeof (x) == typeof (y)) 
        {
            if (x == null || y == null) 
            {
                if ((x == null) && (y == null)) 
                {
                    return true;
                }

                else 
                {
                    return false;
                }
            }

            else if (typeof (x) == typeof (y)) 
            {
                for (var key of Object.keys(x)) 
                {
                    if (x[key] === y[key]) 
                    {
                        console.log(x[key] + " " + y[key] + " " + "=" + " " + true);
                    }

                    else 
                    {
                        return false;
                    }
                }
            }

            else 
            {
                return false;
            }
        }

        else
        {
            return false;
        }
    }

    else
    {
        if (typeof (x) == typeof(y))
        {
            if (x === y)
            {
                return true;
            }

            else
            {
                return false;
            }
        }

        else
        {
            return false;
        }
    }

    return true;
};

console.log(deepEqual(vehicle, vehicle2));
console.log(deepEqual(vehicle3, vehicle2));
console.log(deepEqual(vehicle3, null));
console.log(deepEqual(null, null));
console.log(deepEqual(5, 6));