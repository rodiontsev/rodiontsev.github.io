var r = [6, 255];
var g = [149, 105];
var b = [255, 104];

function colorizeTitle(t) {
    if (window.noColorize !== 1) {
        var pageTitle = document.getElementsByTagName(t);
        for (var i = 0; i < pageTitle.length; i++) {
            makeColor(pageTitle[i]);
        }
    }
}

function getColor(position, color, length) {
    return (color[1] - Math.round((color[1] - color[0]) / length * (length - position)));
}

function makeColor(e) {
    var html = e.innerHTML;
    var length = html.length;
    var result = "";

    for (var i = 0; i < length; i++) {
        var cs = html.substring(i, i + 1);
        if (cs == " ") {
            result += " ";
            i++;
            cs = html.substring(i, i + 1);
        }
        if (cs == "<") {
            chk = 0;
            while (chk == 0) {
                cs = html.substring(i, i + 1);
                result += cs;
                i++;
                if (cs == ">") {
                    chk = 1;
                }
                if (html.substring(i, i + 1) == "<") {
                    chk = 0;
                }
            }
            cs = html.substring(i, i + 1);
        }
        if (cs == "&") {
            while (cs != ";") {
                cs = html.substring(i, i + 1);
                result += cs;
                i++;
            }
            cs = html.substring(i, i + 1);
        }
        var cr = getColor(i, r, length);
        var cg = getColor(i, g, length);
        var cb = getColor(i, b, length);
        result += "<span style='color: rgb(" + cr + "," + cg + "," + cb + ")'>" + cs + "</span>";
    }
    e.innerHTML = result;
}
