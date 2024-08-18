function stringToColor(str: string): string {
    let hash = 0;

    // Compute a hash from the input string
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert hash to a 6-digit hexadecimal value
    const color = (hash & 0x00ffffff).toString(16).toUpperCase();

    // Ensure the color string is 6 characters long
    return "#" + "000000".substring(0, 6 - color.length) + color;
}

export default stringToColor;
