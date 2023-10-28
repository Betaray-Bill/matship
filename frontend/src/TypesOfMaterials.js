const masterClass = ["Metals", "Polymers" , "Ceramic" ,"Others"]

const subClass = {
    "Metals":{
        "subClass":["reading", "swimming", "coding"]
    },
    "Polymers":{
        "subClass":["Thermoplastics", "Thermosets", "Elastomers"],
    }
}

const Family = {
    "Thermoplastics":{
        "subClass":["Polyamide 6 (PA6)", "Polypropylene (PP)", "Polyethylenimine (PEI)"]
    },
    "Thermosets":{
        "subClass":["Thermoplastics", "Thermosets", "Elastomers"],
    }
}

export {masterClass, subClass, Family}