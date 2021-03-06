export const colorsHumanFriendly = {
    "#a8f19a": 'Grass', 
    "#eddd6e": 'Pasta', 
    "#edd1b0": 'Floor', 
    "#96adfc": 'Water'
}

export const colors = Object.keys(colorsHumanFriendly)
export const fonts = ["Helvetica", "Open Sans", "Space Mono"]
export const modes = ["HotBox", "Underneath", "Faded"]
export const modesHumanFriendly = {
    "HotBox": "marker is a block",
    "Underneath": "marker is slim and underneat the words",
    "Faded": "marker's boundaries loose their essence"
}

export const defaultVals = {
    color: "#eddd6e",
    // font: "Helvetica",
    mode: "Faded",
    fovea: 4,
    wpm: 250,
    page: 1,
    scale: 100
}
